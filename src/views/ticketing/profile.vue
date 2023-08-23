<template >
    

    <div class="w-full h-[92vh] px-10 py-10 overflow-y-scroll">
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
                    <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Location:</div>
                   
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
                   
                     <div class="w-8/12 rounded-md h-9  p-1"> {{ user.userType }}</div>
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

        
        <div class="flex flex-col w-1/2 h-full justify-start items-center mt-20">
            <label class="[font-size:30px]">{{availability}}</label>
            <Toggle v-model="user.available" @change="toggleSave"/>
        </div>
</div>
    
    </div>
    
    </template>
    
    
    <script>
    import axios from 'axios';
    import Toggle from '@vueform/toggle';
    
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
            var user = this.authStore.getUser;
            this.user = user
            var vm = this;
            axios.get(vm.globalUrl + 'getLocations').then((result)=>{
                vm.locations = result.data
            }).catch((error)=>vm.$toast.warning(error))
        
        },
    
    
        methods:{
          
    
            
           


            togglePassword(){
                console.log("loaded toggle password")
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
        
                console.log("toggle save fired")
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
                this.$router.push("/systemAdmin");
                break;
              case "normal":
                 this.$router.push("/user");
                 break;
              case "power":
                 this.$router.push("/power");
                 break;
              case "leader":
                 this.$router.push("leader");
                 break;
            
            }
        },


        makeChange(){
            var vm = this;
            vm.$toast.clear();
            vm.$toast.info("Saving Changes");
            vm.$toast.clear();           
            var user = {...this.user};
         
            var token = this.authStore.getToken;
             
            var data = new FormData()
          
            console.log("calling make change")
            console.log(user)
            data.append("token", token);
            data.append("user", JSON.stringify(user))

            axios.post(vm.globalUrl + "updateUserNormal", data).then((result)=>{
              
                if(result.data == true){
                    vm.$toast.clear();
                    vm.$toast.success("Changes Saved")
                    vm.$toast.clear();
                    // if(user.userType == "admin"){
                    //     vm.$router.push("/systemAdmin")
                    // }else if(user.userType == "normal") {
                    //     vm.$router.push("/user")
                    // }else if(user.userType == "support") {
                    //     vm.$router.push("/support")
                    // }else if(user.userType == "leader") {
                    //     vm.$router.push("/leader")
                    // }
                    location.reload()
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                    vm.$toast.clear()
                    vm.$toast.warning(error)
            })
        }

      
      
        }
    }
    
    </script>


<style src="@vueform/toggle/themes/default.css"></style>