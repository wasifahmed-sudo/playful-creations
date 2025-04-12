import React, { useEffect, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import * as Matter from 'matter-js';

const NeuralParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const particlesRef = useRef<Matter.Body[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const activateHandler = () => {
      setActive(true);
    };

    const deactivateHandler = () => {
      setActive(false);
    };

    // Listen for custom events
    document.addEventListener('activate-neural-particles', activateHandler);
    document.addEventListener('deactivate-neural-particles', deactivateHandler);

    return () => {
      document.removeEventListener('activate-neural-particles', activateHandler);
      document.removeEventListener('deactivate-neural-particles', deactivateHandler);
      
      // Clean up Matter.js
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current && renderRef.current.canvas) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas.parentNode) {
          renderRef.current.canvas.parentNode.removeChild(renderRef.current.canvas);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    // Set up Matter.js
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;
    const Composite = Matter.Composite;
    const Constraint = Matter.Constraint;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.05 },
      enableSleeping: false,
    });
    engineRef.current = engine;
    worldRef.current = engine.world;

    // Create renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false
      }
    });
    renderRef.current = render;

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    // Create neural particles
    const createNeurons = () => {
      const particles = [];
      const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 20);
      
      // Create neuron nodes
      for (let i = 0; i < nodeCount; i++) {
        const x = 100 + Math.random() * (window.innerWidth - 200);
        const y = 100 + Math.random() * (window.innerHeight - 200);
        const radius = 5 + Math.random() * 10;
        
        const neuron = Bodies.circle(x, y, radius, {
          restitution: 0.8,
          frictionAir: 0.02,
          friction: 0.01,
          render: {
            fillStyle: getRandomNeuronColor(),
            strokeStyle: '#8B5CF6',
            lineWidth: 1,
            opacity: 0.8
          },
          isStatic: false,
          collisionFilter: {
            group: 1,
            category: 0x0001,
            mask: 0x0001
          }
        });
        
        particles.push(neuron);
        
        // Add an initial velocity
        Body.setVelocity(neuron, {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        });
      }
      
      // Add all particles to the world
      World.add(engine.world, particles);
      
      // Create neural connections (constraints)
      createConnections(particles);
      
      return particles;
    };

    const createConnections = (neurons) => {
      // Create connections between neurons
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          // Not all neurons are connected - random selection
          if (Math.random() > 0.7) continue;
          
          const constraint = Constraint.create({
            bodyA: neurons[i],
            bodyB: neurons[j],
            stiffness: 0.001 + Math.random() * 0.01,
            damping: 0.1,
            render: {
              visible: true,
              lineWidth: 0.5,
              strokeStyle: `rgba(139, 92, 246, ${Math.random() * 0.2 + 0.1})`,
              type: 'line'
            }
          });
          
          World.add(engine.world, constraint);
        }
      }
    };

    // Get random colors for the neurons
    const getRandomNeuronColor = () => {
      const colors = [
        'rgba(139, 92, 246, 0.7)', // Purple
        'rgba(255, 123, 82, 0.7)', // Orange
        'rgba(52, 152, 219, 0.7)', // Blue
        'rgba(46, 204, 113, 0.7)', // Green
      ];
      
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Create the neuron network
    const neurons = createNeurons();
    particlesRef.current = neurons;

    // Add walls to contain the particles
    const wallOptions = {
      isStatic: true,
      render: {
        visible: false
      }
    };
    
    // Add walls as boundaries
    World.add(engine.world, [
      // Top wall
      Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions),
      // Bottom wall
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions),
      // Left wall
      Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
      // Right wall
      Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions)
    ]);

    // Functionality to simulate brain activity with impulses
    const simulateBrainActivity = () => {
      if (!active || particlesRef.current.length === 0) return;
      
      // Apply random impulses to simulate electrical signals
      const randomNeuron = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
      
      // Apply a small impulse in a random direction
      const impulseX = (Math.random() - 0.5) * 0.02;
      const impulseY = (Math.random() - 0.5) * 0.02;
      
      Body.applyForce(randomNeuron, randomNeuron.position, {
        x: impulseX,
        y: impulseY
      });
      
      // Visual pulse effect (handled by a separate rendering loop)
      const pulse = {
        position: { ...randomNeuron.position },
        radius: 0,
        maxRadius: 80,
        opacity: 0.5,
        color: randomNeuron.render.fillStyle
      };
      
      pulses.push(pulse);
    };
    
    // Store pulses for visual effects
    const pulses = [];
    
    // Custom render function to draw additional effects
    const customRender = () => {
      const context = render.context;
      
      // Draw pulses
      pulses.forEach((pulse, index) => {
        pulse.radius += 1.5;
        pulse.opacity -= 0.01;
        
        if (pulse.radius > pulse.maxRadius || pulse.opacity <= 0) {
          pulses.splice(index, 1);
          return;
        }
        
        context.beginPath();
        context.arc(pulse.position.x, pulse.position.y, pulse.radius, 0, 2 * Math.PI);
        context.strokeStyle = pulse.color.replace(/[^,]+(?=\))/, pulse.opacity);
        context.lineWidth = 1;
        context.stroke();
      });
      
      // Draw extra connection lines between nearby neurons
      particlesRef.current.forEach((neuronA, i) => {
        particlesRef.current.slice(i + 1).forEach(neuronB => {
          const dx = neuronA.position.x - neuronB.position.x;
          const dy = neuronA.position.y - neuronB.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = Math.max(0, 0.2 * (1 - distance / 150));
            
            context.beginPath();
            context.moveTo(neuronA.position.x, neuronA.position.y);
            context.lineTo(neuronB.position.x, neuronB.position.y);
            context.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            context.lineWidth = 0.3;
            context.stroke();
          }
        });
      });
    };

    // Set up simulation intervals
    const brainActivityInterval = setInterval(simulateBrainActivity, 300);
    
    // Set up the rendering loop with custom rendering
    Matter.Events.on(render, 'afterRender', customRender);
    
    // Handle window resize
    const handleResize = () => {
      if (!render.canvas) return;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      
      // Adjust boundary walls
      Composite.clear(engine.world, false);
      World.add(engine.world, [
        // Top wall
        Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions),
        // Bottom wall
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions),
        // Left wall
        Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
        // Right wall
        Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions)
      ]);
      
      // Re-add particles and constraints
      World.add(engine.world, particlesRef.current);
      World.add(engine.world, mouseConstraint);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start the engine and renderer
    Engine.run(engine);
    Render.run(render);

    return () => {
      clearInterval(brainActivityInterval);
      window.removeEventListener('resize', handleResize);
      
      // Clean up Matter.js
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current && renderRef.current.canvas) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas.parentNode) {
          renderRef.current.canvas.parentNode.removeChild(renderRef.current.canvas);
        }
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-auto z-[-1] opacity-80"
    />
  );
};

export default NeuralParticles;
