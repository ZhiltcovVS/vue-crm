import { createRouter, createWebHashHistory } from 'vue-router';
import firebase from 'firebase/compat/app';
import routes from '@/router/route';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (!currentUser && requireAuth) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
