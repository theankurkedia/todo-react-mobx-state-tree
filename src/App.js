import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import AddComponent from './components/Add';
import TodoList from './components/TodoList';
import Footer from './components/Footer'
class App extends Component {
  render() {
    return (
      <div>
        <AddComponent addTodo={this.props.store.addTodo} />
        <TodoList store={this.props.store} />
        <Footer store={this.props.store}/>
        <DevTools />
      </div>
    );
  }
};

export default App;