
import { init as initControls } from '../controls';

import styles from './editor.css';

const editorTemplate = () => `
  <div class="${styles.rect}"></div>
`;

export function init () {
  const editorWrapper = document.createElement('div');
  editorWrapper.setAttribute('class', styles.editor);
  editorWrapper.innerHTML = editorTemplate();

  editorWrapper.appendChild(initControls());

  return editorWrapper;
}
