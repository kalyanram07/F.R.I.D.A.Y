import React from 'react';
import { motion } from 'framer-motion';

export default function ThreatMap() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-full w-full bg-jarvis-panel border border-jarvis-cyan/20 rounded-xl overflow-hidden relative backdrop-blur-md p-4 flex flex-col"
    >
      <h2 className="text-jarvis-cyan font-mono text-sm tracking-[0.2em] mb-4 uppercase flex items-center gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-jarvis-amber animate-pulse"></span>
        Tactical Sector Map
      </h2>
      
      <div className="flex-1 relative border border-jarvis-cyan/10 rounded-lg overflow-hidden bg-[#05080c] flex items-center justify-center p-4">
        {/* Abstract Flat World Map (Dotted Grid Representation) */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-40 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] z-10" fill="none" stroke="#00f0ff" strokeWidth="1" strokeLinejoin="round">
          {/* Abstract stylized continent blocks to save massive path data */}
          {/* NA */}
          <path d="M 150 50 L 250 50 L 280 120 L 220 180 L 120 120 Z" />
          {/* SA */}
          <path d="M 230 200 L 290 200 L 320 320 L 250 350 Z" />
          {/* EU / Asia */}
          <path d="M 380 40 L 600 40 L 650 150 L 450 120 L 350 80 Z" />
          {/* Africa */}
          <path d="M 380 140 L 480 150 L 450 280 L 390 250 Z" />
          {/* Aus */}
          <path d="M 620 250 L 700 250 L 720 320 L 600 300 Z" />
        </svg>

        {/* India Marker */}
        <div className="absolute left-[65%] top-[45%] flex items-center justify-center z-20 group cursor-pointer">
          <div className="absolute w-12 h-12 bg-jarvis-amber rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-6 h-6 border border-jarvis-amber rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-jarvis-amber rounded-full shadow-[0_0_15px_#ff3b30]"></div>
          
          <div className="absolute top-4 left-4 bg-black/80 border border-jarvis-amber p-2 hidden group-hover:block whitespace-nowrap z-30">
            <span className="text-jarvis-amber font-mono text-[10px] uppercase">Sector: INDIA</span>
            <br />
            <span className="text-jarvis-textMain font-mono text-[9px]">Status: Active Highlight</span>
          </div>
        </div>

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,1)_50%)] bg-[length:100%_4px] pointer-events-none z-30"></div>
      </div>
    </motion.div>
  );
}
