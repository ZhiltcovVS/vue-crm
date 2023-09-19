import { getDatabase, ref, onValue, update } from 'firebase/database';

export default {
  state: {
    currentUserInfo: {},
    currency: {},
  },
  getters: {
    currentUserInfo: (s) => s.currentUserInfo,
    currency: (s) => s.currency,
  },
  mutations: {
    setInfo(state, info) {
      state.currentUserInfo = info;
    },
    clearUserInfo(state) {
      console.log('clearUserInfo');
      state.currentUserInfo = {};
    },
    setCurrency(state, value) {
      state.currency = value;
    },
  },
  actions: {
    async fetchUserInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getCurrentUid');
        await new Promise((resolve, reject) => {
          const dbRef = ref(getDatabase(), `users/${uid}/info`);
          onValue(dbRef, (snapshot) => {
            const info = snapshot.val();
            commit('setInfo', info);
            resolve();
          }, (error) => {
            reject(error);
          });
        });
      } catch (e) {}
    },
    async updateUserInfo({ dispatch, commit }, newUserInfo) {
      try {
        const uid = await dispatch('getCurrentUid');
        await update(ref(getDatabase(), `users/${uid}/info`), newUserInfo);
      } catch (e) {
        commit('setError');
        throw e;
      }
    },
  },
};
