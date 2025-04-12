
import React from 'react';

interface VignetteProps {
  active: boolean;
}

const Vignette: React.FC<VignetteProps> = ({ active }) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000"
      style={{
        background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, ${active ? 0.4 : 0}) 70%)`,
        opacity: active ? 1 : 0
      }}
    />
  );
};

export default Vignette;
