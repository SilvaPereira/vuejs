import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'
import { routes } from './routes'
import Vuelidate from 'vuelidate'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuelidate);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.http.options.root = "http://localhost:3000/"

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
