<template>
<div v-if="addLocationCheck == true"  class="h-auto w-auto p-10 border border-solid bg-white border-black" style="position: fixed; top:192px; left:500px;">
 <div class="flex flex-col">
    <input type="text" name="" id="" placeholder="Location Name" class="p-3 w-[300px] border border-solid border-black" v-model="newLocation">
    <div class="flex flex-row w-full h-full justify-end mt-2">
       <div class="h-auto w-auto p-2 bg-blue-500 text-white font-bold text-lg hover:cursor-pointer" @click="confirm">Confirm</div>
       <div class="h-auto w-auto p-2 bg-gray-300 text-black font-bold text-lg hover:cursor-pointer ml-2" @click="cancel($event)" id="CancelButton">Cancel</div>
    </div>
 </div>
</div>
<div class="flex flex-col  bg-gray-200  items-center h-[92vh] overflow-y-scroll w-full p-10" @click="cancel($event)" id="body">

    <div class="flex flex-row  text-3xl font-bold underline">Locations</div>
     
    <div class="flex flex-col w-[40%] max-h-[70vh]  p-[20px]  mb-2  mt-2  items-center">
        <div class="flex flex-row  w-full h-auto mb-2 p-3  justify-between border border-solid border-blue-100 bg-white shadow-md shadow-black" v-for="(location, locationCounter) in locations">
         <div class="flex flex-row"> <span class="text-lg font-bold mr-10  ">Location {{locationCounter + 1}}:</span> <span class="">{{ location.name }}</span> </div>
         <font-awesome-icon icon="fa-solid fa-trash" class="text-red-600 hover:cursor-pointer" @click="deleteLocation(location._id)"/>
    </div>
    </div>


    <div class="flex flex-row w-full justify-center ml-[200px]">

<div class="h-auto w-auto p-2 bg-blue-500 text-white font-bold text-lg hover:cursor-pointer shadow-md shadow-black" @click="addLocation">Add New Location</div>
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
            locations:[],
            addLocationCheck:false,
            newLocation:''
        }
    },

    created(){
         this.getLocations()

    },

    computed:{
        ...mapStores(useAuthStore, useGlobalStore)
    },

    methods:{
        getLocations(){
            var vm = this;
            var token = this.authStore.token
        axios.get(this.globalStore.globalUrl + "getLocations", {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result)=>{
            vm.locations = result.data
        }).catch((error)=>vm.$toast.warning(error))
        },

        confirm(){
           var vm = this;
           var user = this.authStore.user
           var token = this.authStore.token

           var data = new FormData();
           data.append('token', token)
           data.append('user', JSON.stringify(user))
           data.append('name', vm.newLocation)

           axios.post(this.globalStore.globalUrl + 'addLocation', data, {
  headers: {
    'Authorization': `Bearer ${token}`,

  }
}).then((result)=>{
            if(result.data == true){
                vm.getLocations()
                vm.addLocationCheck = false
            }
           }).catch((error)=>vm.$toast.warning(error))
        },


        addLocation(){

           this.addLocationCheck = true
        },

        deleteLocation(id){
            var vm = this;
            var user = this.authStore.user;
            var token = this.authStore.token;
            
            var data = new FormData();
            data.append("id", id)
            data.append("token", token)
            data.append("user", JSON.stringify(user))
            debugger
            axios.post(this.globalStore.globalUrl + 'deleteLocation', data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    
  }
}).then((result)=>{
                if(result.data == true){
                    vm.getLocations()
                }
            }).catch((error)=>vm.$toast.warning(error))

        },

        cancel(event){
            var elem = event.target
            if(elem.id == 'CancelButton' || elem.id == 'body'){
                this.addLocationCheck = false
            }
            return
        }

        
    }
}



</script>