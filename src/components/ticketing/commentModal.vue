<template>
    

    <div class=" w-2/4 h-auto bg-white flex flex-col rounded-md p-5 pt-10 border border-solid border-black" style="left:350px; top:-200px; z-index:4000;  transition:0.5s smooth;  position:fixed" ref="modal" id="modal">
        
        <div class="flex flex-row w-full h-full" v-if="value=='Supervisor Approved'  || value=='Close Request Rejected' || value == 'reject' ">
                   <div class="w-1/6 font-bold text-center" >
                       Comment:
                   </div>
                   <div class="w-5/6 ">
                         <textarea  class="border-2 border-solid w-full border-slate-300 p-3" @change="handleCommentChange"></textarea>
                   </div>
          </div>


          <div class="flex flex-col w-full h-full" v-else-if="value=='Asking For Information'">
                
            <div class="flex flex-row w-full h-full mb-2">
              
                     <div class="w-1/6 font-bold text-center" >
                                        Seek Information From:
                                   </div>
                                   <div class="w-5/6 h-full border-2 border-solid border-slate-300">
                                        <vss searchable="true" :options="computedUsers" @change="handleApproverChange"/>
                                   </div>
            </div>
            <div class="flex flex-row w-full h-full">
                     <div class="w-1/6 font-bold text-center" >
                                           Comment: 
                                       </div>
                                       <div class="w-5/6">
                                             <textarea  class="border-2 border-solid border-slate-300 w-full p-2" @change="handleCommentChange"></textarea>
                                       </div>
                </div>
        </div>

        
        <div class="flex flex-col w-full h-full" v-else-if="value=='Asking For Approval'">
                
            <div class="flex flex-row w-full h-full mb-2">
              
                     <div class="w-1/6 font-bold text-center" >
                                        Seek Approval From:
                                   </div>
                                   <div class="w-5/6 border-2 border-solid border-slate-300">
                                        <vss searchable="true" :options="computedUsers" @change="handleApproverChange"/>
                                   </div>
            </div>
            <div class="flex flex-row w-full h-full">
                     <div class="w-1/6 font-bold text-center" >
                                           Comment: 
                                       </div>
                                       <div class="w-5/6">
                                             <textarea  class="border-2 border-solid border-slate-300 w-full p-2" @change="handleCommentChange"></textarea>
                                       </div>
                </div>
        </div>

          <div class="flex flex-col w-full h-full" v-else-if="value=='Close Request Accepted'">
            <div class="flex flex-row mt-2 mb-2">
                       <div class="w-1/6 font-bold text-center" >
                                            Extra Files:
                                        </div>
                                        <div class="w-5/6">
                                              <input type="file" @change="handleFileChange" multiple>
                                        
                                              <div  v-for="(file, fileCounter) in files" :key="fileCounter" class="flex-row flex mt-1 w-full">
                                         
                                                 <div class="w-1/2"> {{ file.name }}</div>
                        
                                           <div class="w-1/2"> <font-awesome-icon icon="fa-solid fa-circle-minus" class="ml-4 hover:cursor-pointer" @click="removeFile(fileCounter)"/></div>
                                        </div>
                                        </div>
                 </div>   
            <div class="flex flex-col w-full mt-4">
                <div class="w-full font-bold text-center" >
                                       Please write the solution you used to solve the problem (mandatory):
                                   
                            </div>
                                   <div class="w-full ">
                                         <textarea  class="border-2 border-solid w-full border-slate-400 p-3" @change="handleCommentChange"></textarea>
                                   </div>
                                   <div class="text-red-500 text-lg">*{{ warning }}</div>
            </div>
          </div>



          <div class="flex flex-col w-full h-full" v-else-if="value=='Request For Higher Approval'">
                
              <div class="flex flex-row w-full h-full mb-2">
                
                       <div class="w-1/6 font-bold text-center" >
                                          Approver:
                                     </div>
                                     <div class="w-5/6 border-2 border-solid border-slate-300">
                                          <vss searchable="true" :options="computedUsers" @change="handleApproverChange"/>
                                     </div>
              </div>
              <div class="flex flex-row w-full h-full">
                       <div class="w-1/6 font-bold text-center" >
                                             Comment: 
                                         </div>
                                         <div class="w-5/6">
                                               <textarea  class="border-2 border-solid border-slate-300 w-full p-2" @change="handleCommentChange"></textarea>
                                         </div>
                  </div>
          </div>


          <div class="flex flex-col w-full h-full" v-else-if="value=='Ticket Assigned'">
             
               <div class="flex flex-row w-full h-full mt-2 mb-2">
                  <table>
                    <thead class="mb-10">
                        <th class="pb-4">User</th>
                        <th class="pb-4">Email</th>
                        <th class="pb-4">Currently Assigned</th>
                        <th class="pb-4"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(user, userCounter) in support" :key="userCounter">
                          <td class="text-start pl-10 pb-5">{{user.user.empName}}</td>
                          <td class="text-start pl-10 pb-5">{{user.user.mailAddress}}</td>
                          <td class="text-start pl-10 pb-5">{{user.numbers}}</td>
                          <td class="text-start pl-10 pb-5" ><input type="radio" :value="user.user.empName" name="assignCheck" @change="handleApproverChange2"></td>
                        </tr>
                    </tbody>
                  </table>
               </div>
               <div class="flex flex-row w-full h-full">
                       <div class="w-1/6 text-center font-bold" >
                                           Comment: 
                                       </div>
                                       <div class="w-5/6">
                                             <textarea  class="border-2 border-solid border-slate-300 w-full p-2" @change="handleCommentChange"></textarea>
                                       </div>
                </div>
          </div>


          <div class="flex flex-col w-full h-full" v-else-if="value=='Reassign'">
             
            <div class="flex flex-row w-full h-full mt-2 mb-2">
                <table>
                  <thead class="mb-10">
                      <th class="pb-4">User</th>
                      <th class="pb-4">Email</th>
                      <th class="pb-4">Currently Assigned</th>
                      <th class="pb-4"></th>
                  </thead>
                  <tbody>
                      <tr v-for="(user, userCounter) in support" :key="userCounter">
                        <td class="text-start pl-10 pb-5">{{user.user.empName}}</td>
                        <td class="text-start pl-10 pb-5">{{user.user.mailAddress}}</td>
                        <td class="text-start pl-10 pb-5">{{user.numbers}}</td>
                        <td class="text-start pl-10 pb-5" ><input type="radio" :value="user.user.empName" name="assignCheck" @change="handleApproverChange2"></td>
                      </tr>
                  </tbody>
                </table>
             </div>
             <div class="flex flex-row w-full h-full">
                     <div class="w-1/6 text-center font-bold" >
                                         Comment: 
                                     </div>
                                     <div class="w-5/6">
                                           <textarea  class="border-2 border-solid border-slate-300 w-full p-2" @change="handleCommentChange"></textarea>
                                     </div>
              </div>
          </div>


      



          <div class="flex flex-col w-full h-full" v-else-if="value == 'Giving Information' || value =='Close Request' || value =='Higher Authority Approved'">
                

            


                 <div class="flex flex-row mt-2 mb-2">
                       <div class="w-1/6 font-bold text-center" >
                                            Extra Files:
                                        </div>
                                        <div class="w-5/6">
                                              <input type="file" @change="handleFileChange" multiple>
                                        
                                              <div  v-for="(file, fileCounter) in files" :key="fileCounter" class="flex-row flex mt-1 w-full">
                                         
                                                 <div class="w-1/2"> {{ file.name }}</div>
                        
                                           <div class="w-1/2"> <font-awesome-icon icon="fa-solid fa-circle-minus" class="ml-4 hover:cursor-pointer" @click="removeFile(fileCounter)"/></div>
                                        </div>
                                        </div>
                 </div>
                 <div class="flex flex-row">
                       <div class="w-1/6 font-bold text-center mt-2" >
                                             Comment:
                                         </div>
                                         <div class="w-5/6">
                                               <textarea  class="border-2 border-solid border-slate-300 w-full" @change="handleCommentChange"></textarea>
                                         </div>
                  </div>
          </div>



          
          <div class="flex flex-row w-full h-full justify-end " >
           <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="proceed">Proceed</button> 
           <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="$emit('cancel')">Cancel</button>
        </div>

          
     


          
        
        
    </div>


