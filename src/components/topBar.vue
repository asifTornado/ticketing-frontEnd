<template>
  
<div class="flex flex-row justify-between h-16 bg-gray-100 no-print    text-xs shadow-md shadow-black " style="top: 0; left: 0; position: fixed; width: 100%;"   >




<div class="flex flex-row items-center justify-start">
  

  <img src="../assets/logo.png" alt="" srcset="" width="50" height="20" class="h-12 ml-5 hover:cursor-pointer shadow-md shadow-black mt-3 mb-4"  @click="home()" >


<div class="text-4xl text-black  p-3 font-bold ml-10 hover:cursor-pointer" v-if="route.path.split('/')[1] == 'ticketing'" style="text-shadow: 1px 1px black;" @click="home()">  Help Desk</div>
<div class="text-4xl text-black  p-3 font-bold ml-10 hover:cursor-pointer" v-if="route.path.split('/')[1] == 'travel'" style="text-shadow: 1px 1px black;" @click="home()">Travel Management</div>

</div>

<div class="text-4xl font-bold flex flex-row justify-end    w-[370px] items-center" v-if="user">
  <template v-if="user.userType == 'leader'">Ticket Manager</template>
  <template v-else-if="user.userType == 'normal'">Normal User</template>
  <template v-else-if="user.userType == 'support'">Support User</template>
  <template v-else-if="user.userType == 'admin'">Admin</template>


</div>

<notifications v-if="user && route.path.split('/')[1] == 'ticketing'" class=" ml-80"/>


<div class="flex flex-row mr-5 ">


  



  
  <div  v-if="token != null && route.path.split('/')[1] == 'ticketing'" class="noprint text-white bg-white  hover:cursor-pointer mr-2 text-sm flex flex-row justify-between items-center align-middle  " @click="router.push('/ticketing/blog/knowledge')"><div class=" w-40 p-2 border  hover:shadow-md    border-solid text-black border-black" style="transition: 0.2s;" onmouseover="this.style.boxShadow = '3px 3px 0px black';"
     onmouseout="this.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)';">
                                                                                                                                                                                      <font-awesome-icon icon="fa-solid fa-circle-question " size="lg" class="mr-2"/> <span class="text-sm ">Knowledge Base</span>
                                                                                                                                                                                  </div></div>
     <div  v-if="token != null" class="noprint text-white hover:cursor-pointer mr-2 text-sm flex flex-row bg-white justify-between items-center align-middle  " @click="logout()"><div class=" w-24 p-2 border     border-solid text-black border-black" style="transition: 0.2s;" onmouseover="this.style.boxShadow = '3px 3px 0px black';"
     onmouseout="this.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)';" >
                                                                                                                                                                                      <font-awesome-icon icon="fa-solid fa-right-from-bracket " size="lg" class="mr-2"/> <span class="text-sm ">Logout</span>
                                                                                                                                                                                  </div></div>
     <div class="mr-2 text-2xl text-white  flex flex-col justify-center item-center"  v-if="route.path == '/admin/files'">|</div>
     <div v-if="route.path == '/admin/files'" class="text-white hover:cursor-pointer text-lg flex flex-col justify-center item-center" @click="router.push('/admin')">Back</div> 
    <div class="w-full " v-if="route.path.split('/')[1] == 'ticketing'"  id="" @click="showPopUp" >
     <font-awesome-icon icon="fa-solid fa-gear" size="2x" class="hover:cursor-pointer " 
       />
     
     <div style="position:absolute; display:none; right:10px; top:52px;" class="bg-white shadow shadow-md border-2 border-solid border-black w-32 flex-col  justify-center items-center " id="popup" ref="popup"  >
          <div  class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="router.push('/ticketing/guide')">Guide</div>
          <div class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="router.push('/ticketing/profile')">Profile</div>
          <div class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="router.push('/ticketing/blog/insertArticle')" v-if="user && user.userType == 'admin'">Insert Article</div>
     </div>
    </div>


</div>





</div>



</template>



<script setup>
// import notifications from './notifications.vue'
import {ref, defineEmits} from "vue"
import {useRouter, useRoute} from "vue-router"
import {useAuthStore} from "../stores/authentication"
import {useMainStore} from "../stores/store"
import {storeToRefs} from "pinia"
import { useTicketStore } from '../stores/ticket'


