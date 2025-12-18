import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParallaxLayer = ({ depth, count, spacing, scale, color, type, baseSpeed, isPaused }) => {
  const groupRef = useRef();

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        i * spacing - (count * spacing) / 2,
        type === 'mountain' || type === 'hill' ? -5 : 0,
        depth + (Math.random() - 0.5) * (spacing * 0.3)
      ],
      scale: [
        scale[0] * (0.8 + Math.random() * 0.4),
        scale[1] * (0.8 + Math.random() * 0.4),
        scale[2] * (0.8 + Math.random() * 0.4)
      ],
      rotation: [0, Math.random() * Math.PI, 0],
      // Randomize house types
      variant: Math.floor(Math.random() * 3)
    }));
  }, [count, spacing, depth, scale, type]);

  useFrame((state, delta) => {
    if (isPaused || !groupRef.current) return;
    
    groupRef.current.children.forEach((child) => {
      // Horizontal motion
      child.position.x -= baseSpeed * delta * 60;
      
      // Wrapping logic
      const boundary = (count * spacing) / 2;
      if (child.position.x < -boundary) {
        child.position.x += count * spacing;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group key={i} position={item.position} scale={item.scale} rotation={item.rotation}>
          {type === 'mountain' && (
            <mesh>
              <dodecahedronGeometry args={[1, 1]} />
              <meshStandardMaterial color={color} roughness={1} />
            </mesh>
          )}
          {type === 'hill' && (
            <mesh>
              <sphereGeometry args={[1, 32, 16]} />
              <meshStandardMaterial color={color} roughness={1} />
            </mesh>
          )}
          {type === 'tree' && (
            <group>
              <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[1, 2, 8]} />
                <meshStandardMaterial color={color} />
              </mesh>
              <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 1]} />
                <meshStandardMaterial color="#2d1b0d" />
              </mesh>
            </group>
          )}
          {type === 'house' && (
            <group>
              {/* Main Body */}
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#555" />
              </mesh>
              {/* Roof */}
              <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[0.9, 0.6, 4]} />
                <meshStandardMaterial color="#3a1a1a" />
              </mesh>
              {/* Windows glow */}
              <mesh position={[0, 0, 0.51]}>
                <planeGeometry args={[0.3, 0.3]} />
                <meshBasicMaterial color="#ffeeaa" />
              </mesh>
            </group>
          )}
          {type === 'pole' && (
            <mesh>
              <cylinderGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

export default ParallaxLayer;
