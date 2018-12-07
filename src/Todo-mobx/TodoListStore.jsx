import React, {Component} from 'react';
import {computed, decorate, observable} from "mobx";
import {observer} from 'mobx-react';

const TodoList = observer(class TodoList extends Component {
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
});

decorate(TodoList, {
  todos: observable,
  todoCount: computed,
});

export default TodoList;