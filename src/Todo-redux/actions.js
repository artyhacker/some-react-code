import * as Types from './constants';
import * as API from './api';
import axios from 'axios';

const addTodo = todo => ({
  type: Types.ADD_TODO,
  todo,
});

const changeStatus = todo => ({
  type: Types.CHANGE_STATUS,
  todo,
});

export const changeFilter = filter => ({
  type: Types.CHANGE_FILTER,
  filter,
});

const getTodoList = data => ({
  type: Types.GET_LIST,
  data,
});

export const fetchTodoList = () => dispatch => {
  axios.get(API.getTodoListUrl())
    .then(response => {
      if (!response.statusText === 'OK') {
        throw new Error('fetch list error');
      }
      return response.data;
    })
    .then(data => {
      dispatch(getTodoList(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const fetchAddTodo = (todo) => dispatch => {
  console.log(todo);
  axios.post(API.addTodoUrl(), todo)
    .then(response => {
      if (!response.statusText === 'OK') {
        throw new Error('fetch add error');
      }
      return response.data;
    })
    .then(data => {
      dispatch(addTodo(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const fetchUpdateTodo = (todo) => dispatch => {
  axios.put(API.putTodoUrl(todo.id), todo)
    .then(response => {
      if (!response.statusText === 'OK') {
        throw new Error('fetch add error');
      }
      return response.data;
    })
    .then(data => {
      dispatch(changeStatus(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};
