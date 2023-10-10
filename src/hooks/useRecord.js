import api from '@/api';
import { useStore } from 'vuex';

export function useRecord() {
  const store = useStore();
  const addNewRecord = async (newRecord) => {
    try {
      const uid = await api.user.getUid();
      await api.record.addNewRecord(uid, newRecord);
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const uid = await api.user.getUid();
      const snapshot = await api.record.getRecords(uid);

      if (snapshot.exists()) {
        const records = snapshot.val();
        const recordsSerialized = Object.keys(records).map((key) => ({ id: key, ...records[key] }));
        return recordsSerialized;
      }
    } catch (error) {
      store.commit('setError', error);
    }
  };

  const fetchRecordById = async (id) => {
    try {
      const uid = await api.user.getUid();
      const snapshot = await api.record.getRecordById(uid, id);
      if (snapshot.exists()) {
        const record = snapshot.val();
        return { id, ...record };
      }
    } catch (error) {
      store.commit('setError', error);
    }
  };

  return {
    addNewRecord,
    fetchRecords,
    fetchRecordById,
  };
}
