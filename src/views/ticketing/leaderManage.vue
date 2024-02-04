<template>
asds
    <div v-if="categoryCheck" class="fixed top-[200px] left-[300px] bg-white p-10">

        <label for="">Select a Category</label>
        <select v-model="category">
          <option v-for="(category, categoryCounter) in categories" :value="category">
             {{category}}
          </option>
        </select>
         <div @click="reassignDepartment">Proceed</div>
         <div @click="cancelDepartmentReassign">Cancel</div>
    </div>
    
    <FilterDrawer :paginator="paginator"/>
    
    <div class="fixed w-[300px] h-[200px] overflow-y-scroll p-3 flex-col bg-yellow-100" id="tooltip" ref="tooltip" style="display:none; z-index:9999999999999999999999999999">
         <div class="flex flex-row items-end w-full justify-end hover:cursor-pointer sticky top-0 " @click="hideProblemDetails" > <div class="flex flex-col justify-center" style="border-radius: 200%; width:20px; height:20px; background-color: black; padding: 2px;"> <font-awesome-icon icon="fa-solid fa-xmark" class="text-white"/></div></div>
        <div id="text" style="word-wrap: break-word; max-width:100%"></div>
        </div>
   <div class=" flex flex-row   text-lg  h-[92vh] w-full  ml-[20px]  " id="app"  >


    <div class="flex flex-col h-[92vh] customborder absolute  bg-white " style="z-index: 9999999999999999999999999999999999;" id="sidePanel" v-if="mainStore.sidePanelCheck">
       

        <div @click="filter($event, 'all')" :class="{selected:selectedItem == 'all', notSelected:selectedItem != 'all'}">
              <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-border-all" class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm">All Issues</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm ">{{ tickets.length }}</label>
         </div>
        
         <div @click="filter($event, 'unassigned')" :class="{selected:selectedItem == 'unassigned', notSelected:selectedItem != 'unassigned'}">
              <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-tasks" class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Unassigned Issues</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm ">{{ unassigned.length }}</label>
         </div>


         <div @click="filter($event, 'assigned')" :class="{selected:selectedItem == 'assigned', notSelected:selectedItem != 'assigned'}">
              <div class="flex flex-row hover:cursor-pointer   w-full items-center">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Assigned Issues</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm ">{{ assigned.length }}</label>
         </div>


  


         <div @click="filter($event, 'approval')" :class="{selected:selectedItem == 'approval', notSelected:selectedItem != 'approval'}">
              <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-thumbtack" class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Issues Awaiting Higher Approval</label>
                
              </div>
              <label  class=" hover:cursor-pointer text-sm ">{{ approval.length }}</label>
         </div>


<!--          
         <div @click="filter($event, 'close')" :class="{selected:selectedItem == 'close', notSelected:selectedItem != 'close'}">
              <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export"  class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">My Close Requests</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm " >{{ myCloseRequests.length }}</label>
         </div> -->


         <div @click="filter($event, 'info')"  :class="{selected:selectedItem == 'info', notSelected:selectedItem != 'info'}">
              <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">

                <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-question" class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Issues Awaiting Information</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm ">{{ infoMe.length }}</label>
         </div>







    </div>


  <div class="h-[92vh]  p-5 bg-gray-100 flex flex-col w-full mx-2">  
  <div class="flex flex-row items-center justify-between "><div class="ml-[500px] mb-[10px] border border-solid border-black text-2xl bg-white p-[10px] font-bold">{{ getSelectedItem() }}</div>
<div class="flex flex-row">  <div @click="downloadExcel" class="p-2 bg-white hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2 mr-2">
    Download As Excel<font-awesome-icon icon="fa-solid fa-table" class="ml-4"/>
