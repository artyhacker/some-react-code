import React, {Component} from 'react';
import { Input, Radio } from 'antd';
import {decorate, observable} from 'mobx';
import {observer} from 'mobx-react';
import TodoList from './TodoListStore';
import TodoListView from './TodoListView';

const RadioGroup = Radio.Group;

const appStyle = {
  width: 600,
  maxHeight: 800,
  margin: '1rem auto',
};

const listStyle = {
  width: '100%',
  maxHeight: 500,
  overflow: 'auto',
  marginTop: '.5rem',
};

class Todo {
  text = '';
  done = false;
  changeText(v) {
    this.text = v;
  }
}

decorate(Todo, {
  text: observable,
  done: observable,
});

const todoList = new TodoList();
let editTodo = new Todo();

const TodoView = observer(class Todo extends Component {
  filterText = 'all';

  render() {

    function addTodo() {
      todoList.addTodo(editTodo);
      editTodo.text = '';
    }

    return (
      <div style={appStyle}>
        <Input
          placeholder="input & press Enter to add a todo"
          value={editTodo.text}
          onChange={e => editTodo.changeText(e.target.value)}
          onPressEnter={addTodo}
          style={{ width: '98%' }}
        />
        <div style={listStyle}>
          <TodoListView filterText={this.filterText} todoList={todoList} />
        </div>
        <div style={{marginTop: '.5rem'}}>
          <RadioGroup value={this.filterText} onChange={e => this.filterText = e.target.value}>
            <Radio value="all">ALL</Radio>
            <Radio value="todo">TODO</Radio>
            <Radio value="done">DONE</Radio>
          </RadioGroup>
        </div>
        <div>
          Unfinished Count: {todoList.todoCount}
        </div>
      </div>
    );
  }
});

decorate(TodoView, {
  filterText: observable,
});

export default TodoView;
