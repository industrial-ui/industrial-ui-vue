import Vue from 'vue';

export const DEFAULT_POSITION = 'top left';

export type AllowedPosition = 'bottom left'|'bottom right'|'top right'|'top left'|'auto';

const changePosition = (node: HTMLElement, position: AllowedPosition) => {
  if (position === 'bottom left') {
    node.style.bottom = '100%';
    node.style.left = '0';
    node.style.right = 'auto';
    node.style.top = 'auto';
  } else if (position === 'bottom right') {
    node.style.bottom = '100%';
    node.style.right = '0';
    node.style.left = 'auto';
    node.style.top = 'auto';
  } else if (position === 'top right') {
    node.style.top = '100%';
    node.style.right = '0';
    node.style.left = 'auto';
    node.style.bottom = 'auto';
  } else if (position === 'top left') {
    node.style.top = '100%';
    node.style.left = '0';
    node.style.right = 'auto';
    node.style.bottom = 'auto';
  }
};

export const getOptimalPosition = (
  node: HTMLElement,
  {position, positionRelative}: {position: AllowedPosition; positionRelative: string}
) => {
  if (position !== 'auto') return position;

  const nodeProps = node.getBoundingClientRect();
  let canGoLeft;
  let canGoRight;
  let canGoTop;
  let canGoBottom;

  if (positionRelative) {
    const relative = node.closest(positionRelative);
    if (!relative) return DEFAULT_POSITION;

    const relProps = relative.getBoundingClientRect();
    canGoLeft = nodeProps.left - nodeProps.width > relProps.left;
    canGoRight = relProps.right - nodeProps.left > nodeProps.width;
    canGoTop = nodeProps.top - relProps.top > nodeProps.height;
    canGoBottom = relProps.bottom - nodeProps.top > nodeProps.height;
  } else {
    canGoLeft = nodeProps.left > nodeProps.width;
    canGoRight = window.innerWidth - nodeProps.right > nodeProps.width;
    canGoTop = nodeProps.top > nodeProps.height;
    canGoBottom = window.innerHeight - nodeProps.bottom > nodeProps.height;
  }

  let res = '';
  if (canGoBottom) res += 'top ';
  else if (canGoTop) res += 'bottom ';
  else res += 'top '; // TODO: in this case, move the opener point, so the element appears somewhere in the middle

  if (canGoRight) res += 'left';
  else if (canGoLeft) res += 'right';
  else res += 'left'; // TODO: in this case, move the opener point, so the element appears somewhere in the middle

  return res as AllowedPosition;
};

const checkPosition = Vue.directive('check-position', {
  /**
   * Vue directive to properly display an element within its parent
   * @param node
   * @param binding
   */
  update (node: HTMLElement, binding) {
    const {position, positionRelative} = binding.value as {position: AllowedPosition; positionRelative: string};
    changePosition(node, getOptimalPosition(node, {position, positionRelative}));
  },
});
export default checkPosition;
