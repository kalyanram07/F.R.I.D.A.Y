import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { motion } from 'framer-motion';
import ThreatMap from './components/ThreatMap';
import ProjectTracker from './components/ProjectTracker';
import AgentOutput from './components/AgentOutput';
import ControlDeck from './components/ControlDeck';
import NewsTicker from './components/NewsTicker';
import './index.css';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00f0ff',
          colorBgContainer: 'transparent',
          colorText: '#f0f4ff',
          colorBorderSecondary: 'rgba(0, 240, 255, 0.2)',
          fontFamily: "'JetBrains Mono', monospace",
        },
      }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen w-screen bg-jarvis-bg text-jarvis-textMain flex flex-col font-sans overflow-hidden"
      >
        <NewsTicker />
        
        {/* Main Layout Grid - 3 Columns */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-4 pb-0 overflow-hidden">
          
          {/* Column 1: Map */}
          <div className="col-span-4 h-full">
            <ThreatMap />
          </div>

          {/* Column 2: Project Matrix */}
          <div className="col-span-4 h-full">
            <ProjectTracker />
          </div>

          {/* Column 3: AI Terminal */}
          <div className="col-span-4 h-full">
            <AgentOutput />
          </div>

        </div>

        <ControlDeck />
      </motion.div>
    </ConfigProvider>
  );
}
