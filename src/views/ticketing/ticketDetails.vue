<template>

<div class="bg-white h-[92vh] w-full">


   
        
    
    
    <div class="fixed h-[92vh] w-full flex flex-col border-2 border-solid border-gray-400  z-10 right-0 bg-gray-200 " style="width:0px; transition:0.3s; z-index: 99999;"  ref="drawer"> 
      <div style="top:480px; left:-45px; z-index: 99999;" class="shadow-md shadow-black absolute   h-24 w-14 z-50 hover:bg-blue-500 hover:text-white  rounded-sm border border-solid border-l-gray-400 border-t-gray-400 border-b-gray-400 flex flex-col justify-center items-center" ref="handle" @click="close()"><font-awesome-icon :icon="iconName" size="2x" id="drawerIcon"/></div>   
      


        <div class="card">
        <TabView>
            <TabPanel header="Comments">
               <Comments :ticket="ticket" v-if="ticket"/>
            </TabPanel>
            <TabPanel header="Past Issues">
              <Infos :ticket="ticket" v-if="ticket"/>
            </TabPanel>
            <TabPanel header="Files">
              <Files :ticket="ticket" v-if="ticket"/>
            </TabPanel>
            <TabPanel header="Knowledge Base">
              <KnowledgeBase :ticket="ticket" v-if="ticket"/>
            </TabPanel>
        </TabView>
    </div>
    
    
    </div>
      
        <CurrentHandler :ticket="ticket" :handlerType="ticket.currentHandlerType" v-if="user && ticket && ticket.currentHandler && (user.mailAddress == ticket.currentHandler.mailAddress ) "/>
        <Viewer :ticket="ticket" :handlerType="ticket.currentHandlerType" v-else-if="ticket && user && ( (ticket.currentHandler && ticket.currentHandler.mailAddress != user.mailAddress) || ticket.currentHandler == null)" class="bg-white" />  
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useAuthStore } from '../../stores/authentication'
import { useGlobalStore } from '../../stores/globalStore'
import { mapStores } from 'pinia'


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

    components:{CurrentHandler, Viewer, Comments, Files, Infos, KnowledgeBase, TabPanel, TabView},

    created(){
        
        this.loadTicket()
    },

    computed:{
         ...mapStores(useAuthStore, useGlobalStore)
    },

    methods:{
          loadTicket(){
            var vm = this;
            this.user = this.authStore.user
            vm.$toast.info("Loading Ticket")
            var token = this.authStore.token
            var id = this.$route.params.id
            var data = new FormData();
            data.append("token", token);
            data.append("id", id);
            data.append("user", JSON.stringify(this.user))
            var url = this.globalStore.globalUrl + "getTicket" 
            axios.post(url, data, {
  headers: {
    'Authorization': `Bearer ${token}`,
   
  }
}).then((response)=>{
                vm.ticket = response.data
         
                vm.$toast.clear()
                vm.$toast.success("Ticket Loaded")
            }).catch((error)=>vm.$toast.warning(error))
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
            
          
      
            current.style.borderBottom = '0px'
            prev.style.background = 'white'
            prev.style.borderBottom = '1px solid black'
         
          },

         
        

    }


}

</script>


