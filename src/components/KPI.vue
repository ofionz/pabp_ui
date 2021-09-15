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
        @change="onChangeHandler"
        label="Сотрудники утверждающие данный этап"
        multiple
      ></v-select>
    </div>

    <div class="pt-5 pb-3" v-for="(row, ind) in params.param.data" :key="ind">
      <div class="d-flex align-center flex-column pa-4">
        <div class="d-flex align-center">
          <v-avatar size="40">
            <img :src="row.user_photo ? row.user_photo : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20viewBox%3D%220%200%2089%2089%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ctitle%3Euserpic%3C/title%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20fill%3D%22%23535C69%22%20cx%3D%2244.5%22%20cy%3D%2244.5%22%20r%3D%2244.5%22/%3E%3Cpath%20d%3D%22M68.18%2071.062c0-3.217-3.61-16.826-3.61-16.826%200-1.99-2.6-4.26-7.72-5.585-1.734-.483-3.383-1.233-4.887-2.223-.33-.188-.28-1.925-.28-1.925l-1.648-.25c0-.142-.14-2.225-.14-2.225%201.972-.663%201.77-4.574%201.77-4.574%201.252.695%202.068-2.4%202.068-2.4%201.482-4.3-.738-4.04-.738-4.04.388-2.625.388-5.293%200-7.918-.987-8.708-15.847-6.344-14.085-3.5-4.343-.8-3.352%209.082-3.352%209.082l.942%202.56c-1.85%201.2-.564%202.65-.5%204.32.09%202.466%201.6%201.955%201.6%201.955.093%204.07%202.1%204.6%202.1%204.6.377%202.556.142%202.12.142%202.12l-1.786.217c.024.58-.023%201.162-.14%201.732-2.1.936-2.553%201.485-4.64%202.4-4.032%201.767-8.414%204.065-9.193%207.16-.78%203.093-3.095%2015.32-3.095%2015.32H68.18z%22%20fill%3D%22%23FFF%22/%3E%3C/g%3E%3C/svg%3E' " :alt="row.user_name"
          /></v-avatar>
          <v-subheader> {{ row.user_name }}</v-subheader>
          <v-subheader
            ><b> KPI: {{ row.summ }}%</b></v-subheader
          >
        </div>
        <v-tabs grow v-model="row.tab">
          <v-tab :key="index" v-for="(checkbox, index) in row.user_data">
            <span> {{ checkbox.num }} </span>
            <v-icon v-if="checkbox.value" class="ml-1" color="success"
              >mdi-check</v-icon
            >
            <v-icon v-else class="ml-1" color="error">mdi-close</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items style="width: 100%" class="mt-3" v-model="row.tab">
          <v-tab-item :key="index" v-for="(checkbox, index) in row.user_data">
            <v-card color="basil" flat>
              <v-checkbox
                @change="onChangeHandler(row, checkbox)"
                v-model="checkbox.value"
                :label="checkbox.description"
              ></v-checkbox>
              <v-text-field
                @change="onChangeHandler(null, checkbox)"
                hint="Вы можете оставить комментарий к каждой из метрик"
                outlined
                v-model="checkbox.comment"
                label="Комментарий"
              ></v-text-field>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <v-divider></v-divider>
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
    if (
      this.params.param.prepare_data &&
      this.params.param.prepare_data.length
    ) {
      this.params.param.prepare_data.forEach((el) => {
        this.$set(el, "tab", 0);
        this.$set(el, "summ", 0);
        el.user_data.forEach((inner) => this.$set(inner, "value", false));
      });
      this.params.param.data = this.params.param.prepare_data;
    }

    this.selectedApprovers = this.params.approving.filter(
      (el) => el.selected === true
    );
    if (this.params.disabled) {
      this.disabled = true;
    }
    this.params.responsible = this.selectedApprovers;
  },
  methods: {
    onChangeHandler(row, checkbox) {
      if (row && checkbox) {
        if (checkbox.value) {
          row.summ += checkbox.weight;
        } else row.summ -= checkbox.weight;
      }
      // else if (checkbox) {
      //   // console.log(checkbox)
      // }
      this.params.responsible = this.selectedApprovers;
      let data = this.$store.state.processes.newProcessData;
      // eslint-disable-next-line no-unused-vars
      let activity = data.activities.find(
        (activ) => activ.type === "familiarization"
      );
      activity = this.params;
      this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style scoped></style>
