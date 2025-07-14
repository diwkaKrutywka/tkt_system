<template>
    <div class="flex flex-col mt-3 mb-3 gap-2 text-sm">
        <div v-for="(menu, index) in menuList" :key="index">
            <div
                class="flex items-center gap-1 p-2 cursor-pointer mx-1 rounded overflow-hidden"
                :class="menu.routerPath == menuPath ? 'bg-[#2EC445] text-white' : ''"
                @click="
                    () => {
                        if (menu.children.length > 0) {
                            toggleMenu(menu.routerPath)
                        } else {
                            onClckMenu(menu.routerPath)
                        }
                    }
                ">
                <div class="text-xl material-symbols-outlined">{{ menu.icon }}</div>
                <div class="flex-1 text-ellipsis whitespace-nowrap overflow-hidden">{{ menu.name }}</div>
                <div v-if="menu.children.length > 0" class="material-symbols-outlined cursor-pointer text-xl transition-transform" :class="openPathList.includes(menu.routerPath) ? 'rotate-90' : ''">chevron_right</div>
            </div>
            <div v-if="openPathList.includes(menu.routerPath) && menu.children.length > 0" class="border-l ml-4 border-gray-600">
                <div v-for="(child, childIndex) in menu.children" :key="childIndex" class="p-2 mx-2 flex gap-2 items-center cursor-pointer rounded overflow-hidden" :class="child.routerPath == menuPath ? 'bg-blue-500 text-white' : ''" @click="() => onClckMenu(child.routerPath)">
                    <div class="flex-1 text-ellipsis whitespace-nowrap overflow-hidden">{{ child.name }}</div>
                </div>
            </div>
        </div>
        <div class="absolute right-3 bottom-2 hidden md:flex bg-gray-800 justify-center items-center h-8 w-5 opacity-70 text-white rounded-lg text-xl cursor-pointer" @click="onSetExpand()">
            <span v-if="expandAll" class="material-symbols-outlined"> unfold_less </span>
            <span v-else class="material-symbols-outlined"> unfold_more </span>
        </div>
    </div>
</template>

<script>
import MenuList from "../common/menu-list"
const ExpendMenuIdList = MenuList.map((e) => {
    if (e.children.length > 0) {
        return e.routerPath
    }
})
export default {
    name: "MenuBox",
    data() {
        return {
            expandAll: false,
            openPathList: [],
            menuClass: ["flex items-center gap-2 p-2 cursor-pointer overflow-hidden", " bg-blue-500 text-white"],
            menuList: [],
        }
    },
    computed: {
        menuPath() {
            return this.$route.path
        },
    },
    created() {
        const tempMenuList = []
        MenuList.forEach((item) => {
            if (item.openForUsers?.length > 0) {
                if (item.openForUsers.includes(this.$store.getters.userInfo.jpID)) {
                    tempMenuList.push(item)
                }
            } else {
                tempMenuList.push(item)
            }
        })

      
            this.menuList = tempMenuList
        
    },
    methods: {
        onSetExpand() {
            this.expandAll = !this.expandAll
            if (this.expandAll) {
                this.openPathList = ExpendMenuIdList
            } else {
                this.openPathList = []
            }
        },
        toggleMenu(path) {
            if (this.openPathList.includes(path)) {
                this.openPathList.splice(this.openPathList.indexOf(path), 1)
            } else {
                this.openPathList.push(path)
            }
        },
        onClckMenu(e) {
            this.$router.push(e)
        },
    },
}
</script>
