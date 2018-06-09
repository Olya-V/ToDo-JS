const main = ((document) => {
  const toDoForm = document.getElementById('todo-form');
  const addInput = document.getElementById('add-input');
  const todoList = document.getElementById('todo-list');
  const todoItems = document.querySelectorAll('.todo-item');


//функция обработчик события оптравки формы
  function addTodoItem(evt){
    evt.preventDefault();

    if(addInput.value === '') {
      return alert('Необходимо ввести название задачи');
    }

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);

    addInput.value = '';
  }


// созадим функцию-помощник для создания элементов
  function createElement(tagName, props, ...children) {
    const element = document.createElement(tagName);
    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) { // проверку можно опустить, тк если длинна массива = 0 то метод forEach не сработает.
      children.forEach(child => {
        if(typeof child === 'string') {
          child = document.createTextNode(child);
        }
        element.appendChild(child);
      })
    }

    return element;
  }


// функция создает очередной элемент для отображения задачи
  function createTodoItem(title) {
    const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});
    const label = createElement('label', {className: 'title'}, title); // innerText - child
    const editInput = createElement('input', {type: 'text', className: 'textfield'});
    const editButton = createElement('button', {className: 'edit'}, 'Изменить');
    const deleteButton = createElement('button', {className:'delete'}, 'Удалить');
    const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, editButton, deleteButton);

    bindEvents(listItem);
    return listItem;
  }


// функция обработчик принимает объект событие
  function toggleTodoItem ({ target }) {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
  }

  function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      title.innerText = editInput.value;
      this.innerText = 'Изменить';

    } else {
      editInput.value = title.innerText;
      this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');
  }

  function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);

  }


//создадим функцию для привязки события
  function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem)
  }


  function load() {
    const data = JSON.parse(localStorage.getItem('todos'));
    return data;
  }

  function save(data) {
    const string = JSON.stringify(data);
    localStorage.setItem('todos', string)
  }

// Массив с такими объектами мы можем сохранять его в локальное хранилище и загружать оттуда.
// но если мы в таком виде захотим добавить данные, то нужно будет переписать все кроме createTodoItem
  const data = [{id: 1, title: '', completed: false}, {}, {}];

// создадим главную функцию, которая выполняет программу, ее еще называют init
  function main() {
    toDoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
  }

  return main;
})(document);

main();

