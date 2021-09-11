<template>
  <div class="d-flex align-center">
    <v-subheader style="width: 25%"> Тип:</v-subheader>
    <v-select
      v-model="type"
      :items="types"
      item-value="type"
      :disabled="disabled"
      @change="changeTypeHandler"
      label="Тип процесса"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Watcher",

  props: {
    initValue: Array,
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      type: "",
      types: [],
    };
  },

  async created() {
    if (!this.disabled && !this.initValue) {
      this.types = await this.$store.dispatch(
        "processes/fetchTypesOfProcesses"
      );
    }

    if (this.initValue) {
      this.types = this.initValue;
      this.type = this.initValue[0];
      this.label = "Тип процесса";
    } else this.label = "Выберите тип процесса";
  },
  methods: {
    async changeTypeHandler() {
      this.$emit("changed", this.type);
    },
  },
};
</script>

<style scoped></style>
