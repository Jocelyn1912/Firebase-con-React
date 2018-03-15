import firebase from 'firebase'

// Configuración firebase
const config = {
  apiKey: "AIzaSyAdXhuC7vBGVQ6Vdbv4HjgV4Eg7zbksACM",
  authDomain: "comida-d4e7b.firebaseapp.com",
  databaseURL: "https://comida-d4e7b.firebaseio.com",
  projectId: "comida-d4e7b",
  storageBucket: "comida-d4e7b.appspot.com",
  messagingSenderId: "763174502176"
};
firebase.initializeApp(config);

// Exportando módulo de autentificación de Firebase y de proveedor de autentificación google
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;