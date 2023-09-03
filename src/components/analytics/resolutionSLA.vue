<template>
    <div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4  bg-white">


      <div v-if="filterCheck" class="fixed flex flex-col justify-center items-center top-[100px] left-[500px] w-auto h-auto p-4 bg-white border border-solid border-black">
<div class="flex flex-row justify-center w-full items-center text-3xl font-bold">Filter</div>
<div class="flex flex-col w-full p-3 justify-center items-center">
<div class="flex flex-row w-full">
  <span class=" text-black font-bold text-md w-1/3">Zone</span>
        <select v-model="location" class="border border-solid border-black p-2 w-2/3" >
          <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name">{{location.name}}</option>
          <option value="all" selected>All</option>
        </select>
</div>

<div class="flex flex-row w-full mt-3">
  <span class=" text-black font-bold text-md  w-1/3 ">Duration</span>
        <select class="border border-solid border-black p-2  w-2/3" v-model="duration">
          <option :value="JSON.stringify({duration:86400, name:'Last 24 Hours'})" selected>Last 24 Hours</option>
          <option :value="JSON.stringify({duration:172800, name:'Last Two Days'})">Last Two Days</option>
          <option :value="JSON.stringify({duration:604800, name:'This Week'})">This Week</option>
          <option :value="JSON.stringify({duration:2592000, name:'Last Month'})">Last Month</option>
          <option :value="JSON.stringify({duration:12960000, name:'Last Five Months'})">Last Five Months</option>
          <option :value="JSON.stringify({duration:31104000, name:'This Year'})">This Year</option>
          <option :value="JSON.stringify({duration:'all', name:'All Until Now'})">All Until Now</option>
          
        </select>
</div>






<div class="flex flex-row w-full justify-end items-center mt-4">
  <div class="bg-blue-400 p-3 font-bold text-white hover:cursor-pointer" @click="filter">Apply Filter</div>
  <div class="bg-red-400 p-3 ml-3 font-bold text-white hover:cursor-pointer" @click="filterCheck = false">Cancel</div>
</div>
</div>


</div>
  
    
    <div class="flex flex-row items-center ">
 


   <div class="flex flex-row justify-between items-center">
    <div class="flex flex-row justify-between items-center">
  <div class="mr-10 ">  <label class="mr-1 font-bold text-lg">Zone:</label>
          <label class="mr-5 text-lg">{{ location }}</label>




          
          <label class="mr-1 text-lg font-bold">Duration:</label>
          <label class="mr-5 text-lg">{{ JSON.parse(duration).name }}</label></div>
 </div>

 <div class="bg-white border-solid border-black border p-2 hover:cursor-pointer" @click="filterCheck = !filterCheck"> <font-awesome-icon class="mr-2" icon="fa-solid fa-filter" size="lg"/></div>
   </div>
    </div>

 <div style="height:360px; width:900px" class="flex text-center  flex-row justify-center items-center"> <Bar :data="data" :options="options" /></div>


 </div>



</template>

<script >
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
      location:'Dhaka (Head Office)',
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

  //start of created

  created(){
    this.duration = JSON.stringify({duration:"all", name:"All Until Now"})
    this.getLocations()
     var vm = this;
     var token = this.authStore.getToken;
     var data = new FormData();
     var user = this.authStore.getUser;
     var userType = user.userType



     data.append("token", token);


     if(userType == "power"  || userType == "admin"){
      axios.post(vm.globalUrl + "getAllTickets", data).then((result)=>{
      vm.tickets = result.data;
      vm.getData(result.data)

     }).catch((error)=>vm.$toast.warning(error))
  }else if(userType == "departmentPower"){
    data.append("user", user.mailAddress)
    axios.post(vm.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.getData(result.data)
    console.log("calling created")
    console.log(vm.tickets)

   }).catch((error)=>vm.$toast.warning(error))
  }

   
  },


  //start of methods

  methods:{
      getData(tickets){
         var vm = this;
          //get the number for each departments 
         var breaches = tickets.filter((ticket)=>{
         
            if(ticket.priority){
                 var currentDate = new Date();

                 if(ticket.status == "Closed Ticket" ){
                    var resolutionTime =new Date(ticket.actions[ticket.actions.length - 1].time)
                    var raiseTime = new Date(ticket.actions[0].time)

                    var SLA = vm.getTimeInMilli(ticket.priority.resolutionTime)

                    var diff = resolutionTime - raiseTime

                    if(diff > SLA){
                        return true
                    }
                 }else{
                    var raiseTime = new Date(ticket.actions[0].time)

                    var SLA = vm.getTimeInMilli(ticket.priority.resolutionTime)

                    var diff = currentDate - raiseTime

                    if(diff > SLA){
                        return true
                    }
                 }
           
            }
         })


         console.log("these are the breaches")
         console.log(breaches)


         var breachDepartments = breaches.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }
          })

          console.log("these are the breach departments")
          console.log(breachDepartments)

          var breachesUnique = _.countBy(breachDepartments)

       
          console.log("these are the breaches unique")
          console.log(breachesUnique)

          var breachData = []
          var breachLabels = []


          for(var x in breachesUnique){
             breachLabels.push(x);
             breachData.push(breachesUnique[x])
          }

console.log("these are the breachLabels and data")
console.log(breachData)
console.log(breachLabels)

          vm.data = {...vm.data, labels:breachLabels,   datasets: [
	  {
		label: 'breaches',
		backgroundColor: 'dodgerBlue',
		data: breachData
	  }
	]}


    vm.options = {...vm.options, scales:{
	  y:{
		ticks:{
		  callback: value => `${value}`
		}
	  }
	}}
  
  











     

           //iterate over the tickets and get the first time to respond and map it to the departmentswithtime variable
        
 










      },


      filter(){

console.log("filter fired")
  var vm = this;

  var duration = JSON.parse(vm.duration)
  console.log("this is the first duration")
  console.log(duration)

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
       console.log("this is the duration")
       console.log(duration.duration)
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
    axios.get(vm.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
  },


  getTimeInMilli(timeString){
const [hours, minutes, seconds] = timeString.split(':').map(Number);

// Calculate the total seconds
const totalSeconds = hours * 3600 + minutes * 60 + seconds;

// Calculate milliseconds if needed
const totalMilliseconds = totalSeconds * 1000;

return totalMilliseconds

  }
  },

  //method to get the time difference
 
}
</script>
