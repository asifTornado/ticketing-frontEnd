import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => {
    return { 
        notifications: [],
        notificationCheck: null
    };
  },
  actions: {
    setNotifications(value) {
      this.$patch((state)=>{
        state.notifications = value
      })
    },

    setNotificationCheck(value){
        this.$patch((state)=>{
          state.notificationCheck = value
        })
    },

  },
  getters: {
    getNotifications(state){
      return state.notifications;
    },
    getNotificationCheck(state) {
      return state.notificationCheck
    },
  },

  persist: true,
});