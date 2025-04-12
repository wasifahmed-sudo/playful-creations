
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { CodeFragmentProps } from './types';

const CodeFragment: React.FC<CodeFragmentProps> = ({ code, index, active }) => {
  // Animation for each fragment
  const fragmentSpring = useSpring({
    from: { 
      x: getRandomPosition().x, 
      y: getRandomPosition().y, 
      opacity: 0,
      scale: 0.5,
      rotate: Math.random() * 360
    },
    to: async (next) => {
      const delay = index * 100;
      await new Promise(resolve => setTimeout(resolve, delay));
      await next({ opacity: 0.9, scale: 1, rotate: Math.random() * 30 - 15 });
      
      // Spiral animation toward center
      await next({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 0.1,
        opacity: 0,
        rotate: 360 + Math.random() * 720,
        config: {
          duration: 3000 + Math.random() * 2000,
          easing: t => t * t
        }
      });
    },
    config: { tension: 120, friction: 14 },
    delay: index * 100,
    reset: true,
    loop: true
  });
  
  if (!active) return null;

  return (
    <animated.div
      className="absolute pointer-events-none whitespace-nowrap"
      style={{
        transform: fragmentSpring.scale.to(s => `scale(${s})`),
        opacity: fragmentSpring.opacity,
        left: fragmentSpring.x,
        top: fragmentSpring.y,
        rotate: fragmentSpring.rotate.to(r => `${r}deg`),
      }}
    >
      <div className="bg-black/30 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-md border border-purple-500/20 font-mono text-sm">
        {code}
      </div>
    </animated.div>
  );
};

// Helper function to get random position within the viewport
function getRandomPosition() {
  const initialDistance = 100 + Math.random() * 500;
  const angle = Math.random() * Math.PI * 2;
  const x = window.innerWidth / 2 + Math.cos(angle) * initialDistance;
  const y = window.innerHeight / 2 + Math.sin(angle) * initialDistance;
  
  return { x, y };
}

export default CodeFragment;
