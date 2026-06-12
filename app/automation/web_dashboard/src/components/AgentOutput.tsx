import React from 'react';
import { motion } from 'framer-motion';

export default function AgentOutput() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-full bg-jarvis-panel border border-jarvis-cyan/20 rounded-xl overflow-hidden backdrop-blur-md flex flex-col relative group hover:border-jarvis-cyan/50 transition-colors"
    >
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
      
      <div className="p-3 border-b border-jarvis-cyan/20 bg-black/40 z-20 flex justify-between items-center">
        <h2 className="text-jarvis-cyan font-mono text-sm tracking-[0.2em] uppercase">
          F.R.I.D.A.Y Output Terminal
        </h2>
        <span className="w-2 h-2 rounded-full bg-jarvis-cyan animate-pulse"></span>
      </div>

      <div className="flex-1 p-4 font-mono text-xs text-jarvis-textMain overflow-auto custom-scrollbar z-20 flex flex-col gap-3">
        <div className="opacity-50">
          {'>'} System initialized...
          <br/>
          {'>'} Awaiting voice or text directives...
        </div>
        
        <div className="bg-jarvis-cyan/10 border-l-2 border-jarvis-cyan p-2 rounded-r">
          <span className="text-jarvis-cyan block mb-1 uppercase text-[9px]">Query Recognized</span>
          "What is the status of the OS Automation Tools?"
        </div>

        <div className="bg-black/50 border border-jarvis-cyan/20 p-3 rounded">
          <span className="text-jarvis-amber block mb-2 uppercase text-[9px]">Response Generated</span>
          The OS Automation Tools are fully functional. Python scripts located in `app/automation/` can successfully trigger window movements, hardware checks, and execute web-hooks. 
          <br/><br/>
          Further optimization of the `monitor_tools.py` module is queued in active directives.
        </div>
      </div>
    </motion.div>
  );
}
