<template>
    

<div class="w-full h-[500px]  overflow-y-scroll ">

  
    <div v-for="(info, infoCounter) in reversedInfos" :key="infoCounter" >
       
       <div  class="p-3 m-3 shadow-md shadow-black  bg-white flex flex-col" v-if="info.problem"> 
        {{info.date  }}
       <hr class="border border-solid border-black"/>


           
        <div  class="p-3 flex flex-col">
        {{info.problem}}
       


        </div></div>

        </div>



</div>


</template>




<script>
import axios from 'axios';

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
   var user = this.authStore.getUser;
   var data = new FormData();
   data.append("user", JSON.stringify(user))
   
   axios.post(vm.globalUrl + "getTicketsRaisedByUser", data).then((result)=>{
    vm.tickets = result.data
   }).catch((error)=>vm.$toast.warning(error))
},

computed:{
    reversedInfos(){
      
        var infos = this.tickets.map((ticket)=>{
            return {
                problem:ticket.problemDetails,
                date:ticket.requestDate,
            }
        })
        return infos.reverse();
    }
}

}




</script>