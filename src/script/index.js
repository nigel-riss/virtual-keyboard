import Keyboard from './keyboard.js';

const appElement = document.querySelector('#app');

const wrapperElement = document.createElement('main');
wrapperElement.className = 'wrapper';
appElement.insertAdjacentElement('afterbegin', wrapperElement);

const titleElement = document.createElement('h1');
titleElement.className = 'title';
titleElement.innerHTML = 'Virtual <em>Keyboard</em>';
wrapperElement.append(titleElement);

const textareaElement = document.createElement('textarea');
textareaElement.className = 'textarea';
textareaElement.rows = 6;
wrapperElement.append(textareaElement);

const keyboard = new Keyboard(wrapperElement, textareaElement);
keyboard.render();

const descriptionElement = document.createElement('p');
descriptionElement.className = 'description';
descriptionElement.innerHTML = 'The Keyboard was created on GNU Linux (Ubuntu 22.04) <br> Use left <em>&nbsp;Shift + Alt&nbsp;</em> to switch layout';
wrapperElement.append(descriptionElement);
