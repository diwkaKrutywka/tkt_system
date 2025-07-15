import { defineStore } from "pinia";

export const useUserStore = defineStore("userInfo", {
  state: () => ({
    user: {},
    statisticsDashboardData: [],
    informationDashboardData: [],
    dashboardData: {},
  }),
  actions: {
    setDashboardData(data) {
      console.log("Setting dashboard data:", data.dashboardData.cards);
      
      this.statisticsDashboardData = data.dashboardData.cards?.filter(
        (card) => card.category === "statistics"
      );
      this.informationDashboardData = data.dashboardData.cards?.filter(
        (card) => card.category === "information"
      );
    },

    signOut() {
      this.user = {};
    },
    setUser(user) {
      this.user = user; // Save the whole object
    },
  },
});
