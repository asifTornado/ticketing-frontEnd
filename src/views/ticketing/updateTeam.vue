<template>
    <div class=" w-full ml-[30px] flex flex-col px-[100px] pt-[20px]"  id="app">

        <div class="h-20  w-full flex flex-row justify-between p-2 items-center">

            <input type="text" v-model="department" placeholder="Enter Department Name" class="bg-white shadow-md shadow-black  text-2xl p-4 ml-10 w-[500px]  h-12 ">
            

        
    </div>

    <div class="h-auto mt-[20px] w-full flex flex-row justify-center bg-white shadow-md shadow-black items-center p-2 items-center">

<div class="flex flex-col mb-[20px] w-full  p-2 justify-center items-center ">  
    
    <label for="" class="mr-10 text-lg">Select Central Monitors</label>
   <div class="w-1/4 flex flex-col" v-for="(leader, leaderCounter) in monitors" :ley="leaderCounter">
   
<div class="flex flex-row w-full  items-center ">   
    <select  v-model="monitors[leaderCounter]" class="mt-2 border border-solid border-black p-1">
    <option v-for="(monitorList, LeaderListCounter) in monitorsList" :key="leaderListCounter" :value="monitorList">{{monitorList}} </option>
   </select>
   <font-awesome-icon icon="fa-solid fa-plus" size="lg" class="mr-4 ml-4" @click="addMonitor(event, leaderCounter)"/>
   <font-awesome-icon icon="fa-solid fa-minus" size="lg" @click="removeMonitor(event, leaderCounter)"/>
</div>
   </div>
</div>



</div>


    <div id="body" class="h-auto  w-full flex flex-col" v-if="!hasServices">

        <div class="flex  flex-col items-center justify-center w-full mt-10 ml-10 ">
            <div class="flex flex-col w-1/2  mb-[20px]  bg-white shadow-md shadow-black p-[10px]">   
                <label for="" class="mr-10 text-lg">Select Ticketing Managers</label>
              <div class="w-1/4 flex flex-col" v-for="(leader, leaderCounter) in leaders" :ley="leaderCounter">
              
           <div class=" flex flex-row w-full  items-center ">   
               <select  v-model="leaders[leaderCounter]" class="mt-2 border border-solid border-black p-1">
               <option v-for="(leaderList, LeaderListCounter) in leadersList" :key="leaderListCounter" :value="leaderList">{{leaderList}}</option>
              </select>
              <font-awesome-icon icon="fa-solid fa-plus" size="lg" class="mr-4 ml-4" @click="addLeader(event, leaderCounter)"/>
              <font-awesome-icon icon="fa-solid fa-minus" size="lg" @click="removeLeader(event, leaderCounter)"/>
           </div>
              </div>
   </div>
   
   <div class="flex flex-col w-1/2  ml-2   bg-white shadow-md shadow-black p-[10px]">
   <label class="mr-10  text-lg ">Problem Types</label>
   
   <div class="w-full flex flex-col " v-for="(problem, problemCounter) in problemTypes" :ley="problemTypes">
              
       <div class="flex flex-col w-full items-start justify-center">   
          <div class="flex flex-row justify-center items-center"><input type="text" name="" id="" v-model="problemTypes[problemCounter].name" class="p-1 border border-solid border-black mr-3 mt-2">
          <div class=" text-white p-2 w-[120px] mr-2 bg-emerald-500 " @click="addSubCategory(event, problemCounter)">Add Subcategory</div>
          <font-awesome-icon icon="fa-solid fa-plus" size="lg" class="mr-2 justify-center items-center  " @click="addProblemType(event, problemCounter)"/>
          <font-awesome-icon icon="fa-solid fa-minus" size="lg" class="justify-center items-center mr-2" @click="removeProblemType(event, problemCounter)"/></div>
           
       </div>
       <div class="flex flex-row items-center" v-for="(subs, subsCounter) in problem.subs">
           <input class="border border-solid border-black mt-1 ml-5 p-1" v-model="problemTypes[problemCounter].subs[subsCounter]">
   
           <font-awesome-icon icon="fa-solid fa-minus" size="lg" class="justify-center items-center mr-2 ml-2" @click="removeSub(event, problemCounter, subsCounter)"/>
       </div>
          </div>
   </div>
   
   
           
       </div>

    <div class="bg-white shadow-md shadow-black p-[10px] flex flex-col h-auto rounded-md p-[50px] mb-[20px]  mt-10 justify-center items-center bg-gray-100">
        <div v-for="(subs, counter) in subordinates" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">
       
     <div class="flex flex-row w-3/4 mr-10">
        <label for="" class="">Select Subordinasdate</label>
        
        <vss :options="subordinatesList" v-model="subordinates[counter].user"/>
    </div>
    
           
    <div class="flex flex-row justify-center items-center" >
        <label for="" class="mr-2">Select Rank</label>
        <select class="h-12 w-12 border border-solid border-gray-200" v-model="subordinates[counter].rank">
          <option v-for="(x, count) in subordinates.length" :key="count" class="p-2" >
                {{count + 2}}
          </option>
        </select>


        <div>
            <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="ml-10 text-rose-500 hover:cursor-pointer" @click="deleteSubordinate($event, counter)"/>
        </div>
    </div>
      

        </div>       
        
        
        
        
        
        
        
        
        <div class="h-auto w-auto my-10 bg-blue-500 text-2xl font-bold text-white p-5 rounded-md hover:cursor-pointer" @click="addSubordinate">Add Subordinate</div>
    </div>
        


    </div>

  

  <div v-if="hasServices">
