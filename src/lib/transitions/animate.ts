import {EasingFunction, Easings} from '@/lib/types/transitions';
import easings from '@/lib/transitions/easings';

const isString = (str: any): str is string => typeof str === 'string';

const animate = ({
  easing,
  draw,
  duration,
  callback,
}: {
  duration: number,
  draw: (fraction: number) => void,
  easing?: Extract<keyof Easings, string> | EasingFunction,
  callback?: () => void,
}) => {
  const start = performance.now();

  requestAnimationFrame(function tick(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state with timing function: linear, ease-in, ease-out etc
    let progress = timeFraction;
    if (easing) {
      if (isString(easing)) progress = easings[easing]?.(timeFraction) || timeFraction;
      else progress = easing(timeFraction) || timeFraction;
    }

    draw(progress);

    if (timeFraction < 1) requestAnimationFrame(tick);
    else if (callback) callback();
  });
};

export default animate;
