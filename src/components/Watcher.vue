<template>
  <div class="d-flex align-center">
    <v-subheader style="width: 25%"> Наблюдатели:</v-subheader>
    <v-select
      @change="onChange"
      v-model="selected"
      :items="items"
      item-value="user_id"
      item-text="user_name"
      :menu-props="{ maxHeight: '400' }"
      :disabled="disabled"
      label="Выберите наблюдателей"
      multiple
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Watcher",
  props: {
    items: Array,
  },
  created() {
    // this.items = this.params.prepare_data;
    // this.items.forEach((el) => (el.selected = true));
    // this.params.data.forEach((el) => {
    //   if (!this.items.find((inner) => inner.id === el.id)) {
    //     this.items.push(el);
    //   }
    // });
    this.selected = this.items.filter((elem) => elem.selected === true);
  },
  data() {
    return {
      disabled: false,
      selected: [],
    };
  },
  methods: {
    onChange() {
      // let data = this.$store.state.processes.newProcessData;
      // data.watchers = this.selected;
      // this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
