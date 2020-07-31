import Vue from 'vue';

const changePosition = (node: HTMLElement, position: string) => {
  if (position === 'bottom left') {
    node.style.top = '100%';
    node.style.left = '0';
    node.style.right = 'auto';
    node.style.bottom = 'auto';
  } else if (position === 'bottom right') {
    node.style.top = '100%';
    node.style.right = '0';
    node.style.left = 'auto';
    node.style.bottom = 'auto';
  } else if (position === 'top right') {
    node.style.bottom = '100%';
    node.style.right = '0';
    node.style.left = 'auto';
    node.style.top = 'auto';
  } else if (position === 'top left') {
    node.style.bottom = '100%';
    node.style.left = '0';
    node.style.right = 'auto';
    node.style.top = 'auto';
  }
};

const checkPosition = Vue.directive('check-position', {
  /**
   * Vue directive to properly display an element within its parent
   * @param node
   * @param binding
   */
  update (node: HTMLElement, binding) {
    const {position, positionRelative} = binding.value;
    if (position) {
      if (position === 'auto' || position === 'auto relative') {
        const nodeProps = node.getBoundingClientRect();
        let canGoLeft;
        let canGoRight;
        let canGoTop;
        let canGoBottom;

        if (positionRelative) {
          const relative = node.closest(positionRelative);
          if (!relative) {
            changePosition(node, 'bottom left');
            return;
          }

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

        if (canGoBottom && canGoRight) changePosition(node, 'bottom left');
        else if (canGoBottom && canGoLeft) changePosition(node, 'bottom right');
        else if (canGoTop && canGoRight) changePosition(node, 'top left');
        else if (canGoTop && canGoLeft) changePosition(node, 'top right');
      } else {
        changePosition(node, position);
      }
    }
  },
});
export default checkPosition;
