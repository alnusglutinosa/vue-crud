import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import VueSwal from 'vue-swal';
import Vuelidate from 'vuelidate'
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(VueSwal);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
