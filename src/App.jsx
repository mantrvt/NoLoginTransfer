import React, { useState, useEffect, useRef } from 'react';
import { Copy, Lock, FileArchive, Rotate3d, FishingHook, Upload, Download, Wifi, WifiOff, X, QrCode, File, Image, Video, FileText, PackageOpen, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import JSZip from 'jszip';
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function NoLoginTransfer() {
  const [roomCode, setRoomCode] = useState('');
  const [peerId, setPeerId] = useState('');
  const [remoteRoomCode, setRemoteRoomCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [files, setFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [status, setStatus] = useState('Ready');
  const [warning, setWarning] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  
  const peerRef = useRef(null);
  const connectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);
  const pingIntervalRef = useRef(null);
  
  const incomingFilesRef = useRef({});

  const generateRoomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const startHeartbeat = (conn) => {
    if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
    pingIntervalRef.current = setInterval(() => {
      if (conn.open) {
        conn.send({ type: 'ping' });
      }
    }, 10000); 
  };

  const stopHeartbeat = () => {
    if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/peerjs@1.5.1/dist/peerjs.min.js';
    script.async = true;
    script.onload = () => {
      const code = generateRoomCode();
      const peer = new window.Peer(code); 
      
      peer.on('open', (id) => {
        setPeerId(id); 
        setRoomCode(id);
        setStatus('Ready to share');
      });

      peer.on('connection', (conn) => {
        connectionRef.current = conn;
        
        conn.on('open', () => {
          setConnected(true);
          setStatus('Connected!');
          startHeartbeat(conn);
        });
        
        conn.on('data', handleIncomingData);

        conn.on('close', () => {
          setConnected(false);
          setStatus('Connection closed');
          stopHeartbeat();
        });
      });

      peer.on('error', (err) => {
        if (err.type === 'unavailable-id') {
          setStatus('Code taken, refreshing...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          console.error('Peer error:', err);
        }
      });

      peerRef.current = peer;
    };
    
    document.head.appendChild(script);

    return () => {
      if (peerRef.current) peerRef.current.destroy();
      stopHeartbeat();
    };
  }, []);

  const connectToRoom = async () => {
    if (!remoteRoomCode || remoteRoomCode.length !== 6) {
      setStatus('Please enter a 6-digit room code');
      return;
    }

    setStatus('Connecting...');
    const conn = peerRef.current.connect(remoteRoomCode);
    
    conn.on('open', () => {
      connectionRef.current = conn;
      setConnected(true);
      setStatus('Connected!');
      startHeartbeat(conn);
    });

    conn.on('data', handleIncomingData);

    conn.on('close', () => {
      setConnected(false);
      setStatus('Connection closed');
      stopHeartbeat();
    });

    conn.on('error', (err) => {
      setStatus('Could not connect - check the room code');
      stopHeartbeat();
    });
  };

  const handleIncomingData = async (data) => {
    if (data.type === 'ping') return; 

    if (data.type === 'file-start') {
      incomingFilesRef.current[data.fileName] = {
        chunks: [],
        type: data.fileType,
        size: data.fileSize,
        receivedBytes: 0
      };
      setStatus(`Receiving: ${data.fileName}...`);
    } else if (data.type === 'file-chunk') {
      const fileTracker = incomingFilesRef.current[data.fileName];
      if (fileTracker) {
        fileTracker.chunks.push(data.chunk);
        fileTracker.receivedBytes += data.chunk.byteLength;
      }
    } else if (data.type === 'file-end') {
      const fileTracker = incomingFilesRef.current[data.fileName];
      if (fileTracker) {
        const blob = new Blob(fileTracker.chunks, { type: fileTracker.type });
        const url = URL.createObjectURL(blob);
        
        setReceivedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: data.fileName,
          size: fileTracker.size,
          url: url,
          blob: blob, 
          type: fileTracker.type
        }]);
        
        delete incomingFilesRef.current[data.fileName];
        setStatus(`✅ Got: ${data.fileName}`);
      }
    } else if (data.type === 'batch-start') {
      setStatus(`Receiving ${data.fileCount} file(s)...`);
    } else if (data.type === 'batch-complete') {
      setStatus('All files received!');
    }
  };

  const sendSingleFile = async (fileObj, index) => {
    return new Promise(async (resolve) => {
      try {
        const file = fileObj.file;
        const CHUNK_SIZE = 256 * 1024;
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        
        connectionRef.current.send({
          type: 'file-start',
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          totalChunks: totalChunks
        });

        let offset = 0;
        let chunkCount = 0;
        let lastReportedProgress = 0;

        while (offset < file.size) {
          const dc = connectionRef.current?.dataChannel;
          if (dc && dc.bufferedAmount > 8 * 1024 * 1024) {
            await new Promise(r => setTimeout(r, 10)); 
          } else if (chunkCount % 10 === 0) {
            await new Promise(r => setTimeout(r, 0));
          }

          const chunk = file.slice(offset, offset + CHUNK_SIZE);
          const buffer = await chunk.arrayBuffer();

          connectionRef.current.send({
            type: 'file-chunk',
            fileName: file.name,
            chunk: buffer
          });

          offset += CHUNK_SIZE;
          chunkCount++;

          const currentProgress = Math.min(100, Math.round((offset / file.size) * 100));
          if (currentProgress >= lastReportedProgress + 5 || offset >= file.size) {
            lastReportedProgress = currentProgress;
            setFiles(prev => prev.map((f, idx) => 
              idx === index ? { ...f, progress: currentProgress } : f
            ));
          }
        }

        connectionRef.current.send({
          type: 'file-end',
          fileName: file.name
        });

        setTimeout(() => resolve(), 20);

      } catch (error) {
        console.error("Transfer failed:", error);
        resolve();
      }
    });
  };

  const sendFiles = async () => {
    if (files.length === 0 || !connectionRef.current) {
      setStatus('No files to send');
      return;
    }

    setStatus(`Sending ${files.length} file(s)...`);
    connectionRef.current.send({ type: 'batch-start', fileCount: files.length });

    for (let i = 0; i < files.length; i++) {
      await sendSingleFile(files[i], i);
    }

    connectionRef.current.send({ type: 'batch-complete' });
    setStatus('All sent!');
    setFiles([]);
    setWarning('');
  };

  const addFiles = (newFiles) => {
    const ONE_HUNDRED_MB = 100 * 1024 * 1024;
    const hasLargeFile = newFiles.some(file => file.size > ONE_HUNDRED_MB);
    
    if (hasLargeFile) {
      setWarning('Large file detected! Transfer will be optimized, but may take some time depending on your network.');
    }

    const fileObjects = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...fileObjects]);
    setStatus(`${files.length + fileObjects.length} file(s) ready`);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      if (updated.length === 0) setWarning('');
      return updated;
    });
  };

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); dragCounterRef.current++; if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); dragCounterRef.current--; if (dragCounterRef.current === 0) setIsDragging(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); dragCounterRef.current = 0; const droppedFiles = Array.from(e.dataTransfer.files); if (droppedFiles.length > 0) addFiles(droppedFiles); };

  const downloadAllAsZip = async () => {
    if (receivedFiles.length === 0) return;
    setDownloadingAll(true);
    setStatus('Packing files...');
    
    try {
      const zip = new JSZip();
      for (const file of receivedFiles) {
        zip.file(file.name, file.blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NoLoginTransfer-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus('Downloaded!');
    } catch (error) {
      console.error('ZIP Error:', error);
      setStatus('Download failed');
    } finally {
      setDownloadingAll(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    setStatus('Room code copied!');
    setTimeout(() => setStatus('Ready to share'), 2000);
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image size={20} className="text-[#E48A00]" />;
    if (type.startsWith('video/')) return <Video size={20} className="text-[#0038FF]" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText size={20} className="text-[#D13D1B]" />;
    return <File size={20} className="text-[#967C29]" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const connectionUrl = `${window.location.origin}?room=${roomCode}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room && peerRef.current && !connected) {
      setRemoteRoomCode(room);
      setTimeout(() => connectToRoom(), 1000);
    }
  }, [roomCode]);

  return (
    <div 
      className="min-h-screen overflow-x-hidden bg-[#FDFBF4] text-[#333333] font-sans pb-16"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* 🎨 VACATION® DESIGN SYSTEM STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Nunito+Sans:wght@300;400;600;700&display=swap');
        
        body { font-family: 'Nunito Sans', sans-serif; background-color: #FDFBF4; }
        .font-serif { font-family: 'EB Garamond', serif; }
        
        /* Buttons */
        .btn-primary-dark { background: #333333; color: #FFFFFF; border-radius: 9999px; box-shadow: 0 1.5px 1.5px 0 rgba(0,0,0,0.75); transition: all 0.2s ease; border: none; }
        .btn-primary-dark:hover:not(:disabled) { background: #1F1F1F; box-shadow: 0 2px 2px 0 rgba(0,0,0,0.85); }
        .btn-primary-dark:active:not(:disabled) { background: #1F1F1F; box-shadow: inset 0 1px 1px rgba(0,0,0,0.75); }
        
        .btn-primary-gold { background: #F1D27A; color: #333333; border-radius: 9999px; box-shadow: 0 1.5px 1.5px 0 rgba(0,0,0,0.75); transition: all 0.2s ease; border: none; }
        .btn-primary-gold:hover:not(:disabled) { background: #E48A00; box-shadow: 0 2px 2px 0 rgba(0,0,0,0.85); }
        .btn-primary-gold:active:not(:disabled) { background: #D97C00; box-shadow: inset 0 1px 1px rgba(0,0,0,0.75); }
        
        .btn-ghost { background: transparent; color: #333333; transition: all 0.2s ease; border-bottom: 1px solid transparent; }
        .btn-ghost:hover:not(:disabled) { color: #000000; border-bottom: 1px solid #333333; }
        
        /* Inputs */
        .input-field { background: #FFFFFF; color: #333333; border-radius: 2px; border: 1px solid #333333; transition: all 0.2s ease; outline: none; }
        .input-field:focus { border: 2px solid #0038FF; box-shadow: 0 0 0 4px rgba(0, 56, 255, 0.22); }
        .input-field:disabled { background: #E5E7EB; border-color: #CDC9C1; color: #777; }
        
        /* Cards */
        .card-elevated { background: #FFFFFF; border: 1px solid #E5E7EB; box-shadow: inset -2px -2px 0px 0px rgba(0,0,0,0.05); border-radius: 8px; }
        .card-elevated:hover { box-shadow: inset -2px -2px 1px -1px rgba(0,0,0,0.1); }
        
        /* Animations */
        .slide-in { animation: slide-in 0.5s ease-out; }
        @keyframes slide-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .drag-overlay { position: fixed; inset: 0; background: rgba(253, 251, 244, 0.85); backdrop-filter: blur(4px); z-index: 50; display: flex; align-items: center; justify-content: center; border: 4px dashed #F1D27A; pointer-events: none; }
      `}</style>

      {isDragging && (
        <div className="drag-overlay">
          <div className="text-center">
            <Upload size={64} className="text-[#967C29] mx-auto mb-4" />
            <p className="text-3xl font-serif font-medium text-[#333333]">Drop to Upload</p>
          </div>
        </div>
      )}

      {/* Top spacing follows 8px grid (40px on mobile, 80px on desktop) */}
      <div className="max-w-[1200px] mx-auto pt-[40px] md:pt-[80px] px-[16px] md:px-[32px]">
        
        <div className="text-center mb-[40px] md:mb-[64px] slide-in">
          <h1 className="text-[40px] md:text-[48px] font-serif font-medium mb-[8px] text-[#1F1F1F] tracking-tight">NoLoginTransfer</h1>
          <p className="text-[#333333] text-[16px] md:text-[18px]">Share files with anyone, instantly.</p>
        </div>

        {/* Layout Container */}
        <div className="max-w-[800px] mx-auto">
          
          <div className="mb-[32px] p-[16px] card-elevated slide-in flex items-center gap-[12px]">
            {connected ? <Wifi className="text-[#967C29]" size={24} /> : <WifiOff className="text-[#CDC9C1]" size={24} />}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[13px] uppercase tracking-wide text-[#333333]">Status</p>
              {connected ? (
                <p className="text-[22px] font-serif font-medium text-[#E48A00] truncate">Connected securely.</p>
              ) : (
                <p className="text-[16px] text-[#333333] truncate">{status}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-[32px] mb-[40px]">
            <div className="slide-in min-w-0">
              <label className="block text-[16px] font-serif font-medium mb-[8px] text-[#1F1F1F]">Your Room Code</label>
              <div className="flex w-full gap-[8px] mb-[12px]">
                <input type="text" value={roomCode} readOnly className="flex-1 w-full min-w-0 px-[16px] py-[12px] input-field text-[24px] font-serif text-center" placeholder="------" />
                <button onClick={copyToClipboard} disabled={!roomCode} className="btn-primary-dark px-[20px] flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"><Copy size={18} /></button>
              </div>
              <button onClick={() => setShowQR(!showQR)} disabled={!roomCode} className="w-full py-[8px] btn-ghost flex items-center justify-center gap-[8px] text-[16px] disabled:opacity-50">
                <QrCode size={16} />{showQR ? 'Hide' : 'Show'} QR Code
              </button>
              {showQR && roomCode && (
                <div className="mt-[16px] p-[16px] bg-white border border-[#E5E7EB] rounded-[2px] flex justify-center shadow-sm">
                  <QRCodeSVG value={connectionUrl} size={160} level="H" includeMargin={true} />
                </div>
              )}
              <p className="text-[13px] text-[#333333] mt-[12px] text-center md:text-left">💡 Share this code to connect</p>
            </div>

            <div className="slide-in min-w-0" style={{animationDelay: '0.1s'}}>
              <label className="block text-[16px] font-serif font-medium mb-[8px] text-[#1F1F1F]">Join a Room</label>
              <div className="flex w-full gap-[8px] mb-[12px]">
                <input type="text" value={remoteRoomCode} onChange={(e) => setRemoteRoomCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" disabled={connected} maxLength={6} className="flex-1 w-full min-w-0 px-[16px] py-[12px] input-field text-[24px] font-serif text-center disabled:opacity-50" />
                <button onClick={connectToRoom} disabled={connected || remoteRoomCode.length !== 6} className="btn-primary-dark px-[24px] font-medium shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                  {connected ? 'Connected' : 'Join'}
                </button>
              </div>
              <p className="text-[13px] text-[#333333] text-center md:text-left">💡 Or scan their QR code with your phone</p>
            </div>
          </div>

          {connected && (
            <div className="space-y-[32px] slide-in" style={{animationDelay: '0.2s'}}>
              <div className="p-[20px] md:p-[32px] card-elevated">
                <h3 className="text-[22px] font-serif font-medium mb-[20px] flex items-center gap-[8px] text-[#1F1F1F]">
                  <Upload size={22} className="text-[#967C29]" /> Send Files
                </h3>
                
                <div className="space-y-[20px]">
                  <div>
                    <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="w-full px-[16px] py-[32px] border-[2px] border-dashed border-[#CDC9C1] hover:border-[#F1D27A] bg-[#FDFBF4] rounded-[2px] font-medium transition-all flex flex-col md:flex-row items-center justify-center gap-[12px] text-[#333333] hover:bg-white text-[16px]">
                      <Upload size={24} className="text-[#967C29]" />
                      <span>Choose Files or Drag & Drop</span>
                    </button>
                  </div>

                  {warning && (
                    <div className="p-[12px] bg-[#FFF8E6] border border-[#F1D27A] rounded-[2px] flex items-start gap-[12px] text-[#E48A00] text-[13px]">
                      <AlertTriangle size={18} className="shrink-0 mt-[2px]" />
                      <p>{warning}</p>
                    </div>
                  )}

                  {files.length > 0 && (
                    <div className="space-y-[8px] max-h-[240px] overflow-y-auto pr-[4px]">
                      {files.map((fileObj) => (
                        <div key={fileObj.id} className="p-[12px] bg-white border border-[#E5E7EB] rounded-[2px] flex items-center gap-[12px]">
                          <div className="shrink-0">{getFileIcon(fileObj.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[16px] font-medium text-[#333333] truncate">{fileObj.name}</p>
                            <p className="text-[13px] text-[#777777]">{formatFileSize(fileObj.size)}</p>
                            {fileObj.progress > 0 && (
                              <div className="mt-[8px] w-full h-[4px] bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#0038FF] transition-all duration-300" style={{ width: `${fileObj.progress}%` }} />
                              </div>
                            )}
                          </div>
                          <button onClick={() => removeFile(fileObj.id)} className="p-[8px] hover:bg-[#FDFBF4] rounded-[2px] transition-colors shrink-0"><X size={16} className="text-[#333333]" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={sendFiles} 
                    disabled={files.length === 0} 
                    className="w-full py-[13px] btn-primary-gold flex items-center justify-center gap-[8px] text-[18px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} className={files.length === 0 ? "opacity-50" : ""} />
                    Send {files.length > 0 ? `${files.length} File(s)` : 'Files'}
                  </button>
                </div>
              </div>

              {receivedFiles.length > 0 && (
                <div className="p-[20px] md:p-[32px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px] mb-[20px]">
                    <h3 className="text-[22px] font-serif font-medium flex items-center gap-[8px] text-[#1F1F1F]">
                      <Download size={22} className="text-[#E48A00]" /> Received ({receivedFiles.length})
                    </h3>
                    <button onClick={downloadAllAsZip} disabled={downloadingAll} className="w-full md:w-auto px-[20px] py-[10px] btn-primary-dark text-[16px] flex items-center justify-center gap-[8px] disabled:opacity-50">
                      <PackageOpen size={16} />{downloadingAll ? 'Packing...' : 'Download All'}
                    </button>
                  </div>
                  
                  <div className="space-y-[8px] max-h-[240px] overflow-y-auto pr-[4px]">
                    {receivedFiles.map((file) => (
                      <div key={file.id} className="p-[12px] bg-[#FDFBF4] border border-[#E5E7EB] rounded-[2px] flex items-center gap-[12px]">
                        <div className="shrink-0">{getFileIcon(file.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[16px] font-medium text-[#333333] truncate">{file.name}</p>
                          <p className="text-[13px] text-[#777777]">{formatFileSize(file.size)}</p>
                        </div>
                        <a href={file.url} download={file.name} className="px-[16px] py-[8px] border border-[#333333] rounded-[9999px] text-[13px] font-medium hover:bg-[#333333] hover:text-white transition-colors flex items-center gap-[6px] shrink-0">
                          <Download size={14} /> Get
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-[40px] md:mt-[64px] grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[32px]">
            <div className="p-[24px] card-elevated slide-in min-w-0" style={{animationDelay: '0.3s'}}>
              <h3 className="text-[22px] font-serif font-medium mb-[16px] text-[#1F1F1F]">How it works</h3>
              <div className="space-y-[12px] text-[16px] text-[#333333]">
                <p>• Files transfer directly between devices</p>
                <p>• Nothing is stored on any server</p>
                <p>• Works on any device with a browser</p>
                <p>• Simple 6-digit room codes</p>
              </div>
            </div>
            <div className="p-[24px] card-elevated slide-in min-w-0" style={{animationDelay: '0.4s'}}>
              <h3 className="text-[22px] font-serif font-medium mb-[16px] text-[#1F1F1F]">Features</h3>
              <div className="space-y-[12px] text-[16px] text-[#333333]">
                <div className="flex items-start gap-[12px]"><Lock size={18} className="text-[#333333] shrink-0 mt-[3px]" /> <span>WebRTC DTLS Transport Security</span></div>
                <div className="flex items-start gap-[12px]"><FileArchive size={18} className="text-[#967C29] shrink-0 mt-[3px]" /> <span>Chunking Engine for Large Files</span></div>
                <div className="flex items-start gap-[12px]"><Rotate3d size={18} className="text-[#E48A00] shrink-0 mt-[3px]" /> <span>Direct Peer-to-Peer Transfer</span></div>
                <div className="flex items-start gap-[12px]"><Download size={18} className="text-[#0038FF] shrink-0 mt-[3px]" /> <span>Download all files as ZIP</span></div>
                <div className="flex items-start gap-[12px]"><QrCode size={18} className="text-[#333333] shrink-0 mt-[3px]" /> <span>Connect via QR Code</span></div>
                <div className="flex items-start gap-[12px]"><FishingHook size={18} className="text-[#D13D1B] shrink-0 mt-[3px]" /> <span>Drag & drop functionality</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <SpeedInsights />
    </div>
  );
}