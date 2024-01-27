<template>
<div id="app" class="flex flex-col w-[100vw] ml-[30px] h-[92vh] overflow-y-scroll justify-start items-center p-10">

<div class="flex flex-col w-full border border-solid border-black">
    <div class="flex flex-row w-full text-2xl font-bold p-3 justify-center bg-gray-300">Basic</div>
 <div class="flex flex-row w-full p-3 ">
    <div class="w-1/3 items-center flex flex-col font-bold">User Name</div>
    <div class="w-2/3 items-center flex flex-col">{{ user.empName }}</div>
 </div>
 <div class="flex flex-row w-full p-3 ">
    <div class="w-1/3 items-center flex flex-col font-bold">User Type</div>
    <div class="w-2/3 items-center flex flex-col">{{ user.userType  }}</div>
 </div>
 <div class="flex flex-row w-full p-3 ">
    <div class="w-1/3 items-center flex flex-col font-bold">User Email</div>
    <div class="w-2/3 items-center flex flex-col">{{ user.mailAddress  }}</div>
 </div>
 <div class="flex flex-row w-full p-3 ">
    <div class="w-1/3 items-center flex flex-col font-bold">User Phone</div>
    <div class="w-2/3 items-center flex flex-col">{{ user.mobieNo  }}</div>
 </div>
 <div class="flex flex-row w-full p-3 ">
    <div class="w-1/3 items-center flex flex-col font-bold">User Extension</div>
    <div class="w-2/3 items-center flex flex-col">{{ user.extension  }}</div>
 </div>
</div>


<div class="flex flex-col w-full border border-solid border-black mt-10">
    <div class="flex flex-row w-full text-2xl font-bold p-3 justify-center bg-gray-300">Ticket Related Information</div>
 
<template v-if="user.userType == 'leader'">
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Total Tickets Managed</div>
    <div class="w-2/3 items-center flex flex-col">{{managed}}</div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Total Tickets Handled Directly</div>
    <div class="w-2/3 items-center flex flex-col">{{ handled }}</div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Average Response Time</div>
    <div class="w-2/3 items-center flex flex-row justify-center" v-if="responseTime != null">
        <span class="font-bold mr-1">Seconds: </span><span class="mr-3">{{ responseTime.seconds }}</span>
        <span class="font-bold mr-1">Minutes: </span><span class="mr-3">{{ responseTime.minutes }}</span>
        <span class="font-bold mr-1">Hours: </span><span class="mr-3">{{ responseTime.hours }}</span>
        <span class="font-bold mr-1">Days: </span><span class="mr-3">{{ responseTime.days }}</span>
    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Average Acceptance Time</div>
    <div class="w-2/3 items-center flex flex-row justify-center" v-if="acceptanceTime != null">
        <span class="font-bold mr-1">Seconds: </span><span class="mr-3">{{ acceptanceTime.seconds }}</span>
        <span class="font-bold mr-1">Minutes: </span><span class="mr-3">{{ acceptanceTime.minutes }}</span>
        <span class="font-bold mr-1">Hours: </span><span class="mr-3">{{ acceptanceTime.hours }}</span>
        <span class="font-bold mr-1">Days: </span><span class="mr-3">{{ acceptanceTime.days }}</span>

    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Average Resolution Time</div>
    <div class="w-2/3 items-center flex flex-row justify-center" v-if="resolutionTime != null">
        <span class="font-bold mr-1">Seconds: </span><span class="mr-3">{{ resolutionTime.seconds }}</span>
        <span class="font-bold mr-1">Minutes: </span><span class="mr-3">{{ resolutionTime.minutes }}</span>
        <span class="font-bold mr-1">Hours: </span><span class="mr-3">{{ resolutionTime.hours }}</span>
        <span class="font-bold mr-1">Days: </span><span class="mr-3">{{ resolutionTime.days }}</span>

    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Number of Tickets Raised</div>
    <div class="w-2/3 items-center flex flex-row justify-center">
        {{ raised }}

    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Rating</div>
    <div class="w-2/3 items-center flex flex-row justify-center">
        {{ rating }}

    </div>
 </div>
</template>

