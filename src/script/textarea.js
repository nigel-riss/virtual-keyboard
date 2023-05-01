import { KEYS } from './keyboard-map.js';

class Textarea {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = 6;
    this.value = '';

    this.parentElement.append(this.textarea);

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('vKeyPress', (e) => {
      console.log('Got event', e.value);
      if (!KEYS[e.code].isControlKey) {
        this.value += e.value;
      }
      this.render();
    });
  }

  render() {
    this.textarea.innerText = this.value;
    this.textarea.focus();
  }
}

export default Textarea;
