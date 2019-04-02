import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueFire from "vuefire";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
//import Firebase from "firebase";
import Vuetify from "vuetify";
// import 'vuetify/dist/vuetify.min.css';
// Vue.use(Vuetify);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.config.devtools = true


Vue.use(VueFire);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
  render: h => h(App)
}).$mount("#app");
