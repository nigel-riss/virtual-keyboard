import Keyboard from './keyboard.js';
import Textarea from './textarea.js';

const appElement = document.querySelector('#app');

const wrapperElement = document.createElement('main');
wrapperElement.className = 'wrapper';
appElement.insertAdjacentElement('afterbegin', wrapperElement);

const titleElement = document.createElement('h1');
titleElement.className = 'title';
titleElement.innerHTML = 'Virtual <em>Keyboard</em>';
wrapperElement.append(titleElement);

const textarea = new Textarea(wrapperElement);
textarea.render();

const isAltLayout = window.localStorage.getItem('virtual-keyboard');
const keyboard = new Keyboard(wrapperElement, JSON.parse(isAltLayout));
keyboard.render();

const descriptionElement = document.createElement('p');
descriptionElement.className = 'description';
descriptionElement.innerHTML = 'The Keyboard was created on GNU Linux (Ubuntu 22.04) <br> Use <em>&nbsp;Shift + Left Alt&nbsp;</em> to switch layout';
wrapperElement.append(descriptionElement);
