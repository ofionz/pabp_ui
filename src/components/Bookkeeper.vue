<template>
  <v-card raised>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ params.name }}</v-toolbar-title>
    </v-toolbar>
    <div class="d-flex align-center pa-4">
      <v-subheader style="width: 25%">Бухгалтер:</v-subheader>
      <v-select
        @change="onChange"
        :disabled="disabled"
        v-model="selected"
        :items="params.approving"
        item-value="user_id"
        item-text="user_name"
        label="Согласующий бухгалтер"
      ></v-select>
    </div>
    <!--    <div class="d-flex align-center pa-4">-->
    <!--      <v-subheader style="width: 25%">Прикрепить файл:</v-subheader>-->
    <!--      <v-file-input-->
    <!--          @change="onChange"-->
    <!--          v-model="newFiles"-->
    <!--          label="Добавьте в это поле файлы и нажмите отправить"-->
    <!--          multiple-->
    <!--      >-->
    <!--      </v-file-input>-->
    <!--      <v-btn-->
    <!--          @click="uploadFiles"-->
    <!--          v-if="newFiles.length"-->
    <!--          class="ml-4"-->
    <!--          color="primary"-->
    <!--      >-->
    <!--        <v-icon class="mr-1"> mdi-upload </v-icon>-->
    <!--      </v-btn>-->
    <!--    </div>-->
    <div v-if="params.file" class="align-center pa-4">
      <v-subheader style="width: 30%">Прикрепленные файлы:</v-subheader>
      <v-chip
        v-for="(file, index) in files"
        class="ma-1"
        :key="index"
        close-icon="mdi-trash-can-outline"
      >
        <v-icon @click="downloadFile(file)" class="mr-1"> mdi-download </v-icon>
        {{ file.name }}
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
    // this.items = this.params.prepare_data;
    // this.items.forEach((el) => (el.selected = true));
    //
    // this.params.data.forEach((el) => {
    //   if (!this.items.find((inner) => inner.id === el.id)) {
    //     this.items.push(el);
    //   }
    // });



    this.selected = this.params.approving.find(
      (elem) => elem.selected === true
    );
    if (this.params.disabled) {
      this.disabled = true;
    }
  },
  data() {
    return {
      items: [],
      label: "",
      newFiles: [],
      files: [{ name: "Документ 1" }],
      disabled: false,
      selected: "",
    };
  },
  methods: {
    deleteFile(index) {
      if (index > -1) {
        this.files.splice(index, 1);
      }
    },
    downloadFile(blob) {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(blob);
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = data;
      link.download = name;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    },
    uploadFiles() {
      this.files = this.files.concat(this.newFiles);
      this.newFiles = [];
    },

    onChange() {
      // let data = this.$store.state.processes.newProcessData;
      // data.accountant = this.selected;
      // this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
