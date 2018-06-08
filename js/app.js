((document) => {
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

    if (children.length > 0) {
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


// создадим главную функцию, которая выполняет программу, ее еще называют init
  function main() {
    toDoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
  }

  main();
})(document);
//для того, что бы модуль не общался с внешней средой передадим ему document
//теперь мы не засоряем глобальное постранство
//это еще не паттерн модуля, это просто модуль.
//Чтобы был паттерн модуль из этой функции надо что-то вернуть