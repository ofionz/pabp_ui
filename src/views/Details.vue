<template>
  <v-container fluid>
    <v-stepper>
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
            <v-dialog v-model="stage.dialogState" width="400">
              <template v-slot:activator="{ on, attrs }">
                <v-stepper-step
                  v-bind="attrs"
                  :complete="
                    stage.elements.filter((el) => el.status === 'APPROVED')
                      .length === stage.elements.length
                  "
                  v-on="on"
                  :step="index + 1"
                >
                  <v-progress-linear
                    v-if="stage.elements.length > 1"
                    :value="
                      (100 / stage.elements.length) *
                      stage.elements.filter((el) => el.status === 'APPROVED')
                        .length
                    "
                  >
                  </v-progress-linear>
                  {{ stage.stage_name }}
                </v-stepper-step>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2 text-break">
                  {{ stage.stage_name }}
                </v-card-title>

                <v-card-text>
                  <div
                    class="pt-5 pb-3"
                    v-for="(row, ind) in stage.elements"
                    :key="ind"
                  >
                    <div class="d-flex align-center flex-column pa-4">
                      <div class="d-flex align-center">
                        <v-avatar size="40">
                          <img
                            :src="
                              row.user_photo
                                ? row.user_photo
                                : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20viewBox%3D%220%200%2089%2089%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ctitle%3Euserpic%3C/title%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20fill%3D%22%23535C69%22%20cx%3D%2244.5%22%20cy%3D%2244.5%22%20r%3D%2244.5%22/%3E%3Cpath%20d%3D%22M68.18%2071.062c0-3.217-3.61-16.826-3.61-16.826%200-1.99-2.6-4.26-7.72-5.585-1.734-.483-3.383-1.233-4.887-2.223-.33-.188-.28-1.925-.28-1.925l-1.648-.25c0-.142-.14-2.225-.14-2.225%201.972-.663%201.77-4.574%201.77-4.574%201.252.695%202.068-2.4%202.068-2.4%201.482-4.3-.738-4.04-.738-4.04.388-2.625.388-5.293%200-7.918-.987-8.708-15.847-6.344-14.085-3.5-4.343-.8-3.352%209.082-3.352%209.082l.942%202.56c-1.85%201.2-.564%202.65-.5%204.32.09%202.466%201.6%201.955%201.6%201.955.093%204.07%202.1%204.6%202.1%204.6.377%202.556.142%202.12.142%202.12l-1.786.217c.024.58-.023%201.162-.14%201.732-2.1.936-2.553%201.485-4.64%202.4-4.032%201.767-8.414%204.065-9.193%207.16-.78%203.093-3.095%2015.32-3.095%2015.32H68.18z%22%20fill%3D%22%23FFF%22/%3E%3C/g%3E%3C/svg%3E'
                            "
                            :alt="row.user_name"
                        /></v-avatar>
                        <v-subheader> {{ row.user_name }}</v-subheader>
                        <v-subheader
                          ><b>
                            Статус: {{ getStatusText(row.status) }}</b
                          ></v-subheader
                        >
                      </div>
                    </div>
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="stage.dialogState = false"
                  >
                    ОК
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-slide-item>
        </v-slide-group>
      </v-stepper-header>
    </v-stepper>

    <div class="d-flex justify-space-between">
      <div :class="$style.column">
        <v-card class="d-flex flex-column pa-3">
          <v-card-title> Параметры</v-card-title>

          <div v-if="data.initiator" class="d-flex align-center">
            <v-subheader style="width: 30%"> Инициатор:</v-subheader>
            <span> {{ data.initiator.user_name }}</span>
          </div>
          <div v-if="data.watcher" class="d-flex align-center">
            <v-subheader style="width: 30%"> Наблюдатели:</v-subheader>
            <span v-for="(watcher, index) in data.watcher" :key="index">
              <span v-if="index !== 0">, </span>{{ watcher.user_name }}</span
            >
          </div>
          <k-p-i
            :isShowHelp="data.buttons.length !== 0"
            @blockSubmit="
              (elem) => {
                submitBlocked = elem.state;
                error = elem.message;
              }
            "
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

          <v-text-field
            class="mt-9"
            persistent-hint
            hint="Вы можете оставить комментарий перед тем как сменить стадию"
            outlined
            v-model="comment"
            label="Комментарий"
          ></v-text-field>

          <div class="d-flex justify-space-around my-3 flex-wrap">
            <span class="mx-2 my-3">
              <v-btn color="secondary" outlined @click="$router.go(-1)">
                Назад
              </v-btn>
            </span>
            <span
              class="mx-2 my-3"
              v-for="(button, index) in data.buttons"
              :key="index"
            >
              <v-btn
                :color="button.style"
                @click="
                  button.type === 'submit'
                    ? submitForm(button.url)
                    : sendRequest(button.url)
                "
              >
                {{ button.name }}
              </v-btn>
            </span>
          </div>
        </v-card>
      </div>
      <div :class="$style.column">
        <v-card class="pa-3">
          <v-card-title> История</v-card-title>
          <v-list three-line>
            <template v-for="(item, index) in data.comments">
              <v-divider :key="index" :inset="true"></v-divider>
              <v-list-item :key="'item' + index">
                <v-list-item-avatar>
                  <v-img
                    :src="
                      item.user_photo
                        ? item.user_photo
                        : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20viewBox%3D%220%200%2089%2089%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ctitle%3Euserpic%3C/title%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20fill%3D%22%23535C69%22%20cx%3D%2244.5%22%20cy%3D%2244.5%22%20r%3D%2244.5%22/%3E%3Cpath%20d%3D%22M68.18%2071.062c0-3.217-3.61-16.826-3.61-16.826%200-1.99-2.6-4.26-7.72-5.585-1.734-.483-3.383-1.233-4.887-2.223-.33-.188-.28-1.925-.28-1.925l-1.648-.25c0-.142-.14-2.225-.14-2.225%201.972-.663%201.77-4.574%201.77-4.574%201.252.695%202.068-2.4%202.068-2.4%201.482-4.3-.738-4.04-.738-4.04.388-2.625.388-5.293%200-7.918-.987-8.708-15.847-6.344-14.085-3.5-4.343-.8-3.352%209.082-3.352%209.082l.942%202.56c-1.85%201.2-.564%202.65-.5%204.32.09%202.466%201.6%201.955%201.6%201.955.093%204.07%202.1%204.6%202.1%204.6.377%202.556.142%202.12.142%202.12l-1.786.217c.024.58-.023%201.162-.14%201.732-2.1.936-2.553%201.485-4.64%202.4-4.032%201.767-8.414%204.065-9.193%207.16-.78%203.093-3.095%2015.32-3.095%2015.32H68.18z%22%20fill%3D%22%23FFF%22/%3E%3C/g%3E%3C/svg%3E'
                    "
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    >{{ item.user_name ? item.user_name : "Системное" }}
                    <span :class="$style.comment_date">{{ item.DATE }}</span>
                    <v-icon
                      v-if="item.status === 'APPROVED'"
                      class="ml-1"
                      color="success"
                      >mdi-check
                    </v-icon>
                    <v-icon
                      v-if="item.status === 'REJECTED'"
                      class="ml-1"
                      color="error"
                      >mdi-close
                    </v-icon>
                    <v-icon
                      v-if="item.status === 'UPDATE'"
                      class="ml-1"
                      color="primary"
                      >mdi-update
                    </v-icon>
                  </v-list-item-title>

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
    dialog: false,
    comment: "",
    submitBlocked: false,
    error: "",
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
    if (!this.data) await this.$router.go(-1);
    else {
      this.data.stages.forEach((stage) =>
        this.$set(stage, "dialogState", false)
      );
      this.$store.commit("processes/setNewProcessData", this.data);
    }

  },

  methods: {
    getStatusText(status) {
      switch (status) {
        case "WATCHED":
          return "Просмотрено";
        case "REJECTED":
          return "Отклонено";
        case "APPROVED":
          return "Ознакомлен";
      }
      return "Неизвестен";
    },
    findByParamTypeName(type) {
      let data;
      if (this.data.activities && this.data.activities.length) {
        data = this.data.activities.find((el) => el.type === type);
      }
      return data;
    },
    async submitForm(url) {
      let modalParams;
      if (this.submitBlocked) {
        modalParams = {
          message: "Ошибка валидации",
          body: this.error,
          cancel: {
            text: "OK",
          },
        };
      } else {
        modalParams = {
          message: "Вы уверены?",
          cancel: {
            text: "Отмена",
          },
          confirm: {
            text: "Да",
            handler: async () => {
              if (await this.$store.dispatch("processes/submitForm", url)) {
                await this.$store.dispatch("processes/fetchProcessesList");
                await this.$router.push({ name: "approving" });
              }
            },
          },
        };
      }

      this.$eventBus.$emit("popup", modalParams);
    },
    async sendRequest(url) {
      if (
        await this.$store.dispatch("processes/freeRequest", {
          url: url,
          comment: this.comment,
        })
      ) {
        await this.$store.dispatch("processes/fetchProcessesList");
        await this.$router.push({ name: "approving" });
      }
    },
    // cancelProcess() {
    //   let modalParams = {
    //     message: "Вы дествительно хотите отменить процесс ?",
    //     cancel: true,
    //     reject: {
    //       text: "Да",
    //       handler: () => this.$router.go(-1),
    //     },
    //   };
    //
    //   this.$eventBus.$emit("popup", modalParams);
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

.comment_date {
  color: grey;
  font-size: 12px;
  margin-left: 10px;
}
</style>
