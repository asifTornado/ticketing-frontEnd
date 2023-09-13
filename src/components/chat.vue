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
    <div v-if="chatFilesCheck" style="z-index:999999" class="border border-solid border-black w-[350px] h-[300px] absolute bottom-[10px] right-[2px] bg-white  flex flex-col justify-between">
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
   <div class="w-full  bg-gray-400 h-12"> 
         <input type="text" name="" class="h-full w-full px-4 py-2 bg-gray-200" placeholder="Caption (optional)" id="" v-model="caption">
   </div>
   <div class="flex flex-row w-full justify-between items-center bg-gray-300">
    <label for="file" class="hover:cursor-pointer ml-4">  <div class="p-3"><font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
        
      </div></label>
      <input type="file" name="Attack File" id="file" placeholder="Attach File" class='hidden' multiple  @change="setChatFiles($event)" />
      <div class="mr-10 hover:cursor-pointer" @click="sendChatFiles"><font-awesome-icon icon="fa-regular fa-paper-plane" size="lg"/></div>
   </div></div>
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

      <div class="flex flex-col w-full h-auto justify-start items-start " v-else>
        
        <template v-if="message.type == 'text'">  <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
          <div class="bg-gray-200 p-3 rounded-md text-black w-[200px]" style="word-wrap: break-word;"  v-html="convertUrlsToLinks(message.message)">  </div>
          <div class="text-xs flex flex-row justify-end">{{message.from.empName}} </div>
      </template>
      <template v-else-if="message.type == 'files'">  
        <div class="text-xs flex flex-row justify-end">{{message.time}} </div>
        <div class="bg-gray-200 p-3  text-black w-[200px]" style="word-wrap: break-word;"  v-for="(file, fileCounter) in message.files" :key="fileCounter" >
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
      <div class="h-auto w-1/5 flex flex-row justify-around items-center ">
        <!-- <input
        type="file"
        ref="fileInput"
        style="display: none"
        multiple
        @change="handleFileInputChange"
      > -->

      <!-- <div class="p-3 bg-white h-full w-full "><font-awesome-icon class="text-blue-600 hover:cursor-pointer" icon="fa-solid fa-video" size="lg" @click="videoCall()"/></div> -->
        <div class="p-3 bg-white h-full w-full "><font-awesome-icon class="text-blue-600 hover:cursor-pointer" icon="fa-solid fa-paperclip" size="lg" @click="openChatFiles"/></div>
        <div class="p-3 bg-white h-full w-full "><font-awesome-icon class="text-blue-600 hover:cursor-pointer" icon="fa-solid fa-paper-plane" @click="sendMessage"  size="lg"/> </div>
     
      </div>
  </div>

</div>

