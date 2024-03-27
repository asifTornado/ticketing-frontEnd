import { defineStore } from "pinia";
import {ref} from 'vue'
import { useGlobalStore } from "./globalStore";
import { useRouter } from "vue-router";
import VueJwtDecode from 'vue-jwt-decode'
import axios from "axios";
import {useToast} from 'vue-toast-notification';



export const useAuthStore = defineStore("auth", () => {
       var user = ref('')
       var token = ref('')
       var refreshToken = ref(null)
       var emails = ref([])
       var passwords = ref([])
       var globalStore = useGlobalStore()
       var userEmails = ref([])
       var router = useRouter()
       var email = ref('')
       var password = ref("")
       var passwordCheck = ref(null)
       var passwordRef = ref(null)
       var toast = useToast()




       function getUserEmails(){
     
       
        var data = {token:token.value}
        
        var mailList = []
        axios.post(globalStore.globalUrl + 'getUsersIncludingAdmin', data).then((result)=>{
          // toast.success("Got user emails")
          var newMailList = result.data.map((item)=>item.mailAddress)
       
          userEmails.value = newMailList
          
        }).catch((error)=>toast.warning(error))
     
            
      };



    


      function showPassword(event){
     
        if(passwordCheck.value == true){
          passwordRef.value.type = 'text'
  
        }else{
          passwordRef.value.type = 'password'
        }
      };


      function testFunction(){
        console.log("fired test function")
      }


      function login(){
        console.log("from login function")
        toast.info("login in....")
        // var bounceUrl = this.mainStore.getBounceUrl;
    
        // var vm = this;
        axios.post(globalStore.globalUrl + 'login', {email:email.value, password:password.value}).then((result)=>{
          
          console.log("this is the result")
          console.log(result.data)

          user.value = result.data.result
          token.value = result.data.token
          toast.clear()
          toast.success("success")
          toast.clear()
      
          console.log("these are the login in values")
          console.log(user.value)
            debugger;
  
        //  if(bounceUrl){
       
        //   vm.mainStore.setBounceUrl(null);
        
        //   vm.$router.push(bounceUrl)
        //   return
        //  }
  
  
          if(user.value.userType == "admin"){
            router.push('/ticketing/systemAdmin/manage')
          }else if(user.value.userType == "normal"){
            router.push('/ticketing/normal')
          }else if(user.value.userType == "leader"){
            router.push('/ticketing/manage')
          }else if(user.value.userType == "support"){
            router.push('/ticketing/support/assist')
          }else if(user.value.userType == "power"){
            router.push('/ticketing/power/analytics')
          }else if(user.value.userType == "tLeader"){
            router.push('/ticketing/temporary-leader/manage')
          }else if(user.value.userType == 'departmentPower'){
            router.push('/ticketing/departmentPowerUser/analytics')
          }else if(user.value.userType == 'Ticket Manager (General)'){
            router.push('/ticketing/general/manage')
          }else if(user.value.userType == "Ticket Manager (Department)"){
            router.push("/ticketing/manage")
          }
          
        }).catch((error)=> toast.warning(error))
             
       
       
  
      }

      function setUser(newUser){
           user.value = newUser
      }


      function setToken(newToken){
        token.value = newToken
   }


   function logout(){
    user.value = null
    token.value = null
    
    router.push('/login')
}


      return {user, token, emails, email, password, userEmails, passwordCheck, passwordRef, 
        setUser, setToken,  testFunction, getUserEmails, login, showPassword, logout}

      

},
{persist: true}
)
