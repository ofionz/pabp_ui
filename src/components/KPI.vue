<template>
  <v-card raised>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ params.name }}</v-toolbar-title>
    </v-toolbar>
    <div class="d-flex align-center pa-4">
      <v-subheader style="width: 25%"> Утверждающие:</v-subheader>
      <v-select
        :items="params.approving"
        item-value="user_id"
        item-text="user_name"
        v-model="selectedApprovers"
        :disabled="disabled"
        label="Сотрудники утверждающие данный этап"
        multiple
      ></v-select>
    </div>

    <div v-for="(row, ind) in params.param.data" :key="ind">
      <div class="d-flex align-center pa-4">
        <v-avatar size="40">
          <img :src="row.user_photo" :alt="row.user_name"
        /></v-avatar>
        <v-subheader style="width: 30%"> {{ row.user_name }}:</v-subheader>
        <v-text-field
          @change="onChangeHandler"
          hint=""
          :disabled="disabled"
          class="mr-3"
          style="width: 20px"
          v-model="row.user_data.value"
          label="KPI"
        ></v-text-field>
        <v-text-field
          @change="onChangeHandler"
          :disabled="disabled"
          hint=""
          v-model="row.user_data.comment"
          label="Комментарий"
        ></v-text-field>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "KPI",
  props: {
    params: Object,
  },
  data() {
    return {
      disabled: false,
      selectedApprovers: [],
    };
  },
  created() {
    if (this.params.param.prepare_data &&  this.params.param.prepare_data.length) {
      this.params.param.prepare_data.forEach(
        (el) =>
          (el.user_data = {
            value: "",
            comment: "",
          })
      );
      this.params.param.data = this.params.param.prepare_data;
    }

    this.selectedApprovers = this.params.approving.filter(
      (el) => el.selected === true
    );
    if (this.params.disabled) {
      this.disabled = true;
    }
  },
  methods: {
    onChangeHandler() {
      // let data = this.$store.state.processes.newProcessData;
      // data.kpi = this.prepare_data;
      // this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
