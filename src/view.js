import {createElement} from './helpers';

class View {
  constructor() {
    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('add-input');
    this.list = document.getElementById('todo-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this)); //привяжем метод обработчик к текущему объекту - экземляру класса View
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id='${id}']`); // атрибут data-id=123 у задачи
  }

  createElement(todo) {
    const checkbox = createElement('input',{ type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
    const label = createElement('label', { className: 'title' }, todo.title);

    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const removeButton = createElement('button', { className: 'remove' }, 'Удалить');
    const item = createElement('li', { className: `todo-item${todo.completed ? ' completed' : '' }`, 'data-id': todo.id}, checkbox, label, editInput, editButton, removeButton);

    return this.addEventListeners(item); //подпишем все части элемента на события
  }

  addEventListeners(item){
    const checkbox = listItem.querySelector('.checkbox');
    const editButton = listItem.querySelector('button.edit');
    const removeButton = listItem.querySelector('button.remove');

    checkbox.addEventListener('change', this.handleToggle.bind(this));
    // метод обработчик события - это метод у объекта представления HandleToggle
    //Но просто так указать метод как this.HandleToggle нельзя. Его нужно предварительно привязать к экземпляру класса - объекту, который будет создан на основе класса View.
    // Это делается с помощью метода bind(this)
    editButton.addEventListener('ckick', this.handleEdit.bind(this));
    removeButton.addEventListener('ckick', this.handleRemove.bind(this));

    return item;
  }

  handleToggle({ target }) { //тк это обработчик события, то в качестве параметра у него событие evt, но мы сразу из объекта событие вытащим свойство target с помощью реструктуризации
    const  listItem = target.parentNode;  //этот метод мы отправляем в чекбокс, чекбокс это evt.target, значит получить доступ к li мы можем как к родителю чекбокса
    const id = listItem.getAttribute('data-id');
    const completed = target.completed; //посмотрим, отмечен ли чекбокс

    //мы нажали на чекбокс, получили данные о задаче (id и состояние чекбокса)
    // а дальше нужно обновиться данные в модели. НО представление ничего не знает про модель.

    //update model
  }

  handleEdit({ target }) {
    const  listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');
    const title = input.value;
    const isEditing = listItem.classList.contains('editing'); //вторая часть метода, первая часть в методе editItem

    if(isEditing) { //если мы находимся в режиме редактирования
      // update model
    } else { // если не находимся в режиме редактирования, то в него нужно войти
      input.value = label.textContent;
      editButton.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({ target }) {
    const  listItem = target.parentNode;

    // remove item from model
  }

  handleAdd(evt) {
    evt.preventDefault();

    if(this.input.value ){ // проверим, ввел ли что-то пользователь
      return alert('Необходимо ввести название задачи');
    }

    const value = this.input.value;

    // add item to model
  }


  // добавляет новый элемент в список, принимает объект задачу
  addItem(todo) {
    const listItem = this.createElement(todo); // создадим новый элемент списк

    this.input.value = ''; //уберем занчение из поля
    this.list.appendChild(listItem); //добавим новый элемент в список
  }

  //меняет задачу с невыполненной на выполенную и обратно (чекбокс)
  toggleItem(todo) {
    const listItem = this.findListItem(todo.id); // найдем задачу, которая уже есть в DOM
    const checkbox = listItem.querySelector('.checkbox');

    checkbox.checked = todo.completed; // поменяем свойсвтво чекбокса на то, которое указано в задаче

    if(todo.completed) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }
  }

    /*
  объект задача будет выглядеть так:
  {
    id: 123,
    title: '',
    completed: true/false;
  }
  состояние - массив из этих объектов
    */

  //для изменения заголовка задачи, принимает объект задача
  // метод сработает уже после того как объект задача обновится в хранилище и этотму методу уже будет передана задача с уже обновленными данными
  editItem(todo) {
    const listItem = this.findListItem(todo.id);
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');

    label.textContent = todo.title; //обновим текст задачи
    editButton.textContent = 'Изменить'; //мы исходим из того, что этот метод сработает после обновления задачи, те нам уже нужно обновить DOM
    listItem.classList.remove('editing');
  }


   removeItem(id) {
     const listItem = this.findListItem(todo.id);

     this.list.removeChild(listItem);
   }
}

export default View;