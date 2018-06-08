const toDoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

//функция обработчик события оптравки формы
function addTodoItem(evt){
  evt.preventDefault(); //остановим отправку данных на сервер и что бы не перезагружалась страница при отправке формы

  if(addInput.value === '') {
    return alert('Необходимо ввести название задачи');
  }

  const todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);

  addInput.value = '';
}

// созадим функцию-помощник для создания элементов. Это паттер проектирования "фасад"
// когда мы берем трудоемкую операцию и оборачиваем ее в красивую упаковку, которой очень удобно пользоваться
// вся jQuery - один большой фасад для DOM
// props - объект со свойствами элемента
// после свойств можно передать дочерние элементы, воспользуется оператором rest
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  /*

  //можно воспользоваться циклом for-in что бы перебрать все свойства объекта
  for (let prop in props) {
    element[prop] = props[prop]; // element.type = props['type'] или props.type; потом свойство className
  }
  // но проблема в том, что в методе for-in окажутся и другие свойства, которые попадут в объект при наследовании
  // для того, что бы перебрать только свойства самого объекта нужно будет вставить проверку
  // является ли это свойство свойством самого объекта или перешло по наследованию

  */

  // вместо это используем метод глобального объекта keys
  Object.keys(props).forEach(key => element[key] = props[key]); //keys верет массив со свойствами объекта. Свойство = значение

  // добавим функционал по добавлению детей, ребенок может быть либо простым текстом, либо DOM-элементом
  //console.log(tagName, children);

  if (children.length > 0) { //проверим есть ли у нас дети, тк children - массив
    children.forEach(child => {
      if(typeof child === 'string') { // мы не можем добвлять строку как child, тк это не объект, который является узелом - DOM-элементом
        child = document.createTextNode(child);                     // создадим сами дом-узел из текста
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

  // тк мы используем оператор rest-оператор оставшихся параметров, то сюда мы можем отправить аргументы через запятую
  // они уже будут массивом в функции

  bindEvents(listItem); // подписались на события
  return listItem;
}


// функция обработчик принимает объект событие
function toggleTodoItem ({ target }) { // воспользуемся реуструктуризацией - не будем указывать evt и evt.target, а укажем объект и в нем сразу нужное нам свойство
  // console.log(target); //с помощью объекта событие / или this получим доступ к элементу
  // console.log(this);

  //но нам нужен не сам чекбокс, а элемент li этой задачи - родитель чекбокса
  const listItem = this.parentNode;
  listItem.classList.toggle('completed'); // если класс присутствует у элемента, то скрипт его уберет, если нет - добавит

}


function editTodoItem() {
  const listItem = this.parentNode;  //получим родителя
  const title = listItem.querySelector('.title');
  const editInput = listItem.querySelector('.textfield');
  const isEditing = listItem.classList.contains('editing'); // проверим есть ли определенный класс у элемента

  //когда находимся в режиме редактирования нужно поменять название задачи на текущее значение из поля
  if (isEditing) {
    title.innerText = editInput.value;
    this.innerText = 'Изменить'; //будем менять название кнопки с сохранить на изменить
                                  //this - это наша кнопка изменить, тк на нее мы и нажимали
  } else { //если мы не находимся в режиме редактирования, то нужно в него войти:взять текст из title и засунуть его в поле
    editInput.value = title.innerText;
    this.innerText = 'Сохранить'; //берется значение из поля, указывается для текстового значения label и
  }

  listItem.classList.toggle('editing'); //если у поля есть класс editing, то label прячется и показывается input
}
function deleteTodoItem() {
  const listItem = this.parentNode;
  todoList.removeChild(listItem); //сам элемент не может себя удалить, это может сделать родитель

}


//создадим функцию для привязки события
function bindEvents(todoItem) {
  //получим доступ к элементам, с которыми пользователь будет взаимодействовать в этой задаче- чек бокс и две кнопки
  const checkbox = todoItem.querySelector('.checkbox');
  const editButton = todoItem.querySelector('button.edit');
  const deleteButton = todoItem.querySelector('button.delete');

  // подпишемся на события у этих элементов
  checkbox.addEventListener('change', toggleTodoItem);
  editButton.addEventListener('click', editTodoItem);
  deleteButton.addEventListener('click', deleteTodoItem)
}


// создадим главную функцию, которая выполняет программу, ее еще называют init
function main() {
  // привяжем обработчик события на событие отправку формы
  toDoForm.addEventListener('submit', addTodoItem);

  //для всех элементов, которые уже есть в списке привяжем обработчики
  todoItems.forEach(item => bindEvents(item));
}

main();

// app в самом простом виде. Все в глобальной среде, все попадает в глобальный объектникакой инкапсуляции нет.
// Решить пролбему можно с помощью паттерна модули - IIFE