<div class="flex flex-row w-full h-full justify-start items-center mt-7">
        <label for="" class="mr-10 text-lg ml-20">Select Department Head</label>
        <div class="w-1/4"> <vss :options="powerList" v-model="servicesHead"  :searchable="true"/></div>
    
</div>
<div class="flex flex-col h-auto rounded-md p-[50px]  mt-10 justify-center items-center bg-gray-100" v-for="(service, serviceCounter) in services" :key="serviceCounter" >
    <div class="h-20 bg-gray-100 w-full flex flex-row justify-between p-2 items-center">

        <input type="text" v-model="services[serviceCounter].serviceName" placeholder="Enter Team Name" class="text-2xl p-4 ml-10 w-[500px]  border border-solid border-gray-600 h-12">
        
        <font-awesome-icon icon="fa-solid fa-trash" class="text-red-500 hover:cursor-pointer" @click="deleteService($event, serviceCounter)" size="3x"/>
</div>
   
   
    <div class="flex flex-row items-center justify-start w-full">
        <label for="" class="mr-10 text-lg">Select Team Leader</label>
       <div class="w-1/3"> <vss :options="leadersList" v-model="services[serviceCounter].serviceLeader" /></div>

    
</div>
    
    
    
   

<div v-for="(subs, counter) in serviceSubordinateList[serviceCounter]" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">        

 <div class="flex flex-row w-3/4 mr-10">
    <label for="" class="">Select Subordinatasde</label>
    <vss :options="subordinatesList" v-model="serviceSubordinateList[serviceCounter][counter].user"/>
</div>

       
<div class="flex flex-row justify-center items-center" >
    <label for="" class="mr-2">Select Rank</label>
    <select class="h-12 w-12 border border-solid border-gray-200" v-model="serviceSubordinateList[serviceCounter][counter].rank">
      <option v-for="(x, count) in serviceSubordinateList[serviceCounter].length" class="p-2" :key="count">
            {{count + 2}}
      </option>
    </select>


    <div>
        <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="ml-10 text-rose-500 hover:cursor-pointer" @click="deleteServiceSubordinate($event, counter, serviceCounter)"/>
    </div>
</div>
  </div>

        
    
    
    
    
    
    
    
    <div class="h-auto w-auto mt-10 bg-blue-500 text-md font-bold text-white p-3  hover:cursor-pointer" @click="addServiceSubordinate($event, serviceCounter)" >Add Subordinate</div>
    
</div>

