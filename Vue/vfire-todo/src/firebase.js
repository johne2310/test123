//firebase.js

import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB02qX2PjUurCQJMy-0vBk2Hedtn55Wpx0',
  authDomain: 'fir-crud-410e8.firebaseapp.com',
  databaseURL: 'https://fir-crud-410e8.firebaseio.com',
  projectId: 'fir-crud-410e8',
  storageBucket: 'fir-crud-410e8.appspot.com',
  messagingSenderId: '514406660411',
  appId: '1:514406660411:web:e62641e9412c3efb625f1e',
});

const db = app.firestore();
const todosCollection = db.collection('todos');

export { db, todosCollection };
