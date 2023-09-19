import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from 'firebase/database';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getCurrentUid');
        set(ref(getDatabase(), `users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit('clearUserInfo');
      } catch (e) {
        throw e;
      }
    },
    getCurrentUid() {
      const { uid } = firebase.auth().currentUser;
      return uid;
    },
  },
};
