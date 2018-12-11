import * as Types from './constants';
import * as API from './api';
import fetch from 'isomorphic-fetch';

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
  fetch(API.getTodoListUrl(), {method: 'GET'})
    .then(response => {
      if (!response.ok) {
        throw new Error('fetch list error');
      }
      return response.json();
    })
    .then(data => {
      dispatch(getTodoList(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const fetchAddTodo = (todo) => dispatch => {
  fetch(API.addTodoUrl(), {
    method: 'POST',
    header: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('fetch add error');
      }
      return response.json();
    })
    .then(data => {
      dispatch(addTodo(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const fetchUpdateTodo = (todo) => dispatch => {
  fetch(API.putTodoUrl(todo.id), {
    method: 'PUT',
    body: JSON.stringify(todo),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('fetch add error');
      }
      return response.json();
    })
    .then(data => {
      dispatch(changeStatus(data));
    })
    .catch(err => {
      console.error(err.message);
    });
};
