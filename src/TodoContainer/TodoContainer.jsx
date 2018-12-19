import React, {Component} from 'react';
import classes from './styles/TodoContainer.css';
import TodoList from '../Todo-redux';
import TodoTypes from './components/TodoTypes';

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
