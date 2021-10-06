import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from "moment";
import { VueMaskDirective } from "v-mask";
Vue.prototype.$eventBus = new Vue();

Vue.config.errorHandler = function (err, vm, info) {
  Vue.prototype.$eventBus.$emit("error", err);
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};

axios.interceptors.request.use(
  createSetAuthInterceptor(),
  ErrorRequestHandler()
);

axios.interceptors.response.use(CheckErrors(), ErrorRequestHandler());

Vue.directive("mask", VueMaskDirective);
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
Vue.config.productionTip = false;

var shared = new Vue({ data: { preloaderState: false } });
shared.install = function () {
  Object.defineProperty(Vue.prototype, "$globalVars", {
    get() {
      return shared;
    },
  });
};
Vue.use(shared);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

function createSetAuthInterceptor() {
  return function (config) {
    Vue.prototype.$globalVars.preloaderState = true;
    let user;
    if (window.location.href.indexOf("localhost") >= 0) {
      user = 444;
      config.url = "https://crm.azottech.starlabs.su" + config.url;
      // eslint-disable-next-line no-undef
    } else if (BX.message("USER_ID")) {
      // eslint-disable-next-line no-undef
      user = BX.message("USER_ID");
    } else {
      Vue.prototype.$eventBus.$emit(
        "error",
        "Невозможно определить текущего пользователя"
      );
    }
    config.headers["Content-Type"] = "text/plain;charset=utf-8";
    config.url = config.url + "&userid=" + user;
    return config;
  };
}
function CheckErrors() {
  return function (response) {
    Vue.prototype.$globalVars.preloaderState = false;
    if (!response || !response.data) {
      Vue.prototype.$eventBus.$emit("error", "Данные от сервера не получены!");
    } else if (response.data.error) {
      Vue.prototype.$eventBus.$emit("error", response.data.error);
      return false;
    }
    return response;
  };
}
function ErrorRequestHandler() {
  return function (error) {
    console.log(error);
    Vue.prototype.$eventBus.$emit("error", error);
    return Promise.reject(error);
  };
}
