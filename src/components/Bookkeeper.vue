<template>
  <v-card raised>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ params.name }}</v-toolbar-title>
    </v-toolbar>
    <div class="d-flex align-center pa-4">
      <v-subheader style="width: 25%">Бухгалтер:</v-subheader>
      <v-select
        @change="onChange"
        :disabled="!params.editable"
        v-model="selected"
        :items="params.approving"
        item-value="user_id"
        item-text="user_name"
        value="user_id"
        label="Согласующий бухгалтер"
      ></v-select>
    </div>
    <div v-if="params.param.data && params.param.data.length" class="align-center pa-4">
      <v-subheader style="width: 30%">Прикрепленные файлы:</v-subheader>
      <v-chip
        v-for="(file, index) in params.param.data"
        class="ma-1"
        :key="index"
        close-icon="mdi-trash-can-outline"
      >
        <a target="_blank" :href="file.url"
          ><v-icon class="mr-1"> mdi-download </v-icon>
          {{ file.name }}
        </a>
      </v-chip>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Bookkeeper",
  props: {
    params: Object,
  },
  created() {
    this.selected = this.params.approving.find(
      (elem) => elem.selected === true
    ).user_id;
    this.params.responsible = this.selected;
  },
  data() {
    return {
      items: [],
      label: "",
      newFiles: [],
      selected: "",
    };
  },
  methods: {
    deleteFile(index) {
      if (index > -1) {
        this.files.splice(index, 1);
      }
    },

    uploadFiles() {
      this.files = this.files.concat(this.newFiles);
      this.newFiles = [];
    },

    onChange() {
      this.params.responsible = this.selected;
      let data = this.$store.state.processes.newProcessData;
      // eslint-disable-next-line no-unused-vars
      let activity = data.activities.find(
        (activ) => activ.type === "generatingdocuments"
      );
      activity = this.params;
      this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
