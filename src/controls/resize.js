
import styles from './controls.css';
import editorStyles from '../editor/editor.css';

export const template = () => `
  <div class="${styles.control}" data-angle="a"></div>
  <div class="${styles.control}" data-angle="b"></div>
  <div class="${styles.control}" data-angle="c"></div>
  <div class="${styles.control}" data-angle="d"></div>
`;

export function resize ({
  control,
  editorW,
  editorH,
  editorHyp,
  ratio,
  angle,
  bcr
}, e) {
  let newSide;

  const editor = document.querySelector(`.${editorStyles.editor}`);

  switch (angle) {
    case 'a':
      newSide = Math.max(e.pageY - bcr.top, e.pageX - bcr.left);

      editor.style.width = `${bcr.width - newSide}px`;
      editor.style.height = `${bcr.height - newSide}px`;

      editor.style.top = `${bcr.bottom - editor.offsetHeight}px`;
      editor.style.left = `${bcr.right - editor.offsetWidth}px`;
      break;
    case 'b':
      newSide = Math.max(e.pageY - bcr.top, bcr.width - e.pageX);

      editor.style.width = `${bcr.width - newSide}px`;
      editor.style.height = `${bcr.height - newSide}px`;

      editor.style.top = `${bcr.bottom - editor.offsetHeight}px`;
      break;
    case 'c':
      newSide = Math.min(e.pageY - bcr.top, e.pageX - bcr.left);

      editor.style.width = `${newSide}px`;
      editor.style.height = `${newSide}px`;
      break;
    case 'd':
      newSide = Math.min(e.pageY - bcr.top, bcr.right - e.pageX);

      editor.style.width = `${newSide}px`;
      editor.style.height = `${newSide}px`;

      editor.style.left = `${bcr.right - editor.offsetWidth}px`;
      break;
    default:
      break;
  }
}

export function controlHandler (control) {
  let isDrag = false;
  let resizeControl = null;

  let opts = {};

  control.onmousedown = function (e) {
    const editor = document.querySelector(`.${editorStyles.editor}`);

    isDrag = true;

    opts.control = e.target;
    opts.editorW = editor.offsetWidth;
    opts.editorH = editor.offsetHeight;
    opts.editorHyp = Math.sqrt(Math.pow(editor.offsetWidth, 2) + Math.pow(editor.offsetHeight, 2));
    opts.ratio = editor.offsetWidth / editor.offsetHeight;
    opts.angle = e.target.getAttribute('data-angle');
    opts.bcr = editor.getBoundingClientRect();

    resizeControl = resize.bind(window, opts);
  };

  document.addEventListener('mousemove', function (e) {
    if (!isDrag) {
      return;
    }

    resizeControl(e);
  });

  document.addEventListener('mouseup', function () {
    isDrag = false;
    resizeControl = null;
  });
};

export function init () {
  const resizeWrapper = document.createElement('div');

  resizeWrapper.setAttribute('class', styles['resize-wrapper']);
  resizeWrapper.innerHTML = template();

  resizeWrapper.querySelectorAll(`.${styles.control}`).forEach(controlHandler);

  return resizeWrapper;
}
