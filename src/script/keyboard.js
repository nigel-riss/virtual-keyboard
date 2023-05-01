import KEYBOARD_SETTINGS from './keyboard-map.js';

class Keyboard {
  constructor(parentElement, textarea) {
    this.parentElement = parentElement;
    this.textarea = textarea;
    this.isDefaultLayout = true;
    this.isCapsOn = false;
    this.isShiftOn = false;
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
      e.preventDefault();
    });

    document.addEventListener('keyup', (e) => {
      console.clear();
      console.log(e.code);
      this.keysDown.delete(e.code);

      this.render();
      e.preventDefault();
    });

    this.keyboardElement.addEventListener('click', (e) => {
      const buttonCode = e.target.dataset.key;
      if (!buttonCode) { return; }

      switch (buttonCode) {
        case 'CapsLock':
          this.isCapsOn = !this.isCapsOn;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.isShiftOn = !this.isShiftOn;
          break;
        default:
          this.isShiftOn = false;
          break;
      }
      this.render();
      console.log(buttonCode);
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
    if ((id === 'ShiftLeft' || id === 'ShiftRight') && this.isShiftOn) {
      extraClass += ' key--pressed';
    }

    let label;
    switch (true) {
      case (
        this.keysDown.has('ShiftLeft')
        || this.keysDown.has('ShiftRight')
        || this.isShiftOn
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
