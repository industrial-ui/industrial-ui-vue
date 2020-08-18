const animate = ({
  easing,
  draw,
  duration,
  callback,
}: {
  duration: number,
  draw: (fraction: number) => void,
  easing?: (fraction: number) => number,
  callback?: () => void,
}) => {
  const start = performance.now();

  requestAnimationFrame(function tick(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state with timing function: linear, ease-in, ease-out etc
    const progress = easing ? easing(timeFraction) : timeFraction;

    draw(progress);

    if (timeFraction < 1) requestAnimationFrame(tick);
    else if (callback) callback();
  });
};

export default animate;
