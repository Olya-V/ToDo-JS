function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => element[key] = props[key]);

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
      'add': [callback, callback, callback], // в качестве значения - массив функций, кторые необходимо вызвать на это событие
      'edit': [callback, callback, callback]
    };
  }

  on(type, callback) { // для подписки на событие, принимает ип события, на которое нужно подписаться и функцию обработчик
    this.events[type] = this.events[type] || []; //проверить есть ли уже какая-то функция колбэк на это событие. Если доступ к свойству что-то вернет, укажет это или пустой массив
    this.events[type].push(callback);
  }

  emit(type, arg) { // принимает тип события, которое необходимо запустить и аргументы
    if (this.event[type]) { // посмотрим, есть ли что вызывать
      this.events[type].forEach(callbakc => callback(arg)); // если есть, то мы вызвовем все методы по очереди
    }
  }
}

export { createElement, EventEmitter };
