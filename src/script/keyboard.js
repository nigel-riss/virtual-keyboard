import KEYBOARD_SETTINGS from './keyboard-map.js';

class Keyboard {
  constructor(parentElement, textarea) {
    this.parentElement = parentElement;
    this.textarea = textarea;
    this.isDefaultLayout = true;
    this.keysDown = new Set();

    this.keyboardElement = document.createElement('div');
    this.keyboardElement.className = 'keyboard';
    this.parentElement.append(this.keyboardElement);

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('keydown', (e) => {
      console.clear();
      console.log(e.code);
      this.keysDown.add(e.code);
      console.log(this.keysDown);

      this.render();
    });

    document.addEventListener('keyup', (e) => {
      console.clear();
      console.log(e.code);
      this.keysDown.delete(e.code);

      this.render();
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
    this.textarea.focus();
  }

  renderKey(keyOptions) {
    const {
      id,
      base,
      extraClasses,
    } = keyOptions;

    let extraClass = extraClasses ? extraClasses.join(' ') : '';
    if (this.keysDown.has(id)) {
      extraClass += ' key--pressed';
    }

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
