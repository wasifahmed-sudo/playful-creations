
/// <reference types="vite/client" />

// Add Matter.js type definitions for global use
declare namespace Matter {
  export type Engine = any;
  export type Render = any;
  export type World = any;
  export type Bodies = any;
  export type Body = any;
  export type Composite = any;
  export type Constraint = any;
  export type Mouse = any;
  export type MouseConstraint = any;
  export type Runner = any;
  export type Events = any;
}

declare module 'matter-js' {
  export = Matter;
}
