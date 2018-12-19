// const BASE_URL = 'http://192.168.31.211:3001';
const BASE_URL = 'http://localhost:3001';

const toQueryString = (item = {}) => {
  if (Object.keys(item).length === 0) {
    return '';
  }
  let result = '?';
  Object.keys(item).forEach((k, index) => {
    if (index === 0) {
      result += `${k}=${item[k]}`;
    } else {
      result += `&${k}=${item[k]}`;
    }
  });
  return result;
};

/**
 * TodoList
 */
export const getTodoListUrl = (queryParams) => `${BASE_URL}/todos${toQueryString(queryParams)}`;

export const addTodoUrl = getTodoListUrl;

export const deleteTodoUrl = (id) => `${BASE_URL}/todos/${id}`;

export const putTodoUrl = deleteTodoUrl;

export const getOneTodoUrl = deleteTodoUrl;

/**
 * TodoTypes
 */
export const getTodoTypesUrl = () => `${BASE_URL}/types`;

export const addTypeUrl = getTodoTypesUrl;

export const deleteTypeUrl = (id) => `${BASE_URL}/types/${id}`;

export const putTypeUrl = deleteTypeUrl;