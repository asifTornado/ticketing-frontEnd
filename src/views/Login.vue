<template>
  
  <div class=" w-full h-full flex flex-row bg-white justify-center items-start pt-[100px] "  ref="login" id="login">
 
<img src="../assets/front.jpg" class=" shadow-black mt-10 mr-24" style="filter:grayscale(0.4)" alt="" srcset="">
<div class="w-96 h-50   hover:shadow-blue-500 mt-20">

<form @submit.prevent="authStore.login" style="box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.5)"    class="bg-white drop-shadow-md   rounded-b-md    pb-8 mb-4 h-auto " id="form">



<div class="w-full bg-gradient-to-r bg-[rgb(38,65,86)] rounded-t-md  text-white font-bold text-start pl-5 p-4 text-4xl">Login</div>
         
<div class=" px-4 py-4">


  <vss searchable="true" v-model="authStore.email" :options="authStore.userEmails" placeholder="Select Email"></vss>


</div>


<div class="mb-2 px-4">


   <input type="password" v-model="authStore.password" class="shadow h-14 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-400 focus:outline-1" id="password" placeholder="Password" name="password" ref="passwordRef" >
   <div class="flex flex-row mb-5 mt-3">
    <input type="checkbox" class="mr-1 w-8" @change="showPassword($event)" />
    <label>Show Password</label>
   </div>
  </div>

<div class="flex items-center px-4 justify-between"><button type="submit" class="bg-[rgb(38,65,86)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button></div>
<hr class="border border-solid border-slate-200 mb-5  flex flex-row justify-center items-center ml-5 mt-5" style="width:90%"/>



             <div  class="text-white font-bold  w-full flex flex-row justify-center   items-center h-auto"><button class="bg-green-500 p-4 rounded-md text-xl hover:cursor-pointer " style="filter:grayscale(0.3)" @click="this.$router.push('/register')">Create New Account</button></div>
</form>





</div>
   </div>
</template>


<script setup>
import axios from 'axios'
import {ref} from "vue"

import VueJwtDecode from 'vue-jwt-decode'
import { storeToRefs } from 'pinia';


import {useAuthStore} from '../stores/authentication'



var passwordCheck = ref(false)
 var passwordRef = ref(null)

  function showPassword(event){
    passwordCheck.value = !passwordCheck.value
     debugger
        if(passwordCheck.value == true){
          passwordRef.value.type = 'text'
  
        }else{
          passwordRef.value.type = 'password'
        }
      };


var authStore = useAuthStore()

authStore.getUserEmails()





</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
