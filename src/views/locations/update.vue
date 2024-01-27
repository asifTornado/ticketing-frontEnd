<template>
    <div  class=" flex justify-center items-center w-full">
	<div class="shadow-2xl hover:shadow-blue-600 w-1/2 h-auto  flex flex-col justify-center items-center bg-white ">

		<div class="flex flex-row justify-center items-start w-full mb-10 bg-blue-500 text-white p-3 "><span class="text-4xl font-bold ">Update User</span></div>
		
				<form @submit.prevent="updateUser" class="px-4">
			   
				
		<label  class="mb-20 font-bold">Email Address</label>
				<input v-model="user.mailAddress" required class=" w-full h-11 mb-4 border border-solid border-gray-200">
			
			


		
		  <label class="mb-20 font-bold mt-10" > User Type</label>
				  <select name="userType" v-model="user.userType" required class="mb-4 h-11 w-full  border border-solid border-gray-200" >
					
					<option  value="leader">Team Leader</option>
					<option  value="support">Support</option>
					<option  value="normal">Normal</option>
					<option  value="power">Power User</option>
					<option  value="departmentPower">Department Power User</option>			 
				  </select>
		
				  <br class="border border-solid border-black">
		
			   <button type="submit" class="w-full mt-8 h-11 bg-blue-500 rounded-md text-2xl text-white font-bold mb-2">Update</button> 
		
		
			   <button @click="this.$router.back()" class="w-full h-11 bg-gray-300 rounded-md text-2xl text-gray-500 font-bold mb-10">Return</button>
		
			  </form>
			</div>
		
    </div>






</template>


<script>

import axios from 'axios'
import Tagify from '@yaireo/tagify'
import '../../../node_modules/@yaireo/tagify/dist/tagify.css'

 export default{
    data(){
        return{
             user:null,

			 groups:null,
			 token:null,
			 groupTags:null,
			 updateUserCheck:false
        }
    },



    created(){
	
     this.token = this.authStore.getToken;

      var users = this.mainStore.getUsers;

      var id = this.$route.params.id;
   
	  this.user = users.filter((user)=>{
		return user._id == id
	  })[0];


     



	  this.updateUserCheck = true;

	  this.token = this.authStore.getToken



    },



    methods:{
        
	

		updateUser:function(){
			var vm = this;
			
		    

			var data =  new FormData();
			
			data.append("token", this.token);
			data.append("user", JSON.stringify(this.user));
		
			axios.post(vm.globalUrl + 'updateUserNormal', data, {
  headers: {
    'Authorization': `Bearer ${this.token}`,
 
  }
}).then((response)=>{
		
				this.$router.push('/ticketing/users')
			}, (error)=>{
				vm.$toast.warning(error);
			});
		},
	

	
	

	



 }

}





</script>