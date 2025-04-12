
/// <reference types="vite/client" />

// Define Matter.js module
declare module 'matter-js' {
  // Engine and rendering
  export const Engine: any;
  export const Render: any;
  export const Runner: any;
  export const World: any;
  export const Bodies: any;
  export const Body: any;
  export const Composite: any;
  export const Constraint: any;
  export const Mouse: any;
  export const MouseConstraint: any;
  export const Events: any;
  
  // Types for our references
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
