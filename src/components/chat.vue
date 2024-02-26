<template>


  <div class=" w-auto h-[300px] bg-white border border-solid border-black" style="z-index:9999999999999999" v-if="call == true">
  <div class="w-full h-full flex-col flex p-3">


<div class="flex flex-row">
  <video id="caller" width="300" height="300"  class="mx-auto d-block border border-solid border-black" ref="caller"></video>
  <video id="receiver" width="300" height="300"  class="mx-auto d-block border border-solid border-black" ref="receiver"></video>
</div>


    <div v-if="caller == true">
    Calling {{ user }}
    </div>
    
    <div v-if="receiver == true">
    Receiving call from {{ user }}
    <div @click="respond()">Respond</div>
    </div>


    <div class="w-full flex flex-row justify-end hover:cursor-pointer" >
    
      <div @click="this.call = false">Cancel</div>
    </div>
   
  </div>
  </div>
  <audio id="myAudio" class="hidden" ref="audio">
    <source src="../assets/sound1.mp3" type="audio/mp3">
    
    Your browser does not support the audio element.
  </audio>
   <div class="absolute bottom-0 h-auto w-full   bg-white" style="z-index: 90000;" >
    <div tabindex="0"  v-if="chatFilesCheck" @keydown.enter="sendChatFiles" style="z-index:999999" class="border border-solid border-black w-[350px] h-[300px] absolute bottom-[10px] right-[2px] bg-white  flex flex-col justify-between">
  <div> <div class="p-2 w-full  justify-end  flex flex-row hover:cursor-pointer" @click="chatFilesCheck = false"><font-awesome-icon icon="fa-solid fa-multiply" size="2x"/></div>
   <div class="w-full h-[120px] overflow-y-scroll relative p-5" >
     
     <div class="w-full flex flex-row justify-between" v-for="(file, fileCounter) in chatFiles">
      <div>{{ file.name }}</div>
      <div class="p-2 hover:cursor-pointer" @click="removeChatFiles(fileCounter)"><font-awesome-icon icon="fa-solid fa-minus"/>
         
      </div>
   </div>
   
   </div>
</div>
 <div>  
   <!-- <div class="w-full  bg-gray-400 h-12"> 
         <input type="text" name="" class="h-full w-full px-4 py-2 bg-gray-200" placeholder="Caption (optional)" id="" v-model="caption">
   </div> -->
   <div class="flex flex-row w-full justify-between items-center bg-gray-300">
    <label for="file" class="hover:cursor-pointer ml-4">  <div class="p-3"><font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
        
      </div></label>
      <input type="file" name="Attach File" id="file" placeholder="Attach File" class='hidden' multiple  @change="setChatFiles($event)" />
      <div class="mr-10 hover:cursor-pointer" @click="sendChatFiles"><font-awesome-icon icon="fa-regular fa-paper-plane" size="lg"/></div>
   </div>
  
  </div>
</div>
    <div class="flex flex-row  justify-between h-12 w-full  p-3  text-white  bg-blue-400"  @click="toggleChatBox">
      <label for="">Chat Box</label>
       <font-awesome-icon icon="fa-solid fa-minus" size="lg" class="hover:cursor-pointer"  ref="toggleIcon"/>
   </div>
<div class="flex flex-col h-[400px] w-full bg-white " style="z-index:9999" v-if="chatBoxCheck == true">
          
  <div class="flex flex-col  h-full w-full p-3 overflow-y-scroll " id="messageArea" ref="messageArea">
     <div class="flex flex-row w-full "  v-for="(message, messageCounter) in messages"  :key="messageCounter">

      <div class="flex flex-col  justify-end items-end  w-full mb-7"  v-if="message && message.from.mailAddress == userForCheck.mailAddress">
          
      <template v-if="message.type == 'text'">  <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
          <div class="bg-blue-500 p-3 rounded-md text-white " style="word-wrap: break-word; max-width:50%" v-html="convertUrlsToLinks(message.message)" >  </div>
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

      <div class="flex flex-col w-full h-auto justify-start items-start mb-7 " v-else>
        
        <template v-if="message.type == 'text'">  <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
          <div class="bg-gray-200 p-3 rounded-md text-black " style="word-wrap: break-word; max-width:50%"  v-html="convertUrlsToLinks(message.message)">  </div>
          <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
      </template>
      <template v-else-if="message.type == 'files'">  
        <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
        <div class="bg-gray-200 p-3  text-black " style="word-wrap: break-word; max-width:50%"  v-for="(file, fileCounter) in message.files" :key="fileCounter" >
          <a :href="this.globalUrl + 'uploads/' + file.fileName" target="_blank" class="underline"> {{file.originalName}} </a>
          </div>
        <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
    </template>
     </div>
    
    
    </div>
  
  
    </div>




<div class=" w-full h-auto bg-white border-t border-solid border-black">
  
  <div class="flex flex-row h-auto w-full">
   <div class="h-auto w-4/5 p-2 pr-4">
  
    
    <textarea rows="1" name="" id="" class="rounded-xl  bg-slate-200 h-auto w-full p-3" placeholder="Message" v-model="message" @keyup.enter="sendMessage"  ></textarea>
  </div>
      <div class="h-auto w-1/5 flex flex-row pt-[8px] justify-around items-center ">

        <div class="p-3 bg-white h-full w-full "><font-awesome-icon class="text-blue-600 hover:cursor-pointer" icon="fa-solid fa-paperclip" size="lg" @click="openChatFiles"/></div>
        <div class="p-3 bg-white h-full w-full "><font-awesome-icon class="text-blue-600 hover:cursor-pointer" icon="fa-solid fa-paper-plane" @click="sendMessage"  size="lg"/> </div>
     
      </div>
  </div>

