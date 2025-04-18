import './style.css';
import { setupFilePicker } from './filePicker.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>File picker</h1>
    <div class="card">
      <button id="filePickerBtn" type="button"></button>
    </div>
    <div id="output"></div>
  </div>
`;

setupFilePicker(document.querySelector('#filePickerBtn'));
