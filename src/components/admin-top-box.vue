<template>
  <div
    class="relative flex shadow gap-1 h-10 pr-3 pl-3 justify-between items-center"
  >
    <div class="flex items-center gap-1">
      <div
        class="bg-transparent md:hidden flex items-center"
        @click="isDrawerOpen = true"
      >
        <span class="text-2xl material-symbols-outlined">menu</span>
      </div>
      <div class="flex items-center gap-1 h-full">
        <span class="font-bold">Тикетнея Система </span>
      </div>
    </div>
    <div class="flex items-center gap-4" :class="isDrawerOpen ? 'z-0' : 'z-10'">
      <ChangeLanguageBox class="flex items-center" />
      <div class="relative">
        <span
          class="text-xl material-symbols-outlined cursor-pointer"
          @click="toggleUserDropdown"
          >person</span
        >
        <div
          v-show="isUserDropdownOpen"
          class="absolute right-0 mt-2 w-72 bg-white text-gray-900 rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden"
        >
          <div
            class="flex flex-col items-center p-6 pb-4 bg-gradient-to-b from-blue-50 to-white"
          >
            <div
              class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2"
            >
              <span class="material-symbols-outlined text-4xl text-blue-500"
                >person</span
              >
            </div>
            <div class="font-bold text-lg mb-1">
              {{ userInfo.user.value.username || "User" }}
            </div>
            <div
              class="text-sm text-gray-500 mb-2"
              v-if="userInfo.user.value.email"
            >
              {{ userInfo.user.value.email }}
            </div>
            <div class="flex flex-col gap-1 w-full">
              <template v-for="(value, key) in userInfo.user.value" :key="key">
                <div
                  v-if="
                    key !== 'username' && key !== 'email' && key !== 'avatar'
                  "
                >
                  <span
                    class="text-xs text-gray-400 uppercase tracking-wider"
                    >{{ key }}</span
                  >
                  <span class="text-sm text-gray-700">{{ value }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="px-6 pb-4 pt-2 text-red">
            <span class="material-symbols-outlined">logout</span>
            Sign Out
          </div>
        </div>
      </div>
    </div>

    <div v-show="isDrawerOpen" class="fixed inset-0 flex z-50">
      <div class="z-40 w-2/3 h-full text-white bg-[#091524] overflow-y-auto">
        <MenuBox />
      </div>
      <div
        class="fixed inset-0 bg-black/20"
        @click="isDrawerOpen = false"
      ></div>
    </div>

    <!-- Remove the full-screen user drawer -->
  </div>
</template>

<script>
import ChangeLanguageBox from "./change-language-box.vue";
import MenuBox from "./menu-bar.vue";
import MyConsoleBox from "../components/my-console-box.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/index.js";
import { computed, ref, onMounted, onUnmounted } from "vue";

export default {
  name: "AdminTopBox",
  components: {
    MenuBox,
    ChangeLanguageBox,
    MyConsoleBox,
  },
  setup() {
    const userStore = useUserStore();
    const { username } = storeToRefs(userStore);
    const userInfo = storeToRefs(userStore);
    const hasLogin = computed(() => !!username.value);
    const isDrawerOpen = ref(false);
    // Remove isUserDrawerOpen
    const isUserDropdownOpen = ref(false);
    const toggleUserDropdown = () => {
      isUserDropdownOpen.value = !isUserDropdownOpen.value;
    };
    // Close dropdown when clicking outside
    const dropdownRef = ref(null);
    const handleClickOutside = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isUserDropdownOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
    const onSignOUt = () => {
      userStore.signOut();
      isUserDropdownOpen.value = false;
    };
    return {
      userInfo,
      hasLogin,
      isDrawerOpen,
      isUserDropdownOpen,
      toggleUserDropdown,
      dropdownRef,
      onSignOUt,
    };
  },
};
</script>
