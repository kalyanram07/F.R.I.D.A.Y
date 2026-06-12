import React from 'react';
import { motion } from 'framer-motion';
import { List, Progress, Divider } from 'antd';

const activeProjects = [
  { id: 'PRJ-1', name: 'F.R.I.D.A.Y Neural Link', progress: 78, status: 'Compiling' },
  { id: 'PRJ-2', name: 'UI Control Surface', progress: 95, status: 'Optimization' },
  { id: 'PRJ-3', name: 'Local Automation Scripts', progress: 45, status: 'Active' },
];

const completedProjects = [
  { id: 'CPL-1', name: 'Vite React Migration', date: '2026-06-11' },
  { id: 'CPL-2', name: 'System Telemetry Link', date: '2026-06-12' },
];

export default function ProjectTracker() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-full bg-jarvis-panel border border-jarvis-cyan/20 rounded-xl overflow-hidden backdrop-blur-md p-4 flex flex-col gap-4"
    >
      <h2 className="text-jarvis-cyan font-mono text-sm tracking-[0.2em] uppercase mb-2">
        Project Matrix
      </h2>
      
      {/* Active Projects */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <h3 className="text-jarvis-textMain font-mono text-xs uppercase mb-3 border-b border-jarvis-cyan/10 pb-1">Active Directives</h3>
        <List
          dataSource={activeProjects}
          renderItem={item => (
            <List.Item className="border-none px-0 py-2">
              <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between w-full">
                  <span className="text-jarvis-cyan font-mono text-[10px]">{item.id} // {item.name}</span>
                  <span className="text-jarvis-amber font-mono text-[9px] uppercase">{item.status}</span>
                </div>
                <Progress 
                  percent={item.progress} 
                  showInfo={false} 
                  strokeColor="#00f0ff" 
                  trailColor="rgba(0, 240, 255, 0.1)"
                  size="small"
                />
              </div>
            </List.Item>
          )}
        />

        <div className="mt-4 mb-3">
          <h3 className="text-jarvis-textMuted font-mono text-xs uppercase border-b border-jarvis-cyan/10 pb-1">Completed Directives</h3>
        </div>
        <List
          dataSource={completedProjects}
          renderItem={item => (
            <List.Item className="border-none px-0 py-1">
              <div className="flex justify-between w-full opacity-60">
                <span className="text-jarvis-textMain font-mono text-[10px] line-through">{item.id} // {item.name}</span>
                <span className="text-jarvis-textMuted font-mono text-[9px]">{item.date}</span>
              </div>
            </List.Item>
          )}
        />
      </div>
    </motion.div>
  );
}