</div>  
<FilterButton/>
<ClearButton/>
</div>
</div>
    <div class=" relative overflow-x-auto  bg-white   shadow-md shadow-black customerborder w-full  max-h-[80vh]  " style="max-height: 80vh; min-height: auto;">
       
    <table class="w-full text-md text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 table-header2">
            <tr>
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Issue No.
                </th>

                <th scope="col" class="table-header2 px-6 py-3 ">
                    Issue Type
                </th>

                <th scope="col" class="table-header2 px-6 py-3 ">
                    Problem Type
                </th>
                
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Req. Date
                </th>

                <th scope="col" class="table-header2 px-6 py-3 ">
                    Location
                </th>
                <th scope="col" class="table-header2 px-6 py-3 ">
                    priority
                </th>
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Status
                </th>
                <th scope="col" class="table-header2 px-6 py-3">
                    problem
                </th>
               
                <th scope="col" class="table-header2 px-6 py-3">
                    Requester
                </th>

                <th scope="col" class="table-header2 px-6 py-3">
                    Assignee
                </th>

                <th scope="col" class="table-header2 px-6 py-3">
                    Current Handler
                </th>
                <th scope="col" class="table-header2 px-6 py-3">
       
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  class="hover:bg-gray-200 hover:text-black" v-for="(ticket, ticketCounter) in sortedTickets" :key="ticketCounter">
                <td @click="showDetails(ticket._id)"  scope="row" class="table-row2 pl-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ ticket.number }}
                </td>
                <td  class="table-row2 ">
                    <select v-model="ticket.ticketType" name="" id="" class="p-1 border border-solid border-black" @change="setTicketType($event, ticket)">
                        <option  value="Incident">Incident</option>
                        <option  value="Problem">Problem</option>
                    </select>
                </td>
                <td  class="table-row2 " @click="showDetails(ticket._id)" >
                    {{ticket.category}}
                </td>
                <td @click="showDetails(ticket._id)" class="table-row2 px-6 ">
                    {{ new Date(ticket.requestDate).toDateString() }}
                </td>
                <td  class="table-row2 px-6">
                 <select @change="setLocation($event, ticket._id)" class="w-[80px] border border-black border-solid">
                    <option selected>{{ticket.location}}</option>
                    <option v-for="(location, locationCounter) in locations"  :value="location.name">{{location.name}}</option>
                 </select>
                </td>
                <td  class="table-row2 px-6 ">
                    <!-- <select name="" id="" class=" border border-solid border-black" @change="setPriority($event, ticket)">
                        <option  selected>{{ticket.priority.priority}}</option>
                        
                        <option value="Priority 1">Priority 1</option>
                        <option value="Priority 2">Priority 2</option>
                        <option value="Priority 3">Priority 3</option>
                        <option value="Priority 4">Priority 4</option>
                        <option value="Priority 5">Priority 5</option>
                        <option value="Priority 6">Priority 6</option>
                    
                    </select> -->
                </td>

                <td @click="showDetails(ticket._id)" class="table-row2 px-6 ">
                    {{ticket.status}}
                </td>
                <td @click="showProblemDetails($event)"  class="table-row2  text-center text-sm overflow-hidden text-ellipsis cursor-pointer whitespace-nowrap max-w-0 text-red-400">
                 <div class="flex flex-row justify-center items-center underline">

                    {{ticket.problemDetails}}</div>
                </td>
                <td @click="showDetails(ticket._id)" class="table-row2 pl-4 ">
                   {{ticket.raisedBy.empName}}
                </td>
                <td  class="table-row2 ">
                    <template v-if="ticket.assignedTo && ticket.ticketingHead && user && user.empName == ticket.ticketingHead.empName">
                        <select  name=""  id="" @change="assignTicket($event, ticket)" class="bg-white border border-solid border-black w-[100px]">
                            <option :value="ticket.assignedTo.empName" selected>{{ ticket.assignedTo.empName }}</option>
                            <option value="Unassigned" >Unassigned</option>
                            <option v-for="(user, userCounter) in ticket.users"  :key="userCounter" :value="user">{{user}}</option>
                        </select>
                    </template> 
                    <template v-else>
                        <select name=""  id="" @change="assignTicket($event, ticket)" class="bg-white border border-solid border-black w-[100px]" >
                            <option value="Unassigned" selected>Unassigned</option>
                            <option v-for="(user, userCounter) in ticket.users" :key="userCounter" :value="user">{{user}}</option>
                        </select>
                    </template> 
                 </td>
                <td @click="showDetails(ticket._id)" class="table-row2 ">
                   <template v-if="ticket.currentHandler">{{ ticket.currentHandler.empName }}</template> 
                </td>

                <td class="table-row2 pr-[20px]">
                    <button @click="ticketReset(ticket)" class="p-2   bg-green-200 text-black border border-solid border-gray-500">Reset</button>
                    </td>
            </tr>
           
          
         
        </tbody>
    </table>


    
