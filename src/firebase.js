import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCEUmUN0vNnzG3Jpz_n25P85YnirvDqos",
  authDomain: "fir-sticky-notes.firebaseapp.com",
  databaseURL: "https://fir-sticky-notes-default-rtdb.firebaseio.com",
  projectId: "fir-sticky-notes",
  storageBucket: "fir-sticky-notes.appspot.com",
  messagingSenderId: "907951786814",
  appId: "1:907951786814:web:fe936b3bf64f5456623a6f",
  measurementId: "G-M3XXKKH8NT"
};
  
const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();