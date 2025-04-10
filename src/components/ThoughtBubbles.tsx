
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, to } from 'react-spring';

const thoughts = [
  "Should I use Redux or Context API? 🤔",
  "This would be cleaner with a custom hook...",
  "Time to refactor this legacy code 💻",
  "Is this O(n) or O(n²)? 🧮",
  "CI pipeline failed again?! 😫",
  "Just one more coffee ☕",
  "It works locally... 🤷‍♂️",
  "Needs more tests ✅",
  "Perfect is the enemy of done 🚀",
  "I should document this...",
  "Can I use a higher-order function here? 🧠",
  "Implement with WebGL for better performance?",
  "Microservices or monolith? The eternal question",
  "That's not a bug, it's a feature 😎",
  "DevOps is everyone's responsibility",
  "Technical debt is future work",
  "Cache invalidation is hard...",
  "This would be faster with WebAssembly",
  "Zero downtime deployment ♾️",
  "Web components or framework components?",
];

interface BubbleProps {
  thought: string;
  index: number;
}

const Bubble: React.FC<BubbleProps> = ({ thought, index }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  
  // Create animated spring physics for the bubble
  const [props, api] = useSpring(() => ({
    from: { 
      opacity: 0, 
      scale: 0.8,
      x: 0,
      y: 0,
      rotation: -5 + Math.random() * 10,
    },
    to: { 
      opacity: 1, 
      scale: 1,
      x: 20 + Math.random() * 60, // 20-80% of viewport width
      y: 20 + Math.random() * 60, // 20-80% of viewport height
      rotation: -5 + Math.random() * 10,
    },
    config: {
      tension: 120,
      friction: 14
    },
    delay: index * 300,
    onRest: () => {
      // Add subtle floating effect after initial animation
      startFloating();
    }
  }));
  
  // Function to start the subtle floating effect
  const startFloating = () => {
    // Random small movement every few seconds
    const interval = setInterval(() => {
      if (!bubbleRef.current) {
        clearInterval(interval);
        return;
      }
      
      api.start({
        to: {
          x: props.x.get() + (Math.random() - 0.5) * 10,
          y: props.y.get() + (Math.random() - 0.5) * 10,
          rotation: props.rotation.get() + (Math.random() - 0.5) * 3,
        },
        config: {
          tension: 50,
          friction: 20
        }
      });
    }, 2000 + Math.random() * 1000);
    
    // Remove the bubble after a random time
    setTimeout(() => {
      api.start({
        to: { opacity: 0, scale: 0.8 },
        config: { tension: 100, friction: 14 },
        onRest: () => {
          clearInterval(interval);
        }
      });
    }, 5000 + index * 500 + Math.random() * 3000);
  };
  
  return (
    <animated.div 
      ref={bubbleRef}
      className="absolute pointer-events-none"
      style={{
        opacity: props.opacity,
        transform: to(
          [props.scale, props.x, props.y, props.rotation],
          (scale, x, y, rotation) => 
          `translate3d(${x}vw, ${y}vh, 0) 
           scale(${scale}) 
           rotate(${rotation}deg)
           translateZ(${30 + index * 5}px)`
        ),
        zIndex: 50 + index,
      }}
    >
      <div className="relative bg-gray-900/30 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-xl border border-[#8B5CF6]/20 max-w-[200px]">
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#8B5CF6]/30"></div>
        <div className="absolute -bottom-4 -left-4 w-2 h-2 rounded-full bg-[#8B5CF6]/20"></div>
        {thought}
      </div>
    </animated.div>
  );
};

const ThoughtBubbles = () => {
  const [active, setActive] = useState(false);
  const [visibleThoughts, setVisibleThoughts] = useState<string[]>([]);
  
  useEffect(() => {
    const activateHandler = () => setActive(true);
    const deactivateHandler = () => setActive(false);
    
    document.addEventListener('activate-neural-particles', activateHandler);
    document.addEventListener('deactivate-neural-particles', deactivateHandler);
    
    return () => {
      document.removeEventListener('activate-neural-particles', activateHandler);
      document.removeEventListener('deactivate-neural-particles', deactivateHandler);
    };
  }, []);
  
  useEffect(() => {
    if (!active) {
      setVisibleThoughts([]);
      return;
    }
    
    // Periodically add new thoughts
    const addThought = () => {
      if (!active) return;
      
      // Get a random thought that's not already visible
      const availableThoughts = thoughts.filter(t => !visibleThoughts.includes(t));
      
      if (availableThoughts.length > 0) {
        const randomThought = availableThoughts[Math.floor(Math.random() * availableThoughts.length)];
        setVisibleThoughts(prev => [...prev, randomThought]);
      }
      
      // Remove oldest thought if we have too many
      if (visibleThoughts.length > 7) {
        setVisibleThoughts(prev => prev.slice(1));
      }
    };
    
    // Add initial thoughts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addThought(), i * 800);
    }
    
    // Continue adding thoughts periodically
    const interval = setInterval(addThought, 2500);
    
    return () => clearInterval(interval);
  }, [active, visibleThoughts]);
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
      {visibleThoughts.map((thought, index) => (
        <Bubble key={`${thought}-${index}`} thought={thought} index={index} />
      ))}
    </div>
  );
};

export default ThoughtBubbles;
