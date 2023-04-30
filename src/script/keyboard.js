import KEYBOARD_SETTINGS from './keyboard-map.js';

class Keyboard {
  constructor(parentElement, textarea) {
    this.parentElement = parentElement;
    this.textarea = textarea;
    this.isDefaultLayout = true;
    this.isCapsOn = false;
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
      if (e.code === 'CapsLock') {
        this.isCapsOn = !this.isCapsOn;
      }

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
      shift,
      isControlKey,
      extraClasses,
    } = keyOptions;

    let extraClass = extraClasses ? extraClasses.join(' ') : '';
    if (isControlKey) {
      extraClass += ' key--control';
    }
    if (this.keysDown.has(id)) {
      extraClass += ' key--pressed';
    }
    if (id === 'CapsLock' && this.isCapsOn) {
      extraClass += ' key--pressed';
    }

    let label;
    switch (true) {
      case (
        this.keysDown.has('ShiftLeft')
        || this.keysDown.has('ShiftRight')
      ):
        label = shift;
        break;
      case (this.isCapsOn && !isControlKey):
        label = base.toUpperCase();
        break;
      default:
        label = base;
        break;
    }

    return (
      `<button
        class="key ${extraClass}"
        data-key="${id}"
      >
        ${label}
      </button>`
    );
  }
}

export default Keyboard;
