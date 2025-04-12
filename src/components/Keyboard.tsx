import React, { useState, useEffect } from 'react';
import { Github, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import useSound from 'use-sound';
import "./keyboard/index.css";

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
    
    // Toggle the 3D mode state
    const newMode = !is3DMode;
    setIs3DMode(newMode);
    
    try {
      // Add or remove the mode-3d class to the document with a slight delay
      // This ensures all elements are visible during the transition
      if (newMode) {
        // First add the class
        document.documentElement.classList.add('mode-3d');
        
        // Then trigger the particles and effects with a delay
        setTimeout(() => {
          // Make sure the document still exists before firing events
          if (document) {
            const activateParticlesEvent = new CustomEvent('activate-neural-particles');
            const activateBlackHoleEvent = new CustomEvent('activate-black-hole');
            
            document.dispatchEvent(activateParticlesEvent);
            document.dispatchEvent(activateBlackHoleEvent);
            
            toast("Singularity Activated", {
              description: "Entering the computational event horizon",
              position: "top-center",
              duration: 4000,
              style: { background: "rgba(20, 20, 35, 0.9)", border: "1px solid #8B5CF6" },
            });
          }
        }, 100);
      } else {
        // When deactivating, first trigger the deactivation events
        if (document) {
          const deactivateParticlesEvent = new CustomEvent('deactivate-neural-particles');
          const deactivateBlackHoleEvent = new CustomEvent('deactivate-black-hole');
          
          document.dispatchEvent(deactivateParticlesEvent);
          document.dispatchEvent(deactivateBlackHoleEvent);
        }
        
        // Then remove the class after a short delay
        setTimeout(() => {
          if (document && document.documentElement) {
            document.documentElement.classList.remove('mode-3d');
          }
          
          toast("Standard Mode Restored", {
            description: "Returning to normal space-time",
            position: "top-center",
            duration: 2000,
          });
        }, 300);
      }
    } catch (error) {
      console.error("Error toggling 3D mode:", error);
      
      // Error recovery - ensure we return to a stable state
      if (!is3DMode) {
        document.documentElement.classList.remove('mode-3d');
      }
      
      toast("An error occurred", {
        description: "There was a problem toggling the visual effect",
        position: "top-center",
      });
    }
  };

  // Create a parallax effect when in 3D mode
  useEffect(() => {
    if (!is3DMode) {
      document.documentElement.style.setProperty('--rotation-x', '0deg');
      document.documentElement.style.setProperty('--rotation-y', '0deg');
      return () => {};
    }
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xRatio = clientX / window.innerWidth;
      const yRatio = clientY / window.innerHeight;
      
      // Map mouse position to rotation values (enhance effect)
      const rotX = 5 - (yRatio * 10); // -5 to +5 degrees (reduced intensity)
      const rotY = -5 + (xRatio * 10); // -5 to +5 degrees (reduced intensity)
      
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
        {/* Toggle Singularity Key */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleToggle3D} 
                className={`key orange-key ${is3DMode ? 'active' : ''}`} 
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Singularity</p>
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
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Keyboard;
