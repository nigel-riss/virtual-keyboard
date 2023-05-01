import { KEYS } from './keyboard-map.js';

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
      console.log('Got event', e.value);
      if (!KEYS[e.code].isControlKey) {
        this.insertText(e.value);
        this.cursorPosition += 1;
        this.render();
      }
    });

    this.textarea.addEventListener('click', () => {
      this.cursorPosition = this.textarea.selectionStart;
      console.log(this.cursorPosition);
    });
  }

  insertText(text) {
    // const before = this.value.slice(0, this.cursorPosition);
    // const after = this.value.slice(this.cursorPosition, this.value.length);
    const before = this.value.slice(0, this.textarea.selectionStart);
    const after = this.value.slice(this.textarea.selectionEnd, this.value.length);
    this.value = before + text + after;
  }

  render() {
    this.textarea.innerText = this.value;
    this.textarea.focus();
    this.textarea.selectionStart = this.cursorPosition;
  }
}

export default Textarea;
