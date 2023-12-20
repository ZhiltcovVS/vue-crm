import { createStore } from 'vuex';
import currentUserInfo from '@/store/modules/currentUserInfo';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {},
  modules: {
    currentUserInfo,
  },
});
