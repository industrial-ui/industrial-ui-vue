import {Transition} from '@/lib/types';
import tick from '@/lib/transitions/hook';

const blurTransition: Transition = {
  name: 'blur',

  // Animation object goes straight to hook functions as argument
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
    amount: 5,
  },

  hooks: {
    beforeEnter ({el}) {
      el.style.filter = 'initial';
      el.style.opacity = '0';
    },

    enter({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        tick({...animation, done}, (fraction) => {
          el.style.opacity = fraction.toString();
          el.style.filter = `blur(${(1 - fraction) * animation.amount}px)`;
        });
      } else done();
    },

    afterEnter ({el}) {
      el.style.opacity = '1';
      el.style.filter = 'inherit';
    },

    beforeLeave ({el}) {
      el.style.filter = 'initial';
      el.style.opacity = '1';
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        tick({...animation, done}, (fraction) => {
          el.style.opacity = (1 - fraction).toString();
          el.style.filter = `blur(${fraction * animation.amount}px)`;
        });
      } else done();
    },

    afterLeave ({el}) {
      el.style.filter = 'initial';
      el.style.opacity = '0';
    },
  },
};

export default blurTransition;
