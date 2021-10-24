<template>
  <div class="text-center">
    <v-card class="mt-12">
      <v-btn color="primary" @click="$router.push({ name: 'new' })">
        Запустить процесс
      </v-btn>
      <v-card-title>
        Инициированные процессы
        <v-spacer></v-spacer>
        <v-text-field
          color="primary"
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        locale="RU"
        :item-class="itemRowBackground"
        :disable-pagination="true"
        :hide-default-footer="true"
        :custom-sort="customSort"
        @click:row="clickRowHandler"
      >
        <template v-slot:item.startdate="{ item }">
          <span>{{ item.startdate }}</span>
        </template>
        <template v-slot:item.deadline="{ item }">
          <span>{{ item.deadline }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Init",

  data() {
    return {
      search: "",
      data: [],
    };
  },
  async created() {
    this.data = await this.$store.state.processes.list.filter(
      (elem) => elem.role === "initiator"
    );
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Тип процесса",
          align: "start",
          sortable: true,
          value: "type",
        },
        {
          text: "Дата запуска",
          value: "startdate",
          dataType: "Date",
        },
        { text: "Крайний срок согласования", value: "deadline" },
        { text: "Этап согласования", value: "stage" },
      ];
    },
  },
  methods: {
    itemRowBackground(item) {
      return item.status === "complete" ? "completeRow" : "";
    },
    clickRowHandler(row) {
      this.$router.push({
        name: "details",
        params: { id: row.id },
      });
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index.indexOf("startdate") !== -1) {
          if (isDesc.indexOf(false) !== -1) {
            return this.moment(a.startdate, "DD.MM.YY hh:mm:ss").diff(
              this.moment(b.startdate, "DD.MM.YY hh:mm:ss")
            );
          } else {
            return this.moment(b.startdate, "DD.MM.YY hh:mm:ss").diff(
              this.moment(a.startdate, "DD.MM.YY hh:mm:ss")
            );
          }
        } else if (index.indexOf("deadline") !== -1) {
          if (isDesc.indexOf(false) !== -1) {
            return this.moment(a.deadline, "DD.MM.YY hh:mm:ss").diff(
              this.moment(b.deadline, "DD.MM.YY hh:mm:ss")
            );
          } else {
            return this.moment(b.deadline, "DD.MM.YY hh:mm:ss").diff(
              this.moment(a.deadline, "DD.MM.YY hh:mm:ss")
            );
          }
        } else {
          if (isDesc.indexOf(false) !== -1) {
            return a[index] < b[index] ? -1 : 1;
          } else {
            return b[index] < a[index] ? -1 : 1;
          }
        }
      });
      return items;
    },
  },
};
</script>

<style>
.completeRow {
  opacity: 0.4;
}
</style>