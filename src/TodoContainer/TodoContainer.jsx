import React, {Component} from 'react';
import classes from './TodoContainer.css';
import TodoList from '../Todo-redux';
import TodoTypes from './TodoTypes';

class TodoContainer extends Component {
  render() {
    return(
      <div className={classes.container}>
        <div className={classes.types}>
          <TodoTypes />
        </div>
        <div className={classes.todos}>
          <TodoList />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
