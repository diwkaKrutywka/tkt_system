<template>
    <div class="relative flex shadow gap-1 h-10 pr-3 pl-3 justify-between items-center">
        <div class="flex items-center gap-1">
            <div class="bg-transparent md:hidden flex items-center" @click="isDrawerOpen = true">
                <span class="text-2xl material-symbols-outlined">menu</span>
            </div>
            <div class="flex items-center gap-1 h-full">
                <span class="font-bold">Ticket System</span>
            </div>
        </div>
        <div class="flex items-center gap-4" :class="isDrawerOpen ? 'z-0' : 'z-10'">
            <ChangeLanguageBox class="flex items-center" />
            <MyConsoleBox />
        </div>

        <div v-show="isDrawerOpen" class="fixed inset-0 flex z-50">
            <div class="z-40 w-2/3 h-full text-white bg-[#091524] overflow-y-auto">
                <MenuBox />
            </div>
            <div class="fixed inset-0 bg-black/20" @click="isDrawerOpen = false"></div>
        </div>
    </div>
</template>

<script>
import ChangeLanguageBox from './change-language-box.vue';
import MenuBox from './menu-bar.vue'
import MyConsoleBox from '../components/my-console-box.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/index.js';
import { computed, ref } from 'vue';

export default {
    name: "AdminTopBox",
    components: {
        MenuBox,
        ChangeLanguageBox,
        MyConsoleBox
    },
    setup() {
        const userStore = useUserStore();
        const { username } = storeToRefs(userStore);
        const userInfo = storeToRefs(userStore);
        const hasLogin = computed(() => !!username.value);
        const isDrawerOpen = ref(false);
        const onSignOUt = () => {
            userStore.signOut();
        };
        return {
            userInfo,
            hasLogin,
            isDrawerOpen,
            onSignOUt
        };
    }
}
</script>