</div>

</div>


   </div>
  </template>
  
  <script>

  import axios from "axios";
  import SignalRService from './signalRservice'
  import {useAuthStore} from "../stores/authentication"
   import {useGlobalStore} from "../stores/globalStore"
   import {useTicketStore} from "../stores/ticket"
   import { useUserStore } from '../stores/users'
   import {mapStores} from "pinia"
  
  
  export default {


    data(){
       return {
        chatBoxCheck:false,
        messages:[],
        userForCheck:null,
        call:false,
        caller:false,
        receiver:false,
        callerId:0,  
      
       
        files:[],


        myPeerId: null,
        connectedPeerId: null,
        connected: false,
        peer: null,
        peerConnection: null,
        chatFiles:[],
           caption:'',
           chatFilesCheck:false
       }
    }, 


    computed:{
         ...mapStores(useAuthStore, useGlobalStore)
    },
    


    created(){
     
      let vm = this;
      const chat = vm.$route.query.chat;
      this.userForCheck =  this.authStore.user;
      if(chat == 'true'){
           this.chatBoxCheck = true;
      }
  
      var id = this.ticketId;
      
      var data = new FormData();
      data.append("id", id)
      axios.post(this.globalStore.globalUrl + "getChat", data).then((result)=>{
        vm.messages = result.data.conversation
        
      


      }).catch((error)=>vm.$toast.warning(error))
    },

    mounted() {
        var vm=this;
    
  

        
        var name = this.authStore.user.empName
         
        




      SignalRService.startConnection()
        .then(() => {
          debugger
          SignalRService.invoke("Subscribe", vm.ticketId, name)
          SignalRService.on('Receive', vm.handleReceive);
          SignalRService.on("File", vm.handleFile);
          SignalRService.on("NotificationReceive", vm.handleNotification);
          console.log("signal r initialized")

        })
        .catch((error) => {
          console.error('Error starting SignalR connection:', error);
        });


    
   
 
    },
  
    beforeUnmount() {
      SignalRService.off('eventName', this.handleEvent);
      SignalRService.stopConnection();
    },

    props:["ticketId", "user"],
  
    methods: {

      openChatFiles(){
       this.chatFilesCheck = !this.chatFilesCheck
    },

    setChatFiles(event){
      var vm = this;
       for(var x of event.target.files){
           vm.chatFiles.push(x)
       }
    },

    removeChatFiles(counter){
      var vm = this;
      vm.chatFiles.splice(counter, 1)
    },


  


      handleFile(message){

        var messageJson = JSON.parse(message)
        this.$refs.audio.play();
        this.messages = [...this.messages, messageJson]
      },


      handleNotification(message){
        var messageObject = JSON.parse(message);
        var notifications = this.notificationStore.getNotifications;
        this.notificationStore.setNotifications([...notifications, messageObject])
      },

   

      handleReceive(message) {
        debugger
        var vm = this;
    
        var messageJson = JSON.parse(message)
        this.$refs.audio.play();
      
       
        if(vm.messages == undefined){
          vm.messages = []
          vm.messages.push(messageJson)
        }else{
          vm.messages = [...vm.messages, messageJson]
        }
        
       

     



this.$nextTick(() => {


  this.$refs.messageArea.scrollTo({
    top: this.$refs.messageArea.scrollHeight,
    behavior: 'smooth'
  });
});
     

      },





  

      sendMessage() {
        let vm = this;
        var Currentuser = this.authStore.user;
        var user = this.user;
        var userString = JSON.stringify(Currentuser)
        var message = this.message
        var ticketId = this.ticketId
        this.message = ''
        debugger

        SignalRService.invoke('SendMessage', message, userString, ticketId).then((result)=>{
          SignalRService.invoke("SendNotificationFromClient", message, JSON.stringify(Currentuser), JSON.stringify(user), ticketId )

        })
          .catch((error) => {
            console.error('Error invoking SignalR method:', error);
          });
     
      },

      sendFile(){
        this.$refs.fileInput.click();
      },

      sendChatFiles(event) {
        debugger
        var vm = this;
        vm.chatFilesCheck = !vm.chatFilesCheck
        var id = vm.ticketId;
        var user = vm.authStore.user
        var userString = JSON.stringify(user)

      var data = new FormData();
      
      data.append("id", id);
      data.append("user", userString)
      data.append("caption", vm.caption)

      for(var file of vm.chatFiles){
        data.append("files", file)
      }

      axios.post(this.globalStore.globalUrl + "uploadFiles", data).then((result)=>{
        var files = JSON.stringify(result.data);
        vm.chatFiles = []
        debugger
        SignalRService.invoke("UploadFile", files, userString, id).catch((error) => {
            console.error('Error invoking SignalR method:', error);
          });
      })

      
    },


      toggleChatBox(){

      if(!this.chatBoxCheck){
        this.chatBoxCheck = true
      }else{
        this.chatBoxCheck = false
      }
    },


   convertUrlsToLinks(inputString) {
  const urlRegex = /((https?:\/\/|www\.)[^\s]+)/g;
  if(inputString == null){
    return
  }
  return inputString.replace(urlRegex, (url) => {
    let href = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      href = 'http:/' + url; 
    }
    return  `<a href="${href}" target="_blank">${url}</a>`;
  });
},





    },


    

  



  };
  </script>