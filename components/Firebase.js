import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBCpJLgiv65YgY88uGYu8vkeOzhu-x_ufY",
    authDomain: "flanker-app.firebaseapp.com",
    databaseURL: "https://flanker-app.firebaseio.com",
    projectId: "flanker-app",
    storageBucket: "flanker-app.appspot.com",
    messagingSenderId: "293095063595",
    appId: "1:293095063595:web:ab70ce97e36d632b48aa6e",
    measurementId: "G-KZSTC17J17"
};

export default class Firebase {
    static auth; 
    static init(){
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
    }
    
}