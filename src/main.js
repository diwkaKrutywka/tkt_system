import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store/index"
import i18n from "./locales/index"


import "./assets/global.css"
import "./assets/style/google-font.css"

import { createPinia } from "pinia"
import AntDv from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
createApp(App).use(i18n).use(router).use(AntDv).use(createPinia()).mount("#app");
