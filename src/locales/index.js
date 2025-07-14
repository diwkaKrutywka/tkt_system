import { createI18n } from "vue-i18n"

import kk from "./language/kk.js"
import ru from "./language/ru.js"
import en from "./language/en.js"

let currentLang = localStorage.getItem("currentLang") || "kk"
let arr = ["kk", "ru", "en"]
if (arr.includes(currentLang) == false) {
    currentLang === "kk"
}
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    global: true,
    locale: currentLang,
    fallbackLocale: currentLang,
    warnHtmlMessage: false,
    messages: {
        kk,
        ru,
        en,
    },
})

export default i18n
