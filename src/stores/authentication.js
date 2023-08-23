import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { 
        user: null,
        token: null,
        refreshToken: null, 
    };
  },
  actions: {
    setUser(value) {
      this.$patch((state)=>{
        state.user=value
      })
    },

    setToken(value){
        this.$patch((state)=>{
          state.token = value
        })
    },

    setRefreshToken(value){
        this.$patch((state)=>{
          state.refreshToken = value
        })
    }
  },
  getters: {
    getUser(state){
      return state.user;
    },
    getToken(state) {
      return state.token
    },
    getRefreshToken(state){
        return state.refreshToken
    }
  },

  persist: true,
});