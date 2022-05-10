/* eslint-disable no-duplicate-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
const keys = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'arrow-upward', 'Shift-right',
  'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'arrow-back', 'arrow-downward', 'arrow-forward', 'Ctrl'];

const keysRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'arrow-upward', 'Shift-right',
  'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'arrow-back', 'arrow-downward', 'arrow-forward', 'Ctrl'];
  

 const shiftKeys = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', 'Del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'arrow-upward', 'Shift-right',
  'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'arrow-back', 'arrow-downward', 'arrow-forward', 'Ctrl'];

const keyCodes = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'NumpadDecimal',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftLeft',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltLeft', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlLeft'];


const textArea = document.createElement('textarea');
textArea.className = 'keyboard-input';
document.body.appendChild(textArea);

let text = document.createElement('div');
text.className = "text";
text.innerHTML = "Клавиатура сделана для ОС Windows";
document.body.appendChild(text);

const virtualKeyboard = {
  elements: {
    keyboard: '',
    container: '',
    keys: [],
  },

  event: {
    input: '',
  },

  propertis: {
    value: '',
    capsLock: false,
    shift: false,
  },

  init() {
    this.elements.keyboard = document.createElement('div');
    this.elements.container = document.createElement('div');
    this.elements.keyboard.classList.add('keyboard');
    this.elements.container.classList.add('keyboard-keys');
    this.elements.container.appendChild(this.createKeys());
    this.elements.keys = this.elements.container.querySelectorAll('.keyboard-key');
    this.elements.keyboard.appendChild(this.elements.container);
    document.body.appendChild(this.elements.keyboard);
    document.querySelectorAll('.keyboard-input').forEach((item) => {
      this.active(item.value, (currentValue) => {
        item.value = currentValue;
      });
    });
  },

  classActive() {
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    // Создание других кнопок
    const createOthers = (key) => `<div>${key}</div>`;
    keys.forEach((key) => {
      const keyButton = document.createElement('button');
      const lineBR = ['backspace', 'Del', 'enter', 'Shift-right'].indexOf(key) !== -1;

      // Добавление атрибутов и классов
      // keyButton.setAttribute('data', key);
      keyButton.setAttribute('type', 'button');
      keyButton.classList.add('keyboard-key');

      // console.log (document.querySelector(`.keyboard-key[data="${key}"]`))

      switch (key) {
        case 'Tab':
          keyButton.classList.add('keyboard-key-medium');
          keyButton.innerHTML = createOthers('Tab');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '   ';
            this.triggerEvents('input');
          });

          break;

        case 'Shift':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Shift');

          keyButton.addEventListener('mousedown', () => {
            keys = shiftKeys;
            this.shiftPress();
          });

          break;

        case 'Shift-right':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Shift');

          break;

        case 'Ctrl':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('Ctrl');

          break;

        case 'Win':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('Win');

          break;

        case 'Alt':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('Alt');

          break;

        case 'Ctrl':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Ctrl');

          break;

        case 'Del':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Del');
          keyButton.addEventListener('click', () => {
            this.propertis.value = this.propertis.value.slice(1);
            this.triggerEvents('input');
          });

          break;

        case 'arrow-back':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('🠔');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '🠔';
            this.triggerEvents('input');
          });

          break;

        case 'arrow-downward':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('🠗');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '🠗';
            this.triggerEvents('input');
          });

          break;

        case 'arrow-forward':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('🠖');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '🠖';
            this.triggerEvents('input');
          });

          break;

        case 'arrow-upward':
          keyButton.classList.add('keyboard-key');
          keyButton.innerHTML = createOthers('🠕');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '🠕';
            this.triggerEvents('input');
          });

          break;

        case 'backspace':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Backspace');

          keyButton.addEventListener('click', () => {
            this.propertis.value = this.propertis.value.slice(0, this.propertis.value.length - 1);
            this.triggerEvents('input');
          });

          break;

        case 'caps':
          keyButton.classList.add('keyboard-key-wide', 'keyboard-key-caps');
          keyButton.innerHTML = createOthers('CapsLock');

          keyButton.addEventListener('click', () => {
            this.toggleCapsLock();
            keyButton.classList.toggle('keyboard-key-active', this.propertis.capsLock);
          });

          break;

        case 'enter':
          keyButton.classList.add('keyboard-key-wide');
          keyButton.innerHTML = createOthers('Enter');

          keyButton.addEventListener('click', () => {
            this.propertis.value += '\n';
            this.triggerEvents('input');
          });

          break;

        case 'space':
          keyButton.classList.add('keyboard-key-extra-wide');
          keyButton.innerHTML = createOthers('');

          keyButton.addEventListener('click', () => {
            this.propertis.value += ' ';
            this.triggerEvents('input');
          });

          break;

        default:
          keyButton.textContent = key.toLowerCase();

          keyButton.addEventListener('click', () => {
            this.propertis.value += this.propertis.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvents('input');
          });

          break;
      }

      fragment.appendChild(keyButton);

      if (lineBR) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  triggerEvents(eventName) {
    if (typeof this.event[eventName] === 'function') {
      this.event[eventName](this.propertis.value);
    }
  },

  shiftPress() {
    this.propertis.shift = !this.propertis.shift;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.propertis.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleCapsLock() {
    this.propertis.capsLock = !this.propertis.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.propertis.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  active(value, input) {
    this.propertis.value = value || '';
    this.event.input = input;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  virtualKeyboard.init();
});
