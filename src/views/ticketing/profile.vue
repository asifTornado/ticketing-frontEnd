<template >
    

    <div class="w-full h-[92vh] px-10 py-10 overflow-y-scroll ml-[30px]">
  <div class="flex flex-row justify-center items-center border-2 border-black border-solid p-4 rounded-md">  <label class="text-black text-4xl font-bold">My Profile</label></div>
    
<div class="flex flex-row">
    
    
        <div class='flex flex-col w-full h-[92vh]'>
        
            
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Name:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'> {{ user.empName }}</div>
                </div>
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Official Email:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'> {{ user.mailAddress }}</div>
                </div>
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Department:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'> {{ user.department }}</div>
                </div>
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Designation:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'> {{ user.designation }}</div>
                </div>
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Section:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'>{{ user.section }}</div>
                </div>
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Unit:</div>
                   
                     <div class='w-8/12 rounded-md h-9  p-1'> {{ user.unit }}</div>
                </div>


                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Zone:</div>
                   
                     <select class='w-8/12 rounded-md h-9  p-1 border border-solid border-black' @change="toggleSave" v-model="user.location" >
                    <option v-for="(location, locationCounter) in locations" :value="location.name">{{ location.name }}</option>
                    </select>
                </div>
    
    
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Phone Number:</div>
                   
                     <input class='w-8/12 rounded-md h-9  p-1 border border-solid border-black' @change="toggleSave" v-model="user.mobileNo" />
                </div>
    
    
                
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Extension Number:</div>
                   
                    <input class='w-8/12 rounded-md h-9 border border-solid border-black p-1' @change="toggleSave" v-model="user.extension" />
                </div>


                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>User Type:</div>
                   
                     <div class="w-8/12 rounded-md h-9  p-1"> {{user.userType == "leader" ? "Ticket Manager" : user.userType }}</div>
                </div>
    
    
    
                <div class=" mt-5 text-black  w-full flex flex-row">
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Password:</div>
                   
                 <div class="flex flex-row justify-start  items-center w-8/12 rounded-md h-9  p-1">
                         <input v-model="user.password" type="password" class="border border-solid border-black" id="password" @change="toggleSave"/> <font-awesome-icon :icon="eye" class="ml-2" @click="togglePassword()" id="eye"/>
                       
                 </div>



                 
                </div>
        
        
        
        
                
        
        
        
        
            
        
        
               
        
        
        
        
        
        
              
        
        
                
               
        
        
        
        
                
        
                 
        <hr class="border border-solid border-slate-300 "/>
              
            
        <div class="flex flex-row justify-center items-center mt-5">
            <div class="bg-slate-200 h-auto w-auto text-gray-400 font-bold py-2 px-10 shadow shadow-black"  id="save" @click="makeChange">Save Changes</div>
            <div class="bg-slate-300 h-auto w-auto text-black font-bold py-2 px-10 shadow shadow-black ml-5 hover:cursor-pointer" @click="cancel">Cancel</div>
        </div>
        
           
        </div>

        
        <!-- <div class="flex flex-col w-1/2 h-full justify-start items-center mt-20">
            <label class="[font-size:30px]">{{availability}}</label>
            <Toggle v-model="user.available" @change="toggleSave"/>
        </div> -->
</div>
    
    </div>
    
    </template>
<script setup>
  import {ref} from "vue"
  import {useRouter} from "vue-router"
  import { storeToRefs } from "pinia";

  import { useUserStore } from "../../stores/users";
  import {useAuthStore} from "../../stores/authentication";
import { useTicketStore } from "../../stores/ticket";

 var {user, edit, eye} = storeToRefs(useAuthStore())
 
 debugger
 var save = ref(false)

 var {makeChange} = useUserStore()

 var router = useRouter()
 var {getLocations} = useTicketStore()

 getLocations()

 var {locations} = storeToRefs(useTicketStore())


 function togglePassword(){
       
                var eye = document.getElementById('eye');
                var password = document.getElementById('password');
                                  
              if(eye.value =="fa-solid fa-eye-slash"){
                  eye.value ="fa-solid fa-eye"
                  password.setAttribute('type', 'password')
               }else{
                eye.value ="fa-solid fa-eye-slash"
                password.setAttribute('type', 'text')
               }

                
            }


