<template>

</template>

<script>
export default {
  name: "Type",

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
