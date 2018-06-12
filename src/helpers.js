function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(child => {
      if (typeof child === 'string') {
          child = document.createTextNode(child);
      }

      element.appendChild(child);
  });

  return element;
}

class EventEmitter {
  constructor() {
    this.events =  {  // список событий у объекта
      'add': [], // в качестве значения - массив функций, кторые необходимо вызвать на это событие
      'edit': []
    };
  }

  on(type, callback) { // для подписки на событие, принимает ип события, на которое нужно подписаться и функцию обработчик
    this.events[type] = this.events[type] || []; //проверить есть ли уже какая-то функция колбэк на это событие. Если доступ к свойству что-то вернет, укажет это или пустой массив
    this.events[type].push(callback);
  }

  emit(type, arg) { // принимает тип события, которое необходимо запустить и аргументы
    if (this.events[type]) { // посмотрим, есть ли что вызывать
      this.events[type].forEach(callback => callback(arg)); // если есть, то мы вызвовем все методы по очереди
    }
  }
}


function save(data) {
  const string = JSON.stringify(data);
  localStorage.setItem('todos', string);
}

function load() {
  const string = localStorage.getItem('todos');
  const data = JSON.parse(string); // переводит строку в объект

  return data;
}

export { createElement, EventEmitter, save, load };
