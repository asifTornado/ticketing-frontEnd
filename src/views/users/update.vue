<template>
	
    <div  class=" flex justify-center items-center w-full">
	<div class=" hover:shadow-blue-600 w-1/2 h-auto  flex flex-col justify-center items-center border-2 border-solid border-black ">

		<div class="flex flex-row justify-center items-start w-full mb-10 bg-blue-500 text-white p-3 "><span class="text-4xl font-bold ">Update User</span></div>
		
				<form @submit.prevent="updateUser" class="px-4">
			   
				
		<label  class="mb-20 font-bold">Email Address</label>
				<input v-model="selectedUser.mailAddress" required class=" w-full h-11 mb-4 border border-solid border-gray-200">
			
			


		
		  <label class="mb-20 font-bold mt-10" > User Type</label>
				  <select name="userType" v-model="selectedUser.userType" required class="mb-4 h-11 w-full  border border-solid border-gray-200" >
					
				
					<option  value="Ticket Manager (Department)">Ticket Manager (Department)</option>
					<option  value="leader">Ticket Manager</option>
					<option  value="support">Support</option>
					<option  value="normal">Normal</option>
					<option  value="power">Power User</option>
					<option  value="departmentPower">Department Power User</option>			 
				  </select>


				  	
		  <label class="mb-20 font-bold mt-10" > User Location</label>
		  <select name="userType" v-model="selectedUser.location" required class="mb-4 h-11 w-full  border border-solid border-gray-200" >
			
			<option  :value="location.name" v-for="(location, locationCounter) in locations" :key="locationCounter">{{location.name}}</option>
				 
		  </select>
		
				  <br class="border border-solid border-black">
		
			   <button type="submit" class="w-full mt-8 h-11 bg-blue-500 border-2 border-solid border-black rounded-md text-2xl text-white font-bold mb-2">Update</button> 
		
		
			   <button @click="this.$router.back()" class="w-full border-2 border-solid border-black h-11 bg-gray-300 rounded-md text-2xl text-gray-500 font-bold mb-10">Return</button>
		
			  </form>
			</div>
		
    </div>






</template>


<script setup>
import {ref} from "vue"
import { useAuthStore } from "../../stores/authentication";
import { useUserStore } from "../../stores/users";
import { useTicketStore } from "../../stores/ticket";
import { storeToRefs } from "pinia";
import {useRoute} from "vue-router"
import { useGlobalStore } from "../../stores/globalStore";
import axios from "axios"


var globalStore = useGlobalStore()
var {getLocations} = useTicketStore();

var route = useRoute()
var {selectedUser, groups, groupTags, updateUserCheck, users} = storeToRefs(useUserStore())
var {locations} = storeToRefs(useTicketStore())
var {token} = storeToRefs(useAuthStore())

var {updateUser} = useUserStore()

function initiate(){
      var id = route.params.id;
   
	  selectedUser.value = users.value.filter((user)=>{
		return user._id == id
	  })[0];

	  updateUserCheck.value = true;

	 axios.get(globalStore.globalUrl + "getLocations", {
  headers: {
    'Authorization': `Bearer ${token.value}`,
 
  }
}).then((result)=>{
		locations.value = result.data
	 }).catch((error)=>console.log(error))
}




	initiate()





</script>

<!-- <script>

import axios from 'axios'


 export default{
    data(){
        return{
             user:null,

			 groups:null,
			 token:null,
			 groupTags:null,
			 updateUserCheck:false,
			 locations:[]
        }
    },



    created(){

		var vm = this;
	
     this.token = this.authStore.getToken;

      var users = this.mainStore.getUsers;

      var id = this.$route.params.id;
   
	  this.user = users.filter((user)=>{
		return user._id == id
	  })[0];

	
     



	  this.updateUserCheck = true;




	 axios.get(vm.globalUrl + "getLocations", {
  headers: {
    'Authorization': `Bearer ${vm.token}`,
 
  }
}).then((result)=>{
		vm.locations = result.data
	 }).catch((error)=>vm.$toast.warning(error))

    },



    methods:{
        
	

		updateUser:function(){
			var vm = this;
			
		    

			var data =  new FormData();
			
			data.append("token", this.token);
			data.append("user", JSON.stringify(this.user));
		
			axios.post(vm.globalUrl + 'updateUserNormal', data, {
  headers: {
    'Authorization': `Bearer ${vm.token}`,
   
  }
}).then((response)=>{
			
				this.$router.push('/ticketing/users')
			}, (error)=>{
				vm.$toast.warning(error)
			});
		},
	

	
	

	



 }

} -->




<!-- 
</script> -->