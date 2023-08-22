<template>
    <FilterDrawer/>
  
  <div class="fixed w-[300px] h-[200px] overflow-y-scroll p-3 flex-col bg-yellow-100" id="tooltip" ref="tooltip" style="display:none">
       <div class="flex flex-row items-end w-full justify-end hover:cursor-pointer sticky top-0 " @click="hideProblemDetails" > <div class="flex flex-col justify-center" style="border-radius: 200%; width:20px; height:20px; background-color: black; padding: 2px;"> <font-awesome-icon icon="fa-solid fa-xmark" class="text-white"/></div></div>
      <div id="text" style="word-wrap: break-word; max-width:100%"></div>
      </div>
  
  <div class=" flex flex-row   text-lg  h-[90vh] w-[95vw]  bg-[rgb(248,248,248)]  " id="app"  >


   <div class="flex flex-col h-screen customborder  bg-white w-1/6      py-10" id="sidePanelMain">

       <div @click="filter($event, 'all')" class="flex flex-row justify-around items-center w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

               <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-border-all" class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">All Tickets</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ tickets.length }}</label>
        </div>
       
        <div @click="filter($event, 'unassigned')" class="flex flex-row justify-around items-center w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

               <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-tasks" class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">Unassigned Task</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ unassigned.length }}</label>
        </div>


        <div @click="filter($event, 'assigned')" class="flex flex-row justify-around w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row hover:cursor-pointer   w-full items-center">

               <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">Assigned Task</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ assigned.length }}</label>
        </div>


        <div @click="filter($event, 'accepted')" class=" hover:cursor-pointer flex flex-row justify-around w-full px-5  hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class=" hover:cursor-pointer flex flex-row  w-full items-center">

               <div class=" hover:cursor-pointer w-1/6"><font-awesome-icon icon=" hover:cursor-pointer fa-solid fa-check" /></div>
                <label class=" hover:cursor-pointer ">Accepted Task</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ accepted.length }}</label>
        </div>


        <div @click="filter($event, 'approval')" class="flex flex-row justify-around w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

               <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack" class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">Tickets Awaiting Higher Approval</label>
               
             </div>
             <label  class=" hover:cursor-pointer ">{{ approval.length }}</label>
        </div>


        
        <div @click="filter($event, 'close')" class="flex flex-row justify-around w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

               <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export"  class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">My Close Requests</label>
               
             </div>
             <label class=" hover:cursor-pointer " >{{ myCloseRequests.length }}</label>
        </div>


        <div @click="filter($event, 'info')"  class="flex flex-row justify-around w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">

               <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-question" class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">Information Requested By Me</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ infoMe.length }}</label>
        </div>


        <div @click="filter($event, 'closed')"  class="flex flex-row justify-around w-full px-5 hover:cursor-pointer hover:bg-[rgb(237,237,237)] hover:border-r-4 hover:border-solid hover:border-r-emerald-500">
             <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">

               <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-lock" class=" hover:cursor-pointer " /></div>
                <label class=" hover:cursor-pointer ">Closed Tickets</label>
               
             </div>
             <label class=" hover:cursor-pointer ">{{ closed.length }}</label>
        </div>







   </div>


   <div class="h-[100vh]  bg-[rgb(248,248,248)] flex flex-col w-5/6 mx-2">  
