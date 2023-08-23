<template>
    
    <div class="w-full h-full  flex flex-col  items-center pt-32">



	



<form method="post" @submit.prevent="handleSubmit($event)" style="box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.5)"   class="w-1/3 h-auto flex flex-col items-center  bg-white rounded-b-md drop-shadow-lg">

     <h1 class="text-white font-bold text-4xl mb-5 bg-gradient-to-r bg-[rgb(38,65,86)] p-4 w-full rounded-t-md">Register</h1>
        
        <!-- <select type="email" v-model="mailAddress" class="shadow appearance-none border  rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="email" placeholder="Enter email" name="email">
            <option :value="email"  v-for="(email, emailCounter) in emails" :key="emailCounter" >{{ email }}</option>
            <option value="asif_hacker@gmail.com">Hacker@gmail.com</option>
        </select> -->

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

    methods:{

        
    showPassword(event){
      console.log("called show password")
      if(this.$refs.passwordCheck.checked == true){
        this.$refs.password.type = 'text'

      }else{
        this.$refs.password.type = 'password'
      }
    },
    
       loadEmails(){
          var vm = this;
          this.$toast.open({type:"info", message:"Loading User Emails...", position:"bottom-right", duration:0})
          axios.get(vm.globalUrl + 'api/getUsers').then((results)=>{
            vm.users = results.data;
            console.log("these are the users");
            console.log(results.data)
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
            
            console.log("this is the found user")
            console.log(user)
            if(!user){
                this.$toast.clear()
                this.$toast.warning("This user is not authorized")
                return
            }else{
                var data = new FormData();
                
                data.append("MailAddress", this.mailAddress)
                data.append("Password", this.password)
                data.append("user", JSON.stringify(user));
                
             

            axios.post(vm.globalUrl + 'register', data).then((result)=>{
                console.log('entered post request')
                console.log("this is the result");
                console.log(result.data)
                if(result.data == true){
                    vm.$toast.clear();
                    vm.$toast.open({type:'success', message:result.data.message})
                    vm.$router.push('/login')
                }else{
                    vm.$toast.clear();
                    console.log(result.data)
                    vm.$toast.open({type:'warning', message:result.data.message})
                }
            })
         
            }
            
          

       }
    }
}




</script>