// routes.js
import HomePage from '@/pages/HomePage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import CategoriesPage from '@/pages/CategoriesPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import DetailRecordPage from '@/pages/DetailRecordPage.vue';
import RecordPage from '@/pages/RecordPage.vue';
import HistoryPage from '@/pages/HistoryPage.vue';
import PlanningPage from '@/pages/PlanningPage.vue';

export default [
  {
    path: '/',
    name: 'home',
    meta: { layoutName: 'main', auth: true },
    component: HomePage,
  },
  {
    path: '/register',
    name: 'register',
    meta: { layoutName: 'empty' },
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    meta: { layoutName: 'empty' },
    component: LoginPage,
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layoutName: 'main', auth: true },
    component: CategoriesPage,
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layoutName: 'main', auth: true },
    component: ProfilePage,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layoutName: 'main', auth: true },
    component: DetailRecordPage,
  },
  {
    path: '/record',
    name: 'record',
    meta: { layoutName: 'main', auth: true },
    component: RecordPage,
  },
  {
    path: '/history',
    name: 'history',
    meta: { layoutName: 'main', auth: true },
    component: HistoryPage,
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layoutName: 'main', auth: true },
    component: PlanningPage,
  },
];