</div>


   </div>
  </template>
  
  <script>
  import Peer from 'peerjs'
  import axios from "axios";
  import SignalRService from './signalRService';
  
  
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
    


    created(){
      // this.initPeer();
      let vm = this;
      const chat = vm.$route.query.chat;
      this.userForCheck =  this.authStore.getUser;
      if(chat == 'true'){
           this.chatBoxCheck = true;
      }
  
      var id = this.ticketId;
      
      var data = new FormData();
      data.append("id", id)
      axios.post(vm.globalUrl + "getChat", data).then((result)=>{
        vm.messages = result.data.conversation
        
      


      }).catch((error)=>vm.$toast.warning(error))
    },

    mounted() {
        var vm=this;
    
  

        
        var name = this.authStore.getUser.empName
         
        




      SignalRService.startConnection()
        .then(() => {
          SignalRService.invoke("Subscribe", vm.ticketId, name)
          SignalRService.on('Receive', vm.handleReceive);
          SignalRService.on("File", vm.handleFile);
          SignalRService.on("NotificationReceive", vm.handleNotification);
          SignalRService.on("CallAlert", vm.handleCall)
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


    sendchatFiles(){
         var vm = this;
         var ticket = this.ticket;
         vm.chatFilesCheck = false;
       
         var token = this.authStore.getToken;
         var userName = this.authStore.getUser.empName;
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
         axios.post(vm.globalUrl + "uploadCommentFiles", data).then((result)=>{
            console.log("this is the result")
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


      handleFile(message){
        console.log("received message successfully")
        console.log(message)
        var messageJson = JSON.parse(message)
        this.$refs.audio.play();
        this.messages = [...this.messages, messageJson]
      },


      handleNotification(message){
        var messageObject = JSON.parse(message);
        var notifications = this.notificationStore.getNotifications;
        this.notificationStore.setNotifications([...notifications, messageObject])
      },

      handleCall(callerId){
        this.call = true
        this.receiver = true
        console.log("this is the caller id")
        console.log(callerId)
        this.call = true
        this.callerId = callerId

      },

      handleReceive(message) {
        console.log("from received")
        console.log(message)
        var vm = this;
        console.log("received message successfully")
        console.log(message)
        var messageJson = JSON.parse(message)
        this.$refs.audio.play();
        console.log(`after playing audio: ${messageJson.message}`)
       
        if(vm.messages == undefined){
          vm.messages = []
          vm.messages.push(messageJson)
        }else{
          vm.messages = [...vm.messages, messageJson]
        }
        
       
//         this.$refs.messageArea.scrollTo({
//       top: this.$refs.messageArea.scrollHeight,
//       behavior: 'smooth'
// })
     



this.$nextTick(() => {


  this.$refs.messageArea.scrollTo({
    top: this.$refs.messageArea.scrollHeight,
    behavior: 'smooth'
  });
});
console.log("the scroll height is")
console.log(typeof this.$refs.messageArea.scrollHeight)        
// Handle SignalR event
      },




      async getCameraStream() {
  try {
      const stream = await navigator.mediaDevices.getUserMedia()({ video: true,
          audio: true,});
      return stream;
  } catch (err) {
      console.error('Error accessing the camera:', err);
  }
},
  
      // Invoke a SignalR method
      sendMessage() {
        let vm = this;
        var Currentuser = this.authStore.getUser;
        var user = this.user;
        var userString = JSON.stringify(Currentuser)
        var message = this.message
        var ticketId = this.ticketId
        this.message = ''
        console.log("these are the message items")
        console.log(`user ${user}`
        )
        console.log(`userString: ${userString}`)
        console.log(`ticketId: ${ticketId}`)
        SignalRService.invoke('SendMessage', message, userString, ticketId).then((result)=>{
          SignalRService.invoke("SendNotificationFromClient", message, Currentuser.empName, user, ticketId )
          console.log(result)
        })
          .catch((error) => {
            console.error('Error invoking SignalR method:', error);
          });
     
      },

      sendFile(){
        this.$refs.fileInput.click();
      },

      sendChatFiles(event) {
        var vm = this;
        var id = vm.ticketId;
        var user = vm.authStore.getUser
        var userString = JSON.stringify(user)

      var data = new FormData();
      
      data.append("id", id);
      data.append("user", userString)

      for(var file of vm.chatFiles){
        data.append("files", file)
      }

      axios.post(vm.globalUrl + "uploadFiles", data).then((result)=>{
        var files = JSON.stringify(result.data);
       
        SignalRService.invoke("UploadFile", files, userString, id).catch((error) => {
            console.error('Error invoking SignalR method:', error);
          });
      })

      
    },


      toggleChatBox(){
      console.log("called toggleChatBox")
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
      href = 'http:/' + url; // Assuming http if the URL doesn't have a protocol
    }
    return  `<a href="${href}" target="_blank">${url}</a>`;
  });
},

videoCall(){
      console.log("calling the other person")
      console.log(this.user)
      this.call = true
      this.caller = true
         SignalRService.invoke("MakeCall", this.user, this.ticketId, this.myPeerId).then((result)=>{
          console.log(result)
         }).catch((error)=>{
          console.log(error)
         })
    },

    respond(){
      var vm = this;
      vm.getCameraStream().then((stream)=>{
        var receiverElem = document.getElementById("receiver")
        receiverElem.srcObject = stream;
        receiverElem.play()

        var call = vm.peer.call(vm.callerId, stream)

        call.on('stream', (remoteStream)=>{
          var callerElem = document.getElementById("caller");
          callerElem.srcObject = remoteStream;
          callerElem.play()
        })
      }).catch((error)=>{console.log(error)})
   

    
    },

initPeer() {
      // Create a new Peer instance with options
      var vm = this;
      this.peer = new Peer(null, {
        host: 'http://192.168.210.199',
        port: 9000,
        path: '/peerjs',

      });

      // Handle the 'open' event to get the Peer ID
      this.peer.on('open', (id) => {
        this.myPeerId = id;
      });

      // Handle the 'connection' event to set up data connection
      this.peer.on('connection', (conn) => {
        this.peerConnection = conn;
        this.peerConnection.on('data', (data) => {
          // Handle incoming data from the connected peer
          console.log('Received data:', data);
        });
      });

      // Handle the 'error' event
      this.peer.on('error', (error) => {
        console.error('Peer error:', error);
      });


      this.peer.on('call', (call)=>{
        vm.getCameraStream((stream)=>{
          call.answer(stream);
          call.on('stream', (remoteStream)=>{
            var callerElem = document.getElementById("caller")
            callerElem.srcObject = remoteStream;
            callerElem.play()

          })
        }).then((error)=>console.log(error))
      })
    },
    },


    

  



  };
  </script>