<div class="flex flex-row justify-center items-center">
    <div class="h-auto  w-auto my-10 bg-emerald-500 text-2xl font-bold text-white p-5 " @click="addService" >Add Team</div>
</div>
  </div>

<div class="flex flex-row bottom-[20px] items-center w-full justify-end mr-10 hover:cursor-pointer ">
    <div @click="updateDepartment" class="bg-white shadow-md shadow-black p-[10px]  h-auto w-auto  mr-10 mb-10   text-text-white font-bold text-lg  hover:bg-blue-600 hover:text-white">Update Department</div>
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
        return{
            department:null,
            hasServices:false,
            usersList:[],
            users:[],
            subordinates:[],
            services:[],
            serviceSubordinateList:[],
            leader:null,
            team:null,
            head:null,
            servicesHead:null,
            leadersList:[],
            subordinatesList:[],
            powerList:[],
            leaders:[],
            problemTypes:[],
            monitors:['',],
            monitorsList:[],
        }
    },

    created(){
        this.getUsers()
        this.getTeam()
    },


    computed:{
        ...mapStores(useAuthStore, useGlobalStore)
    },

    methods:{ 

        addLeader(event, counter){
            this.leaders.splice(counter + 1, 0, "")
        },


        removeLeader(event, counter){
            if(counter < 1){
                return
            }else{
                this.leaders.splice(counter, 1)
            }
        },

        addMonitor(event, counter){
            this.monitors.splice(counter + 1, 0, "")
        },


        removeMonitor(event, counter){
            if(counter < 1){
                return
            }else{
                this.monitors.splice(counter, 1)
            }
        },

        convertToInt(value){
           var newValue = parseInt(value, 10)
           return newValue
        },

        updateDepartment(){
            var vm = this;
            var newDepartment;
            if(vm.hasServices){

            
                
             vm.servicesHead = vm.users.filter((user)=>user.mailAddress == vm.servicesHead)[0]

                vm.services = vm.services.map((service, counter)=>{
                    service.subordinates = vm.serviceSubordinateList[counter];
                    return service
                })

                for(var x = 0; x < vm.services.length; x++){
             
                    var leader = vm.users.filter((user)=>user.mailAddress == vm.services[x].serviceLeader)[0]
                     
                     vm.services[x].serviceLeader = leader;

                    for(var y = 0; y < vm.services[x].subordinates.length; y++){
                            var user = vm.users.filter((user)=>user.mailAddress == vm.services[x].subordinates[y].user)[0]
                            vm.services[x].subordinates[y].user = user
                            vm.services[x].subordinates[y].rank = parseInt(vm.services[x].subordinates[y].rank, 10)
                    }
                }


                                
           

                newDepartment = {name:vm.department, services:vm.services, hasServices:vm.hasServices, head:vm.servicesHead}
            }else{
               

              


                var fieldCheck = true

                 for(var x of vm.subordinates){
                     if(x.user == null || x.user == undefined){
                         vm.$toast.warning("Please select subordinates for all subordinates fields first")
                         fieldCheck = false
                     }
                 }
                 
                 if(fieldCheck == false){
                     return
                 }

                vm.subordinates = vm.subordinates.map((sub)=>{
                    
                    var user = vm.users.filter((user)=>user.mailAddress == sub.user)
                    return {user:user[0], rank:parseInt(sub.rank, 10)}
                })
                 
           
                var leaders = vm.users.filter((user)=> vm.leaders.includes(user.mailAddress))
               
                vm.leaders = leaders;


                vm.monitors = vm.monitors.map((monitor)=>{
                    var monitor = vm.users.filter((user)=>user.mailAddress == monitor)[0]
                    return monitor
                })
         
                debugger
                    
                newDepartment = {name:vm.department, subordinates:vm.subordinates, hasServices:vm.hasServices, leaders:vm.leaders, problemTypes:vm.problemTypes, monitors:vm.monitors }
            }
            
  
            newDepartment._id = vm.team._id;
          

      
            
            var token = this.authStore.token;
            var data = new FormData();
            data.append("token", token);
            data.append("team", JSON.stringify(newDepartment));


            axios.post(this.globalStore.globalUrl + "editTeam", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  
  }
}).then((result)=>{
                if(result.data == true){
                    location.reload()
                }
            }).catch((error)=>{
                vm.$toast.warning(error)
            })



        },


        addSubordinate(){
            var vm = this;
            var newSubordinate = {user:null, rank:vm.subordinates.length + 2}
            vm.subordinates.push(newSubordinate)
        },

        deleteSubordinate(event, counter){
            this.subordinates.splice(counter, 1);
        },

        addService(){
            var vm = this;
            var newService = {serviceName:null, subordinates:[], serviceLeader:null}
            vm.serviceSubordinateList.push([]);
            vm.services.push(newService)
        },

        addServiceSubordinate(event, counter){
         
            var vm = this;
           
            var newSubordinate = {user:null, rank:vm.services[counter].subordinates.length + 2}
            vm.serviceSubordinateList[counter].push(newSubordinate)
          
        },

        deleteServiceSubordinate(event, counter, serviceCounter){
          var vm = this;

          vm.serviceSubordinateList[serviceCounter].splice(counter, 1);
          
        },

        deleteService(event, counter){
            var vm = this;
            vm.services.splice(counter, 1)
        },


        getUsers(){
            debugger
            var vm = this;
            var token = this.authStore.token
            var data = new FormData();
            data.append("token", token)
            axios.post(this.globalStore.globalUrl + "getUsers", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  
  }
}).then((result)=>{
               debugger
                vm.users = result.data
                vm.usersList = vm.users.map((user)=>user.mailAddress)
                vm.leadersList = vm.users.filter((user)=>user.userType == "leader").map((user)=>user.mailAddress)
                vm.subordinatesList = vm.users.filter((user)=>user.userType == "support").map((user)=>user.mailAddress)
                vm.powerList = vm.users.filter((user)=>user.userType == "departmentPower").map((user)=>user.mailAddress)         
                vm.monitorsList = vm.users.filter((user)=> user.userType == "Ticket Manager (Department)").map((user)=>user.mailAddress)
            }).catch((error)=>{
                vm.$toast.warning(error)
            })

        },


            addSubCategory(event, counter){
        
         this.problemTypes[counter].subs.push("")

        },


        removeSub(event, problemCounter, subCounter){

this.problemTypes[problemCounter].subs.splice(subCounter, 1)

},


