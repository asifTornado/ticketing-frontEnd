<template>
    
<div class="flex flex-col justify-center items-center   h-auto w-auto px-3 hover:cursor-pointer noprint" v-cloak  id="notifications" @click="showNotifications" >
   <div class=" text-black absolute top-3"> <font-awesome-icon icon="fa-regular fa-bell" size="3x"/> </div>
   <div class=" text-rose-500 absolute top-10   " v-if="notifications.length > 0"><font-awesome-layers  ><font-awesome-icon icon="fa-solid fa-square "  size="2x"/><font-awesome-layers-text :value="notifications.length"  class="text-black text-sm  pl-2"/></font-awesome-layers></div>
  
</div>





</template>

<script setup>
import {ref} from "vue"
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authentication";
import { useUserStore } from "../stores/users";
import {useNotificationStore} from "../stores/notification";


var {token, user} = storeToRefs(useAuthStore())
var {showNotifications} = useNotificationStore()

var {notifications} = storeToRefs(useNotificationStore())




</script>

