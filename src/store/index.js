import { createStore } from 'vuex';
import auth from '@/store/auth';
import currentUserInfo from '@/store/currentUserInfo';
import currency from '@/store/currency';
import category from '@/store/category';
import record from '@/store/record';

export default createStore({
  state: {
    error: null,
    loading: true,
  },
  getters: {
    error: (s) => s.error,
    loading: (s) => s.loading,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {},
  modules: {
    auth, currentUserInfo, currency, category, record,
  },
});
