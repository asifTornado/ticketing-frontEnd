<template>
<FilterDrawer/>
        
<div class="fixed w-[300px] h-[200px] overflow-y-scroll p-3 flex-col bg-yellow-100" id="tooltip" ref="tooltip" style="display:none; z-index: 99999999;">
         <div class="flex flex-row items-end w-full justify-end hover:cursor-pointer sticky top-0 " @click="hideProblemDetails" > <div class="flex flex-col justify-center" style="border-radius: 200%; width:20px; height:20px; background-color: black; padding: 2px;"> <font-awesome-icon icon="fa-solid fa-xmark" class="text-white"/></div></div>
        <div id="text" style="word-wrap: break-word; max-width:100%"></div>
        </div>

    
    
<div class=" flex flex-row   text-lg  h-[92vh] w-full ml-[30px]  bg-[rgb(248,248,248)]  "  id="app"  >


<div ref="sidePanel" class="flex flex-col h-[92vh] customborder absolute  bg-white ml-[20px]     py-10" style="z-index:99999999999999999999999999999999999999999"   v-if="mainStore.getSidePanelCheck" id="sidePanel" >

    <div @click="filter($event, 'my')" ref="my" :class="{selected:selectedItem == 'my', notSelected:selectedItem != 'my'}">
        <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

            <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export" class=" hover:cursor-pointer " /></div>
             <label class=" hover:cursor-pointer text-sm">Issues Raised By Me</label>
            
          </div>
          <label class=" hover:cursor-pointer text-sm ">{{ ticketStore.my.length }}</label>
         
     </div>
    
     <div @click="filter($event, 'approval')" ref="approval" :class="{selected:selectedItem == 'approval', notSelected:selectedItem != 'approval'}">
          <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

            <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbs-up" class=" hover:cursor-pointer " /></div>
             <label class=" hover:cursor-pointer  text-sm ">Issues Requiring My Approval</label>
            
          </div>
          <label class=" hover:cursor-pointer text-sm  ">{{ ticketStore.approval.length }}</label>
     </div>


     <!-- <div @click="filter($event, 'close')" ref="close" :class="{selected:selectedItem == 'close', notSelected:selectedItem != 'close'}">
          <div class="flex flex-row hover:cursor-pointer   w-full items-center">

            <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-import" class=" hover:cursor-pointer " /></div>
             <label class=" hover:cursor-pointer  text-sm ">Closed Requests For Me</label>
            
          </div>
          <label class=" hover:cursor-pointer  text-sm ">{{ closeRequestsForMe.length }}</label>
     </div> -->


     <div @click="filter($event, 'info')" ref="info" :class="{selected:selectedItem == 'info', notSelected:selectedItem != 'info'}">
          <div class=" hover:cursor-pointer flex flex-row  w-full items-center">

            <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-info" /></div>
             <label class=" hover:cursor-pointer text-sm  ">Information Requested From Me</label>
            
          </div>
          <label class=" hover:cursor-pointer  text-sm ">{{ ticketStore.infoMe.length }}</label>
     </div>

     <div @click="filter($event, 'closedTickets')" ref="closedTickets" :class="{selected:selectedItem == 'closedTickets', notSelected:selectedItem != 'closedTickets'}">
        <div class=" hover:cursor-pointer flex flex-row  w-full items-center">

          <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-quote-left" /></div>
           <label class=" hover:cursor-pointer  text-sm ">My Closed Issues</label>
          
        </div>
        <label class=" hover:cursor-pointer  text-sm ">{{ ticketStore.closedTickets.length }}</label>
   </div>


     <div @click="filter($event, 'mention')" ref="mention" :class="{selected:selectedItem == 'mention', notSelected:selectedItem != 'mention'}">
          <div class=" hover:cursor-pointer flex flex-row  w-full items-center">

            <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-quote-left" /></div>
             <label class=" hover:cursor-pointer  text-sm ">Mentions</label>
            
          </div>
          <label class=" hover:cursor-pointer  text-sm ">{{ ticketStore.mentions.length }}</label>
     </div>


     












</div>



<div class="h-[92vh]  bg-gray-200  flex flex-col items-center w-full mx-2 p-5">
    <div class="flex flex-row items-center justify-between  mb-2 w-full ">
        
        <div class=" text-2xl ml-[40vw] shadow-black shadow-md font-bold border border-solid border-gray-400 p-3 bg-white">{{ ticketStore.getSelectedItem() }}</div>
  
  
