import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
// import 'firebase/storage'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import 'firebase/firestore'

// REDUCERS

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDv4BBHpGvy4gnc5tYe4TdS-CwKhmL8a6o',
  authDomain: 'client-panel-redux-nds.firebaseapp.com',
  databaseURL: 'https://client-panel-redux-nds.firebaseio.com',
  projectId: 'client-panel-redux-nds',
  storageBucket: 'client-panel-redux-nds.appspot.com',
  messagingSenderId: '737345577599',
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)
// Init firestore
// const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase), // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
})

// Create initial state
const initialState = {}

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

export default store
