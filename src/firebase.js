import firebase from 'firebase'
import uuid from 'uuid/v4'

const config = {
  authDomain: "redux-firebase-tutorial-2e687.firebaseapp.com",
  databaseURL: "https://redux-firebase-tutorial-2e687.firebaseio.com",
  projectId: "redux-firebase-tutorial-2e687",
  storageBucket: "redux-firebase-tutorial-2e687.appspot.com",
  messagingSenderId: "527123034255"
};
firebase.initializeApp(config);

const database = firebase.database()

export const addTaskToFirebase = (task) => {
  //this will give us a unique id for our tasks
  const id = uuid()
  database.ref(`/${id}`).set({
    task, id
  })
}

export const removeTaskFromFirebase = (id) => {
    database.ref(`/${id}`).remove()
}


export default database

