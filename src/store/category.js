import { getDatabase, ref, child, push, update, get } from 'firebase/database';

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getCurrentUid');
        const snapshot = await get(child(ref(getDatabase()), `users/${uid}/category`));

        if (snapshot.exists()) {
          const categories = snapshot.val();
          const categoriesSerialized = Object.keys(categories).map((key) => ({ id: key, ...categories[key] }));
          return categoriesSerialized;
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getCurrentUid');
        const snapshot = await get(child(ref(getDatabase()), `users/${uid}/category/${id}`));

        if (snapshot.exists()) {
          const category = snapshot.val();
          return { id, ...category };
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async addCategory({ dispatch, commit }, { name, limit }) {
      try {
        const uid = await dispatch('getCurrentUid');
        await push(ref(getDatabase(), `users/${uid}/category`), {
          name,
          limit,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ dispatch, commit }, { name, limit, id }) {
      try {
        const uid = await dispatch('getCurrentUid');
        await update(ref(getDatabase(), `users/${uid}/category/${id}`), { name, limit });
      } catch (e) {
        commit('setError');
        throw e;
      }
    },
  },
};
