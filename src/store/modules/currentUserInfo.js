import api from '@/api';

export default {
  state: {
    currentUserInfo: {},
  },
  getters: {
    currentUserInfo: (s) => s.currentUserInfo,
  },
  mutations: {
    setInfo(state, info) {
      state.currentUserInfo = info;
    },
  },
  actions: {
    async fetchUserInfo({ commit }) {
      try {
        const uid = await api.user.getUid();
        const info = await api.user.getUserInfo(uid);
        commit('setInfo', info);
      } catch (error) {
        commit('setError', error);
      }
    },
    async updateUserInfo({ commit }, newUserInfo) {
      try {
        const uid = await api.user.getUid();
        await api.user.updateInfo(uid, newUserInfo);
        commit('setInfo', newUserInfo);
      } catch (error) {
        commit('setError', error);
      }
    },
  },
};
