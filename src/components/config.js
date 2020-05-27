import firebase from 'firebase';

let config = {
   apiKey: "AIzaSyA1nF_Bbfm3zy91F5k2beeZ5L1At-Mux2E",
   authDomain: "avart-app.firebaseapp.com",
   databaseURL: "https://avart-app.firebaseio.com",
   projectId: "avart-app",
   storageBucket: "avart-app.appspot.com",
   messagingSenderId: "127805856366",
   appId: "1:127805856366:web:0b0caca4fd97e98c9f647f"
};
export const app = firebase.initializeApp(config);
export const db = app.database();
