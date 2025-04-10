
import React, { useState, useEffect } from 'react';

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
];

interface BubbleProps {
  thought: string;
  index: number;
}

const Bubble: React.FC<BubbleProps> = ({ thought, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);
  
  useEffect(() => {
    // Random position within the viewport
    const x = 20 + Math.random() * 60; // 20-80% of viewport width
    const y = 20 + Math.random() * 60; // 20-80% of viewport height
    
    setPosition({ x, y });
    
    // Stagger the appearance
    const timer = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, index * 300);
    
    // Remove after random duration
    const removeTimer = setTimeout(() => {
      setOpacity(0);
      setScale(0.8);
    }, 5000 + index * 300 + Math.random() * 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [index]);
  
  return (
    <div 
      className="absolute pointer-events-none transition-all duration-1000"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity,
        transform: `scale(${scale}) translateZ(${30 + index * 5}px)`,
        zIndex: 50 + index,
      }}
    >
      <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-2xl shadow-xl border border-white/20 max-w-[200px]">
        {thought}
      </div>
    </div>
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
      if (visibleThoughts.length > 5) {
        setVisibleThoughts(prev => prev.slice(1));
      }
    };
    
    // Add initial thoughts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addThought(), i * 1000);
    }
    
    // Continue adding thoughts periodically
    const interval = setInterval(addThought, 3000);
    
    return () => clearInterval(interval);
  }, [active, visibleThoughts]);
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {visibleThoughts.map((thought, index) => (
        <Bubble key={`${thought}-${index}`} thought={thought} index={index} />
      ))}
    </div>
  );
};

export default ThoughtBubbles;
