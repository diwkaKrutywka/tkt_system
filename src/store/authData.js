import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authData", () => {
  const user = ref(null);
  return { user };
});
