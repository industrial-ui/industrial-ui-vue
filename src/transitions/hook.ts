import {AnimationOptions} from '@/types/transitions';
import animate from '@/transitions/animate';

/**
 * Perform the transition of the element
 *
 * @param duration – how long will the animation last
 * @param delay – how long should we wait before the start of animation
 * @param easing – the function that defines how should the animation go (linear, easeIn, etc)
 * @param done – first callback of the animation. Usually taken by the Vue's done() function
 * @param draw – function to change the styles of the element
 * @param callback – function that invokes after the end of the transition
 */
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