</div>


<Pagination @page-Changed="handlePageChanged" :items="filteredTickets.length" ref="paginator" :itemsPerPage="itemsPerPage"/>
</div>
 


    
   </div>
    

    
    
    
    </template>
    
    
    <script setup>
    

    import {ref, onMounted} from 'vue'

    import { useTicketStore } from '../../stores/ticket';
    import { useMainStore } from '../../stores/store';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../../stores/users';



    var mainStore = useMainStore()

    var {handlePageChanged, assignTicket, getLocations, getTickets, getTeams, getSelectedItem, selectItem, filter, showDetails, downloadExcel, ticketReset, setLocation, } = useTicketStore()

    getTickets()
    getLocations()
    getTeams()

    var {paginator, locations, sortedTickets, approval, assigned, my, info, reject, infoMe, tickets, unassigned, filteredTickets, sort, selectedItem, support, currentPage, itemsPerPage, teams, value, type, ticket, categoryCheck, categories, change, category} = storeToRefs(useTicketStore())
    var {user, token} = storeToRefs(useUserStore())




//     import axios from 'axios'
//     import * as XLSX from 'xlsx';
    
    
//     export default{
//         data(){
//             return {
//                approval:0,
//                assigned:0,
//                my:0,
//                myCloseRequests:[],
//                closeRequestsForMe:[],
//                info:[],
//                reject:[],
//                infoMe:[],
//                tickets:[],
//                unassigned:[],
//                accepted:[],
//                filteredTickets:[],
//                sort:[ "Priority 6", "Priority 5", "Priority 4", "Priority 3", "Priority 2", "Priority 1"],
//                selectedItem:"all",
//                support:[],
//                currentPage:1,
//                itemsPerPage:10,
//                teams:[],
//                value:'',
//                type:'',
//                ticket:'',
//                categoryCheck:false,
//                categories:[],
//                change:false,
//                category:''
//             }
//         },

//         computed:{
//             sortedTickets(){
//                 var vm = this;
//              var tickets = vm.mainStore.getFilteredTickets
//              if(tickets){
                 
//                  tickets.sort(vm.comparator)

//              var start = (vm.currentPage - 1) * vm.itemsPerPage
//              var end = start + vm.itemsPerPage
//              return tickets.slice(start, end)
//              }
            
//             }

//         },


//         created(){
//          this.loadTickets();
//          this.getTeams();
//          this.getLocations();
//         },

    

      
        
//         methods:{

//             handlePageChanged(page){
//                 this.currentPage = page;
                
 
//             },

          

//         loadTickets(){

          
//             this.$toast.info("Loading Data....")
//             var vm = this;
//             var token = this.authStore.getToken
//             var user = this.authStore.getUser
//             var data = new FormData();
//             data.append("token", token);
//             data.append("user", JSON.stringify(user));
//             axios.post(vm.globalUrl + 'getTickets', data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
 
//   }
// }).then((result)=>{
          
//                vm.tickets = result.data.filter((ticket) => ticket.status != 'Closed Ticket')
//                this.$refs.paginator.onClickHandler(1)
//                vm.mainStore.setFilteredTickets(vm.tickets)
//                vm.mainStore.setInitialTickets(vm.tickets)
//                vm.mainStore.setTickets(vm.tickets)
//                vm.unassigned = vm.tickets.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.status != 'Submitted Ticket - Seeking Supervisor Approval')
//                vm.accepted = vm.tickets.filter((ticket)=>ticket.currentHandler && ticket.currentHandler.mailAddress == user.mailAddress && ticket.accepted == true && ticket.assigned == true && ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress)
//                vm.assigned = vm.tickets.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.accepted == false)
//                vm.approval = vm.tickets.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
//             //    vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.madeCloseRequest == true && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress);
//                vm.info = vm.tickets.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)
//                vm.$toast.clear()
//                vm.$toast.success("Data Loaded Successfully")

