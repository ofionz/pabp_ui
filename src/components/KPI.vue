<template>
  <v-card raised>
    <v-toolbar  flat>
      <v-toolbar-title style="width: 100%; white-space: normal" class="mt-4 d-flex justify-space-between">
        <span>{{ params.name }}</span>
        <v-btn class="pa-1" plain right @click="showHelpMessage">
          <v-icon color="primary" size="40">mdi-help-rhombus</v-icon>
        </v-btn>
      </v-toolbar-title>

    </v-toolbar>

    <div class="d-flex align-center pa-3">
      <v-subheader > Утверждающие:</v-subheader>
      <v-select
        :items="params.approving"
        item-value="user_id"
        item-text="user_name"
        v-model="selectedApprovers"
        :disabled="!params.editable"
        @change="onChangeHandler"
        label="Сотрудники утверждающие данный этап"
        multiple
      ></v-select>
    </div>

    <div class="pt-5 pb-3" v-for="(row, ind) in params.param.data" :key="ind">
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
            ><b> ПОЭ: {{ row.summ }}%</b></v-subheader
          >
        </div>
        <v-tabs class="kpi-group_tabs" grow v-model="row.tab">
          <v-tab
            @click="valiadate"
            :key="outindex"
            v-for="(checkbox, outindex) in row.user_data"
            :class="{
              'kpi-group-notValid': !(checkbox.value || checkbox.comment),
            }"
          >
            <span> {{ checkbox.num }} </span>
            <v-icon v-if="checkbox.value" class="ml-1" color="success"
              >mdi-check
            </v-icon>
            <v-icon v-else class="ml-1" color="error">mdi-close</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items style="width: 100%" class="mt-3" v-model="row.tab">
          <v-tab-item :key="index" v-for="(checkbox, index) in row.user_data">
            <v-card color="basil" flat>
              <v-checkbox
                :disabled="!params.editable"
                @change="onChangeHandler(row, checkbox)"
                v-model="checkbox.value"
                :label="checkbox.description"
              ></v-checkbox>
              <v-text-field
                @blur="valiadate()"
                ref="comment"
                :disabled="!params.editable"
                @change="onChangeHandler(null, checkbox)"
                hint="Вы можете оставить комментарий к каждой из метрик"
                outlined
                :rules="[
                  !!(checkbox.value || checkbox.comment) ||
                    'Если метрика не выбрана то комментарий обязателен',
                ]"
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
    isShowHelp: Boolean,
    params: Object,
  },
  data() {
    return {
      selectedApprovers: [],
    };
  },
  created() {
    if (
      this.params.param.prepare_data &&
      this.params.param.prepare_data.length
    ) {
      this.params.param.prepare_data.forEach((el) => {
        el.user_data.forEach((inner) => this.$set(inner, "value", false));
      });
      this.params.param.data = this.params.param.prepare_data;
    }

    this.params.param.data.forEach((el) => {
      this.$set(el, "tab", 0);
      this.$set(
        el,
        "summ",
        el.user_data.reduce(function (sum, current) {
          if (current.value) return sum + current.weight;
          return sum;
        }, 0)
      );
    });

    this.selectedApprovers = this.params.approving.filter(
      (el) => el.selected === true
    );
    this.selectedApprovers = this.selectedApprovers.map((el) => el.user_id);

    this.params.responsible = this.selectedApprovers;
  },

  mounted() {
    this.valiadate();
    if (this.isShowHelp) {
      this.showHelpMessage();
    }
  },
  methods: {
    showHelpMessage() {
      let body = "";
      if (!this.isShowHelp) {
        body =
          "<span style='font-size: 12px'>Уважаемые руководители! Вам необходимо до 15 числа текущего месяца оценить выполнение подчиненными Вам сотрудниками показателей операционной эффективности (ПОЭ).<br>" +
          'Оценка ПОЭ производится последовательно. Если показатель выполнен полностью, зафиксируйте выполнение в чекбоксе знаком "V". Если показатель не выполнен, знак "V"' +
          ' не ставится, а в поле "Комментарии" указывается информация о том, что конкретно не было выполнено.<br>' +
          "У сотрудника, оценку работы которого Вы производите, есть возможность просмотра оценки и Ваших " +
          "комментариев, а также возможность написать свои комментарии к оценке, если по его мнению, оценка произведена без учета каких-либо факторов и/или обстоятельств.<br>" +
          "В случае необходимости Вы можете изменить оценку выполнения ПОЭ, но только до 15 числа текущего месяца.<br>" +
          "15 числа текущего месяца оценка выполнения ПОЭ будет закрыта для редактирования - информация будет передана системой в отдел бухгалтерии для начисления премии. </span> <br><br><br><hr/> <span style='font-size: 12px'> Уважаемый сотрудник! Вам необходимо ознакомиться с оценкой выполнения Вами " +
          "установленных показателей операционной эффективности (ПОЭ). Оценка произведена Вашим" +
          " непосредственным руководителем. Если по Вашему мнению, руководителем при оценке не учтены " +
          "какие-либо факторы и обстоятельства, повлиявшие на выполнение Вами ПОЭ, необходимо указать их в" +
          ' поле "Комментарии" и/или направить документы, иные материалы, подтверждающие выполнение ПОЭ.</span>';
      } else if (this.params.editable) {
        body =
          "<span style='font-size: 12px'>Уважаемые руководители! Вам необходимо до 15 числа текущего месяца оценить выполнение подчиненными Вам сотрудниками показателей операционной эффективности (ПОЭ).<br>" +
          'Оценка ПОЭ производится последовательно. Если показатель выполнен полностью, зафиксируйте выполнение в чекбоксе знаком "V". Если показатель не выполнен, знак "V"' +
          ' не ставится, а в поле "Комментарии" указывается информация о том, что конкретно не было выполнено.<br>' +
          "У сотрудника, оценку работы которого Вы производите, есть возможность просмотра оценки и Ваших " +
          "комментариев, а также возможность написать свои комментарии к оценке, если по его мнению, оценка произведена без учета каких-либо факторов и/или обстоятельств.<br>" +
          "В случае необходимости Вы можете изменить оценку выполнения ПОЭ, но только до 15 числа текущего месяца.<br>" +
          "15 числа текущего месяца оценка выполнения ПОЭ будет закрыта для редактирования - информация будет передана системой в отдел бухгалтерии для начисления премии. </span>";
      } else {
        body =
          "<span style='font-size: 12px'> Уважаемый сотрудник! Вам необходимо ознакомиться с оценкой выполнения Вами " +
          "установленных показателей операционной эффективности (ПОЭ). Оценка произведена Вашим" +
          " непосредственным руководителем. Если по Вашему мнению, руководителем при оценке не учтены " +
          "какие-либо факторы и обстоятельства, повлиявшие на выполнение Вами ПОЭ, необходимо указать их в" +
          ' поле "Комментарии" и/или направить документы, иные материалы, подтверждающие выполнение ПОЭ.</span>';
      }

      let modalParams = {
        message: "Справка",
        body: body,
        cancel: {
          text: "OK",
        },
      };
      this.$eventBus.$emit("popup", modalParams);
    },

    valiadate() {
      this.$refs.comment?.forEach((el) => el.validate(true));
      let valiadationData = this.params.param.data.map((usr) => {
        return {
          name: usr.user_name,
          state:
            usr.user_data.length -
              usr.user_data.filter((inr) => !!(inr.value || inr.comment))
                .length ===
            0,
        };
      });
      if (valiadationData.find((el) => !el.state)) {
        this.$emit("blockSubmit", {
          state: true,
          message:
            "Проверьте присутствие необходимых значений в разделе ПОЭ у сотрудников: " +
            valiadationData
              .map((el) => {
                if (!el.state) return el.name;
              })
              .filter((el) => !!el),
        });
      } else {
        this.$emit("blockSubmit", false);
      }
    },
    onChangeHandler(row, checkbox) {
      if (row && checkbox) {
        if (checkbox.value) {
          row.summ += checkbox.weight;
        } else row.summ -= checkbox.weight;
      }

      this.valiadate();
      this.params.responsible = this.selectedApprovers;
      let data = this.$store.state.processes.newProcessData;
      // eslint-disable-next-line no-unused-vars
      let activity = data.activities?.find(
        (activ) => activ.type === "familiarization"
      );
      activity = this.params;
      this.$store.commit("processes/setNewProcessData", data);
    },
  },
};
</script>

<style>
.help_btn {
  position: absolute;
  right: 10px;
}

.kpi-group-notValid {
  background-color: rgba(255, 0, 0, 0.07);
}

.kpi-group_tabs > div > div {
  border-radius: 3px;
}
</style>
