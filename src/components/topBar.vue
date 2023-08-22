<template>
  
<div class="flex flex-row justify-between h-16 bg-gray-100    text-xs shadow-md shadow-black z-0 " >




<div class="flex flex-row items-center justify-start">
  

  <img src="../assets/logo.png" alt="" srcset="" width="50" height="20" class="h-12 ml-5 hover:cursor-pointer shadow-md shadow-black mt-3 mb-4"  @click="home()" >


<div class="text-4xl text-black  p-3 font-bold ml-10 hover:cursor-pointer" style="text-shadow: 1px 1px black;" @click="home()">  Help Desk</div>


</div>



<notifications v-if="this.authStore.getUser" class=" ml-80"/>


<div class="flex flex-row mr-5 ">


  
  <div  v-if="this.authStore.getToken != null" class="noprint text-white hover:cursor-pointer mr-2 text-sm flex flex-row justify-between items-center align-middle  " @click="this.$router.push('/ticketing/blog/knowledge')"><div class=" w-40 p-2 border  hover:shadow-md    border-solid text-black border-black" style="transition: 0.2s;" onmouseover="this.style.boxShadow = '3px 3px 0px black';"
     onmouseout="this.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)';">
                                                                                                                                                                                      <font-awesome-icon icon="fa-solid fa-circle-question " size="lg" class="mr-2"/> <span class="text-sm ">Knowledge Base</span>
                                                                                                                                                                                  </div></div>
     <div  v-if="this.authStore.getToken != null" class="noprint text-white hover:cursor-pointer mr-2 text-sm flex flex-row justify-between items-center align-middle  " @click="logout()"><div class=" w-24 p-2 border     border-solid text-black border-black" style="transition: 0.2s;" onmouseover="this.style.boxShadow = '3px 3px 0px black';"
     onmouseout="this.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)';" >
                                                                                                                                                                                      <font-awesome-icon icon="fa-solid fa-right-from-bracket " size="lg" class="mr-2"/> <span class="text-sm ">Logout</span>
                                                                                                                                                                                  </div></div>
     <div class="mr-2 text-2xl text-white  flex flex-col justify-center item-center"  v-if="this.$route.path == '/admin/files'">|</div>
     <div v-if="this.$route.path == '/admin/files'" class="text-white hover:cursor-pointer text-lg flex flex-col justify-center item-center" @click="this.$router.push('/admin')">Back</div> 
    <div class="w-full "  id="" @click="showPopUp" >
     <font-awesome-icon icon="fa-solid fa-gear" size="2x" class="hover:cursor-pointer " 
       />
     
     <div style="position:absolute; display:none; right:10px; top:52px;" class="bg-white border-2 border-solid border-black w-32 flex-col  justify-center items-center " id="popup" ref="popup"  >
          <div  class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="this.$router.push('/ticketing/guide')">Guide</div>
          <div class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="this.$router.push('/ticketing/profile')">Profile</div>
          <div class="flex flex-row p-3 hover:bg-blue-200 w-full justify-center hover:cursor-pointer" @click="this.$router.push('/ticketing/blog/insertArticle')" v-if="this.authStore.getUser && this.authStore.getUser.userType == 'admin'">Insert Article</div>
     </div>
    </div>

     <!--      
     <nav id="navigation" class="site-navigation flex flex-col justify-center items-center text-black" role="navigation" >
  <ul class="menu flex flex-col justify-center items-center">

    <li class="menu-item"><div class="flex flex-row justify-center items-center text-black" href="#"><font-awesome-icon icon="fa-solid fa-gear " size="2x"  /></div>
      <ul class="dropdown">
        <li class="menu-item sub-menu " @click="this.$router.push('/ticketing/profile')">My Profile</li>
        <li class="menu-item sub-menu " @click="this.$router.push('/blog/myArticles')" v-if="this.authStore.getUser && this.authStore.getUser.userType != 'normal'">My Articles</li>
        <li class="menu-item sub-menu " @click="faq()">FAQ</li>
       
      </ul>
    </li>
  
  </ul>
</nav> -->
</div>





</div>



</template>



<script>
import notifications from './notifications.vue'
export default {
  data(){
    return {
     
      popUpCheck:false

    }
  },

  components:{
    notifications
  },

  methods:{
    home(){
      var user = this.authStore.getUser;
    
      

      if(user) {
        if(user.userType == "normal"){
                this.$router.push('/ticketing/user')
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
      } else {
         this.$router.push('/login')
      }
    
    
    
    },

    toggleDrawer(){
      console.log("from inside toggle drawer")
            this.$emit("drawer", {})
      
    },

    faq(){
       this.$router.push("/ticketing/faq")
    },

    showPopUp(){
      var popup = this.$refs.popup
     if(this.popUpCheck == false){
        popup.style.display = 'flex'
        this.popUpCheck = true
     }else{
      popup.style.display = 'none'
      this.popUpCheck = false
     }
    },

  

 
  }



}
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
