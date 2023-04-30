import Keyboard from './keyboard.js';

const appElement = document.querySelector('#app');

const wrapperElement = document.createElement('main');
wrapperElement.className = 'wrapper';
appElement.insertAdjacentElement('afterbegin', wrapperElement);

const textareaElement = document.createElement('textarea');
textareaElement.className = 'textarea';
textareaElement.rows = 6;
wrapperElement.append(textareaElement);

const keyboard = new Keyboard(wrapperElement);
keyboard.render();

document.addEventListener('keydown', (e) => {
  console.log(e.code);
});
