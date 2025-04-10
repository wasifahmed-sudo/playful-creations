
import React, { useState, useEffect, useRef } from 'react';

const codeSnippets = [
  { 
    language: 'javascript', 
    code: `function optimizeRenderer(scene) {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);
  
  return scene.children.filter(object => 
    frustum.intersectsObject(object)
  );
}` 
  },
  { 
    language: 'typescript', 
    code: `interface NeuralNetwork<T> {
  weights: Matrix[];
  bias: Vector[];
  
  forward(input: T): T;
  backward(gradient: T, learningRate: number): void;
  optimize(algorithm: 'adam' | 'rmsprop'): void;
}` 
  },
  { 
    language: 'glsl', 
    code: `precision highp float;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float a = atan(p.y, p.x);
  float r = length(p) * 0.75;
  vec2 uv = vec2(a / 3.1416, sin(r * 3.0 - time));
  float f = cos(uv.y * 6.28 + time) * sin(uv.x * 6.28 + time);
  gl_FragColor = vec4(f * 0.5 + 0.5, f * 0.5 + 0.5, f * 0.8 + 0.2, 1.0);
}` 
  },
  { 
    language: 'jsx', 
    code: `<Canvas shadows dpr={[1, 2]}>
  <Suspense fallback={<Loader />}>
    <Physics>
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} />
        <ChromaticAberration offset={[0.002, 0.002]} />
      </EffectComposer>
      <Environment preset="night" />
      <NeuralNetwork neurons={128} connections={256} />
    </Physics>
  </Suspense>
</Canvas>` 
  },
  { 
    language: 'rust', 
    code: `fn optimize_raytracing<T: Shader>(
    scene: &Scene,
    ray: Ray,
    max_depth: u32
) -> Color {
    if max_depth == 0 {
        return Color::BLACK;
    }
    
    match scene.trace(ray) {
        Some(hit) => {
            let material = hit.material;
            let scatter = material.scatter(ray, hit);
            return scatter.attenuation * 
                optimize_raytracing(scene, scatter.ray, max_depth - 1);
        }
        None => scene.environment_color(ray)
    }
}` 
  }
];

const CodeSnippet: React.FC<{
  language: string;
  code: string;
  positionIndex: number;
  active: boolean;
}> = ({ language, code, positionIndex, active }) => {
  const snippetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0 });
  
  useEffect(() => {
    // Set initial random position based on index
    const getInitialPosition = () => {
      const positions = [
        { x: 15, y: 20, z: 30, rotX: -5, rotY: 10, rotZ: -3 },
        { x: 70, y: 30, z: 40, rotX: 5, rotY: -8, rotZ: 2 },
        { x: 20, y: 70, z: 20, rotX: -8, rotY: 5, rotZ: -1 },
        { x: 65, y: 60, z: 50, rotX: 3, rotY: -10, rotZ: 5 },
        { x: 40, y: 45, z: 35, rotX: -10, rotY: 3, rotZ: -5 },
      ];
      
      return positions[positionIndex % positions.length];
    };
    
    setPosition(getInitialPosition());
    
    // Subtle floating animation
    if (active && snippetRef.current) {
      const floatInterval = setInterval(() => {
        setPosition(prev => ({
          ...prev,
          rotX: prev.rotX + (Math.random() - 0.5) * 0.8,
          rotY: prev.rotY + (Math.random() - 0.5) * 0.8,
          rotZ: prev.rotZ + (Math.random() - 0.5) * 0.4,
          z: prev.z + (Math.random() - 0.5) * 5,
        }));
      }, 2000);
      
      return () => clearInterval(floatInterval);
    }
  }, [positionIndex, active]);

  if (!active) return null;

  return (
    <div 
      ref={snippetRef}
      className="absolute pointer-events-none transform-gpu"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateZ(${position.z}px) rotateX(${position.rotX}deg) rotateY(${position.rotY}deg) rotateZ(${position.rotZ}deg)`,
        transition: 'transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div className="bg-[#1a1a2e] bg-opacity-80 backdrop-blur-md p-4 rounded-lg border border-[#8B5CF6]/30 shadow-glow overflow-hidden max-w-xs">
        <div className="text-xs font-mono text-[#8B5CF6] mb-2 flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#ff7b52] mr-2"></div>
          {language}
        </div>
        <pre className="text-xs text-[#e1e1e6] font-mono overflow-hidden whitespace-pre-wrap syntax-highlighted">
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
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
      {codeSnippets.map((snippet, index) => (
        <CodeSnippet 
          key={index}
          language={snippet.language}
          code={snippet.code}
          positionIndex={index}
          active={active}
        />
      ))}
    </div>
  );
};

export default FloatingCode;
