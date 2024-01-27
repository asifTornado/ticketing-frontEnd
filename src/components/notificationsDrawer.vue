<template>
<div class="overflow-y-scroll pb-24 flex border border-solid border-black flex-col fixed  w-[30vw] h-[100vh] bg-white" style=" z-index: 99999999999999999999999999999999999999999999999;" v-if="notificationCheck" >
<div class="flex bg-white flex-row justify-between items-center p-3 border-b border-solid border-black sticky top-0">
    <label for="" class="text-2xl font-bold flex flex-row items-center justify-center w-full">Notifications</label>
    <font-awesome-icon icon="fa-solid fa-multiply" size="lg" class="hover:cursor-pointer" @click="showNotifications"/>
</div>
    <div  class="hover:bg-black text-black hover:text-white  flex flex-col  border-b border-solid border-gray-300" v-for="(notification, notificationCounter) in notifications" >
        <div class="flex flex-col hover:cursor-pointer p3   p-3 " v-if="notification.type == 'chat'" @click="getToSource($event, notification)">
           <div> You have received a message from {{ notification.from.empName }}:</div>
           <div class="font-bold ">{{ notification.message }}</div>
<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>
<div class="flex flex-col hover:cursor-pointer p3              p-3 " v-else-if="notification.type == 'mention'" @click="getToSource($event, notification)">
           <div class=""> You have been mention by {{ notification.from.empName }} in a comment</div>
           
<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>
<div class="flex flex-col hover:cursor-pointer p3    p-3 " v-else @click="getToSource($event, notification)">
  <div class="">{{notification.message}}</div>
  
<div class="flex flex-row justify-end text-xs pt-2">{{ notification.time }}</div>

</div>



      
    
</div>





</div>



</template>



<script setup>
import {useNotificationStore} from "../stores/notification.js"
import {storeToRefs} from "pinia"

var {notificationCheck, notifications} = storeToRefs(useNotificationStore())

var {showNotifications, getToSource} = useNotificationStore()




</script>