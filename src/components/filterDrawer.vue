<template>
<div style="z-index: 1231240129381209318023981203982;" class="border pb-10 border-solid border-black fixed h-[100vh] w-[30vw] bg-white right-0 p-10 flex flex-col" v-if="this.mainStore.getFilterCheck == true">
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
<option value="Ticket Submitted - Seeking Supervisor's Approval">Ticket Submitted - Seeking Supervisor's Approval</option>
<option value="Submitted Ticket - Supervisor Approval Given">Submitted Ticket - Supervisor Approval Given</option>
<option value="Ticket Submitted - Seeking Higher Approval">Ticket Submitted - Seeking Higher Approval</option>
<option value="Ticket Submitted - Higher Approval Given">Ticket Submitted - Higher Approval Given</option>
<option value="Open">Open</option>
<option value="Assigned / Pending">Assigned Pending</option>
<option value="Assigned / Pending">Assigned Pending</option>
<option value="Open (Seeking Information...)">Open (Seeking Information...)</option>
<option value="Open (Information Sent)">Open (Information Sent)</option>
<option value="Close Requested">Close Requested</option>
<option value="Closed Ticket">Closed Ticket</option>
<option value="Rejected">Rejected</option>
</select>



<input list="raisers" class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"  @change="setFilter($event, 'raisedBy')"  placeholder="Raised By"/>
<input list="assignees" class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-20" @change="setFilter($event, 'assignedTo')"  placeholder="Assigned To"/>

<datalist id="raisers"  class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"   >
    <option :value="user.empName" v-for="(user, userCounter) in users">{{ user.empName }}</option>

</datalist >
<datalist id="assignees"  class="w-full rounded-sm border border-solid border-gray-400 p-3 mb-4"   >
    <option :value="user.empName" v-for="(user, userCounter) in users" >{{ user.empName }}</option>

</datalist >

<div class="flex flex-row justify-center items-center hover:cursor-pointer " @click="filter()"><div class="p-2 mb-20 bg-blue-500 border border-solid border-blue-900 text-white rounded-sm text-lg ">Apply Filters</div></div>

</div>
</template>


<script>
import axios from 'axios'

export default{

    data(){
        return{
          filters:[],
          tickets:[],
          serviceTypes:[],
          users:[]
          
        }
    },


    created(){
      this.getserviceTypes()
      this.getUsers()
    },

    props:["paginator"],


    methods:{
        toggleFilter(){
            this.mainStore.toggleFilter()
        },

        setFilter(event, type){
            this.filters = this.filters.filter((filter)=>filter.type != type )
            if(event.target.value == ""){
                return
            }
            var newFilter = {value:event.target.value, type:type}
            this.filters.push(newFilter)
            
        },

        filter(){
           var vm = this;
           var tickets = vm.mainStore.getInitialTickets
           var filteredTickets = tickets
           console.log('these are the main tickets')
           console.log(tickets)
           console.log("these are the filtered tickets")
           console.log(filteredTickets)
           console.log("this is the filters lenght");
           console.log(vm.filters.length)

           if(vm.filters.length < 1){
            vm.mainStore.setFilteredTickets(tickets)
            vm.paginator.onClickHandler(1)
            return
           }
    
           for(var filter of vm.filters){
                    if(filter.type == "dateFrom"){
                            console.log("entered 1") 
                        filteredTickets = filteredTickets.filter((ticket)=> {
                            var ticketDateFrom = new Date(ticket.requestDate).getTime()
                            var result = new Date(ticket.requestDate).getTime() > new Date(filter.value).getTime()
                            console.log(`Ticket Date From:${ticketDateFrom}`)
                            console.log(`Result:${result}`)
                            return result
                        })
    
                    }else if(filter.type == "dateTo"){
                        console.log("entered 2")
                        filteredTickets = filteredTickets.filter((ticket)=>new Date(ticket.requestDate).getTime() < new Date(filter.value).getTime())
                    }else if(filter.type == "status"){
                        console.log("entered 3")
                       filteredTickets = filteredTickets.filter((ticket)=>ticket.status == filter.value)
                    
                   }else if(filter.type == 'serviceType'){
                    console.log("entered 5")
                       filteredTickets = filteredTickets.filter((ticket)=>ticket.department == filter.value || ticket.servieType == filter.value)
                   }else if(filter.type == 'raisedBy'){
                     filteredTickets = filteredTickets.filter((ticket)=>ticket.raisedBy.empName == filter.value)
                   }else if(filter.type == 'assignedTo'){
                    filteredTickets = filteredTickets.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.empName == filter.value)
                   }else if(filter.type == 'number'){
                    var number = parseInt(filter.value, 10)
                    filteredTickets = filteredTickets.filter((ticket)=>ticket.number == number)
                   }
        }


          

            vm.mainStore.setFilteredTickets(filteredTickets)
            vm.paginator.onClickHandler(1)

            
           },


           getserviceTypes(){
            var vm = this;
            axios.post(vm.globalUrl+'getTeams').then((result)=>{
                var serviceTypes = []
                console.log("these are the data")
                console.log(result.data)

                for(var team of result.data){
                    if(team.hasServices){
                        for(var service of team.services){
                            serviceTypes.push(service.serviceName)
                        }
                    }else{
                        serviceTypes.push(team.name)
                    }
                }

                vm.serviceTypes = serviceTypes
        
           })
            
           },

           getUsers(){
            var vm = this;
            axios.post(vm.globalUrl + 'getUsers').then((result)=>{
                  vm.users  = result.data
            }).catch((error)=>{
                vm.$toast.warning(error)
            })
           }
        }
    }



</script>