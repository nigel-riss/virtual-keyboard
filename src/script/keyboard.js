import KEYBOARD from './keyboard-map.js';

class Keyboard {
  constructor(parentElement) {
    this.isDefaultLayout = true;
    this.parentElement = parentElement;

    this.keyboardElement = document.createElement('div');
    this.keyboardElement.className = 'keyboard';
  }

  render() {
    let keyboardHTML = KEYBOARD
      .map((row) => row
        .reduce((markup, key) => {
          const newMarkup = markup + this.renderKey(key);
          return newMarkup;
        }, ''))
      .join('</div><div class="keyboard__row">');

    keyboardHTML = `<div class="keyboard__row">${keyboardHTML}</div>`;

    this.keyboardElement.insertAdjacentHTML('afterbegin', keyboardHTML);
    this.parentElement.append(this.keyboardElement);
  }

  renderKey(keyOptions) {
    const {
      id,
      base,
      extraClasses,
    } = keyOptions;

    const extraClass = extraClasses ? extraClasses.join(' ') : '';

    return (
      `<button
        class="key ${extraClass}"
        data-key="${id}"
      >
        ${base}
      </button>`
    );
  }
}

export default Keyboard;
