import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'
import { routes } from './routes'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.http.options.root = "https://jsonplaceholder.typicode.com/"

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
