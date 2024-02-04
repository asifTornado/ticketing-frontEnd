<template class="flex flex-col w-full h-[92vh]">
 


  
<div v-if="commentFilesCheck" style="z-index:999999" class="border border-solid border-black w-[350px] h-[300px] fixed bottom-[10px] right-[2px] bg-white  flex flex-col justify-between">
  <div> <div class="p-2 hover:cursor-pointer" @click="commentFilesCheck = false"><font-awesome-icon icon="fa-solid fa-multiply"/></div>
   <div class="w-full h-[120px] overflow-y-scroll relative p-5" >
     
     <div class="w-full flex flex-row justify-between" v-for="(file, fileCounter) in commentFiles">
      <div>{{ file.name }}</div>
      <div class="p-2 hover:cursor-pointer" @click="removeCommentFiles(fileCounter)"><font-awesome-icon icon="fa-solid fa-multiply"/>
         
      </div>
   </div>
   
   </div>
</div>
 <div>  
   <div class="w-full  bg-gray-400 h-12"> 
         <input type="text" name="" class="h-full w-full px-4 py-2 bg-gray-200" placeholder="Caption (optional)" id="" v-model="caption">
   </div>
   <div class="flex flex-row w-full justify-between items-center bg-gray-300">
    <label for="file" class="hover:cursor-pointer ml-4">  <div class="p-3"><font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
        
      </div></label>
      <input type="file" name="Attack File" id="file" placeholder="Attach File" class='hidden' multiple  @change="setCommentFiles($event)" />
      <div class="mr-10 hover:cursor-pointer" @click="sendCommentFiles"><font-awesome-icon icon="fa-regular fa-paper-plane" size="lg"/></div>
   </div></div>
</div>



