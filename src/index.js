import React from 'react';
import ReactDOM from 'react-dom';
import { connectReduxDevtools } from 'mobx-state-tree';
import App from './App';
import { TodoStore } from './models';

const store = TodoStore.create({
  todos: [
    {
      name: 'Task 1',
      completed: false,
      index: 0,
    },
    {
      name: 'Task 2',
      completed: false,
      index: 1,
    }
  ]
})

connectReduxDevtools(require('remotedev'), store);

ReactDOM.render(<App store={ store } />, document.getElementById('root'));