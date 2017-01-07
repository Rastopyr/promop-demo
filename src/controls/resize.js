
import { CONTROL_OFFSET } from '../config';
import { getAngles, getDomVal } from '../helpers';

import styles from './controls.css';
import editorStyles from '../editor/editor.css';

export const template = () => `
  <div class="${styles.control}" data-angle="a"></div>
  <div class="${styles.control}" data-angle="b"></div>
  <div class="${styles.control}" data-angle="c"></div>
  <div class="${styles.control}" data-angle="d"></div>
`;

export function resize(control, e) {
  const editor = document.querySelector(`.${editorStyles.editor}`);
  const rect = document.querySelector(`.${editorStyles.rect}`);

  // let rectW;
  // let rectH;
  // let rectX;
  // let rectY;
  // let rectSide;
  // let rectRatio;
  // let aspectRatio;
  // let hypotenuse;
  //
  // let controlPos;

  let rectS;
  let controlScale;
  let clientPos;
  let controlPos;

  let rectX;
  let rectY;

  const angle = control.getAttribute('data-angle');
  const allControls = getAngles();
  const clientScale = Math.min( e.pageX / rect.offsetWidth, e.pageX / rect.offsetHeight);

  const rectWidth = allControls.c.offsetLeft - allControls.d.offsetLeft;
  const rectHeight = allControls.c.offsetTop - allControls.b.offsetTop;

  switch (angle) {
    case 'a':
      rectS = Math.max(
        allControls.c.offsetTop - e.pageY, allControls.c.offsetLeft - e.pageX
      ) + (CONTROL_OFFSET * 2);

      control.style.top = `${(allControls.c.offsetTop - rectS) + CONTROL_OFFSET}px`;
      control.style.left = `${(allControls.c.offsetLeft - rectS) + CONTROL_OFFSET}px`;

      rect.style.top = control.style.top;
      rect.style.left = control.style.left;

      rect.style.width = `${rectS}px`;
      rect.style.height = `${rectS}px`;

      allControls.b.style.top = control.style.top;
      allControls.d.style.left = control.style.left;
      break;
    case 'b':
      rectS = Math.max(
        allControls.d.offsetTop - e.pageY, e.pageX - allControls.d.offsetLeft
      ) - (CONTROL_OFFSET * 2);

      rect.style.width = `${rectS}px`;
      rect.style.height = `${rectS}px`;

      control.style.top = `${(allControls.d.offsetTop - rectS) + CONTROL_OFFSET}px`;
      control.style.left = `${(allControls.d.offsetLeft + rectS) + CONTROL_OFFSET}px`;

      rect.style.top = control.style.top;

      allControls.a.style.top = control.style.top;
      allControls.c.style.left = control.style.left;
      break;
    case 'c':
      rectS = Math.max(
        e.pageY - allControls.a.offsetTop, e.pageX - allControls.d.offsetLeft
      ) - (CONTROL_OFFSET * 2);

      control.style.top = `${(allControls.a.offsetTop + rectS) + CONTROL_OFFSET}px`;
      control.style.left = `${(allControls.a.offsetLeft + rectS) + CONTROL_OFFSET}px`;

      rect.style.width = `${rectS}px`;
      rect.style.height = `${rectS}px`;

      allControls.d.style.top = control.style.top;
      allControls.b.style.left = control.style.left;
      break;
    case 'd':
      rectS = Math.max(
        e.pageY - allControls.b.offsetTop, allControls.d.offsetLeft - e.pageX
      ) - (CONTROL_OFFSET * 2);

      rect.style.width = `${rectS}px`;
      rect.style.height = `${rectS}px`;

      control.style.top = `${(allControls.b.offsetTop + rectS) + CONTROL_OFFSET}px`;
      control.style.left = `${(allControls.b.offsetLeft - rectS) + CONTROL_OFFSET}px`;

      rect.style.left = control.style.left;

      allControls.a.style.left = control.style.left;
      allControls.c.style.top = control.style.top;
      break;
    default:
      return false;
  }
}

export function controlHandler(control) {
  let isDrag = false;
  let resizeControl = null;

  control.onmousedown = function(e) {
    isDrag = true;
    resizeControl = resize.bind(window, e.target);
  };

  document.addEventListener('mousemove', function(e) {
    if (!isDrag) {
      return;
    }

    resizeControl(e);
  });

  document.addEventListener('mouseup', function() {
    isDrag = false;
    resizeControl = null;
  });
};

export function init() {
  const resizeWrapper = document.createElement('div');

  resizeWrapper.setAttribute('class', styles['resize-wrapper']);
  resizeWrapper.innerHTML = template();

  resizeWrapper.querySelectorAll(`.${styles.control}`).forEach(controlHandler);

  return resizeWrapper;
}
