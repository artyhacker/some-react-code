import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import Todo from './Todo-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './Todo-redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import TodoContainer from './TodoContainer';

const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <TodoContainer />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
