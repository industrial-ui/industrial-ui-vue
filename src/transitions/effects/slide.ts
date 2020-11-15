import {Transition} from '@/types/transitions';
import tick from '@/transitions/hook';

const slideTransition: Transition = {
  name: 'slide',

  // Animation object goes straight to hook functions as argument
  animation: {
    delay: 0,
    duration: 300,
    type: 'both',
  },

  hooks: {
    enter({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-in') {
        const {
          opacity, height, paddingTop, paddingBottom, marginTop,
          marginBottom, borderTopWidth, borderBottomWidth, overflow,
        } = getComputedStyle(el);

        tick({...animation, done}, (fraction) => {
          el.style.overflow = 'hidden';
          el.style.opacity = `${Math.min(fraction * fraction, 1) * parseFloat(opacity)}`;
          el.style.height = `${fraction * parseFloat(height)}px`;
          el.style.paddingTop = `${fraction * parseFloat(paddingTop)}px`;
          el.style.paddingBottom = `${fraction * parseFloat(paddingBottom)}px`;
          el.style.marginTop = `${fraction * parseFloat(marginTop)}px`;
          el.style.marginBottom = `${fraction * parseFloat(marginBottom)}px`;
          el.style.borderTopWidth = `${fraction * parseFloat(borderTopWidth)}px`;
          el.style.borderBottomWidth = `${fraction * parseFloat(borderBottomWidth)}px`;
        }, () => {
          el.style.overflow = overflow;
        });
      } else done();
    },

    leave ({el, done}, animation) {
      if (animation.type === 'both' || animation.type === 'only-out') {
        const style = {...getComputedStyle(el)};

        tick({...animation, done}, (fraction) => {
          const fraq = 1 - fraction;
          el.style.overflow = 'hidden';
          el.style.opacity = `${fraq * parseFloat(style.opacity)}`;
          el.style.height = `${fraq * parseFloat(style.height)}px`;
          el.style.paddingTop = `${fraq * parseFloat(style.paddingTop)}px`;
          el.style.paddingBottom = `${fraq * parseFloat(style.paddingBottom)}px`;
          el.style.marginTop = `${fraq * parseFloat(style.marginTop)}px`;
          el.style.marginBottom = `${fraq * parseFloat(style.marginBottom)}px`;
          el.style.borderTopWidth = `${fraq * parseFloat(style.borderTopWidth)}px`;
          el.style.borderBottomWidth = `${fraq * parseFloat(style.borderBottomWidth)}px`;
        }, () => {
          el.style.overflow = style.overflow;
          ['opacity', 'height', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderBottomWidth'].forEach((name) => {
            (el.style as any)[name] = (style as any)[name];
          });
        });
      } else done();
    },
  },
};

export default slideTransition;