var authStore = useAuthStore()
var mainStore = useMainStore()
var router = useRouter()
var route = useRoute()
var popup = ref(null)
var popupCheck = ref(false)
const emits = defineEmits(['drawer']);



var {user, token} = storeToRefs(useAuthStore())
var {logout} = useAuthStore()


function home(){
  var path = route.path.split("/")[1]

if(pathName == "ticketing"){

if(user) {
if(user.userType == "normal"){
        this.$router.push('/ticketing/normal')
}else if(user.userType == "support"){
  this.$router.push('/ticketing/support/assist')
}else if(user.userType == "admin"){
  this.$router.push('/ticketing/systemAdmin/manage')
}else if(user.userType == "power"){
  this.$router.push('/ticketing/power/analytics')
}else if(user.userType == "leader"){
  this.$router.push('/ticketing/leader/manage')
}else if(user.userType == "tLeader"){
  this.$router.push('/ticketing/temporary-leader/manage')
}
}else{
  router.push("/login")
}

}


}


function faq(){
  router.push("/ticketing/faq")
}


function toggleDrawer(){

emits("drawer", {})

}



function showPopUp(){
     
     if(popupCheck.value == false){
        popup.value.style.display = 'flex'
        popupCheck.value = true
     }else{
      popup.value.style.display = 'none'
        popupCheck.value = false
     }
    }

// export default {
//   data(){
//     return {
     
//       popUpCheck:false

//     }
//   },

//   components:{
//     notifications
//   },

//   methods:{
//     navigateToExternalURL() {
//       var token = this.authStore.getToken
//       this.$router.push("/travel/records");
//     },
//     home(){
//       var user = this.authStore.getUser;
//       var pathName = this.$route.path.split("/")[1]
      


//       if(pathName == "ticketing"){

//         if(user) {
//         if(user.userType == "normal"){
//                 this.$router.push('/ticketing/normal')
//         }else if(user.userType == "support"){
//           this.$router.push('/ticketing/support/assist')
//         }else if(user.userType == "admin"){
//           this.$router.push('/ticketing/systemAdmin/manage')
//         }else if(user.userType == "power"){
//           this.$router.push('/ticketing/power/analytics')
//         }else if(user.userType == "leader"){
//           this.$router.push('/ticketing/leader/manage')
//         }else if(user.userType == "tLeader"){
//           this.$router.push('/ticketing/temporary-leader/manage')
//         }
//       } else {
//          this.$router.push('/login')
//       }
    

//       }else if(pathName == "travel"){
//         if(user){
//           this.$router.push("/travel/records")
//         }else{
//           this.$router.push("/login")
//         }
//       }
      

   
    
    
//     },

//     toggleDrawer(){

//             this.$emit("drawer", {})
      
//     },

//     faq(){
//        this.$router.push("/ticketing/faq")
//     },

//     showPopUp(){
//       var popup = this.$refs.popup
//      if(this.popUpCheck == false){
//         popup.style.display = 'flex'
//         this.popUpCheck = true
//      }else{
//       popup.style.display = 'none'
//       this.popUpCheck = false
//      }
//     },

  

 
//   }



// }
</script>


<style scoped>

.site-navigation {
  display: block;
  font-family: 'Titillium Web', sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
}

.site-navigation ul {

  list-style: none;
  margin: 0;
  padding-left: 0;
}

.site-navigation li {
  color: #fff;
 
  display: block;
  float: left;
  margin: 0 2px 0 0;
  padding: 12px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
}
  
.site-navigation li a {
  color: #fff;
  text-decoration: none;
  display: block;
}

.site-navigation li:hover {
  @include transition(background, 0.2s);
  background: #52a6df;
  cursor: pointer;
}

.site-navigation ul li ul {
  background: white;
  visibility: hidden;
  float: right;
  min-width: 150px;
  position: absolute;
  transition: visibility 0.65s ease-in;
  margin-top:12px;
  right: 0;
  bottom:-80px;
  z-index: 999;
  border:1px solid black;
}

.site-navigation ul li:hover > ul,
.site-navigation ul li ul:hover {
   visibility: visible;
}




</style>
