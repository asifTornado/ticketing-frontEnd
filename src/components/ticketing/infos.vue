<template>
    

<div class="w-full h-[500px]  overflow-y-scroll ">

  
    <div v-for="(info, infoCounter) in reversedInfos" :key="infoCounter" >
       
       <div  class=" m-3 shadow-md shadow-black  bg-white flex flex-col" v-if="info.problem != null && info.problem != 'undefined' && info.problem != 'Not Available'"> 
       <div class="p-3"> {{info.date  }}</div>
       <hr class="border border-solid border-black"/>


           
        <div  class=" flex flex-col">
       <div class="w-full p-3 bg-red-100 text-black"> <span class="font-bold ">Problem: </span>{{info.problem}}</div>
       <div class="w-full p-3 bg-green-100 text-black"> <span class="font-bold ">Solution:</span> {{info.solution}}</div>


        </div>
    
    </div>

        </div>



</div>


</template>




<script>
import axios from 'axios';
import {useAuthStore} from "../../stores/authentication"
import {mapStores} from "pinia"
import { useGlobalStore } from '../../stores/globalStore';

export default{

    data(instance){
        return {
            ticket:instance.ticket,
            tickets:[]
        }
    },




props:["ticket"],


created(){
   var vm = this;
   var user = this.authStore.user;
   var data = new FormData();
   var id = this.ticket._id
   data.append("user", JSON.stringify(user))
   data.append("id", id)   
   axios.post(this.globalStore.globalUrl + "getTicketsRaisedByUser", data).then((result)=>{
    vm.tickets = result.data.filter((ticket)=> ticket._id != id && ticket.status == "Closed Ticket")
   }).catch((error)=>vm.$toast.warning(error))
},

computed:{
    ...mapStores(useAuthStore, useGlobalStore),
    reversedInfos(){
      
        var infos = this.tickets.map((ticket)=>{

            var lastAction = ticket.actions[ticket.actions.length - 1]

            if(lastAction.type == 14){
                return {
                problem:ticket.problemDetails,
                solution:ticket.actions[ticket.actions.length - 2].comments,
                date:ticket.requestDate,
            }
               
            }else if(lastAction.type == 11){
                return {
                problem:ticket.problemDetails,
                solution:ticket.actions[ticket.actions.length - 1].comments,
                date:ticket.requestDate,
            }
            }
       
        }
        
        )
        return infos.reverse();
    }
}

}




</script>