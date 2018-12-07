import * as Types from './constants';

export const addTodo = text => ({
  type: Types.ADD_TODO,
  todo: {
    id: Math.random(),
    text,
    done: false,
  },
});

export const changeStatus = todo => ({
  type: Types.CHANGE_STATUS,
  todo,
});

export const changeFilter = filter => ({
  type: Types.CHANGE_FILTER,
  filter,
});