</template>


<script>
   import {useAuthStore} from "../../stores/authentication"
   import {useGlobalStore} from "../../stores/globalStore"
   import {useTicketStore} from "../../stores/ticket"
   import { useUserStore } from '../../stores/users'
   import {mapStores} from "pinia"
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
    data(instance){
        return {
            modalCheck:false,
            comment:'',
            files:[],
            value:'',
            users:[],
            support:[],
            filesCheck:false,
            tickets:[],
            warning:""
           
          

        }
    },

    components:{StarRating},

    props:['ticket'],

    computed:{

        ...mapStores(useAuthStore, useGlobalStore, useTicketStore, useUserStore),
        computedUsers(){
            var newUsers = this.usersStore.users.map((user)=>{
                return `${user.empName} --- ${user.mailAddress} (${user.designation})`
            })

            return newUsers
        }
    },

    created(){
        this.getTickets()
        this.usersStore.getApprovers()
        this.getSupport()
       
    },


   



    updated(){
      
        var modal = document.getElementById('modal')
        if(this.modalCheck){
    
            this.$gsap.set(modal, { top:100, visibility:'visible'})
            this.modalCheck = true
        }
    
    },

    methods:{

        getTickets(){
           var vm = this;
           var user = this.authStore.user;
           var data = new FormData();
           data.append("user", JSON.stringify(user))

           axios.post(this.globalStore.globalUrl + "getTickets", data).then((result)=>{
            vm.tickets = result.data

           }).catch((error)=>{
            vm.$toast.warning(error)
           })
        },

        setRating(rating){
      
      this.$emit("rating", rating)
    },
        commentBox(value){
          
             var vm = this;
           
             this.value = value;
         
                 
            const modal = this.$refs.modal

            if(this.modalCheck == false){
                this.$gsap.to(modal, {top:100})
                this.modalCheck = true
                // this.$refs.modal.style.top = "300px";
      
            }else if(this.modalCheck == true){
                this.$gsap.to(modal, { top:-300 })
                this.modalCheck = false
                // this.$refs.modal.style.top = "10px";
           
            }

            
         

          
},


handleFileChange(event){
    var vm = this
  this.$emit('fileChange', event.target.files)
  for(var x of event.target.files){
    vm.files.push(x)
  }
  this.filesCheck = true
},

removeFile(counter){
    this.$emit('removeFile', counter)
            this.files.splice(counter, 1)
         },



handleCommentChange(event){
    this.comment = event.target.value;
    this.$emit('commentChange', event.target.value)
},

handleInfoChange(event){
    this.$emit('infoChange', event.target.value)
},

handleApproverChange(event){
    debugger
    var value = event

    var splitted = value.split("---")[1].split("(")[0].trim();

    var user = this.usersStore.users.find((user)=>{
        
        return user.mailAddress == splitted;

    });

    this.$emit("approverChange", user)
},


handleApproverChange2(event){
   
    var value = event.target.value
  
    var user = this.users.find((user)=>{
        
        return user.empName == value;

    });

    this.$emit("approverChange", user)
},


getApprovers(){
            var vm = this
            var token = this.authStore.getToken
            var data = {
                token
            }
			axios.post(this.globalStore.globalUrl + 'getUsers', data).then(function(response){
			    vm.users = response.data.filter((user)=>user.userType == 'normal' || user.userType == 'leader' || user.userType == 'support' );
		
			
			}
				
			).catch(function(error){
			    vm.$toast.warning(error)
			});
        },

    getSupport(){
        var vm = this;
        var token = this.authStore.getToken;
        var user = this.authStore.getUser;
        var ticket = this.ticket

        var data = new FormData();
        data.append("token", token);
        data.append("user", JSON.stringify(user));
        data.append("ticket", JSON.stringify(ticket));

    



        axios.post(this.globalStore.globalUrl + "getSupport", data).then((result)=>{
            vm.support = result.data.map((user)=>{
               var newObject = {
                user:user.user,
                numbers:0
               }

               var tickets = vm.tickets.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.mailAddress == user.user.mailAddress)
               newObject.numbers = tickets.length;

               return newObject
            });
 

        }).catch((error)=> vm.$toast.warning(error));


    },


    proceed(){
        if(this.value == "Close Request Accepted"){
            if(this.comment == "" || this.comment == null){
                this.warning = "You need to write the solution used to solve the problem"
                return
            }
        }
        this.$emit('modalCall', this.value)
    }



    }
}



</script>