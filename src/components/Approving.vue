<template>
  <div class="d-flex align-center">
    <v-subheader style="width: 25%"> Утверждающие:</v-subheader>
    <v-select
      @change="onChange"
      v-model="selected"
      :items="items"
      item-value="id"

      :disabled="disabled"
      :label="label"
      multiple
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Approving",
  props: {
    params: Object,
  },
  created() {
    this.items = this.params.prepare_data;
    this.items.forEach((el) => (el.selected = true));
    this.params.data.forEach((el) => {
      if (!this.items.find((inner) => inner.id === el.id)) {
        this.items.push(el);
      }
    });

    this.selected = this.params.prepare_data.filter(
      (elem) => elem.selected === true
    );
    if (this.params.disabled) {
      this.disabled = true;
      this.label = "Утвержадющие лица процесса ";
    } else this.label = "Выберите утверждающих";
  },
  data() {
    return {
      items: [],
      label: "",
      disabled: false,
      selected: [],
    };
  },
  methods: {
    onChange() {
      // let data = this.$store.state.processes.newProcessData;
      // data.approving = this.selected;
      // this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
