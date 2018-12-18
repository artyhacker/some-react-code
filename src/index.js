import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './Todo-redux/reducers';
import thunkMiddleware from 'redux-thunk';
import TodoContainer from './TodoContainer';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
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
