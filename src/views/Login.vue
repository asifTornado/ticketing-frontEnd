<template>
  
  <div class=" w-full h-full flex flex-row justify-center items-start"  ref="login" id="login">
 
<img src="../assets/front.jpg" class=" mt-10 mr-24" style="filter:grayscale(0.4)" alt="" srcset="">
<div class="w-96 h-50   hover:shadow-blue-500 mt-20">

<form @submit.prevent="login" style="box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.5)"    class="bg-white drop-shadow-md   rounded-b-md    pb-8 mb-4 h-auto " id="form">



<div class="w-full bg-gradient-to-r bg-[rgb(38,65,86)] rounded-t-md  text-white font-bold text-start pl-5 p-4 text-4xl">Login</div>
         
<div class=" px-4 py-4">


  <vss searchable="true" v-model="email" :options="userEmails" placeholder="Select Email"></vss>

  <!-- <input type="text" v-model="email"> -->
</div>


<div class="mb-2 px-4">


   <input type="password" v-model="password" class="shadow h-14 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-400 focus:outline-1" id="password" placeholder="Password" name="password" ref="password" >
   <div class="flex flex-row mb-5 mt-3">
    <input type="checkbox" class="mr-1 w-8" @change="showPassword($event)" ref="passwordCheck"/>
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


<script>
import axios from 'axios'
import {mapStores} from 'pinia'
import {useAuthStore} from '../stores/authentication'
import VueJwtDecode from 'vue-jwt-decode'


export default {
  data(){
    return {
    email:"",
    password:"",
    userEmails:[]
  }
  },

  // computed:{
  //   ...mapStores(useAuthStore)
  // },


  created(){
      this.getUserEmails()
      
   
  },


  



  methods:{

    showPassword(event){
      console.log("called show password")
      if(this.$refs.passwordCheck.checked == true){
        this.$refs.password.type = 'text'

      }else{
        this.$refs.password.type = 'password'
      }
    },
    login(){
      console.log("from the login page")
      console.log(this.globalUrl);
      var bounceUrl = this.mainStore.getBounceUrl;
      console.log(`this is the bounceUrl ${bounceUrl}`)
      var vm = this;
      axios.post(vm.globalUrl + 'login', {email:this.email, password:this.password}).then((result)=>{

 
        vm.authStore.setUser(result.data.result);
        var decodedToken = VueJwtDecode.decode(result.data.token)
     

        vm.authStore.setToken(result.data.token);
        console.log(result.data)
        var user = vm.authStore.getUser;
        console.log("this is the user");
        console.log(user)

       if(bounceUrl){
        console.log('inside if bounce')
        vm.mainStore.setBounceUrl(null);
        console.log(bounceUrl)
        vm.$router.push(bounceUrl)
        return
       }


        if(user.userType == "admin"){
          vm.$router.push('/ticketing/systemAdmin/manage')
        }else if(user.userType == "normal"){
          vm.$router.push('/ticketing/normal')
        }else if(user.userType == "leader"){
          vm.$router.push('/ticketing/leader/manage')
        }else if(user.userType == "support"){
          vm.$router.push('/ticketing/support/assist')
        }else if(user.userType == "power"){
          vm.$router.push('/ticketing/power/analytics')
        }else if(user.userType == "tLeader"){
          vm.$router.push('/ticketing/temporary-leader/manage')
        }else if(user.userType == 'departmentPower'){
          vm.$router.push('/ticketing/departmentPowerUser/analytics')
        }
        
      }).catch((error)=>console.log(error))

     

    },


    getUserEmails(){
        console.log('inside computed function')
        var token = this.authStore.getToken;
        var data = {token}
        var vm = this;
        var mailList = []
        axios.post(vm.globalUrl + 'getUsersIncludingAdmin', data).then((result)=>{
          console.log(result)
          var newMailList = result.data.map((item)=>item.mailAddress)
       
           vm.userEmails = newMailList
          
        }).catch((error)=>vm.$toast.warning(error))
     
      
      },
  }



}



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
