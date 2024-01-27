<template>
    
    <div class="w-full h-[500px] bg-white   overflow-y-scroll">


      
        <div v-for="(comment, commentCounter) in reversedComments" :key="commentCounter" >
   <div class="p-3 pb-10 m-3 shadow-md shadow-black  bg-white flex flex-col" v-if="comment.comment != 'undefined' && comment.comment != 'Not Available'">     
    {{comment.time  }}
       <hr class="border border-solid border-black"/>

   
          
        <div  class="p-3 flex flex-col">

        <span class="font-bold">{{comment.commenter}}</span>{{ comment.comment }}
       


        </div>
    </div>

        </div>



</div>



</template>




<script>
export default{

    data(instance){
        return {
           ticket:instance.ticket
        }
    },

   computed:{
    reversedComments(){
        var actions = this.ticket.actions;
        var comments = this.ticket.actions.map((action)=>{
            return {
                time:action.time,
                comment:action.comments,
                commenter:action.raisedBy.mailAddress,
              }
        })
        return comments.reverse();
    }
   },

props:["ticket"],



}




</script>