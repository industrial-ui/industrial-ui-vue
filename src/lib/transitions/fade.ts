import {Transition} from '@/lib/types';
import tick from '@/lib/transitions/hook';

const fadeTransition: Transition = {
  name: 'fade',

  // Animation object goes straight to hook functions as argument
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
  },

  hooks: {
    enter ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        el.style.opacity = '0';
        tick({...animation, done}, (fraction) => el.style.opacity = fraction.toString());
      } else {
        el.style.opacity = '1';
        done();
      }
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        el.style.opacity = '1';
        tick({...animation, done}, (fraction) => el.style.opacity = (1 - fraction).toString());
      } else {
        el.style.opacity = '0';
        done();
      }
    },
  },
};

export default fadeTransition;
