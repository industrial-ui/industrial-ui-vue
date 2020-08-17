import {Transition} from '@/lib/types';
import animate from '@/lib/utils/animate';

const fadeTransition: Transition = {
  name: 'fade',
  // Animation object goes straight to hook functions as argument
  animation: {
    duration: 300,
  },
  hooks: {
    enter ({el, done}, animation) {
      el.style.opacity = '0';
      animate({
        duration: animation.duration,
        draw: (fraction) => el.style.opacity = fraction.toString(),
        callback: done,
      });
    },

    leave ({el, done}, animation) {
      el.style.opacity = '1';
      animate({
        duration: animation.duration,
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