addProblemType(event, counter){
this.problemTypes.splice(counter + 1, 0, {name:'', subs:[]})
},


removeProblemType(event, counter){
if(counter < 1){
    return
}else{
    this.problemTypes.splice(counter, 1)
}
},


        getTeam(){
            var vm = this;
            var user = this.authStore.user;
            var token = this.authStore.token;
            var id = this.$route.params.id

            var data = new FormData();
            data.append("user", JSON.stringify(user));
            data.append("token", token);
            data.append("id", id)

            axios.post(this.globalStore.globalUrl + "getTeam", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    
  }
}).then((result)=>{
                debugger
                vm.department = result.data.name;
                vm.team = result.data;
                if(result.data.hasServices){
                    var services = result.data.services;
                  
                    vm.services = services.map((serv)=>{
                        var serviceLeader = serv.serviceLeader.mailAddress;
                        serv.serviceLeader = serviceLeader
                        return serv
                    });

                    vm.serviceSubordinateList = services.map((serv)=>{
                        
                        var subordinates = serv.subordinates.map((sub)=>{
                                    var user = sub.user;
                                    sub.user = user.mailAddress;
                                    return sub
                        });
                        
                        return subordinates;
                    })

                    vm.hasServices = true
                    vm.servicesHead = result.data.head.mailAddress
                }else{
                    vm.subordinates = result.data.subordinates.map((sub)=>{
                        var user = sub.user;
                        sub.user = user.mailAddress
                        return sub
                    });
                    vm.leaders = result.data.leaders.map((leader) => leader.mailAddress)
              
                    vm.problemTypes = result.data.problemTypes
                    vm.monitors = result.data.monitors.map((monitor)=>monitor.mailAddress)
                }

            })
        }
    }
}



</script>