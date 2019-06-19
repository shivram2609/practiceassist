// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vue bootstarp
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

//vue vielidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//vue careusel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false
 
//vue axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//vue vueflashmessage
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
Vue.use(Notifications, { velocity });

import FrontendLayout from "./layouts/frontend-layout.vue";
import BackendLayout from "./layouts/backend-layout.vue";

Vue.component('frontend-layout',FrontendLayout);
Vue.component('backend-layout',BackendLayout);

//axios.defaults.baseURL = process.env.API_BASE_URL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'

})




