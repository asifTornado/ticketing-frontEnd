<template>
 <div class="flex h-screen w-[90vw] items-center flex-col ml-[20px] bg-gray-200">
  <div class="flex flex-row justify-center w-full items-center h-[92vh]  app" >


   <div class="flex flex-row pl-[10vw] justify-center items-center relative  p-[50px] " style="z-index: 34;">

    <component class="bg-white shadow-md shadow-black p-[20px]" v-bind:is="currentComponent"></component>


   </div>


   <div class="flex flex-col   h-auto p-5 justify-start  items-center  ">

   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Line')">Total Tickets</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Total')">Tickets Distribution</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'TopTen')">Top Problems</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Current')">Current Tickets</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Resolution')">Ticket Resolution Time</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'Acceptance')">Ticket Acceptance Time</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'First')">Ticket Response Time</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'ResponseSLA')">Response SLA Breaches</button>
   <button class="bg-white shadow-md shadow-black  text-black  font-bold p-3 mb-2 w-52  rounded-sm  hover:bg-blue-500 hover:text-white" @click="switchComponent($event, 'ResolutionSLA')">Resolution SLA Breaches</button>

 </div>




  </div>


 
  
</div>

  </template>
  
  <script>

   import Line from "../../components/analytics/line.vue"
   import Acceptance from "../../components/analytics/acceptanceTable.vue"
   import First from "../../components/analytics/firstTable.vue"
   import Resolution from "../../components/analytics/resolutionTable.vue"
   import Current from "../../components/analytics/current.vue"
   import Total from "../../components/analytics/total.vue"
   import ResponseSLA from "../../components/analytics/responseSLA.vue"
   import ResolutionSLA from "../../components/analytics/resolutionSLA.vue"
   import TopTen from "../../components/analytics/topTen.vue"
   


   export default{
    data(){
      return {
        tickets:[],
        currentComponent:"Line"
      }
    },
    components:{Line, Acceptance, First, Resolution, Current, Total, ResponseSLA, ResolutionSLA, TopTen},

    methods:{
      switchComponent(event, Line){
        var vm = this;
        vm.currentComponent = Line;
      }
    }



   }
    
  </script>



<style scoped>
 @media print {
        #app{
          display: none;
        }

      

      
    }





</style>
  