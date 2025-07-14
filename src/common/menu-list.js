import i18n from "../locales"
const $t = i18n.global.t
const MenuList = [
    {
        name: $t("l_Users"),
        icon: "group",
        routerPath: "/user/all",
        expand: false,
        children: [],
    },
    {
        name: $t("l_Users"),
        icon: "group",
        routerPath: "/all",
        expand: false,
        children: [],
    },
    {
        name: $t("l_Users"),
        icon: "group",
        routerPath: "/all",
        expand: false,
        children: [],
    },
]

export default MenuList
