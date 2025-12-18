import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import ControlPanel from './components/UI/ControlPanel';
import WindowFrame from './components/UI/WindowFrame';

function App() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#020205] overflow-hidden">
      {/* 3D Scene Layer (Always Bottom) */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          // Positioned straight-on to look through the window hole
          camera={{ position: [0, 2, 15], fov: 40, near: 0.1, far: 1000 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={['#05050a']} />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* Frame Layer (Middle) */}
      <WindowFrame />
      
      {/* UI Layer (Top) */}
      <ControlPanel />

      {/* Subtle Vignette and Contrast */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-60" />
    </div>
  );
}

export default App;
