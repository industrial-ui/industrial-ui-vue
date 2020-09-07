import {Transition} from '@/lib/types';
import tick from '@/lib/transitions/hook';

const flyTransition: Transition = {
  name: 'fly',

  // Animation object goes straight to hook functions as argument
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
    opacity: 0,
    x: 0,
    y: 0,
  },

  hooks: {
    beforeEnter ({el}, animation) {
      el.style.transform = 'initial';
      el.style.opacity = animation.opacity.toString();
    },

    enter({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        tick({...animation, done}, (fraction) => {
          el.style.opacity = `${animation.opacity + (1 - animation.opacity) * fraction}`;
          el.style.transform = `translate(${(1 - fraction) * animation.x}px, ${(1 - fraction) * animation.y}px)`;
        });
      } else done();
    },

    afterEnter ({el}) {
      el.style.transform = 'initial';
      el.style.opacity = '1';
    },

    beforeLeave ({el}, animation) {
      el.style.transform = `translate(${animation.x}px, ${animation.y}px)`;
      el.style.opacity = '1';
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        tick({...animation, done}, (fraction) => {
          el.style.opacity = `${1 - (1 - animation.opacity) * fraction}`;
          el.style.transform = `translate(${fraction * animation.x}px, ${fraction * animation.y}px)`;
        });
      } else done();
    },

    afterLeave ({el}, animation) {
      el.style.transform = 'initial';
      el.style.opacity = animation.opacity.toString();
    },
  },
};

export default flyTransition;
