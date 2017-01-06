
// import { init as initResize } from './resize';
import { init as initRotate } from './rotate';

import styles from './controls.css';

export function init() {
  const controlWrapper = document.createElement('div');

  controlWrapper.setAttribute('class', styles['control-wrapper']);
  // controlWrapper.appendChild(initResize());
  controlWrapper.appendChild(initRotate());

  return controlWrapper;
}
