<template>     <div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4 bg-white">

<div>    <span class="mr-2 text-black font-bold text-lg">Zone</span>
        <select v-model="location" class="border border-solid border-black p-2" @change="filterLocation($event)">
          <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name">{{location.name}}</option>
          <option value="all" selected >All</option>
        </select></div>
<div style="height:400px; width:1000px" class="flex text-center  flex-row justify-center items-center"><Pie :data="{labels, datasets}" :options="options" :plugins="['zoomPlugin']" /></div>


</div>


</template>

<script>
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
     datasets(){
       var vm = this;
       console.log("this is the data")
       
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
         var user = this.authStore.getUser;
         var token = this.authStore.getToken
         var userType = user.userType;

         var data = new FormData();
         data.append("user", user.mailAddress);
         data.append("token", token);

       
      if(user.userType == "power"){
        axios.post(vm.globalUrl + "getAllTickets", data).then((result)=>{
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
       console.log(labels);
       console.log(data)
       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
       console.log(this.labels)

         }).catch((error)=>console.log(error))
      }else if(user.userType == "departmentPower"){
        axios.post(vm.globalUrl + "getDepartmentTickets", data).then((result)=>{
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
       console.log(labels);
       console.log(data)
       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
       console.log(this.labels)

         }).catch((error)=>console.log(error))
      }
         
         
         axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
             vm.teams = result.data
         }).catch((error)=>vm.$toast.warning(error))
        

     },

    methods:{
      getLocations(){
    var vm = this;
    axios.get(vm.globalUrl + "getLocations").then((result)=>{
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
       console.log(labels);
       console.log(data)
       vm.backgroundColor = this.generateRandomColorsList(labels.length)
       vm.labels = labels;
       vm.data = data;
       console.log(this.labels)

}
     }

     
   
 

     

   
 }
</script>