<template v-if="user.userType == 'support'">
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Total Tickets Handled </div>
    <div class="w-2/3 items-center flex flex-col">{{ handled }}</div>
 </div>

 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Average Acceptance Time</div>
    <div class="w-2/3 items-center flex flex-row justify-center" v-if="acceptanceTime != null">
        <span class="font-bold mr-1">Seconds: </span><span class="mr-3">{{ acceptanceTime.seconds }}</span>
        <span class="font-bold mr-1">Minutes: </span><span class="mr-3">{{ acceptanceTime.minutes }}</span>
        <span class="font-bold mr-1">Hours: </span><span class="mr-3">{{ acceptanceTime.hours }}</span>
        <span class="font-bold mr-1">Days: </span><span class="mr-3">{{ acceptanceTime.days }}</span>

    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Average Resolution Time</div>
    <div class="w-2/3 items-center flex flex-row justify-center" v-if="resolutionTime != null">
        <span class="font-bold mr-1">Seconds: </span><span class="mr-3">{{ resolutionTime.seconds }}</span>
        <span class="font-bold mr-1">Minutes: </span><span class="mr-3">{{ resolutionTime.minutes }}</span>
        <span class="font-bold mr-1">Hours: </span><span class="mr-3">{{ resolutionTime.hours }}</span>
        <span class="font-bold mr-1">Days: </span><span class="mr-3">{{ resolutionTime.days }}</span>

    </div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Number of Tickets Raised</div>
    <div class="w-2/3 items-center flex flex-col">        {{ raised }}</div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Rating</div>
    <div class="w-2/3 items-center flex flex-col"> {{ rating }}</div>
 </div>
</template>


<template v-if="user.userType == 'normal'">
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Total Tickets Raised </div>
    <div class="w-2/3 items-center flex flex-col">{{ raised }}</div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Number of Tickets Pending</div>
    <div class="w-2/3 items-center flex flex-col">{{ pending }}</div>
 </div>
 <div class="flex flex-row w-full p-3 " >
    <div class="w-1/3 items-center flex flex-col font-bold">Number of Tickets Closed</div>
    <div class="w-2/3 items-center flex flex-col">{{ closed }}</div>
 </div>

</template>



</div>



</div>




</template>


<script>
import axios from 'axios';
import { vModelRadio } from 'vue';

