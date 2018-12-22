import {decorate, observable, action} from 'mobx';
import axios from "axios";
import * as API from "../api/api";
import {message} from "antd";

class TypeStore {
  list = [];

  selectedItem = {};

  editItem = {};

  expandedKeys = [];

  fetchTypes = () => {
    axios.get(API.getTodoTypesUrl())
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('获取类别列表失败');
        }
        return response.data;
      })
      .then(data => {
        this.list = data;
        this.expandedKeys = data.filter(t => t.layer < 3).map(p => `${p.id}`);
      })
      .catch(e => {
        message.error('获取类别列表失败');
      });
  };

  fetchAddType = item => {
    axios.post(API.addTypeUrl(), item)
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

  fetchUpdateType = item => {
    axios.put(API.putTypeUrl(item.id), item)
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('更新失败');
        }
        return response.data;
      })
      .then(data => {
        this.list = this.list.map(t => (t.id === data.id ? data : t));
        this.selectedItem = data;
      })
      .catch(e => {
        message.error('更新失败', e.message);
      })
  };

  fetchDeleteType = item => {
    axios.delete(API.deleteTypeUrl(item.id))
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('删除失败');
        }
        return response.data;
      })
      .then(() => {
        this.list = this.list.filter(l => l.id !== item.id);
        this.selectedItem = {};
      })
      .catch(e => {
        message.error('删除失败: ', e.message);
      })
  };

}

decorate(TypeStore, {
  list: observable,
  expandedKeys: observable,
  selectedItem: observable,
  editItem: observable,
  fetchTypes: action,
  fetchAddType: action,
  fetchDeleteType: action,
  fetchUpdateType: action,
});

export default new TypeStore();
