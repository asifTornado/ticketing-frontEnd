<template>

    <div class="fixed w-[300px] h-[200px] overflow-y-scroll p-3 flex-col bg-yellow-100" id="tooltip" ref="tooltip" style="display:none; z-index:999">
        <div class="flex flex-row items-end w-full justify-end hover:cursor-pointer sticky top-0 " @click="hideProblemDetails" > <div class="flex flex-col justify-center" style="border-radius: 200%; width:20px; height:20px; background-color: black; padding: 2px;"> </div></div>
       <div id="text" style="word-wrap: break-word; max-width:100%"></div>
       </div>
    <FilterDrawer />
    <div class=" flex flex-row  ml-[30px]  text-lg  h-[92vh] w-full  bg-gray-400 " id="app"   v-if="tickets">
 
 
     <div class="flex flex-col h-screen customborder  bg-white ml-[20px]   absolute   " id="sidePanel" style="z-index: 999999999999999;"  v-if="mainStore.sidePanelCheck">
 
         <div @click="filter($event, 'all')"  :class="{selected:selectedItem == 'all', notSelected:selectedItem != 'all'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-border-all" class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer text-sm ">All Issues</label>
                 
               </div>
               <label class=" hover:cursor-pointer text-sm">{{ tickets.length }}</label>
          </div>
         
      
          

          <div @click="filter($event, 'unassigned')"  :class="{selected:selectedItem == 'unassigned', notSelected:selectedItem != 'unassigned'}">
            <div class=" hover:cursor-pointer flex flex-row  w-full items-center">

              <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-check" /></div>
               <label class=" hover:cursor-pointer text-sm">Unassigned Issues</label>
              
            </div>
            <label class=" hover:cursor-pointer text-sm">{{unassigned.length}}</label>
       </div>



 
          <div @click="filter($event, 'assigned')"  :class="{selected:selectedItem == 'assigned', notSelected:selectedItem != 'assigned'}">
               <div class="flex flex-row hover:cursor-pointer   w-full items-center">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer text-sm">Issues Assigned To Me</label>
                 
               </div>
               <label class=" hover:cursor-pointer text-sm">{{ assigned.length }}</label>
          </div>
 
 
       
 
        
 
 
          
          <!-- <div @click="filter($event, 'close')" ref="close" :class="{selected:selectedItem == 'close', notSelected:selectedItem != 'close'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export"  class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer text-sm">My Close Requests</label>
                 
               </div>
               <label class=" hover:cursor-pointer text-sm" >{{ myCloseRequests.length }}</label>
          </div>
  -->
 
          <div @click="filter($event, 'info2')"   :class="{selected:selectedItem == 'info', notSelected:selectedItem != 'info'}">
               <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">
 
                 <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-question" class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer text-sm">Information Requested By Me</label>
                 
               </div>
               <label class=" hover:cursor-pointer text-sm">{{ infoMe.length }}</label>
          </div>
 
 
 
 
 
 
 
     </div>
 
 <div class="h-[92vh]  bg-gray-200 flex flex-col items-center w-full mx-2 p-5">
    





    <div class="flex flex-row w-full  items-center justify-between ">
        
    <div class="ml-[400px] mb-[10px] border border-solid ml-[40vw] border-black shadow-md shadow-black text-2xl bg-white p-[10px] font-bold">{{ getSelectedItem() }}</div>


<div class="flex flex-row">
    <div class="flex flex-row">  <div @click="downloadExcel" class="p-2 bg-white shadow-md shadow-black hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2 mr-2">
    Download As Excel<font-awesome-icon icon="fa-solid fa-table" class="ml-4"/>
