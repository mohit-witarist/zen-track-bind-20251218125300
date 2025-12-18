import React from 'react';

const WindowFrame = () => {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* 
        The "Wall" around the window. 
        We use 4 divs to create the opening so the center is empty.
      */}
      
      {/* Top Wall */}
      <div className="absolute top-0 left-0 right-0 h-[15vh] bg-[#0a0a0c] border-b border-white/5 shadow-2xl" />
      
      {/* Bottom Wall (Sill area) */}
      <div className="absolute bottom-0 left-0 right-0 h-[15vh] bg-[#08080a] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {/* Table/Sill detail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-white/5 rounded-full mt-2" />
      </div>
      
      {/* Left Wall */}
      <div className="absolute top-[15vh] bottom-[15vh] left-0 w-[10vw] bg-[#0a0a0c] border-r border-white/5" />
      
      {/* Right Wall */}
      <div className="absolute top-[15vh] bottom-[15vh] right-0 w-[10vw] bg-[#0a0a0c] border-l border-white/5" />

      {/* The Actual Window Border/Bevel */}
      <div className="absolute top-[15vh] bottom-[15vh] left-[10vw] right-[10vw] border-[12px] border-[#1a1a1e] rounded-lg shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
        {/* Glass Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-20 pointer-events-none" />
        
        {/* Inner shadow/ambient occlusion */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
      </div>

      {/* Dust/Smudge texture on "glass" */}
      <div className="absolute top-[15vh] bottom-[15vh] left-[10vw] right-[10vw] opacity-10 mix-blend-screen pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />
    </div>
  );
};

export default WindowFrame;
