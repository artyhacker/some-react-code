const BASE_URL = 'http://192.168.31.211:3001';

export const getTodoListUrl = () => `${BASE_URL}/todos`;

export const addTodoUrl = getTodoListUrl;

export const deleteTodoUrl = (id) => `${BASE_URL}/todos/${id}`;

export const putTodoUrl = deleteTodoUrl;

export const getOneTodoUrl = deleteTodoUrl;
