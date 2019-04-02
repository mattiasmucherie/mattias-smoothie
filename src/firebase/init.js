import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyDDxiW5IBLsbJ6Ht5WmQYMJDQ5gEPDhdZM",
  authDomain: "mattias-smoothies.firebaseapp.com",
  databaseURL: "https://mattias-smoothies.firebaseio.com",
  projectId: "mattias-smoothies",
  storageBucket: "",
  messagingSenderId: "166793466953"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
