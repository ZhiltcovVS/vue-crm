import { getDatabase, ref, child, get, push } from 'firebase/database';

export const record = {
  async addNewRecord(uid, newRecord) {
    await push(ref(getDatabase(), `users/${uid}/record`), newRecord);
  },
  async getRecords(uid) {
    const snapshot = await get(child(ref(getDatabase()), `users/${uid}/record`));
    return snapshot;
  },
  async getRecordById(uid, recordId) {
    const snapshot = await get(child(ref(getDatabase()), `users/${uid}/record/${recordId}`));
    return snapshot;
  },
};
