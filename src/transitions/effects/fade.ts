import {Transition} from '@/types/transitions';
import tick from '@/transitions/hook';

/**
 * Example of the built-in transition Fade effect.
 * It is completely made of JS-based anymations and Vue-supported hooks.
 */
const fadeTransition: Transition = {
  name: 'fade',

  /**
   * Animation object goes straight to hook functions as argument
   */
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
  },

  /**
   * In the hooks, we specify the initial styles of the element and
   * their transition from one state to another.
   *
   * For the sake of usability, animation.type, delay, duration and other properties are added.
   */
  hooks: {
    enter ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        /**
         * In Fade transition, only opacity changes from 0 to 1.
         * You can see it is given: `el.style.opacity = fraction`.
         *
         * Fraction is always an increasing number from 0 to 1.
         */
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
