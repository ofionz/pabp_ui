<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center"
    fluid
  >
    <div class="text-center my-8">
      <v-btn
        color="secondary"
        class="mt-5 ml-5"
        :class="$style.backward_btn"
        @click="$router.push({ name: 'init' })"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>Параметры бизнес процесса</h2>
    </div>

    <div style="width: 50%" class="d-flex flex-column">
      <type @changed="onTypeChanged"></type>



      <div v-if="typeData.initiator" class="d-flex align-center">
        <v-subheader style="width: 25%"> Инициатор:</v-subheader>
        <span> {{ typeData.initiator.user_name }}</span>
        </div>
<!--      <initiator-->
<!--        @changed="onInitiatorChanged"-->
<!--        v-if="typeData.initiator"-->
<!--        :params="typeData.initiator"-->
<!--      ></initiator>-->


      <watcher
        v-if="typeData.watcher"
        :items="typeData.watcher"
      >
      </watcher>
      <k-p-i
        class="mt-3"
        v-if="findByParamTypeName('familiarization')"
        :params="findByParamTypeName('familiarization')"
      />
      <bookkeeper
        class="mt-5"
        v-if="findByParamTypeName('generatingdocuments')"
        :params="findByParamTypeName('generatingdocuments')"
      >
      </bookkeeper>

      <div class="d-flex align-self-center mt-5">
        <v-btn
          color="secondary"
          outlined
          @click="$router.push({ name: 'init' })"
          class="mr-4"
        >
          Назад
        </v-btn>
        <v-btn color="primary" @click="startHandler"> Запустить </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
import KPI from "../components/KPI";
import Bookkeeper from "../components/Bookkeeper";
import Watcher from "../components/Watcher";
// import Initiator from "../components/Initiator";
import Type from "../components/Type";
export default {
  name: "NewProcess",
  components: {
    KPI,
    Bookkeeper,
    Watcher,
    // Initiator,
    Type,
  },

  async created() {
    this.$store.commit("processes/setNewProcessData", {});
  },
  data() {
    return {
      type: "",
      count: 0,
      typeData: [],
    };
  },
  methods: {
    findByParamTypeName(type) {
      let data;
      if (this.typeData.activities && this.typeData.activities.length) {
        data = this.typeData.activities.find((el) => el.type === type);
      }
      return data;
    },
    startHandler() {
      // this.$router.push({ name: 'new' })
      console.log(this.$store.state.processes.newProcessData);
    },

    async onTypeChanged(typeCode) {
      this.type = typeCode;
      this.$store.commit("processes/setNewProcessData", {});
      this.typeData = await this.$store.dispatch("processes/fetchFormData", {
        processtype: this.type,
      });
    },
    async onInitiatorChanged(initiator) {
      this.$store.commit("processes/setNewProcessData", {});
      this.typeData = await this.$store.dispatch("processes/fetchFormData", {
        processtype: this.type,
        initiator: initiator,
      });
    },
  },
};
</script>
<style lang="scss" module>
.column {
  width: 50%;
  margin: 20px;
}
.backward_btn {
  position: absolute;
  top: 7px;
  left: 20px;
}
</style>
