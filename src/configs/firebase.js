import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDFAIsKcAeYwRaXQ-xGQNBEPYlBGxlNslI",
  authDomain: "virtual-science-lab.firebaseapp.com",
  projectId: "virtual-science-lab",
  storageBucket: "virtual-science-lab.firebasestorage.app",
  messagingSenderId: "520749203736",
  appId: "1:520749203736:web:52d49ab015014bdda6de6d",
  measurementId: "",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
