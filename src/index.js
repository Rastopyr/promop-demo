
import { init as initEditor } from './editor';
import { getAngles } from './helpers';

import './index.css';


function init() {
  document.body.appendChild(initEditor());
}

init();
