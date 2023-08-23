<template>
	<div style="height:450px; width:1000px"   class="relative shadow-md shadow-black p-4   bg-white">
	
	<div class="flex flex-row items-center ">
  
  
  
   <div class="flex flex-row justify-between w-full items-center">
    <div class="mr-10"> 
       <div class="border-2 border-solid border-black p-3 text-black font-bold text-sm">{{ all }}</div>
     

      
        </div>
    <div>    <span class="mr-2 text-black font-bold text-lg">Zone</span>
        <select v-model="location" class="border border-solid border-black p-2" @change="filterLocation($event)">
          <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name">{{location.name}}</option>
          <option value="all" selected>All</option>
        </select></div>


        
		 <div> <label class="mr-5">Ticket Status</label>
      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, unassignedLabels, unassignedData, 'Current Unassigned Tickets', 'lime', 'hours', 'unassigned')">Unassigned</button>
				  <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, openLabels, openData, 'Current Open Tickets', 'dodgerblue', 'minutes', 'open')">Open</button>
				  <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, assignedLabels, assignedData, 'Current Assigned Tickets', 'lime', 'hours', 'assigned')">Assigned</button>
				  <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, closedLabels, closedData, 'Closed Tickets', 'red', 'days', 'closed')">Closed</button></div>
				 
   </div>
	</div>
  
  <div style="height:350px; width:900px" class="flex text-center  flex-row justify-center items-center"> <Bar :data="data" :options="options" /></div>
  
  
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
    this.getLocations()
	 var vm = this;
	 var token = this.authStore.getToken;
	 var data = new FormData();
   var user = this.authStore.getUser;
   var userType = user.userType;

   data.append("token", token);
  

   if(userType == "power"){

    axios.post(vm.globalUrl + "getAllTickets", data).then((result)=>{
	  vm.tickets = result.data;
	  vm.getData(result.data)
  
	 }).catch((error)=>vm.$toast.warning(error))


  //  axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
  //               vm.teams = result.data
  //           }).catch((error)=>vm.$toast.warning(error))

   }else if(userType == "departmentPower"){

    data.append("user", user.mailAddress)
    axios.post(vm.globalUrl + "getDepartmentTickets", data).then((result)=>{
    vm.tickets = result.data;
    vm.getData(result.data)
    console.log("calling created")
    console.log(vm.tickets)

   }).catch((error)=>vm.$toast.warning(error))


   axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
                vm.teams = result.data
            }).catch((error)=>vm.$toast.warning(error))
   }



   
           
  },
  
  
  //start of methods
  
  methods:{
	  getData(tickets){
		 var vm = this;
		  //get the number for each departments 
          var closed = tickets.filter((ticket)=>ticket.status == "Closed Ticket");
          var open = tickets.filter((ticket)=>ticket.status == "Open (Seeking Information...)" || ticket.status == "Open (Information Sent)" || ticket.status == "Open");
		      var assigned = tickets.filter((ticket)=>ticket.status == "Assigned / Pending")
          var unassigned = tickets.filter((ticket) => tickets.status == "Ticket Submitted - Seeking Department Head's Approval" || ticket.status == "Ticket Submitted" || ticket.status == "Ticket Submitted - Department Head's Approval Given" || ticket.status == "Ticket Submitted - Seeking Additional Approval" || ticket.status == "Ticket Submitted - Additional Approval Given")
           
          vm.closed = closed;
          vm.open = open;
          vm.assigned = assigned;
          vm.unassigned = unassigned;

          console.log("count of all the tickets")
          console.log(`closed:${closed.length}  open:${open.length}  assigned:${assigned.length}`)
          
          var closedDepartments = closed.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }});
          
            var openDepartments = open.map((ticket)=>{
              if(ticket.hasService){
                return ticket.serviceType
              }else{
                return ticket.department
              }
            });


          var assignedDepartments = assigned.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }
          });

          var unassignedDepartments = unassigned.map((ticket)=>{
            if(ticket.hasService){
              return ticket.serviceType
            }else{
              return ticket.department
            }
          })
            
          var closedUnique = _.countBy(closedDepartments);
          var openUnique = _.countBy(openDepartments);
          var assignedUnique = _.countBy(assignedDepartments);
          var unassignedUnique = _.countBy(unassignedDepartments)


 
          
		   
		  //map the departments to have a companion time variable
		      var closedlabels = []
          var closeddata = []
          var openlabels = []
          var opendata = []
          var assignedlabels = []
          var assigneddata = []
          var unassignedData = []
          var unassignedLabels = []

          console.log("this is closedUnique")
          console.log(closedUnique)


          for(var x in closedUnique){
             closedlabels.push(x);
             closeddata.push(closedUnique[x])
          }


          for(var x in openUnique){
             openlabels.push(x);
             opendata.push(openUnique[x])
          }


          
          for(var x in assignedUnique){
             assignedlabels.push(x);
             assigneddata.push(assignedUnique[x])
          }

          for(var x in unassignedUnique){
             unassignedLabels.push(x);
             unassignedData.push(unassignedUnique[x])
          }

          vm.closedLabels = closedlabels;
          vm.closedData = closeddata;
          vm.openLabels = openlabels;
          vm.openData = opendata;
          vm.assignedLabels = assignedlabels;
          vm.assignedData = assigneddata;
          vm.unassignedLabels = unassignedLabels;
          vm.unassignedData = unassignedData;
          vm.openDepartments = openDepartments;
          vm.closedDepartments = closedDepartments;
          vm.assignedDepartments = assignedDepartments;
          vm.unassignedDepartments = unassignedDepartments;
          
          vm.all = `All Unassigned Tickets: ${unassignedDepartments.length}`
          
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
		console.log("these are the labels");
        console.log(label)

        if(type == 'open'){
          vm.current = vm.open
          vm.currentType = 'All Open Tickets'
          
        }else if(type == 'closed'){
          vm.current = vm.closed
          vm.currentType = 'All Closed Tickets'
        }else if(type == 'unassigned'){
          vm.current = vm.unassigned
          vm.currentType = 'All Unassigned Tickets'
        }else if(type == 'assigned'){
          vm.current = vm.assigned
          vm.currentType = 'All Assigned Tickets'
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
	   
        vm.data = {...vm.data, labels:labels,   datasets: [
	  {
		label: label,
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
    axios.get(vm.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
  }
  },
  
  //method to get the time difference
  
  }
  </script>
  