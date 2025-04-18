const pickerOpts = {
  types: [
    {
      description: 'Scripts files',
      accept: {
        'text/javascript': ['.js', '.ts'],
      },
    },
    {
      description: 'Images',
      accept: {
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
      },
    },
    {
      description: 'PDF files',
      accept: {
        'application/pdf': ['.pdf'],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: true,
};

/** @type {FileSystemFileHandle[]} */
let fileHandle;

async function getFile() {
  fileHandle = await window.showOpenFilePicker(pickerOpts);
  /** @type {HTMLDivElement} */
  const output = document.querySelector('#output');
  output.innerHTML =
    '<pre><code>' +
    (await (await fileHandle[0].getFile()).text()) +
    '\n</code></pre>';
  output.contentEditable = true;
}

/**
 *
 * @param {HTMLButtonElement} element
 */
function setupFilePicker(element) {
  element.addEventListener('click', getFile);
  element.innerHTML = 'Select files';
}

export { setupFilePicker };
