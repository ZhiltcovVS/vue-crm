import api from '@/api';
import { useStore } from 'vuex';

export function useAuth() {
  const store = useStore();

  const login = async ({ email, password }) => {
    try {
      await api.auth.signIn(email, password);
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const register = async ({ email, password, name }) => {
    try {
      await api.auth.signUp(email, password);
      const uid = await api.user.getUid();
      await api.user.setUserInfo(uid, name);
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const logout = async () => {
    try {
      await api.auth.signOut();
    } catch (error) {
      store.commit('setError', error);
    }
  };

  return {
    login,
    register,
    logout,
  };
}
