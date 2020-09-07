import {Easings} from '@/lib/types';

const easings: Easings = {
  linear: (x: number) => x,
  easeIn: (x: number) => 1 - Math.cos((x * Math.PI) / 2),
  easeOut: (x: number) => Math.sin((x * Math.PI) / 2),
  easeInOut: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
  easeInBack: (x: number) => 2.70158 * x ** 3 - 1.70158 * x * x,
  easeOutBack: (x: number) => 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2,
  easeInOutBack: (x: number) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
      ? ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2)) / 2
      : ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
};

export default easings;
