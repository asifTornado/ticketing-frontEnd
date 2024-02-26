<template>


<!-- no solution Check -->


 
<div v-if="nosolutionCheck" class=" w-2/4 h-auto bg-white flex flex-col rounded-md p-5 pt-10 border border-solid border-black" style="left:350px; top:100px; z-index:4000;  transition:0.5s smooth;  position:fixed" ref="modal" id="modal">
   <div class="flex flex-col w-full h-full" >
                   

                
                     <div class="flex flex-col w-full justify-center items-center ">
                         <div class="w-full font-bold text-center text-center text-lg" >
                                                What Happened?
                                            
                                     </div>
                                            <div class="w-full text-center">
                                               <select v-model="comments" @change="checkOther" class="border border-solid border-slate-400" >
                                                 <option selected disabled value="Please select an option">Please select an option</option>
                                                 <option value="Ticket raised by mistake">Ticket raised by mistake</option>
                                                 <option value="Ticket has wrong information">Ticket has wrong information</option>
                                                 <option value="Problem solved without any effort">Problem solved without any effort</option>
                                                 <option value="Others">Others</option>
                                                 
                                               </select>

                                            </div>
                                            <div class="w-full text-center mt-2" v-if="otherCheck">
                                                  <textarea model="otherNote" placeholder="Please write the reason" class="p-3 w-full border border-solid border-slate-400">

                                                  </textarea>
                                            </div>
                                            <div class="font-bold text-red-500">{{ warning }}</div>

                                           
                     </div>
                     
                   </div>
        
                   <div class="flex flex-row w-full h-full justify-end " >
           <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="closeTicketProceed">Proceed</button> 
           <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="cancelCloseTicket">Cancel</button>
        </div>

</div>




<!-- no solutionCheck End  -->


<div class="flex flex-col w-auto p-14 h-auto left-[500px] top-[100px] z-[9999999] border border-solid border-black  fixed bg-white" v-if="reopenCheck">
   <div class="flex flex-row mt-2 mb-2">
                       <div class="w-1/6 font-bold text-center mr-10" >
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


                     <div class="flex flex-row w-full mt-4">
                         <div class="w-1/6 font-bold text-center mr-10" >
                                                Comment:
                                            
                                     </div>
                                            <div class="w-5/6 ">
                                                  <textarea  class="border-2 border-solid w-full border-slate-300 p-3" v-model="comment"></textarea>
                                            </div>
                     </div>
             
                     <div class="flex flex-row w-full h-full justify-end " >
                      <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="reopen">Submit</button> 
                      <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="reopenCheck = false">Cancel</button>
                   </div>
                   </div>

   <!-- rating -->
   <div class="flex flex-col w-auto p-14 h-auto left-[500px] top-[100px] z-[9999999] border border-solid border-black  fixed bg-white" v-if="rateCheck">
                   

      <div class="flex flex-col justify-center items-center w-full mb-5">
            <div class="w-full font-bold text-center" >
                                 Please Rate Your Handler:
                             
                      </div>
                             <div class="w-full flex flex-row justify-center items-center">
                                   <StarRating @update:rating ="setRating" :max-rating="10" :show-rating="true" :active-on-click="true" :star-size="30"/>
                             </div>
      </div>
        <div class="flex flex-row w-full mt-4">
            <div class="w-1/6 font-bold text-center mr-10" >
                                   Comment:
                               
                        </div>
                               <div class="w-5/6 ">
                                     <textarea  class="border-2 border-solid w-full border-slate-300 p-3" v-model="comment"></textarea>
                               </div>
        </div>

        <div class="flex flex-row w-full h-full justify-end " >
         <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="rate">Submit</button> 
         <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="rateCheck = false">Cancel</button>
      </div>
      </div>

      <!-- rating  -->

   <div style="z-index:1233333333333333333333" class="overflow-y-scroll w-2/4 h-auto bg-white fixed top-[100px] left-[380px]  rounded-md p-5 pt-10 " v-if="reassignTicketCheck">
      <div class="flex flex-col w-full h-full bg-white" >
                
         <div class="flex flex-row w-full  mt-2 mb-2 bg-white overflow-y-scroll max-h-[300px]">
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
                                       <textarea  class="border-2 border-solid border-slate-300 w-full p-2" v-model="comment"></textarea>
                                 </div>
          </div>
    </div>
   
    <div class="flex flex-row w-full h-full justify-end " >
      <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="Reassign">Proceed</button> 
      <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="reassignTicketToggle">Cancel</button>
   </div>
   </div>

   
