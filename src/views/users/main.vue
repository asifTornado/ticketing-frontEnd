<template>
<div class="flex bg-gray-200 flex-col items-center  w-full pl-[2vw] h-screen ">
  <div class="flex  flex-row w-[90vw] m-3 justify-end">
	<input type="search" placeholder="Search" v-model="searchTerm" class="border shadow-md shadow-black border-solid border-gray-300 p-2 focus:outline-none"/>
	<div @click="filter" class="flex flex-col hover:cursor-pointer shadow-md shadow-black justify-center items-center ml-1 bg-gray-300 p-3"><font-awesome-icon icon="fa-solid fa-search"/></div>
  </div>
     <div class=" bg-white shadow-md shadow-black   overflow-y-scroll w-[90vw] ">
            <table  class="bg-white shadow-md shadow-black w-full">
         	<thead class="bg-[rgb(2,54,61)] text-white font-bold  " >
         		<tr >
         			<th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Email  <button>filter</button></th>
         			<th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Department</th>
         			<th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Designation</th>
					 <th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Location</th>
         			<th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">User Type</th>
    				 <th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">User Score</th>
    				 <th  class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Number Of Raters</th>
         			<th  v-if="user.userType == 'admin'" class=" h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0"></th>
         		
         		</tr>
         	</thead>
         	<tbody>
         		<tr v-for="(user2, userCounter) in filteredUsers" :key="userCounter" scope="row" class="hover:bg-blue-200" >
                   <td @click="showUser($event, user2)"  class="border-b  border-b-black  text-sm text-center border-slate-300  pr-16 hover:cursor-pointer ">
         			 {{user2.empName}}  
         		</td>
         		  <td  @click="showUser($event, user22)" class="border-b  border-b-black  text-sm text-center border-slate-300  pr-16 hover:cursor-pointer">
         			{{user2.department}}
         
         		  </td>
         		  <td  @click="showUser($event, user2)" class="border-b  border-b-black  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         		{{user2.designation}}
        
         		  </td>
				   <td  @click="showUser($event, user2)" class="border-b  border-b-black  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
					{{user2.location}}
		   
					  </td>
         		  <td  @click="showUser($event, user2)" class="border-b  border-b-black  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user2.userType}}
         
         		  </td>
    			   <td  @click="showUser($event, user2)" class="border-b  border-b-black  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user2.rating}}
         
         		  </td>
    			   <td  @click="showUser($event, user2)" class="border-b  border-b-black  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user2.raters}}
         
         		  </td>
         		  <td v-if="user.userType == 'admin'" class="border-b  border-b-black p-4 text-sm text-center border-slate-300  pr-16 mb-10"><button @click="router.push('/ticketing/users/update/' + user2._id)" class="h-8 rounded-md text-green-500  font-bold"><font-awesome-icon icon="fa-solid fa-pen" /></button>
         		  <button @click="deleteUser(user2)"  class="h-8 ml-10  rounded-md text-rose-500 font-bold"><font-awesome-icon icon="fa-solid fa-trash"/></button>
         		</td>
         
         		</tr>
         	</tbody>
         </table>
         
     </div>
    
    
   
</div>

</template>



<script setup>
import {storeToRefs} from 'pinia';
import {ref} from "vue"
import {useAuthStore } from '../../stores/authentication';
import {useTicketStore} from '../../stores/ticket';
import {useMainStore} from '../../stores/store';
import {useUserStore} from '../../stores/users';
import {useRouter} from "vue-router";

var router = useRouter();
var userStore = useUserStore()

var {user, users, emailList, nameList, idList,
	showUser, token, update, users, departments, groups, 
	updateUserGroupTags, filterMail, filterId, filterName, 
	filteredUsers, searchTerm} = storeToRefs(useUserStore())

var {loadUsers, showUser, deleteUser, filter} = useUserStore()

var {user} = storeToRefs(useAuthStore())



loadUsers()

</script>

<!-- <script>
import Fuse from 'fuse.js'
import axios from 'axios'
 export default{
    data(){
        return{
        update:false,
		users:[],
		departments:null,
		groups:null,
		groupTags:null,
		updateUserGroupTags:null,
		token:null,
		filterMail:null,
		filterId: null,
		filterName: null,
		filteredUsers:null,
		searchTerm:null,
		fuse:null
		
        }
    },


	computed:{
        emailList(){
			var result = this.users.map((user)=>user.mailAddress)
			return result
		},

		nameList(){
			var result = this.users.map((user)=>user.empName)
			return result
		},

		idList(){
			var result = this.users.map((user)=>user._id)
			return result
		}
	},




    created(){
		this.token = this.authStore.getToken

        

        this.loadUsers();
    },

    methods:{
        loadUsers:function(){
			

			const options = {
        includeScore: true,

          keys: [{name:'empName', weight:0.5},
         {name:'location', weight:0.3},
         {name:'userType', weight:0.2} 
        
        ]
        };


			var vm = this;

		    var token = this.authStore.getToken;
			var data = new FormData();
			data.append("token", token)


			axios.post(vm.globalUrl + 'getUsers', data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then(function(response){
			    vm.users = response.data;
				vm.filteredUsers = response.data;
				vm.mainStore.setUsers(response.data)
				vm.fuse = new Fuse(response.data, options)
			}
				
			).catch(function(error){
				vm.$toast.warning(error)
			});

			



			 
		},

		showUser(event, user){
  
		  var vm = this;
		  this.mainStore.setShowUser(user)
		  this.$router.push('/ticketing/show-user')
		},


		deleteUser:function(user){ 
			var vm = this;
			var token = this.authStore.getToken;
			

			var data = new FormData();
			data.append("token", token);
			data.append("user", JSON.stringify(user));

			axios.post(vm.globalUrl + 'deleteUser', data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  
  }
}).then((response) => {;
	        this.loadUsers();
		}, (error) => {vm.$toast.warning(error)});
		},


		filter(){
			var vm = this;
             var filteredUsers = this.users.filter((user)=>{
				for(var x in user){
					if(user[x] == vm.searchTerm){
						return true
					}
				}
			 })

			 vm.filteredUsers = filteredUsers
			
		},




	
	
	





    }
 }




</script> -->