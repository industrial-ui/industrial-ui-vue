const animate = ({
  timing,
  draw,
  duration,
  callback,
}: {
  duration: number,
  draw: (fraction: number) => void,
  timing?: (fraction: number) => number,
  callback?: () => void,
}) => {
  const start = performance.now();

  requestAnimationFrame(function tick(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state with timing function: linear, ease-in, ease-out etc
    const progress = timing ? timing(timeFraction) : timeFraction;

    draw(progress);

    if (timeFraction < 1) requestAnimationFrame(tick);
    else if (callback) callback();
  });
};

export default animate;
