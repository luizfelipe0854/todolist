import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA4Nwdc4488npQnWSWZsWiSMZzW7HAomUg",
    authDomain: "todolist-17425.firebaseapp.com",
    projectId: "todolist-17425",
    storageBucket: "todolist-17425.appspot.com",
    messagingSenderId: "453368734348",
    appId: "1:453368734348:web:4e77ad1ce7e1af850f91a9",
    measurementId: "G-NHW24J2MST"
  };

  const FirebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(FirebaseApp);
  const auth = getAuth(FirebaseApp);


  export { db, auth };

