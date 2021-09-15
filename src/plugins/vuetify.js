import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ru from "../locales/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#21CFF3",
        accent: "#FF4081",
        secondary: "#ffe18d",
        success: "#4CAF50",
        info: "#2196F3",
        warning: "#FB8C00",
        error: "#FF5252",
      },
      light: {
        primary: "#0D47A1",
        accent: "#D81B60",
        secondary: "#414444",
        success: "#4CAF50",
        green: "#4CAF50",
        info: "#2196F3",
        warning: "#FB8C00",
        yellow: "#FB8C00",
        error: "#FA3333",
        red: "#FA3333",
      },
    },
  },
  lang: {
    locales: { ru },
    current: "ru",
  },
});
