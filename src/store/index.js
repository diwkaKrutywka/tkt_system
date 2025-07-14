import { defineStore } from "pinia"

export const useUserStore = defineStore("userInfo", {
  state: () => ({
    username: "",
    password: "",
   
  }),
  actions: {
    signOut() {
      this.username = "";
      this.password = "";
    
    },
  },
})