import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCku5ougEQOPYHi1zz4vplMIxjNp9FhG34",
  authDomain: "zip-app--222.firebaseapp.com",
  databaseURL: "https://zip-app--222.firebaseio.com",
  projectId: "zip-app--222",
  storageBucket: "zip-app--222.appspot.com",
  messagingSenderId: "1066062223453",
  appId: "1:1066062223453:web:a67fa2964f37dc7e7a15b4",
  measurementId: "G-J0Q86CJK6Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
