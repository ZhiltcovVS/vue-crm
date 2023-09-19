import { getDatabase, ref, child, push, update, get } from 'firebase/database';

export default {
  actions: {
    async addNewRecord({ dispatch, commit }, newRecord) {
      try {
        const uid = await dispatch('getCurrentUid');
        await push(ref(getDatabase(), `users/${uid}/record`), newRecord);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getCurrentUid');
        const snapshot = await get(child(ref(getDatabase()), `users/${uid}/record`));

        if (snapshot.exists()) {
          const records = snapshot.val();
          const recordsSerialized = Object.keys(records).map((key) => ({ id: key, ...records[key] }));
          return recordsSerialized;
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getCurrentUid');
        const snapshot = await get(child(ref(getDatabase()), `users/${uid}/record/${id}`));
        if (snapshot.exists()) {
          const record = snapshot.val();
          return { id, ...record };
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
