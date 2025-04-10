
import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Matter from 'matter-js';

const codeFragments = [
  "const singularity = () => { ... }",
  "await Promise.all(tasks);",
  "function* generator() { yield value; }",
  "useEffect(() => { return () => cleanup(); });",
  "new Promise((resolve, reject) => {});",
  "Object.entries(data).map(([key, value]) => ...)",
  "const result = arr.reduce((acc, val) => acc + val, 0);",
  "const memoizedValue = useMemo(() => compute(a, b), [a, b]);",
  "try { await api.fetch() } catch (e) { handleError(e) }",
  "<React.Suspense fallback={<Loader />}>",
  "export const createSlice = ({ name, reducers }) => ...",
  "[state, setState] = useState(initialState);",
];

const BlackHole = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);
  
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
  
  // Setup Matter.js physics engine
  useEffect(() => {
    if (!containerRef.current) return;
    
    const activateHandler = () => setActive(true);
    const deactivateHandler = () => setActive(false);
    
    document.addEventListener('activate-black-hole', activateHandler);
    document.addEventListener('deactivate-black-hole', deactivateHandler);
    
    // Initialize Matter.js
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    
    // Create engine and world
    const engine = Engine.create({
      gravity: { x: 0, y: 0 }
    });
    engineRef.current = engine;
    
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });
    
    // Create attractor in the center
    const attractor = Bodies.circle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      20,
      { 
        isStatic: true,
        render: { 
          visible: false 
        }
      }
    );
    
    // Add the attractor to the world
    World.add(engine.world, [attractor]);
    
    // Start the engine
    Engine.run(engine);
    Render.run(render);
    
    // Adjust for window resize
    const handleResize = () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      
      // Reposition attractor
      Matter.Body.setPosition(attractor, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      document.removeEventListener('activate-black-hole', activateHandler);
      document.removeEventListener('deactivate-black-hole', deactivateHandler);
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);
  
  // Manage particles based on active state
  useEffect(() => {
    if (!engineRef.current || !active) {
      return;
    }
    
    const engine = engineRef.current;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    
    // Clear existing particles
    particlesRef.current.forEach(particle => {
      World.remove(engine.world, particle);
    });
    particlesRef.current = [];
    
    // Create new particles
    const createParticles = () => {
      const particles = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const count = 40;
      
      for (let i = 0; i < count; i++) {
        // Randomize starting position around the screen edges
        let x, y;
        const side = Math.floor(Math.random() * 4);
        
        switch (side) {
          case 0: // top
            x = Math.random() * window.innerWidth;
            y = -50;
            break;
          case 1: // right
            x = window.innerWidth + 50;
            y = Math.random() * window.innerHeight;
            break;
          case 2: // bottom
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + 50;
            break;
          case 3: // left
            x = -50;
            y = Math.random() * window.innerHeight;
            break;
        }
        
        // Random particle size
        const size = 3 + Math.random() * 10;
        
        // Random color from purple to orange gradient
        const hue = 260 + Math.random() * 60;
        const color = `hsla(${hue}, 80%, 60%, 0.8)`;
        
        // Create the particle
        const particle = Bodies.circle(x, y, size, {
          mass: size * 0.1,
          frictionAir: 0,
          render: {
            fillStyle: color,
            strokeStyle: 'rgba(255, 255, 255, 0.2)',
            lineWidth: 1
          }
        });
        
        // Add the particle to the world
        World.add(engine.world, particle);
        particles.push(particle);
        
        // Apply force toward center
        const angle = Math.atan2(centerY - y, centerX - x);
        const force = {
          x: Math.cos(angle) * (0.0001 + Math.random() * 0.0002),
          y: Math.sin(angle) * (0.0001 + Math.random() * 0.0002)
        };
        
        Matter.Body.applyForce(particle, particle.position, force);
      }
      
      particlesRef.current = particles;
    };
    
    // Create initial particles
    createParticles();
    
    // Regularly add new particles
    const particleInterval = setInterval(() => {
      if (active && particlesRef.current.length < 120) {
        createParticles();
      }
    }, 2000);
    
    // Apply attractive force to all particles
    const updateParticles = () => {
      if (!active) return;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      particlesRef.current.forEach(particle => {
        // Calculate distance to center
        const dx = centerX - particle.position.x;
        const dy = centerY - particle.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Remove particles that get too close to the center
        if (distance < 30) {
          World.remove(engine.world, particle);
          particlesRef.current = particlesRef.current.filter(p => p.id !== particle.id);
          return;
        }
        
        // Calculate attractive force (stronger the closer it gets)
        const forceMagnitude = 0.000005 * particle.mass * (1 + 200 / distance);
        const angle = Math.atan2(dy, dx);
        
        // Apply force toward center
        Matter.Body.applyForce(particle, particle.position, {
          x: Math.cos(angle) * forceMagnitude,
          y: Math.sin(angle) * forceMagnitude
        });
        
        // Add some orbital velocity for spiral effect
        const tangentAngle = angle + Math.PI / 2;
        const orbitalForceMagnitude = 0.0000025 * particle.mass * (1 + 50 / distance);
        
        Matter.Body.applyForce(particle, particle.position, {
          x: Math.cos(tangentAngle) * orbitalForceMagnitude,
          y: Math.sin(tangentAngle) * orbitalForceMagnitude
        });
      });
      
      requestRef.current = requestAnimationFrame(updateParticles);
    };
    
    updateParticles();
    
    return () => {
      clearInterval(particleInterval);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // Clear particles when deactivated
      particlesRef.current.forEach(particle => {
        World.remove(engine.world, particle);
      });
      particlesRef.current = [];
    };
  }, [active]);
  
  // Render the code fragments floating in the spiral
  const renderCodeFragments = () => {
    if (!active) return null;
    
    return codeFragments.map((code, index) => {
      // Calculate random positions within the viewport
      const delay = index * 100;
      const initialDistance = 100 + Math.random() * 500;
      const angle = Math.random() * Math.PI * 2;
      const randomX = window.innerWidth / 2 + Math.cos(angle) * initialDistance;
      const randomY = window.innerHeight / 2 + Math.sin(angle) * initialDistance;
      
      // Animation for each fragment
      const fragmentSpring = useSpring({
        from: { 
          x: randomX, 
          y: randomY, 
          opacity: 0,
          scale: 0.5,
          rotate: Math.random() * 360
        },
        to: async (next) => {
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
        delay,
        reset: true,
        loop: true
      });
      
      return (
        <animated.div
          key={`code-${index}`}
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
    });
  };
  
  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden pointer-events-none z-30"
      />
      
      {/* Singularity in the center */}
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
      
      {/* Code fragments floating in */}
      {renderCodeFragments()}
      
      {/* Vignette overlay when active */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, ${active ? 0.8 : 0}) 70%)`,
          opacity: active ? 1 : 0
        }}
      />
    </>
  );
};

export default BlackHole;
