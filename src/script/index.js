import Keyboard from './keyboard.js';

const appElement = document.querySelector('#app');
const keyboard = new Keyboard(appElement);
keyboard.render();

document.addEventListener('keydown', (e) => {
  console.log(e.key);
});
