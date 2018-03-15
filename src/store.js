import { createStore, applyMiddleware } from 'redux'
import database from './firebase'
import thunkMiddleware from 'redux-thunk'
//Usually we would have separate reducer files and combine them in a store index file. This application will be a simple one, so we will just put everything in one file for simplicity sake.

/**
 * ACTION TYPES
 */
const ADD_TASK = 'add task'
const REMOVE_TASK = 'remove task'
const GET_TASKS = 'get tasks'

/**
 * ACTION CREATORS
 */
export const addTask = (task) => ({type: ADD_TASK, task})
export const removeTask = (task) => ({type: REMOVE_TASK, task})
export const getTasks = (tasks) => ({type: GET_TASKS, tasks})

/**
 * THUNKS
 */
export function getTasksThunk() {
  return dispatch => {
    const tasks = [];
    database.ref(`/`).once('value', snap => {
          snap.forEach(data => {
            let task = data.val();
            tasks.push(task)
          })
      })
    .then(() => dispatch(getTasks(tasks)))
  }
}

export function watchTaskAddedEvent(dispatch) {
  database.ref(`/`).on('child_added', (snap) => {
    dispatch(addTask(snap.val()));
  });
}

export function watchTaskRemovedEvent(dispatch) {
  database.ref(`/`).on('child_removed', (snap) => {
    dispatch(removeTask(snap.val()));
  });
}


/**
 * REDUCER
 */
function Reducer (state = [], action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks
    case ADD_TASK:
      return [...state, action.task]
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}


export default createStore(Reducer, applyMiddleware(thunkMiddleware))
