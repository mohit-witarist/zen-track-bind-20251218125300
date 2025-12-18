import React from 'react';
import { Sky, Stars, Environment } from '@react-three/drei';
import useStore from '../state/useStore';
import World from './World';
import Weather from './Weather';

const Experience = () => {
  const { time } = useStore();
  
  // Calculate sun pos: 0 at midnight, high at 12, 0 at 24
  const angle = (time / 24) * Math.PI * 2 - Math.PI / 2;
  const sunPosition = [
    Math.cos(angle) * 100,
    Math.sin(angle) * 100,
    -100 // Behind the landscape
  ];

  const isNight = time < 6 || time > 19;
  const ambientIntensity = isNight ? 0.05 : 0.6;
  const sunIntensity = isNight ? 0.01 : 1.2;

  return (
    <>
      <Sky 
        sunPosition={sunPosition}
        turbidity={0.5}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {isNight && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={sunPosition} 
        intensity={sunIntensity} 
        castShadow
        color={time > 17 || time < 8 ? '#ffccaa' : '#ffffff'}
      />

      <fog attach="fog" args={[isNight ? '#02020a' : '#87ceeb', 20, 400]} />

      <World />
      <Weather />

      <Environment preset={isNight ? "night" : "apartment"} />
    </>
  );
};

export default Experience;
