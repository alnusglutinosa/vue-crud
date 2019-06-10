import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Editing from './views/Editing.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/editing:Pid',
      name: 'editing',
      component: Editing,
    },
  ],
});
