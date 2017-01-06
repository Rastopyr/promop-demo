
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

  let rectW;
  let rectH;
  let rectX;
  let rectY;
  let rectSide;
  let rectRatio;
  let aspectRatio;
  let hypotenuse;
  let clientPos;
  let clientPosY;
  let clientPosX;
  let controlPos;

  const angle = control.getAttribute('data-angle');
  const allControls = getAngles();

  switch (angle) {
    case 'a':
      clientPos = Math.max(e.pageY, e.pageX);
      controlPos = clientPos - CONTROL_OFFSET;

      control.style.top = `${controlPos}px`;
      control.style.left = `${controlPos}px`;

      rectW = allControls.c.offsetLeft - clientPos + (CONTROL_OFFSET * 2);
      rectH = allControls.c.offsetTop - clientPos + (CONTROL_OFFSET * 2);

      rect.style.top = `${controlPos}px`;
      rect.style.left = `${controlPos}px`;

      rect.style.width = `${rectW}px`;
      rect.style.height = `${rectH}px`;

      allControls.b.style.top = `${controlPos}px`;
      allControls.d.style.left = `${controlPos}px`;
      break;
    case 'b':
      // clientPos = Math.min(e.pageY, e.pageX);
      // controlPos = clientPos - CONTROL_OFFSET;

      //
      // rectW = allControls.c.offsetLeft - clientPos + (CONTROL_OFFSET * 2);
      // rectH = allControls.d.offsetTop - clientPos + (CONTROL_OFFSET * 2);
      //
      // control.style.top = `${clientPos}px`;
      // control.style.left = `${clientPos}px`;

      // rectW = allControls.c.offsetLeft - allControls.d.offsetLeft;
      // rectH = allControls.d.offsetTop - e.pageY + (CONTROL_OFFSET * 2);

      // rectY = e.pageY - CONTROL_OFFSET;
      // rectX = e.pageX - CONTROL_OFFSET;

      // rect.style.top = `${rectY}px`;

      // rect.style.width = `${rect.offsetWidth - (rect.offsetWidth - e.pageX)}px`;
      // rect.style.height = `${rectW}px`;
      //
      // control.style.top = `${rectY}px`;
      // control.style.left = `${rectX}px`;
      //
      // allControls.a.style.top = `${rectY}px`;
      // allControls.c.style.left = control.style.left;
      break;
    case 'c':
      clientPos = Math.min(e.pageY, e.pageX);

      control.style.top = `${clientPos}px`;
      control.style.left = `${clientPos}px`;

      rect.style.width = `${clientPos - rect.offsetTop}px`;
      rect.style.height = `${clientPos - rect.offsetLeft}px`;

      allControls.d.style.top = `${clientPos}px`;
      allControls.b.style.left = `${clientPos}px`;
      break;
    case 'd':
      // clientPos = Math.max(e.pageY - rect.offsetHeight, e.pageX);
      // controlPos = clientPos - CONTROL_OFFSET;
      //
      // control.style.top = `${allControls.b.offsetLeft - clientPos + (CONTROL_OFFSET * 2)}px`;
      // control.style.left = `${controlPos}px`;
      //
      // rect.style.left = `${controlPos}px`;
      //
      // rect.style.height = `${allControls.b.offsetLeft - clientPos + (CONTROL_OFFSET * 2)}px`;
      // rect.style.width = `${allControls.b.offsetLeft - clientPos + (CONTROL_OFFSET * 2)}px`;
      //
      // allControls.a.style.left = `${controlPos}px`;
      // allControls.c.style.top = `${allControls.b.offsetLeft - clientPos + (CONTROL_OFFSET * 2)}px`;
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

  // resizeWrapper.querySelectorAll(`.${styles.control}`).forEach(controlHandler);

  return resizeWrapper;
}
