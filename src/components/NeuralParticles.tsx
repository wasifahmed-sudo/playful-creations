import React, { useEffect, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const NeuralParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
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
      
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Generate random particles
    const generateParticles = () => {
      const particles = [];
      const particleCount = Math.min(window.innerWidth, window.innerHeight) / 10;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: getRandomColor(),
          speed: Math.random() * 0.5 + 0.2,
          angle: Math.random() * 360,
          connectionRadius: Math.random() * 100 + 50,
        });
      }
      
      return particles;
    };

    const getRandomColor = () => {
      const colors = [
        'rgba(139, 92, 246, ', // Purple
        'rgba(255, 123, 82, ', // Orange
        'rgba(52, 152, 219, ', // Blue
        'rgba(46, 204, 113, ', // Green
      ];
      
      return colors[Math.floor(Math.random() * colors.length)];
    };

    particlesRef.current = generateParticles();

    // Simulate brain activity
    const simulateBrainActivity = () => {
      // Periodically simulate "thought" activity
      const thoughtInterval = setInterval(() => {
        if (!active) {
          clearInterval(thoughtInterval);
          return;
        }

        // Simulate a thought or idea connection
        const randomParticle = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
        
        if (randomParticle) {
          const x = randomParticle.x;
          const y = randomParticle.y;
          
          // Create a pulse effect
          const createPulse = () => {
            let radius = 0;
            const maxRadius = randomParticle.connectionRadius * 1.5;
            const pulseInterval = setInterval(() => {
              if (!active || radius >= maxRadius) {
                clearInterval(pulseInterval);
                return;
              }
              
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.strokeStyle = `${randomParticle.color}${(1 - radius/maxRadius).toFixed(2)})`;
              ctx.lineWidth = 2;
              ctx.stroke();
              
              radius += 4;
            }, 16);
          };
          
          createPulse();
        }
      }, 2000);

      return thoughtInterval;
    };

    const thoughtInterval = simulateBrainActivity();

    // Animation loop
    const animate = () => {
      if (!active) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move particles in random directions
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Change direction randomly
        if (Math.random() < 0.02) {
          particle.angle += (Math.random() - 0.5) * 0.2;
        }
        
        // Keep particles within canvas
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}0.7)`;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const threshold = particlesRef.current[i].connectionRadius;
          
          if (distance < threshold) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / threshold);
            
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `${particlesRef.current[i].color}${opacity.toFixed(2)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      clearInterval(thoughtInterval);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
    />
  );
};

export default NeuralParticles;
