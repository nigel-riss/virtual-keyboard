import {
  KEYBOARD_SETTINGS,
  KEYS,
} from './keyboard-map.js';

class Keyboard {
  constructor(parentElement, isAltLayout) {
    this.parentElement = parentElement;
    this.isAltLayout = !!isAltLayout;
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
      this.keysDown.add(e.code);
      if (e.code === 'CapsLock') {
        this.isCapsOn = !this.isCapsOn;
      }

      this.dispatchEvent(e.code);

      this.render();
      e.preventDefault();
    });

    document.addEventListener('keyup', (e) => {
      this.keysDown.delete(e.code);

      if (e.code === 'AltLeft' && e.shiftKey) {
        this.toggleLayout();
      }

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
        case 'AltLeft':
          if (this.isShiftOn) {
            this.toggleLayout();
          }
          break;
        default:
          this.dispatchEvent(buttonCode);
          break;
      }

      if (buttonCode !== 'ShiftLeft' && buttonCode !== 'ShiftRight') {
        this.isShiftOn = false;
      }

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
  }

  renderKey(keyOptions) {
    const {
      id,
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

    const label = this.getKeyValue(id);

    return (
      `<button
        class="key ${extraClass}"
        data-key="${id}"
      >
        ${label}
      </button>`
    );
  }

  getKeyValue(keyId) {
    const {
      base,
      shift,
      layoutBase,
      layoutShift,
      isControlKey,
    } = KEYS[keyId];

    if (
      this.keysDown.has('ShiftLeft')
      || this.keysDown.has('ShiftRight')
      || this.isShiftOn
    ) {
      return this.isAltLayout ? layoutShift : shift;
    }

    if (this.isCapsOn && !isControlKey) {
      return this.isAltLayout
        ? layoutBase.toUpperCase()
        : base.toUpperCase();
    }

    return this.isAltLayout ? layoutBase : base;
  }

  dispatchEvent(keyId) {
    if (!KEYS[keyId]) { return; }
    const value = this.getKeyValue(keyId);
    const vKeyEvent = new Event('vKeyPress');
    vKeyEvent.value = value;
    vKeyEvent.code = keyId;
    document.dispatchEvent(vKeyEvent);
  }

  toggleLayout() {
    this.isAltLayout = !this.isAltLayout;
    window.localStorage.setItem('virtual-keyboard', this.isAltLayout);
  }
}

export default Keyboard;
