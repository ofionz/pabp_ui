<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center"
    fluid
  >
    <div class="text-center my-8">
      <v-btn
        color="secondary"
        class="mt-5 ml-5"
        :class="$style.backward_btn"
        @click="$router.push({ name: 'init' })"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>Параметры бизнес процесса</h2>
    </div>

    <div style="width: 50%" class="d-flex flex-column">
      <div class="d-flex align-center">
        <v-subheader style="width: 25%"> Тип:</v-subheader>
        <v-select
          v-model="type"
          :items="types"
          item-value="type"
          item-text="name"
          @change="onTypeChanged"
          label="Тип процесса"
        ></v-select>
      </div>

      <div v-if="!Object.entries(typeData).length">
        <div
          v-for="(elem, index) in preFormData"
          :key="index"
          class="d-flex align-center"
        >
          <v-subheader v-if="elem.values.length > 1" style="width: 25%">
            {{ elem.name }}</v-subheader
          >
          <v-select
            v-if="elem.values.length > 1"
            v-model="elem.selected"
            :items="elem.values"
            persistent-hint
            item-value="id"
            item-text="text"
            :disabled="elem.disabled"
            :multiple="elem.multiple"
            @change="elem.multiple ? '' : onPreformChanged()"
            @blur="elem.multiple ? onPreformChanged() : ''"
            :hint="elem.description"
          ></v-select>
        </div>
      </div>

      <div v-if="typeData.initiator" class="d-flex align-center">
        <v-subheader style="width: 25%"> Инициатор:</v-subheader>
        <span> {{ typeData.initiator.user_name }}</span>
      </div>

      <watcher v-if="typeData.watcher" :items="typeData.watcher"> </watcher>

      <k-p-i
         :is-show-help="true"
        @blockSubmit="
          (elem) => {
            submitBlocked = elem.state;
            error = elem.message;
          }
        "
        class="mt-3"
        v-if="findByParamTypeName('familiarization')"
        :params="findByParamTypeName('familiarization')"
      />
      <bookkeeper
        class="mt-5"
        v-if="findByParamTypeName('generatingdocuments')"
        :params="findByParamTypeName('generatingdocuments')"
      >
      </bookkeeper>

      <div class="d-flex align-self-center mt-5">
        <v-btn
          color="secondary"
          outlined
          @click="$router.push({ name: 'init' })"
          class="mr-4"
        >
          Назад
        </v-btn>
        <v-btn
          color="primary"
          @click="startHandler"
          :disabled="!Object.entries(typeData).length"
        >
          Запустить
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
import KPI from "../components/KPI";
import Bookkeeper from "../components/Bookkeeper";
import Watcher from "../components/Watcher";
export default {
  name: "NewProcess",
  components: {
    KPI,
    Bookkeeper,
    Watcher,
  },

  async created() {
    this.$store.commit("processes/setNewProcessData", {});
    this.types = await this.$store.dispatch("processes/fetchTypesOfProcesses");
  },
  data() {
    return {
      submitBlocked: false,
      error: "",
      types: [],
      type: "",
      typeData: {},
      preFormData: [],
    };
  },
  methods: {
    findByParamTypeName(type) {
      let data;
      if (this.typeData.activities && this.typeData.activities.length) {
        data = this.typeData.activities.find((el) => el.type === type);
      }
      return data;
    },
    async startHandler() {
      if (this.submitBlocked) {
        this.$eventBus.$emit("popup", {
          message: "Ошибка валидации",
          body: this.error,
          cancel: {
            text: "OK",
          },
        });
      } else {
        if (await this.$store.dispatch("processes/sendFormData")) {
          this.$eventBus.$emit("popup", {
            message: "Процесс запущен",
            cancel: {
              text: "ОК",
            },
          });
          await this.$store.dispatch("processes/fetchProcessesList");
          await this.$router.push({ name: "init" });
        }
      }
    },

    async onTypeChanged(typeCode) {
      this.$store.commit("processes/setNewProcessData", {});
      this.type = typeCode;
      this.preFormData = await this.$store.dispatch(
        "processes/fetchPreFormData",
        {
          processtype: this.type,
        }
      );
      this.preFormData.forEach((elem) => {
        if (elem.values.length === 1) {
          elem.disabled = true;
          elem.selected = elem.values[0].id;
        }
      });

      if (
        this.preFormData.filter((el) => el.values.length <= 1).length ===
        this.preFormData.length
      ) {
        await this.onPreformChanged();
      }
    },

    async onPreformChanged() {
      if (
        this.preFormData.filter((elem) => {
          if (Array.isArray(elem.selected)) {
            return elem.selected.length > 0;
          } else {
            return !!elem.selected;
          }
        }).length === this.preFormData.length
      ) {
        this.typeData = await this.$store.dispatch("processes/fetchFormData", {
          processtype: this.type,
          preformdata: this.preFormData.map((el) => {
            let res = {};
            res[el.code] = el.selected;
            return res;
          }),
        });
        this.$store.commit("processes/setNewProcessData", this.typeData);
      }
    },

    // async onInitiatorChanged(initiator) {
    //   this.$store.commit("processes/setNewProcessData", {});
    //   this.typeData = await this.$store.dispatch("processes/fetchFormData", {
    //     processtype: this.type,
    //     initiator: initiator,
    //   });
    // },
  },
};
</script>
<style lang="scss" module>
.column {
  width: 50%;
  margin: 20px;
}
.backward_btn {
  position: absolute;
  top: 7px;
  left: 20px;
}
</style>