<div class="flex flex-row">     
    <div @click="this.downloadExcel" class="p-2 bg-white shadow-black shadow-md hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2 mr-2">Download As Excel<font-awesome-icon icon="fa-solid fa-table" class="ml-2"/></div> 
  <FilterButton/>
  <ClearButton/>
</div>
  
  </div>
    
  
    
    <div class=" relative overflow-x-auto bg-white shadow-md shadow-black  customerborder w-[90vw]  max-h-[80vh]   ">




    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 table-header2" style="z-index:1dxxd;">
        <tr>
            <th scope="col" class="px-6 py-3 table-header2" style="z-index: 1;">
                Issue No.
            </th>
       
            <th scope="col" class="px-6 py-3 table-header2">
                Req. Date
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
                Status
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
                problem
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
                Requester
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
                Current Handler
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="hover:bg-gray-200 hover:text-black hover:cursor-pointer"   v-for="(ticket, ticketCounter) in ticketStore.filteredTickets" :key="ticketCounter">
            <td @click="ticketStore.showDetails(ticket._id)"  scope="row" class=" table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                {{ ticket.number }}
            </td>
    
            <td @click="ticketStore.showDetails(ticket._id)"  class=" table-row2 px-6 py-4">
                {{ ticket.requestDate }}
            </td>
            <td  @click="ticketStore.showDetails(ticket._id)" class=" table-row2 px-6 py-4">
                {{ticket.status}}
            </td>
            <td @click="showProblemDetails($event)"  class=" table-row2 table-row2 py-3 text-center text-sm overflow-hidden text-ellipsis cursor-pointer whitespace-nowrap max-w-0 text-red-400">
                <div class="flex flex-row justify-center items-center underline">
                   
                    {{ticket.problemDetails}}</div>
            </td>
            <td @click="ticketStore.showDetails(ticket._id)"  class=" table-row2 px-6 py-4">
               {{ticket.raisedBy.empName}}
            </td>
            <td @click="ticketStore.showDetails(ticket._id)"  class=" table-row2 px-6 py-4">
               <template v-if="ticket.currentHandler">{{ ticket.currentHandler.empName }}</template> 
               <template  v-else>Not Available Yet</template> 
            </td>
        </tr>
       
      
     
    </tbody>
</table>
</div>

<Pagination @changePage="ticketStore.getTickets2"  ref="paginator" />

</div>




</div>


    
    
    
    </template>
    
    
    <script setup>
    import {useTicketStore} from '../../stores/ticket'
    import {useMainStore} from "../../stores/store"
    import {ref, onMounted} from "vue"
    import axios from 'axios'
    import { storeToRefs } from 'pinia';
    

    var mainStore = useMainStore()

    var currentPage = ref()

    var sidePanel = ref(null)

    var tooltip = ref(null)

    var ticketStore = useTicketStore()


    var {filter} = useTicketStore()


    ticketStore.getTickets2(1)
     

   function handlePageChange(page){
      console.log(`this is the page ${page}`)
   }


   function showProblemDetails(event){

    
        var cell = event.target
        var rect = cell.getBoundingClientRect();
    
        const topOffset = rect.top + window.scrollY;
        const leftOffset = rect.left + window.scrollX;

      
       var textElem = tooltip.value.querySelector('#text')
        textElem.innerText = cell.innerText

       tooltip.value.style.border = '2px solid black'
       tooltip.value.style.top = topOffset - 40 + 'px';
       tooltip.value.style.left = leftOffset - 40 + 'px';
       tooltip.value.style.display = 'block'

   }

    
   function sidePanelToggle(){

    if(sidePanel.value.style.width == "200px"){
                    sidePanel.value.style.width = "0px"
                    
                 }else{
                    sidePanel.value.style.width = "200px"
                 }
    
   }


   function hideProblemDetails(){

  
      
    
             tooltip.value.style.top = 'px';
             tooltip.value.style.left = '100px';   
             tooltip.value.style.display = 'none'

   }
    
//    
    
    
    
    </script>

    <style scoped>

.table-header2{
    font-size: 15px;
}


 #sidePanel div div  label{
   margin-right: 10px;
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
  box-shadow: 0px 2px 2px;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;

 }

 .notSelected:hover{
    cursor: pointer;
  background-color: rgb(237, 237, 237);
  border-right-width: 0.25rem; 
  border-right-style: solid;   
  border-right-color: #10B981;

 }

 table th{
    border-bottom:1px solid rgb(184, 181, 181);
    background-color: rgb(2,54,61);
    color:white;
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


 tbody tr td:hover{
  cursor: pointer;
 }
 


    </style>`