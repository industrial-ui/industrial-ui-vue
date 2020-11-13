import fade from '@/transitions/effects/fade';
import blur from '@/transitions/effects/blur';
import scale from '@/transitions/effects/scale';
import slide from '@/transitions/effects/slide';
import fly from '@/transitions/effects/fly';

/**
 * The list of all built-in transitions.
 *
 * All of them can be referenced as, for example,
 * <CustomTransition name="blur" :animation={duration: 500, ...restOptions}>
 */
const transitions = {
  fade,
  blur,
  scale,
  slide,
  fly,
};

export default transitions;
