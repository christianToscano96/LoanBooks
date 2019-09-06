import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore' ;

//configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyBTqLUTsMR4DEQhmi6wyCZgWngfe8IcF90",
    authDomain: "loanbook-c2489.firebaseapp.com",
    databaseURL: "https://loanbook-c2489.firebaseio.com",
    projectId: "loanbook-c2489",
    storageBucket: "loanbook-c2489.appspot.com",
    messagingSenderId: "442673414299",
    appId: "1:442673414299:web:24bb536847f6cac0"
}
//inicializar firebase
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile : true
}

//crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// REDUCERS
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer
});

//State inicial
const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;


