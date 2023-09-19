import { createRouter, createWebHashHistory } from 'vue-router';
import firebase from 'firebase/compat/app';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layoutName: 'empty' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layoutName: 'empty' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/DetailRecord.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/Record.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layoutName: 'main', auth: true },
    component: () => import('@/views/Planning.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requierAuth = to.matched.some((record) => record.meta.auth);

  if (!currentUser && requierAuth) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