<div style="z-index:1233333333333333333333" class=" w-2/4 h-auto  bg-white fixed top-[100px] left-[380px]  rounded-md p-5 pt-10 border border-solid border-black" v-if="assignTicketCheck">
   <div class="flex flex-col w-full h-full bg-white" >
             
      <div class="flex flex-row w-full  mt-2 mb-2 bg-white max-h-[300px] overflow-y-scroll">
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
                 <td class="text-start pl-10 pb-5">{{user.user.numbers}}</td>
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
                                    <textarea  class="border-2 border-solid border-slate-300 w-full p-2" v-model="comment"></textarea>
                              </div>
       </div>
 </div>

 <div class="flex flex-row w-full h-full justify-end " >
   <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="assignTicket">Proceed</button> 
   <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="assignTicketToggle">Cancel</button>
</div>
</div>







<div v-if="assignSelfCheck"   style="z-index:1233333333333333333333" class=" w-2/4 h-auto bg-white fixed top-[100px] left-[380px]  rounded-md p-5 pt-10 border border-solid border-black" >
   <div class="flex flex-col w-full h-full bg-white" >
             

      <div class="flex flex-row w-full h-full">
              <div class="w-1/6 text-center font-bold" >
                                  Comment: 
                              </div>
                              <div class="w-5/6">
                                    <textarea  class="border-2 border-solid border-slate-300 w-full p-2" v-model="comment"></textarea>
                              </div>
       </div>
 </div>

 <div class="flex flex-row w-full h-full justify-end " >
   <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="assignSelf">Proceed</button> 
   <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="assignSelfToggle">Cancel</button>
</div>
</div>












   <div  v-if="mentionCheck" tabindex="0" @keydown="handleMentionKeyDown" style="z-index:999999999999999999999" class="border border-solid border-black w-[350px] h-[300px] fixed bottom-[10px] right-[2px] bg-white  flex flex-col justify-between">
   <div style="z-index:1"> <div class="p-2 hover:cursor-pointer" @click="mentionCheck = false" style="z-index:1"><font-awesome-icon icon="fa-solid fa-multiply"/></div>
    <div class="w-full h-[200px] overflow-y-scroll relative p-5" style="z-index:1">
      
      <div class="w-full flex flex-row justify-between mt-2"  style="z-index:1" v-for="(mention, mentionCounter) in mentions">
        <vss searchable="true" :options="computedUsers" v-model="mentions[mentionCounter]" style="z-index:0" tabindex="0" @keydown="handleMentionKeyDown" />
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
          <input style="z-index: 2;" type="text" name="" class="h-full w-full px-4 py-2 bg-gray-200" placeholder="Message (optional)" id="" v-model="mentionMessage" @keydown="handleMentionKeyDown" >
    </div>
    <div class="flex flex-row w-full justify-between items-center bg-gray-300">
  
       
       <div class="mr-10 hover:cursor-pointer p-2" @click="makeMentions"><font-awesome-icon icon="fa-regular fa-paper-plane" size="lg"/></div>
    </div></div>
 </div>


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
 
<div class=" w-2/4 h-auto bg-white flex flex-col rounded-md p-5 pt-10 border border-solid border-black" style="left:350px; top:100px; z-index:4000;  transition:0.5s smooth;  position:fixed" v-if="closeCheck" ref="modal" id="modal">
   <div class="flex flex-col w-full h-full" >
                   

                
                     <div class="flex flex-col w-full mt-4">
                         <div class="w-full font-bold text-center" >
                                                Please mention how the problem was solved:
                                            
                                     </div>
                                            <div class="w-full ">
                                                  <textarea  class="border-2 border-solid w-full border-slate-300 p-3" v-model="comments" ></textarea>
                                            </div>
                                            <div class="font-bold text-red-500">{{ warning }}</div>

                                           
                     </div>
                     
                   </div>
                   <div class="bg-gray-400 text-white border border-solid border-slate-400  font-bold p-2 w-[24%] hover:cursor-pointer" @click="nosolution">There was no Solution</div>
                   <div class="flex flex-row w-full h-full justify-end " >
           <button  class="bg-blue-500  text-white font-bold mr-2  mt-10 p-2 border border-solid    rounded-sm" @click="closeTicketProceed">Proceed</button> 
           <button  class="bg-slate-300  text-black  border border-solid b  font-bold mr-2  mt-10 p-2 rounded-sm" @click="cancelCloseTicket">Cancel</button>
        </div>

