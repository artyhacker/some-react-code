// const BASE_URL = 'http://192.168.31.211:3001';
const BASE_URL = 'http://localhost:3001';

/**
 * TodoList
 */
export const getTodoListUrl = () => `${BASE_URL}/todos`;

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