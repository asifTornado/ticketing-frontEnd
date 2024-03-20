<template>
<div style="z-index: 1231240129381209318023981203982;" class="border pb-10 overflow-y-scroll border-solid border-black fixed h-[100vh] w-[30vw] bg-white right-0 p-10 flex flex-col overflow-y-scrolltick" v-if="mainStore.filterCheck == true">
<div class="flex flex-row justify-between items-center mb-10"><label for="" class="text-3xl ">Filter</label>
<font-awesome-icon icon="fa-solid fa-multiply " class="hover:cursor-pointer" size="2x" @click="toggleFilter"/>
</div>
<input  class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"  @change="setFilter($event, 'number')"  placeholder="Ticket Number"/>
<input type="text" onfocus="(this.type = 'date')" @change="setFilter($event, 'dateFrom')"  onblur="(this.type='text')"  class='p-3 mb-4 border border-solid border-gray-400 rounded-sm w-full ' placeholder="From Date">
<input type="text" name="" id="" class='p-3 mb-4 border border-solid border-gray-400 rounded-sm w-full ' @change="setFilter($event, 'dateTo')" onfocus="(this.type = 'date')"  onblur="(this.type='text')" placeholder="To Date">
<select class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"  @change="setFilter($event, 'serviceType')"  placeholder="Service Type">
<option value="" selected  >Service Type</option>
<option :value="serviceType" v-for="(serviceType, serviceTypeCounter) in serviceTypes" :key="serviceTypeCounter">{{ serviceType }}</option>
</select>
<select class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"  @change="setFilter($event, 'status')"  placeholder="Status">
<option value="" selected >Status</option>
<option value="Ticket Submitted">Ticket Submitted</option>

<option value="Ticket Submitted - Seeking Additional Approval">Ticket Submitted - Seeking Additional Approval</option>
<option value="Ticket Submitted - Additional Approval Given">Ticket Submitted - Additional Approval Given</option>
<option value="Assigned">Assigned</option>


<option value="Open (Seeking Information...)">Open (Seeking Information...)</option>
<option value="Open (Information Sent)">Open (Information Sent)</option>

<option value="Closed Ticket">Closed Ticket</option>
<option value="Rejected">Rejected</option>
</select>



<input list="raisers" class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"  @change="setFilter($event, 'raisedBy')"  placeholder="Raised By"/>
<input list="raisers" class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4" @change="setFilter($event, 'assignedTo')"  placeholder="Assigned To"/>
<input list="raisers" class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4" @change="setFilter($event, 'raisedFor')"  placeholder="Raised For"/>
<datalist id="raisers"  class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"   >
    <option :value="user.empName" v-for="(user, userCounter) in users">{{ user.empName }}</option>

</datalist >


<div class="flex flex-row justify-center items-center hover:cursor-pointer " @click="filter()"><div class="p-2 mb-20 bg-blue-500 border border-solid border-blue-900 text-white rounded-sm text-lg ">Apply Filters</div></div>

</div>
</template>


<script setup>
import axios from 'axios'
import {ref, onMounted, defineProps} from 'vue'

import { useGlobalStore } from '../stores/globalStore';
import { useMainStore } from '../stores/store';
import { useTicketStore } from '../stores/ticket';

var filters = ref([])
var tickets = ref([])
var serviceTypes = ref([])
var users = ref([])
var globalStore = useGlobalStore()
var mainStore = useMainStore()
var ticketStore = useTicketStore()


var props = defineProps(["paginator"])


function toggleFilter(){
            mainStore.toggleFilter()
        }


function getserviceTypes(){
            
            axios.post(globalStore.globalUrl+'getTeams').then((result)=>{
                var serviceTypes2 = []

                for(var team of result.data){
                    if(team.hasServices){
                        for(var service of team.services){
                            serviceTypes2.push(service.serviceName)
                        }
                    }else{
                        serviceTypes2.push(team.name)
                    }
                }

                serviceTypes.value = serviceTypes2
        
           })
            
           }


function getUsers(){
           
            axios.post(globalStore.globalUrl + 'getUsers').then((result)=>{
                  users.value  = result.data
            }).catch((error)=>{
                console.log(error)
            })
           }


function setFilter(event, type){
            filters.value = filters.value.filter((filter)=>filter.type != type )
            if(event.target.value == ""){
                return
            }
            var newFilter = {value:event.target.value, type:type}
            filters.value.push(newFilter)
            
        }


function filter(){
           
           var tickets = ticketStore.initialTickets
           console.log("these are the initial tickets")
           console.log(tickets)
           var filteredTickets = tickets
   

           if(filters.value.length < 1){
            ticketStore.filteredTickets = tickets
            // ticketStore.paginator.onClickHandler(1)
            return
           }
    
           for(var filter of filters.value){
                    if(filter.type == "dateFrom"){
                    
                        filteredTickets = filteredTickets.filter((ticket)=> {
                            var ticketDateFrom = new Date(ticket.requestDate).getTime()
                            var result = new Date(ticket.requestDate).getTime() > new Date(filter.value).getTime()
                     
                   
                            return result
                        })
    
                    }else if(filter.type == "dateTo"){
                  
                        filteredTickets = filteredTickets.filter((ticket)=>new Date(ticket.requestDate).getTime() < new Date(filter.value).getTime())
                    }else if(filter.type == "status"){
             
                       filteredTickets = filteredTickets.filter((ticket)=>ticket.status == filter.value)
                    
                   }else if(filter.type == 'serviceType'){
             
                       filteredTickets = filteredTickets.filter((ticket)=>ticket.department == filter.value || ticket.servieType == filter.value)
                   }else if(filter.type == 'raisedBy'){
                     filteredTickets = filteredTickets.filter((ticket)=>ticket.raisedBy.empName == filter.value)
                   }else if(filter.type == 'assignedTo'){
                    filteredTickets = filteredTickets.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.empName == filter.value)
                   }else if(filter.type == 'raisedFor'){
                    filteredTickets = filteredTickets.filter((ticket)=>ticket.raisedFor && ticket.raisedFor.empName == filter.value)
                   }else if(filter.type == 'number'){
                    var number = parseInt(filter.value, 10)
                    filteredTickets = filteredTickets.filter((ticket)=>ticket.number == number)
                   }
        }


          
            ticketStore.filteredTickets = filteredTickets
            // ticketStore.paginator.onClickHandler(1)
            
            
           }

getUsers()
getserviceTypes()


</script>