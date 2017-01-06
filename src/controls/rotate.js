
import styles from './controls.css';
import editorStyles from '../editor/editor.css';

export const template = () => `
  <div class="${styles.control} ${styles['rotate-control']}"></div>
`;

function rotate(control, e) {
  const editor = document.querySelector(`.${editorStyles.editor}`);
  const rect = document.querySelector(`.${editorStyles.rect}`);

  const boxCenter=[
    rect.offsetLeft + (rect.offsetWidth / 2),
    rect.offsetTop + (rect.offsetHeight / 2)
  ];

  const angle = Math.atan2(
    e.pageX - boxCenter[0],
    - (e.pageY- boxCenter[1])
  ) * (180/Math.PI);

  editor.style.transform = `rotate(${angle + 180}deg)`;
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
