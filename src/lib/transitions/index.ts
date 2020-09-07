import fade from './effects/fade';
import blur from './effects/blur';
import scale from './effects/scale';
import slide from './effects/slide';
import fly from './effects/fly';

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
