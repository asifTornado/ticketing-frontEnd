<template>



<div class="flex flex-col">
  <div class="flex flex-row justify-start items-center font-bold text-black text-lg">Current Tickets</div>
	<div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4   ">
    


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




  <span class=" text-black font-bold text-md  mr-2">Ticket Status</span>
        <select class="border border-solid border-black mr-4" v-model="status" @change="filter()">
          <option value="unassigned" selected>Unassigned</option>
          <option value="assigned">Assigned</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
      
          
        </select>




</div>



	
	<div class="flex flex-row items-center ">
  
  
  
   <div class="flex flex-row justify-between w-full items-center">
    <div class="mr-10"> 
       <div class="border-2 border-solid border-black p-3 text-black font-bold text-sm">{{ all }}</div>
     

      
        </div>
    <div>    
      
      
      
      
      </div>


        
		 <div class="flex flex-row justify-center items-center">
    <div class="mr-10 ">  <label class="mr-1 font-bold text-lg">Zone:</label>
          <label class="mr-5 text-lg">{{ location }}</label>

          <label class="mr-1 text-lg font-bold">Status:</label>
          <label class="mr-5 text-lg">{{ status }}</label>


          
          <label class="mr-1 text-lg font-bold">Duration:</label>
          <label class="mr-5 text-lg">{{ JSON.parse(duration).name }}</label></div>

      
     
        
        </div>
				 
   </div>
	</div>
  
  <div style="height:350px; width:900px" class="flex text-center  flex-row justify-center items-center"> <Bar :data="data" :options="options" /></div>
  
  
  </div>
  </div>
  
  
  </template>
  
  <script >
  import { mapStores } from "pinia";
  import {useTeamStore } from "../../stores/team.js";
  import {useUserStore} from  "../../stores/users"
  import {useAuthStore } from "../../stores/authentication";
  import {useTicketStore} from "../../stores/ticket"
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
    zone:"",
    duration:"",
    status:"unassigned",
    

    filterCheck:false,
    currentLocation:'all',
    currentType:'',
    closed:[],
    open:[],
    assigned:[],
    unassigned:[],
    current:[],
    location:'all',
    locations:[],
    teams:[],
    all:"All Open Tickets: 22",
    openDepartments:0,
    closedDepartments:0,
    assignedDepartments:0,
	  tickets:[],
    filteredTickets:[],
	  minutes:[],
	  hours:[],
	  days:[],
    closedLabels:[],
    closedData:[],
    openLabels:[],
    openData:[],
    assignedLabels:[],
    assignedData:[],
    unassignedLabels:[],
    unassignedData:[],
	  departments:[],
    unassignedDepartments:[],
	  data:{
	  labels: [] ,
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
  
  //start of created
  
  created(){
  	this.duration = JSON.stringify({duration:"all", name:"All Until Now"})
    this.getLocations()
	 var vm = this;
	 var token = this.authStore.token;
	 var data = new FormData();
   var user = this.authStore.user;
   var userType = user.userType;

   data.append("token", token);
   data.append("totalUser", JSON.stringify(user))
   data.append("page", 1)
  

   if(userType == "power"  || userType == "admin"){

    axios.post(this.globalStore.globalUrl + "getAllTickets", data).then((result)=>{
	  vm.tickets = result.data;
	  vm.getData(result.data)
  
	 }).catch((error)=>vm.$toast.warning(error))


  

   }else if(userType == "departmentPower" || userType == "leader" || userType == "Ticket Manager (Department)"){

    data.append("user", user.mailAddress)
    axios.post(this.globalStore.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.getData(result.data)
  

   }).catch((error)=>vm.$toast.warning(error))


   axios.post(this.globalStore.globalUrl + "getTeamsForLeaders", data).then((result)=>{
                vm.teams = result.data
            }).catch((error)=>vm.$toast.warning(error))
   }



   
           
  },
  
  

  
  methods:{
	  getData(tickets){
		 var vm = this;
		
          var unassigned = tickets.filter((ticket) => tickets.status == "Ticket Submitted - Seeking Department Head's Approval" || ticket.status == "Ticket Submitted" || ticket.status == "Ticket Submitted - Department Head's Approval Given" || ticket.status == "Ticket Submitted - Seeking Additional Approval" || ticket.status == "Ticket Submitted - Additional Approval Given")
           
        
          vm.unassigned = unassigned;

      

          var unassignedDepartments = unassigned.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }
          })
            
     
          var unassignedUnique = _.countBy(unassignedDepartments)


 
          
	
          var unassignedData = []
          var unassignedLabels = []

    

          for(var x in unassignedUnique){
             unassignedLabels.push(x);
             unassignedData.push(unassignedUnique[x])
          }

    
          vm.unassignedLabels = unassignedLabels;
          vm.unassignedData = unassignedData;
  
          vm.unassignedDepartments = unassignedDepartments;
          
      
          
          vm.current = vm.unassigned
          vm.currentType = "All Unassigned Tickets"
       
          vm.data = {...vm.data, labels:unassignedLabels,   datasets: [
	  {
		label: 'Current Unassigned Tickets - All',
		backgroundColor: 'dodgerBlue',
		data: unassignedData
	  }
	]}
  
		  
        
  
	
  
  
  
  
  
  
  
  
  
	  },

    filterLocation(event){
         var vm = this;
         var location = event.target.value
         vm.currentLocation = location;
         if(location == 'all'){
          var tickets = vm.current
          

          var departments = tickets.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }});

            vm.all = `${vm.currentType}: ${departments.length}`


            var unique = _.countBy(departments)

            var labels = [];
            var data = [];

            for(var x in unique){
             labels.push(x);
             data.push(unique[x])
          }
           

          vm.data = {...vm.data, labels:labels,   datasets: [
	  {
		label: vm.currentType + ' - All' ,
		backgroundColor: 'dodgerBlue',
		data: data
	  }
	]}
  
         }else{
          var tickets = vm.current.filter((ticket)=>ticket.location == location)

var departments = tickets.map((ticket)=>{
   if(ticket.hasService){
     return ticket.serviceType
   }else{
     return ticket.department
   }});

   vm.all = `${vm.currentType} - ${location}: ${departments.length}`
   var unique = _.countBy(departments)

   var labels = [];
   var data = [];

   for(var x in unique){
    labels.push(x);
    data.push(unique[x])
 }
  


vm.data = {...vm.data, labels:labels,   datasets: [
{
label: vm.currentType + ' - ' + location,
backgroundColor: 'dodgerBlue',
data: data
}
]}
         }
        
  

    },
  
  
	  filterDate($event, labels, data, label, color, ylabel, type){
		var vm = this;


        if(type == 'open'){
          vm.current = vm.open
          vm.currentType = 'Open Tickets'
          
        }else if(type == 'closed'){
          vm.current = vm.closed
          vm.currentType = 'Closed Tickets'
        }else if(type == 'unassigned'){
          vm.current = vm.unassigned
          vm.currentType = 'Unassigned Tickets'
        }else if(type == 'assigned'){
          vm.current = vm.assigned
          vm.currentType = 'Assigned Tickets'
        }

        var all = "";
        switch(label){
            case 'Current Open Tickets':
            all = `All Open Tickets: ${vm.openDepartments.length}`
            break;
            case 'Current Assigned Tickets':
            all = `All Assigned Tickets: ${vm.assignedDepartments.length}`
            break;
            case 'Closed Tickets':
            all = `All Closed Tickets: ${vm.closedDepartments.length}`
            break;
            case 'Current Unassigned Tickets':
            all = `All Unassigned Tickets: ${vm.unassignedDepartments.length}`
            break;
        }

        vm.all = all;

        var newCurrent;

        if(vm.currentLocation  == "all"){
          newCurrent = vm.current
        }else{
          newCurrent = vm.current.filter((ticket)=>ticket.location == vm.currentLocation)
        }

        var departments = newCurrent.map((ticket)=>{
   if(ticket.hasService){
     return ticket.serviceType
   }else{
     return ticket.department
   }});

        var unique = _.countBy(departments);

        
   var labels = [];
   var data = [];

   for(var x in unique){
    labels.push(x);
    data.push(unique[x])
 }



	   
        vm.data = {...vm.data, labels:labels,   datasets: [
	  {
		label: `${vm.currentType} - ${vm.currentLocation}`,
		backgroundColor: 'dodgerBlue',
		data: data
	  }
	]}
  

	  },
  
  
	  getTimeDifference(date1, date2) {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  
  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
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



  var tickets = vm.tickets;

  var currentTickets;

  if(vm.location == "all"){
    currentTickets = tickets 
  }else{
    currentTickets = tickets.filter(ticket=>ticket.location == vm.location)
  }

  if(vm.status == "unassigned"){
    currentTickets = currentTickets.filter((ticket)=> tickets.status == "Ticket Submitted - Seeking Department Head's Approval" || ticket.status == "Ticket Submitted" || ticket.status == "Ticket Submitted - Department Head's Approval Given" || ticket.status == "Ticket Submitted - Seeking Additional Approval" || ticket.status == "Ticket Submitted - Additional Approval Given" )
  }else if(vm.status == "assigned"){
    currentTickets = currentTickets.filter((ticket)=>ticket.status == "Assigned / Pending")
  }else if(vm.status == "closed"){
    currentTickets = currentTickets.filter((ticket)=>ticket.status == "Closed Ticket")
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


  var departments = currentTickets.map((ticket)=>{
   if(ticket.hasService){
     return ticket.serviceType
   }else{
     return ticket.department
   }});

 
   var unique = _.countBy(departments)

   var labels = [];
   var data = [];

   for(var x in unique){
    labels.push(x);
    data.push(unique[x])
 }

 var label = `Status:${vm.status}  Zone:${vm.zone}  Duration:${duration.name}`

 vm.data = {...vm.data, labels:labels,   datasets: [
	  {
		label: label,
		backgroundColor: 'dodgerBlue',
		data: data
	  }
	]}




}
  },
  

  
  }
  </script>
  