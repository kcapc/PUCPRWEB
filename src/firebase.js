import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQKJMwcSnWlWGg41b6Uy98YQsDbpkCpKs",
  authDomain: "atividade2-9db35.firebaseapp.com",
  projectId: "atividade2-9db35",
  storageBucket: "atividade2-9db35.appspot.com",
  messagingSenderId: "510031438956",
  appId: "1:510031438956:web:b4f5347a44dda350c3a449",
  measurementId: "G-GPKWV8J5S2"
};

// Inicialize o Firebase apenas uma vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export default firebase;