function toggleSave(){

    console.log("entered togglesave")
    
    var save2 = document.getElementById('save');
    console.log(save.value)
    if(save.value == false && save2 != null){
    save2.classList.remove("bg-gray-200")
    save2.classList.remove("text-gray-400")
    save2.classList.add("bg-slate-300")
    save2.classList.add("text-black")
    save2.classList.add("hover:cursor-pointer")
    save.value=true
    
    }     
    }


function  cancel(){
         
            var userType = user.value.userType;

            switch(userType){
              case "admin":
                router.push("/ticketing/systemAdmin/manage");
                break;
              case "normal":
                 router.push("/ticketing/normal");
                 break;
              case "power":
                 router.push("/ticketing/power");
                 break;
              case "leader":
                 router.push("/ticketing/leader/manage");
                 break;
            
            }
        }

   </script>
    
    <!-- <script>
    import axios from 'axios';
 
    
    export default{
        data(){
            return {
                files:[],
                user:null,
              
            
                edit:false,
                eye:"fa-solid fa-eye",
                save:false,
                locations:[]
          
               
            }
        },
        components:{
            Toggle
        },
    
        computed:{
              


              availability(){
                if(this.user.available == true){
                    return "Available"
                }else{
                    return "Not Available"
                }
              }

           
        },
    
        created(){
            // var user = this.authStore.getUser;
            // var token = this.authStore.getToken
            // this.user = user
            var vm = this;
            axios.get(vm.globalUrl + 'getLocations', {
  headers: {
    'Authorization': `Bearer ${token}`,
    
  }
}).then((result)=>{
                vm.locations = result.data
            }).catch((error)=>vm.$toast.warning(error))
        
        },
    
    
        methods:{
          
    
            
           


            togglePassword(){
       
                var eye = document.getElementById('eye');
                var password = document.getElementById('password');
                                  
              if(this.eye=="fa-solid fa-eye-slash"){
                  this.eye="fa-solid fa-eye"
                  password.setAttribute('type', 'password')
               }else{
                this.eye="fa-solid fa-eye-slash"
                password.setAttribute('type', 'text')
               }

                
            },


            toggleSave(){

                var vm = this;
        
              
                var save = document.getElementById('save');
           if(!vm.save && save != null){
            save.classList.remove("bg-gray-200")
            save.classList.remove("text-gray-400")
            save.classList.add("bg-slate-300")
            save.classList.add("text-black")
            save.classList.add("hover:cursor-pointer")
            vm.save=true
         
           }     
            },

        cancel(){
            var user = this.authStore.getUser
            var userType = user.userType;

            switch(userType){
              case "admin":
                this.$router.push("/ticketing/systemAdmin/manage");
                break;
              case "normal":
                 this.$router.push("/ticketing/normal");
                 break;
              case "power":
                 this.$router.push("/ticketing/power");
                 break;
              case "leader":
                 this.$router.push("/ticketing/leader/manage");
                 break;
            
            }
        },


//         makeChange(){
//             var vm = this;
//             vm.$toast.clear();
//             vm.$toast.info("Saving Changes");
//             vm.$toast.clear();           
//             var user = {...this.user};
         
//             var token = this.authStore.getToken;
             
//             var data = new FormData()

//             data.append("token", token);
//             data.append("user", JSON.stringify(user))

//             axios.post(vm.globalUrl + "updateUserNormal", data, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
    
//   }
// }).then((result)=>{
              
//                 if(result.data == true){
//                     vm.$toast.clear();
//                     vm.$toast.success("Changes Saved")
//                     vm.$toast.clear();
    
//                     location.reload()
//                 }else{
//                     vm.$toast.clear()
//                     vm.$toast.warning(result.data)
//                 }
//             }).catch((error)=>{
//                     vm.$toast.clear()
//                     vm.$toast.warning(error)
//             })
//         }

      
      
        }
    }
    
    </script> -->


<style src="@vueform/toggle/themes/default.css"></style>