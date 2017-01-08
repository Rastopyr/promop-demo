
import { init as initEditor } from './editor';

import './index.css';

function init () {
  document.body.appendChild(initEditor());
}

init();
