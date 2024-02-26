<template>
    
    <FilterDrawer :paginator="this.$refs.paginator"/>
    
    <div class="fixed w-[300px] h-[200px] overflow-y-scroll p-3 flex-col bg-yellow-100" id="tooltip" ref="tooltip" style="display:none">
         <div class="flex flex-row items-end w-full justify-end hover:cursor-pointer sticky top-0 " @click="hideProblemDetails" > <div class="flex flex-col justify-center" style="border-radius: 200%; width:20px; height:20px; background-color: black; padding: 2px;"> <font-awesome-icon icon="fa-solid fa-xmark" class="text-white"/></div></div>
        <div id="text" style="word-wrap: break-word; max-width:100%"></div>
        </div>
   <div class=" flex flex-row   text-lg  h-full w-full  bg-[rgb(248,248,248)] ml-[30px]  " id="app"  >


    <div class="flex flex-col fixed left-[50px] h-screen customborder  bg-gray-200  pt-2" id="sidePanel" v-if="this.mainStore.getSidePanelCheck">
       

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


         
         <div @click="filter($event, 'close')" :class="{selected:selectedItem == 'close', notSelected:selectedItem != 'close'}">
              <div class="flex flex-row  w-full items-center hover:cursor-pointer ">

                <div class="w-1/6 hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-file-export"  class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Closed Issues</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm " >{{ myCloseRequests.length }}</label>
         </div>


         <div @click="filter($event, 'info')"  :class="{selected:selectedItem == 'info', notSelected:selectedItem != 'info'}">
              <div class="flex flex-row  w-full items-center  hover:cursor-pointer ">

                <div class="w-1/6  hover:cursor-pointer "><font-awesome-icon icon="fa-solid fa-question" class=" hover:cursor-pointer " /></div>
                 <label class=" hover:cursor-pointer text-sm ">Issues Awaiting Information</label>
                
              </div>
              <label class=" hover:cursor-pointer text-sm ">{{ infoMe.length }}</label>
         </div>







    </div>


  <div class="h-[92vh]  p-5 bg-[rgb(248,248,248)] flex flex-col w-full mx-2">  
  <div class="flex flex-row items-center justify-between "><div class="ml-[400px] text-2xl">{{ getSelectedItem() }}</div>
<div class="flex flex-row">  <div @click="downloadExcel" class="p-2 bg-white hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2 mr-2">
    Download As Excel<font-awesome-icon icon="fa-solid fa-table" class="ml-4"/>
</div>  
<FilterButton/>
<ClearButton/>
</div>
</div>
    <div class="   overflow-x-auto   mx-2 customerborder w-full   overflow-y-scroll" style="max-height: 80vh; min-height: auto;">
       
    <table class="w-full text-md text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-md text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Issue No.
                </th>
