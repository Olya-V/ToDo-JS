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


// функция создает очередной элемент для отображения задачи
function createTodoItem(title) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  const label = document.createElement('label');
  label.innerText = title;
  label.className = 'title';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'textfield';

  const editButton = document.createElement('button');
  editButton.innerText = 'Изменить';
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Удалить';
  deleteButton.className = 'delete';

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  bindEvents(listItem); // подписались на события

  console.log(listItem);
  return listItem;
}


// функция обработчик принимает объект событие
function toggleTodoItem ({ target }) { // воспользуемся реуструктуризацией - не будем указывать evt и evt.target, а укажем объект и в нем сразу нужное нам свойство
  console.log(target); //с помощью объекта событие / или this получим доступ к элементу
  console.log(this);

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
    console.log(this);
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
