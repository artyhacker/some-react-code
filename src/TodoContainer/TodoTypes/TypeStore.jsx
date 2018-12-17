import {decorate, observable} from 'mobx';

class TypeStore {
  list = [];

  getList = () => {
    return this.list;
  };

  refreshList = (dataList) => {
    this.list = dataList;
    console.log('refresh ', dataList);
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
});

export default TypeStore;
