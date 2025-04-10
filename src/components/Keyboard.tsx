
import React, { useState, useEffect } from 'react';
import { Github, Mail, X, Hand } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useSound from 'use-sound';

const Keyboard = () => {
  const [is3DMode, setIs3DMode] = useState(false);
  const { toast: uiToast } = useToast();
  
  // Use higher volume for the key sound
  const [playKeySound] = useSound('/key-press.mp3', { volume: 0.8 });
  
  const handleKeyClick = () => {
    playKeySound();
  };

  const handleEmailClick = () => {
    handleKeyClick();
    navigator.clipboard.writeText("syedwasifahmed@protonmail.com");
    toast("Email copied to clipboard", {
      description: "syedwasifahmed@protonmail.com",
      position: "bottom-right",
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
      // Activate neural particles
      document.dispatchEvent(new CustomEvent('activate-neural-particles'));
      
      toast("Brain Mode Activated", {
        description: "Welcome to the visual cortex of a developer's mind",
        position: "top-center",
        duration: 4000,
        icon: "🧠",
        style: { background: "rgba(30, 30, 50, 0.9)", border: "1px solid #8B5CF6" },
      });
    } else {
      document.documentElement.classList.remove('mode-3d');
      // Deactivate neural particles
      document.dispatchEvent(new CustomEvent('deactivate-neural-particles'));
      
      toast("Standard Mode Restored", {
        description: "Returning to normal perception",
        position: "top-center",
        duration: 2000,
      });
    }
  };

  // Create a parallax effect when in 3D mode
  useEffect(() => {
    if (!is3DMode) {
      document.documentElement.style.removeProperty('--rotation-x');
      document.documentElement.style.removeProperty('--rotation-y');
      return;
    }
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xRatio = clientX / window.innerWidth;
      const yRatio = clientY / window.innerHeight;
      
      // Map mouse position to rotation values (enhance effect)
      const rotX = 8 - (yRatio * 16); // -8 to +8 degrees
      const rotY = -8 + (xRatio * 16); // -8 to +8 degrees
      
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
        {/* Orange Key (3D Toggle) */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleToggle3D} className="key orange-key">
                <span className="key-icon">🧠</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Developer Brain Mode</p>
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

          {/* Mail Key */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleEmailClick} className="key mail-key">
                <Mail size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Email</p>
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