</div>


   <div class="flex flex-row w-[95vw] p-[20px] bg-gray-200   ml-[50px]" ref="main" >





   
     <div class="  w-[30vw] h-[83vh] mr-[20px] overflow-y-scroll    p-2  bg-white shadow-md shadow-black border-solid border-black ">


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
   <div class="w-2/4 text-lg font-bold text-black p-3 ">
        Problem in Details:
   </div>
 
   <div class="w-2/4 text-right text-lg font-bold text-black  p-3 " style="word-wrap: break-word; max-width:50%" >
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
        Type:
   </div>
 
   <div class="w-2/4 text-right">
        {{ ticketType }}
   </div>
 </div>
 
 
 
 <div class="flex flex-row w-11/12 mt-2">
   <div class="w-2/4">
        Department:
   </div>
 
   <div class="w-2/4 text-right">
        {{ ticket.department }}
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
 
 
 
 <div class="flex flex-row w-11/12 mt-2">
   <div class="w-2/4">
        Location:
   </div>
 
   <div class="w-2/4 text-right">
        {{ ticket.raisedBy.unit }}
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



 <div class="flex flex-row w-11/12 mt-3">
   <div class="w-2/4">
        Number of Times Ticket Raised:
   </div>
 
   <div class="w-2/4 text-lg  text-black text-right">
        <template v-if="ticket.timesRaised">{{ ticket.timesRaised }}</template>
        <template v-else>Not Available</template>
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
                     {{currentHandler.empName}} 
                       
                  </div>
                </div>
                
                
                <div class="flex flex-row w-11/12 mt-2">
                  <div class="w-2/4">
                       Current Handler's Email:
                  </div>
                
                  <div class="w-2/4 text-right">
                        <span v-if="ticket.currentHandler.mailAddress">{{ currentHandler.mailAddress }}</span><span v-else>Not Available</span>
                  </div>
                </div>
                
                
                
                <div class="flex flex-row w-11/12 mt-2">
                  <div class="w-2/4">
                       Current Handler's Phone:
                  </div>
                
                  <div class="w-2/4 text-right">
                     <span v-if="ticket.currentHandler.phone">{{ currentHandler.phone }}</span><span v-else>Not Available</span>
                  </div>
                </div>
                
                
                <div class="flex flex-row w-11/12 mt-2">
                  <div class="w-2/4">
                       Current Handler's Extension:
                  </div>
                
                  <div class="w-2/4 text-right">
                     <span v-if="ticket.currentHandler.extension">{{ currentHandler.extension }}</span><span v-else>Not Available</span>
                  </div>
                </div>
                
                <div class="flex flex-row w-11/12 mt-2">
                  <div class="w-2/4">
                       Current Handler's Location:
                  </div>
                
                  <div class="w-2/4 text-right">
                     <span v-if="ticket.currentHandler.location">{{ currentHandler.location }}</span><span v-else>Not Available</span>
                  </div>
                </div>
            </template>
        </vue-collapsible-panel>

     </vue-collapsible-panel-group>
  




</div>
   
       <div class="bg-white shadow-md mr-[20px] shadow-black w-[30vw] relative  h-[83vh] overflow-y-scroll overflow-x-clip  pr-2 text-center bg-blue">
     
   
     <div v-if="ticket.actions && ticket.actions[ticket.actions.length - 1] && ticket.actions[ticket.actions.length - 1].type == 11 && ticket.prevHandler " class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.prevHandler.empName }} has closed the ticket you raised  
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="ticket.actions[ticket.actions.length - 1].comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ ticket.actions[ticket.actions.length - 1].comments }}
</div>

<div class="text-start" v-if="ticket.actions[ticket.actions.length - 1].files">
    <span class="underline"> Files:</span> <br/>
    <div v-for="(file, fileCounter) in ticket.actions[ticket.actions.length - 1].files">
       <a :href="globalUrl +'uploads/' + file.fileName" target="__blank" class="underline text-blue-900">{{file.originalName}}</a> 
    </div>
 </div>

</div>

<div v-else-if="ticket.actions && ticket.actions[ticket.actions.length - 1] && ticket.actions[ticket.actions.length - 1].type == 14 && ticket.prevHandler " class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.prevHandler.empName }} has closed the ticket you raised  
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="ticket.actions[ticket.actions.length - 2].comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ ticket.actions[ticket.actions.length - 2].comments }}
</div>

<div class="text-start" v-if="ticket.actions[ticket.actions.length - 2].files">
    <span class="underline"> Files:</span> <br/>
    <div v-for="(file, fileCounter) in ticket.actions[ticket.actions.length - 2].files">
       <a :href="globalUrl +'uploads/' + file.fileName" target="__blank" class="underline text-blue-900">{{file.originalName}}</a> 
    </div>
 </div>

</div>


<div v-else-if="ticket.actions && ticket.actions[ticket.actions.length - 1] && ticket.actions[ticket.actions.length - 1].type == 15" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.raisedBy.empName }} has opened his ticket again for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start mb-3" v-if="ticket.actions[ticket.actions.length - 1].comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ ticket.actions[ticket.actions.length - 1].comments }}
</div>





<div class="text-start" v-if="ticket.actions[ticket.actions.length - 1].files">
   <span class="underline"> Additional Files:</span> <br/>
   <div v-for="(file, fileCounter) in ticket.actions[ticket.actions.length - 1].files" :key="fileCounter">
   <a :href="globalUrl +'uploads/' + file.fileName" class="underline text-purple-900" target="__blank">{{ file.originalName }}</a>
</div></div>

</div>

    
     <Chat :ticketId="ticket._id" :user="ticket.assignedTo"  v-if="ticket.assignedTo && (this.authStore.user.mailAddress == ticket.raisedBy.mailAddress || this.authStore.user.mailAddress == ticket.assignedTo.mailAddress)" />