<div class="flex flex-row items-end justify-end "> <div @click="this.downloadExcel" class="p-2 bg-white hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2 mr-2"><font-awesome-icon icon="fa-solid fa-table" class="mr-2"/>Download As Excel</div>  <FilterButton/></div>
  <div class="   overflow-x-auto   mx-2 customerborder w-full   overflow-y-scroll" style="max-height: 80vh; min-height: auto;">
     
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
          <tr  :class="setRowColor(ticket.priority)" v-for="(ticket, ticketCounter) in sortedTickets"  :key="ticketCounter">
              <th @click="showDetails(ticket._id)"  scope="row" class="table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ ticket._id }}
              </th>
              <th @click="showDetails(ticket._id)"  scope="row" class="table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ ticket.priority }}
              </th>
              <td @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                  {{ ticket.requestDate }}
              </td>
              <td @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                  {{ticket.status}}
              </td>
              <td @click="showProblemDetails($event)"  class="table-row2 py-3 text-center text-sm overflow-hidden text-ellipsis cursor-pointer whitespace-nowrap max-w-0 text-red-400">
                  {{ticket.problemDetails}}
              </td>
              <td @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
                 {{ticket.raisedBy.empName}}
              </td>
              <td @click="showDetails(ticket._id)" class="table-row2 px-6 py-4">
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
              closed:[],
              sort:[ "emergency", "high", "medium", "normal",]
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
              vm.mainStore.setFilteredTickets(vm.filteredTickets)
              vm.unassigned = vm.tickets.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead &&  ticket.status != 'Submitted Ticket - Seeking Supervisor Approval' && ticket.status != "Closed Ticket")
              vm.accepted = vm.tickets.filter((ticket)=>ticket.currentHandler && ticket.accepted == true && ticket.assigned == true && ticket.status != "Closed Ticket" && ticket.status != "Close Requested" )
              vm.assigned = vm.tickets.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead &&  ticket.currentHandler != null && ticket.accepted == false && ticket.status != "Closed Ticket")
              vm.approval = vm.tickets.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress && ticket.status != "Closed Ticket")
              vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.madeCloseRequest == true && ticket.status != "Closed Ticket"  );
              vm.info = vm.tickets.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.status != "Closed Ticket"  )
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
            return "bg-red-100 hover:bg-red-200 hover:cursor-pointer"
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
               var store = vm.mainStore
               
               switch(type){
                   case "unassigned":
                       store.setFilteredTickets(vm.unassigned)  
                       store.setInitialTickets(vm.unassigned)
                       break;
                   case "assigned":
                       store.setFilteredTickets(vm.assigned) 
                       store.setInitialTickets(vm.assigned) 
                       break;
                   case "accepted":
                       store.setFilteredTickets(vm.accepted) 
                       store.setInitialTickets(vm.accepted) 
                       break;
                   case "approval":
                       store.setFilteredTickets(vm.approval)  
                       store.setInitialTickets(vm.approval)
                       break;
                   case "info":
                       store.setFilteredTickets( vm.info) 
                       store.setInitialTickets(vm.info)
                       break;
                   case "close":
                       store.setFilteredTickets(vm.myCloseRequests)  
                       store.setInitialTickets(vm.myCloseRequests)
                       break;
                  case "closed":
                      console.log("fired closed")
                      store.setFilteredTickets(vm.closed)  
                      store.setInitialTickets(vm.closed)
                      break;
                   case "all":
                       store.setFilteredTickets(vm.tickets)  
                       store.setInitialTickets(vm.tickets)
                       break;
               }
           },


           showDetails(id){
              var vm = this;
              const componentUrl ="/ticketing/ticketDetails/" + id;
          
              this.$router.push(componentUrl);
               },


               showProblemDetails(event){
      console.log('entered show problem details')
      var cell = event.target
      var rect = cell.getBoundingClientRect();
  
      const topOffset = rect.top + window.scrollY;
      const leftOffset = rect.left + window.scrollX;
     console.log(cell.innerText)
     var tooltip = this.$refs.tooltip
     var textElem = tooltip.querySelector('#text')
      textElem.innerText = cell.innerText
     console.log('offset top')
     console.log(topOffset)
     tooltip.style.border = '2px solid black'
     tooltip.style.top = topOffset - 40 + 'px';
     tooltip.style.left = leftOffset - 40 + 'px';
     tooltip.style.display = 'block'
    
     
   
   },
  
   hideProblemDetails(event){
      var tooltip = this.$refs.tooltip
    
  
     tooltip.style.top = 'px';
     tooltip.style.left = '100px';   
     tooltip.style.display = 'none'
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


#sidePanelMain div div label { 
  font-size: 10px;
  
}

#sidePanelMain div label { 
  font-size: 10px;
}

#sidePanelMain div {
  padding-bottom: 2px;
}


</style>