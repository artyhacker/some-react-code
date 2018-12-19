import {decorate, observable, action, computed} from 'mobx';
import axios from "axios";
import * as API from "../api/api";
import {message} from "antd";

class TodoStore {
  list = [];

  filter = 'TODO';

  get getUnfinishedCount() {
    return this.list.filter(l => !l.done).length;
  }

  get getShowList() {
    switch (this.filter) {
      case 'TODO':
        return this.list.filter(t => !t.done);
      case 'DONE':
        return this.list.filter(t => t.done);
      default:
        return this.list;
    }
  }

  fetchList = (params) => {
    axios.get(API.getTodoListUrl(params))
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('获取数据列表失败');
        }
        return response.data;
      })
      .then(data => {
        this.list = data;
      })
      .catch(e => {
        message.error('获取数据列表失败');
      });
  };

  fetchAdd = item => {
    axios.post(API.addTodoUrl(), item)
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('新增失败');
        }
        return response.data;
      })
      .then(data => {
        this.list.push(data);
      })
      .catch(e => {
        message.error('新增失败', e.message);
      })
  };

  fetchUpdate = item => {
    axios.put(API.putTodoUrl(item.id), item)
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('更新失败');
        }
        return response.data;
      })
      .then(data => {
        this.list = this.list.map(t => (t.id === data.id ? data : t));
      })
      .catch(e => {
        message.error('更新失败', e.message);
      })
  };

  fetchDelete = item => {
    axios.delete(API.deleteTodoUrl(item.id))
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('删除失败');
        }
        return response.data;
      })
      .then(() => {
        this.list = this.list.filter(l => l.id !== item.id);
      })
      .catch(e => {
        message.error('删除失败: ', e.message);
      })
  };

}

decorate(TodoStore, {
  list: observable,
  filter: observable,
  getUnfinishedCount: computed,
  getShowList: computed,
  fetchList: action,
  fetchAdd: action,
  fetchDelete: action,
  fetchUpdate: action,
});

export default new TodoStore();
