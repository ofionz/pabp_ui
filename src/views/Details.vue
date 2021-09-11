<template>
  <v-container fluid>
    <v-stepper shaped value="2">
      <v-btn
        color="secondary"
        :class="$style.backward_btn"
        @click="$router.push({ name: 'init' })"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="text-center">
        <span><h2>Детали процесса согласования</h2></span>
        <span
          ><h2>{{ data.name }}</h2></span
        >
      </div>

      <v-stepper-header class="justify-center mt-3">
        <v-slide-group multiple show-arrows>
          <v-slide-item :key="index" v-for="(stage, index) in data.stages">
            <v-stepper-step
              :complete="
                stage.elements.filter((el) => el.status === 'final').length ===
                stage.elements.length
              "
              :step="index + 1"
            >
              <v-progress-linear
                v-if="stage.elements.length > 1"
                :value="
                  (100 / stage.elements.length) *
                  stage.elements.filter((el) => el.status === 'final').length
                "
              >
              </v-progress-linear>
              {{ stage.stage_name }}
            </v-stepper-step>
          </v-slide-item>
        </v-slide-group>
      </v-stepper-header>
    </v-stepper>

    <div class="d-flex justify-space-between">
      <div :class="$style.column">
        <v-card class="d-flex flex-column pa-3">
          <v-card-title> Параметры </v-card-title>

          <div v-if="data.initiator" class="d-flex align-center">
            <v-subheader style="width: 25%"> Инициатор:</v-subheader>
            <span> {{ data.initiator.user_name }}</span>
          </div>
          <div v-if="data.watcher" class="d-flex align-center">
            <v-subheader style="width: 25%"> Наблюдатели:</v-subheader>
            <span v-for="(watcher, index) in data.watcher" :key="index">
              <span v-if="index != 0">, </span>{{ watcher.user_name }}</span
            >
          </div>
          <k-p-i
            v-if="findByParamTypeName('familiarization')"
            :params="findByParamTypeName('familiarization')"
            class="mt-3"
          />

          <bookkeeper
            v-if="findByParamTypeName('generatingdocuments')"
            :params="findByParamTypeName('generatingdocuments')"
            class="mt-5"
          >
          </bookkeeper>

          <v-divider></v-divider>
          <div class="mt-6">
            <v-textarea
              clearable
              outlined
              hint="В этом поле вы можете оставить комментарий перед тем как утвердить или отклонить согласование"
              no-resize
              auto-grow
              clear-icon="mdi-close-circle"
              label="Комментарий"
              value=""
            ></v-textarea>
          </div>
          <div class="d-flex justify-space-around ma-4">
            <span>
              <v-btn color="secondary" outlined @click="$router.go(-1)">
                Назад
              </v-btn>
            </span>
            <span v-if="data.role === 'initiator'">
              <v-btn color="error" @click="cancelProcess">
                Отменить согласование
              </v-btn>
            </span>
            <span v-if="data.role === 'approval'">
              <v-btn color="error" @click="sheet = !sheet"> Отклонить </v-btn>
            </span>
            <span v-if="data.role === 'approval'">
              <v-btn color="success" @click="true"> Утвердить </v-btn>
            </span>
          </div>
        </v-card>
      </div>
      <div :class="$style.column">
        <v-card class="pa-3">
          <v-card-title> История </v-card-title>
          <v-list three-line>
            <template v-for="(item, index) in data.comments">
              <v-divider :key="index" :inset="true"></v-divider>
              <v-list-item :key="'item' + index">
                <v-list-item-avatar>
                  <v-img :src="item.user_photo ? item.user_photo : 'https://w7.pngwing.com/pngs/618/581/png-transparent-computer-icons-exclamation-mark-miscellaneous-app-store-smile.png'"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    >{{ item.user_name ?  item.user_name : 'Системное' }}
                    <span :class="$style.comment_date">{{
                      item.DATE
                    }}</span></v-list-item-title
                  >
                  <v-list-item-subtitle
                    v-text="item.message"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </div>
    </div>
  </v-container>
</template>
<script>
import KPI from "../components/KPI";
import Bookkeeper from "../components/Bookkeeper";
export default {
  name: "Main",
  components: {

    KPI,
    Bookkeeper,
  },
  props: {
    id: {
      required: true,
    },
  },

  data: () => ({
    data: {
      stages: [],
      comments: [],
      rows: [],
    },
  }),

  async created() {
    this.data = await this.$store.dispatch(
      "processes/fetchDetailsData",
      this.id
    );

    // this.data = this.$store.state.processes.list.find(
    //   (el) => this.id === el.id
    // );
  },

  methods: {
    findByParamTypeName(type) {
      let data;
      if (this.data.activities && this.data.activities.length) {
        data = this.data.activities.find((el) => el.type === type);
      }
      return data;
    },
    cancelProcess() {
      let modalParams = {
        message: "Вы дествительно хотите отменить процесс ?",
        cancel: true,
        reject: {
          text: "Да",
          handler: () => this.$router.go(-1),
        },
      };

      this.$eventBus.$emit("popup", modalParams);
    },
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
.comment_date {
  color: grey;
  font-size: 12px;
  margin-left: 10px;
}
</style>
