
import styles from './controls.css';
import editorStyles from '../editor/editor.css';

export const template = () => `
  <div class="${styles.control} ${styles['rotate-control']}"></div>
`;

export function updateRotateControl({ x, y, w } = {}) {
  const control = document.querySelector(
    `.${styles['rotate-wrapper']}`
  );

  control.style.left = `${x + (w/2)}px`;
  control.style.top = `${y}px`;

  return control;
}

function rotate(control, e) {
  const editor = document.querySelector(`.${editorStyles.editor}`);
  const rect = document.querySelector(`.${editorStyles.rect}`);

  const rectCenter = [
    (editor.offsetLeft + editor.offsetWidth) / 2,
    (editor.offsetTop + editor.offsetHeight) / 2
  ];

  const angle = Math.atan2(
    e.pageX - rectCenter[0],
    - (e.pageY - rectCenter[1])
  ) * (180 / Math.PI) + 180;

  editor.style.transform = `rotate(${angle}deg)`;
}

function controlHandler(control) {
  let isDrag = false;
  let rotateControl = null;

  control.onmousedown = function(e) {
    isDrag = true;
    rotateControl = rotate.bind(window, e.target);
  };

  document.addEventListener('mousemove', function(e) {
    if (!isDrag) {
      return;
    }

    rotateControl(e);
  });

  document.addEventListener('mouseup', function() {
    isDrag = false;
    rotateControl = null;
  });
}

export function init() {
  const rotateWrapper = document.createElement('div');

  rotateWrapper.setAttribute('class', styles['rotate-wrapper']);
  rotateWrapper.innerHTML = template();

  rotateWrapper.querySelectorAll(`.${styles.control}`).forEach(controlHandler);

  return rotateWrapper;
};
