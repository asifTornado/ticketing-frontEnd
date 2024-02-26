<template>
  <div class="flex flex-row  w-[80vw] flex-wrap ">  
    <div class="flex flex-row justify-start items-center font-bold text-black text-lg w-full  ">Repeat Tickets</div>
    
        <div class="flex flex-col w-[350px] p-4 m-4 border border-solid border-black" v-for="(ticket, ticketCounter) in processedTickets">
         <div class="flex flex-row w-full">   
            <div class="flex flex-row w-1/3 font-bold">
              Raised By            </div>
            <div class="flex flex-row w-2/3">
              {{ ticket.raisedBy.empName }}
            </div>
          </div>


          <div class="flex flex-row w-full">   
            <div class="flex flex-row w-1/3 font-bold">
              Department            </div>
            <div class="flex flex-row w-2/3">
              {{ ticket.department }}
            </div>
          </div>



          <div class="flex flex-row w-full">   
            <div class="flex flex-row w-1/3 font-bold">
              Category           </div>
            <div class="flex flex-row w-2/3">
              {{ ticket.category }}
            </div>
          </div>


          <div class="flex flex-row w-full">   
            <div class="flex flex-row w-1/3 font-bold">
              Problem           </div>
            <div class="flex flex-row w-2/3">
              {{ ticket.problemDetails }}
            </div>
          </div>


          <div class="flex flex-row w-full">   
            <div class="flex flex-row w-1/3 font-bold">
              Times Raised           </div>
            <div class="flex flex-row w-2/3">
              {{ ticket.timesRaised }}
            </div>
          </div>


        </div> 



        


   

</div>

</template>

<script >
  import axios from "axios";
  import _  from "lodash"
  import { mapStores } from "pinia";
  import {useTeamStore } from "../../stores/team.js";
  import {useUserStore} from  "../../stores/users"
  import {useAuthStore } from "../../stores/authentication";
  import {useTicketStore} from "../../stores/ticket.js";
  import {useGlobalStore} from "../../stores/globalStore"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'repeat',
  components: {
    Bar
  },
  data() {
    return {
      teams:[],
      filterCheck:false,
      tickets:null,
      processedTickets:null
     


    }
  },

  computed:{
    ...mapStores(useTeamStore, useUserStore, useAuthStore, useTicketStore, useGlobalStore)
  },



  created(){
    this.teamStore.getTeams();
    this.duration = JSON.stringify({duration:"all", name:"All Until Now"})
   
     var vm = this;
     var token = this.authStore.token;
     var data = new FormData();
     var user = this.authStore.user;
     var userType = user.userType



     data.append("token", token);
     data.append("totalUser", JSON.stringify(user))
     data.append("page", 1)


     if(userType == "power"  || userType == "admin"){
      axios.post(this.globalStore.globalUrl + "getAllTickets", data).then((result)=>{
      vm.tickets = result.data;
      vm.processedTickets = result.data.filter((ticket)=>ticket.genesis == true && ticket.timesRaised > 1)


     }).catch((error)=>vm.$toast.warning(error))
  }else if(userType == "departmentPower"  || userType == "leader" || userType == "Ticket Manager (Department)"){
    data.append("user", user.mailAddress)
    axios.post(this.globalStore.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.processedTickets = result.data.filter((ticket)=>ticket.genesis == true && ticket.timesRaised > 1)



   }).catch((error)=>vm.$toast.warning(error))
  }

   
  },

  mounted(){
    this.ticketsStore.getLocations()
  },


 

  methods:{
   
  },





 
}
</script>
