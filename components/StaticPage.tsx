
import React from 'react';
import { Link } from 'react-router-dom';

interface StaticPageProps {
  type: 'credits' | 'safety' | 'privacy' | 'terms' | 'support';
}

const CONTENT = {
  credits: {
    title: 'Credits & Tech Stack',
    subtitle: 'This project is built using 100% open-source components and runs entirely in your browser.',
    sections: [
      {
        title: 'React 19 & Tailwind CSS',
        content: 'The architectural foundation. We use React 19 for the UI logic and Tailwind CSS for the minimalist, high-performance styling system.'
      },
      {
        title: 'pdf-lib',
        content: 'Our heavy lifter for PDF operations. It allows us to modify, compress, and generate PDF documents directly in the browser without a server.'
      },
      {
        title: 'JSZip',
        content: 'Used for handling bulk conversions. It enables the creation of high-speed ZIP archives for multi-file downloads.'
      },
      {
        title: 'Lucide & Heroicons',
        content: 'Visual language and iconography are powered by Lucide and Heroicons, providing the crisp, scalable SVG interfaces throughout the app.'
      },
      {
        title: 'Local Processing Logic',
        content: 'Data format transformations (JSON, CSV, XML) and Markdown-to-HTML rendering are handled by custom-built, optimized JavaScript algorithms running in the client-side sandbox.'
      }
    ]
  },
  safety: {
    title: 'Safety & Security',
    subtitle: 'How we protect your data during every transition.',
    sections: [
      {
        title: '100% Local Processing',
        content: 'Unlike other converters, your files never leave your computer. Processing happens in your browser memory via WebAssembly and standard Web APIs.'
      },
      {
        title: 'Zero Latency, Zero Logs',
        content: 'Because there is no server-side component for processing, there is nowhere for your data to be logged or stored. It is inherently private.'
      },
      {
        title: 'Open Source Transparency',
        content: 'The code is fully auditable. You can verify exactly how your files are handled by inspecting our source on GitHub.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Transparent data practices for a secure experience.',
    sections: [
      {
        title: 'No Tracking',
        content: 'We do not use cookies or tracking scripts. Your conversion session is isolated and completely anonymous.'
      },
      {
        title: 'No Data Collection',
        content: 'We do not collect email addresses, file names, or metadata. The app is a stateless utility.'
      },
      {
        title: 'Client-Side Encryption',
        content: 'Any temporary data stored in memory is automatically flushed when you close the tab or refresh the page.'
      }
    ]
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Open and transparent guidelines.',
    sections: [
      {
        title: 'MIT License',
        content: 'This web application is provided under the MIT License. You are free to use, modify, and distribute it for personal or commercial use.'
      },
      {
        title: 'No Warranty',
        content: 'The software is provided "as is", without warranty of any kind. Users are encouraged to verify converted files for critical tasks.'
      },
      {
        title: 'Commercial Use',
        content: 'Feel free to use this tool for your business needs. No attribution is required, though it is always appreciated.'
      }
    ]
  },
  support: {
    title: 'Support',
    subtitle: 'Help for the open source community.',
    sections: [
      {
        title: 'GitHub Issues',
        content: 'Encountered a bug? Head over to GitHub and open an issue. Our community of contributors monitors it regularly.'
      },
      {
        title: 'Feature Requests',
        content: 'Want support for a new format? Start a discussion on our repo. We prioritize formats that can be handled 100% locally.'
      },
      {
        title: 'Documentation',
        content: 'For developers looking to extend the app, check out the source code documentation in the root directory.'
      }
    ]
  }
};

const StaticPage: React.FC<StaticPageProps> = ({ type }) => {
  const data = CONTENT[type];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      <div className="mb-20">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span>Back to Tools</span>
        </Link>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-black mb-6 leading-none">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      <div className="space-y-16">
        {data.sections.map((section, idx) => (
          <div key={idx} className="border-t border-gray-100 pt-10 group">
            <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-400 transition-all duration-300">
              {section.title}
            </h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-3xl">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-32 p-10 rounded-[2.5rem] bg-black text-white flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h4 className="text-2xl font-bold tracking-tight mb-2">Want to Contribute?</h4>
          <p className="text-gray-400 font-medium">Join us in making file conversion 100% private and free.</p>
        </div>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all">
          Fork on GitHub
        </a>
      </div>
    </div>
  );
};

export default StaticPage;
