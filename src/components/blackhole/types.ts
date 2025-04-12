
// Common types used by BlackHole components
import * as MatterJS from 'matter-js';

export interface ParticleRef {
  current: MatterJS.Body[];
}

export interface EngineRef {
  current: MatterJS.Engine | null;
}

export interface BlackHoleState {
  active: boolean;
}

export interface CodeFragmentProps {
  code: string;
  index: number; 
  active: boolean;
}
