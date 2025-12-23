
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConversionTool, AppState, ProcessingFile } from '../types';
import { 
  simulateProcessing, 
  processImageClient, 
  compressPdfClient, 
  convertDataClient, 
  convertMarkdownToHtml 
} from '../services/processorService';

interface Props {
  tool: ConversionTool;
  initialOutput?: string;
}

const CATEGORY_FEATURES: Record<string, { label: string; slug: string; sub: string }[]> = {
  image: [
    { label: "JPG to PNG", slug: "jpg-to-png", sub: "Transparency control" },
    { label: "PNG to JPG", slug: "png-to-jpg", sub: "Optimized compression" },
    { label: "PNG to WEBP", slug: "png-to-webp", sub: "Next-gen optimization" },
    { label: "HEIC to JPG", slug: "heic-to-jpg", sub: "Apple Photos sync" },
    { label: "SVG Vector", slug: "svg-to-png", sub: "Scalable output" },
    { label: "AVIF to JPG", slug: "avif-to-jpg", sub: "Format legacy" }
  ],
  pdf: [
    { label: "Compress PDF", slug: "pdf-to-pdf", sub: "Reduce file size" },
    { label: "PDF to Word", slug: "pdf-to-docx", sub: "Editable docs" },
    { label: "PDF to Excel", slug: "pdf-to-xlsx", sub: "Table extraction" },
    { label: "PDF to PPT", slug: "pdf-to-pptx", sub: "Presentation mode" },
    { label: "PDF to JPG", slug: "pdf-to-jpg", sub: "Visual export" },
    { label: "Word to PDF", slug: "docx-to-pdf", sub: "Document lock" },
    { label: "Excel to PDF", slug: "xlsx-to-pdf", sub: "Data snapshot" }
  ],
  video: [
    { label: "MP4 to WebM", slug: "mp4-to-webm", sub: "Web delivery" },
    { label: "MOV to MP4", slug: "mov-to-mp4", sub: "Universal playback" },
    { label: "Video to GIF", slug: "mp4-to-gif", sub: "Animation loop" },
    { label: "Extract Audio", slug: "mp4-to-mp3", sub: "High bitrate" },
    { label: "MKV to MP4", slug: "mkv-to-mp4", sub: "Stream ready" }
  ],
  audio: [
    { label: "MP3 to WAV", slug: "mp3-to-wav", sub: "Studio quality" },
    { label: "WAV to MP3", slug: "wav-to-mp3", sub: "Mobile friendly" },
    { label: "M4A to MP3", slug: "m4a-to-mp3", sub: "iTunes sync" },
    { label: "FLAC to MP3", slug: "flac-to-mp3", sub: "Space saver" }
  ],
  document: [
    { label: "Word to PDF", slug: "docx-to-pdf", sub: "Final export" },
    { label: "MD to HTML", slug: "md-to-html", sub: "Web rendering" },
    { label: "TXT to PDF", slug: "txt-to-pdf", sub: "Secure text" },
    { label: "EPUB to PDF", slug: "epub-to-pdf", sub: "Reader export" }
  ],
  text: [
    { label: "JSON to CSV", slug: "json-to-csv", sub: "Sheet export" },
    { label: "CSV to JSON", slug: "csv-to-json", sub: "API input" },
    { label: "XML to JSON", slug: "xml-to-json", sub: "Modern parser" }
  ]
};

