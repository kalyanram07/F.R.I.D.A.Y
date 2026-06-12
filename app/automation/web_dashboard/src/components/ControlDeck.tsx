import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Mic } from 'lucide-react';

export default function ControlDeck() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="col-span-full h-24 bg-jarvis-panel border-t border-jarvis-cyan/30 backdrop-blur-md flex items-center justify-between px-8 relative"
    >
      {/* Left side: Voice Analysis Placeholder Text */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-jarvis-cyan font-mono text-xs uppercase tracking-widest animate-pulse">VOICE LINK ACTIVE</span>
          <span className="text-jarvis-textMuted font-sans text-xs">Awaiting Vocal Directives</span>
        </div>
      </div>

      {/* Center: Interactive Microphone with Ripple Waves */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Ripple 1 */}
        <motion.div
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-12 h-12 rounded-full border border-jarvis-cyan z-0"
        ></motion.div>

        {/* Ripple 2 */}
        <motion.div
          animate={{
            scale: [1, 1.8, 2.5],
            opacity: [0.6, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
          className="absolute w-12 h-12 rounded-full border border-jarvis-cyan z-0"
        ></motion.div>

        {/* Core Mic Icon */}
        <div className="w-12 h-12 rounded-full bg-black border-2 border-jarvis-cyan flex items-center justify-center z-10 shadow-[0_0_15px_#00f0ff]">
          <Mic size={20} className="text-jarvis-cyan" />
        </div>
      </div>

      {/* Right Side: System Metrics */}
      <div className="flex gap-8">
        <Metric icon={<Cpu size={16} />} label="CORE TEMP" value="42°C" color="text-jarvis-cyan" />
        <Metric icon={<Activity size={16} />} label="SYS LOAD" value="18%" color="text-jarvis-cyan" />
        <Metric icon={<HardDrive size={16} />} label="MEM FREE" value="64TB" color="text-jarvis-textMain" />
      </div>
    </motion.div>
  );
}

function Metric({ icon, label, value, color }: any) {
  return (
    <div className="flex flex-col items-end">
      <div className={`flex items-center gap-2 ${color} font-mono text-xs mb-1`}>
        {icon} <span>{label}</span>
      </div>
      <div className="text-jarvis-textMain font-mono text-lg font-bold">{value}</div>
    </div>
  );
}
