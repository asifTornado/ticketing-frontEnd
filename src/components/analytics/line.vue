<template>
 
    
  
  
     <div style="height:450px; width:1000px"  class="relative shadow-md shadow-black p-4 bg-white">
    
        <div class="flex flex-row items-center ">
       <div class="mr-10">  <label class="mr-4 font-bold text-sm">Department</label>
          <Select @change="filterDepartment($event)" class="p-2 text-sm text-black font-bold w-auto">
            <option value="all" class="text-sm  text-black font-bold"  >All</option>
            <option :value="team" class="text-sm  text-black font-bold" v-for="(team, teamCounter) in processedTeams" :key="teamCounter">{{ team }}</option>
            
          </Select>
        </div>
        <div class="mr-2">    <span class="mr-2 text-black font-bold text-sm">Zone</span>
        <select v-model="location" class="border border-solid border-black p-2" @change="filterLocation($event)">
          <option v-for="(location, locationCounter) in locations" :key="locationCounter" :value="location.name" class="text-sm">{{location.name}}</option>
          <option value="all" selected class="text-sm">All</option>
        </select></div>



       <div class="flex flex-row justify-between items-center">
              <label class="mr-5">Time Frame</label>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 1)">1 Day</button>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 5)">5 Days</button>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 30)">1 month</button>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 150)">5 month</button>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 365)">1 year</button>
                      <button class="mr-5 bg-slate-300 p-2 rounded-md" @click="filterDate(event, 100000000)">Max</button>
       </div>
        </div>
  
     <div style="height:400px; width:900px" class="pb-5 flex text-center  flex-row justify-center items-center"><Line :data="{labels, datasets}" :options="options" :plugins="['zoomPlugin']" /></div>
  
  
     </div>
  
  
  
  
 
     
  
  
    </template>
    
    <script>
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    } from 'chart.js'
    import { Line, Bar } from 'vue-chartjs'
    import * as chartConfig from './chartConfig.js'
    import axios from "axios";
    import _  from "lodash";
    import moment from 'moment';
    import zoomPlugin from 'chartjs-plugin-zoom';
    
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      zoomPlugin
      
    )
    
    export default {
   
      components: {
        Line, Bar
      },
      
      data( ){
        return{
          teams:[],
          locations:[],
          location:'all',
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
          backgroundColor: 'dodgerBlue',
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
          
          return [{backgroundColor:vm.backgroundColor, data:vm.data, label:vm.label}]
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
            this.getLocations();
           
            var vm = this
            var user = this.authStore.getUser;
            var token = this.authStore.getToken

            var data = new FormData();
            data.append("user", user.mailAddress);
            data.append("token", token);


         if(user.userType == "power"  || user.userType == "admin"){

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          axios.post(vm.globalUrl + "getAllTickets", data).then((result)=>{
                vm.tickets = result.data;
                vm.filteredTickets = vm.tickets;
                vm.departments = vm.tickets.map((ticket)=>{
            var date = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY');
            var current = moment().format("dddd, MMMM DD, YYYY")
            if(date.isSame(current)){
              var newDate = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY h:mm:ss A').format("H")
              var hourString = newDate.toString()
              console.log(hourString)
              return hourString
            }
          })
          vm.departmentCounts = _.countBy(vm.departments);
          var labels = [];
          var data = [];
          for(var x in this.departmentCounts){
                labels.push(x)
                data.push(vm.departmentCounts[x])
          }
          console.log("these are the new labels and data")
          console.log(labels);
          console.log(data)
          vm.labels = labels;
          vm.data = data;
          console.log(this.labels)

            }).catch((error)=>console.log(error))


            axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
                vm.teams = result.data
            }).catch((error)=>vm.$toast.warning(error))
         }else if(user.userType == "departmentPower"){
          axios.post(vm.globalUrl + "getDepartmentTickets", data).then((result)=>{
                vm.tickets = result.data;
                vm.filteredTickets = vm.tickets;
                vm.departments = vm.tickets.map((ticket)=>{
            var date = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY');
            var current = moment().format("dddd, MMMM DD, YYYY")
            if(date.isSame(current)){
              var newDate = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY h:mm:ss A').format("H")
              var hourString = newDate.toString()
              console.log(hourString)
              return hourString
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
          vm.labels = labels;
          vm.data = data;
          console.log(this.labels)

            }).catch((error)=>console.log(error))



            axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
              console.log("these are the teams")
              console.log(result.data)
                vm.teams = result.data.filter((team)=>team.head && team.head.mailAddress == user.mailAddress)
            }).catch((error)=>vm.$toast.warning(error))
         }
            
            
         
           

        },

       methods:{
            filterDate(event, timeFrame){
                       var vm = this;
                       vm.timeFrame = timeFrame
                       var format;
                       if(timeFrame == 1){
                        format = "H"
                       }else if(timeFrame == 5 || timeFrame == 30){
                        format = "MMMM DD"
                       }else if(timeFrame > 30 && timeFrame <= 150){
                       
                        format = "MMMM"
                       }else if(timeFrame > 150 && timeFrame <= 365){
                        console.log("from year")
                        format = "MMMM"
                       }else if(timeFrame > 365){
                        format = "MMM YYYY"
                       }
                       var dateArray = vm.filteredTickets.map((ticket)=>ticket.actions[0].time);
                       console.log("date Array")
                       console.log(dateArray)
                       var sortedDateArray = dateArray.sort((a, b) => new Date(a) - new Date(b))
                       const filteredDates = sortedDateArray.filter(date => {
             // Use Moment.js to parse the date
                      const givenDate = new Date(date);

                      const currentDate = new Date();
                       console.log(givenDate)
                       // Calculate the difference between the date and the current date
                       var diffMilliSeconds = currentDate - givenDate;

                       console.log("this is the diff in milliseconds")
                       console.log(diffMilliSeconds)

                       const diffDays = Math.floor(diffMilliSeconds / (1000 * 60 * 60 * 24));
                       console.log("this is the difference in days")
                       console.log(diffDays)
                       console.log("this is the time frame")
                       console.log(timeFrame)
                     
                      // Exclude the time value and filter for dates within the last five years
                       if(timeFrame > diffDays){
                        return true
                       }
                       }).map(date => moment(date, 'dddd, MMMM DD, YYYY h:mm:ss A').format(format).toString());
                          
                       console.log("this is the filtered dates")
                       console.log(filteredDates)
                       vm.departmentCounts = _.countBy(filteredDates);
                     var labels = [];
                     var data = [];
                     for(var x in vm.departmentCounts){
                           labels.push(x)
                           data.push(vm.departmentCounts[x])
                     }
                     console.log(labels);
                     console.log(data)
                     vm.labels = labels;
                     vm.data = data;
                    
                     vm.options =  {...vm.options};



                     console.log(this.labels)
           
           },


           filterDepartment(event){
               var vm = this;
               var value = event.target.value;
             
               vm.label = value;
               vm.options =  {...vm.options};
               console.log("these are the filtered tickets before change")
               console.log(vm.filteredTickets)
               console.log("this is the filtered value");
               console.log(value)
               if(value != "all"){
                 vm.filteredTickets = vm.tickets.filter((ticket)=>{
                  if(ticket.hasService){
                    if(ticket.serviceType == value){
                      return ticket
                    }
                  }else{
                    if(ticket.department == value ){
                      return ticket
                    }
                  }
                 })

               }else{
                vm.filteredTickets = vm.tickets
               }
               console.log("this are the filtered tickets")
               console.log(vm.filteredTickets)
              this.filterDate(null, vm.timeFrame)
           },


           filterLocation(event){
            var vm = this;
            var location = event.target.value 
            console.log("this is the value")
            console.log(location)
            var tickets;

            if(location == 'all'){
              tickets = vm.tickets
            }else{
              tickets = vm.tickets.filter((ticket)=>ticket.location == location)
            }

            vm.filteredTickets = tickets;



            vm.departments = tickets.map((ticket)=>{
            var date = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY');
            var current = moment().format("dddd, MMMM DD, YYYY")
            if(date.isSame(current)){
              var newDate = moment(ticket.actions[0].time, 'dddd, MMMM DD, YYYY h:mm:ss A').format("H")
              var hourString = newDate.toString()
              console.log(hourString)
              return hourString
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
          vm.labels = labels;
          vm.data = data;
          console.log(this.labels)





           },

           getLocations(){
    var vm = this;
    axios.get(vm.globalUrl + "getLocations").then((result)=>{
      vm.locations = result.data
    }).catch((error)=>vm.$toast.warning(error))
  }
        }
  
        
      
    
  
        
  
      
    }
    </script>
    