import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return { 
        users: null,
        departments: null,
        groups: null,
        requests:null,
        workflows:null,
        bounceUrl:null,
        admins:null,
        filterCheck:false,
        notificationsCheck:false,
        notifications:[],
        filteredTickets:[],
        initialTickets:[],
        tickets:[],
        showUser:null,
        sidePanelCheck:true,
        travelRequest:null 
    };
  },
  actions: {
    setUsers(value) {
      this.$patch((state)=>{
        state.users=value
      })
    },


    setTravelRequest(value) {
      this.$patch((state)=>{
        state.travelRequest=value
      })
    },

    setShowUser(value){
      this.$patch((state)=>{
        state.showUser = value
      })
    },

    setInitialTickets(value){
      this.$patch((state)=>{
        state.initialTickets = value
      })
    },

    setFilteredTickets(value){
      this.$patch((state)=>{
        state.filteredTickets=value
      })
    },

    setTickets(value){
      this.$patch((state)=>{
        state.tickets = value
      })
    },

    setNotifications(value){
      this.$patch((state)=>{
        state.notifications = value
      })
    },

    toggleSidePanel(value){
      this.$patch((state)=>{
        if(state.sidePanelCheck == false){
          state.sidePanelCheck = true
        }else{
          state.sidePanelCheck = false
        }
      })
    },


    setBounceUrl(value){
      this.$patch((state)=>{
        state.bounceUrl = value
      })
    },

    toggleFilter(value){
      if(this.filterCheck == false){
        this.$patch((state)=>{
          state.filterCheck = true
        })
      }else{
        this.$patch((state)=>{
          state.filterCheck = false
        })
      }
    },

    toggleNotification(value){
      if(this.notificationsCheck == false){
        this.$patch((state)=>{
          state.notificationsCheck = true
        })
      }else{
        this.$patch((state)=>{
          state.notificationsCheck = false
        })
      }
    },

    setDepartments(value){
        this.$patch((state)=>{
          state.departments = value
        })
    },

    setGroups(value){
        this.$patch((state)=>{
          state.groups = value
        })
    },

    
    setRequests(value){
        this.$patch((state)=>{
          state.requests = value
        })
    },

    setWorkflows(value){
        this.$patch((state)=>{
            state.workflows = value
        })
    },

    setNotificationsCheck(value){
      this.$patch((state)=>{
        state.notificationsCheck = value
      })
    },

    
    setAdmins(value){
      this.$patch((state)=>{
          state.admins = value
      })
  },

  },
  getters: {
    getShowUser(state){
      return state.showUser
    },


    getTravelRequest(state){
      return state.travelRequest
    },

    getUsers(state){
      return state.users;
    },
    getGroups(state) {
      return state.groups;
    },
    getDepartments(state){
        return state.departments
    },
    
    getWorkflows(state){
        return state.workflows
    },

    getRequests(state){
      return state.requests
    },

    getBounceUrl(state){
      return state.bounceUrl
    },


    getAdmins(state){
      return state.admins
    },

    getFilterCheck(state){
      return state.filterCheck
    },

    getFilteredTickets(state){
      return state.filteredTickets
    },

    getInitialTickets(state){
      return state.initialTickets
    },

    getTickets(state){
      return state.tickets
    },

    getNotifications(state){
      return state.notifications
    },

    getNotificationsCheck(state){
      return state.notificationsCheck
    },

    getSidePanelCheck(state){
      return state.sidePanelCheck
    }
  },

  persist: true,
});