//                vm.getSupport();
//             }).catch((error)=>{
//                 vm.$toast.clear()
             
//                 vm.$toast.warning(error)
//             })
//         },

//             getSelectedItem(){
//                if(this.selectedItem == "all"){
//                 return "All Issues"
//                }else if(this.selectedItem == "accepted"){
//                 return "Accepted Issues"
//                }else if(this.selectedItem == "unassigned"){
//                 return "Unassigned Issues"
//                }else if(this.selectedItem == "assigned"){
//                 return "Assigned"
//                }else if(this.selectedItem == "approval"){
//                 return "Issues Awaiting Higher Approval"
//                }else if(this.selectedItem == "info"){
//                 return "Issues Seeking Information"
//                }else if(this.selectedItem == "close"){
//                 return "Closed Issues"
//                }
//             },
//     selectItem(item) {
//       if (this.selectedItem === item) {
//         this.selectedItem = null; 
//         this.selectedItem = item; 
//     }
// },

//             comparator(a, b){
     
//      var vm = this;

//      var index1 = vm.sort.indexOf(a.priority)
//      var index2 = vm.sort.indexOf(b.priority)
 

 
//      return index1 - index2
//   },

//             setRowColor(priority){
//         if(priority == 'Priority 1'){
//             return "bg-emerald-100 hover:bg-emerald-200 hover:cursor-pointer"
//         }else if(priority == 'Priority 2'){
//             return "bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer"
//         }else if(priority == 'Priority 3'){
//             return "bg-green-200 hover:bg-green-300 hover:cursor-pointer"
//         }else if(priority == 'Priority 4'){
//             return "bg-orange-100 hover:bg-orange-200 hover:cursor-pointer"
//         }else if(priority == 'Priority 5'){
//             return "bg-rose-100 hover:bg-rose-200 hover:cursor-pointer"
//         }else if(priority == 'Priority 6'){
//             return "bg-rose-300 hover:bg-rose-400 hover:cursor-pointer"
//         }else if(priority == null || priority == '' || priority == undefined){
//             return "bg-white hover:bg-gray-200 hover:cursor-pointer"
//         }
//      },


//             filter(event, type){
//                 var paginate = this.$refs.paginator.onClickHandler
//                 var vm = this;
//                 var store = vm.mainStore
//                 vm.selectItem(type);
//                 switch(type){
//                     case "unassigned":
//                     paginate(1);
//                     store.setInitialTickets(vm.unassigned)
//                     store.setFilteredTickets(vm.unassigned)
                    
//                         break;
//                     case "assigned":
//                     paginate(1);
//                     store.setInitialTickets(vm.assigned)
//                     store.setFilteredTickets(vm.assigned)
//                         break;
//                     case "accepted":
//                     paginate(1);
//                     store.setInitialTickets(vm.accepted)
//                     store.setFilteredTickets(vm.accepted)
//                         break;
//                     case "approval":
//                     paginate(1);
//                     store.setInitialTickets(vm.approval)
//                     store.setFilteredTickets(vm.approval)
//                         break;
//                     case "info":
//                     paginate(1);
//                     store.setInitialTickets(vm.info)
//                     store.setFilteredTickets(vm.info)
//                         break;
//                     case "close":
//                     paginate(1);
//                     store.setInitialTickets(vm.myCloseRequests)
//                     store.setFilteredTickets(vm.myCloseRequests)
//                         break;
//                     case "all":
//                     paginate(1);
//                     store.setInitialTickets(vm.tickets)
//                     store.setFilteredTickets(vm.tickets)
//                         break;
//                 }
//             },


//             showDetails(id){
//                 const baseUrl = this.frontUrl
//                 const componentUrl = "#/ticketing/ticketDetails/" + id;
//                 const fullPath = baseUrl + componentUrl
    

//                     window.open(fullPath, '_blank');
//                 },


