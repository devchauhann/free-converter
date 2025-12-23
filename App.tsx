import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolGrid from './components/ToolGrid';
import ConverterUI from './components/ConverterUI';
import StaticPage from './components/StaticPage';
import { TOOLS } from './constants';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen text-[#1a1a1a] selection:bg-black selection:text-white">
        <Header />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tool/:toolId" element={<ConverterPage />} />
            <Route path="/image-tool/:conversionSlug" element={<ConverterPage />} />
            <Route path="/credits" element={<StaticPage type="credits" />} />
            <Route path="/safety" element={<StaticPage type="safety" />} />
            <Route path="/privacy" element={<StaticPage type="privacy" />} />
            <Route path="/terms" element={<StaticPage type="terms" />} />
            <Route path="/support" element={<StaticPage type="support" />} />
            <Route path="/:conversionSlug" element={<ConverterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="flex flex-col items-center text-center mb-24">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-400">
          Professional Grade & Local-Only
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-10 max-w-4xl">
          Convert Any File <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] via-[#FF9500] to-[#FFCC00]">Safely</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed mb-12">
          The fastest way to convert files at <strong>free-converter</strong>. No uploads, no servers, just pure browser performance for ultimate privacy.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#tools" className="btn-premium px-10 py-5 rounded-2xl font-bold text-lg">
            Browse All Converters
          </a>
          <Link to="/safety" className="px-10 py-5 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
            How it Works
          </Link>
        </div>
      </div>

      <div id="tools" className="mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Universal Conversion Suite</h2>
            <p className="text-gray-400 font-medium">Select a module to begin secure processing.</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
             <div className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400">100% Private</div>
             <div className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400">Browser-Based</div>
          </div>
        </div>
        <ToolGrid />
      </div>
      
      <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>}
          title="Privacy-Centric" 
          desc="Files never touch our servers. All conversions are performed locally in your browser sandbox."
        />
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>}
          title="Instant Processing" 
          desc="Harness the power of your CPU. Experience zero-queue processing for all images and documents."
        />
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>}
          title="High Fidelity" 
          desc="Maintain perfect quality with our lossless local engine. No compression artifacts unless you ask for them."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-10 rounded-3xl bg-white border border-gray-100 hover:border-gray-300 transition-all group">
    <div className="w-12 h-12 bg-gray-50 text-black rounded-xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const ConverterPage: React.FC = () => {
  const { toolId, conversionSlug } = useParams<{ toolId?: string; conversionSlug?: string }>();
  
  if (!toolId && !conversionSlug) {
    return <Navigate to="/" replace />;
  }

  let tool = TOOLS.find(t => t.id === toolId);
  let initialOutput: string | undefined = undefined;

  if (!tool && conversionSlug) {
    const parts = conversionSlug.split('-to-');
    if (parts.length === 2) {
      const [inputExt, outputExt] = parts;
      tool = TOOLS.find(t => 
        t.supportedInputs.includes(inputExt.toLowerCase()) && 
        t.supportedOutputs.includes(outputExt.toLowerCase())
      );
      if (tool) initialOutput = outputExt;
    } else {
       tool = TOOLS.find(t => t.id === conversionSlug);
    }
  }

  if (!tool) {
    return (
      <div className="text-center py-40 px-6">
        <h2 className="text-5xl font-black mb-6 tracking-tighter">Utility not found</h2>
        <p className="text-gray-400 mb-10 text-lg font-medium">We couldn't locate the requested conversion utility.</p>
        <Link to="/" className="btn-premium px-10 py-4 rounded-xl font-bold">Return Home</Link>
      </div>
    );
  }

  return <ConverterUI tool={tool} initialOutput={initialOutput} />;
};

export default App;