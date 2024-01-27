<template>
<div class="h-auto w-full">
    
<div v-if="action.type == 0 && ticket.approvalRequired == false" class="p-4 font-bold bg-blue-300  shadow shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg">
    {{ ticket.raisedBy.empName }} has raised a new ticket for the {{ ticket.department }} 
    department</div>  <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline">His/Her comment:</span> <br/> {{ action.comments }}
    </div>

</div>

<div v-if="action.type == 0 && ticket.approvalRequired == true" class="p-4 font-bold bg-blue-300  shadow shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg">
    {{ ticket.raisedBy.empName }} needs your approval to raise a service ticket for the {{ ticket.department }} 
    department</div>  <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline">His/Her comment:</span> <br/> {{ action.comments }}
    </div>

</div>

<div v-if="action.type == 0 && ticket.approvalRequired == false && ticket.raisedFor" class="p-4 font-bold bg-blue-300  shadow shadow-md shadow-black" >
    <div class="flex flex-row text-start text-lg">
        {{ ticket.raisedBy.empName }} has raised a new ticket on behalf of {{ticket.raisedFor.empName}} for the {{ ticket.department }} 
        department</div>  <br/>
    
        <br/>
    
        <div class="text-start" v-if="action.comments">
       <span class="underline">His/Her comment:</span> <br/> {{ action.comments }}
        </div>
    
    </div>


<div v-else-if="action.type == 4" class="p-4 font-bold bg-blue-300  shadow shadow-md shadow-black" >
<div class="flex flex-row text-start text-2">
    You have accepted the ticket raised by {{ ticket.raisedBy.empName }}  for the {{ ticket.department }} 
    department</div>  <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline">His/Her comment:</span> <br/> {{ action.comments }}
    </div>

</div>

<div v-else-if="(action.type == 1)" class="p-4 font-bold bg-blue-300 shadow shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.raisedBy.empName }} is seeking your approval to raise a new ticket for the {{ ticket.department }} 
    department which has been approved by the department head {{ ticket.supervisor.empName }}
</div>
   
    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments != 'undefined' && ticket.approvalRequired == 'yes'">
   <span class="underline"> His/Her supervisor's comment:</span> <br/>
   {{ action.comments }}
</div>

<div class="text-start" v-else-if="action.comments != 'undefined' && ticket.approvalRequired == 'no'">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>

</div>


<div v-else-if="action.type == 2" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.prevHandler.empName }} is seeking your approval regarding a ticket  raised by {{ ticket.raisedBy.empName }} 
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>

</div>



<div v-else-if="action.type == 3" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.prevHandler.empName }} has approved the ticket raised by {{ ticket.raisedBy.empName }} 
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>

<div class="text-start" v-if="action.files">
    <span class="underline"> Files:</span> <br/>
    <div v-for="(file, fileCounter) in action.files">
       <a :href="globalUrl +'uploads/' + file.fileName" target="__blank" class="underline">{{file.originalName}}</a> 
    </div>
 </div>

</div>


<div v-else-if="action.type == 6" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg"  >
    {{ ticket.prevHandler.empName }} is asking for additional Information for a ticket raised  
    for the {{ ticket.department }} department by {{ ticket.raisedBy.empName }}
</div>

    <br/>

    <div class="text-start">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>

</div>


<div v-else-if="action.type == 7" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >


<div class="flex flex-row text-start text-lg"  >
    {{ ticket.prevHandler.empName }} has given you the additional information that you asked for
</div>

    
    <br/>

    <br/>

<div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>


<div class="text-start" v-if="action.additionalInfo">
   <span class="underline"> Additional Information:</span> <br/>
   {{ action.additionalInfo }}
</div>


<div class="text-start" v-if="action.files">
   <span class="underline"> Additional Files:</span> <br/>
   <div v-for="(file, fileCounter) in action.files" :key="fileCounter">
   <a :href="globalUrl +'uploads/' + file.fileName" target="__blank" class="underline">{{ file.originalName }}</a>
</div></div>

</div>



<div v-else-if="action.type == 5" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >


<div class="flex flex-row text-start text-lg"  >
    {{ ticket.ticketingHead.empName }} has assigned you the ticket raised by {{ ticket.raisedBy.empName }} for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

<div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>


<div class="text-start" v-if="ticket.addtionalInfo">
   <span class="underline"> Additional Information:</span> <br/>
   {{ action.additonalInfo }}
</div>


<div class="text-start" v-if="action.files">
   <span class="underline"> Additional Files:</span> <br/>
   <div v-for="(file, fileCounter) in action.files" :key="fileCounter">
   <a :href="globalUrl +'uploads/' + file.fileName" target="__blank">{{ file.originalName }}</a>
</div></div>

</div>



<div v-else-if="action.type == 10" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.assignedTo.empName }} is requesting you to close the ticket you raised for 
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>


<div class="text-start" v-if="action.additionalInfo">
   <span class="underline"> Additional Information:</span> <br/>
   {{ action.additionalInfo }}
</div>


<div class="text-start" v-if="action.files">
   <span class="underline"> Additional Files:</span> <br/>
   <div v-for="(file, fileCounter) in action.files" :key="fileCounter">
   <a :href="globalUrl +'uploads/' + file.fileName" class="underline" target="__blank">{{ file.originalName }}</a>
</div></div>

</div>


<div v-else-if="action.type == 12" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.raisedBy.empName }} has rejected the ticket close request you sent him/her for the ticket he raised for 
    for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>

</div>






<div v-else-if="action.type == 15" class="p-4 font-bold bg-blue-300  shadow-md shadow-black" >
<div class="flex flex-row text-start text-lg" >
    {{ ticket.raisedBy.empName }} has opened again his ticket for the {{ ticket.department }} department
</div>

    
    <br/>

    <br/>

    <div class="text-start" v-if="action.comments">
   <span class="underline"> His/Her comment:</span> <br/>
   {{ action.comments }}
</div>


<div class="text-start" v-if="action.additionalInfo">
   <span class="underline"> Additional Information:</span> <br/>
   {{ action.additionalInfo }}
</div>


<div class="text-start" v-if="action.files">
   <span class="underline"> Additional Files:</span> <br/>
   <div v-for="(file, fileCounter) in action.files" :key="fileCounter">
   <a :href="globalUrl +'uploads/' + file.fileName" class="underline" target="__blank">{{ file.originalName }}</a>
</div></div>

</div>


</div>









</template>


<script>
export default{
    data(instance){
        return {
             action:instance.ticket.actions[instance.ticket.actions.length - 1],
             ticket:instance.ticket
        }
    },

   

    props:['ticket']
}




</script>