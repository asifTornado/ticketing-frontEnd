<template>


<div class="flex flex-wrap flex-col w-full  bg-gray-200 h-full py-[40px] px-[100px] " v-if="departments">

<div class="w-1/4 p-1/4 border-black p-[20px] border-2 border-solid bg-white shadow-md shadow-black" v-for="(department, departmentCounter) in departments">
    <div class="w-full font-bold text-2xl underline mb-[10px]">{{department.name}}</div>
<div class="flex flex-col w-full border border-solid border-black mb-[10px]" v-for="(member, memberCounter) in department.subordinates">
    <div class="flex flex-row w-full  bg-[rgb(2,54,61)]  text-white p-3">{{member.user.empName}}</div>
    <div class="flex flex-col w-full">   
        <div class="flex flex-row w-full p-[8px]">
            <div class="flex flex-row w-1/2 justify-center items-center">Currently Assigned</div>
            <div class="flex flex-row w-1/2 justify-center items-center">{{getAssigned(member.user)}}</div>
        </div>
        <div class="flex flex-row w-full p-[8px]">
            <div class="flex flex-row w-1/2 justify-center items-center">Total SLA breaches in the last 24 hours</div>
            <div class="flex flex-row w-1/2 justify-center items-center">{{getBreaches(member.user)}}</div>
        </div>
    </div>


</div>


</div>





</div>





</template>

<script setup>

import { useTicketStore } from '../../stores/ticket';
import { useUserStore } from '../../stores/users';
import { useMainStore } from '../../stores/store';
import { useAuthStore } from '../../stores/authentication';
import {useTeamStore} from '../../stores/team'
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../../stores/globalStore';
import axios from "axios"


var globalStore = useGlobalStore()
var {tickets, ticket} = storeToRefs(useTicketStore())
var {departments} = storeToRefs(useTeamStore())
var {user, token} = storeToRefs(useAuthStore())



function initiate(){

var data = new FormData();

data.append("user", JSON.stringify(user.value));

axios.post(globalStore.globalUrl + "getDepartmentsAndTickets", data).then((result)=>{
 
 tickets.value =result.data.tickets;
 departments.value = result.data.departments;
 console.log("these are the departments")


}).catch((error)=>{
 console.log(error)
})
}


function countObjectsWithTimeDifference(objects) {
  // Get the current time
  const currentTime = new Date();

  // Define the time difference threshold (40 minutes in milliseconds)
  const timeThreshold = 40 * 60 * 1000;

  // Filter objects based on the time difference
  const filteredObjects = objects.filter(obj => {
    // Convert the request date string to a Date object
    const requestDate = new Date(obj.requestDate);

    // Calculate the time difference
    const timeDifference = currentTime - requestDate;

    // Check if the time difference is within the threshold
    return timeDifference >= 0 && timeDifference <= timeThreshold;
  });

  // Return the count of filtered objects
  return filteredObjects.length;
}


function getBreaches(user){
    var tickets2 = tickets.value.filter((ticket)=>ticket.status == "Assigned" && ticket.currentHandler && ticket.currentHandler.empName == user.empName)
    var breaches = countObjectsWithTimeDifference(tickets2)
    return breaches
}


function getAssigned(user){
            var tickets2 = tickets.value.filter((ticket)=>ticket.status == "Assigned" && ticket.currentHandler && ticket.currentHandler.empName == user.empName)
            var length = tickets2.length
            return length
        }

initiate()


</script>
<!-- 
<script>
import axios from 'axios';

export default{
    data(){
        return {
         tickets:[],
         departments:[]
        }
    },

    created(){
   
        var vm = this;
        vm.$toast.info("Loading Data")
       var user = this.authStore.getUser;

       var data = new FormData();

       data.append("user", JSON.stringify(user));

       axios.post(vm.globalUrl + "getDepartmentsAndTickets", data).then((result)=>{
        console.log("these are the my team data")
        console.log(result.data)
        vm.tickets =result.data.tickets;
        vm.departments = result.data.departments;
        vm.$toast.clear()
        vm.$toast.success("Data Loaded")

       }).catch((error)=>{
        vm.$toast.warning(error)
       })
    },

    methods:{

        getAssigned(user){
            var tickets = this.tickets.filter((ticket)=>ticket.status == "Assigned" && ticket.currentHandler.empName == user.empName)
            var length = tickets.length
            return length
        }
    }
}



</script> -->