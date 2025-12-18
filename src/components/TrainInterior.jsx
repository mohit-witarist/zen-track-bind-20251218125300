import React from 'react';
import useStore from '../state/useStore';

const TrainInterior = () => {
  return (
    <group position={[0, 0, 1]}>
      {/* 
        High-Fidelity Window Border 
        We use a "Picture Frame" approach to mask the view.
      */}
      
      {/* The main wall panel (Interior) */}
      <mesh position={[0, 1.5, 0]}>
        {/* Large plane with a hole via subtraction is complex in Three, 
            so we build it with 4 panels (Top, Bottom, Left, Right) */}
        <group>
          {/* Top Panel */}
          <mesh position={[0, 2.3, 0]}>
            <boxGeometry args={[10, 2, 0.2]} />
            <meshStandardMaterial color="#080808" roughness={0.9} />
          </mesh>
          {/* Bottom Panel (The Sill) */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[10, 2, 0.2]} />
            <meshStandardMaterial color="#080808" roughness={0.9} />
          </mesh>
          {/* Left Panel */}
          <mesh position={[-3.5, 1.05, 0]}>
            <boxGeometry args={[4, 2.5, 0.2]} />
            <meshStandardMaterial color="#080808" roughness={0.9} />
          </mesh>
          {/* Right Panel */}
          <mesh position={[3.5, 1.05, 0]}>
            <boxGeometry args={[4, 2.5, 0.2]} />
            <meshStandardMaterial color="#080808" roughness={0.9} />
          </mesh>
        </group>
      </mesh>

      {/* Realistic Window Bevel/Trim */}
      <group position={[0, 1.55, -0.05]}>
        {/* Horizontal Trims */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[3.1, 0.05, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[3.1, 0.05, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Vertical Trims */}
        <mesh position={[-1.55, 0, 0]}>
          <boxGeometry args={[0.05, 1.55, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[1.55, 0, 0]}>
          <boxGeometry args={[0.05, 1.55, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Subtle Glass Layer */}
      <mesh position={[0, 1.55, -0.1]}>
        <planeGeometry args={[3, 1.5]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.08} 
          transmission={0.95}
          roughness={0.05}
          thickness={0.5}
          color="#aaccff"
        />
      </mesh>

      {/* Interior table reflection */}
      <mesh position={[0, 0.75, 0.5]} rotation={[-Math.PI / 2.1, 0, 0]}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial color="#030303" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default TrainInterior;
