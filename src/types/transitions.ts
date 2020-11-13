export type EasingFunction = (x: number) => number;

export type Easings = {
  linear: EasingFunction,
  easeIn: EasingFunction,
  easeOut: EasingFunction,
  easeInOut: EasingFunction,
  easeInBack: EasingFunction,
  easeOutBack: EasingFunction,
  easeInOutBack: EasingFunction,
}

export interface AnimationOptions {
  delay: number,
  duration: number,
  type: 'only-in'|'only-out'|'both',
  // Get easings here: https://easings.net/
  easing: Extract<keyof Easings, string> | EasingFunction,

  // Special for different effects
  amount: number, // Used in blur
  scale: number, // Used in scale
  opacity: number, // Used in scale and fly
  x: number, // Used in fly
  y: number, // Used in fly
}

export interface TransitionOptions {
  // Reference this effect and give it another animation properties, but leave hooks untouched
  effectReference: string,

  animation: Partial<AnimationOptions>,

  appear?: boolean,
  mode?: 'in-out'|'out-in',
}

export interface TransitionHooks {
  beforeEnter: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  enter: (native: {el: HTMLElement; done: () => void}, animation: AnimationOptions) => void,
  afterEnter: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  enterCancelled: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  beforeLeave: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  leave: (native: {el: HTMLElement; done: () => void}, animation: AnimationOptions) => void,
  afterLeave: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  leaveCancelled: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
}

export interface Transition extends Partial<TransitionOptions> {
  name: string,
  hooks?: Partial<TransitionHooks>,
}
