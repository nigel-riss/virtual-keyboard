import { KEYS } from './keyboard-map.js';

const direction = {
  DELETE: 1,
  BACKSPACE: -1,
};

class Textarea {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = 6;
    this.value = '';
    this.cursorPosition = 0;

    this.parentElement.append(this.textarea);

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('vKeyPress', (e) => {
      if (!KEYS[e.code].isControlKey) {
        this.insertText(e.value);
      } else {
        switch (e.code) {
          case 'Enter':
            this.insertText('\n');
            break;
          case 'Tab':
            this.insertText('\t');
            break;
          case 'Backspace':
            this.deleteText(direction.BACKSPACE);
            break;
          case 'Delete':
            this.deleteText(direction.DELETE);
            break;

          default:
            break;
        }
      }
    });

    this.textarea.addEventListener('click', () => {
      this.cursorPosition = this.textarea.selectionStart;
    });
  }

  insertText(text) {
    const before = this.value.slice(0, this.textarea.selectionStart);
    const after = this.value.slice(this.textarea.selectionEnd, this.value.length);
    this.value = before + text + after;
    this.cursorPosition += 1;
    this.render();
  }

  deleteText(delDirection) {
    let before;
    let after;
    if (delDirection === direction.BACKSPACE) {
      before = this.value.slice(0, this.cursorPosition - 1);
      after = this.value.slice(this.cursorPosition, this.value.length);
      this.cursorPosition -= 1;
    }
    if (delDirection === direction.DELETE) {
      before = this.value.slice(0, this.cursorPosition);
      after = this.value.slice(this.cursorPosition + 1, this.value.length);
    }

    this.value = before + after;
    this.render();
  }

  render() {
    this.textarea.textContent = this.value;
    this.textarea.focus();
    this.textarea.selectionStart = this.cursorPosition;
  }
}

export default Textarea;
