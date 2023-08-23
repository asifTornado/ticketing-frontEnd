<template>
 
  <div class="flex flex-row justify-center items-start pt-10 ">


   <div class="flex flex-row justify-center items-center relative ml-2" style="z-index: 34;">

    <component v-bind:is="currentComponent"></component>


   </div>


   <div class="flex flex-col   h-auto p-5 justify-start  items-center shadow-md shadow-black">

   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Line')">Total Tickets</button>
   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Total')">Tickets Distribution</button>
   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Current')">Current Tickets</button>
   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Resolution')">Ticket Resolution Time</button>
   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Acceptance')">Ticket Acceptance Time</button>
   <button class="text-black border-2 border-solid border-black font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'First')">Ticket Response Time</button>

 </div>




  </div>
  


  </template>
  
  <script>
   import axios from "axios"
   import Line from "../../components/analytics/line.vue"
   import Acceptance from "../../components/analytics/acceptanceTable.vue"
   import First from "../../components/analytics/firstTable.vue"
   import Resolution from "../../components/analytics/resolutionTable.vue"
   import Current from "../../components/analytics/current.vue"
   import Total from "../../components/analytics/total.vue"
   


   export default{
    data(){
      return {
        tickets:[],
        currentComponent:"Line"
      }
    },
    components:{Line, Acceptance, First, Resolution, Current, Total},

    methods:{
      switchComponent(event, Line){
        var vm = this;
        vm.currentComponent = Line;
      }
    }



   }
    
  </script>
  