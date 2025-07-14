import { defineStore } from "pinia"

export const useUserStore = defineStore("userInfo", {
  state: () => ({
    user: {}, // Store the whole user object
  }),
  actions: {
    signOut() {
      this.user = {};
    },
    setUser(user) {
      this.user = user; // Save the whole object
    },
  },
})