
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

const ToolGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {TOOLS.map((tool) => (
        <Link 
          key={tool.id} 
          to={`/tool/${tool.id}`}
          className="card-premium p-10 rounded-[2.5rem] group"
        >
          <div className="flex items-center justify-between mb-8">
            <div 
              className="w-12 h-12 bg-gray-50 text-black rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300"
              dangerouslySetInnerHTML={{ __html: tool.icon }}
            />
            <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 tracking-tight">{tool.title}</h3>
          <p className="text-gray-400 font-medium mb-10 leading-relaxed">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tool.supportedInputs.slice(0, 4).map(ext => (
              <span key={ext} className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors">
                {ext}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ToolGrid;
