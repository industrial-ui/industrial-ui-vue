import {Transition} from '@/lib/types';
import tick from '@/lib/transitions/hook';

const blurTransition: Transition = {
  name: 'scale',

  // Animation object goes straight to hook functions as argument
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
    scale: 0.5,
    opacity: 0.3,
  },

  hooks: {
    beforeEnter ({el}, animation) {
      el.style.opacity = animation.opacity.toString();
      el.style.transform = 'initial';
    },

    enter({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        tick({...animation, done}, (fraction) => {
          el.style.transform = `scale(${animation.scale + (1 - animation.scale) * fraction})`;
          el.style.opacity = `${animation.opacity + (1 - animation.opacity) * fraction}`;
        });
      } else done();
    },

    afterEnter ({el}) {
      el.style.transform = 'initial';
      el.style.opacity = '1';
    },

    beforeLeave ({el}) {
      el.style.transform = 'initial';
      el.style.opacity = '1';
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        tick({...animation, done}, (fraction) => {
          el.style.transform = `scale(${1 - (1 - animation.scale) * fraction})`;
          el.style.opacity = `${1 - (1 - animation.opacity) * fraction}`;
        });
      } else done();
    },

    afterLeave ({el}, animation) {
      el.style.transform = 'initial';
      el.style.opacity = animation.opacity.toString();
    },
  },
};

export default blurTransition;
