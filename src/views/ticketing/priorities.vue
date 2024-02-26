<template>
    <div v-if="addPriorityCheck == true"  class="h-auto w-auto p-10 border border-solid bg-white border-black" style="position: fixed; top:142px; left:500px;">
     <div class="flex flex-col">


      <div class="flex flex-col justify-center items-center">


        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

    <tbody>
        <tr class="hover:bg-gray-200 hover:text-black hover:cursor-pointer"  >
           
            <th scope="col" class="px-6 py-3 table-header2" style="z-index: 1;">
                Priority
            </th>
            <td   scope="row" class=" table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                <input type="text" name="" id="" placeholder="Priority Name" class="p-3 w-[300px] border border-solid border-black" v-model="newPriority.priority">
            </td>
        </tr>

        <tr class="hover:bg-gray-200 hover:text-black hover:cursor-pointer"   >
            <th scope="col" class="px-6 py-3 table-header2">
                Resolution SLA
            </th>
           
            <td   class=" table-row2 px-6 py-4">
                <input  name="" id="" type="number" placeholder="Response Time" class="p-3 w-[300px] border border-solid border-black" v-model="newPriority.responseTime">
            </td>

        </tr>

        <tr class="hover:bg-gray-200 hover:text-black hover:cursor-pointer"   >
            <th scope="col" class="px-6 py-3 table-header2">
               Response SLA
            </th>
          
            <td   class=" table-row2 px-6 py-4">
                <input  name="" id="" type="number" placeholder="Resolution Time" class="p-3 w-[300px] border border-solid border-black" v-model="newPriority.resolutionTime">
            </td>
           
        </tr>
       
      
     
    </tbody>
</table>
         
      </div>




        <div class="flex flex-row w-full h-full justify-end mt-2">
           <div class="h-auto w-auto p-2 bg-blue-500 text-white font-bold text-lg hover:cursor-pointer" @click="confirm">Confirm</div>
           <div class="h-auto w-auto p-2 bg-gray-300 text-black font-bold text-lg hover:cursor-pointer ml-2" @click="cancel($event)" id="CancelButton">Cancel</div>
        </div>
     </div>
    </div>
    <div class="flex flex-col  bg-gray-200  items-center h-[92vh] overflow-y-scroll w-full p-10" @click="cancel($event)" id="body">
    
        <div class="flex flex-row  text-3xl font-bold underline">Priorities</div>
         
        <div class="flex flex-col w-[40%] max-h-[70vh]  p-[20px]  mb-2  mt-2  items-center">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 table-header2" style="z-index:1dxxd;">
        <tr>
            <th scope="col" class="px-6 py-3 table-header2" style="z-index: 1;">
                Priority
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
                Resolution SLA
            </th>
            <th scope="col" class="px-6 py-3 table-header2">
               Response SLA
            </th>
         
        </tr>
    </thead>
    <tbody>
        <tr class="hover:bg-gray-200 hover:text-black hover:cursor-pointer"   v-for="(priority, priorityCounter) in priorities" :key="priorityCounter">
            <td   scope="row" class=" table-row2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                {{ priority._id }}
            </td>
    
            <td   class=" table-row2 px-6 py-4">
                {{ priority.responseTime }}
            </td>
            <td   class=" table-row2 px-6 py-4">
                {{priority.resolutionTime}}
            </td>
           
        </tr>
       
      
     
    </tbody>
</table>
           
        </div>
    
    
        <div class="flex flex-row w-full justify-center ml-[200px]">
    
    <div class="h-auto w-auto p-2 bg-blue-500 text-white font-bold text-lg hover:cursor-pointer shadow-md shadow-black" @click="addPriority">Add New Priority</div>
    </div>
    </div>
    
    
    </template>
    
    
    
    
    <script>
    
    import axios from 'axios'
    import {useAuthStore} from "../../stores/authentication"
    import { useGlobalStore } from '../../stores/globalStore'
    import { mapStores } from 'pinia'
    
    
    
    
    export default{
        data(){
            return {
                priorities:[],
                addPriorityCheck:false,
                newPriority:{priority:'', responseTime:'', resolutionTime:''}
            }
        },
    
        created(){
             this.getPriorities()
    
        },
    
        computed:{
            ...mapStores(useAuthStore, useGlobalStore)
        },
    
        methods:{
            getPriorities(){
                var vm = this;
                var token = this.authStore.token
            axios.post(this.globalStore.globalUrl + "getPriorities").then((result)=>{
                vm.priorities = result.data
            }).catch((error)=>vm.$toast.warning(error))
            },
    
            confirm(){
               var vm = this;
               var user = this.authStore.user
               var token = this.authStore.token
               var newPriority = vm.newPriority
            debugger
               var data = new FormData();
               data.append('token', token)
               data.append('user', JSON.stringify(user))
               data.append('priority', JSON.stringify(vm.newPriority))
    
               axios.post(this.globalStore.globalUrl + 'insertPriority', data
    ).then((result)=>{
                if(result.data == true){
                    vm.getPriorities()
                    vm.addPriorityCheck = false
                }
               }).catch((error)=>vm.$toast.warning(error))
            },
    
    
            addPriority(){
    
               this.addPriorityCheck = true
            },
    
            deletePriority(priority){
                var vm = this;
                var user = this.authStore.user;
                var token = this.authStore.token;
                
                var data = new FormData();
                data.append("priority", JSON.stringify(priority))
                data.append("token", token)
                data.append("user", JSON.stringify(user))
                debugger
                axios.post(this.globalStore.globalUrl + 'deletePriority', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        
      }
    }).then((result)=>{
                    if(result.data == true){
                        vm.getPriorities()
                    }
                }).catch((error)=>vm.$toast.warning(error))
    
            },
    
            cancel(event){
                var elem = event.target
                if(elem.id == 'CancelButton' || elem.id == 'body'){
                    this.addPriorityCheck = false
                }
                return
            }
    
            
        }
    }
    
    
    
    </script>