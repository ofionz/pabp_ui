<template>
  <div class="d-flex align-center">
    <v-subheader style="width: 25%"> Наблюдатели:</v-subheader>
    <v-select
      @change="onChange"
      :items="allItems"
      v-model="selected"
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

    this.allItems = JSON.parse(JSON.stringify(this.items));
    this.selected = this.allItems
      .filter((elem) => elem.selected === true)
      .map((el) => el.user_id);
    let data = this.$store.state.processes.newProcessData;
    data.watcher = this.selected;
    this.$store.commit("processes/setNewProcessData", data);
  },
  data() {
    return {
      allItems: [],
      disabled: false,
      selected: [],
    };
  },
  methods: {
    onChange() {
      let data = this.$store.state.processes.newProcessData;
      data.watcher = this.selected;
      this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
