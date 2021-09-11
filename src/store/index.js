import Vue from "vue";
import Vuex from "vuex";

import processes from "./processes";


Vue.use(Vuex);

// eslint-disable-next-line no-unused-vars
export default new Vuex.Store({
  modules: {
    processes,
  },
});