<div  v-if="mentionCheck" tabindex="0" @keydown="handleMentionKeyDown" style="z-index:999999" class="border border-solid border-black w-[350px] h-[300px] fixed bottom-[10px] right-[2px] bg-white  flex flex-col justify-between">
   <div @keydown="handleMentionKeyDown"  style="z-index:1"> <div class="p-2 hover:cursor-pointer" @click="mentionCheck = false" style="z-index:1"><font-awesome-icon icon="fa-solid fa-multiply"/></div>
    <div class="w-full h-[200px] overflow-y-scroll relative p-5" style="z-index:1">
      
      <div class="w-full flex flex-row justify-between mt-2"  @keydown="handleMentionKeyDown" style="z-index:1" v-for="(mention, mentionCounter) in mentions">
        <vss searchable="true" :options="computedUsers" v-model="mentions[mentionCounter]" style="z-index:0"/>
       <div class="p-2  hover:cursor-pointer" @click="addMention(mentionCounter)">
         <font-awesome-icon icon="fa-solid fa-plus"/>
       </div>
       <div class="p-2 hover:cursor-pointer" @click="removeMention(mentionCounter)" v-if="mentionCounter != 0">
         <font-awesome-icon icon="fa-solid fa-multiply"/>
       </div>
       
    </div>
    
    </div>
 </div>
  <div>  
    <div class="w-full  bg-gray-400 h-12" style="z-index: 2;"> 
          <input style="z-index: 2;" type="text" name="" class="h-full w-full px-4 py-2 bg-gray-200" placeholder="Message (optional)" id="" v-model="mentionMessage" @keydown="handleMentionKeyDown">
    </div>
    <div class="flex flex-row w-full justify-between items-center bg-gray-300">
  
       
       <div class="mr-10 hover:cursor-pointer p-2" @click="makeMentions"><font-awesome-icon icon="fa-regular fa-paper-plane" size="lg"/></div>
    </div></div>
 </div>



   <CommentModal ref="commentModal" :ticket="ticket" @rating="setRating" @modal-Call="handleModalCall" @cancel="cancel" @file-Change="handleFileChange" @comment-Change="handleCommentChange" @info-Change="handleInfoChange" @call="handleCall" @approver-Change="handleApproverChange" @remove-File="handleRemoveFile"  />
   <div class="flex flex-row w-[97vw] h-[90vh] ml-[40px]   " ref="main">
    
      
  

   
       <div class="  w-2/6 h-[92vh]  overflow-y-scroll   p-2 border bg-gray-100  ">

         <vue-collapsible-panel-group accordion>
            <vue-collapsible-panel :expanded="true">
                <template #title>
                    Ticket Info
                </template>
                <template #content>
                   
   <div class="flex flex-row w-11/12 mt-2" v-if="ticket.raisedFor">
      <div class="w-2/4">
           Raised On Behalf Of:
      </div>
    
      <div class="w-2/4 text-right" v-if="ticket.raisedFor && ticket.raisedFor.mailAddress != null">
             {{ticket.raisedFor.empName}} 
            <i>{{ ticket.raisedFor.Designation}}, {{ticket.raisedFor.unit }}</i> <br/>
            <i>Extension:<template v-if="ticket.raisedFor.extension">{{ ticket.raisedFor.extension}},</template><template v-else>N/A,</template> 
               Phone:<template v-if="ticket.raisedFor.phone">{{ ticket.raisedFor.phone}},</template><template v-else>N/A,</template>
               Email:<template v-if="ticket.raisedFor.mailAddress">{{ ticket.raisedFor.mailAddress}}</template><template v-else>N/A,</template>
           </i>
      </div>
    
      <div class="w-2/4 text-right" v-else>
            Not Available
      </div>
    </div>
    
    
    <div class="flex flex-row w-11/12 mt-2">
      <div class="w-2/4">
           Request Date:
      </div>
    
      <div class="w-2/4 text-right">
           {{ ticket.actions[0].time }}
      </div>
    </div>
    
    
    <div class="flex flex-row w-11/12 mt-2 h-auto border-2 border-dotted border-red-500">
      <div class="w-2/4 text-lg font-bold text-black p-3">
           Problem in Details:
      </div>
    
      <div class="w-2/4 text-right text-lg font-bold text-black p-3 " style="word-wrap: break-word; max-width:50%" >
           {{ ticket.problemDetails }}
      </div>
    </div>
    
    
    <template v-if="ticket.details && ticket.details.length > 0">     
    
    <div class="flex flex-row w-11/12 mt-2" v-for="(detail, detailCounter) in ticket.details">
      <div class="w-2/4">
           {{detail.label}}
      </div>
    
      <div class="w-2/4 text-right">
           {{ detail.input }}
      </div>
    </div>
    </template>
    

    

    
    
    <div class="flex flex-row w-11/12 mt-2">
      <div class="w-2/4">
           Department:
      </div>
    
      <div class="w-2/4 text-right">
           {{ ticket.department }}
      </div>
    </div>
    
    
    
    <div class="flex flex-row w-11/12 mt-2">
      <div class="w-2/4">
           Location:
      </div>
    
      <div class="w-2/4 text-right">
           {{ ticket.raisedBy.unit }}
      </div>
    </div>
    
    
    
    <div class="flex flex-row w-11/12 mt-2">
      <div class="w-2/4">
           Assigned To:
      </div>
    
      <div class="w-2/4 text-right">
      <template v-if="ticket.assignedTo">
             {{ ticket.assignedTo.mailAddress }}
      </template> 
      <template v-else>
         Not Assigned Yet
      </template>   
      </div>
    </div>
    
    
    <div class="flex flex-row w-11/12 mt-2" v-if="ticket.ticketingHead">
      <div class="w-2/4">
           Department Head:
      </div>
    
      <div class="w-2/4 text-right" style="word-wrap: break-word; max-width:50%" >
    
             {{ ticket.ticketingHead.mailAddress }}
    
      
      </div>
    </div>
    
    
    
  
    
    
    <div class="flex flex-row w-11/12 mt-3">
      <div class="w-2/4 font-bold">
           Current Status:
      </div>
    
      <div class="w-2/4 text-lg font-bold text-black text-right">
           {{ ticket.status }}
      </div>
    </div>
    
    <div class="flex flex-row w-11/12 mt-3">
      <div class="w-2/4">
           Raiser's Comment:
      </div>
    
      <div class="w-2/4 text-lg  text-black text-right">
           <template v-if="ticket.remarks">{{ ticket.remarks }}</template>
           <template v-else>Not Available</template>
      </div>
    </div>
    
    
    <div class="flex flex-row w-11/12 mt-3 ">
      <div class="w-2/4">
           Relevant Files:
      </div>
    
      <div class="w-2/4 text-lg font-bold text-black text-right">
         <div class="flex flex-col ">
    
            <div v-for="(file, fileCounter) in ticket.actions[0].files" :key="fileCounter"><a :href="globalUrl + 'uploads/' + file.fileName" target="__blank" class="underline" >{{file.originalName}}</a></div>
         </div>
           
      </div>
    </div>
                </template>
            </vue-collapsible-panel>
            <vue-collapsible-panel :expanded="false">
                <template #title>
                    Ticket Raiser Info
                </template>
                <template #content>
                  <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Raised By:
                     </div>
                   
                     <div class="w-2/4 text-right">
                            {{ticket.raisedBy.empName}} 
                          
                     </div>
                   </div>
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Raiser's Email:
                     </div>
                   
                     <div class="w-2/4 text-right" >
                           <span v-if="ticket.email">{{ ticket.email }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Raiser's Phone:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.phone">{{ ticket.phone }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Raiser's Extension:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.extension">{{ ticket.extension }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Raiser's Location:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.location">{{ ticket.location }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
            
              
                </template>
            </vue-collapsible-panel>
            <vue-collapsible-panel :expanded="false" v-if="ticket.currentHandler">
               <template #title>
                   Current Handler Info
               </template>
               <template #content>
                  <div class="flex flex-row w-11/12 mt-3">
                     <div class="w-2/4 font-bold">
                          Current Handler:
                     </div>
                   
                     <div class="w-2/4 text-lg  text-black text-right">
                        {{ticket.currentHandler.empName}} 
                          
                     </div>
                   </div>
                   
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Current Handler's Email:
                     </div>
                   
                     <div class="w-2/4 text-right">
                           <span v-if="ticket.currentHandler.mailAddress">{{ ticket.currentHandler.mailAddress }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Current Handler's Phone:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.currentHandler.phone">{{ ticket.currentHandler.phone }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Current Handler's Extension:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.currentHandler.extension">{{ ticket.currentHandler.extension }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
                   
                   <div class="flex flex-row w-11/12 mt-2">
                     <div class="w-2/4">
                          Current Handler's Location:
                     </div>
                   
                     <div class="w-2/4 text-right">
                        <span v-if="ticket.currentHandler.location">{{ ticket.currentHandler.location }}</span><span v-else>Not Available</span>
                     </div>
                   </div>
               </template>
           </vue-collapsible-panel>
   
        </vue-collapsible-panel-group>

           
              
              
     
       
       </div>
   
   



     



   

       <div class="w-2/6 h-[92vh] pt-2 relative  text-center bg-blue overflow-y-scroll overflow-x-clip">
         <div class="flex flex-row w-full py-2 px-2  m-3 items-center" v-if="ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress ">
            
          <div>  <span class="font-bold">Set Ticket Priority:</span>
      
            <select class="ml-4 border border-solid border-black p-1" v-model="priority" @change="setPriority">
               <option value="Priority 1">Priority 1</option>
               <option value="Priority 2">Priority 2</option>
               <option value="Priority 3">Priority 3</option>
               <option value="Priority 4">Priority 4</option>
            </select>
         </div>


         <div>  <span class="font-bold">Set Ticket Type:</span>
      
            <select class="ml-4 border border-solid border-black p-1" v-model="priority" @change="setTicketType">
               <option value="Incident">Incident</option>
               <option value="Problem">Problem</option>
    
            </select>
         </div>


          </div>
         <ActionStatus :ticket="ticket"  />
         <div class="flex flex-row items-end w-full flex-wrap" >
             <Buttons  :ticket="ticket" @show-details="showDetails()" class='' @comment="modalToggle()" @call="handleCall" />
         </div>


         <Chat  :ticketId="ticket._id" :user="ticket.raisedBy.empName"   />

       </div>









       <div class="flex flex-row w-2/6 justify-start " style="z-index:1">
             <div class="border border-solid flex flex-col w-full p-4  " style="z-index: 99;"  >
                    
               <div class="font-bold flex flex-row text-4xl pb-2">
                  <div class="mr-4">
                           <font-awesome-icon icon="fa-regular fa-pen-to-square" size="2x"/>
                         </div>Comments</div>
                     <div class="border border-solid border-gray-400 flex flex-col overflow-y-scroll h-[60vh]" ref="commentBox">
                     <div class="flex flex-col mb-2 mt-2 mx-2 bg-gray-200 p-4" v-for="(note, notesCounter) in notes">
                      <div class="flex flex-row justify-start  items-end h-full ">
                       <div class="font-bold  text-lg">{{note.takenBy}}</div>  
                     
                     </div>
                      <div class="flex flex-row justify-between items-center " v-if="note.type == 'text' ">{{note.data}}
                        <div class="text-[10px] ml-3 mr-1 font-extralight">{{ note.date }}</div>
                     </div>
                     <div class="flex flex-col justify-between items-center " v-else-if="note.type == 'file' ">
                    <div class="flex flex-col w-full">
                     <div class="flex flex-row w-full items-center justify-start pb-3">{{note.caption}}</div>    
                     <div v-for="(file, fileCounter) in note.files" :key="fileCounter" class="flex flex-row w-full">
                           <a :href="this.globalUrl + 'uploads/' + file.fileName" target="_blank" class="underline hover:cursor-pointer">{{file.originalName}}</a>
                           
                     </div>
                  </div>
                        <div class="text-[10px] ml-3 mr-1 font-extralight flex flex-row w-full justify-end">{{ note.date }}</div>
                     </div>

                     <div class="flex flex-col justify-between items-center " v-else-if="note.type == 'mention' ">
                        <div class="flex flex-col w-full">
                         <div class="flex flex-row w-full items-center justify-start pb-3">{{note.caption}}</div>    
                         <div v-for="(mention, mentionCounter) in note.mentions" :key="mentionCounter" class="mt-2 flex flex-row w-full text-blue-500 underline">
                             @{{mention}}
                               
                         </div>
                      </div>
                            <div class="text-[10px] ml-3 mr-1 font-extralight flex flex-row w-full justify-end">{{ note.date }}</div>
                         </div>
                     </div>
                     </div>
                     
                     <div class="flex flex-row w-full justify-center  items-center border border-solid border-gray-200">
                       
                         <div  class="flex flex-col  justify-center items-center pt-2">
                            <textarea name="" id="" cols="52" rows="2" v-model="note" placeholder="Comment here" class="p-3 border border-solid border-gray-400" @input="handleInput" @keydown="handleSubmitKeyDown"> 
                             
                            </textarea>
                            <ul v-if="showSuggestions" class="mention-suggestions">
                              <li v-for="suggestion in suggestions"  @click="selectSuggestion(suggestion)">
                                {{ suggestion.empName }}
                              </li>
                              </ul>
                         <div class="flex flex-row justify-around w-full items-center">   <div class="mt-4 bg-white  text-black border border-solid border-gray-500 hover:bg-gray-500 hover:text-white font-bold text-lg p-3 rounded-sm  hover:cursor-pointer  mb-2" @click="addNote">Submit</div>
                         <div for="file" class='hover:cursor-pointer bg-white  h-auto text-black border border-solid border-gray-500 hover:bg-gray-500 hover:text-white font-bold p-3 text-lg mt-4 mb-2' @click="openMention()">Mention</div>
                         <div for="file" class='hover:cursor-pointer bg-white  h-auto text-black border border-solid border-gray-500 hover:bg-gray-500 hover:text-white font-bold p-3 text-lg mt-4 mb-2' @click="openCommentFiles()">Attach File</div>
                      </div>
                         </div>   
                         
                     </div>
         
                  </div>
     </div>





       
     
   
   </div>
   
   
   
   
   <div  class="flex flex-col bg-white text-black  w-[900px] h-[500px] pt-10  mt-10 px-10 fixed overflow-y-scroll border-2 border-black border-solid" style="top:50px; left:250px; display:none; transition: 0.50s; z-index: 1233333333333333333;" ref="details" >
              <div class="flex flex-row text-4xl font-extrabold">Details</div>
      <template v-for="(action, actionCounter) in reversedActions" :key="actionCounter">
    
                  <div class="flex flex-col bg-white mt-10" >
                  
                        <span class="ml-10 ">{{ action.time }}</span>  
                        <hr class="border border-solid border-black w-full"/>  

                        <div class="flex flex-row pl-10 ">
                           <div class="w-1/4 flex flex-row justify-between">
                               <div >Action Serial Number</div>
                               <div>:</div>

                           </div>
                           <div class="w-3/4 ml-4">{{ action.serial }}</div>
                        </div>


                        <div class="flex flex-row pl-10 mt-1">
                           <div class="w-1/4 flex flex-row justify-between">
                               <div >Action Type</div>
                               <div>:</div>

                           </div>
                           <div class="w-3/4 ml-4">
                           
                              {{ getActionType(action) }}
                           
                           </div>
                        </div>

                   

                          
                    <template v-if="action.type == 0">
                       <Actions v-if="ticket.approvalRequired == 'yes'" :action="'Raised By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                       <Actions v-else :action="'Raised By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                    </template>


                    <template v-else-if="action.type == 1">
                       <Actions  :action="'Approved By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                      
                    </template>

                    <template v-else-if="action.type == 3">
                       <Actions  :action="'Approved By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                      
                    </template>


                    <template v-else-if="action.type == 2">
                       <Actions  :action="'Request By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                      
                    </template>

                    <template v-else-if="action.type == 5">

                       <Actions  :action="'Assigned By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                    </template>


                    <template v-else-if="action.type == 10">

                       <Actions  :action="'Requested By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwarded To'" :comment="action.comments" />
                    </template>


                    <template v-else-if="action.type == 11">

                       <Actions  :action="'Response By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwared To'" :comment="action.comments" />
                    </template>


                    <template v-else-if="action.type == 12">

                   <Actions  :action="'Response By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwared To'" :comment="action.comments" />
                  </template>


                  

                  <template v-else-if="action.type == 6">

<Actions  :action="'Asked By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Asked From'" :comment="action.comments" />
</template>

<template v-else-if="action.type == 7">

<Actions  :action="'Given By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Give To'" :comment="action.comments" />
</template>

<template v-else-if="action.type == 8">

<Actions  :action="'Rejected By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Ticket From'" :comment="action.comments" />
</template>

<template v-else-if="action.type == 4">

<Actions  :action="'Assigned By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Assigned To'" :comment="action.comments" />
</template>


<template v-else-if="action.type == 9">

<Actions  :action="'Assigned By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Assigned To'" :comment="action.comments" />
</template>
             
                 


<template v-else-if="action.type == 14">

<Actions  :action="'Rated By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Assigned To'" :comment="action.comments" />
</template>


<template v-else-if="action.type == 15">

<Actions  :action="'Re-opened By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Assigned To'" :comment="action.comments" />
</template>
             














                    


                        
                 </div>


      </template>
      <div class="flex flex-row items-center justify-end mb-2 sticky bottom-2">
         <div class="p-3 text-white font-bold bg-blue-500 rounded-sm hover:cursor-pointer" @click="showDetails" >Close</div>
       </div>  
      
   </div>
   
   
   </template>
   
   
   
   <script>

   import Actions from './actions.vue'
   import Buttons from './buttons.vue'
   import CommentModal from './commentModal.vue'
   import mixin from './handlerMixin.js'
   import ActionStatus from './actionStatus.vue'
   import Chat from '../chat.vue';
   import {useAuthStore} from "../../stores/authentication"
   import {useGlobalStore} from "../../stores/globalStore"
   import {useTicketStore} from "../../stores/ticket"
   import { useUserStore } from '../../stores/users'
   import {mapStores} from "pinia"
  
   import axios from "axios";

   export default{
      data(instance){
       return {
         showSuggestions: false,
      suggestions: [],
           showDetailsCheck:false,
           comment:'',
           commentCall:false,
           users:[],
           componentTicket:null,
           files:[],
           additionalInfo:'',
           approver:null,
          
           socket:null,
           user:null,
           modalCheck:false,
           rating:0,
           note:"",
           notes:[],
           priority:'',
           commentFiles:[],
           caption:'',
           commentFilesCheck:false,
           mentionCheck:false,
           mentions:['',],
           mentionMessage:'',
           ticketType:''
       
        
       }
      },

      mixins:[mixin],

      mounted(){
        this.componentTicket = this.ticket
      },



      created(){
          this.usersStore.getApprovers()
          this.getNotes()
          this.user = this.authStore.user
          this.priority = this.ticket.priority || null
          this.ticketType = this.ticket.ticketType
        

      },
   
      props:['ticket', 'currentHandlerType'],
      components:{Actions, Buttons, CommentModal, ActionStatus, Chat},

      computed:{

         ...mapStores(useAuthStore, useUserStore, useTicketStore, useGlobalStore),

            user(){
               var user = this.authStore.user
               return user
            },
            reversedActions(){
               return this.ticket.actions.slice().reverse()
            },

            computedUsers(){
            var newUsers = this.users.map((user)=>{
                return `${user.empName} --- ${user.mailAddress} (${user.designation})`
            })

            return newUsers
        }
      },

      methods:{


     
      setFile(event){
            for(var x of event.target.files){
                this.files.push(x)
            }

            
        },

        removeFile(counter){
            this.files.splice(counter, 1)
        },


   

          showDetails(){
      if(this.showDetailsCheck == false){
          this.$refs.details.style.display = "block"
   
          this.showDetailsCheck = true        
      }else{
         this.$refs.details.style.display = "none"
   
         this.showDetailsCheck = false
      }
    },

    modalToggle(value){
    
     if (this.$refs.commentModal) {
        this.$refs.commentModal.commentBox(value);
      }

 

   },

    handleCall(value){
          this.modalToggle(value)
    },

    cancel(){
      this.modalToggle('cancel')
    },

    addMention(){
         var newMention = '';
        
         this.mentions.push(newMention)
    },

    removeMention(counter){
      this.mentions.splice(counter, 1)

    },

    makeMentions(){
      var vm = this;
      vm.mentionCheck = false;
      var ticket = this.ticket;
      var user = this.authStore.user;
      var mentions = this.mentions;
      var newMentions = mentions.map((mention)=>{
      


         
         var splitted = mention.split("---")[1].split("(")[0].trim()
         var user = vm.users.find((user)=>{
            return user.mailAddress == splitted
         })

         return user.empName;

 
      })


      var newMentions2 = []

 



      var data = new FormData();
      data.append("user", JSON.stringify(user));
      data.append("mentions", JSON.stringify(newMentions));

      data.append("date", new Date().toDateString());
      data.append("ticket", JSON.stringify(ticket));
      data.append("message", vm.mentionMessage)

      axios.post(this.globalStore.globalUrl + "makeMentions", data).then((result)=>{
                    
            vm.mentions = ['',]
            vm.notes = [...vm.notes, result.data]
            vm.$nextTick(() => {


this.$refs.commentBox.scrollTo({
  top: this.$refs.commentBox.scrollHeight,
  behavior: 'smooth'
});
});


      }).catch((error)=>vm.$toast.warning(error))




    

    },

    handleMentionChange(event, counter){
    

    var value = event.target.value
 
    var splitted = value.split("---")[1].split("(")[0].trim();
 
    var user = this.users.find((user)=>{
        
        return user.mailAddress == splitted;

    });

    this.mentions[counter] = user
    },

    openMention(){
         this.mentionCheck = !this.mentionCheck
    },

    openCommentFiles(){
       this.commentFilesCheck = !this.commentFilesCheck
    },

    setCommentFiles(event){
      var vm = this;
       for(var x of event.target.files){
           vm.commentFiles.push(x)
       }
    },

    removeCommentFiles(counter){
      var vm = this;
      vm.commentFiles.splice(counter, 1)
    },


    sendCommentFiles(){
         var vm = this;
         vm.commentFilesCheck = false;
         var ticket = this.ticket;
       
         var token = this.authStore.token;
         var userName = this.authStore.user.empName;
         var date = new Date().toDateString()
         var data = new FormData();
         for(var x of vm.commentFiles){
                data.append('file', x)
            }
         data.append("token", token);
         data.append("caption", vm.caption)
  
         data.append("id", ticket._id);
         data.append("userName", userName)
         data.append("date", date)
         axios.post(this.globalStore.globalUrl + "uploadCommentFiles", data).then((result)=>{
         
            vm.notes = [...vm.notes, result.data]
            vm.$nextTick(() => {


this.$refs.commentBox.scrollTo({
  top: this.$refs.commentBox.scrollHeight,
  behavior: 'smooth'
});
});
         }).catch((error)=>{
            vm.$toast.warning(error)
         })
        },

   removeFile(counter){
            this.files.splice(counter, 1)
         },


   handleRemoveFile(counter){
        this.removeFile(counter)
   },

   setRating(value){
     this.rating = value
   },



   handleModalCall(value){

      if(value == 'Supervisor Approved'){
         this.supervisorApprove(this.comment, this.ticket)
      }else if(value == 'Higher Authority Approved'){
         this.higherApprove(this.comment, this.files, this.ticket, this.additionalInfo)
      }else if(value == "Request For Higher Approval"){
         
         this.askApproval(this.comment, this.ticket, this.approver)
      }else if(value == 'Ticket Assigned'){
  
           this.assignTicket(this.comment, this.approver, this.ticket)
           
    }else if(value == 'Ticket Accept'){
    
           this.assignSelf(this.comment, this.ticket)
           
    }else if(value == 'Close Request'){
      this.closeRequest(this.comment, this.files, this.ticket, this.additionalInfo)
    }else if(value == 'Close Request Accepted'){
      this.closeTicket(this.comment, this.ticket, this.rating, this.files)
    }else if(value == 'Close Request Rejected'){
      this.closeRequestReject(this.comment, this.ticket)
    }else if(value == 'Asking For Information'){
      this.ask(this.comment, this.ticket, this.approver)
    }else if(value == "Asking For Approval"){
      this.askApproval(this.comment, this.ticket, this.approver)
    }else if(value == 'Giving Information'){
      this.giveInfo(this.comment, this.files, this.ticket, this.additionalInfo)
    }else if(value == 'reject'){
      this.rejectTicket(this.comment, this.ticket)
    }else if(value == 'Reassign'){
      this.Reassign(this.comment, this.approver, this.ticket)
    }

   
      },

      handleFileChange(value){
         for(var x of value){
                this.files.push(x)
            }
      },

      handleCommentChange(value){
         this.comment = value
      },

      handleInfoChange(value){
         this.additionalInfo = value
      },

      handleApproverChange(value){
            debugger
            this.approver = value
      },

      getActionType(action){
         if(action.type == 0){
            return "New Ticket Raised"
         }else if(action.type == 1){
            return "Approval From Department Head"
         }else if(action.type == 2){
            return "Seeking Additional Approval"
         }else if(action.type == 3){
            return "Additinal Approval Given"
         }else if(action.type == 4){
            return "Accept Ticket"
         }else if(action.type == 5){
            return "Assigned Ticket"
         }else if(action.type == 6){
            return "Asking For Information"
         }else if(action.type == 7){
            return "Information Given"
         }else if(action.type == 8){
            return "Ticket Rejected"
         }else if(action.type == 9){
            return "Ticket Reassigned"
         }else if(action.type == 10){
            return "Close Request Sent"
         }else if(action.type == 11){
        
            return "Close Request Accepted"
         }else if(action.type == 12){
            return "Close Request Rejected"
         }else if(action.type == 14){
        
            return "Rated Ticket Handler"
         }else if(action.type == 15){
          
            return "Re-opened Ticket"
         }
      },


      addNote(){
         var vm = this;
         var ticket = this.ticket;
         var note = this.note;
         var token = this.authStore.token;
         var userName = this.authStore.user.empName;
         var date = new Date().toDateString()
         var data = new FormData();
         data.append("token", token);
         data.append("note", note);
         data.append("id", ticket._id);
         data.append("userName", userName)
         data.append("date", date)
         axios.post(this.globalStore.globalUrl + "insertNote", data).then((result)=>{
         
            vm.notes = [...vm.notes, result.data]
            vm.$nextTick(() => {


this.$refs.commentBox.scrollTo({
  top: this.$refs.commentBox.scrollHeight,
  behavior: 'smooth'
});
});
         }).catch((error)=>{
            vm.$toast.warning(error)
         })
            },


      getNotes(){
         var vm = this;
         var token = this.authStore.token;
      
         var ticketId = this.ticket._id;

         var data = new FormData();
         data.append("token", token);
         data.append("id", ticketId);
      

         axios.post(this.globalStore.globalUrl + "getNotes", data).then((result)=>{
              vm.notes = result.data
         }).catch((error)=>vm.$toast.warning(error))
      },



      
     handleSubmitKeyDown(event){

if(event.shiftKey && event.keyCode === 13){
   console.log("key pressed")
}else if(event.keyCode === 13){
   event.preventDefault();
   this.addNote()
}

},

handleMentionKeyDown(event){

if(event.shiftKey && event.keyCode === 13){
   console.log("key pressed")
}else if(event.keyCode === 13){
   event.preventDefault();
   this.makeMentions();
}

}


   
   
   }
}
   
   
   
   </script>