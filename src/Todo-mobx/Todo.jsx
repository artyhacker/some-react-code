import React, {Component} from 'react';
import { Input, Checkbox, Radio } from 'antd';
import {decorate, observable, computed} from 'mobx';
import {observer} from 'mobx-react';

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

class TodoList {
  todos = [];
  get todoCount() {
    return this.todos.filter(t => !t.done).length;
  }
  addTodo(todo) {
    if (todo.text) {
      this.todos.push({...todo, id: Math.random()});
    }
  }
  changeState(todo) {
    this.todos = this.todos.map(t => {
      if (t.id === todo.id) {
        return {...t, done: !t.done};
      }
      return t;
    })
  }
}

decorate(TodoList, {
  todos: observable,
  todoCount: computed,
});

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

    function getTodosView(filterText) {
      let list = [];
      switch (filterText) {
        case 'todo':
          list = todoList.todos.filter(t => !t.done);
          break;
        case 'done':
          list = todoList.todos.filter(t => t.done);
          break;
        default:
          list = todoList.todos;
          break;
      }
      return list.map(t => (
        <div key={t.id}>
          <Checkbox
            checked={t.done}
            onChange={() => todoList.changeState(t)}
            style={{
              textDecorationLine: t.done ? 'line-through' : 'none',
              color: t.done ? '#555555' : '',
            }}
          >
            {t.text}
          </Checkbox>
        </div>
      ));
    }

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
          {getTodosView(this.filterText)}
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
