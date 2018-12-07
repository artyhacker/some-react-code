import * as Types from './constants';
import {combineReducers} from 'redux';

const list = (state = [], action) => {
  switch (action.type) {
    case Types.ADD_TODO:
      return [action.todo, ...state];
    case Types.CHANGE_STATUS:
      return state.map(t => {
        if (t.id === action.todo.id) {
          return {...t, done: !t.done};
        }
        return t;
      });
    default:
      return state;
  }
};

const filter = (state = 'all', action) => {
  switch (action.type) {
    case Types.CHANGE_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const reducers = combineReducers({
  list,
  filter,
});

export default reducers;