import {Transition} from '@/lib/types';
import animate from '@/lib/utils/animate';

const fadeTransition: Transition = {
  name: 'fade',
  hooks: {
    enter (el: HTMLElement, done: () => {}, duration = 500) {
      el.style.opacity = '0';
      animate({
        duration,
        draw: (fraction) => el.style.opacity = fraction.toString(),
        callback: done,
      });
    },

    leave (el: HTMLElement, done: () => {}, duration = 500) {
      el.style.opacity = '1';
      animate({
        duration,
        draw: (fraction) => el.style.opacity = (1 - fraction).toString(),
        callback: done,
      });
    },
  },
};

const transitions = {
  fade: fadeTransition,
};

export default transitions;
