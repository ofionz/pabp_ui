/* eslint-disable */
import {
  GET_PROCESSES_ENDPOINT,
  GET_TYPE_PROCESSES_ENDPOINT,
  GET_TYPE_DATA_ENDPOINT,
  GET_DETAILS_ENDPOINT,
} from "../../api/constants";
import Vue from "vue";

export async function fetchProcessesList(context) {
  return Vue.prototype.$axios
    .get(GET_PROCESSES_ENDPOINT)
    .then((response) => {
      if (response.data) {
        context.commit("setProcessesList", response.data);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action fetchProcessesList " + error);
    });
}

export async function fetchTypesOfProcesses(context) {
  return Vue.prototype.$axios
    .get(GET_TYPE_PROCESSES_ENDPOINT)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action fetchProcessesList " + error);
    });
}

export async function fetchFormData(context, payload) {
  return Vue.prototype.$axios
    .get(GET_TYPE_DATA_ENDPOINT, { params: payload })
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action fetchFormData " + error);
    });
}

export async function fetchDetailsData(context, id) {
  return Vue.prototype.$axios
    .get(GET_DETAILS_ENDPOINT, { params: { id: id } })
    .then((response) => {
      if (response.data) {

        // if (id === 1) {
        //   return {
        //     role: "initiator",
        //     stages: [
        //       { name: "Старт процесса", completed: true },
        //       {
        //         name: "Согласование премирования",
        //         progress: "55",
        //         completed: true,
        //       },
        //       { name: "Утверждение бухгалтера" },
        //       {name: "Процесс окончен"}
        //     ],
        //     comments: [
        //       {
        //         date: "12.05.2021 13:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 12:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 10:40",
        //         avatar:
        //           "https://cdn.icon-icons.com/icons2/1993/PNG/512/circle_customer_help_info_information_service_support_icon_123208.png",
        //         title: "Системное",
        //         subtitle: "Процесс запущен!",
        //       },
        //     ],
        //     rows: [
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Initiator",
        //         name: "Initiator",
        //         disabled: true,
        //         type: "int",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "15",
        //             text: "Иванов П.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Watcher",
        //         name: "Watcher",
        //         disabled: true,
        //         type: "array",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "11",
        //             text: "Иванова В.П.",
        //           },
        //           {
        //             id: "10",
        //             text: "Сидоров Н.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class:
        //           "\\Starlabs\\Project\\BizAPP\\Processes\\BonusPayments\\Params\\EvaluatingWork",
        //         name: "EvaluatingWork",
        //         disabled: true,
        //         type: "array",
        //         approvers: [ {
        //           id: "12",
        //           text: "Дмитрий Шашин",
        //         },
        //           {
        //             id: "15",
        //             text: "Алексей Шулятьев",
        //           },
        //           {
        //             id: "11",
        //             text: "Администратор Портала",
        //           }
        //           ],
        //         prepare_data: [
        //           {
        //             kpi: "31",
        //             comment: "Работник месяца!",
        //             user_id: 429,
        //             user_name: "Дмитрий Шашин",
        //             user_photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        //           },
        //           {
        //             kpi: "12",
        //             user_id: 760,
        //             user_name: "Алексей Шулятьев",
        //             user_photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //           },
        //           {
        //             kpi: "21",
        //             user_id: 1,
        //             user_name: "Администратор Портала",
        //             user_photo:
        //               "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //           },
        //         ],
        //       },
        //       {
        //         class:
        //           "Starlabs\\Project\\BizAPP\\Processes\\BonusPayments\\Params\\AccountantApproving",
        //         name: "AccountantApproving",
        //         file: true,
        //         type: "array",
        //         disabled: true,
        //         prepare_data: [
        //           {
        //             id: 521,
        //             text: "Павел Бухгалтер",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: 321,
        //             text: "Лидия Бухгалтер",
        //           },
        //           {
        //             id: 521,
        //             text: "Павел Бухгалтер",
        //           },
        //         ],
        //       },
        //     ],
        //   };
        // }
        // if (id === 2) {
        //   return {
        //     role: "approval",
        //     stages: [
        //       { name: "Старт процесса", completed: true },
        //       {
        //         name: "Согласование премирования",
        //         progress: "55",
        //         completed: true,
        //       },
        //       { name: "Утверждение бухгалтера" },
        //       {name: "Процесс окончен"}
        //     ],
        //     comments: [
        //       {
        //         date: "12.05.2021 13:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 12:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 10:40",
        //         avatar:
        //           "https://cdn.icon-icons.com/icons2/1993/PNG/512/circle_customer_help_info_information_service_support_icon_123208.png",
        //         title: "Системное",
        //         subtitle: "Процесс запущен!",
        //       },
        //     ],
        //     rows: [
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Initiator",
        //         name: "Initiator",
        //         disabled: true,
        //         type: "int",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "15",
        //             text: "Иванов П.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Watcher",
        //         name: "Watcher",
        //         disabled: true,
        //         type: "array",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "11",
        //             text: "Иванова В.П.",
        //           },
        //           {
        //             id: "10",
        //             text: "Сидоров Н.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class:
        //           "\\Starlabs\\Project\\BizAPP\\Processes\\BonusPayments\\Params\\EvaluatingWork",
        //         name: "EvaluatingWork",
        //         disabled: true,
        //         type: "array",
        //         approvers: [ {
        //           id: "12",
        //           text: "Дмитрий Шашин",
        //         },
        //           {
        //             id: "15",
        //             text: "Алексей Шулятьев",
        //           },
        //           {
        //             id: "11",
        //             text: "Администратор Портала",
        //           }
        //         ],
        //         prepare_data: [
        //           {
        //             kpi: "31",
        //             comment: "Работник месяца!",
        //             user_id: 429,
        //             user_name: "Дмитрий Шашин",
        //             user_photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        //           },
        //           {
        //             kpi: "12",
        //             user_id: 760,
        //             user_name: "Алексей Шулятьев",
        //             user_photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //           },
        //           {
        //             kpi: "21",
        //             user_id: 1,
        //             user_name: "Администратор Портала",
        //             user_photo:
        //               "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //           },
        //         ],
        //       },
        //     ],
        //   };
        // }
        // if (id === 3) {
        //   return {
        //     role: "approval",
        //     stages: [
        //       { name: "Старт процесса", completed: true },
        //       {
        //         name: "Согласование премирования",
        //         progress: "100",
        //         completed: true,
        //       },
        //       { name: "Утверждение бухгалтера", completed: true },
        //       {name: "Процесс окончен"}
        //     ],
        //     comments: [
        //       {
        //         date: "12.05.2021 13:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 12:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 10:40",
        //         avatar:
        //           "https://cdn.icon-icons.com/icons2/1993/PNG/512/circle_customer_help_info_information_service_support_icon_123208.png",
        //         title: "Системное",
        //         subtitle: "Процесс запущен!",
        //       },
        //     ],
        //     rows: [
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Initiator",
        //         name: "Initiator",
        //         disabled: true,
        //         type: "int",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "15",
        //             text: "Иванов П.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Watcher",
        //         name: "Watcher",
        //         disabled: true,
        //         type: "array",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "11",
        //             text: "Иванова В.П.",
        //           },
        //           {
        //             id: "10",
        //             text: "Сидоров Н.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class:
        //           "Starlabs\\Project\\BizAPP\\Processes\\BonusPayments\\Params\\AccountantApproving",
        //         name: "AccountantApproving",
        //         file: true,
        //         type: "array",
        //         disabled: true,
        //         prepare_data: [
        //           {
        //             id: 521,
        //             text: "Павел Бухгалтер",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: 321,
        //             text: "Лидия Бухгалтер",
        //           },
        //           {
        //             id: 521,
        //             text: "Павел Бухгалтер",
        //           },
        //         ],
        //       },
        //     ],
        //   };
        // }
        // if (id === 5) {
        //   return {
        //     role: "watcher",
        //     stages: [
        //       { name: "Старт процесса", completed: true },
        //       {
        //         name: "Согласование премирования",
        //         progress: "55",
        //         completed: true,
        //       },
        //       { name: "Утверждение бухгалтера" },
        //       {name: "Процесс окончен"}
        //     ],
        //     comments: [
        //       {
        //         date: "12.05.2021 13:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 12:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 11:45",
        //         avatar:
        //           "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //         title: "Дмитрий Медведев",
        //         subtitle: "Денег нет но вы держитесь.",
        //       },
        //       {
        //         date: "12.05.2021 10:45",
        //         avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //         title: "Алексей Петров",
        //         subtitle: "Не верный показатель KPI ! Где деньги Лебовски ?!",
        //       },
        //       {
        //         date: "12.05.2021 10:40",
        //         avatar:
        //           "https://cdn.icon-icons.com/icons2/1993/PNG/512/circle_customer_help_info_information_service_support_icon_123208.png",
        //         title: "Системное",
        //         subtitle: "Процесс запущен!",
        //       },
        //     ],
        //     rows: [
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Initiator",
        //         name: "Initiator",
        //         disabled: true,
        //         type: "int",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "15",
        //             text: "Иванов П.П.",
        //           },
        //         ],
        //       },
        //
        //
        //       {
        //         class: "\\Starlabs\\Project\\BizAPP\\Params\\Watcher",
        //         name: "Watcher",
        //         disabled: true,
        //         type: "array",
        //         prepare_data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //         ],
        //         data: [
        //           {
        //             id: "12",
        //             text: "Петров П.П.",
        //           },
        //           {
        //             id: "11",
        //             text: "Иванова В.П.",
        //           },
        //           {
        //             id: "10",
        //             text: "Сидоров Н.П.",
        //           },
        //         ],
        //       },
        //       {
        //         class:
        //           "\\Starlabs\\Project\\BizAPP\\Processes\\BonusPayments\\Params\\EvaluatingWork",
        //         name: "EvaluatingWork",
        //         disabled: true,
        //         type: "array",
        //         approvers: [ {
        //           id: "12",
        //           text: "Дмитрий Шашин",
        //         },
        //           {
        //             id: "15",
        //             text: "Алексей Шулятьев",
        //           },
        //           {
        //             id: "11",
        //             text: "Администратор Портала",
        //           }
        //         ],
        //         prepare_data: [
        //           {
        //             kpi: "31",
        //             comment: "Работник месяца!",
        //             user_id: 429,
        //             user_name: "Дмитрий Шашин",
        //             user_photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        //           },
        //           {
        //             kpi: "12",
        //             user_id: 760,
        //             user_name: "Алексей Шулятьев",
        //             user_photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //           },
        //           {
        //             kpi: "21",
        //             user_id: 1,
        //             user_name: "Администратор Портала",
        //             user_photo:
        //               "https://cdn.allfamous.org/people/avatars/dmitry-medvedev-ya8h-allfamous.org.jpg",
        //           },
        //         ],
        //       },
        //
        //     ],
        //   };
        // }
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action fetchDetailsData " + error);
    });
}
