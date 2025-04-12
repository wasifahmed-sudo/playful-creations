
import React, { useRef, useEffect, useState } from 'react';
import PhysicsEngine from './PhysicsEngine';
import Singularity from './Singularity';
import Vignette from './Vignette';
import CodeFragmentsContainer from './CodeFragmentsContainer';
import { ParticleRef, EngineRef } from './types';

const BlackHole: React.FC = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const particlesRef = useRef<Matter.Body[]>([]);
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    const activateHandler = () => setActive(true);
    const deactivateHandler = () => setActive(false);
    
    document.addEventListener('activate-black-hole', activateHandler);
    document.addEventListener('deactivate-black-hole', deactivateHandler);
    
    return () => {
      document.removeEventListener('activate-black-hole', activateHandler);
      document.removeEventListener('deactivate-black-hole', deactivateHandler);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden pointer-events-none z-30"
      />
      
      <PhysicsEngine 
        containerRef={containerRef}
        engineRef={engineRef as EngineRef}
        particlesRef={particlesRef as ParticleRef}
        requestRef={requestRef}
        active={active}
      />
      
      {/* Singularity in the center */}
      <Singularity active={active} />
      
      {/* Code fragments floating in */}
      <CodeFragmentsContainer active={active} />
      
      {/* Vignette overlay when active */}
      <Vignette active={active} />
    </>
  );
};

export default BlackHole;
