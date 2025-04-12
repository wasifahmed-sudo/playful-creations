
/// <reference types="vite/client" />

// Add Matter.js type definitions for global use
declare module 'matter-js' {
  export type Engine = any;
  export type Body = any;
  export type World = any;
  export type Render = any;
  export type Runner = any;
  export type Bodies = any;
  export type Composite = any;
  export type Constraint = any;
  export type Mouse = any;
  export type MouseConstraint = any;
}
