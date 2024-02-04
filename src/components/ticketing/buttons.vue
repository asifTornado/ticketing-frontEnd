<template>
    

    <div class="flex flex-row flex-wrap  justify-end items-end  w-full pb-10">  
        
        


        
     <div class="flex flex-row justify-end items-end flex-wrap" v-if="ticket.currentHandler && user && ticket.currentHandler.mailAddress == user.mailAddress || user.userType == 'admin'">

  
        <template v-if="(lastAction.type == 0 || lastAction.type == 3 || lastAction.type == 1  ) && ticket.currentHandler.mailAddress == ticket.ticketingHead.mailAddress">
             
       
            <button  class="bg-green-500 w-auto text-white font-bold mr-2   shadow-sm shadow-black   mt-2 p-2 rounded-sm "  @click="$emit('call', 'Ticket Assigned')">Assign</button> 
            <button  class="bg-blue-500 w-auto text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
           
            <button  class="bg-red-500  w-auto text-white    shadow-sm shadow-black  font-bold mr-2  mt-2 p-2 rounded-sm" @click="$emit('call', 'reject')">Reject</button>
            <button  class="bg-fuchsia-500 w-auto text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval</button>

          
          

        </template>

          
      

        <template v-else-if="lastAction.type == 2 ">
           
           <button  class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Higher Authority Approved')">Approve</button> 
          
           <button  class="bg-red-500  text-white  border border-solid b  font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'reject')">Reject</button>
           
       </template>

   

       <template v-else-if="lastAction.type == 0 && ticket.supervisor && ticket.currentHandler.mailAddress == ticket.supervisor.mailAddress" >
           
           <button  class="bg-green-500  text-white font-bold mr-2  mt-2 p-2 border border-solid    rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Supervisor Approved')">Approve</button> 
           <button  class="bg-red-500  text-white  border border-solid b  font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'reject')">Reject</button>
       

       </template>


    




       <template v-else-if="lastAction.type == 3 && ticket.accepted == false ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class=" bg-blue-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Information')">Acquire Information</button>
       
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
        <button  class=" bg-red-500  text-white    shadow-sm shadow-black  font-bold mr-2  mt-2 p-2 rounded-sm" @click="$emit('call', 'reject')">Reject</button>

    </template>

    <template v-else-if="lastAction.type == 5 ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class=" bg-blue-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Information')">Acquire Information</button>
       
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
        <button  class=" bg-red-500  text-white    shadow-sm shadow-black  font-bold mr-2  mt-2 p-2 rounded-sm" @click="$emit('call', 'reject')">Reject</button>

    </template>

    <template v-else-if="lastAction.type == 3 && ticket.accepted == true ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
           <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
          
    </template>

    <template v-else-if="lastAction.type == 12">
           
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
           <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
          
   
       </template>

       <template v-else-if="(lastAction.type == 4 || lastAction.type == 12  || lastAction.type == 7) && ticket.accepted == true ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button> 
           <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
         
       </template>

       <template v-else-if="(lastAction.type == 7) && ticket.accepted == false && ticket.currentHandler.mailAddress == ticket.ticketingHead.mailAddress ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class="bg-green-500 text-white font-bold mr-2  drop-shadow-2xl shadow-sm shadow-black   mt-2 p-2 rounded-sm" @click="$emit('call', 'Ticket Assigned')">Assign</button> 
            <button  class="bg-blue-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
            <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
            <button  class="bg-red-500  text-white    shadow-sm shadow-black  font-bold mr-2  mt-2 p-2 rounded-sm" @click="$emit('call', 'reject')">Reject</button>

       </template>

       <template v-else-if="(lastAction.type == 7) && ticket.accepted == false && ticket.assignedTo && ticket.currentHandler.mailAddress == ticket.assignedTo.mailAddress ">
        <button  class=" bg-emerald-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Approval')">Acquire Approval </button>
        <button  class=" bg-blue-500 text-white font-bold mr-2 shadow-sm shadow-black  mt-2 p-2 rounded-sm" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
       
        <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Close Ticket</button>
        <button  class=" bg-red-500  text-white    shadow-sm shadow-black  font-bold mr-2  mt-2 p-2 rounded-sm" @click="$emit('call', 'reject')">Reject</button>
          </template>


          <template v-else-if="(lastAction.type == 7) && ticket.accepted == false && ticket.higherApprover && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress ">
           
            <button  class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Higher Authority Approved')">Approve</button> 
           <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
           <button  class="bg-red-500  text-white  border border-solid b  font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'reject')">Reject</button>
             </template>


             <template v-else-if="(lastAction.type == 7) && ticket.assignedTo && ticket.ticketingHead && ticket.currentHandler.mailAddress != ticket.assignedTo.mailAddress && ticket.currentHandler.mailAddress != ticket.ticketingHead.mailAddress">
           
           <button  class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Higher Authority Approved')">Approve</button> 
          <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
          <button  class="bg-red-500  text-white  border border-solid b  font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'reject')">Reject</button>
            </template>
        
            
            <template v-else-if="(lastAction.type == 7) && ticket.assignedTo == null && ticket.ticketingHead &&  ticket.currentHandler.mailAddress != ticket.ticketingHead.mailAddress">
           
           <button  class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Higher Authority Approved')">Approve</button> 
          <button  class="bg-blue-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Asking For Information')">Ask For Info</button>
          <button  class="bg-red-500  text-white  border border-solid b  font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'reject')">Reject</button>
            </template>

       
       <template v-else-if="lastAction.type == 10">
       
           <button  class="bg-green-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Accepted')">Accept</button> 
           <button  class="bg-red-500 text-white font-bold mr-2 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Close Request Rejected')">Reject</button>

       </template>


       <template v-else-if=" lastAction.type == 6">
           
           <button  class="bg-green-500 text-white font-bold mr-40 mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('call', 'Giving Information')">Give Info</button> 
 

       </template>

     </div>

     <div v-else-if="ticket.assignedTo == null">
    
          
     </div>



     <button class="  bg-amber-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm shadow-sm shadow-black" @click="$emit('showDetails')">Show Details</button>
    </div>



</template>


<script>
   import {useAuthStore} from "../../stores/authentication"

   import {mapStores} from "pinia"


export default{
    data(instance){
        return {
            user:null
        }
    },



   created(){
      this.user = this.authStore.user
   },

    computed:{
        ...mapStores(useAuthStore),
        lastAction(){
            return this.ticket.actions[this.ticket.actions.length - 1]
        }
    },

    props:[ 'ticket']
}



</script>