<div v-if="showConversationCheck == true" class="mt-2 mr-4 fixed p-3 bg-white top-[50px] left-[400px] border border-solid border-black h-auto">
   <div class="text-2xl font-bold underline">Conversation:</div>
   <div class="flex flex-col h-auto w-auto bg-red" >

<div class="flex flex-col  h-full w-full p-3  " id="messageArea" ref="messageArea">
   <div class="flex flex-row w-full "  v-for="(message, messageCounter) in messages"  :key="messageCounter">

    <div class="flex flex-col  justify-end items-end  w-full mb-[20px]"  v-if="message && message.from.mailAddress == userForCheck.mailAddress">
        
    <template v-if="message.type == 'text'">  <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
        <div class="bg-blue-500 p-3 rounded-md text-white text-xs" style="word-wrap: break-word; max-width:50%"  > {{message.message}} </div>
        <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
    </template>
    <template v-else-if="message.type == 'files'">  
      <div class="text-xs flex flex-row justify-end mb-2">{{message.time}} </div>
      <div class="bg-blue-500 p-3  text-white " style="word-wrap: break-word; max-width:50%"  v-for="(file, fileCounter) in message.files" :key="fileCounter" >
        <a :href="this.globalUrl + 'uploads/' + file.fileName" target="_blank" class="underline"> {{file.originalName}} </a>
        </div>
      <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
  </template>

      
    </div>

    <div class="flex flex-col w-full h-auto justify-start items-start " v-else>
      
      <template v-if="message.type == 'text'">  <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
        <div class="bg-gray-200 p-3 rounded-md text-black w-[200px]" style="word-wrap: break-word;" >{{ message.message }}  </div>
        <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
    </template>
    <template v-else-if="message.type == 'files'" >  
      
      <div class="text-xs flex flex-row justify-end ">{{message.time}} </div>
      
      <div class="bg-gray-200 p-3  text-black w-[200px]" style="word-wrap: break-word;"  v-for="(file, fileCounter) in message.files" :key="fileCounter" >
        <a :href="this.globalUrl + 'uploads/' + file.fileName" target="_blank" class="underline"> {{file.originalName}} </a>
        </div>
      <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
  </template>
   </div>
  
  
  </div>


  </div>






</div>
</div>

