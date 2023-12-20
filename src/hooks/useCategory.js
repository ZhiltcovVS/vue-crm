import api from '@/api';
import { useStore } from 'vuex';

export function useCategory() {
  const store = useStore();

  const fetchCategories = async () => {
    try {
      const uid = await api.user.getUid();
      const snapshot = await api.category.getCategories(uid);

      if (snapshot.exists()) {
        const categories = snapshot.val();
        const categoriesSerialized = Object.keys(categories).map((key) => ({ id: key, ...categories[key] }));
        return categoriesSerialized;
      }
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const fetchCategoryById = async (id) => {
    try {
      const uid = await api.user.getUid();
      const snapshot = await api.category.getCategoryById(uid, id);

      if (snapshot.exists()) {
        const category = snapshot.val();
        return { id, ...category };
      }
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const addCategory = async ({ name, limit }) => {
    try {
      const uid = await api.user.getUid();
      await api.category.addCategory(uid, name, limit);
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const updateCategory = async ({ name, limit, id }) => {
    try {
      const uid = await api.user.getUid();
      await api.category.updateCategory(uid, id, name, limit);
    } catch (error) {
      store.commit('setError', error);
    }
  };

  return {
    fetchCategories,
    fetchCategoryById,
    addCategory,
    updateCategory,
  };
}
