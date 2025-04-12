
// Common types used by BlackHole components
import Matter from 'matter-js';

export interface ParticleRef {
  current: Matter.Body[];
}

export interface EngineRef {
  current: Matter.Engine | null;
}

export interface BlackHoleState {
  active: boolean;
}

export interface CodeFragmentProps {
  code: string;
  index: number; 
  active: boolean;
}
