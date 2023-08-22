<template>
<div class="flex flex-col w-full h-[80vh]">
  <div class="flex flex-row w-[90vw] m-3 justify-end">
	<input type="search" placeholder="Search" v-model="searchTerm" class="border shadow-sm shadow-black border-solid border-gray-300 p-2 focus:outline-none"/>
	<div @click="filter" class="flex flex-col hover:cursor-pointer shadow-sm shadow-black justify-center items-center ml-1 bg-gray-300 p-3"><font-awesome-icon icon="fa-solid fa-search"/></div>
  </div>
     <div class="w-full h-full overflow-y-scroll  px-5 flex flex-col ">
            <table  >
         	<thead class="bg-[rgb(2,54,61)] text-white font-bold  " >
         		<tr >
         			<th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Email  <button>filter</button></th>
         			<th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Department</th>
         			<th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Designation</th>
         			<th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">User Type</th>
    				 <th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">User Score</th>
    				 <th  class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0">Number Of Raters</th>
         			<th  v-if="this.authStore.getUser.userType == 'admin'" class="border border-slate-300 h-14 bg-gradient-to-b bg-[rgb(2,54,61)] text-center pr-16 text-sm sticky top-0"></th>
         		
         		</tr>
         	</thead>
         	<tbody>
         		<tr v-for="(user, userCounter) in filteredUsers" :key="userCounter" scope="row" class="hover:bg-blue-200" >
                   <td @click="showUser($event, user)"  class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 hover:cursor-pointer ">
         			 {{user.empName}}  
         		</td>
         		  <td  @click="showUser($event, user)" class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 hover:cursor-pointer">
         			{{user.department}}
         
         		  </td>
         		  <td  @click="showUser($event, user)" class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         		{{user.designation}}
        
         		  </td>
         		  <td  @click="showUser($event, user)" class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user.userType}}
         
         		  </td>
    			   <td  @click="showUser($event, user)" class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user.rating}}
         
         		  </td>
    			   <td  @click="showUser($event, user)" class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 hover:cursor-pointer">
         			{{user.raters}}
         
         		  </td>
         		  <td v-if="this.authStore.getUser.userType == 'admin'" class="border-2 border-solid p-4 text-sm text-center border-slate-300  pr-16 mb-10"><button @click="this.$router.push('/ticketing/users/update/' + user._id)" class="h-8 rounded-md text-green-500  font-bold"><font-awesome-icon icon="fa-solid fa-pen" /></button>
         		  <button @click="deleteUser(user)"  class="h-8 ml-10  rounded-md text-rose-500 font-bold"><font-awesome-icon icon="fa-solid fa-trash"/></button>
         		</td>
         
         		</tr>
         	</tbody>
         </table>
         
     </div>
    
    
    <div class="flex flex-row justify-end items-end mt-4">
    	
      
    </div>
</div>

</template>


<script>

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
		searchTerm:null
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
			
			var vm = this;

		    var token = this.authStore.getToken;
			var data = new FormData();
			data.append("token", token)


			axios.post(vm.globalUrl + 'getUsers', data).then(function(response){
			    vm.users = response.data;
				vm.filteredUsers = response.data;
				vm.mainStore.setUsers(response.data)
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});

			



			 
		},

		showUser(event, user){
          console.log("show User called")
          console.log(user)
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

			axios.post(vm.globalUrl + 'deleteUser', data).then((response) => {console.log(response);
	        this.loadUsers();
		}, (error) => {console.log(error);});
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




</script>