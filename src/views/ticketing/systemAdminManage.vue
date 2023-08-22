<template>
          <FilterDrawer/>
    
    <div class=" flex flex-row   text-lg  h-full w-full  bg-[rgb(248,248,248)]  " id="app"  >
 
 
     <div class="flex flex-col h-screen customborder  bg-white w-1/6      py-10" id="sidePanel" >
 
         <div @click="filter($event, 'all')"  :class="{selected:selectedItem == 'all', notSelected:selectedItem != 'all'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-border-all"  /></div>
                  <label class=" hover:cursor-pointer ">All Tickets</label>
                 
               </div>
               <label class=" hover:cursor-pointer ">{{ tickets.length }}</label>
          </div>
         
          <div @click="filter($event, 'unassigned')" :class="{selected:selectedItem == 'unassigned', notSelected:selectedItem != 'unassigned'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-tasks" class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer ">Unassigned Tickets</label>
                 
               </div>
               <label class=" hover:cursor-pointer ">{{ unassigned.length }}</label>
          </div>
 
 
          <div @click="filter($event, 'assigned')" :class="{selected:selectedItem == 'assigned', notSelected:selectedItem != 'ssssssssassigned'}">
               <div class="flex flex-row hover:cursor-pointer   w-full items-center">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer ">Assigned Tickets</label>
                 
               </div>
               <label class=" hover:cursor-pointer ">{{ assigned.length }}</label>
          </div>
 
 
          <div @click="filter($event, 'accepted')" :class="{selected:selectedItem == 'accepted', notSelected:selectedItem != 'accepted'}">
               <div class=" hover:cursor-pointer flex flex-row  w-full items-center">
 
                 <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-check" /></div>
                  <label class=" hover:cursor-pointer ">Accepted Tickets</label>
                 
               </div>
               <label class=" hover:cursor-pointer ">{{ accepted.length }}</label>
          </div>
 
 
          <div @click="filter($event, 'approval')" :class="{selected:selectedItem == 'approval', notSelected:selectedItem != 'approval'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack" class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer ">Tickets Awaiting Higher Approval</label>
                 
               </div>
               <label  class=" hover:cursor-pointer ">{{ approval.length }}</label>
          </div>
 
 
          
          <div @click="filter($event, 'close')" :class="{selected:selectedItem == 'close', notSelected:selectedItem != 'close'}">
               <div class="flex flex-row  w-full items-center hover:cursor-pointer ">
 
                 <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export"  class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer ">My Close Requests</label>
                 
               </div>
               <label class=" hover:cursor-pointer " >{{ myCloseRequests.length }}</label>
          </div>
 
 
          <div @click="filter($event, 'info')"  :class="{selected:selectedItem == 'info', notSelected:selectedItem != 'info'}">
               <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">
 
                 <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-question" class=" hover:cursor-pointer " /></div>
                  <label class=" hover:cursor-pointer ">Information Requested By Me</label>
                 
               </div>
               <label class=" hover:cursor-pointer ">{{ infoMe.length }}</label>
          </div>




         
 
 
 
 
 
 
 
 
     </div>
 
 <div class="h-[100vh] p-2  bg-[rgb(248,248,248)] flex flex-col w-5/6 mx-2">
    <div class="flex flex-row items-end justify-end "> <div @click="this.downloadExcel" class="p-2 bg-white hover:cursor-pointer border border-solid border-gray-400 rounded-sm  mb-2 mr-2">Download As Excel<font-awesome-icon icon="fa-solid fa-table" class="ml-2"/></div>  <FilterButton/></div>
     <div class="   overflow-x-auto   mx-2 customerborder w-full   overflow-y-scroll" style="max-height: 80vh; min-height: auto;">
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
             <tr>
                
                 <th scope="col" class="table-header2 px-6 py-3">
                     Ticket No.
                 </th>
                 <th scope="col" class="table-header2 px-6 py-3">
                     Priority
                 </th>
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
             <tr  :class="setRowColor(ticket.priority)" v-for="(ticket, ticketCounter) in sortedTickets" :key="ticketCounter">
                 
                <th  @click="showDetails(ticket._id)" scope="row" class="table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {{ ticket.number }}
                 </th>
                 <th  @click="showDetails(ticket._id)" scope="row" class="table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {{ ticket.priority }}
                 </th>
                 <td  @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                     {{ ticket.requestDate }}
                 </td>
                 <td  @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                     {{ticket.status}}
                 </td>
                 <td class="table-row2 px-6 py-4">
                     {{ticket.problemDetails}}
                 </td>
                 <td class="table-row2 px-6 py-4">
                    {{ticket.raisedBy.empName}}
                 </td>
                 <td  @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                    <template v-if="ticket.currentHandler">{{ ticket.currentHandler.empName }}</template> 
                 </td>
             </tr>
            
           
          
         </tbody>
     </table>
 </div></div>
  
 
 
     
    </div>
     
     
     
     
     
     </template>
     
     
     <script >
 
     import axios from 'axios'
     import * as XLSX from 'xlsx'
   
     
     
     export default{
         data(){
             return {
                approval:0,
                assigned:0,
                my:0,
                myCloseRequests:[],
                closeRequestsForMe:[],
                info:[],
                reject:[],
                infoMe:[],
                tickets:[],
                unassigned:[],
                accepted:[],
                filteredTickets:[],
                rejected:[],
                closed:[],
                assignedMe:[],
                sort:[ "emergency", "high", "medium", "normal",],
                selectedItem:null
             }
         },


         computed:{
            sortedTickets(){
                var vm = this;
             var tickets = vm.mainStore.getFilteredTickets
             tickets.sort(vm.comparator)
             console.log("these are the sorted Tickets")
             console.log(tickets)
             return tickets
            }

        },
 
 
         created(){
             this.$toast.info("Loading Data....")
             var vm = this;
             var token = this.authStore.getToken
             var user = this.authStore.getUser
             var data = new FormData();
             data.append("token", token);
             data.append("user", JSON.stringify(user));
               axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
             axios.post(vm.globalUrl + 'getAllTickets', data).then((result)=>{
                vm.tickets = result.data
                vm.filteredTickets = vm.tickets
                vm.mainStore.setTickets(vm.tickets)
                vm.mainStore.setFilteredTickets(vm.tickets)
                vm.unassigned = vm.tickets.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead &&  ticket.status != 'Submitted Ticket - Seeking Supervisor Approval' && ticket.status != "Closed Ticket")
                vm.accepted = vm.tickets.filter((ticket)=>ticket.currentHandler && ticket.accepted == true && ticket.assigned == true && ticket.assignedTo )
                vm.assigned = vm.tickets.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead &&  ticket.currentHandler != null && ticket.accepted == false)
                vm.approval = vm.tickets.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  &&  ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
                vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.madeCloseRequest == true && ticket.prevHandler );
                vm.info = vm.tickets.filter((ticket)=>ticket.ask == true && ticket.ticketingHead )
                vm.assignedMe = vm.tickets.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.empName == user.empName && ticket.accepted != true)
                vm.rejected = vm.tickets.filter((ticket)=>ticket.status == "Rejected")
                vm.closed = vm.tickets.filter((ticket)=>ticket.status == "Closed Ticket")
                vm.$toast.clear()
                vm.$toast.success("Data Loaded Successfully")
             }).catch((error)=>{
                 vm.$toast.clear()
                 console.log("this is the error")
                 vm.$toast.warning(error)
             })
         },
 
       
         
         methods:{

            selectItem(item) {
      if (this.selectedItem === item) {
        this.selectedItem = null; // Deselect the item if already selected
      } else {
        this.selectedItem = item; // Select the clicked item
      }
    },

            comparator(a, b){
     
     var vm = this;
     console.log('this is the a priority')
     console.log(a.priority)
     var index1 = vm.sort.indexOf(a.priority)
     var index2 = vm.sort.indexOf(b.priority)
 
     console.log("this is index 1")
     console.log(index1)
     
     console.log("this is the index")
     console.log(parseInt(a)-parseInt(b))
     console.log(a)
     console.log(b)
 
     return index1 - index2
  },


  
  setRowColor(priority){
        if(priority == 'emergency'){
            return "bg-red-200 hover:bg-red-200 hover:cursor-pointer"
        }else if(priority == 'high'){
            return "bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer"
        }else if(priority == 'normal'){
            return "bg-green-100 hover:bg-green-200 hover:cursor-pointer"
        }else if(priority == 'medium'){
            return "bg-orange-100 hover:bg-orange-200 hover:cursor-pointer"
        }else if(priority == null || priority == '' || priority == undefined){
            return "bg-white hover:bg-gray-200 hover:cursor-pointer"
        }
     },
 
 
             filter(event, type){
 
                 var vm = this;
                 vm.selectItem(type);
                 
                 switch(type){
                     case "unassigned":
                         vm.mainStore.setFilteredTickets(vm.unassigned)
                         vm.mainStore.setInitialTickets(vm.unassigned)
                         break;
                     case "assigned":
                     vm.mainStore.setFilteredTickets(vm.assigned)
                     vm.mainStore.setInitialTickets(vm.assigned)
                         break;
                     case "accepted":
                     vm.mainStore.setFilteredTickets(vm.accepted)
                     vm.mainStore.setInitialTickets(vm.accepted)
                         break;
                     case "approval":
                     vm.mainStore.setFilteredTickets(vm.approval)
                     vm.mainStore.setInitialTickets(vm.approval)
                         break;
                     case "info":
                     vm.mainStore.setFilteredTickets(vm.info)
                     vm.mainStore.setInitialTickets(vm.info)
                         break;
                     case "close":
                     vm.mainStore.setFilteredTickets(vm.myCloseRequests)
                     vm.mainStore.setInitialTickets(vm.myCloseRequests)
                         break;
                     case "all":
                     vm.mainStore.setFilteredTickets(vm.tickets)
                     vm.mainStore.setInitialTickets(vm.tickets)
                         break;
                    case "rejected":
                    vm.mainStore.setFilteredTickets(vm.rejected)
                    vm.mainStore.setInitialTickets(vm.rejected)
                        break;
                    case "closed":
                    vm.mainStore.setFilteredTickets(vm.closed)
                    vm.mainStore.setInitialTickets(vm.closed)
                        break;
                 }
             },
 
 
             showDetails(id){
                var vm = this;
                const componentUrl ="/ticketing/ticketDetails/" + id;
            
                this.$router.push(componentUrl);
                 },


         
         }
     
     
     
     }
     
     
     
     
     </script>
 
 
 <style scoped>
 
 
 .table-header2{
     font-size: 12px;
 }
 
 .table-row2{
     font-size:10px
 }


 #sidePanel div div  label{
    font-size:10px;
    margin-right: 12px;
 }

 #sidePanel div  label{
    font-size:10px;
    
 }


 #sidePanel div{
    padding-top:4px;
    padding-bottom: 4px;
    align-items: center;
 }


 .selected{
    background-color: rgb(237,237,237);
   border-right: 4px solid #34d399;
   display:flex;
   flex-direction: row;
   justify-content:space-around;
   justify-items: center;
   width:100%;
   padding-left:20px;
   padding-right:20px;


 }



 .notSelected{
    display:flex;
   flex-direction: row;
   justify-content:space-around;
   justify-items: center;
   width:100%;
   padding-left:20px;
   padding-right:20px;
   
 }

 .notSelected:hover{
   background-color: rgb(237,237,237);
   border-right: 4px solid #34d399;
   display:flex;
   flex-direction: row;
   justify-content:space-around;
   justify-items: center;
   width:100%;
   padding-left:20px;
   padding-right:20px;

 }
 
 
 </style>