<div class="flex flex-col  w-full justify-end h-auto ">     
   <div class="flex flex-row w-full py-2 px-2  m-3 items-center" v-if="authStore.user && ticket.ticketingHead && ticket.ticketingHead._id == authStore.user._id ">
            
      <div>  <span class="font-bold">Priority:</span>
  
        <select class="ml-2 border border-solid border-black p-1" v-model="priority" @change="setPriority($event, ticket)">
           <option value="Priority 1">Priority 1</option>
           <option value="Priority 2">Priority 2</option>
           <option value="Priority 3">Priority 3</option>
           <option value="Priority 4">Priority 4</option>
        </select>
     </div>


     <div class="ml-10">  <span class="font-bold">Type:</span>
  
        <select class="ml-2 border border-solid border-black p-1" v-model="ticketType" @change="ticketsStore.setTicketType($event, ticket)">
           <option value="Incident">Incident</option>
           <option value="Problem">Problem</option>

        </select>
     </div>


      </div>
  <div class=" "> 
   <button  class="bg-red-500 text-white font-bold mr-2  mt-2 p-2  rounded-sm shadow-sm shadow-black" v-if="ticket.raisedBy.mailAddress == this.authStore.user.mailAddress && ticket.actions[ticket.actions.length - 1].type == 11 && ticket.assignedTo" @click="rateCheck = true">Rate</button>
   <button  class="bg-red-500 text-white font-bold mr-2  mt-2 p-2  rounded-sm shadow-sm shadow-black" v-if="((ticket.ticketingHead && this.authStore.user.empName == ticket.ticketingHead.empName ) || this.authStore.user.userType == 'admin') && ticket.assignedTo != null" @click="unassign($event, ticket)">Unassign</button>
   <button  class="bg-fuchsia-500 text-white font-bold mr-2  mt-2 p-2  rounded-sm shadow-sm shadow-black" @click="reassignTicketToggle"  v-if="((ticket.ticketingHead && this.authStore.user.empName == ticket.ticketingHead.empName)|| this.authStore.user.userType == 'admin') && ticket.assignedTo != null">Reassign</button>
   <button class="bg-blue-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="assignTicketToggle" v-if="ticket.assignedTo == null && ((ticket.ticketingHead && this.authStore.user.mailAddress == ticket.ticketingHead.mailAddress) || this.authStore.user.userType == 'admin')">Assign </button>
   <button class="bg-emerald-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="assignSelfToggle" v-if="ticket.assignedTo == null && (ticket.users.includes(this.authStore.user.mailAddress) || this.authStore.user.userType == 'admin')">Assign To Self</button>
    <button class="bg-amber-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="showDetails">Show Details</button>
    <button class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="closeTicket" v-if="ticket.status != 'Closed Ticket' && this.authStore.user.mailAddress == ticket.raisedBy.mailAddress">Close Ticket</button> 
    <button class="bg-green-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="showConversation" v-if="ticket.status == 'Closed Ticket' && showConversationCheck==false" >Show Conversation</button> 
    <button class="bg-purple-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="reopenCheck = true" v-if="ticket.status == 'Closed Ticket' && this.authStore.user.mailAddress == ticket.raisedBy.mailAddress" >Open Again</button>       
    <button class="bg-red-500 text-white font-bold mr-2  mt-2 p-2 rounded-sm" @click="showConversation" v-if="ticket.status == 'Closed Ticket' && showConversationCheck==true" >Hide Conversation</button>   
   </div>
         
   </div>
   
   

   </div>


   <div class="flex flex-row h-[83vh] w-[30vw] justify-start bg-white shadow-md shadow-black" style="z-index:1">
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
                         <div class="flex flex-row justify-around w-full items-center">   <div class="mt-4 bg-white text-black hover:text-white hover:bg-gray-500 border border-solid border-gray-500 font-bold text-lg p-3 rounded-sm  hover:cursor-pointer  mb-2" @click="addNote">Submit</div>
                         <div for="file" class='hover:cursor-pointer bg-white h-auto text-black hover:text-white hover:bg-gray-500 border border-solid border-gray-500 font-bold p-3 text-lg mt-4 mb-2' @click="openMention()">Mention</div>
                         <div for="file" class='hover:cursor-pointer bg-white h-auto text-black hover:text-white hover:bg-gray-500 border border-solid border-gray-500 font-bold p-3 text-lg mt-4 mb-2' @click="openCommentFiles()">Attach File</div>
                      </div>
                         </div>   
                         
                     </div>
         
                  </div>
     </div>
 
       


     



   















       
     
   
   </div>


   
   
   
   <div class="flex flex-col bg-white text-black  w-[900px] h-[500px] pt-10  mt-10 px-10 fixed overflow-y-scroll border-2 border-black border-solid" style="top:50px; z-index:12312321123; left:250px; display:none; transition: 0.50s;" ref="details">
      <div class="flex flex-row text-4xl font-extrabold">Details</div> 
      <template v-for="(action, actionCounter) in reversedActions" :key="actionCounter">
    
         <div class="flex flex-col bg-white mt-10">
                  
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

            <template v-else-if="action.type == 13">

               <Actions  :action="'Unassigned By'" :from="action.raisedBy" :to="action.forwardedTo" :toAction="'Forwared To'" :comment="action.comments" />
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

