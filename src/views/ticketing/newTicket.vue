<template >

    <div  v-if="leaderCheck"  class="fixed top-[200px] left-[450px] p-5 bg-white flex flex-col border border-solid border-black" style="z-index: 9999999999999999999999999999999999999999999999999999999999999999999999;">
      <div class="mb-4 font-bold">
        You are raising a ticket for a department where you are a department head. Proceed?
      </div>
      <div class="flex flex-row justify-end">
          <div class="p-3 font-bold bg-gray-200 text-black hover:cursor-pointer hover:bg-black hover:text-white" @click="proceed">Proceed</div>
          <div class="p-3 font-bold bg-gray-200 text-black ml-4 hover:cursor-pointer hover:bg-black hover:text-white" @click="cancel">Cancel</div>
      </div>
    </div>




    <div  v-if="searchCheck == true"  class="fixed top-[150px] left-[450px]  h-[300px] w-[600px] overflow-y-scroll bg-white flex flex-col border border-solid border-black" style="z-index: 9999999999999999999999999999999999999999999999999999999999999999999999;">
   <template v-if="tickets">   <div class="mb-4 p-3 font-bold flex flex-col hover:cursor-pointer hover:bg-gray-300" v-for="(ticket, ticketCounter) in tickets" @click="selectTicket(ticket._id)" >
             <div class="w-full">{{ ticket.problemDetails }}</div>
             <div class="w-full flex flex-row justify-end text-xs mt-5">{{ticket.requestDate}}</div>
        
      </div></template>
      <template v-else>
            No previous Tickets Available
      </template>
  

          <div class="p-3 font-bold bg-gray-200 absolute right-2 bottom-2 text-black  flex flex-row justify-end hover:cursor-pointer hover:bg-black hover:text-white" @click="searchCheck = false">Cancel</div>
     
    </div>


<div class="w-full h-full px-10 py-10 ml-[30px] z-10 " ref="main">
<label class="text-black text-4xl ">New Issue</label>

<div class='flex flex-col w-full h-[92vh] justify-start items-center '>


   <div class="flex flex-row w-full justify-start">
        <div class="flex flex-col bg-white  h-auto  justify-start items-start w-1/2">
               <div class=" mt-5 text-black  w-full flex flex-row">
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Concerned Department:</div>
                   <select v-model="ticket.department"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'  @change="setTeam($event)">
                     <option v-for="(team, teamCounter) in teams" :key="teamCounter" :value="team.name">
                               {{ team.name }}
                     </option>
                   </select>
               </div>
       
       
               <div class=" mt-5 text-black  w-full flex flex-row" v-if="team" >
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Category:</div>
        
                <div class="w-[390px] border border-solid border-slate-300 rounded-md ">   <TreeSelect v-model="ticket.category" :disable-branch-nodes="true" :multiple="false" :options="options" /></div>
               </div>
       
               <div class=" mt-5 text-black  w-full flex flex-row">
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Zone:</div>
                   <select v-model="ticket.location"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9' >
                       <option v-for="(location, locationCounter) in locations" :value="location.name">{{ location.name }}</option>
                   </select>
               </div>
       
           </div> 
       
       
       
            
           <div class="flex flex-col bg-white  h-auto  justify-start items-start w-1/2">
               <div class=" mt-5 text-black  w-full flex flex-row">
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Phone Number:</div>
                   <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.phone" />
                  
               </div>
       
               <div class=" mt-5 text-black  w-full flex flex-row">
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Extension:</div>
                   <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.extension" />
                  
               </div>
       
               <div class=" mt-5 text-black  w-full flex flex-row">
                   <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Email:</div>
                   <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.email" />
                  
               </div>
           </div>
           
           
       
   </div>

     

    

    


        


      <template v-if="details.length > 0">  
        <div class=" mt-5 text-black  w-full flex flex-row" v-for="(detail, detailCounter) in details" :key="detailCounter"  >
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>{{ detail.label }}:</div>
            <input v-model="details[detailCounter].input"  name="" id="" class='w-8/12 p-3 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'/>
               
        </div>
    </template>



 


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Problem Details:</div>
            <textarea v-model="ticket.problemDetails"  name="" id="" class='w-8/12 text-black bg-lime-50 border border-solid px-2 rounded-md border-slate-300 h-13' placeholder="Write the problem being faced in details">
     
            </textarea>

            
         <div class="flex flex-col justify-center items-center ml-2 h-12 font-bold p-1 px-2 border border-solid border-slate-800 bg-gray-300 text-black hover:cursor-pointer hover:bg-black hover:text-white" @click="search">Previous Issues</div>

        </div>




  


        
    


        <div class=" mt-5 text-black  w-full flex flex-row" v-if="processedUsers">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Raise on behalf of:</div>
           <div class='w-8/12'> <vss searchabel="true" :options="processedUsers" v-model="ticket.raisedFor"/></div>
        </div>


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Remarks:</div>
           <input v-model="ticket.remarks" type="text" name="" id="" class='w-8/12 rounded-md h-9 border-slate-300 border-solid border px-2'/>
        </div>

        

        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'></div>
            <div class='w-8/12'>
             <font-awesome-icon icon='fa-solid fa-paperclip' size='xl' class='text-blue-700 mr-5' />
             <label for="file" class='hover:cursor-pointer'>Attach File</label>
             <input type="file" name="Attack File" id="file" placeholder="Attach File" class='hidden' multiple  @change="setFile($event)" >
             <div class="flex-col mt-2 w-full">
                <div for="" v-for="(file, fileCounter) in files" :key="fileCounter" class="flex-row flex w-full">
                    
                 <div class="w-1/2">   {{file.name}}</div>

                   <div class="w-1/2"> <font-awesome-icon icon="fa-solid fa-circle-minus" class="ml-4 hover:cursor-pointer" @click="removeFile(fileCounter)"/></div>
                </div>
             </div>
            </div>
           
        </div>
         