<!-- 
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Ticket Type
                </th> -->
                
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Req. Date
                </th>
                <th scope="col" class="table-header2 px-6 py-3 ">
                    Location
                </th>
                <!-- <th scope="col" class="table-header2 px-6 py-3 ">
                    priority
                </th> -->
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
                   Department
                </th>

                <th scope="col" class="table-header2 px-6 py-3">
                   Problem Category
                </th>


                <th scope="col" class="table-header2 px-6 py-3">
                    Extension
                </th>
                <th scope="col" class="table-header2 px-6 py-3">
                    Phone
                </th>
                <th scope="col" class="table-header2 px-6 py-3">
                    
                </th>
                <th scope="col" class="table-header2 px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  class="hover:bg-gray-200 hover:text-black hover:cursor-pointer" v-for="(ticket, ticketCounter) in sortedTickets" :key="ticketCounter">
                <td @click="showDetails(ticket._id)"  scope="row" class="table-row2  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ ticket.number }}
                </td>
                <!-- <td  class="table-row2 ">
                    <select name="" id="" class="p-1 border border-solid border-black" @change="setTicketType($event, ticket)">
                        <option :value="ticket.ticketType" selected>{{ticket.ticketType}}</option>
                        <option v-if="ticket.ticketType == 'Problem'" value="Incident">Incident</option>
                        <option v-else value="Problem">Problem</option>
                    </select>
                </td> -->
                <td @click="showDetails(ticket._id)" class="table-row2 px-6 ">
                    {{ ticket.requestDate }}
                </td>
                <td  class="table-row2 px-6">
                    <select @change="ticketChanged(event, ticket._id)" class="w-[80px] border border-black border-solid" v-model="ticket.location">
                       <!-- <option selected>{{ticket.location}}</option> -->
                       <option v-for="(location, locationCounter) in locations"  :value="location.name">{{location.name}}</option>
                    </select>
                   </td>
                <!-- <td  class="table-row2 px-6 ">
                    <select name="" id="" class="p-1 border border-solid border-black" @change="setPriority($event, ticket)">
                        <option :value="ticket.priority.priority" selected>{{ticket.priority.priority}}</option>
                        
                        <option value="Priority 1">Priority 1</option>
                        <option value="Priority 2">Priority 2</option>
                        <option value="Priority 3">Priority 3</option>
                        <option value="Priority 4">Priority 4</option>
                        <option value="Priority 5">Priority 5</option>
                        <option value="Priority 5">Priority 6</option>
                    </select>
                </td> -->

                <td @click="showDetails(ticket._id)" class="table-row2 px-6 ">
                    {{ticket.status}}
                </td>
                <td @click="showProblemDetails($event)"  class="table-row2   text-center text-sm overflow-hidden text-ellipsis cursor-pointer whitespace-nowrap max-w-0 text-red-400">
                 <div class="flex flex-row justify-center underline items-center">
                   
                    {{ticket.problemDetails}}</div>
                </td>
                <td @click="showDetails(ticket._id)" class="table-row2 pl-4 ">
                   {{ticket.raisedBy.empName}}
                </td>
                <td  class="table-row2 ">
                    <template v-if="ticket.assignedTo ">
                        
                        <select name="" id="" @change="ticketChanged($event, ticket._id)" class="bg-white w-[100px] border border-solid border-black">
                            <option :value="ticket.assignedTo.empName" selected>{{ ticket.assignedTo.empName }}</option>
                            <option value="Unassigned" >Unassigned</option>
                            <option v-for="(user, userCounter) in ticket.users" :key="userCounter" :value="user">{{user}}</option>
                        </select>
                    </template> 
                    <template v-else>
                        <select name="" id="" @change="ticketChanged($event, ticket._id)" class="bg-white w-[100px] border border-solid border-black" >
                            <option value="Unassigned" selected>Unassigned</option>
                            <option v-for="(user, userCounter) in ticket.users" :key="userCounter" :value="user">{{user}}</option>
                        </select>
                    </template> 
                 </td>
                <td @click="showDetails(ticket._id)" class="table-row2 ">
                   <template v-if="ticket.currentHandler">{{ ticket.currentHandler.empName }}</template> 
                </td>

                <td class="table-row2 ">
                    <select name="" id="" @change="ticketChanged($event, ticket._id)" class="bg-white w-[100px] border border-solid border-black"  v-model="ticket.department">
                            <!-- <option value="ticket.department" selected>{{ ticket.department }}</option> -->
                            <option v-for="(department, departmentCounter) in departments" :key="departmentCounter" :value="department">{{department}}</option>
                        </select>
                </td>

                <td  class="table-row2 ">
                    <select name="" id="" @change="ticketChanged($event, ticket._id)" class="bg-white w-[100px] border border-solid border-black" v-model="ticket.type">
                            <!-- <option :value="ticket.type" selected>{{ ticket.type }}</option> -->
                            
                            <option v-for="(type, typeCounter) in getTypes(ticket.department)" :key="typeCounter" :value="type">{{type}}</option>
                        </select>
                </td>
                <td class="table-row2 ">
                    <input  @change="ticketChanged($event, ticket._id)" type="text" v-model="ticket.extension" class="border border-solid border-black h-6 w-[70px]">
                </td>
                <td class="table-row2 ">
                    <input  @change="ticketChanged($event, ticket._id)" type="text" v-model="ticket.phone" class="border border-solid border-black h-6 w-[70px]">
                </td>
                <td>
                   
                </td>
                <td class="table-row2 pr-[20px]">
                <button @click="ticketReset(ticket)" class="p-2 bg-green-200 text-black border border-solid border-gray-500">Reset</button>
                </td>
            </tr>
           
          
         
        </tbody>
    </table>
</div>

