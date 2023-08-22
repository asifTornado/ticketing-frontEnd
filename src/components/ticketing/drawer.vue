<template>
    
<div ref="drawer" class="bg-white h-full overflow-y-scroll w-3/12 fixed text-black z-96" style="z-index: 9999; transition:0.5s; width: 0px;">


  

<div class=" px-2 z-96" v-if="this.authStore.getUser">
    <div class="flex flex-row w-full justify-end z-96">
        <font-awesome-icon icon="fa-solid fa-xmark" size="2x" class="hover:cursor-pointer" @click="$emit('cancel')" />
    </div>
   <div v-if="this.authStore.getUser.userType == 'admin'" class="flex flex-col z-96">
    <div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/admin')">Home
    
    </div>
        <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold" @click="adminClick">Request</div>
   
        <div class=" bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/ticketsRequiringMyApproval')">Tickets Requiring My Approval</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/closeRequestsForMe')">Close Requests For Me</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/newTicket')">Raise Ticket</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myTickets')">My Tickets</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequestForMe')">Information Requested From Me</div>

        <div class="text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold"  @click="supportClick">Manage</div>
       
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/unassigned')">Unassigned Tickets</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/assigned')">Assigned Tickets</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/awaitingHigherApproval')">Tickets Awaiting Higher Approval</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequested')">Information Requested By Me</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/teams')">Teams</div>
          
      
   </div>
   <div v-else-if="this.authStore.getUser.userType == 'normal'">
    <div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/user')">Home</div>
  
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/ticketsRequiringMyApproval')">Tickets Requiring My Approval</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/closeRequestsForMe')">Close Requests For Me</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/newTicket')">Raise Ticket</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myTickets')">My Tickets</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequestForMe')">Information Requested From Me</div>
   </div>

   <div v-else-if="this.authStore.getUser.userType == 'support'">

    <div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/support')">Home</div>
        <div class="  text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold" @click="requestClick">Request</div>
     
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/ticketsRequiringMyApproval')">Tickets Requiring My Approval</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/closeRequestsForMe')">Close Requests For Me</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/newTicket')">Raise Ticket</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myTickets')">My Tickets</div>
    <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequestForMe')">Information Requested From Me</div>
        
        <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold"  @click="assistClick">Assist</div>
         
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/assignedToMe')">Tickets Assigned To Me</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/myCloseRequests')">My Close Requests</div>
            <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequested')">Information Requested By Me</div>
          
          
         
    
   </div>


   <div v-else-if="this.authStore.getUser.userType == 'leader'">

<div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/leader')">Home
</div>
    <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold" @click="leaderRequestClick">Request</div>
 
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/ticketsRequiringMyApproval')">Tickets Requiring My Approval</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/closeRequestsForMe')">Close Requests For Me</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/newTicket')">Raise Ticket</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myTickets')">My Tickets</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequestForMe')">Information Requested From Me</div>
   
    <div class="text-lg p-2 border-b font-bold border-solid border-b-black hover:cursor-pointer hover:bg-gray-300"  @click="leaderManageClick">Manage</div>
     
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/unassigned')">Unassigned Tickets</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/assigned')">Assigned Tickets</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/awaitingHigherApproval')">Tickets Awaiting Higher Approval</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequested')">Information Requested By Me</div>
      


</div>


<div v-else-if="this.authStore.getUser.userType == 'tLeader'">

<div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/temporary-leader')">Home</div>
    <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold" @click="tleaderRequestClick">Request</div>

<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/ticketsRequiringMyApproval')">Tickets Requiring My Approval</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/closeRequestsForMe')">Close Requests For Me</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/newTicket')">Raise Ticket</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myTickets')">My Tickets</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequestForMe')">Information Requested From Me</div>
   
    <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold"  @click="tleaderManageClick">Manage</div>
   
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/unassigned')">Unassigned Tickets</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/assigned')">Assigned Tickets</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/awaitingHigherApproval')">Tickets Awaiting Higher Approval</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequested')">Information Requested By Me</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/assignedToMe')">Tickets Assigned To Me</div>
        <div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/myCloseRequests')">My Close Requests</div>
 

