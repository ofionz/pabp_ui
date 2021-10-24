<template>
  <v-app>
    <v-overlay :value="$globalVars.preloaderState">
      <v-progress-circular
        indeterminate
        color="primary"
    ></v-progress-circular></v-overlay>
    <v-card hover color="primary" class="text-center">
      <h2 style="color: white">Платформа автоматизации бизнес-процессов.</h2>
      <v-tabs dark background-color="primary" show-arrows centered>
        <v-tab to="/init">
          <v-badge
            color="info"
            :value="initProcessesCount"
            :content="initProcessesCount"
          >
            Инициатор</v-badge
          >
        </v-tab>
        <v-tab to="/watch">
          <v-badge
            color="info"
            :value="watchProcessesCount"
            :content="watchProcessesCount"
          >
            Наблюдатель</v-badge
          >
        </v-tab>
        <v-tab to="/approving">
          <v-badge
            color="info"
            :value="approveProcessesCount"
            :content="approveProcessesCount"
          >
            Утверждающий
          </v-badge></v-tab
        >
      </v-tabs>
    </v-card>
    <v-main v-if="isInit">
      <router-view />
    </v-main>

    <v-dialog v-model="isShowPopup" max-width="550px">
      <!--    <v-bottom-sheet-->
      <!--      style="z-index: 999999; position: fixed"-->
      <!--      v-model="isShowPopup"-->
      <!--    >-->
      <v-sheet
        class="text-center d-flex flex-column align-center justify-center pb-6"
      >
        <div class="pt-8 pb-6">
          <b>{{ this.popupSettings.message }}</b>
        </div>
        <div class="pa-4" v-if="this.popupSettings.body" v-html="this.popupSettings.body"></div>

        <div class="pb-6 pt-8">
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
                this.popupSettings.confirm.handler(comment);
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
        </div>
      </v-sheet>
      <!--    </v-bottom-sheet>-->
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "App",

  async beforeCreate() {
    this.isInit = await this.$store.dispatch("processes/fetchProcessesList");
    this.$eventBus.$on("popup", this.showPopup);
    this.$eventBus.$on("error", this.showError);
  },
  computed: {
    initProcessesCount() {
      return this.$store.state.processes.list.filter(
        (elem) => elem.role === "initiator" && elem.status === "running"
      ).length;
    },
    watchProcessesCount() {
      return this.$store.state.processes.list.filter(
        (elem) => elem.role === "watcher" && elem.status === "running"
      ).length;
    },
    approveProcessesCount() {
      return this.$store.state.processes.list.filter(
        (elem) => elem.role === "approving" && elem.status === "running"
      ).length;
    },
  },
  methods: {
    showError(text) {
      this.showPopup({
        message: "Ошибка!",
        body: text,
        cancel: { text: "Закрыть" },
      });
    },
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
    comment: "",
  }),
};
</script>
