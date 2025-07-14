import { defineStore, storeToRefs } from "pinia";
import { useAxiosPOST } from "../config/useAxiosPOST";
import { useAuthStore } from "./authData";
import config from "../config";

export const useAuthActions = defineStore("authActions ", () => {
  const { user } = storeToRefs(useAuthStore());

  const login = async (data) => {
    useAxiosPOST(config.baseURL + "/auth/login", data)
      .then((res) => {
        user.value = res.data.data;
      })
      .catch((e) => {
        console.error(e);
      });
  };
  

  return {
    login,
  };
});