<hr class="border border-solid border-slate-300 "/>
      
    
<div class="flex flex-row justify-center items-center mt-5"><button class="bg-amber-500 h-auto w-auto text-white font-bold py-2 px-10 shadow shadow-black" @click="submit()">Submit Issue</button></div>

   
</div>

</div>

</template>


<script setup>
import axios from 'axios'

import {ref} from 'vue'
import { useTicketStore } from '../../stores/ticket';
import {useUserStore} from '../../stores/users';
import {useTeamStore} from '../../stores/team';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/authentication';
import { useGlobalStore } from '../../stores/globalStore';

var {getApprovers}  = useUserStore()






var {teams, team, currentTeam, hasService, options} = storeToRefs(useTeamStore())
var {files, helpCheck, ticket, tickets, searchCheck, 
    details, locations, passedTime, proceedCheck, leaderCheck, timePassed
   
} = storeToRefs(useTicketStore())

var {users, processedUsers, processedUsers2} = storeToRefs(useUserStore())

var {token, user} = storeToRefs(useAuthStore())

var globalStore = useGlobalStore()

var {checkService, checkServiceDetail, getTeams, setTeam} = useTeamStore()

var {setFile, removeFile, submit, setContact, search, selectTicket, setContact} = useTicketStore()





var help = ref(null)
var main = ref(null)


function initiate(){
    var now = new Date();
        var tenMinsAgo = new Date(now.getTime() - 300000)
        timePassed.value = tenMinsAgo

        getApprovers()

        getTeams()
        setContact()
      
        axios.get(globalStore.globalUrl + 'getLocations', {
  headers: {
    'Authorization': `Bearer ${token.value}`,
   
  }
}).then((result)=>{
                locations.value = result.data
            }).catch((error)=>console.log(error))
}


initiate()



function showHelp(){
             if(helpCheck.value == false){
                help.value.style.top = "100px"
                main.value.style.filter = "blur(10px)"
                helpCheck.value = true
             }else{
                help.value.style.top = "-400px"
                main.value.style.filter = "blur(0px)"
                helpCheck.value = false
             }
        }


function proceed(){
            leaderCheck.value = false;
            proceedCheck.value = true
            main.value.style.filter = "blur(0px)"
            submit()

        }

