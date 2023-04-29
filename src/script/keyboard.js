import KEYBOARD from './keyboard-map.js';

class Keyboard {
  constructor(parentElement) {
    this.isDefaultLayout = true;
    this.parentElement = parentElement;
  }

  render() {
    let keyboardHTML = KEYBOARD
      .map((row) => row
        .reduce((markup, key) => {
          const newMarkup = markup + this.renderKey(key);
          return newMarkup;
        }, ''))
      .join('</div><div>');

    keyboardHTML = `<div>${keyboardHTML}</div>`;

    this.parentElement.insertAdjacentHTML('afterbegin', keyboardHTML);
  }

  renderKey(keyOptions) {
    return `<button>${keyOptions.base}</button>`;
  }
}

export default Keyboard;
