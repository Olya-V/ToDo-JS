class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    //подпишемся на все события
    view.on('add', this.addTodo.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('edit', this.editTodo.bind(this));
    view.on('remove', this.removeTodo.bind(this));

    view.show(model.state);
  }

  addTodo(title) {
    const todo = this.model.addItem({ // попросим модель добавить новый объект и модель этот объект нам вернет в константу
      id: Date.now(), //не будем писать сами пиханизм генерации уникального ID, просто отправим туда количество милиисекунд
      title,
      completed: false
    });

      //попросим представление добавить этот объект в список
      this.view.addItem(todo); // представление принимает созданный моделью объект
  }

  toggleTodo({ id, completed }) { // принимаем объект, который получен из метода класса View - toggleItem
    const todo = this.model.updateItem(id, { completed }); // попоросим модель обновить данные. После этого получаем от модели новую измененную задачу

    this.view.toggleItem(todo); //во View меняем значение чекбокса, присваиваем/удаляем класс
  }

  editTodo({ id, title }){ // можно отправлять не объект, а обновлять объект с помощью оставшихся параметров
    const todo = this.model.updateItem(id, { title }); //попросим модель обновить данные

    this.view.editItem(todo); // внесем изменения в пользовательский интерфейс
  }

  removeTodo(id){
    this.model.removeItem(id); //попросим модель убрать объект

    this.view.removeItem(id);
  }
}

export default Controller;
