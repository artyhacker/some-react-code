import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Tree, message} from 'antd';
import TypeStore from './TypeStore';
import axios from 'axios';
import * as API from '../api/api';

const TreeNode = Tree.TreeNode;

const Store = new TypeStore();

const TodoTypes = observer(class TodoTypes extends Component {

  componentDidMount() {
    this.fetchTypes();
  }

  fetchTypes = () => {
    axios.get(API.getTodoTypesUrl())
      .then(response => {
        if (response.statusText !== 'OK') {
          throw new Error('获取类别列表失败');
        }
        return response.data;
      })
      .then(data => {
        Store.refreshList(data);
      })
      .catch(e => {
        message.error(e.message);
      });
  };

  getTreeNodes = (list, pId) => {
    console.log(list, pId);
    return list.filter(l => l.id === pId).map(t => {
      if (list.findIndex(i => i.pId === t.id) !== -1) {
        return <TreeNode key={t.id} title={t.name}>{this.getTreeNodes(list, t.id)}</TreeNode>;
      }
      return <TreeNode key={t.id} title={t.name} isLeaf />
    })
  };

  render() {
    return (
      <div>
        <Tree>
          {this.getTreeNodes(Store.list, null)}
        </Tree>
      </div>
    );
  }
});

export default TodoTypes;
