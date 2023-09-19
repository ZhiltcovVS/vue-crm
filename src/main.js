import { createApp } from 'vue';
import dateFormatter from '@/filters/dateFormatter';
import currencyFormatter from '@/filters/currencyFormatter';
import messagePlugin from '@/utils/message.plugin';
import firebase from 'firebase/compat/app';
import Loader from '@/components/app/Loader';
import Paginate from 'vuejs-paginate/src/components/Paginate.vue';
import tooltipDirective from '@/directives/tooltipDirective';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import 'firebase/compat/auth';

const app = createApp(App);

firebase.initializeApp({
  apiKey: 'AIzaSyDOCv1fz8z8iAupHFkePe24jjq8m5Jezg0',
  authDomain: 'vue-firebase-crm-29501.firebaseapp.com',
  projectId: 'vue-firebase-crm-29501',
  storageBucket: 'vue-firebase-crm-29501.appspot.com',
  messagingSenderId: '500377350571',
  appId: '1:500377350571:web:6631a5591dfc61a1b9e2ee',
  measurementId: 'G-98VD745L07',
});

app.config.globalProperties.$filters = {
  dateFormatter, currencyFormatter,
};

app.directive('tooltip', tooltipDirective);

app.component('Loader', Loader);
app.component('Paginate', Paginate);

let isAppMounted = false;

firebase.auth().onAuthStateChanged(() => {
  if (!isAppMounted) {
    app
      .use(messagePlugin)
      .use(store)
      .use(router)
      .mount('#app');
    isAppMounted = true;
  }
});
