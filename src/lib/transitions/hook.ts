import {AnimationOptions} from '@/lib/types';
import animate from './animate';

const tick = (
  {
    duration, delay, easing, done,
  }: AnimationOptions & {done?: () => void; callback?: () => void},
  draw: (fraction: number) => void,
  callback?: () => void
) => {
    const func = () => {
      animate({
        duration,
        easing,
        draw,
        callback: () => {
          if (done) done();
          if (callback) callback();
        },
      });
    };

    if (delay) setTimeout(func, delay);
    else func();
};

export default tick;
