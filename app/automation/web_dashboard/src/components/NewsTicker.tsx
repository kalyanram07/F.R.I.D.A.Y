import React from 'react';

export default function NewsTicker() {
  return (
    <div className="w-full bg-jarvis-amber/10 border-b border-jarvis-amber/30 h-8 flex items-center overflow-hidden whitespace-nowrap">
      <div className="text-jarvis-amber font-mono text-[10px] tracking-widest uppercase animate-[ticker_20s_linear_infinite] flex w-max">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="mx-8">&gt;&gt; GLOBAL MARKET ALERT: TECH SECTOR SURGES</span>
            <span className="mx-8">&gt;&gt; DE-ESCALATION CONFIRMED IN SECTOR 7G</span>
            <span className="mx-8">&gt;&gt; NEW PROTOCOLS INITIALIZED BY F.R.I.D.A.Y.</span>
            <span className="mx-8">&gt;&gt; SYSTEM INTEGRITY AT 100%</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
