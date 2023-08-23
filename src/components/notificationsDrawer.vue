<template>
<div class="overflow-y-scroll pb-24 flex border border-solid border-black flex-col fixed  w-[20vw] h-[100vh] bg-white" style=" z-index: 99999999999999999999999999999999999999999999999;" v-if="this.mainStore.getNotificationsCheck == true" >
<div class="flex bg-white flex-row justify-between items-center p-3 border-b border-solid border-black sticky top-0">
    <label for="" class="text-2xl font-bold">Notifications</label>
    <font-awesome-icon icon="fa-solid fa-multiply" size="lg" class="hover:cursor-pointer" @click="this.mainStore.toggleNotification()"/>
</div>
    <div  class=" flex flex-col  border-b border-solid border-gray-300" v-for="(notification, notificationCounter) in this.notificationStore.getNotifications" >
        <div class="flex flex-col hover:cursor-pointer p3  text-blue-900 p-3 " v-if="notification.type == 'chat'" @click="getToSource($event, notification)">
           <div> You have received a message from {{ notification.from.empName }}:</div>
           <div class="font-bold text-black">{{ notification.message }}</div>
<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>
<div class="flex flex-col hover:cursor-pointer p3  text-blue-900 p-3 " v-if="notification.type == 'mention'" @click="getToSource($event, notification)">
           <div> You have been mention by {{ notification.from.empName }} in a comment</div>
           
<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>


        <div class="flex flex-col hover:cursor-pointer p-3  text-emerald-900" v-else @click="getToSource($event, notification)">
    {{ notification.message }}

<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>
    
</div>





</div>



</template>



<script>
export default{
   methods:{
    getToSource(event, notification){
          
          var vm = this;
          var token = this.authStore.getToken;
          var user = this.authStore.getUser;
          var id = notification._id

      
          var data = new FormData();
          data.append("token", token);
          data.append("id", id);
          data.append("user", JSON.stringify(user))
          
          
          this.axios.post(vm.globalUrl + 'deleteNotification', data).then((result)=>{
            console.log("this is the result")
            console.log(result)
          
            vm.getNotifications();

            if(notification.type == 'chat'){
              vm.$router.push("/ticketing/ticketDetails/" +notification.ticketId + "?chat=true")
            }else{
              
              vm.$router.push("/ticketing/ticketDetails/" +notification.ticketId)
            }

                 
            

  
      
          
          
          
          }).catch((error)=>{console.log(error)})

         
         
         
  

        },
   }
}



</script>