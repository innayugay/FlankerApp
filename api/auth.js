import * as firebase from 'firebase';

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}
