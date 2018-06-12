import { EventEmitter} from './helpers';

class Model extends EventEmitter {
  constructor(state = []) {
    super();

    this.state = state;
  }

  // метод для получения данных из состояния
  getItem(id) {
    return this.state.find(item => item.id == id); // воспользуемся методом find  у массивов, он принимает коллбэк. В нашем случае с параметром
  }

  // метод для добавления данных в состояние
  addItem(item) {
    this.state.push(item);
    this.emit('change', this.state);
    return item;
  }

  // обновление состояния, находим объект по id и записываем в него новые данные
  updateItem(id, data) {
    const item = this.getItem(id); //найдем объект
                                    //перемерем свойства data, которые мы получили и все свойства и их значения запишем в объект item
    Object.keys(data).forEach(prop => item[prop] = data[prop]); // получим все свойства объекта с данными - обратно поулчим массив и переберем его с помощью метода forEach

    this.emit('change', this.state);
    return item;
  }

  removeItem(id) { //удалим элемент из массива
    const index = this.state.findIndex(item => item.id == id);

    if(index > -1) { // если индекс = -1, то элемент в массиве не найден
      this.state.splice(index, 1);
      this.emit('change', this.state);
    }
  }
}

export default Model;