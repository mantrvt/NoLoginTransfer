import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Copy, Lock, FileArchive, Rotate3d, FishingHook, Upload, Download, Wifi, WifiOff, X, QrCode, File, Image, Video, FileText, PackageOpen, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import JSZip from 'jszip';
import { SpeedInsights } from "@vercel/speed-insights/react";
import bgImage from './assets/bg8.png';

import { Canvas } from '@react-three/fiber';
// 🚀 NEW: Added OrbitControls to the import!
import { useGLTF, Environment, Float, Center, OrbitControls } from '@react-three/drei';

function Logo3D() {
  const gltf = useGLTF('/Transfuh.gltf'); 
  // 🚀 CLEANUP: We deleted the useFrame custom spin because OrbitControls does it better!
  return (
    <Center>
      <primitive 
        object={gltf.scene} 
        scale={[6, 6, 6]} 
        rotation={[0, -1.57, 0]} 
      />
    </Center>
  );
}

export default function NoLoginTransfer() {
  const [roomCode, setRoomCode] = useState('');
  const [peerId, setPeerId] = useState('');
  const [remoteRoomCode, setRemoteRoomCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [files, setFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [receivingProgress, setReceivingProgress] = useState({}); 
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
    script.integrity = 'sha384-qOF1Ybxd53PR4BTaDzAk+eXLDARxOKQYQpXPqbJu/xkJWLIDDfP/ZusfTctQyNs+';
    script.crossOrigin = 'anonymous';
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

    if (data.fileName) {
      data.fileName = data.fileName.split(/[\\/]/).pop().replace(/\.\./g, '');
    }

    if (data.type === 'file-start') {
      incomingFilesRef.current[data.fileName] = {
        chunks: [],
        type: data.fileType,
        size: data.fileSize,
        receivedBytes: 0,
        lastReportedProgress: 0
      };
      
      setReceivingProgress(prev => ({
        ...prev,
        [data.fileName]: { size: data.fileSize, type: data.fileType, progress: 0 }
      }));
      
      setStatus(`Receiving: ${data.fileName}...`);
      
    } else if (data.type === 'file-chunk') {
      const fileTracker = incomingFilesRef.current[data.fileName];
      if (fileTracker) {
        fileTracker.chunks.push(data.chunk);
        fileTracker.receivedBytes += data.chunk.byteLength;
        
        const currentProgress = Math.min(100, Math.round((fileTracker.receivedBytes / fileTracker.size) * 100));
        if (currentProgress >= fileTracker.lastReportedProgress + 5) {
          fileTracker.lastReportedProgress = currentProgress;
          setReceivingProgress(prev => ({
            ...prev,
            [data.fileName]: { ...prev[data.fileName], progress: currentProgress }
          }));
        }
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
        
        setReceivingProgress(prev => {
          const copy = { ...prev };
          delete copy[data.fileName];
          return copy;
        });
        
        setStatus(`✅ Got: ${data.fileName}`);
      }
    } else if (data.type === 'batch-start') {
      setStatus(`Receiving ${data.fileCount} file(s)...`);
    } else if (data.type === 'batch-complete') {
      setStatus('All files received!');
    }
  };

  const removeReceivedFile = (fileId, fileUrl) => {
    setReceivedFiles(prev => prev.filter(f => f.id !== fileId));
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
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
      
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); 
      const yy = String(today.getFullYear()).slice(-2);
      
      const formattedDate = `${dd}-${mm}-${yy}`;
      
      const randomId = Math.floor(Math.random() * 9000) + 1000;
      
      const a = document.createElement('a');
      a.href = url;
      
      a.download = `transfuhhh-(${formattedDate})-${randomId}.zip`;
      
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
    if (!type) return <File size={20} className="text-muted-sage" />;
    if (type.startsWith('image/')) return <Image size={20} className="text-primary" />;
    if (type.startsWith('video/')) return <Video size={20} className="text-white" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText size={20} className="text-white" />;
    return <File size={20} className="text-muted-sage" />;
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
      className="min-h-screen overflow-x-hidden text-white font-mono pb-[64px]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {isDragging && (
        <div className="drag-overlay">
          <div className="text-center">
            <Upload size={48} className="text-primary mx-auto mb-4" />
            <p className="text-[24px] font-display text-white">Drop files here</p>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto pt-[40px] md:pt-[64px] px-[16px] md:px-[32px]">
        
        <div className="text-center mb-[40px] md:mb-[64px] slide-in flex flex-col items-center">
          
          {/* 1. The Anchor: Holds the normal space so your page layout doesn't collapse */}
          <div className="relative w-full h-[120px] md:h-[180px] mb-[16px] flex justify-center items-center">
            
            {/* 2. The Spiller: This floats OVER everything else (absolute) and sits on top (z-10) */}
            <div className="absolute z-10 w-[500px] md:w-[800px] h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
              
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1.5} />
                  <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={true} 
                    autoRotateSpeed={4} 
                  />
                  
                  {/* You can make the scale HUGE here now! */}
                  <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
                    <Logo3D />
                  </Float>
                  
                  <Environment preset="city" />
                </Suspense>
              </Canvas>

            </div>
          </div>
          
          {/* We added relative and z-20 here so this text still sits on top of the 3D canvas */}
          <p className="relative z-20 font-heading-sec text-muted-sage text-[16px] text-white drop-shadow-md">
            Share files with anyone, instantly.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto">
          
          <div className="mb-[32px] p-[16px] card-secondary slide-in flex items-center gap-[16px]">
            {connected ? <Wifi className="text-primary" size={24} /> : <WifiOff className="text-dark-gray" size={24} />}
            <div className="flex-1 min-w-0">
              <p className="font-heading-sec text-[14px] uppercase text-white">Status</p>
              <p className={`font-label text-[18px] truncate ${connected ? 'text-primary' : 'text-muted-sage'}`}>{status}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-[24px] mb-[48px]">
            <div className="slide-in min-w-0 card-primary">
              <label className="block font-heading-sec text-[18px] mb-[12px] text-white">Your Room Code</label>
              <div className="flex w-full gap-[8px] mb-[8px]">
                <input type="text" value={roomCode} readOnly className="flex-1 w-full min-w-0 px-[8px] h-[44px] md:h-[32px] input-field text-[16px] text-center" placeholder="------" />
                <button onClick={copyToClipboard} disabled={!roomCode} className="btn-icon w-[44px] h-[44px] md:w-[32px] md:h-[32px] flex items-center justify-center shrink-0 disabled:opacity-50"><Copy size={16} /></button>
              </div>
              <button onClick={() => setShowQR(!showQR)} disabled={!roomCode} className="w-full btn-ghost py-[8px] mt-[8px] flex items-center justify-center gap-[8px] text-[14px] font-heading-sec disabled:opacity-50">
                <QrCode size={16} />{showQR ? 'Hide' : 'Show'} QR Code
              </button>
              {showQR && roomCode && (
                <div className="mt-[16px] p-[16px] bg-white border border-very-dark rounded-[0px] flex justify-center">
                  <QRCodeSVG value={connectionUrl} size={160} level="H" includeMargin={true} />
                </div>
              )}
              <p className="text-[12px] text-muted-sage mt-[16px] text-center md:text-left font-ui">💡 Share this code to connect</p>
            </div>

            <div className="slide-in min-w-0 card-primary" style={{animationDelay: '0.1s'}}>
              <label className="block font-heading-sec text-[18px] mb-[12px] text-white">Join a Room</label>
              <div className="flex w-full gap-[8px] mb-[8px]">
                <input type="text" value={remoteRoomCode} onChange={(e) => setRemoteRoomCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" disabled={connected} maxLength={6} className="flex-1 w-full min-w-0 px-[8px] h-[44px] md:h-[32px] input-field text-[16px] text-center disabled:opacity-50" />
                <button onClick={connectToRoom} disabled={connected || remoteRoomCode.length !== 6} className="btn-primary h-[44px] md:h-[32px] px-[16px] text-[16px] shrink-0 disabled:opacity-50">
                  {connected ? 'Connected' : 'Join'}
                </button>
              </div>
              <p className="text-[12px] text-muted-sage mt-[16px] text-center md:text-left font-ui">💡 Or scan their QR code with your phone</p>
            </div>
          </div>

          {connected && (
            <div className="space-y-[40px] slide-in" style={{animationDelay: '0.2s'}}>
              
              <div className="card-primary">
                <h3 className="font-heading-sec text-[20px] mb-[16px] flex items-center gap-[8px] text-white">
                  <Upload size={20} className="text-primary" /> Send Files
                </h3>
                
                <div className="space-y-[16px]">
                  <div>
                    <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="w-full px-[16px] py-[32px] border-[1px] border-dashed border-base hover:border-primary hover:bg-primary/10 bg-transparent transition-all flex flex-col md:flex-row items-center justify-center gap-[12px] text-muted-sage font-label text-[16px]">
                      <Upload size={24} className="mb-[4px] md:mb-0 text-white" />
                      <span>Choose Files or Drag & Drop</span>
                    </button>
                  </div>

                  {warning && (
                    <div className="p-[12px] bg-warning-gold/10 border border-warning-gold flex items-start gap-[12px] text-warning-gold text-[14px]">
                      <AlertTriangle size={18} className="shrink-0 mt-[2px] text-warning-gold" />
                      <p>{warning}</p>
                    </div>
                  )}

                  {files.length > 0 && (
                    <div className="space-y-[8px] max-h-[240px] overflow-y-auto pr-[4px]">
                      {files.map((fileObj) => (
                        <div key={fileObj.id} className="p-[12px] card-secondary flex items-center gap-[12px]">
                          <div className="shrink-0">{getFileIcon(fileObj.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-label text-white truncate">{fileObj.name}</p>
                            <p className="text-[12px] font-ui text-dark-gray">{formatFileSize(fileObj.size)}</p>
                            {fileObj.progress > 0 && (
                              <div className="mt-[8px] progress-track">
                                <div className="progress-fill" style={{ width: `${fileObj.progress}%` }} />
                              </div>
                            )}
                          </div>
                          <button onClick={() => removeFile(fileObj.id)} className="p-[8px] hover:bg-primary/10 hover:text-primary transition-colors shrink-0 text-dark-gray"><X size={16} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={sendFiles} 
                    disabled={files.length === 0} 
                    className="w-full py-[12px] btn-primary flex items-center justify-center gap-[8px] text-[18px] disabled:opacity-50"
                  >
                    <Upload size={18} className={files.length === 0 ? "opacity-50" : ""} />
                    Send {files.length > 0 ? `${files.length} File(s)` : 'Files'}
                  </button>
                </div>
              </div>

              {(receivedFiles.length > 0 || Object.keys(receivingProgress).length > 0) && (
                <div className="card-primary bg-near-black">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px] mb-[16px]">
                    <h3 className="font-heading-sec text-[20px] flex items-center gap-[8px] text-white">
                      <Download size={20} className="text-highlight" /> Received ({receivedFiles.length})
                    </h3>
                    <button onClick={downloadAllAsZip} disabled={downloadingAll || receivedFiles.length === 0} className="w-full md:w-auto px-[16px] py-[8px] btn-primary text-[14px] flex items-center justify-center gap-[8px] disabled:opacity-50">
                      <PackageOpen size={16} />{downloadingAll ? 'Packing...' : 'Download All'}
                    </button>
                  </div>
                  
                  <div className="space-y-[8px] max-h-[240px] overflow-y-auto pr-[4px]">
                    
                    {Object.entries(receivingProgress).map(([fileName, info]) => (
                      <div key={`incoming-${fileName}`} className="p-[12px] card-secondary flex items-center gap-[12px]">
                        <div className="shrink-0">{getFileIcon(info.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-label text-white truncate">{fileName}</p>
                          <p className="text-[12px] font-ui text-dark-gray">Receiving... {formatFileSize(info.size)}</p>
                          <div className="mt-[8px] progress-track">
                            <div className="progress-fill" style={{ width: `${info.progress}%` }} />
                          </div>
                        </div>
                        <div className="p-[8px] shrink-0">
                          <span className="text-[12px] text-highlight font-ui">{info.progress}%</span>
                        </div>
                      </div>
                    ))}

                    {receivedFiles.map((file) => (
                      <div key={file.id} className="p-[12px] card-secondary flex items-center gap-[12px]">
                        <div className="shrink-0">{getFileIcon(file.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-label text-white truncate">{file.name}</p>
                          <p className="text-[12px] font-ui text-dark-gray">{formatFileSize(file.size)}</p>
                        </div>
                        <div className="flex items-center gap-[8px] shrink-0">
                          <a href={file.url} download={file.name} className="px-[12px] py-[6px] btn-primary text-[14px] flex items-center gap-[6px]">
                            <Download size={14} /> Get
                          </a>
                          <button 
                            onClick={() => removeReceivedFile(file.id, file.url)} 
                            className="p-[8px] hover:bg-primary/10 hover:text-primary transition-colors text-dark-gray"
                            title="Remove file"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-[48px] md:mt-[64px] grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="card-secondary slide-in min-w-0" style={{animationDelay: '0.3s'}}>
              <h3 className="font-heading-sec text-[18px] mb-[16px] text-white">How it works</h3>
              <div className="space-y-[12px] text-[14px] text-muted-sage font-ui">
                <p>• Files transfer directly between devices</p>
                <p>• Nothing is stored on any server</p>
                <p>• Works on any device with a browser</p>
                <p>• Simple 6-digit room codes</p>
              </div>
            </div>
            <div className="card-secondary slide-in min-w-0" style={{animationDelay: '0.4s'}}>
              <h3 className="font-heading-sec text-[18px] mb-[16px] text-white">Features</h3>
              <div className="space-y-[12px] text-[14px] text-muted-sage font-ui">
                <div className="flex items-start gap-[12px]"><Lock size={16} className="text-white shrink-0 mt-[2px]" /> <span>WebRTC DTLS Transport Security</span></div>
                <div className="flex items-start gap-[12px]"><FileArchive size={16} className="text-primary shrink-0 mt-[2px]" /> <span>Chunking Engine for Large Files</span></div>
                <div className="flex items-start gap-[12px]"><Rotate3d size={16} className="text-white shrink-0 mt-[2px]" /> <span>Direct Peer-to-Peer Transfer</span></div>
                <div className="flex items-start gap-[12px]"><Download size={16} className="text-highlight shrink-0 mt-[2px]" /> <span>Download all files as ZIP</span></div>
                <div className="flex items-start gap-[12px]"><QrCode size={16} className="text-white shrink-0 mt-[2px]" /> <span>Connect via QR Code</span></div>
                <div className="flex items-start gap-[12px]"><FishingHook size={16} className="text-primary shrink-0 mt-[2px]" /> <span>Drag & drop functionality</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <SpeedInsights />
    </div>
  );
}