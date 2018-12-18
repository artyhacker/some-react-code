import {decorate, observable, action} from 'mobx';

class TypeStore {
  list = [];

  selectedItem = {};

  refreshList = (dataList) => {
    this.list = dataList;
  };

  setItem = item => {
    this.selectedItem = item;
  };

  addType = (item) => {
    this.list.push(item);
  };

  deleteType = (item) => {
    this.list = this.list.filter(l => l.id !== item.id);
  };

  updateType = (item) => {
    this.list = this.list.map(l => {
      if (l.id === item.id) {
        return item;
      }
      return l;
    })
  };

}

decorate(TypeStore, {
  list: observable,
  selectedItem: observable,
  setItem: action,
  refreshList: action,
  addType: action,
  deleteType: action,
  updateType: action,
});

export default new TypeStore();
