const BASE_URL = 'http://172.20.10.5:3001';

export const getTodoListUrl = () => `${BASE_URL}/todos`;

export const addTodoUrl = getTodoListUrl;

export const deleteTodoUrl = (id) => `${BASE_URL}/todos/${id}`;

export const putTodoUrl = deleteTodoUrl;

export const getOneTodoUrl = deleteTodoUrl;
