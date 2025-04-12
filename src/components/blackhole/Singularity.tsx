
import React from 'react';
import { useSpring, animated } from 'react-spring';

interface SingularityProps {
  active: boolean;
}

const Singularity: React.FC<SingularityProps> = ({ active }) => {
  // Animation properties for the singularity
  const singularitySpring = useSpring({
    opacity: active ? 1 : 0,
    scale: active ? 1 : 0,
    rotate: active ? 360 : 0,
    config: { 
      tension: 80,
      friction: 20
    }
  });
  
  return (
    <animated.div
      className="fixed pointer-events-none z-40"
      style={{
        left: '50%',
        top: '50%',
        transform: singularitySpring.scale.to(s => 
          `translate(-50%, -50%) scale(${s}) rotate(${singularitySpring.rotate.get()}deg)`
        ),
        opacity: singularitySpring.opacity,
        display: active ? 'block' : 'none'
      }}
    >
      <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-purple-700 to-orange-600 relative overflow-hidden shadow-[0_0_50px_20px_rgba(139,92,246,0.7)]">
        <div className="absolute inset-0 bg-black rounded-full scale-75 flex items-center justify-center">
          <div className="absolute w-full h-full animate-spin-slow rounded-full bg-gradient-to-r from-purple-700 to-orange-600 opacity-40 mix-blend-overlay" />
        </div>
      </div>
    </animated.div>
  );
};

export default Singularity;
