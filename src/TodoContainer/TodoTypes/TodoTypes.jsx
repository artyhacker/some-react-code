import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {message, Row, Col, Button} from 'antd';
import TypeStore from './TypeStore';
import axios from 'axios';
import * as API from '../api/api';
import TypeTree from './TypeTree';

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
        TypeStore.refreshList(data);
      })
      .catch(e => {
        message.error(e.message);
      });
  };

  onSelect = (keys, e) => {
    if (e.selected) {
      const item = this.list.filter(t => t.id === keys[0])[0];
      TypeStore.setItem(item)
    } else {
      TypeStore.setItem({});
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <Button>ADD</Button>
          </Col>
          <Col span={8}>
            <Button>DELETE</Button>
          </Col>
          <Col span={8}>
            <Button>EDIT</Button>
          </Col>
        </Row>
        <TypeTree
          listStore={TypeStore}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
});

export default TodoTypes;
