import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-24 md:py-32 mt-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 mb-24">
          
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-8 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </div>
              <span className="text-xl font-bold tracking-tighter text-black">free-converter</span>
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-[280px]">
              A community-driven utility built for speed and security. Local processing means your files never leave your device.
            </p>
            <div className="flex space-x-5 items-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all" aria-label="GitHub Repository">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8">Photography</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/jpg-to-png" className="text-gray-500 hover:text-black transition-colors">JPG to PNG</Link></li>
              <li><Link to="/png-to-jpg" className="text-gray-500 hover:text-black transition-colors">PNG to JPG</Link></li>
              <li><Link to="/webp-to-jpg" className="text-gray-500 hover:text-black transition-colors">WEBP to JPG</Link></li>
              <li><Link to="/heic-to-jpg" className="text-gray-500 hover:text-black transition-colors">HEIC to JPG</Link></li>
              <li><Link to="/svg-to-png" className="text-gray-500 hover:text-black transition-colors">SVG to PNG</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8">Documents</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/docx-to-pdf" className="text-gray-500 hover:text-black transition-colors">Word to PDF</Link></li>
              <li><Link to="/xlsx-to-pdf" className="text-gray-500 hover:text-black transition-colors">Excel to PDF</Link></li>
              <li><Link to="/pdf-to-docx" className="text-gray-500 hover:text-black transition-colors">PDF to Word</Link></li>
              <li><Link to="/md-to-html" className="text-gray-500 hover:text-black transition-colors">MD to HTML</Link></li>
              <li><Link to="/epub-to-pdf" className="text-gray-500 hover:text-black transition-colors">EPUB to PDF</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8">Utilities</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/pdf-to-pdf" className="text-gray-500 hover:text-black transition-colors">Compress PDF</Link></li>
              <li><Link to="/mp4-to-gif" className="text-gray-500 hover:text-black transition-colors">Video to GIF</Link></li>
              <li><Link to="/mp4-to-mp3" className="text-gray-500 hover:text-black transition-colors">Extract Audio</Link></li>
              <li><Link to="/wav-to-mp3" className="text-gray-500 hover:text-black transition-colors">WAV to MP3</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8">Project</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/credits" className="text-gray-500 hover:text-black transition-colors">Open Source Credits</Link></li>
              <li><Link to="/safety" className="text-gray-500 hover:text-black transition-colors">Safety</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-black transition-colors">Privacy</Link></li>
              <li><Link to="/support" className="text-gray-500 hover:text-black transition-colors">Support</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em]">
              © 2025 FREE-CONVERTER.SITE
            </p>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Client-Side Secure</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;