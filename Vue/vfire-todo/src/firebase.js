//firebase.js

import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  
});

const db = app.firestore();
const todosCollection = db.collection('todos');

export { db, todosCollection };