</div>  
<FilterButton/>
<ClearButton/>
</div>
</div>
</div>
     <div class="relative overflow-x-auto bg-white   mx-2 shadow-md shadow-black customerborder w-[90vw]  max-h-[80vh] overflow-y-scroll">
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
             <tr>
                 <th scope="col" class="table-header2 px-6 py-3">
                     Issue No.
                 </th>
                 <!-- <th scope="col" class="px-6 py-3 table-header2">
                Priority
                 </th> -->
                 <th scope="col" class="table-header2 px-6 py-3">
                     Req. Date
                 </th>
                 <th scope="col" class="table-header2 px-6 py-3">
                     Status
                 </th>
                 <th scope="col" class="table-header2 px-6 py-3">
                     problem
                 </th>
                 <th scope="col" class="table-header2 px-6 py-3">
                     Requester
                 </th>
                 <th scope="col" class="table-header2 px-6 py-3">
                     Current Handler
                 </th>
             </tr>
         </thead>
         <tbody>
             <tr  class="hover:bg-gray-200 hover:text-black hover:cursor-pointer" v-for="(ticket, ticketCounter) in sortedTickets" :key="ticketCounter">
                 <td @click="showDetails(ticket._id)" scope="row" class="cursor-pointer table-row2 px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                     {{ ticket._id }}
                 </td>
                 <!-- <td @click="showDetails(ticket._id)"  scope="row" class=" table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ ticket.priority.priority }}
            </td> -->
                 <td   @click="showDetails(ticket._id)"  class="cursor-pointer table-row2 px-6 py-4">
                     {{ ticket.requestDate }}
                 </td>
                 <td   @click="showDetails(ticket._id)" class="cursor-pointer table-row2 px-6 py-4">
                     {{ticket.status}}
                 </td>
                 <td class="cursor-pointer table-row2 py-3 text-center text-sm overflow-hidden text-ellipsis cursor-pointer whitespace-nowrap max-w-0 text-red-400">
                    <div class=" px-4  items-center underline "  @click="showProblemDetails" >
                        
                        {{ticket.problemDetails}}</div>
                 </td>
                 <td   @click="showDetails(ticket._id)" class="cursor-pointer table-row2 px-6 py-4">
                    {{ticket.raisedBy.empName}}
                 </td>
                 <td  @click="showDetails(ticket._id)"  class="cursor-pointer table-row2 px-6 py-4">
                    <template v-if="ticket.currentHandler">{{ ticket.currentHandler.empName }}</template> 
                    <template  v-else>Not Available Yet</template> 
                 </td>
              
             </tr>
            
           
          
         </tbody>
     </table>
 </div>

 <Pagination @changePage="getTickets3" ref="paginator"/>

</div>
  
 
 
     
    </div>
     
     
     
     
     
     </template>
     
     
     <script  setup>
     import {ref, onMounted, onBeforeMount} from 'vue'
     import axios from 'axios'
     import { useTicketStore } from '../../stores/ticket';
     import { storeToRefs } from 'pinia';
     import {useMainStore} from '../../stores/store'
     
     
     var mainStore = useMainStore()
     

  

    var sidePanel = ref(null)

    var tooltip = ref(null)


     var ticketStore = useTicketStore()
   
     
     var {showDetails, filter, getSelectedItem, getTickets3} = useTicketStore()


     var {sortedTickets, tickets, unassigned, assigned, infoMe, selectedItem, filteredTickets, itemsPerPage, currentPage} =  storeToRefs(useTicketStore())
     

   getTickets3(1)


    function handlePageChanged(page){
                currentPage.value = page;
                
    }
    
    
    
  



    function showProblemDetails(event){
 
        var cell = event.target
        var rect = cell.getBoundingClientRect();
       
        const topOffset = rect.top + window.scrollY;
        const leftOffset = rect.left + window.scrollX;
       
       var tooltip = tooltip.value
       var textElem = tooltip.value.querySelector('#text')
        textElem.innerText = cell.innerText
       
       tooltip.style.border = '2px solid black'
       tooltip.style.top = topOffset - 40 + 'px';
       tooltip.style.left = leftOffset - 40 + 'px';
       tooltip.style.display = 'block'
}
     

 
 
       
 
    
     
            




    
    function hideProblemDetails(event){
        
      
    
       tooltip.value.style.top = 'px';
       tooltip.value.style.left = '100px';   
       tooltip.value.style.display = 'none'
     }


  

 
 
           
 
 


          
     
     
     
     
     </script>
 
 
 <style scoped>
 
 
 .table-header2{
     font-size: 15px;
 }



 
 .table-row2{
     font-size:15px
 }

 #sidePanel div div  label{
   margin-right: 10px;
 }

 table th{
    border-bottom:1px solid gray;
    background-color: rgb(2,54,61);
    color:white
 }

 table td {
    border-bottom: 1px solid gray;
 }


 #sidePanel{
    background-color:rgb(195, 212, 214);
    padding:4px;
    border-right:1px solid gray
 }
 

 #sidePanel div{
   background-color: white;
   
   margin-bottom: 5px;

 }

 .selected{
    display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1.25rem; 
  cursor: default;
  background-color: transparent;
  border: none;
 
  background-color: rgb(237, 237, 237);
  border-right-width: 0.25rem; 
  border-right-style: solid;  
  border-right-color: #10B981;
  margin-top: 1vh;
  box-shadow: 0px 2px 2px ;
  font-weight: bold;


 }



 .notSelected{
    display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1.25rem; 
  cursor: default;
  background-color: transparent;
  border: none;
  margin-top: 1vh;
  box-shadow: 0px 2px 2px ;
  font-weight: bold;

 }

 .notSelected:hover{
    cursor: pointer;
  background-color: rgb(237, 237, 237);
  border-right-width: 0.25rem; 
  border-right-style: solid;   
  border-right-color: #10B981;

 }
 
 </style>