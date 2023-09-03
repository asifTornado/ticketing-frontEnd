<template>

<div class="bg-white h-[92vh] w-full">


   
        
    
    
    <div class="fixed h-[92vh] w-full flex flex-col  z-10 right-0 bg-gray-200 " style="width:0px; transition:0.3s; z-index: 99999;"  ref="drawer"> 
      <div style="top:480px; left:-45px; z-index: 99999;" class="shadow-md shadow-black absolute   h-24 w-14 z-50 bg-slate-100  rounded-sm border border-solid border-l-gray-400 border-t-gray-400 border-b-gray-400 flex flex-col justify-center items-center" ref="handle" @click="close()"><font-awesome-icon :icon="iconName" size="2x" id="drawerIcon"/></div>   
        <div class="flex flex-row mt-2 mx-2">
           <button  class="bg-white  font-bold hover:bg-gray-400 text-black  w-32 border border-solid border-black  text-sm p-2 " @click="toggleComponent($event, 'Comments')"  ref="comments" id="Comments">Comments</button> 
           <button  class="bg-white  font-bold hover:bg-gray-400 text-black w-32 border border-solid border-black  text-sm p-2 " @click="toggleComponent($event, 'Infos')"  ref="infos" id="Infos">Past Issues</button>
           <button  class="bg-white  font-bold hover:bg-gray-400 text-black w-32 border border-solid border-black  text-sm p-2 " @click="toggleComponent($event, 'Files')"  ref="files" id="Files">Files</button>
           <button  class="bg-white  font-bold hover:bg-gray-400 text-black w-32   border border-solid border-black  text-sm p-2 " @click="toggleComponent($event, 'KnowledgeBase')"  ref="files" id="KnowledgeBase">Knowledge Base</button>
        </div>

        <div class="flex flex-col  w-full bg-gray-200">
                <template v-if="ticket">
                  <div class="flex flex-row   h-[92vh] mx-2  bg-white" style="border-right:1px solid black; border-left:1px solid black;"><component v-bind:is="currentComponent" :ticket="ticket"></component></div>
              </template>
        </div>
    
    
    </div>
      
        <CurrentHandler :ticket="ticket" :handlerType="ticket.currentHandlerType" v-if="user && ticket && ticket.currentHandler && (user.mailAddress == ticket.currentHandler.mailAddress ) "/>
        <Viewer :ticket="ticket" :handlerType="ticket.currentHandlerType" v-else-if="ticket && user" class="bg-white" />  
</div>

  
</template>


<script>
import axios from 'axios'
import CurrentHandler from '../../components/ticketing/currentHandler.vue'
import Viewer from '../../components/ticketing/viewer.vue'
import Comments from '../../components/ticketing/comments.vue'
import Files from '../../components/ticketing/files.vue'
import Infos from '../../components/ticketing/infos.vue'
import KnowledgeBase from '../../components/ticketing/knowledge.vue'


export default{
    data(){
        return {
            ticket:null,
            showTicketDetails:false,
            user:null,
            drawerOpen:false,
            iconName:'fa-solid fa-bars',
            commentsCheck:false,
            filesCheck:true,
            infosCheck:false,
            knowledgeCheck:false,
            currentComponent:'Comments',
            prevComponent:''
        }
    },

    components:{CurrentHandler, Viewer, Comments, Files, Infos, KnowledgeBase},

    created(){
        
        this.loadTicket()
    },

    methods:{
          loadTicket(){
            var vm = this;
            this.user = this.authStore.getUser
            vm.$toast.info("Loading Ticket")
            var token = this.authStore.getToken
            var id = this.$route.params.id
            var data = new FormData();
            data.append("token", token);
            data.append("id", id);
            data.append("user", JSON.stringify(this.user))
            var url = vm.globalUrl + "getTicket" 
            axios.post(url, data).then((response)=>{
                vm.ticket = response.data
                console.log("this is the ticket")
                console.log(vm.ticket)
                vm.$toast.clear()
                vm.$toast.success("Ticket Loaded")
            }).catch((error)=>console.log(error))
          },

          openShowTicketDetails(){
            this.showTicketDetails = !this.showTicketDetails
          },

          close(){
            var vm = this;
            const div1 = this.$refs.handle;
            const div2 = this.$refs.drawer;
            const icon = this.$refs.drawerIcon

           if(!this.drawerOpen){
            div2.style.width = "400px"
            this.drawerOpen = true
           }else if(this.drawerOpen){
            div2.style.width = "0px"
            this.drawerOpen = false
           }

         

           

        
          },


          toggleComponent(event, component){
            this.prevComponent = this.currentComponent
            this.currentComponent = component;
            var current = document.getElementById(component)
            var prev = document.getElementById(this.prevComponent)
            
          
            // current.style.backgroundColor = 'rgb(156 163 175)'
            current.style.borderBottom = '0px'
            prev.style.background = 'white'
            prev.style.borderBottom = '1px solid black'
         
          },

         
        

    }


}

</script>