<Pagination @page-Changed="handlePageChanged" :items="this.mainStore.getFilteredTickets.length" ref="paginator" :itemsPerPage="itemsPerPage"/>


</div>
 


    
   </div>
    

    
   <div class="flex flex-row w-full h-[60px] fixed bottom-0  justify-end items-center">
       <div class="bg-gray-500 text-gray-300 p-3 mr-4" v-if="ticketChangedCheck == false">Update</div>
       <div class="bg-green-400 text-white hover:cursor-pointer p-3 mr-4" @click="updateTickets()" v-if="ticketChangedCheck == true">Update</div>
   </div> 
    
    </template>
    
    
    <script >

    import axios from 'axios'
    import * as XLSX from 'xlsx';
    
    
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
               sort:[ "Priority 6", "Priority 5", "Priority 4", "Priority 3", "Priority 2", "Priority 1"],
               selectedItem:null,
               support:[],
               currentPage:1,
               itemsPerPage:10,
               departments:[],
               teams:[],
               types:[],
               ticketChangedCheck:false,
               tickets:[],
               changedTickets:[]
            }
        },

        computed:{
            sortedTickets(){
                var vm = this;
             var tickets = vm.mainStore.getFilteredTickets
             tickets.sort(vm.comparator)
       
             var start = (vm.currentPage - 1) * vm.itemsPerPage
             var end = start + vm.itemsPerPage
             vm.tickets = tickets.slice(start, end)
             return vm.tickets
            },

       

        },


        created(){
         this.loadTickets()
         this.getLocations();
      
         this.getDepartments();
        
        },

    

      
        
        methods:{

            getTypes(department){
                console.log("get types called")
                var vm = this;
                var team = vm.teams.filter((team) => team.name == department)[0]
                console.log("this is the team")
                console.log(team)


                var subs = []

                if(team && team.problemTypes){

                
                for(var x of team.problemTypes){
                   for(var z in x){
                    if(z == "subs"){
                        for(var l of x[z]){
                           console.log("this is the final type")
                           console.log(l)
                           subs.push(l)
                        }
                    }
                   }

                }

            }
              
                console.log("these is the team")
                console.log(team)
               return subs
            },

            getDepartments(){
                console.log("entered get departments")
            var vm = this;
            var user = this.authStore.getUser;
            var token = this.authStore.getToken;
            var userMail = user.mailAddress;
        
            var data = new FormData();
            data.append("token", token)
            data.append("user", userMail)

        
              axios.post(vm.globalUrl +"getTeams", data).then((result)=>{
                vm.teams = result.data
                vm.departments = vm.teams.map((team) => team.name)
                console.log("these are the departments")
                console.log(vm.departments)
                console.log(vm.teams)

                vm.$forceUpdate();
            }).catch((error)=>vm.$toast.warning(error))
            
           
     
            },

            handlePageChanged(page){
                this.currentPage = page;
                
       
            },

            // getDepartments(){
            //     var vm = this;
            //     axios.post(vm.globalUrl + "getTeams").then((result)=>{
            //        console.log(result.data)
            //           vm.departments = result.data.filter((team)=>team.name)
            //     }).catch((error)=>vm.toast.warning(error))
            // },

            assignTicket(event, ticket){
            var vm = this;
            vm.$toast.info("Assigning ticket please wait....")
        
            var vm = this;
      
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = "Not Available"
            var ticket = ticket
            var prevAssignee = ticket.assignedTo




            if(event.target.value == "Unassigned" && ticket.assignedTo != null){
                var data = new FormData();
                data.append('token', token)
                data.append('user', JSON.stringify(user))
                data.append('comment', comment)
                data.append('ticket', JSON.stringify(ticket))
                data.append("prevAssignee", JSON.stringify(prevAssignee))


                axios.post(vm.globalUrl + 'unassign', data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then((result)=>{
                           if(result.data == true){
                               vm.$toast.clear()
                               vm.$toast.success('Assigning Done')
                               vm.loadTickets()
                           }else{
                               vm.$toast.clear()
                               vm.$toast.warning(result.data)
                           }
                       }).catch((error)=>{
                           vm.$toast.clear()
                           vm.$toast.warning(error)
                       })

               
            }else if(ticket.assignedTo != null && event.target.value != "Unassigned"){
                 var approver = vm.support.filter((user)=>user.mailAddress == event.target.value)[0]
                 var data = new FormData();
                 
                 data.append('token', token)
                 data.append('user', JSON.stringify(user))
                 data.append('comment', comment)
                 data.append('ticket', JSON.stringify(ticket))
                 data.append('approver', JSON.stringify(approver))

                 axios.post(vm.globalUrl + 'reassign', data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then((result)=>{
                    if(result.data == true){
                        vm.$toast.clear()
                        vm.$toast.success('Reassigning Done')
                        vm.loadTickets()
                      
                    }else{
                        vm.$toast.clear()
                        vm.$toast.warning(result.data)
                    }
                }).catch((error)=>{
                    vm.$toast.clear()
                    vm.$toast.warning(error)
                })


            }else if(ticket.assignedTo == null && event.target.value != "Unassigned"){
                var approver = vm.support.filter((user)=> user.mailAddress == event.target.value)[0]

                       
                       
                       var data = new FormData();
                       
                       data.append('token', token)
                       data.append('user', JSON.stringify(user))
                       data.append('comment', comment)
                       data.append('ticket', JSON.stringify(ticket))
                       data.append('approver', JSON.stringify(approver))
                       
                       axios.post(vm.globalUrl + 'assign', data, {
  headers: {
    'Authorization': `Bearer ${token}`,
   
  }
}).then((result)=>{
                           if(result.data == true){
                               vm.$toast.clear()
                               vm.$toast.success('Assigning Done')
                               vm.loadTickets()
                       
                           }else{
                               vm.$toast.clear()
                               vm.$toast.warning(result.data)
                           }
                       }).catch((error)=>{
                           vm.$toast.clear()
                           vm.$toast.warning(error)
                       })
            }
            
            
           
        },

        loadTickets(){
            
            this.getSupport();
            this.$toast.info("Loading Data....")
            var vm = this;
            var token = this.authStore.getToken
            var user = this.authStore.getUser
            var data = new FormData();
            data.append("token", token);
            data.append("user", JSON.stringify(user));
            axios.post(vm.globalUrl + 'getAllTickets', data, {
  headers: {
    'Authorization': `Bearer ${token}`,
 
  }
}).then((result)=>{
          
               vm.tickets = result.data
               this.$refs.paginator.onClickHandler(1)
               vm.mainStore.setFilteredTickets(vm.tickets)
               vm.mainStore.setInitialTickets(vm.tickets)
               vm.mainStore.setTickets(vm.tickets)
               vm.unassigned = vm.tickets.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.status != 'Submitted Ticket - Seeking Supervisor Approval')
               vm.accepted = vm.tickets.filter((ticket)=>ticket.currentHandler && ticket.currentHandler.mailAddress == user.mailAddress && ticket.accepted == true && ticket.assigned == true && ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress)
               vm.assigned = vm.tickets.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.accepted == false)
               vm.approval = vm.tickets.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
               vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.status == "Closed Ticket");
               vm.info = vm.tickets.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)
               vm.$toast.clear()
               vm.$toast.success("Data Loaded Successfully")
               this.$forceUpdate()
            }).catch((error)=>{
                vm.$toast.clear()
       
                vm.$toast.warning(error)
            })
        },

            getSelectedItem(){
               if(this.selectedItem == "all"){
                return "All Issues"
               }else if(this.selectedItem == "accepted"){
                return "Accepted Issues"
               }else if(this.selectedItem == "unassigned"){
                return "Unassigned Issues"
               }else if(this.selectedItem == "assigned Tickets"){
                return "Assigned"
               }
            },
            selectItem(item) {
      if (this.selectedItem === item) {
        this.selectedItem = null; 
      } else {
        this.selectedItem = item; 
      }
    },

            comparator(a, b){
     
     var vm = this;

     var index1 = vm.sort.indexOf(a.priority)
     var index2 = vm.sort.indexOf(b.priority)
 

 
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
                var paginate = this.$refs.paginator.onClickHandler
                var vm = this;
                var store = vm.mainStore
                vm.selectItem(type);
                switch(type){
                    case "unassigned":
                    paginate(1);
                    store.setInitialTickets(vm.unassigned)
                    store.setFilteredTickets(vm.unassigned)
                    
                        break;
                    case "assigned":
                    paginate(1);
                    store.setInitialTickets(vm.assigned)
                    store.setFilteredTickets(vm.assigned)
                        break;
                    case "accepted":
                    paginate(1);
                    store.setInitialTickets(vm.accepted)
                    store.setFilteredTickets(vm.accepted)
                        break;
                    case "approval":
                    paginate(1);
                    store.setInitialTickets(vm.approval)
                    store.setFilteredTickets(vm.approval)
                        break;
                    case "info":
                    paginate(1);
                    store.setInitialTickets(vm.info)
                    store.setFilteredTickets(vm.info)
                        break;
                    case "close":
                    paginate(1);
                    store.setInitialTickets(vm.myCloseRequests)
                    store.setFilteredTickets(vm.myCloseRequests)
                        break;
                    case "all":
                    paginate(1);
                    store.setInitialTickets(vm.tickets)
                    store.setFilteredTickets(vm.tickets)
                        break;
                }
            },


            showDetails(id){
               var vm = this;
               const componentUrl ="/ticketing/ticketDetails/" + id;
           
               this.$router.push(componentUrl);
                },


                showProblemDetails(event){

        var cell = event.target
        var rect = cell.getBoundingClientRect();
    
        const topOffset = rect.top + window.scrollY;
        const leftOffset = rect.left + window.scrollX;
 
       var tooltip = this.$refs.tooltip
       var textElem = tooltip.querySelector('#text')
        textElem.innerText = cell.innerText

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


     downloadExcel() {

  var dataList = this.mainStore.getFilteredTickets

  
    const excelData = this.convertToExcelData(dataList);

 
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');


    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });


    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx');


    document.body.appendChild(link);
    link.click();

    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },


     convertToExcelData(dataList) {
    const headers = Object.keys(dataList[0]);
    const data = dataList.map((item) => Object.values(item));
    return [headers, ...data];
  },


  


  getSupport(){
    var vm = this;
    var user = this.authStore.getUser;
    var token = this.authStore.getToken;

    var data = new FormData();

    data.append("user", JSON.stringify(user))
    data.append("token", JSON.stringify(token))

    axios.post(vm.globalUrl + "getAllSupport", data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then((result)=>{
        vm.support = result.data

    }).catch((error)=>vm.$toast.warning(error))


  },


  ticketReset(ticket){
    ticket.priority = ticket.initialPriority
    ticket.location = ticket.initialLocation
    ticket.ticketType = ticket.initialType
    ticket.currentHandler = null;
    ticket.assignedTo = null;

    console.log("this is the ticket")
    var vm = this;
    var user = this.authStore.getUser;
    var token = this.authStore.getToken;

    var data = new FormData();

    data.append("user", JSON.stringify(user))
    data.append("token", JSON.stringify(token))
    data.append("ticket", JSON.stringify(ticket))

    axios.post(vm.globalUrl + "updateTicket", data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then((result)=>{
        if(result.data != false){
            this.loadTickets()
        }

    }).catch((error)=>vm.$toast.warning(error))

    


  },


  setDepartment(event, ticket){
    var vm = this;
    var data = new FormData();
    data.append("id", ticket._id)
    data.append("department", event.target.value)

    axios.post(vm.globalUrl + "setDepartment", data).then((result)=>{
        vm.$toast.success("Department set")
       
    }).catch((error)=>vm.$toast.warning(error))

  },

  ticketChanged(event, id){
    var vm = this
    vm.changedTickets.push(id)
    vm.ticketChangedCheck = true

  },


  updateTickets(){
    
    var vm = this

    vm.$toast.info("Updating Tickets")
    var tickets = []

    for(var ticket of vm.tickets){
        for(var id of vm.changedTickets){
            if(ticket._id == id){
                tickets.push(ticket)
            }
        }
    }


    var data = new FormData();
    data.append("tickets", JSON.stringify(tickets))

    axios.post(vm.globalUrl + "updateTickets", data).then((result)=>{
        vm.$toast.clear();
        vm.$toast.success("Tickets Updated")
        location.reload()
        
    }).catch((error)=>vm.$toast.warning(error))

    
 
   
  }



        }
    
    
    
    }
    
    
    
    
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
    font-size: 12px;
}

.table-row2{
    font-size:12px;
    font-weight: 400;
    padding-left: 20px;
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


</style>









