import {AnimationOptions} from '@/lib/types';
import animate from './animate';

const tick = (
  {
    duration, delay, easing, done,
  }: AnimationOptions & {done: () => void},
  draw: (fraction: number) => void
) => {
    const func = () => {
      animate({
        duration,
        easing,
        draw,
        callback: done,
      });
    };

    if (delay) setTimeout(func, delay);
    else func();
};

export default tick;