function cancel(){
           leaderCheck.value = false;
           main.value.style.filter = "blur(0px)"
        }



// export default{
//     data(){
//         return {
//             files:[],
//             helpCheck:false,
//             ticket:{
//                 department:'',
//                 problemDetails:'',
//                 // category:'',
           
//                 approvalRequired:false,
//                 raisedFor:'Not Required',
//                 remarks:'',
//                 serviceType:'',
//                 type:'problem',
//                 location:'',
//                 phone:'',
//                 extension:'',
//                 email:'',
//                 repeat:false,
//                 timesRaised:1,
//                 genesis:true,
//                 genesisId:null,
         
             
              
                
               
//             },
//             tickets:[],
//             searchCheck:false,
//             users:[],
//             teams:[], 
//             team:null,
//             hasService:false,
//             currentTeam:null,
//             details:[],
//             locations:[],
//             value:'',
//             passedTime:'',
//             proceedCheck:false,
//             leaderCheck:false,
            
//         }
//     },

//     computed:{
//           processedUsers(){
//             var result = this.users.map((user)=>{

               
//                 return user.empName + '--' + user.designation + ' (' + user.unit + ')'
//             })
//             var extra = 'Not Required'
//             result.unshift(extra)
//             return result
//           },


//           processedUsers2(){
//             var result = this.users.map((user)=>{

               
//                 return user.empName + '/' + user.designation + '/' + user.unit
//             })
            
//             return result
//           },

//           options(){
//             var problems = this.team.problemTypes
//             var options = problems.map((problem)=>{
//                 var newOption = {
//                     id:problem.name,
//                     label:problem.name,
//                     children:[]
//                 }

//                 newOption.children = problem.subs.map((sub)=>{
//                     var newChild = {
//                         id:sub,
//                         label:sub
//                     }

//                     return newChild
//                 })

             

//                 return newOption
//             })


//         return options
//           }

       

//     },



//     created(){
//         var now = new Date();
//         var tenMinsAgo = new Date(now.getTime() - 300000)
//         this.timePassed = tenMinsAgo
//         var vm = this;
//         this.getApprovers()
//         this.getTeams()
//         this.setContact()
//         var token = vm.authStore.getToken
//         axios.get(vm.globalUrl + 'getLocations', {
//   headers: {
//     'Authorization': `Bearer ${token}`,
   
//   }
// }).then((result)=>{
//                 vm.locations = result.data
//             }).catch((error)=>vm.$toast.warning(error))
//     },


//     methods:{

//         checkServiceDetail(){
//             var vm = this;

//                 var service = vm.team.services.filter((service) => service.serviceName == vm.ticket.serviceType)[0]
        
//                 if(service.details.length > 0){
//                     vm.details = service.details
//                 }
//         },

//         checkService(){
         
//             var vm = this;
//            vm.team = vm.teams.filter((team)=> team.name == this.ticket.department)[0]
         

//            if(vm.team.hasServices){
//             vm.hasService = true
//            }else{
//             vm.hasService = false
//             if(vm.team.details.length > 0){
//             vm.details = vm.team.details
//            }
//            }
//         },
    
//         setFile(event){
//             for(var x of event.target.files){
//                 this.files.push(x)
//             }
//         },

//         removeFile(counter){
//             this.files.splice(counter, 1)
//         },

//         submit(){
             

//             var vm = this;
//             var user = this.authStore.getUser

//                 if (vm.proceedCheck == false) {

//                                            var currentTime = new Date();
//                                            var timePassed =   Math.abs(currentTime.getTime() - vm.timePassed.getTime())
//                                          if(timePassed <  60000){
//                                             vm.$toast.warning("please wait for a while before raising another ticket")
//                                              return
//                                           }


//                         if(this.ticket.email == '' || this.ticket.email == "null" || this.ticket.email == "undefined" || this.ticket.email  == undefined || this.ticket.email == null ){
//                             this.$toast.warning("Please provide your email address ")
//                             return
//                         }                  

