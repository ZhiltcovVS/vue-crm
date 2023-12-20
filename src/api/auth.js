import firebase from 'firebase/compat/app';

export const auth = {
  async signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async signUp(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  async signOut() {
    await firebase.auth().signOut();
  },
};
