import {Transition} from '@/lib/types';

const fadeTransition: Transition = {
  name: 'fade',
  hooks: {
    beforeEnter (el: HTMLElement) {
      el.style.opacity = '0';
      el.style.transformOrigin = 'left';
    },
    enter (el: HTMLElement, done: () => {}) {
      el.style.opacity = '0.5';
      done();
    },
    leave (el: HTMLElement, done: () => {}) {
      el.style.opacity = '0';
      done();
    },
  },
};

const transitions = {
  fade: fadeTransition,
};

export default transitions;
