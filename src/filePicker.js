/** Shows a file picker that allows the user to select one or multiple files.
 * @param {HTMLElement} output
 */
async function getFile(output) {
  try {
    const pickerOpts = {
      types: [
        {
          description: 'Accepted files',
          accept: {
            '*/*': ['.pdf', '.png', '.js', '.ts', '.jpg'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: true,
    };
    /** @type {FileSystemFileHandle[]} */
    const fileHandle = await window.showOpenFilePicker(pickerOpts);

    for (const f of fileHandle) {
      const file = await f.getFile();
      if (file.type.endsWith('script')) {
        output.contentEditable = true;
        output.style.display = 'block';
        output.innerHTML = `<pre><code> ${await file.text()} </code></pre>`;
        break;
      }
    }
  } catch (e) {
    let dialog = document.createElement('dialog');

    const dismissIcon = document.createElement('img');
    dismissIcon.setAttribute('src', (await import('/xmark.svg')).default);

    const button = document.createElement('button');
    button.innerHTML = 'Try again';

    dialog.popover = 'auto';
    dialog.innerHTML = '<h3>Cancelled</h3> <p>No files have been selected.</p>';

    button.addEventListener(
      'click',
      function onClick() {
        getFile(output);
        documentRemoveDialog();
      },
      {
        once: true,
        passive: true,
        capture: false,
      }
    );

    document.addEventListener(
      'click',
      function onClick(event) {
        if (!dialog) {
          return document.removeEventListener('click', onClick, {
            capture: true,
          });
        }
        if (!dialog.contains(event.target)) {
          documentRemoveDialog();
        }
      },
      {
        passive: true,
        capture: true,
      }
    );

    dismissIcon.addEventListener('click', documentRemoveDialog, {
      once: true,
      passive: true,
      capture: true,
    });

    dialog.appendChild(button);
    dialog.appendChild(dismissIcon);
    document.documentElement.appendChild(dialog);
    dialog.showPopover();

    function documentRemoveDialog() {
      dialog.close();
      document.documentElement.removeChild(dialog);
      dialog = undefined;
    }
  }
}

/**
 * Initialize the file picker.
 */
function initFilePicker({ trigger, output }) {
  assertIsTrigger(trigger);
  assertIsOutput(output);
  trigger.addEventListener('click', getFile.bind(null, output));
}

function assertIsTrigger(trigger) {
  if (!trigger || !(trigger && trigger instanceof HTMLButtonElement)) {
    throw new Error('The trigger must be an HTMLButtonElement.');
  }
}

function assertIsOutput(output) {
  if (!output || !(output && output instanceof HTMLElement)) {
    throw new Error('The output must be a valid HTMLElement.');
  }
}

export default initFilePicker;