</div>


<div v-else-if="this.authStore.getUser.userType == 'power'">

<div class="bg-white text-2xl text-center font-bold text-black p-2 border-2 border-solid border-black  w-full  hover:cursor-pointer hover:bg-blue-500 hover:text-white" @click="this.$router.push('/power')">Home</div>
    <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold" @click="tickets">Tickets</div>

<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/unassigned')">Unassigned Tickets</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300"  @click="this.$router.push('/ticketing/assigned')">Assigned Tickets</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/accepted')">Accepted Tickets</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/awaitingHigherApproval')">Tickets Awaiting Higher Approval</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/informationRequested')">Tickets Waiting For Information</div>
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/rejectedTickets')">Rejected Tickets</div>  
<div class="bg-white  text-black p-2 text-md w-full hover:cursor-pointer hover:bg-gray-300" @click="this.$router.push('/ticketing/')">Closed Tickets</div>  
    <div class=" text-xl p-2 border border-solid border-b-black shadow-xs w-full shadow-black hover:cursor-pointer hover:bg-gray-300 font-bold"  @click="analytics">Analytics</div>


</div>
</div>


</div>


</template>



<script>
export default{
  data(){
    return {
        admin:false,
        support:false,
        request:false,
        assist:false,
        ticketCheck:true,
        leaderManage:true,
        leaderRequest:false,
        tleaderManage:false,
        tleaderRequest:false,
    }
  },



  methods:{
    adminClick(){
        console.log('called admin click')
        if(!this.admin){
            this.admin=true
            this.$router.push('/systemAdmin/requests')
           
        }else{
            this.admin=false
            this.$router.push('/systemAdmin/requests')
        }
    },

    supportClick(){
        console.log("called support click")
        if(!this.support){
            this.support=true
            this.$router.push('/systemAdmin/manage')
           
        }else{
            this.support = false
            this.$router.push('/systemAdmin/manage')
        }
    },

      requestClick(){
        console.log('called admin click')
        if(!this.request){
            this.request=true
            this.$router.push('/support/requests')
           
        }else{
            this.request=false
            this.$router.push('/support/requests')
        }
    },


    assistClick(){
        console.log('called admin click')
        if(!this.assist){
            this.assist=true
            this.$router.push('/support/assists')
           
        }else{
            this.assist=false
            this.$router.push('/support/assists')
        }
    },

    leaderManageClick(){
        console.log('called admin click')
        if(!this.leaderManage){
            this.leaderManage=true
            this.$router.push('/leader/manage')
           
        }else{
            this.leaderManage=false
            this.$router.push('/leader/manage')
        }
    },


    leaderRequestClick(){
        console.log('called admin click')
        if(!this.leaderRequest){
            this.leaderRequest=true
            this.$router.push('/leader/requests')
           
        }else{
            this.leaderRequest=false
            this.$router.push('/leader/requests')
        }
    },


    tleaderManageClick(){
        console.log('called admin click')
        if(!this.tleaderManage){
            this.tleaderManage=true
            this.$router.push('/temporary-leader/manage')
           
        }else{
            this.tleaderManage=false
            this.$router.push('/temporary-leader/manage')
        }
    },


    tleaderRequestClick(){
        console.log('called admin click')
        if(!this.tleaderRequest){
            this.tleaderRequest=true
            this.$router.push('/leader/requests')
           
        }else{
            this.tleaderRequest=false
            this.$router.push('/leader/requests')
        }
    },


    analytics(){
        this.$router.push("/power/analytics")
    },

    tickets(){
        console.log('called admin click')
        if(!this.ticketCheck){
            this.ticketCheck=true
            this.$router.push('/power/tickets')
           
        }else{
            this.ticketCheck=false
            this.$router.push('/power/tickets')
        }
    },

    open(){
        this.$refs.drawer.style.width = "300px"
    },

    close(){
        this.$refs.drawer.style.width = "0px"
    }
  }


}


</script>