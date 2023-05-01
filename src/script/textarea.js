// import { KEYS } from './keyboard-map.js';

class Textarea {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = 6;

    this.parentElement.append(this.textarea);
  }

  render() {
    // TODO: add text rendering
  }
}

export default Textarea;
