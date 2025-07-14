import axios from "axios";
import store from "@/store/index.js";
import router from "@/router";
import configURL from "@/config/index.js";
import i18n from "@/locales/index";
import { notification } from "ant-design-vue";

let baseURL = configURL.baseURL;

console.log(baseURL);
const Service = axios.create({
  timeout: 10000 * 3,
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Request-Type": "admin",
  },
});
const debounceTokenCancel = new Map();
Service.interceptors.request.use(
  (config) => {
    store.commit("setLoading", true);
    let accessToken = store.state.userInfo.access_token || null;
    if (accessToken && !config.url.includes("login")) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    config.headers["Request-Type"] = "admin";
    config.headers["All-Permission"] = store.state.isGiveAllPermission ? 1 : 0;

    let currentLang = i18n.global.locale.value || "en";
    switch (currentLang) {
      case "kz":
        currentLang = "kk";
        break;
      case "rus":
        currentLang = "ru";
        break;
      case "zh":
        currentLang = "cn";
        break;
      case "en":
        currentLang = "en";
        break;
    }
    config.headers["lang"] = currentLang;
    const tokenKey = `${config.method}-${config.url}`;
    const cancel = debounceTokenCancel.get(tokenKey);
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
      debounceTokenCancel.set(tokenKey, () => {
        clearTimeout(timer);
        resolve(new Error("Q_msg: Бұл сұраудан бас тартылды / 防抖"));
      });
    });
  },
  async (error) => {
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);
Service.interceptors.response.use(
  async (res) => {
    // store.commit("setLoading", false);
    if (
      res.config.responseType === "blob" &&
      res.request.response.type === "application/json"
    ) {
      return {
        result_code: -1,
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
        result_code: 0,
        fileName,
        blob: data,
      };
    }

    return res.data;
  },
  async (error) => {
    // store.commit("setLoading", false);
    if (!error || !error.response) {
      return false;
    }
    let refreshToken = store.state.userInfo.refreshToken || null;
    console.log("------- error ---------");
    console.log("err code : " + error.response.status);

    if (error.response.status == 401) {
      store.commit("setLoading", true);
      try {
        const res = await axios({
          url: baseURL + "auth/access-token",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            //  Authorization: "Bearer " + accessToken,
            //"Request-Type": "",
          },
          method: "GET",
          data: {
            refreshToken: refreshToken,
          },
        });
        if (res.status == 200 && res.data && res.data.code == 0) {
          let accessToken = res.data.data.accessToken;
          let refreshToken = res.data.data.refreshToken;
          let userInfo = JSON.parse(JSON.stringify(store.state.userInfo));
          userInfo["accessToken"] = accessToken;
          userInfo["refreshToken"] = refreshToken;
          store.commit("setUserInfo", userInfo);
          // store.commit("setLoading", false);
          return Service(error.config);
        } else {
          // store.commit("setLoading", false);
          store.commit("setUserInfo", {});

          router.push({
            name: "LoginView",
          });
        }
      } catch (e) {
        // store.commit("setLoading", false);
        store.commit("setUserInfo", {});
        router.push({
          name: "LoginView",
        });
      }
    }
    if (error.response.result_msg) {
      toastMessage(error.response.result_msg, "error", error.response.data);
    }
    return Promise.reject(error);
  }
);

function toastMessage(msg, type, data) {
  if (!msg) return;
  let message = i18n.global.t("l_Error");

  if (msg !== null) {
    message = msg;
  }

  if (msg && msg.indexOf("l_") == 0 && msg.indexOf("Success") == -1) {
    if (message.indexOf("l_") == 0) {
      let reg = /[A-Z]+/;
      message = msg.replace("l_", "");
      let arr = message.split("");
      arr.forEach((item, index) => {
        if (index > 0 && reg.test(item)) {
          arr[index] = " " + item.toLowerCase();
        }
      });
      message = arr.join("");
    }
    if (typeof data == "string") {
      message = message + " (" + data + ")";
    }
    notification[type || "warning"]({
      message: message, 
    });
  } else if (message) {
    notification[type || "warning"]({
      message: message,
    });
  }
}

export default Service;
