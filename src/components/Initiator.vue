<template>
  <div class="d-flex align-center">
    <v-subheader style="width: 25%"> Инициатор:</v-subheader>
    <v-select
      @change="changeHandler"
      v-model="selected"
      :items="params.prepare_data"
      item-value="id"
      :disabled="disabled"
      :menu-props="{ maxHeight: '400' }"
      :label="label"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Initiator",
  props: {
    params: { type: Object, required: true },
  },
  data() {
    return {
      items: [],
      disabled: false,
      selected: "",
      label: "",
    };
  },
  created() {
    this.items = this.params.prepare_data;
    this.items.forEach((el) => (el.selected = true));
    this.params.data.forEach((el) => {
      if (!this.items.find((inner) => inner.id === el.id)) {
        this.items.push(el);
      }
    });

    if (this.params.disabled) this.disabled = true;
    this.selected = this.params.prepare_data.find(
      (elem) => elem.selected === true
    );

    if (this.params.disabled) {
      this.label = "Кто запустил процесс";
    } else this.label = "Выберите от кого запускать процесс";
  },
  methods: {
    async changeHandler() {
      this.$emit("changed", this.selected);
      // this.$emit("changed", this.selected);
      // let data = this.$store.state.processes.newProcessData;
      // data.initiators = this.selected;
      // this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
