
import React, { useState, useEffect } from 'react';
import { Coffee, Github, Mail, X, Hand } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useSound from 'use-sound';

const Keyboard = () => {
  const [is3DMode, setIs3DMode] = useState(false);
  const { toast } = useToast();
  
  const [playKeySound] = useSound('/key-press.mp3', { volume: 0.5 });
  
  const handleKeyClick = () => {
    playKeySound();
  };

  const handleEmailClick = () => {
    handleKeyClick();
    navigator.clipboard.writeText("syedwasifahmed@protonmail.com");
    toast({
      description: "Email address copied to clipboard",
      duration: 2000,
    });
  };

  const handleGithubClick = () => {
    handleKeyClick();
    window.open("https://github.com/wasifahmed-sudo", "_blank");
  };

  const handleToggle3D = () => {
    handleKeyClick();
    setIs3DMode(!is3DMode);
    
    if (!is3DMode) {
      document.documentElement.classList.add('mode-3d');
      toast({
        title: "3D Mode Activated!",
        description: "Experience the portfolio in immersive 3D",
        duration: 3000,
      });
    } else {
      document.documentElement.classList.remove('mode-3d');
      toast({
        title: "2D Mode Restored",
        description: "Back to standard view",
        duration: 2000,
      });
    }
  };

  // Create a mouse movement effect when in 3D mode
  useEffect(() => {
    if (!is3DMode) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xRatio = clientX / window.innerWidth;
      const yRatio = clientY / window.innerHeight;
      
      // Map mouse position to rotation values (adjust range as needed)
      const rotX = 5 - (yRatio * 10); // -5 to +5 degrees
      const rotY = -5 + (xRatio * 10); // -5 to +5 degrees
      
      document.documentElement.style.setProperty('--rotation-x', `${rotX}deg`);
      document.documentElement.style.setProperty('--rotation-y', `${rotY}deg`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [is3DMode]);

  return (
    <div className="keyboard-container mb-6 select-none">
      <div className="mechanical-keyboard">
        {/* Coffee Key */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleKeyClick} className="key coffee-key">
                <Coffee size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coffee Break</p>
            </TooltipContent>
          </Tooltip>

          {/* Orange Key (3D Toggle) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleToggle3D} className="key orange-key">
                {is3DMode ? "2D" : "3D"}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle 3D Mode</p>
            </TooltipContent>
          </Tooltip>

          {/* X Key */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleKeyClick} className="key key-x">
                <X size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>

          {/* Github Key */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleGithubClick} className="key github-key">
                <Github size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View GitHub</p>
            </TooltipContent>
          </Tooltip>

          {/* Hand/cursor Key */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleKeyClick} className="key spacebar">
                <Hand size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Interact</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Keyboard;
