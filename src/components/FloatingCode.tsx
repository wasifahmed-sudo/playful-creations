
import React, { useState, useEffect } from 'react';

const codeSnippets = [
  { 
    language: 'javascript', 
    code: `function optimizeAlgorithm(data) {
  return data.filter(x => x.priority > 0)
    .map(x => processItem(x))
    .reduce((a, b) => a + b.value, 0);
}` 
  },
  { 
    language: 'typescript', 
    code: `interface DevBrain<T> {
  thoughts: T[];
  process<U>(input: T): U;
  connect(neuron: Neuron<T>): void;
}` 
  },
  { 
    language: 'css', 
    code: `.neural-pathway {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: blur(2px) brightness(1.2);
  animation: pulse 2s infinite alternate;
}` 
  },
  { 
    language: 'jsx', 
    code: `<Component
  state={activeThought}
  render={({ ideas }) => (
    ideas.map(idea => (
      <Synapse key={idea.id} />
    ))
  )}
/>` 
  },
  { 
    language: 'bash', 
    code: `kubectl scale deployment brain-api --replicas=10
npm run build:neural-network
docker-compose up -d memory-cache` 
  }
];

interface CodeSnippetProps {
  language: string;
  code: string;
  positionIndex: number;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code, positionIndex }) => {
  // Calculate different positions and animation delays based on index
  const getStyles = () => {
    const positions = [
      'top-1/4 left-[15%] animate-float',
      'top-1/3 right-[10%] animate-float-delayed',
      'bottom-1/4 left-[20%] animate-float-slow',
      'bottom-1/3 right-[15%] animate-float-reverse',
      'top-[60%] left-[30%] animate-float-delayed-slow',
    ];
    
    return positions[positionIndex % positions.length];
  };

  return (
    <div className={`absolute ${getStyles()} max-w-xs z-10 pointer-events-none transform-gpu`}>
      <div className="bg-[#1a1a2e] bg-opacity-70 backdrop-blur-md p-3 rounded-md border border-[#8B5CF6]/20 shadow-glow text-left">
        <div className="text-xs text-[#8B5CF6] mb-1">{language}</div>
        <pre className="text-xs text-[#e1e1e6] font-mono overflow-hidden whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
};

const FloatingCode = () => {
  const [active, setActive] = useState(false);
  
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
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {codeSnippets.map((snippet, index) => (
        <CodeSnippet 
          key={index}
          language={snippet.language}
          code={snippet.code}
          positionIndex={index}
        />
      ))}
    </div>
  );
};

export default FloatingCode;
