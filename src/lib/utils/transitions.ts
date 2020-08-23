import {Transition} from '@/lib/types';
import animate from '@/lib/utils/animate';

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
        const fade = () => {
          animate({
            duration: animation.duration,
            easing: animation?.easing,
            draw: (fraction) => el.style.opacity = fraction.toString(),
            callback: done,
          });
        };

        if (animation.delay) setTimeout(fade, animation.delay);
        else fade();
      } else {
        el.style.opacity = '1';
        done();
      }
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        el.style.opacity = '1';
        const fade = () => {
          animate({
            duration: animation.duration,
            easing: animation?.easing,
            draw: (fraction) => el.style.opacity = (1 - fraction).toString(),
            callback: done,
          });
        };

        if (animation.delay) setTimeout(fade, animation.delay);
        else fade();
      } else {
        el.style.opacity = '0';
        done();
      }
    },
  },
};

const transitions = {
  fade: fadeTransition,
};

export default transitions;
