<template>
    <div class="flex flex-col w-full overflow-y-scroll h-[100vh] ml-[40px]" >
        <div class="flex flex-row w-[90vw] m-3 justify-end">
        <input v-model="searchTerm" type="search" placeholder="Search" class="border shadow-sm shadow-black border-solid border-gray-300 p-2 focus:outline-none"/>
        <div @click="filter" class="flex flex-col hover:cursor-pointer shadow-sm shadow-black justify-center items-center ml-1 bg-gray-300 p-3"><font-awesome-icon icon="fa-solid fa-search"/></div>
      </div>
            <div class="overflow-y-scroll h-2/4 w-full relative px-5 mt-3" ><table   id="table" class=" text-start text-sm table-auto overflow-y-scroll w-full h-1/3" >
            <thead class=" shadow-gray-300 ">
                <tr class="bg-[rgb(2,54,61)] text-white">
                    <th scope="col" class="border-b border-b-slate-100  font-bold h-14 text-center mr-10 text-sm bg-[rgb(2,54,61)] sticky top-0 text-white">Name</th>
                    <th class="bg-[rgb(2,54,61)] sticky top-0 text-white"></th>
                    <th class="bg-[rgb(2,54,61)] sticky top-0 text-white"></th>
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="(team, teamCounter) in filteredTeams" :key="teamCounter"  scope="row" class="hover:bg-blue-200" > 
                  <td class="border-2 border-solid text-sm text-center border-slate-300 h-14 mr-10 px-44">{{team.name}}</td>
                  
                  <td class="border-2 border-solid  text-sm text-center border-slate-300   mb-10"> <button @click="this.$router.push('/ticketing/teams/update/' + team._id)" style="cursor:pointer" class=" rounded-md  font-bold text-emerald-500 text-center"><font-awesome-icon icon="fa-solid fa-pen"/></button>
                <button @click="deleteTeam($event, team)" style="cursor:pointer" class="fa-solid fa-trash rounded-md  font-bold text-center text-rose-500 ml-10 mr-5"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
                </tr>
        </tbody>
        </table></div>
        
        
        
        <div class="flex flex-row justify-end items-end mt-4">
            <button @click="this.$router.push('/ticketing/teams/add')" class="bg-blue-500 w-36   text-white font-bold text-md h-12 ml-3 rounded-sm mr-1">Add Department</button>
            <button @click="this.$router.push('/ticketing/systemAdmin/manage')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-12  rounded-sm mr-3 ">Home</button>
        </div>
        </div>
        </template>
        
        
        
        <script >
        import axios from 'axios';
        import { useAuthStore } from '../../stores/authentication';
        import { useGlobalStore } from '../../stores/globalStore';
        import { mapStores } from 'pinia';
        import { inject } from 'vue';
      
       export default{
        data(){
            return{
                teams:[],
                filteredTeams:[],
                searchTerm:null
            }
        },

        

        computed:{
             ...mapStores(useAuthStore)
        },

        
    
        created(){
            var vm = this;
            var user = this.authStore.user;
            var token = this.authStore.user;
    
            var data = new FormData();
            data.append("user", user);
            data.append("token", token);
    
            axios.post(vm.$globalUrl + "getTeams", data, {
      headers: {
        'Authorization': `Bearer ${token}`,
       
      }
    }).then((result)=>{
                vm.teams = result.data
                vm.filteredTeams = result.data
            }).catch((error)=>{
                vm.$toast.warning(error)
            })
    
    
        },
    
        methods:{
            deleteTeam(event, team){
            debugger
                var vm = this;
                var user = this.authStore.user;
                var token = this.authStore.token;
                var team = team
        
                debugger
                var data = new FormData();
                data.append("user", JSON.stringify(user));
                data.append("team", JSON.stringify(team));
                data.append("token", token);
    
                axios.post(vm.$globalUrl + "deleteTeam", data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        
      }
    }).then((result)=>{
                    
                    var teams = vm.teams.filter((team)=>team._id != result.data)
                    vm.teams = teams
                    vm.filteredTeams = vm.teams
                    console.log("result")
    
                }).catch((error)=>{
                    vm.$toast.warning(error)
                })
    
    
               
    
            },
    
    
            filter(){
    
        var vm = this;
        if(vm.searchTerm == "" || vm.searchTerm == null){
            vm.filteredTeams = vm.teams
            return
        }
         var filteredTeams = this.teams.filter((team)=>{
            for(var x in team){
                if(team[x] == vm.searchTerm){
                    return true
                }
            }
         })
    
         vm.filteredTeams = filteredTeams
        
    },
        },
    
    
       }
        
      
        
        
        </script>