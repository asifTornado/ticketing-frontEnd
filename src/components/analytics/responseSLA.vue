<template>

  <div class="flex flex-col">

    <div class="flex flex-row justify-start items-center font-bold text-black text-lg">Total Response SLA Breaches</div>
    <div style="height:450px; width:100%"   class="relative shadow-md shadow-black p-4  ">


   
      <div class="flex flex-row p-3 justify-start items-start noprint" id="top">

        <span class=" text-black font-bold text-md mr-2">Zone</span>
            <select v-model="location" class="border border-solid border-black mr-4 "  @change="filter()">
            <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name">{{location.name}}</option>
            <option value="all">All</option>
            </select>
        
        
        
        <span class=" text-black font-bold text-md  mr-2">Duration</span>
            <select class="border border-solid border-black mr-4" v-model="duration" @change="filter()">
            <option :value="JSON.stringify({duration:86400, name:'Last 24 Hours'})" selected>Last 24 Hours</option>
            <option :value="JSON.stringify({duration:172800, name:'Last Two Days'})">Last Two Days</option>
            <option :value="JSON.stringify({duration:604800, name:'This Week'})">This Week</option>
            <option :value="JSON.stringify({duration:2592000, name:'Last Month'})">Last Month</option>
            <option :value="JSON.stringify({duration:12960000, name:'Last Five Months'})">Last Five Months</option>
            <option :value="JSON.stringify({duration:31104000, name:'This Year'})">Last Year</option>
            <option :value="JSON.stringify({duration:'all', name:'All Until Now'})">All Till Date</option>
            
            </select>
        
        
        
   
        
        
        
        
        </div>
  
    
    <div class="flex flex-row items-center ">
 


   <div class="flex flex-row justify-between items-center">
    <div class="flex flex-row justify-between items-center">
  <div class="mr-10 ">  <label class="mr-1 font-bold text-lg">Zone:</label>
          <label class="mr-5 text-lg">{{ location }}</label>




          
          <label class="mr-1 text-lg font-bold">Duration:</label>
          <label class="mr-5 text-lg">{{ JSON.parse(duration).name }}</label></div>
 </div>


   </div>
    </div>

 <div style="height:360px; width:900px" class="flex text-center  flex-row justify-center items-center"> <Bar :data="data" :options="options" /></div>


 </div>

</div>

</template>

<script >
  import { mapStores } from "pinia";
  import {useTeamStore } from "../../stores/team.js";
  import {useUserStore} from  "../../stores/users"
  import {useAuthStore } from "../../stores/authentication";
  import { useTicketStore } from "../../stores/ticket";
  import {useGlobalStore} from "../../stores/globalStore"
  import axios from "axios";
  import _  from "lodash"
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
  name: 'App',
  components: {
    Bar
  },
  data() {
    return {
      filterCheck:false,
      tickets:null,
      minutes:[],
      hours:[],
      days:[],
      duration:"",
      locations:[],
      location:'all',
      departments:[],
      data:{
    labels: [
  
    ],
    datasets: [
      {
        label: '',
        backgroundColor: 'dodgerblue',
        data: []
      }
    ]
  },


  options:{
    responsive: true,
    maintainAspectRatio: false
  }


    }
  },


  computed:{
    ...mapStores(useTeamStore, useUserStore, useAuthStore, useTicketStore, useGlobalStore),
  },



  created(){
    this.duration = JSON.stringify({duration:"all", name:"All Until Now"})
    this.getLocations()
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
      vm.getData(result.data)

     }).catch((error)=>vm.$toast.warning(error))
  }else if(userType == "departmentPower"  || userType == "leader" || userType == "Ticket Manager (Department)"){
    data.append("user", user.mailAddress)
    axios.post(this.globalStore.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.getData(result.data)

   }).catch((error)=>vm.$toast.warning(error))
  }

   
  },




  methods:{
      getData(tickets){
         var vm = this;
     
         var breaches = tickets.filter((ticket)=>{
         
            if(ticket.priority){
                 var currentDate = new Date();

                 if(ticket.actions.length > 1){
                    var responseTime =new Date(ticket.actions[1].time)
                    var raiseTime = new Date(ticket.actions[0].time)

                    var SLA = vm.getTimeInMilli(ticket.priority.responseTime)

                    var diff = responseTime - raiseTime

                    if(diff > SLA){
                        return true
                    }
                 }else{
                    var raiseTime = new Date(ticket.actions[0].time)

                    var SLA = vm.getTimeInMilli(ticket.priority.responseTime)

                    var diff = currentDate - raiseTime

                    if(diff > SLA){
                        return true
                    }
                 }
           
            }
         })


         var breachDepartments = breaches.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }
          })

          var breachesUnique = _.countBy(breachDepartments)


          var breachData = []
          var breachLabels = []


          for(var x in breachesUnique){
             breachLabels.push(x);
             breachData.push(breachesUnique[x])
          }



          vm.data = {...vm.data, labels:breachLabels,   datasets: [
	  {
		label: 'breaches',
		backgroundColor: 'dodgerBlue',
		data: breachData
	  }
	]}
  











     

        
        
 










      },


      filter(){

  var vm = this;

  var duration = JSON.parse(vm.duration)


  vm.filterCheck = !vm.filterCheck
  var tickets = vm.tickets;

  var currentTickets;

  if(vm.location == "all"){
    currentTickets = tickets 
  }else{
    currentTickets = tickets.filter(ticket=>ticket.location == vm.location)
  }



  if(duration.duration != "all"){
    currentTickets = currentTickets.filter((ticket) => {
      var currentDate = new Date();
      var ticketDate = new Date(ticket.requestDate)
    
      var durationInMilli = duration.duration * 1000

      var diff = currentDate - ticketDate

      if(diff < durationInMilli){
        return true

      }
    })
  }



 var label = `Status:${vm.status}  Zone:${vm.zone}  Duration:${duration.name}`

 vm.getData(currentTickets)


},


      filterDate($event, time, labels, color, ylabel){
        var vm = this;
        
       

        vm.data = {...vm.data,  datasets: [
      {
        label: labels,
        backgroundColor: color,
        data: time
      }
    ]}


    vm.options = {...vm.options, scales:{
      y:{
        ticks:{
          callback: value => `${value} ${ylabel}`
        }
      }
    }}
      },


      getTimeDifference(date1, date2) {
        if(date1 == undefined || date2 == undefined){
          return false
        }
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  
  const minutes = diffInMs / (1000 * 60);
  const hours = minutes / 60;
  const days = hours / 24;
  
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;
  
  return {
    days: days,
    hours: hours,
    minutes: minutes
  };
},

filterLocation(event){
		var vm = this;
        var tickets
		if(event.target.value == 'all'){
			tickets = vm.tickets;
		}else{
			tickets = vm.tickets.filter((ticket)=>ticket.location == event.target.value)
		}

	     vm.getData(tickets);

	  },


getLocations(){
    var vm = this;
    axios.get(this.globalStore.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
  },


  getTimeInMilli(timeString){
const [hours, minutes, seconds] = timeString.split(':').map(Number);


const totalSeconds = hours * 3600 + minutes * 60 + seconds;


const totalMilliseconds = totalSeconds * 1000;

return totalMilliseconds

  }
  },

 
 
}
</script>