//                         if(this.ticket.category == '' || this.ticket.category == 'Not Available' || this.ticket.category == null || this.ticket.category == undefined || this.ticket.category == "null" || this.ticket.category == "undefined"){
//                             this.$toast.warning("Please select a problem category first")
//                             return
//                         }



                                                
//                        if(this.ticket.problemDetails == '' || this.ticket.problemDetails == "Not Available"){
//                            this.$toast.warning("Please write about your problem in detail")
//                            return
//                        }
                       
//                        if(this.ticket.location == '' || this.ticket.location == "Not Available"){
//                            this.$toast.warning("Please Select A Location")
//                            return
//                        }


//                        if(this.ticket.extension == '' || this.ticket.extension == "Not Available"){
//                            this.$toast.warning("Please give your extension first")
//                            return
//                        }
                       
//                        if(this.ticket.phone == '' || this.ticket.phone == "Not Available"){
//                            this.$toast.warning("Please give your phone number first")
//                            return
//                        }
                       
                       
                       
//                        if(this.ticket.department == ''){
//                            this.$toast.warning("Please Select A Department")
//                            return
//                         }
                       
//                         if(this.hasService && this.ticket.serviceType == ""){
//                            this.$toast.warning("Please Select A Service Type")
//                            return
//                         }
                       
                       
                       
                       
                       
                       
//                          for(var x of vm.team.leaders){
//                          if(x.mailAddress == user.mailAddress){
              
//                            vm.leaderCheck = true
//                            vm.$refs.main.style.filter = 'blur(10px)'
//                            return
//                         }
//                        }

                    
//                 } 


           

                        



//             this.$toast.info("Submitting Ticket.....")
//             var token = this.authStore.getToken
        


//             var data =  new FormData();

//              for(var x of this.files){
//                 data.append('file', x)
//              }
             
           


//             var ticketData = this.ticket
//            ticketData.details = vm.details

//             if(ticketData.approvalRequired ){
//                 var resultUser1 = this.users.filter((user)=> user.empName == vm.ticket.supervisor.split('/')[0])[0]
//                 ticketData.supervisor = resultUser1
//             }


//             if(ticketData.raisedFor != "Not Required" && ticketData.raisedFor != null){
//                 var resultUser2 = this.users.filter((user)=> user.empName == vm.ticket.raisedFor.split('--')[0])[0]
//                 ticketData.raisedFor = resultUser2
//             }else{
//                 ticketData.raisedFor = null
//             }

  

//             ticketData.assignedTo = null

//             ticketData.higherApprover = null

//             ticketData.hasService = vm.hasService;


    

 


//              data.append('ticket', JSON.stringify(ticketData))
//              data.append('token', token)
//              data.append('user', JSON.stringify(user))
//              data.append('comment', this.comment)
    
//              axios.post(vm.globalUrl + 'submitTicket', data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,

//   }
// }).then((result)=>{
//                  vm.$toast.clear()
//                  vm.$toast.success("Ticket Submitted")
                 
//                  vm.timePassed = new Date()
//                  vm.proceedCheck = false;
//                  vm.ticket.repeat = false;
//                  vm.ticket.timesRaised = 1;
//                  vm.ticket.department = '',
//                  vm.ticket.problemDetails = '',
//                  vm.ticket.approvalRequired = false,
//                  vm.ticket.raisedFor = 'Not Required',
//                  vm.ticket.remarks = '',
//                  vm.ticket.serviceType = '',
//                  vm.ticket.type = 'problem',
//                  vm.ticket.location = '',
//                  vm.ticket.phone = '',
//                  vm.ticket.extension = '',
//                  vm.ticket.email = '',
//                  vm.ticket.repeat = false,
//                  vm.ticket.timesRaised = 1,
//                  vm.ticket.genesis = true,
//                  vm.ticket.genesisId = null,
//                  this.setContact()
            
            
//              }).catch((error)=>{
//                 vm.$toast.clear()
//                  vm.$toast.warning(error)
//              })

//         },

//         getApprovers(){
//             var vm = this
//             var token = this.authStore.getToken
//             var data = {
//                 token
//             }
// 			axios.post(vm.globalUrl + 'getUsers', data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
  
//   }
// }).then(function(response){
// 			    vm.users = response.data.filter((user)=>user.userType == 'normal' || user.userType == 'leader' || user.userType == 'support');
		
			
// 			}
				
