import React, {Component} from 'react';
import classes from './styles/TodoContainer.css';
import TodoList from './components/TodoList';
import TodoTypes from './components/TodoTypes';
import TypeStore from './stores/TypeStore';
import TodoStore from './stores/TodoStore';

class TodoContainer extends Component {
  render() {
    return(
      <div className={classes.container}>
        <div className={classes.types}>
          <TodoTypes TypeStore={TypeStore} TodoStore={TodoStore} />
        </div>
        <div className={classes.todos}>
          <TodoList TypeStore={TypeStore} TodoStore={TodoStore} />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
