<template>
    
    <div class="flex flex-col justify-center items-center h-full w-full text-lg   px-24   " id="app" >
    
      
        <div  class="flex flex-row justify-center items-between text-lg   px-24 py-10 w-full h-screen " id="app"  >
    

    <div @click="this.$router.push('/leader/requests')" class="hover:cursor-pointer hover:scale-125 flex flex-col justify-center items-center mr-20 mt-10 text-white bg-teal-400 h-2/3 w-1/3 boxShadow" >
          <font-awesome-icon icon="fa-solid fa-clipboard-list" size="10x"/>
          <label class="text-4xl mt-10 hover:cursor-pointer">Request</label>
    </div>


    <div @click="this.$router.push('/temporary-leader/manage')" class="hover:cursor-pointer hover:scale-125 flex flex-col justify-center items-center bg-purple-400 mt-10 h-2/3 w-1/3 text-white boxShadow">
        <font-awesome-icon icon="fa-solid fa-cog" size="10x"/>
          <label class="text-4xl mt-10 hover:cursor-pointer">Manage</label>
  </div>




</div>

    
    </div>
    
    
    
    
    
    </template>
    
    
    <script >

    import axios from 'axios'
    
    
    export default{
        data(){
            return {
               approval:0,
               assigned:0,
               my:0,
               myCloseRequests:[],
               closeRequestsForMe:[],
               info:[],
               reject:[],
               infoMe:[],
               tickets:[]
            }
        },


        created(){
            this.$toast.info("Loading Data....")
            var vm = this;
            var token = this.authStore.getToken
            var user = this.authStore.getUser
            var data = new FormData();
            data.append("token", token);
            data.append("user", JSON.stringify(user));
            axios.post(vm.globalUrl + 'getTickets', data).then((result)=>{
               vm.tickets = result.data
               vm.filteredTickets = vm.tickets
               vm.approval = result.data.filter((ticket)=>ticket.supervisor && ticket.higherApprover && (ticket.supervisor.empName == user.empName || ticket.higherApprover.empName == user.empName) && ticket.currentHandler.empName == user.empName);
               vm.assigned = result.data.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.empName == user.empName && ticket.assigned == true && ticket.currentHandler.empName == user.empName);
               vm.my = result.data.filter((ticket)=>ticket.raisedBy.empName == user.empName)
               vm.closeRequestsForMe = result.data.filter((ticket)=>ticket.closeRequested == true && ticket.raisedBy.empName == user.empName && ticket.currentHandler.empName == user.empName)
               vm.myCloseRequests = result.data.filter((ticket)=>ticket.closeRequested == true && ticket.assignedTo && ticket.assignedTo.empName == user.empName )
               vm.info = result.data.filter((ticket)=>ticket.ask == true && ticket.prevHandler.empName == user.empName && ticket.raisedBy.empName != user.empName)
               vm.reject = result.data.filter((ticket)=>ticket.rejected == true && ticket.assignedTo && ticket.assignedTo.empName == user.empName && ticket.currentHandler.empName == user.empName)
               vm.infoMe = result.data.filter((ticket)=> ticket.ask == true && ticket.raisedBy.empName == user.empName && ticket.currentHandler.empName == user.empName)
               vm.$toast.clear()
               vm.$toast.success("Data Loaded Successfully")
            }).catch((error)=>{
                vm.$toast.clear()
                console.log("this is the error")
                vm.$toast.warning(error)
            })
        }
    
    
    
    }
    
    
    
    
    </script>