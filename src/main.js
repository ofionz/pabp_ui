import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from "moment";
import { VueMaskDirective } from "v-mask";
Vue.prototype.$eventBus = new Vue();

window.BITRIX_USER_ID = 1;

axios.interceptors.request.use(createSetAuthInterceptor());



Vue.directive("mask", VueMaskDirective);
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

function createSetAuthInterceptor() {
  return function (config) {
    config.headers["Content-Type"] = "text/plain;charset=utf-8";
    config.url = config.url + "&userid=" + window.BITRIX_USER_ID;
    return config;
  };
}
