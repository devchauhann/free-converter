import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-black">free-converter</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-bold text-gray-500 hover:text-black transition">Tools</Link>
            <Link to="/credits" className="text-sm font-bold text-gray-500 hover:text-black transition">Open Source</Link>
            <Link to="/safety" className="text-sm font-bold text-gray-500 hover:text-black transition">Safety</Link>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/devchauhann"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium px-6 py-2.5 text-sm font-bold rounded-xl shadow-none inline-flex items-center space-x-2 hidden md:inline-flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-black">Tools</Link>
            <Link to="/credits" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-black">Open Source</Link>
            <Link to="/safety" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-black">Safety</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;