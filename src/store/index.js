import { defineStore } from "pinia"
export const useUserStore = defineStore("userInfo", {
    state: () => {
        return {
         username:"",
         password:"",
        }
    },
})