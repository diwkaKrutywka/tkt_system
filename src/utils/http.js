import axios from "axios";
// import store from "../store/index.js";
import { notification } from "ant-design-vue";
import config from "../config";

const Service = axios.create({
  timeout: 10000 * 3,
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
   
  },
});

const debounceTokenCancel = new Map();
Service.interceptors.request.use(
  (config) => {
    // store.commit("setLoading", true);
    const reqId = `${config.method}-${config.url}`;
    const cancel = debounceTokenCancel.get(reqId);
    let allowRepeat = config.url.indexOf("download_file_base64") == -1;
    let ignoreDebounceUrls = ["upload_file"];
    let filter = ignoreDebounceUrls.filter((e) => config.url.indexOf(e) >= 0);
    let ignoreDebounce = filter.length > 0;
    if (cancel && allowRepeat && ignoreDebounce == false) {
      cancel();
    }
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(config);
      }, 500);
      debounceTokenCancel.set(reqId, () => {
        clearTimeout(timer);
        resolve(new Error("Q_msg: Бұл сұраудан бас тартылды / 防抖"));
      });
    });
  },
  async (error) => {
    return Promise.reject(error);
  }
);

Service.interceptors.response.use(
  async (res) => {
    if (
      res.config.responseType === "blob" &&
      res.request.response.type === "application/json"
    ) {
      return {
        status: -1,
        blob: res.data,
      };
    }
    if (toString.call(res.data) === "[object Blob]") {
      const { data, headers } = res;
      let fileName;
      if (headers["content-disposition"]) {
        fileName = headers["content-disposition"].replace(
          /\w+;filename=(.*)/,
          "$1"
        );
      } else {
        fileName = data.fileName;
      }
      return {
        status: 0,
        fileName,
        blob: data,
      };
    }

    if (res.data && res.data?.status < 0) {
      toastMessage(res.data?.result_msg, null, res.data?.status);
    }

    return res.data;
  },
  async (error) => {
    if (!error || !error.response) {
      return false;
    }
    if (error.response.result_msg) {
      toastMessage(error.response.result_msg, "error", error.response.data);
    }
    return Promise.reject(error);
  }
);

function toastMessage(msg, type) {
  if (!msg) return;
  let message = "";
  if (msg !== null) {
    message = msg;
  }
  notification[type || "warning"]({
    message: message,
  });
}

export default Service;