<Actions  :action="'Assigned By'" :from="action.raisedBy" :to="action.raisedBy" :toAction="'Assigned To'" :comment="action.comments" />
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
   import axios from 'axios'
   import Actions from './actions.vue'
   import Buttons from './buttons.vue'
   import CommentModal from './commentModal.vue'
   import mixin from './handlerMixin.js'
   import ActionStatus from './actionStatus.vue'
   import { io } from 'socket.io-client'; 
   import Chat from '../../components/chat.vue' 
   import StarRating from 'vue-star-rating'
   import {useAuthStore} from "../../stores/authentication"
   import {useGlobalStore} from "../../stores/globalStore"
   import {useTicketStore} from "../../stores/ticket"
   import { useUserStore } from '../../stores/users'
   import {mapStores} from "pinia"
  
   export default{
      data(instance){
       return {
           reopenCheck:false,
           showDetailsCheck:false,
           comment:'',
           approver:'',
           commentCall:false,
           users:[],
           componentTicket:null,
           files:[],
           additionalInfo:'',
          
           priority:'',
           nosolutionvalue:'Please select an option',
        
           socket:null,
           showConversationCheck:false,
           messages:[],
           userForCheck:null,
           closeCheck:false,
           comments:"",
           rating:0,
           note:"",
           notes:[],
           warning:"",
           nosolutionCheck:false,

           commentFiles:[],
           caption:'',
           commentFilesCheck:false,
           mentionCheck:false,
           mentions:['',],
           mentionMessage:'',
           assignSelfCheck:false,
           assignTicketCheck:false,
           reassignTicketCheck:false,
           support:[],
           tickets:[],
           ticketType:'',
           currentHandler:null,
           rateCheck:false,
           rating:0,
           otherCheck:false,
           otherNote:''
    
       
        
       }
      },

      mixins:[mixin],

      mounted(){
        this.componentTicket = this.ticket
      },

      

      created(){
         this.getTickets();
         this.getSupport();
         this.usersStore.getApprovers();
         this.getNotes();

         
          this.priority = this.ticket.priority ? this.ticket.priority.priority : null
          this.ticketType = this.ticket.ticketType
          this.currentHandler = this.ticket.currentHandler
   
          this.userForCheck = this.authStore.user
      },
   
      props:['ticket', 'currentHandlerType'],
      components:{Actions, Buttons, CommentModal, ActionStatus, Chat, StarRating},

      computed:{

         ...mapStores(useAuthStore, useGlobalStore, useTicketStore, useUserStore),

          
            reversedActions(){
               return this.ticket.actions.slice().reverse()
            },

            computedUsers(){
            var newUsers = this.usersStore.users.map((user)=>{
                return `${user.empName} --- ${user.mailAddress} (${user.designation})`
            })

            return newUsers
        }
      },

      methods:{

         rate(){
            this.$toast.info("Rating")
            var vm = this;
            var user = this.authStore.user
            var ticket = this.ticket
            var comment = this.comment
            var rating = this.rating

            var data = new FormData();
            data.append("user", JSON.stringify(user))
            data.append("ticket", JSON.stringify(ticket))
            data.append("comment", comment)
            data.append("rating", rating)


            axios.post(this.globalStore.globalUrl + "rate", data).then((result)=>{
               if(result.data == true){
                  location.reload()
               }
            }).catch((error)=>vm.$toast.warning(error))
            

             
         },

         setRating2(value){
            this.rating = value
         },

         setPriority(){
               
               var vm = this;
               vm.$toast.info("Setting Priority")
               var data = new FormData();
               data.append("priority", vm.priority)
               data.append("id", this.ticket._id)
               axios.post(this.globalStore.globalUrl + 'setPriority', data).then((result)=>{
                  vm.priority = result.data.priority
                  vm.$toast.clear()
                  vm.$toast.success("Priority Set")
               }).catch((error)=>vm.$toast.warning(error))
         },


         getTickets(){
           var vm = this;
           var user = this.authStore.user;
           console.log("this is the user")
           console.log(user)
           var data = new FormData();
           data.append("user", JSON.stringify(user))
           data.append("page", 1)

           axios.post(this.globalStore.globalUrl + "getAllTickets", data).then((result)=>{
            vm.tickets = result.data
            console.log("these are the initial tickts")
            console.log(vm.tickets)

           }).catch((error)=>{
            vm.$toast.warning(error)
           })
        },
         assignTicketToggle(){
             if(this.assignTicketCheck == false){
               this.assignTicketCheck = true
             }else if(this.assignTicketCheck == true){
               this.assignTicketCheck = false
             }
         },
         assignSelfToggle(){
            if(this.assignSelfCheck == false){
               this.assignSelfCheck = true
             }else if(this.assignSelfCheck == true){
               this.assignSelfCheck = false
             }
         },

         reassignTicketToggle(){
            if(this.reassignTicketCheck == false){
               this.reassignTicketCheck = true
             }else if(this.reassignTicketCheck == true){
               this.reassignTicketCheck = false
             }
         },

         Reassign(){
          
          var vm = this;
          
          var user = this.authStore.user
          var token = this.authStore.token
          var comment = vm.comment
 
          console.log("check vars")
          console.log(user)
          console.log(token)
          var data = new FormData()
          var ticket = vm.ticket;
       
          data.append('token', token)
          data.append('user', JSON.stringify(user))
          data.append('comment', comment)
          data.append('ticketId', JSON.stringify(ticket._id))
          data.append('approver', JSON.stringify(vm.approver))

              axios.post(this.globalStore.globalUrl + 'reassign', data).then((result)=>{
                  if(result.data == true){
                      vm.$toast.clear()
                      vm.$toast.success('Done')
                      vm.currentHandler = vm.approver
                      location.reload()
        
                  }else{
                      vm.$toast.clear()
                      vm.$toast.warning(result.data)
                  }
              }).catch((error)=>{
                  vm.$toast.clear()
                  vm.$toast.warning(error)
              })
      },


         assignTicket(){
        
            var vm = this;
            this.$toast.info("Assigning Ticket...")
            var user = this.authStore.user
            var token = this.authStore.token
            var comment = vm.comment
   

            var data = new FormData()
            var ticket = vm.ticket;

            var approver = this.approver;
            debugger
            data.append('token', token)
            data.append('user', JSON.stringify(user))
            data.append('comment', comment)
            data.append('ticketId', JSON.stringify(ticket._id))
            data.append('approver', JSON.stringify(approver))

            axios.post(this.globalStore.globalUrl + 'assign', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Done')
                    vm.currentHandler = vm.approver
                    location.reload()
                   
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },
         assignSelf(){
            var vm = this;
            var user = this.authStore.user;
            var token = this.authStore.token;
          

            var data = new FormData();
    
   
            data.append("token", token);

            data.append("ticketId", JSON.stringify(vm.ticket._id));
            data.append("user", JSON.stringify(user));
            data.append("comment", "Not Available")

            axios.post(this.globalStore.globalUrl + "assignSelf", data).then((result)=>{
               
                    vm.$toast.clear()
                    vm.$toast.success('Done')
                    
        
                    location.reload();
               
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },
       
         addMention(){
         var newMention = '';
         this.mentions.push(newMention)
    },

    removeMention(counter){
      this.mentions.splice(counter, 1)

    },

    handleApproverChange2(event){

    var value = event.target.value
  
    var user = this.usersStore.users.find((user)=>{
        
        return user.empName == value;

    });

    this.approver = user;
},

    getSupport(){
        var vm = this;
        var token = this.authStore.token;
        var user = this.authStore.user;
        var ticket = this.ticket

        var data = new FormData();
        data.append("token", token);
        data.append("user", JSON.stringify(user));
        data.append("ticket", JSON.stringify(ticket));

   


        axios.post(this.globalStore.globalUrl + "getSupport", data).then((result)=>{
         console.log("launched get Support")
            vm.support = result.data.map((user2)=>{


               var newObject = {
                user:user2.user,
                numbers:0
               }

               console.log("these are the tickets")
               console.log(vm.tickets)

               var tickets = vm.tickets.filter((ticket)=>ticket.assignedTo && ticket.assignedTo.mailAddress == user2.user.mailAddress)

               newObject.numbers = tickets.length;

               return newObject
            });

              console.log("this is the vm support")
              console.log(vm.support)
        }).catch((error)=> vm.$toast.warning(error));


    },

    makeMentions(){
      var vm = this;
      vm.mentionCheck = false;
      var ticket = this.ticket;
      var user = this.authStore.user;
      var mentions = this.mentions;
      debugger
      var newMentions = mentions.map((mention)=>{
         debugger
         var splitted = mention.split("---")[1].split("(")[0].trim()
         var user = this.usersStore.users.find((user)=>{
            debugger
            return user.mailAddress == splitted
         })

         return user.empName;
      })



      var data = new FormData();
      data.append("user", JSON.stringify(user));
      data.append("mentions", JSON.stringify(newMentions));

      data.append("date", new Date().toDateString());
      data.append("ticket", JSON.stringify(ticket));
      data.append("message", vm.mentionMessage)

      axios.post(this.globalStore.globalUrl + "makeMentions", data).then((result)=>{
                    
   
            vm.notes = [...vm.notes, result.data]
            vm.mentions = ['',]
            vm.mentionMessage = ""
            vm.$nextTick(() => {


this.$refs.commentBox.scrollTo({
  top: this.$refs.commentBox.scrollHeight,
  behavior: 'smooth'
});
});


      }).catch((error)=>vm.$toast.warning(error))




    

    },

    openMention(){
         this.mentionCheck = !this.mentionCheck
    },

         setRating(rating){
            this.rating = rating
         },


  showConversation(){
          var vm = this;
          var id = this.ticket._id;
          var data = new FormData();
          data.append("id", id)

          
    if(this.showConversationCheck == false){

      axios.post(this.globalStore.globalUrl + "getChat", data).then((result)=>{
        vm.messages = result.data.conversation
        vm.showConversationCheck = true;
      


      }).catch((error)=>vm.$toast.warning(error))
      


    }else{
      vm.showConversationCheck = false

    }
       
    },

   //    showDetails(){
   //     this.showDetailsCheck = !this.showDetailsCheck
   //  },


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


    setFile(event){
            for(var x of event.target.files){
                this.files.push(x)
            }
        },

   removeFile(counter){
            this.files.splice(counter, 1)
         },


   handleRemoveFile(counter){
        this.removeFile(counter)
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



   handleModalCall(value){
   
      if(value == 'Supervisor Approved'){
         this.supervisorApprove(this.comment, this.ticket)
      }else if(value == 'Higher Authority Approved'){
         this.higherApprove(this.comment, this.ticket)
      }else if(value == "Request For Higher Approval"){
         
         this.seekHigherApproval(this.comment, this.approver, this.ticket)
      }else if(value == 'Ticket Assigned'){
           this.assignTicket(this.comment, this.approver, this.ticket)
    }else if(value == 'Close Request'){
      this.closeRequest(this.comment, this.ticket)
    }else if(value == 'Close Request Accepted'){
      this.closeTicket(this.comment, this.ticket)
    }else if(value == 'Close Request Rejected'){
      this.closeRequestReject(this.comment, this.ticket)
    }else if(value == 'Asking For Information'){
      debugger
      this.ask(this.comment, this.ticket, this.approver)
    }else if(value == 'Giving Information'){
      this.giveInfo(this.comment, this.files, this.ticket, this.additionalInfo)
    }

   
      },

      handleFileChange(event){
         for(var x of event.target.files){
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
            this.approver = value
      },

      getActionType(action){
         if(action.type == 0){
            return "New Ticket Raised"
         }else if(action.type == 1){
            return "Approval From Supervisor"
         }else if(action.type == 3){
            return "Seeking Higher Approval"
         }else if(action.type == 4){
            return "Assigned Ticket"
         }else if(action.type == 5){
            return "Assigned Ticket"
         }else if(action.type == 6){
            return "Asking For More Information"
         }else if(action.type == 7){
            return "Giving More Information"
         }else if(action.type == 8){
            return "Reject Ticket"
         }else if(action.type == 9){
            return "Reassign Ticket"
         }else if(action.type == 10){
            return "Ticket Close Request"
         }else if(action.type == 11){
            return "Ticket Closed"
         }else if(action.type == 12){
        
            return "Ticket Close Request Reject"
         }else if(action.type == 13){
      
            return "Ticket Unassigned"
         }else if(action.type == 14){
 
            return "Rated Ticket Handler"
         }else if(action.type == 15){
  
            return "Re-opened Ticket"
         }
      },

      unassign(event, ticket){
         debugger
         var vm = this;
         vm.$toast.info("Unassigning Ticketing Please Wait....")
         var prevAssignee = JSON.stringify(ticket.assignedTo)
         var user = vm.authStore.user
         var ticketId = JSON.stringify(ticket._id)
         var token = JSON.stringify(vm.authStore.token)
         
         var data = new FormData();
         data.append("prevAssignee", prevAssignee)
         data.append("user", JSON.stringify(user))
         data.append("ticketId", ticketId)
         data.append("token", token)
         data.append("comment", "Not Available")
      

         axios.post(this.globalStore.globalUrl + "unassign", data).then((result)=>{

            location.reload()
         }).catch((error)=>vm.$toast.warning(error))

         
      },


      closeTicket(){
           this.closeCheck = !this.closeCheck
      },


      closeTicketProceed(){
         
         var vm = this;

         if(vm.comments == "" || vm.comments == null || vm.comments == undefined){
            vm.warning = "*You need to mention the solution used to solve your problem"
            return
         }
         
         if(vm.otherCheck){
            if(vm.otherNote == "" || vm.otherNote == null || vm.otherNotes == undefined){
               vm.warning = "*You need to write the other reason for raising the ticket"
               return
            }else{
               vm.comments = vm.otherNote
            }

      
         }
            

         if(vm.nosolutionCheck){
            if(vm.comments == "Please select an option"){
               vm.warning = "*You need to select an option"
               return
            }
         }
    



            this.$toast.info("Closing Ticket...")
            var user = this.authStore.user
            var token = this.authStore.token
            var comment = this.comments
            var ticket = this.ticket
            var rating = this.rating
            
          

            var data = new FormData()

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))
            data.append("rating", rating)

            axios.post(this.globalStore.globalUrl + 'closeTicket', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Ticket Closed')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

      },

      showDetails(){
      if(this.showDetailsCheck == false){
          this.$refs.details.style.display = "block"
          this.$refs.main.style.filter = "blur(5px)"
          this.showDetailsCheck = true        
      }else{
         this.$refs.details.style.display = "none"
         this.$refs.main.style.filter = "blur(0px)"
         this.showDetailsCheck = false
      }
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

      
      addNote(){
         var vm = this;
         var ticket = this.ticket;
         var note = this.note;
         var token = this.authStore.token;
         var userName = this.authStore.user.empName;
         var date = new Date().toDateString()
         var data = new FormData();
         data.append("date", date)
         data.append("token", token);
         data.append("note", note);
         data.append("id", ticket._id);
         data.append("userName", userName)
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



      reopen(){
         var vm = this;
     
         var user = vm.authStore.user;
         var ticket = vm.ticket;
         var comment = vm.comment;
         var files = vm.files;
         var data = new FormData();
        
         


         data.append("user", JSON.stringify(user));
         data.append("ticket", JSON.stringify(ticket));
         data.append("comment", comment);
         for(var x of files){
            data.append("file", x)
         }


         axios.post(this.globalStore.globalUrl + "reOpen", data).then((result)=>{
             if(result.data != "exists"){
               this.showDetails(result.data)
             }else{
               this.$toast.warning("A ticket based on this ticket is already open")
             }
         }).catch((error)=>vm.$toast.warning(error))






       },


       nosolution(){
         this.closeTicket();
         this.warning = ""
         this.comments = "Please select an option"
         this.nosolutionCheck = !this.nosolutionCheck
       },

       checkOther(event){
         var value  = event.target.value;
         if(value == "Others"){
            this.otherCheck = !this.otherCheck
         }
       },


      //  showDetails(id){
      //           const baseUrl = 'http://localhost:5173/#'
      //           const componentUrl = "/ticketing/ticketDetails/" + id;
      //           const fullPath = baseUrl + componentUrl
    

      //               window.open(fullPath, '_blank');
      //            },
     cancelCloseTicket(){
            this.closeCheck = false
            this.nosolutionCheck = false
            this.otherCheck = false
            this.warning = ""
            this.comments = ""
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