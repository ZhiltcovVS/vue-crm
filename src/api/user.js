import firebase from 'firebase/compat/app';
import { getDatabase, ref, set, update, onValue } from 'firebase/database';

export const user = {
  async getUid() {
    const { uid } = await firebase.auth().currentUser;
    return uid;
  },
  async setUserInfo(uid, name) {
    await set(ref(getDatabase(), `users/${uid}/info`), {
      bill: 10000,
      name,
    });
  },
  async getUserInfo(uid) {
    return await new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), `users/${uid}/info`);
      onValue(dbRef, (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error);
      });
    });
  },
  async updateInfo(uid, newUserInfo) {
    await update(ref(getDatabase(), `users/${uid}/info`), newUserInfo);
  },
};
