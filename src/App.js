import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {addTaskToFirebase, removeTaskFromFirebase}  from './firebase'
import { connect } from 'react-redux'
import { getTasksThunk, watchTaskAddedEvent, watchTaskRemovedEvent } from './store'


class App extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault()
            addTaskToFirebase(e.target.task.value)}}>
            <input type="text" name="task" />
            <input type="submit" name="add task" />
          </form>
        </div>
        <div>
            <h2> Todo:</h2>
            <ul>
              {this.props.tasks.map(item => <li key={item.id}>{item.task}<button onClick={() => removeTaskFromFirebase(item.id)}>x</button></li>)}
            </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  tasks: state
})

const mapDispatch = dispatch => {
  dispatch(getTasksThunk())
  watchTaskAddedEvent(dispatch)
  watchTaskRemovedEvent(dispatch)
  return {
  }
}
export default connect(mapState, mapDispatch)(App);
