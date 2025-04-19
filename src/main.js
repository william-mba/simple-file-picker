import './style.css';
import initFilePicker from './filePicker.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>File picker</h1>
    <div class="card">
      <button id="trigger" type="button">
      Select files
      </button>
    </div>
    <div id="output"></div>
  </div>
`;

initFilePicker({
  trigger: document.querySelector('#trigger'),
  output: document.querySelector('#output'),
});