//                 showProblemDetails(event){

//         var cell = event.target
//         var rect = cell.getBoundingClientRect();
    
//         const topOffset = rect.top + window.scrollY;
//         const leftOffset = rect.left + window.scrollX;
     
//        var tooltip = this.$refs.tooltip
//        var textElem = tooltip.querySelector('#text')
//         textElem.innerText = cell.innerText

//        tooltip.style.border = '2px solid black'
//        tooltip.style.top = topOffset - 40 + 'px';
//        tooltip.style.left = leftOffset - 40 + 'px';
//        tooltip.style.display = 'block'
      
       
     
//      },
    
//      hideProblemDetails(event){
//         var tooltip = this.$refs.tooltip
      
    
//        tooltip.style.top = 'px';
//        tooltip.style.left = '100px';   
//        tooltip.style.display = 'none'
//      },


//      downloadExcel() {
 
//   var dataList = this.mainStore.getFilteredTickets

    
//     const excelData = this.convertToExcelData(dataList);


//     const workbook = XLSX.utils.book_new();

    
//     const worksheet = XLSX.utils.aoa_to_sheet(excelData);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });


//     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'data.xlsx');

   
//     document.body.appendChild(link);
//     link.click();

   
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   },


//      convertToExcelData(dataList) {
//     const headers = Object.keys(dataList[0]);
//     const data = dataList.map((item) => Object.values(item));
//     return [headers, ...data];
//   },


//   getSupport(){
//     var vm = this;
//     var user = this.authStore.getUser;
//     var token = this.authStore.getToken;

//     var data = new FormData();

//     data.append("user", JSON.stringify(user))
//     data.append("token", JSON.stringify(token))

//     axios.post(vm.globalUrl + "getSupportFromHead", data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
  
//   }
// }).then((result)=>{
//     if(result.data){
        
//         vm.support = result.data.filter((support)=>support.location == user.location)
//     }

//     }).catch((error)=>	vm.$toast.warning(error))


//   },


//   ticketReset(ticket){
//     ticket.priority = ticket.initialPriority
//     ticket.location = ticket.initialLocation
//     ticket.ticketType = ticket.initialType
//     ticket.currentHandler = null;
//     ticket.assignedTo = null;

   
//     var vm = this;
//     var user = this.authStore.getUser;
//     var token = this.authStore.getToken;

//     var data = new FormData();

//     data.append("user", JSON.stringify(user))
//     data.append("token", JSON.stringify(token))
//     data.append("ticket", JSON.stringify(ticket))

//     axios.post(vm.globalUrl + "updateTicket", data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,

//   }
// }).then((result)=>{
//         if(result.data != false){
//             this.loadTickets()
//         }

//     }).catch((error)=>vm.$toast.warning(error))

    


//   }


//         }
    
    
    
//     }
    
    
    
    
    </script>


<style scoped>





 #sidePanel div div  label{
   margin-right: 10px;
 }

#arrow{
    position: absolute;
    top:10px
}

.table-header2{
    font-size: 15px;
}

.table-row2{
    font-size:12px;
    font-weight: 400;
    
}


.selected{
    background-color: rgb(237,237,237);
   border-right: 2px solid #34d399;
   display:flex;
   flex-direction: row;
   justify-content:space-around;
   justify-items: center;
   width:100%;
  padding:20px;
  margin-bottom: 5px;


 }



 .notSelected{
    display:flex;
   flex-direction: row;
   justify-content:space-around;
   justify-items: center;
   width:100%;
   padding:20px;
   background-color: white;
   border-bottom:1px solid lightslategray;
   margin-bottom: 5px;
   
   
 }

 .notSelected:hover{
   background-color: white;
    border-right: 2px solid #34d399;

 }

 table th{
    border-bottom:1px solid gray;
    background-color: lightgray;
 }

 table td {
    border-bottom: 1px solid gray;
 }

 #sidePanel{
    background-color: rgb(230, 230, 230);
    padding:4px
 }
 

 #sidePanel div{
   background-color: white;
   margin-bottom: 5px;
 }

 tbody tr td:hover{
    cursor: pointer;
 }


</style>