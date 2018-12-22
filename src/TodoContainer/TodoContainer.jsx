import React, {Component} from 'react';
import {Layout} from "antd";
import TodoList from './components/TodoList';
import TodoTypes from './components/TodoTypes';
import TypeStore from './stores/TypeStore';
import TodoStore from './stores/TodoStore';

const {Sider, Content} = Layout;

const whiteStyle = {
  background: '#fff',
};

class TodoContainer extends Component {
  render() {
    return(
      <Layout style={{ width: '100vw', height: '100vh', padding: '.5rem' }}>
        <Sider style={whiteStyle}>
          <TodoTypes TypeStore={TypeStore} TodoStore={TodoStore} />
        </Sider>
        <Content style={whiteStyle}>
          <TodoList TypeStore={TypeStore} TodoStore={TodoStore} />
        </Content>
      </Layout>
    );
  }
}

export default TodoContainer;
