import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
 
});

const db = app.firestore();
const smoothiesCollection = db.collection('smoothies');

export { db, smoothiesCollection };
