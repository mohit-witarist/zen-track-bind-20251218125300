import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useStore from '../state/useStore';

const Weather = () => {
  const { weather, isPaused } = useStore();
  const pointsRef = useRef();

  const particleCount = weather === 'storm' || weather === 'rain' ? 5000 : (weather === 'snow' ? 3000 : 0);
  
  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || isPaused) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      // Falling motion
      if (weather === 'snow') {
        positions[i * 3 + 1] -= delta * 2;
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      } else {
        positions[i * 3 + 1] -= delta * 15;
      }

      // Reset
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (particleCount === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={weather === 'snow' ? 0.05 : 0.02}
        color={weather === 'snow' ? '#fff' : '#aaf'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default Weather;