// 			).catch(function(error){
//                 vm.$toast.warning(error)
// 			});
//         },

//         getTeams(){
//             var vm = this;
//             var user = this.authStore.getUser;
//             var token = this.authStore.getToken;

//             var data = new FormData();
//             data.append("user", user);
//             data.append("token", token);

//             axios.post(vm.globalUrl + "getTeams", data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
   
//   }
// }).then((result)=>{
//                 vm.teams = result.data;
       
//             }).catch((error)=>vm.$toast.warning(error))
//         },

//         showHelp(){
//              if(this.helpCheck == false){
//                 this.$refs.help.style.top = "100px"
//                 this.$refs.main.style.filter = "blur(10px)"
//                 this.helpCheck = true
//              }else{
//                 this.$refs.help.style.top = "-400px"
//                 this.$refs.main.style.filter = "blur(0px)"
//                 this.helpCheck = false
//              }
//         },

//         setContact(){
//             var vm = this;
//             var user = this.authStore.getUser
//             vm.ticket.extension = user.extension
//             vm.ticket.location = user.location
//             vm.ticket.phone = user.mobileNo
//             vm.ticket.email = user.mailAddress
            
//         },

//         setTeam(event){
//             var vm = this;
//             var teamName = event.target.value

//             var selectedTeam = vm.teams.filter((team)=>team.name == teamName)[0];
//             vm.team = selectedTeam
//         },


//         proceed(){
//             this.leaderCheck = false;
//             this.proceedCheck = true
//             this.$refs.main.style.filter = "blur(0px)"
//             this.submit()

//         },


//         cancel(){
//            this.leaderCheck = false;
//            this.$refs.main.style.filter = "blur(0px)"
//         },


//         search(){
//             var vm = this;
//             var user = vm.authStore.getUser
//             var data  = new FormData();
//             data.append("user", JSON.stringify(user))
//             axios.post(vm.globalUrl + "getTicketsRaisedByUser", data).then((result)=>{
//                 vm.ticketsAll = result.data
//                 vm.tickets = result.data.filter((ticket)=>ticket.status == "Closed Ticket" && ticket.genesis == true);
//                 vm.searchCheck = true
//             }).catch((erorr)=>vm.$toast.warning(error))

//         },


//         selectTicket(id){
//             var selectedTicket = this.ticketsAll.find((ticket)=>ticket._id == id);
    

//             var ticketCheck = this.ticketsAll.find((ticket)=>{
           
                
//                 if(ticket.genesisId == selectedTicket._id && ticket.status != "Closed Ticket"){
               
//                     return true
//                 }
//             } )

//             if(ticketCheck != null){
//                 this.$toast.warning("You already have an open ticket based on this ticket")
//                 return
//             }

//             this.ticket.department = selectedTicket.department
//             this.ticket.location = selectedTicket.location
//             this.ticket.email = selectedTicket.email
//             this.ticket.extension = selectedTicket.extension
//             this.ticket.phone = selectedTicket.phone
//             this.ticket.category = selectedTicket.category
//             this.ticket.assignedTo = null
//             this.ticket.raisedBy = selectedTicket.raisedBy
//             this.ticket.raisedFor = selectedTicket.raisedFor
//             this.ticket.problemDetails = selectedTicket.problemDetails
//             this.team = this.teams.find((team)=> team.name == this.ticket.department)
//             this.ticket.assignedTo = null
//             this.ticket.genesis = false
//             this.ticket.genesisId = id

//             this.ticket.higherApprover = null

//             this.ticket.hasService = this.hasService;
//             this.ticket.remarks = selectedTicket.remarks
        
//             if(selectedTicket.raisedFor != "Not Required" && selectedTicket.raisedFor != null){


             
//                 this.ticket.raisedFor = selectedTicket.raisedFor.empName + '/' + selectedTicket.raisedFor.designation + '/' + selectedTicket.raisedFor.unit
//             }else{
//                 this.ticket.raisedFor = null
//             }


        
          
//             this.searchCheck = false
//         }

//     }
// }

</script>