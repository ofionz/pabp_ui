<template>
  <v-app>
    <v-card hover color="primary" class="text-center">
      <h2 style="color: white">Платформа автоматизации бизнес-процессов</h2>
      <v-tabs dark background-color="primary" show-arrows centered>
        <v-tab to="/init"> Инициатор </v-tab>
        <v-tab to="/watch"> Наблюдатель </v-tab>
        <v-tab to="/approving"> Утверждающий </v-tab>
      </v-tabs>
    </v-card>
    <v-main v-if="isInit">
      <router-view />
    </v-main>

    <v-bottom-sheet v-model="isShowPopup">
      <v-sheet class="text-center" height="200px">
        <div class="py-3">{{ this.popupSettings.message }}</div>
        <v-btn
          class="mt-4 mx-3"
          outlined
          color="secondary"
          v-if="popupSettings.cancel"
          @click="isShowPopup = false"
        >
          {{ this.popupSettings.cancel.text }}
        </v-btn>
        <v-btn
          class="mt-4 mx-3"
          color="primary"
          v-if="popupSettings.confirm"
          @click="
            () => {
              this.popupSettings.confirm.handler();
              this.isShowPopup = false;
            }
          "
        >
          {{ popupSettings.confirm.text }}
        </v-btn>
        <v-btn
          class="mt-4 mx-3"
          color="error"
          v-if="popupSettings.reject"
          @click="
            () => {
              this.popupSettings.reject.handler();
              this.isShowPopup = false;
            }
          "
        >
          {{ popupSettings.reject.text }}
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  name: "App",

  async beforeCreate() {
    this.isInit = await this.$store.dispatch("processes/fetchProcessesList");
    this.$eventBus.$on("popup", this.showPopup);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    showPopup(settings) {
      this.popupSettings = settings;
      this.isShowPopup = true;
    },
  },
  data: () => ({
    popupSettings: {},
    isShowPopup: false,
    isInit: false,
  }),
};
</script>