export default{
    data(){
        return {
            user:null,
            tickets:[],
            managed:null,
            handled:null,
            responseTime:null,
            acceptanceTime:null,
            resolutionTime:null,
            raised:null,
            rating:null,
            pending:null,
            closed:null,
        }
    },

    created(){
        this.user = this.mainStore.getShowUser
        this.getTickets()
        this.rating = this.user.rating

    },

    methods:{
        getTickets(){
            var vm = this;
            var userType = this.user.userType

            if(userType == 'leader'){
               vm.processLeaderTickets()
            }else if(userType == 'normal'){
                vm.processNormalTickets()
            }else if(userType == 'support'){
                vm.processSupportTickets()
            }
        },

        processSupportTickets(){
             var vm = this;
             var user = vm.user
             var token = this.authStore.getToken;
             var data = new FormData();
             data.append("user", JSON.stringify(user))
             data.append("token", token);
             

             axios.post(vm.globalUrl + "getTicketsForSupport", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
 
  }
}).then((result)=>{
                var user = vm.user
                vm.tickets = result.data
                var handled = vm.tickets.filter((ticket)=>{
                       return ticket.assignedTo && (ticket.assignedTo.mailAdddress == user.mailAddress || ticket.assignedTo.empName == user.empName) && ticket.accepted == true 
                    });
                vm.handled = handled.length

                  
                     
           
                    vm.acceptanceTime = vm.getAverageAcceptanceTime(handled)
                    vm.resolutionTime = vm.getAverageResolutionTime(handled)
                    vm.raised = vm.getRaisedTickets(vm.tickets);
              
             }).catch((error)=>vm.$toast.warning(error))
        },

        processLeaderTickets(){
                var vm = this;
                var user = vm.user
                var token = this.authStore.getToken;
                var data = new FormData();
                data.append("user", JSON.stringify(user))
                data.append("token", token);
              

                axios.post(vm.globalUrl + "getTicketsForLeader", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  
  }
}).then((result)=>{
                    var user = vm.user;
                    vm.tickets = result.data
                    vm.managed = vm.tickets.length
                    var handled = vm.tickets.filter((ticket)=>{
                       return ticket.assignedTo && (ticket.assignedTo.mailAdddress == user.mailAddress || ticket.assignedTo.empName == user.empName) && ticket.accepted == true 
                    })
                    vm.handled = handled.length

                  

                    vm.responseTime = vm.getAverageResponseTime(vm.tickets)
                    vm.acceptanceTime = vm.getAverageAcceptanceTime(handled)
                    vm.resolutionTime = vm.getAverageResolutionTime(handled)
                    vm.raised = vm.getRaisedTickets(vm.tickets);
                    
                }).catch((error)=>vm.$toast.warning(error))
        },

        processNormalTickets(){
                 var vm = this;
                 var user = vm.user
                 var token = this.authStore.getToken;
                 var data = new FormData();
                 data.append("user", JSON.stringify(user))
                 data.append("token", token);

                 axios.post(vm.globalUrl + "getTicketsForNormal", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
   
  }
}).then((result)=>{
                    vm.tickets = result.data
                    vm.raised = vm.tickets.length
                   
                    vm.pending = vm.tickets.filter((ticket)=>ticket.status != "Closed Ticket").length
                   

                    vm.closed = vm.tickets.filter((ticket)=>ticket.status == "Closed Ticket").length

                    

                 }).catch((error)=>vm.$toast.warning(error))
        },

        getAverageResponseTime(tickets){
                var numberOfTickets = tickets.length
             
                var respondedTickets = tickets.filter((ticket)=>ticket.actions.length > 1)

                var total = respondedTickets.reduce((total, ticket)=>{
                    var time1 = new Date(ticket.actions[0].time).getTime()
                    var time2 = new Date(ticket.actions[1].time).getTime()
                    var diff = Math.abs(time2 - time1)
                    return total + diff
                }, 0)
         
                var avg = total / respondedTickets.length
                const seconds = avg/1000;
                const minutes = seconds/60;
                const hours = minutes / 60;
                const days = hours / 24;

                return {
                    seconds:seconds.toFixed(2),
                    minutes:minutes.toFixed(2),
                    hours:hours.toFixed(2),
                    days:days.toFixed(2)
                }
        },

        getAverageAcceptanceTime(tickets){
            var numberOfTickets = tickets.length
   
                var acceptedTickets = tickets.filter((ticket)=>{
                    for(var action of ticket.actions){
                        if(action.type == 4){
                            return true
                        }
                    }
                })
         
                var total = acceptedTickets.reduce((total, ticket)=>{
                    var time1 = new Date(ticket.actions[0].time).getTime()
          
                    var time2;
                    for(var action of ticket.actions){
                        if(action.type == 4){
                    
                            time2 = new Date(action.time).getTime()
                        }
                    }
                    var diff = time2 - time1
                    return total + diff
                }, 0)

                var avg = total / acceptedTickets.length
                const seconds = avg/1000
                const minutes = seconds/60;
                const hours = minutes / 60;
                const days = hours / 24;

                return {
                    seconds:seconds.toFixed(2),
                    minutes:minutes.toFixed(2),
                    hours:hours.toFixed(2),
                    days:days.toFixed(2)
                }

        },

        getAverageResolutionTime(tickets){
            var numberOfTickets = tickets.length
     
                var resolvedTickets = tickets.filter((ticket)=>{
                    for(var action of ticket.actions){
                        if(action.type == 11){
                            return true
                        }
                    }
                })
       
                var total = resolvedTickets.reduce((total, ticket)=>{
                    var time1 = new Date(ticket.actions[0].time).getTime()
                    var time2;
                    for(var action of ticket.actions){
                        if(action.type == 11){
                            time2 = new Date(action.time).getTime()
                        }
                    }
                    var diff = Math.abs(time2 - time1)
                    return total + diff
                }, 0)
         
                var avg = total / resolvedTickets.length
                const seconds = avg/1000
                const minutes = seconds/60;
                const hours = minutes / 60;
                const days = hours / 24;

                return {
                    seconds:seconds.toFixed(3),
                    minutes:minutes.toFixed(3),
                    hours:hours.toFixed(3),
                    days:days.toFixed(3)
                }

        },

        getRaisedTickets(tickets){
            var vm = this;
            var raised = tickets.filter((ticket)=>{
                return (
                    ticket.raisedBy.empName == vm.user.empName || ticket.raisedBy.mailAddress == vm.user.mailAddress
                )
            }).length
  
            return raised
        }
    }
}



</script>