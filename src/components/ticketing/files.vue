<template>
    

    <div class="w-full h-[500px]  overflow-y-scroll">
   
        <div v-for="(files, filesCounter) in reversedFiles" :key="filesCounter" >
             
    <div v-if="files.files != null && files.files != 'Not Available' && files.files != 'undefined' " class="p-3 m-3 shadow-md shadow-black  bg-white flex flex-col">      
          {{files.time  }}
       <hr class="border border-solid border-black"/>

      <span class="font-bold"> {{ files.from }}</span>
           
        <div v-for="(file, fileCounter) in files.files" :key="fileCounter" class="p-3 flex flex-col">
        <a :href="globalUrl +'uploads/' + file.fileName" target="__blank" class="underline">{{file.originalName}}</a> 
       


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
  reversedFiles(){
    var actions = this.ticket.actions;
        var files = this.ticket.actions.map((action)=>{
        return {
          time:action.time,
          files:action.files,
          from:action.raisedBy.mailAddress
        }   
        })


        return files.reverse();
  }
},

props:["ticket"]

}




</script>