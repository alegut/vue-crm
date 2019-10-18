import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import tooltipDirective from '@/directives/tooltip.directive'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'




Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyAdP3nefd9EhA1FCHCQczU4Dn4hrg7gn2k",
  authDomain: "vue-crm-cd908.firebaseapp.com",
  databaseURL: "https://vue-crm-cd908.firebaseio.com",
  projectId: "vue-crm-cd908",
  storageBucket: "vue-crm-cd908.appspot.com",
  messagingSenderId: "1086542931616",
  appId: "1:1086542931616:web:a1bd90a783ad68f13b8bc5"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


