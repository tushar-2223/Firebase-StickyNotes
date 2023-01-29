import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: < APIKEY >,
  authDomain: <>,
  databaseURL: <FIREBASEURL>,
  projectId: "fir-sticky-notes",
  storageBucket: <>,
  messagingSenderId: "907951786814",
  appId: "1:907951786814:web:fe936b3bf64f5456623a6f",
  measurementId: "G-M3XXKKH8NT"
};
  
const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
