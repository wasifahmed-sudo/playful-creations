
import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { EngineRef, ParticleRef } from './types';

interface PhysicsEngineProps {
  containerRef: React.RefObject<HTMLDivElement>;
  engineRef: EngineRef;
  particlesRef: ParticleRef;
  requestRef: React.MutableRefObject<number | null>;
  active: boolean;
}

const PhysicsEngine: React.FC<PhysicsEngineProps> = ({ 
  containerRef, 
  engineRef, 
  particlesRef, 
  requestRef, 
  active 
}) => {
  useEffect(() => {
    if (!containerRef.current) return;
    
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
    
    // Start the engine using Runner instead of Engine.run as per warning
    const Runner = Matter.Runner;
    const runner = Runner.create();
    Runner.run(runner, engine);
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
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      Runner.stop(runner);
      
      // Check if canvas exists before removing
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, [containerRef, engineRef, requestRef]);
  
  // Manage particles based on active state
  useEffect(() => {
    if (!engineRef.current) {
      return;
    }
    
    const engine = engineRef.current;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    
    // Don't clear existing particles if not active - this prevents flashing
    if (active) {
      // Clear existing particles only when activating
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
      };
    } else {
      // When deactivating, gradually remove particles instead of clearing them all at once
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // Slowly fade out particles instead of removing them all at once
      const fadeOutParticles = () => {
        if (particlesRef.current.length === 0) return;
        
        // Remove a few particles each frame for a gradual effect
        const particlesToRemove = particlesRef.current.slice(0, 5);
        particlesToRemove.forEach(particle => {
          World.remove(engine.world, particle);
        });
        
        particlesRef.current = particlesRef.current.filter(p => 
          !particlesToRemove.some(rp => rp.id === p.id)
        );
        
        if (particlesRef.current.length > 0) {
          requestRef.current = requestAnimationFrame(fadeOutParticles);
        }
      };
      
      fadeOutParticles();
    }
  }, [active, engineRef, particlesRef, requestRef]);
  
  return null;
};

export default PhysicsEngine;
