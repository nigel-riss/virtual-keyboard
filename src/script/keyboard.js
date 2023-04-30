import KEYBOARD_SETTINGS from './keyboard-map.js';

class Keyboard {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.isDefaultLayout = true;

    this.keyboardElement = document.createElement('div');
    this.keyboardElement.className = 'keyboard';
    this.parentElement.append(this.keyboardElement);

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('keydown', (e) => {
      console.clear();
      console.log(e.code);

      this.render();
    });

    document.addEventListener('keyup', (e) => {
      console.clear();
      console.log(e.code);
    });
  }

  render() {
    let keyboardHTML = KEYBOARD_SETTINGS
      .map((row) => row
        .reduce((markup, key) => {
          const newMarkup = markup + this.renderKey(key);
          return newMarkup;
        }, ''))
      .join('</div><div class="keyboard__row">');

    keyboardHTML = `<div class="keyboard__row">${keyboardHTML}</div>`;

    this.keyboardElement.innerHTML = keyboardHTML;
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
