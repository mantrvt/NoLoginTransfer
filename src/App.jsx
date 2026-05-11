import React, { useState, useEffect, useRef } from 'react';
import { Copy, Lock, FileArchive, Rotate3d, FishingHook, Upload, Download, Wifi, WifiOff, X, QrCode, File, Image, Video, FileText, PackageOpen, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import JSZip from 'jszip';

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
  
  // Ref to store incoming file chunks for massive files
  const incomingFilesRef = useRef({});

  // Generate short 6-digit code
  const generateRoomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Initialize PeerJS
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
        });
        
        conn.on('data', handleIncomingData);

        conn.on('close', () => {
          setConnected(false);
          setStatus('Connection closed');
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
    };
  }, []);

  // Connect to remote peer
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
    });

    conn.on('data', handleIncomingData);

    conn.on('close', () => {
      setConnected(false);
      setStatus('Connection closed');
    });

    conn.on('error', (err) => {
      setStatus('Could not connect - check the room code');
    });
  };

  /**
   * 📥 RECEIVER LOGIC (Now handles stitched chunks)
   */
  const handleIncomingData = async (data) => {
    // 1. File starting metadata
    if (data.type === 'file-start') {
      incomingFilesRef.current[data.fileName] = {
        chunks: [],
        type: data.fileType,
        size: data.fileSize,
        receivedBytes: 0
      };
      setStatus(`Receiving: ${data.fileName}...`);
    } 
    // 2. Incoming file chunks
    else if (data.type === 'file-chunk') {
      const fileTracker = incomingFilesRef.current[data.fileName];
      if (fileTracker) {
        fileTracker.chunks.push(data.chunk);
        fileTracker.receivedBytes += data.chunk.byteLength;
      }
    } 
    // 3. File completed
    else if (data.type === 'file-end') {
      const fileTracker = incomingFilesRef.current[data.fileName];
      if (fileTracker) {
        // Stitch all chunks together into a single Blob
        const blob = new Blob(fileTracker.chunks, { type: fileTracker.type });
        const url = URL.createObjectURL(blob);
        
        setReceivedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: data.fileName,
          size: fileTracker.size,
          url: url,
          type: fileTracker.type
        }]);
        
        // Clear memory
        delete incomingFilesRef.current[data.fileName];
        setStatus(`✅ Got: ${data.fileName}`);
      }
    }
    else if (data.type === 'batch-start') {
      setStatus(`Receiving ${data.fileCount} file(s)...`);
    } 
    else if (data.type === 'batch-complete') {
      setStatus('All files received!');
    }
  };

  /**
   * 📤 SENDER LOGIC (Now slices massive files)
   */
  const sendSingleFile = async (fileObj, index) => {
    return new Promise(async (resolve) => {
      const file = fileObj.file;
      const CHUNK_SIZE = 64 * 1024; // Slice into 64KB chunks
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      
      // 1. Tell the receiver a file is coming
      connectionRef.current.send({
        type: 'file-start',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        totalChunks: totalChunks
      });

      let offset = 0;
      let chunkCount = 0;

      // 2. Read and send the file slice by slice
      while (offset < file.size) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        const buffer = await chunk.arrayBuffer();

        // 🛑 BACKPRESSURE LOGIC: Wait if the WebRTC buffer is getting full
        const dc = connectionRef.current.dataChannel;
        if (dc) {
          // If buffer holds more than 1MB, pause for 10ms to let it drain
          while (dc.bufferedAmount > 1024 * 1024) {
            await new Promise(r => setTimeout(r, 10));
          }
        }

        // Send the tiny chunk
        connectionRef.current.send({
          type: 'file-chunk',
          fileName: file.name,
          chunk: buffer
        });

        offset += CHUNK_SIZE;
        chunkCount++;

        // Update UI progress every 5% so React doesn't lag the browser
        if (chunkCount % Math.ceil(totalChunks / 20) === 0 || offset >= file.size) {
          const progress = Math.round((offset / file.size) * 100);
          setFiles(prev => prev.map((f, idx) => 
            idx === index ? { ...f, progress } : f
          ));
        }
      }

      // 3. Tell receiver the file is fully sent
      connectionRef.current.send({
        type: 'file-end',
        fileName: file.name
      });

      resolve();
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

  // Add files to queue
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
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      if (updated.length === 0) setWarning('');
      return updated;
    });
  };

  // Drag & Drop
  const handleDragEnter = (e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) addFiles(droppedFiles);
  };

  // Download ZIP
  const downloadAllAsZip = async () => {
    if (receivedFiles.length === 0) return;
    setDownloadingAll(true);
    setStatus('Packing files...');
    
    try {
      const zip = new JSZip();
      for (const file of receivedFiles) {
        const response = await fetch(file.url);
        const blob = await response.blob();
        zip.file(file.name, blob);
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
    if (type.startsWith('image/')) return <Image size={20} className="text-blue-400" />;
    if (type.startsWith('video/')) return <Video size={20} className="text-purple-400" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText size={20} className="text-red-400" />;
    return <File size={20} className="text-slate-400" />;
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 font-sans"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;600;700&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; letter-spacing: 0.1em; }
        .glow { box-shadow: 0 0 20px rgba(56, 189, 248, 0.3), 0 0 40px rgba(56, 189, 248, 0.1); }
        .glow-green { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1); }
        .slide-in { animation: slide-in 0.5s ease-out; }
        @keyframes slide-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .gradient-text { background: linear-gradient(135deg, #38bdf8, #818cf8, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .drag-overlay { position: fixed; inset: 0; background: rgba(56, 189, 248, 0.1); backdrop-filter: blur(8px); z-index: 50; display: flex; align-items: center; justify-content: center; border: 4px dashed #38bdf8; pointer-events: none; }
        .drag-overlay-content { animation: float 2s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      `}</style>

      {isDragging && (
        <div className="drag-overlay">
          <div className="drag-overlay-content text-center">
            <Upload size={64} className="text-sky-400 mx-auto mb-4" />
            <p className="text-2xl font-bold text-sky-400">Drop files here</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 slide-in">
          <h1 className="text-5xl font-bold mb-3 pb-2 gradient-text tracking-tight">NoLoginTransfer</h1>
          <p className="text-slate-400 text-lg">Share files with anyone, instantly.</p>
        </div>

        <div className={`mb-8 p-4 rounded-xl border-2 slide-in ${ connected ? 'bg-emerald-500/10 border-emerald-500/50 glow-green' : 'bg-slate-800/50 border-slate-700' }`}>
          <div className="flex items-center gap-3">
            {connected ? <Wifi className="text-emerald-400" size={24} /> : <WifiOff className="text-slate-400" size={24} />}
            <div className="flex-1">
              <p className="font-semibold text-sm uppercase tracking-wide text-slate-300">Status</p>
              <p className={`text-lg ${connected ? 'text-emerald-400' : 'text-slate-400'}`}>{status}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="slide-in">
            <label className="block text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">Your Room Code</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={roomCode} readOnly className="flex-1 px-4 py-4 bg-slate-800/80 border-2 border-slate-700 rounded-xl mono text-2xl text-center focus:outline-none focus:border-sky-500 transition-colors" placeholder="------" />
              <button onClick={copyToClipboard} disabled={!roomCode} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all flex items-center gap-2 glow"><Copy size={18} /></button>
            </div>
            <button onClick={() => setShowQR(!showQR)} disabled={!roomCode} className="w-full px-4 py-2 bg-slate-800/50 hover:bg-slate-700 disabled:bg-slate-800/30 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm border border-slate-700">
              <QrCode size={16} />{showQR ? 'Hide' : 'Show'} QR Code
            </button>
            {showQR && roomCode && (
              <div className="mt-4 p-4 bg-white rounded-xl flex justify-center">
                <QRCodeSVG value={connectionUrl} size={200} level="H" includeMargin={true} />
              </div>
            )}
            <p className="text-xs text-slate-500 mt-3">💡 Share this code with anyone to connect</p>
          </div>

          <div className="slide-in" style={{animationDelay: '0.1s'}}>
            <label className="block text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">Join a Room</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={remoteRoomCode} onChange={(e) => setRemoteRoomCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" disabled={connected} maxLength={6} className="flex-1 px-4 py-4 bg-slate-800/80 border-2 border-slate-700 rounded-xl mono text-2xl text-center focus:outline-none focus:border-sky-500 transition-colors disabled:opacity-50" />
              <button onClick={connectToRoom} disabled={connected || remoteRoomCode.length !== 6} className="px-6 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all">
                {connected ? 'Connected' : 'Join'}
              </button>
            </div>
            <p className="text-xs text-slate-500">💡 Or scan their QR code with your phone</p>
          </div>
        </div>

        {connected && (
          <div className="space-y-6 slide-in" style={{animationDelay: '0.2s'}}>
            <div className="p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload size={24} className="text-sky-400" />Send Files</h3>
              
              <div className="space-y-4">
                <div>
                  <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
                  <button onClick={() => fileInputRef.current.click()} className="w-full px-6 py-4 border-2 border-dashed border-slate-600 hover:border-sky-500 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-slate-400 hover:text-sky-400">
                    <Upload size={20} />Choose Files or Drag & Drop
                  </button>
                </div>

                {warning && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3 text-amber-300 text-sm animate-pulse">
                    <AlertTriangle size={18} className="shrink-0" />
                    <p>{warning}</p>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map((fileObj) => (
                      <div key={fileObj.id} className="p-3 bg-slate-900/50 rounded-lg flex items-center gap-3">
                        {getFileIcon(fileObj.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-300 truncate">{fileObj.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(fileObj.size)}</p>
                          {fileObj.progress > 0 && (
                            <div className="mt-1 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-300" style={{ width: `${fileObj.progress}%` }} />
                            </div>
                          )}
                        </div>
                        <button onClick={() => removeFile(fileObj.id)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><X size={16} className="text-slate-500" /></button>
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={sendFiles} 
                  disabled={files.length === 0} 
                  className="w-full px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed rounded-xl font-bold transition-all glow flex items-center justify-center gap-2"
                >
                  <Upload size={20} className={files.length === 0 ? "opacity-50" : ""} />
                  Send {files.length > 0 ? `${files.length} File(s)` : 'Files'}
                </button>
              </div>
            </div>

            {receivedFiles.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 rounded-xl border-2 border-emerald-500/50 glow-green">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Download size={24} className="text-emerald-400" />Received ({receivedFiles.length})
                  </h3>
                  <button onClick={downloadAllAsZip} disabled={downloadingAll} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                    <PackageOpen size={16} />{downloadingAll ? 'Packing...' : 'Download All'}
                  </button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {receivedFiles.map((file) => (
                    <div key={file.id} className="p-3 bg-slate-900/50 rounded-lg flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-300 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                      </div>
                      <a href={file.url} download={file.name} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                        <Download size={16} />Get
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 slide-in" style={{animationDelay: '0.3s'}}>
            <h3 className="text-lg font-bold mb-3 text-slate-300">How it works</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>• Files transfer directly between devices</p>
              <p>• Nothing is stored on any server</p>
              <p>• Works on any device with a browser</p>
              <p>• Simple 6-digit room codes</p>
            </div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 slide-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-bold mb-3 text-slate-300">Features</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Lock size={16} className="text-blue-400" /> WebRTC DTLS Transport Security</div>
              <div className="flex items-center gap-2"><FileArchive size={16} className="text-yellow-400" /> Chunking Engine for Large Files</div>
              <div className="flex items-center gap-2"><Rotate3d size={16} className="text-red-400" /> Direct Peer-to-Peer Transfer</div>
              <div className="flex items-center gap-2"><Download size={16} className="text-green-400" /> Download all files as ZIP</div>
              <div className="flex items-center gap-2"><QrCode size={16} className="text-orange-400" /> Connect via QR Code</div>
              <div className="flex items-center gap-2"><FishingHook size={16} className="text-purple-400" /> Drag & drop functionality</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}