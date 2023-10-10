import { getDatabase, ref, child, push, update, get } from 'firebase/database';

export const category = {
  async getCategories(uid) {
    const snapshot = await get(child(ref(getDatabase()), `users/${uid}/category`));
    return snapshot;
  },
  async getCategoryById(uid, categoryId) {
    const snapshot = await get(child(ref(getDatabase()), `users/${uid}/category/${categoryId}`));
    return snapshot;
  },
  async addCategory(uid, name, limit) {
    await push(ref(getDatabase(), `users/${uid}/category`), {
      name,
      limit,
    });
  },
  async updateCategory(uid, categoryId, name, limit) {
    await update(ref(getDatabase(), `users/${uid}/category/${categoryId}`), { name, limit });
  },
};
