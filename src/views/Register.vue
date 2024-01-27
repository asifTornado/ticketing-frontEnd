<template>
    
    <div class="w-full h-full  flex flex-col  items-center pt-32">



	



<form method="post" @submit.prevent="handleSubmit($event)" style="box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.5)"   class="w-1/3 h-auto flex flex-col items-center  bg-white rounded-b-md drop-shadow-lg">

     <h1 class="text-white font-bold text-4xl mb-5 bg-gradient-to-r bg-[rgb(38,65,86)] p-4 w-full rounded-t-md">Register</h1>
        


        <div class="w-3/4 mb-3 rounded-sm shadow" ><vss searchable="true" v-model="mailAddress" :options="emails" placeholder="Select Email"></vss>
</div>        
        <input type="password" v-model="password" class="w-3/4 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 h-12" id="password" placeholder="Password" name="password" ref="password">
        <div class="flex flex-row mb-5 mt-3 justify-start w-3/4" >
    <input type="checkbox" class="mr-1 w-8" @change="showPassword($event)" ref="passwordCheck"/>
    <label>Show Password</label>
   </div>
    <button type="submit" class="bg-[rgb(38,65,86)] h-12 text-white font-bold rounded-sm w-3/4">Submit</button>

    <div @click="this.$router.push('/login')" class="text-[rgb(38,65,86)] underline flex flex-row justify-center mt-10 hover:cursor-pointer mb-5">Login</div>
</form>

</div>






</template>


<script>
import axios from 'axios'
import { useAuthStore } from '../stores/authentication'
import { useGlobalStore } from '../stores/globalStore'
import { mapStores } from 'pinia'

export default{
    data(){
        return {
            emails:[],
            mailAddress:null,
            password:null,
            users:null

        }
    },

    created(){
       this.loadEmails()
    },

    computed:{
        ...mapStores(useAuthStore, useGlobalStore)
    },

    methods:{

        
    showPassword(event){

      if(this.$refs.passwordCheck.checked == true){
        this.$refs.password.type = 'text'

      }else{
        this.$refs.password.type = 'password'
      }
    },
    
       loadEmails(){
          var vm = this;
          this.$toast.open({type:"info", message:"Loading User Emails...", position:"bottom-right", duration:0})
          axios.get(this.globalStore.globalUrl + 'api/getUsers').then((results)=>{
            vm.users = results.data;
        
            vm.emails = results.data.map((result)=>{
                
                if(result.mailAddress != ""){
                    return result.mailAddress
                }
            
            })
            vm.$toast.clear()
            vm.$toast.open({type:"success", message:"User Emails Loaded", position:"bottom-right", duration:500})
          })
       },

       handleSubmit($event){
           var vm = this;
          
            this.$toast.open({message:"Registering...", duration:0, type:'info'})

            var user = vm.users.filter((user)=>user.mailAddress == this.mailAddress)[0]
            
      
            if(!user){
                this.$toast.clear()
                this.$toast.warning("This user is not authorized")
                return
            }else{
                var data = new FormData();
                
                data.append("MailAddress", this.mailAddress)
                data.append("Password", this.password)
                data.append("user", JSON.stringify(user));
                
             

            axios.post(this.globalStore.globalUrl + 'register', data).then((result)=>{
     
                if(result.data == true){
                    vm.$toast.clear();
                    vm.$toast.open({type:'success', message:"Registered Successfully"})
                    setTimeout(() => {
                        vm.$toast.clear()
                        vm.$router.push('/login')
}, 1000);
                    
                }else{
                    vm.$toast.clear();
           
                    vm.$toast.open({type:'warning', message:result.data.message})
                }
            })
         
            }
            
          

       }
    }
}




</script>