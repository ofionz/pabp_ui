/* eslint-disable */
import {
  GET_PROCESSES_ENDPOINT,
  GET_TYPE_PROCESSES_ENDPOINT,
  GET_TYPE_DATA_ENDPOINT,
  GET_DETAILS_ENDPOINT,
  SEND_FORM_ENDPOINT,
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
      throw new Error("action fetchTypesOfProcesses " + error);
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

export async function sendFormData(context) {
  let payload = JSON.parse(JSON.stringify(context.state.newProcessData));
  payload.initiator = context.state.newProcessData.initiator.user_id;

  return Vue.prototype.$axios
    .post(SEND_FORM_ENDPOINT, payload)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action sendFormData " + error);
    });
}

export async function fetchDetailsData(context, id) {
  return Vue.prototype.$axios
    .get(GET_DETAILS_ENDPOINT, { params: { processid: id } })
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action fetchDetailsData " + error);
    });
}

export async function freeRequest(context, params) {
  return Vue.prototype.$axios
    .post(params.url, {comment: params.comment})
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action freeRequest " + error);
    });
}
export async function submitForm(context, url) {
    let payload = JSON.parse(JSON.stringify(context.state.newProcessData));
    payload.initiator = context.state.newProcessData.initiator.user_id;

  return Vue.prototype.$axios
    .post(url, payload)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("action submitForm " + error);
    });
}
