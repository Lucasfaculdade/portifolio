import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
let firebaseConfig = {
  apiKey: "AIzaSyB5byNm-XcRvuhTDdk8JJqIw_1Rd0J58OI",
  authDomain: "sistema-3e97c.firebaseapp.com",
  projectId: "sistema-3e97c",
  storageBucket: "sistema-3e97c.appspot.com",
  messagingSenderId: "705987604875",
  appId: "1:705987604875:web:e7c8acd34234facff37f8e",
  measurementId: "G-YXVNRGE7MX"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;