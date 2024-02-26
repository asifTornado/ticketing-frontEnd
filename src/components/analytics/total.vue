<template>     

<div class="flex flex-col">
  <div class="flex flex-row justify-start items-center font-bold text-black text-lg">Total Tickets</div>
<div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4 ">

<div id="top" class="noprint">    <span class="mr-2 text-black font-bold text-lg">Zone</span>
        <select v-model="location" class="border border-solid border-black p-2" @change="filterLocation($event)">
          <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name">{{location.name}}</option>
          <option value="all" selected >All</option>
        </select>

        <span class="mr-2 text-black font-bold text-lg ml-10">Duration</span>
        <select class="border border-solid border-black p-2" @change="filterDuration($event)">
          <option value="86400" selected>Last 24 Hours</option>
          <option value="172800">Last Two Days</option>
          <option value="604800">This Week</option>
          <option value="2592000">Last Month</option>
          <option value="12960000">Last Five Months</option>
          <option value="31104000">Last Year</option>
          <option value="all">All Till Date</option>
          
        </select>
      
      
      </div>
<div style="height:400px; width:900px" class="flex text-center  flex-row justify-center items-center"><Pie :data="{labels, datasets}" :options="options" :plugins="['zoomPlugin']" /></div>


</div></div>


</template>

<script>
import { mapStores } from "pinia";
import {useTeamStore } from "../../stores/team.js";
import {useUserStore} from  "../../stores/users"
import {useAuthStore } from "../../stores/authentication";
import { useTicketStore } from "../../stores/ticket";
import {useGlobalStore} from "../../stores/globalStore"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'
import axios from "axios"
import _  from "lodash";
    import moment from 'moment';
    import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
   
   components: {
     Pie
   },
   
   data( ){
     return{
       locations:[],

       location:'all',
       teams:[],
       label:"Total Tickets By Time",
       timeFrame:null,
       tickets:null,
       filteredTickets:null,
       departments:null,
       departmentCounts:[],
       lineLabels:[],
       ticketsToday:[],
       tickets5Days:[],
       tickets1Month:[],
       tickets6Month:[],
       tickets1year:[],
       tickets5year:[],
       ticketsAll:[],
       lineData:[],
       labels: null,
       backgroundColor: [],
       data: null,
                    
                    
                   

       options:{
              
              responsive: true,
              maintainAspectRatio: false,
              scales:{
               y:{
                 beginAtZero:true
               }
              },
              
           

              plugins: {
              zoom: {
                  zoom: {
            wheel: {
             enabled: true,
                  },
            pinch: {
             enabled: true
               },
               pan: {
            enabled:true
     },
           mode: 'xy',
     }
   }
 }
               
             
             }
             };
           },

        

   computed:{
    ...mapStores(useTeamStore, useUserStore, useAuthStore, useTicketStore, useGlobalStore),
     datasets(){
       var vm = this;
       
       
       return [{backgroundColor:vm.backgroundColor, data:vm.data, labels:vm.labels}]
     },

     processedTeams(){
         var vm = this;
         var departments =[];
         
         for(var x of vm.teams){
             if(x.hasServices){
                 for(var y of x.services){
                     departments.push(y.serviceName)
                 }
             }else{
                 departments.push(x.name)
             }
         }

         return departments


     }

    
   },

   created(){
         this.getLocations()
         var vm = this
         var user = this.authStore.user;
         var token = this.authStore.token;
         var userType = user.userType;

         var data = new FormData();
         data.append("user", user.mailAddress);
         data.append("token", token);
         data.append("totalUser", JSON.stringify(user))
         data.append("page", 1)

       
      if(user.userType == "power" || userType == "admin"){
        axios.post(this.globalStore.globalUrl + "getAllTickets", data).then((result)=>{
             vm.tickets = result.data;
             vm.filteredTickets = vm.tickets;
             vm.departments = vm.tickets.map((ticket)=>{
               if(ticket.hasService){
                return ticket.serviceType
               }else{
                return ticket.department
               }
       })
       vm.departmentCounts = _.countBy(vm.departments);
       var labels = [];
  
       var data = [];
       for(var x in this.departmentCounts){
             labels.push(x)
             data.push(vm.departmentCounts[x])
       }

       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
   

         }).catch((error)=>vm.$toast.warning(error))
      }else if(user.userType == "departmentPower"  || userType == "leader" || userType == "Ticket Manager (Department)"){
        axios.post(this.globalStore.globalUrl + "getDepartmentTickets", data).then((result)=>{
             vm.tickets = result.data;
             vm.filteredTickets = vm.tickets;
             vm.departments = vm.tickets.map((ticket)=>{
               if(ticket.hasService){
                return ticket.serviceType
               }else{
                return ticket.department
               }
       })
       vm.departmentCounts = _.countBy(vm.departments);
       var labels = [];
  
       var data = [];
       for(var x in this.departmentCounts){
             labels.push(x)
             data.push(vm.departmentCounts[x])
       }
  
       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
  

         }).catch((error)=>vm.$toast.warning(error))
      }
         
      
         axios.post(this.globalStore.globalUrl + "getTeamsForLeaders", data).then((result)=>{
             vm.teams = result.data
         }).catch((error)=>vm.$toast.warning(error))
        

     },

    methods:{
      getLocations(){
    var vm = this;
    axios.get(this.globalStore.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
  },


     

generateRandomColorsList(length) {
    var vm = this;
  const colors = [];
  while (colors.length < length) {
    const newColor = vm.getRandomColor();
    if (!vm.isColorDuplicate(colors, newColor)) {
      colors.push(newColor);
    }
  }
  return colors;
},

isColorDuplicate(colorsList, color) {
  return colorsList.some((c) => c === color);
},


getRandomColor() {
  const letters = ['blue', 'green', 'yellow', 'orange', 'dodgerBlue'];
  let color ;
 
    color = letters[Math.floor(Math.random() * 5)];
  
  return color;
},

filterLocation(event){
  var vm = this;
  var location = event.target.value;
  var tickets;
  if(location == 'all'){
    tickets = vm.tickets
  }else{
    tickets = vm.tickets.filter((ticket) => ticket.location == location)
  }

 

  vm.departments = tickets.map((ticket)=>{
               if(ticket.hasService){
                return ticket.serviceType
               }else{
                return ticket.department
               }
       })
       vm.departmentCounts = _.countBy(vm.departments);
       var labels = [];
  
       var data = [];
       for(var x in this.departmentCounts){
             labels.push(x)
             data.push(vm.departmentCounts[x])
       }

       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
    

},

filterDuration(event){

  var vm = this;
  var duration;
  if(event.target.value == "all"){
    duration = "all"
  }else{
    duration = parseInt(event.target.value * 1000, 10);
  }
 
  var tickets;
  if(duration == 'all'){
    tickets = vm.tickets
  }else{
    tickets = vm.tickets.filter((ticket) => {
           var currentDate = new Date();
           var ticketDate = new Date(ticket.requestDate);

           var diff = currentDate - ticketDate;

           if(diff < duration){
            return true
           }



    })
  }


  vm.departments = tickets.map((ticket)=>{
               if(ticket.hasService){
                return ticket.serviceType
               }else{
                return ticket.department
               }
       })
       vm.departmentCounts = _.countBy(vm.departments);
       var labels = [];
  
       var data = [];
       for(var x in this.departmentCounts){
             labels.push(x)
             data.push(vm.departmentCounts[x])
       }

       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;






}
     }

     
   
 

     

   
 }
</script>