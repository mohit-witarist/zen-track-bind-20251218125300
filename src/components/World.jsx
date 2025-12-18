import React from 'react';
import useStore from '../state/useStore';
import ParallaxLayer from './ParallaxLayer';

const World = () => {
  const { speed, isPaused } = useStore();

  return (
    <group position={[0, 0, 0]}>
      {/* Very Distant: High Mountains */}
      <ParallaxLayer 
        depth={-250} 
        count={5} 
        spacing={400} 
        scale={[200, 100, 150]} 
        color="#22252a" 
        type="mountain" 
        baseSpeed={speed * 0.04} 
        isPaused={isPaused} 
      />

      {/* Mid-Distant: Hills and Forests */}
      <ParallaxLayer 
        depth={-120} 
        count={12} 
        spacing={150} 
        scale={[80, 25, 60]} 
        color="#152015" 
        type="hill" 
        baseSpeed={speed * 0.15} 
        isPaused={isPaused} 
      />

      {/* Ground Plane (Grass/Dirt) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -50]} receiveShadow>
        <planeGeometry args={[5000, 250]} />
        <meshStandardMaterial color="#0a120a" roughness={1} />
      </mesh>

      {/* Residential Area: Houses */}
      <ParallaxLayer 
        depth={-45} 
        count={25} 
        spacing={80} 
        scale={[15, 12, 15]} 
        color="#2a2a2e" 
        type="house" 
        baseSpeed={speed * 1.0} 
        isPaused={isPaused} 
      />

      {/* Roadside: Trees and Hedges */}
      <ParallaxLayer 
        depth={-20} 
        count={50} 
        spacing={30} 
        scale={[4, 15, 4]} 
        color="#081a08" 
        type="tree" 
        baseSpeed={speed * 2.8} 
        isPaused={isPaused} 
      />

      {/* Immediate: Utility Poles (Fastest) */}
      <ParallaxLayer 
        depth={-8} 
        count={40} 
        spacing={60} 
        scale={[0.5, 30, 0.5]} 
        color="#020202" 
        type="pole" 
        baseSpeed={speed * 6.0} 
        isPaused={isPaused} 
      />
    </group>
  );
};

export default World;
