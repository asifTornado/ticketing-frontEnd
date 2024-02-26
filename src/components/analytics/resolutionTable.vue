<template>
	<div class="flex flex-col">

		<div class="flex flex-row justify-start items-center font-bold text-black text-lg">Total Resolved Tickets</div>
		
<div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4  ">
		

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
	<div class="mr-10 ">  <label class="mr-1 font-bold text-lg">Zone:</label>
          <label class="mr-5 text-lg">{{ location }}</label>




          
          <label class="mr-1 text-lg font-bold">Duration:</label>
          <label class="mr-5 text-lg">{{ JSON.parse(duration).name }}</label></div>

   </div>
	</div>
  
  <div style="height:370px; width:900px" class="flex text-center  flex-row justify-center items-center"> <Bar :data="data" :options="options" /></div>
  
  
  </div>
  
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
  import { mapStores } from "pinia";
  import {useTeamStore } from "../../stores/team.js";
  import {useUserStore} from  "../../stores/users"
  import {useAuthStore } from "../../stores/authentication";
  import { useTicketStore } from "../../stores/ticket";
  import {useGlobalStore} from "../../stores/globalStore"
  
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  export default {
  name: 'App',
  components: {
	Bar
  },
  data() {
	return {
		zone:"all",
		duration:"",
		filterCheck:false,
		locations:[],
		location:'all',
		duration:'all',
	  tickets:null,
	  minutes:[],
	  hours:[],
	  days:[],
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
	...mapStores(useTeamStore, useUserStore, useAuthStore, useTicketStore, useGlobalStore)
  },
  

  
  created(){
	this.duration = JSON.stringify({duration:"all", name:"All Until Now"})
	this.getLocations();
	 var vm = this;
	 var token = this.authStore.token;
	 var data = new FormData();
	 var user = this.authStore.user;
	 var userType = user.userType;
	 
     
	 data.append("token", token);
	 data.append("totalUser", JSON.stringify(user))
	 data.append("page", 1)
  
	 if(userType == "power" || userType == "admin"){
		axios.post(this.globalStore.globalUrl + "getAllTickets", data).then((result)=>{
	
	      vm.tickets = result.data;
	      vm.getData(result.data)
	 
      
         }).catch((error)=>vm.$toast.warning(error))
	 }else if(userType == "departmentPower"  || userType == "leader" || userType == "Ticket Manager (Department)"){
		data.append("user", user.mailAddress)
		data.append("page", 1)
    axios.post(this.globalStore.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.getData(result.data)


   }).catch((error)=>vm.$toast.warning(error))
	 }
	 
  },
  

  methods:{
	  getData(tickets){
		 var vm = this;

   
		var departments = []

for(var ticket of vm.tickets){
  if(ticket.hasService){
	departments.push(ticket.serviceType)
  }else{
	departments.push(ticket.department)
  }
}


		  var departmentsUnique = _.countBy(departments)
  
	
	
		  var departmentsWithtime = []
  
		  for(var x in departmentsUnique){
			var newObject = {
			  department:x,
			  time:{
				minutes:0,
				hours:0,
				days:0
			  },
			  count:0
			}

			
  
			departmentsWithtime.push(newObject)
		  }
  

			for(var y of departmentsWithtime){
			  for(var x of tickets){
		
				if(y.department == x.department || y.department == x.serviceType){
				   var date1 = new Date(x.actions[0].time);

					var date2;
  
					for(var z of x.actions){
					
					  if(z.type == 11){
				
						date2 = new Date(z.time)
					  }
					}

				
			
  
					var time = vm.getTimeDifference(date2, date1)
					if(time == false){
					
						continue
					}
					y.count++
					y.time.days = (y.time.days + time.days) / y.count
					y.time.hours = (y.time.hours + time.hours) / y.count
					y.time.minutes = (y.time.minutes + time.minutes) / y.count
				}
			  }
			}
		 
			var minutes = departmentsWithtime.map((item)=>item.time.minutes)
			var hours = departmentsWithtime.map((item)=>item.time.hours)
			var days = departmentsWithtime.map((item)=>item.time.days)
			var labels = departmentsWithtime.map((item)=>item.department)
  
			vm.minutes = minutes;
			vm.hours = hours;
			vm.days = days;
			vm.departments = labels;
  
			vm.data = {...vm.data, labels:labels,   datasets: [
	  {
		label: 'Mean Ticket Resolution Time In Minutes',
		backgroundColor: 'dodgerBlue',
		data: minutes
	  }
	]}
  
  
	vm.options = {...vm.options, scales:{
	  y:{
		ticks:{
		  callback: value => `${value} minutes`
		}
	  }
	}}
  
	
  
  
  
  
  
  
  
  
  
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

  getLocations(){
    var vm = this;
    axios.get(this.globalStore.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
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


}
  },





  
  }
  </script>
  