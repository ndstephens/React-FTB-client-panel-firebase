import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

//* Instead of "import firebase from 'firebase'"...only import what you need
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
// import 'firebase/storage'

//? import custom REDUCERS

//* Init Firebase App instance
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'client-panel-redux-nds.firebaseapp.com',
  databaseURL: 'https://client-panel-redux-nds.firebaseio.com',
  projectId: 'client-panel-redux-nds',
  // storageBucket: 'client-panel-redux-nds.appspot.com',
  // messagingSenderId: '737345577599',
})

//* Init Firestore
firebase.firestore().settings({ timestampsInSnapshots: true })

//? react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

//* Add reactReduxFirebase and reduxFirestore enhancers when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
)(createStore)

//? Combine all reducers
const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
//? Create initial state
const initialState = {}

//* Create store
const store = createStoreWithFirebase(
  reducers,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

export default store