const ConverterUI: React.FC<Props> = ({ tool, initialOutput }) => {
  const { conversionSlug } = useParams<{ conversionSlug?: string }>();
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [files, setFiles] = useState<ProcessingFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<string>(initialOutput || tool.supportedOutputs[0]);
  const [isZipping, setIsZipping] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(50); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCompressingPdf = tool.category === 'pdf' && targetFormat === 'pdf' && (conversionSlug === 'pdf-to-pdf' || !conversionSlug);

  useEffect(() => {
    if (initialOutput) setTargetFormat(initialOutput);
  }, [initialOutput]);

  const features = CATEGORY_FEATURES[tool.category] || [];

  const onFilesSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (!newFiles || newFiles.length === 0) return;
    
    const processingFiles: ProcessingFile[] = (Array.from(newFiles) as File[]).map((f: File) => {
      const originalName = f.name.split('.').slice(0, -1).join('.') || f.name;
      return {
        id: Math.random().toString(36).substr(2, 9),
        file: f,
        previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
        status: 'pending',
        progress: 0,
        outputFormat: targetFormat,
        customName: originalName
      };
    });
    
    setFiles(prev => [...prev, ...processingFiles]);
    setAppState(AppState.UPLOADED);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [targetFormat]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      if (filtered.length === 0) setAppState(AppState.IDLE);
      return filtered;
    });
  };

  const updateFileName = (id: string, newName: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, customName: newName } : f));
  };

  const handleConvert = async () => {
    setAppState(AppState.PROCESSING);
    
    const updatedFiles = await Promise.all(files.map(async (f) => {
      try {
        setFiles(prev => prev.map(p => p.id === f.id ? { ...p, status: 'converting' } : p));
        let resultUrl = '';
        
        if (isCompressingPdf) {
          resultUrl = await compressPdfClient(f.file, compressionLevel);
        }
        else if (tool.category === 'image' && f.file.type.startsWith('image/')) {
          resultUrl = await processImageClient(f.file, targetFormat);
        } 
        else if (tool.category === 'text' || tool.category === 'document') {
           const text = await f.file.text();
           let converted = '';
           const from = f.file.name.split('.').pop() || 'txt';
           
           if (targetFormat === 'html' && from === 'md') {
             converted = convertMarkdownToHtml(text);
           } else {
             converted = await convertDataClient(text, from, targetFormat);
           }
           
           const mimeType = targetFormat === 'html' ? 'text/html' : 'text/plain';
           const blob = new Blob([converted], { type: mimeType });
           resultUrl = URL.createObjectURL(blob);
        }
        else {
          resultUrl = await simulateProcessing(f, (progress) => {
            setFiles(prev => prev.map(p => p.id === f.id ? { ...p, progress } : p));
          });
        }
        
        setFiles(prev => prev.map(p => p.id === f.id ? { ...p, progress: 100 } : p));
        return { ...f, status: 'completed' as const, progress: 100, resultUrl };
      } catch (err) {
        return { ...f, status: 'error' as const, error: String(err) };
      }
    }));
    
    setFiles(updatedFiles);
    setAppState(AppState.COMPLETED);
  };

  const handleDownloadAllZip = async () => {
    if (isZipping) return;
    setIsZipping(true);
    
    try {
      const JSZipModule = await import('https://esm.sh/jszip@3.10.1');
      const JSZip = JSZipModule.default;
      const zip = new JSZip();
      
      const completedFiles = files.filter(f => f.status === 'completed' && f.resultUrl);
      
      for (const f of completedFiles) {
        const response = await fetch(f.resultUrl!);
        const blob = await response.blob();
        const extension = targetFormat.toLowerCase();
        zip.file(`${f.customName || 'converted'}.${extension}`, blob);
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted_files_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP Generation error:", err);
    } finally {
      setIsZipping(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setAppState(AppState.IDLE);
  };

  const getPageTitle = () => {
    if (conversionSlug && conversionSlug.includes('-to-')) {
      const [from, to] = conversionSlug.split('-to-');
      return `${from.toUpperCase()} to ${to.toUpperCase()}`;
    }
    return tool.title;
  };

  const getEstimatedSize = (originalSize: number) => {
    const factor = 0.95 - (compressionLevel / 100) * 0.65;
    return (originalSize * factor / 1024 / 1024).toFixed(2);
  };

  const getReductionPercentage = () => {
    const factor = 0.95 - (compressionLevel / 100) * 0.65;
    return Math.round((1 - factor) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
               <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center" dangerouslySetInnerHTML={{ __html: tool.icon }} />
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Utility / {tool.category}</span>
            </div>
            <h2 className="text-5xl font-extrabold tracking-tighter mb-4 text-black">{getPageTitle()}</h2>
            <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-xl">{tool.description}</p>
          </div>

          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
            {appState === AppState.IDLE && (
              <div 
                onClick={triggerFileSelect}
                className="p-10 md:p-32 m-4 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black transition-all group"
              >
                <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                </div>
                <p className="text-3xl font-bold text-black tracking-tight text-center">Drop files or click to add</p>
                <p className="text-gray-400 mt-4 font-medium text-center">No internet required for most tools. Bulk processing enabled.</p>
              </div>
            )}

            {appState !== AppState.IDLE && (
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Queue ({files.length} Files)</h4>
                   {appState === AppState.COMPLETED && (
                     <button 
                       onClick={reset}
                       className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:underline inline-flex items-center gap-2 transition-colors"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                       Start New Project
                     </button>
                   )}
                </div>

                {isCompressingPdf && appState === AppState.UPLOADED && (
                  <div className="mb-10 p-10 bg-black rounded-[2.5rem] text-white shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-between items-end mb-10">
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Local Optimization Engine</h5>
                        <p className="text-3xl font-extrabold tracking-tighter">PDF Bitrate Control</p>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-black text-emerald-400">-{getReductionPercentage()}%</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Target Reduction</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="relative">
                        <input 
                          type="range" 
                          min="1" 
                          max="100" 
                          value={compressionLevel} 
                          onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                        />
                        <div className="flex justify-between mt-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Lossless</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Maximum Comp</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                        <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Processing Type</span>
                           <span className="text-sm font-bold flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                             Client-Side (Local)
                           </span>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Result Size</span>
                           <span className="text-sm font-bold text-emerald-400">
                             {files.length > 0 ? getEstimatedSize(files[0].file.size) : '0'} MB
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-12 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {files.map(f => (
                    <div key={f.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in duration-500 gap-4">
                      <div className="flex items-center space-x-6 flex-1">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-gray-300 shadow-sm overflow-hidden">
                           {f.previewUrl ? <img src={f.previewUrl} className="w-full h-full object-cover" /> : 
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          {f.status === 'completed' ? (
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Export Label</span>
                              <input 
                                type="text"
                                value={f.customName}
                                onChange={(e) => updateFileName(f.id, e.target.value)}
                                className="text-lg font-bold text-black bg-transparent border-b border-gray-200 focus:border-black outline-none w-full"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="text-lg font-bold text-black truncate">{f.file.name}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{(f.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                {isCompressingPdf && appState === AppState.UPLOADED && (
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest">→ {getEstimatedSize(f.file.size)} MB</p>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 shrink-0">
                        {appState === AppState.UPLOADED && (
                          <button onClick={() => removeFile(f.id)} className="p-3 text-gray-300 hover:text-black transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                          </button>
                        )}
                        
                        {f.status === 'converting' && (
                          <div className="w-32 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-black transition-all duration-300" style={{ width: `${f.progress}%` }}></div>
                          </div>
                        )}

                        {f.status === 'completed' && f.resultUrl && (
                          <div className="flex items-center gap-2">
                            <a 
                              href={f.resultUrl} 
                              download={`${f.customName || 'converted'}.${targetFormat}`}
                              className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg"
                            >
                              Download
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {appState === AppState.UPLOADED && (
                  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-10 gap-6">
                    <div className="flex items-center space-x-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Target</span>
                      <select 
                        value={targetFormat}
                        onChange={(e) => setTargetFormat(e.target.value)}
                        className="bg-transparent border-none text-black text-sm font-bold uppercase tracking-widest cursor-pointer focus:ring-0"
                      >
                        {tool.supportedOutputs.map(out => (
                          <option key={out} value={out}>{out.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex space-x-4 w-full sm:w-auto">
                      <button 
                        onClick={triggerFileSelect}
                        className="flex-1 sm:flex-none px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold transition-all hover:bg-gray-200"
                      >
                        Add Files
                      </button>
                      <button 
                        onClick={handleConvert}
                        className="btn-premium flex-1 sm:flex-none px-12 py-4 rounded-xl font-bold tracking-tight text-lg"
                      >
                        {isCompressingPdf ? 'Run Optimizer' : 'Convert All'}
                      </button>
                    </div>
                  </div>
                )}

                {appState === AppState.COMPLETED && (
                  <div className="text-center pt-10 border-t border-gray-100 flex flex-col items-center">
                    <button 
                       onClick={reset}
                       className="px-12 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all mb-4"
                    >
                      Start New Project
                    </button>
                    {files.length > 1 && (
                      <button 
                        onClick={handleDownloadAllZip}
                        className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline"
                      >
                        Download all as ZIP
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-100/30">
            <h3 className="text-sm font-bold tracking-widest mb-10 text-black uppercase">
              Other <span className="text-gray-400">Utilities</span>
            </h3>
            <div className="space-y-3">
              {features.map((feature, i) => (
                <Link 
                  key={i} 
                  to={`/${feature.slug}`}
                  className={`group flex items-center justify-between p-5 rounded-2xl transition-all border ${conversionSlug === feature.slug ? 'bg-black border-black text-white' : 'bg-gray-50 border-gray-50 hover:border-gray-300'}`}
                >
                  <div>
                    <h4 className="text-sm font-bold mb-1">{feature.label}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${conversionSlug === feature.slug ? 'text-white/50' : 'text-gray-400'}`}>{feature.sub}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${conversionSlug === feature.slug ? 'bg-white/10' : 'bg-white text-black'}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <input type="file" className="hidden" ref={fileInputRef} multiple onChange={onFilesSelected} />
    </div>
  );
};

export default ConverterUI;
