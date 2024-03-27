<template> 
    <div class=" w-full h-screen flex flex-col px-[100px] pt-[20px]"  id="app">

        <div class="h-20 w-full flex flex-row justify-between p-2 items-center">

            <input type="text" v-model="department" placeholder="Enter Service Name" class="bg-white shadow-md shadow-black text-2xl p-4 ml-10 w-[500px] rounded-md  h-12">
            
          
        
    </div>

    <div class="h-auto bg-white shadow-md shadow-black mt-[20px] w-full flex flex-row justify-center items-center p-2 items-center">

        <div class="flex flex-col mb-[20px] w-full  p-2 justify-center items-center">   <label for="" class="mr-10 text-lg">Select Central Monitors</label>
           <div class="w-1/4 flex flex-col" v-for="(leader, leaderCounter) in monitors" :ley="leaderCounter">
           
        <div class="flex flex-row w-full  items-center ">   
            <select  v-model="monitors[leaderCounter]" class="mt-2 border border-solid border-black p-1">
            <option v-for="(monitorList, LeaderListCounter) in monitorsList" :key="leaderListCounter" :value="monitorList">{{monitorList}}</option>
           </select>
           <font-awesome-icon icon="fa-solid fa-plus" size="lg" class="mr-4 ml-4" @click="addMonitor(event, leaderCounter)"/>
           <font-awesome-icon icon="fa-solid fa-minus" size="lg" @click="removeMonitor(event, leaderCounter)"/>
        </div>
           </div>
</div>



</div>


    <div id="body" class=" w-full flex flex-col"  v-if="!hasServices">

        <div class="  p-[20px] flex flex-col items-center justify-center w-full mt-10 ">
         <div class="bg-white shadow-md shadow-black flex flex-col mb-[20px] w-1/2  p-[10px]">   <label for="" class="mr-10 text-lg">Select Ticketing Managers</label>
           <div class="w-1/4 flex flex-col " v-for="(leader, leaderCounter) in leaders" :ley="leaderCounter">
           
        <div class=" flex flex-row w-full  items-center ">   
            <select  v-model="leaders[leaderCounter]" class="mt-2 border border-solid border-black p-1">
            <option v-for="(leader, LeaderListCounter) in leadersList" :key="leaderListCounter" :value="leader">{{leader}}</option>
           </select>
           <font-awesome-icon icon="fa-solid fa-plus" size="lg" class="mr-4 ml-4" @click="addLeader(event, leaderCounter)"/>
           <font-awesome-icon icon="fa-solid fa-minus" size="lg" @click="removeLeader(event, leaderCounter)"/>
        </div>
           </div>
</div>

<div class="flex bg-white shadow-md shadow-black flex-col w-1/2 ml-2   p-[10px]">
<label class="mr-10  text-lg">Create Problem Types</label>

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

    <div class="bg-white shadow-md shadow-black  flex flex-col h-auto rounded-md p-[50px]  mt-10 justify-center w-full items-center bg-gray-100">
        <div v-for="(subs, counter) in subordinates" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">
       
     <div class="flex flex-row w-3/4 mr-10">
        <label for="" class="">Select Subordinate</label>
        <vss :options="subordinatesList" :searchable="true" v-model="subordinates[counter]"/>
    </div>
    
           
    <div class="flex flex-row justify-center items-center" >
        


        <div>
            <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="hover:cursor-pointer ml-10 text-rose-500" @click="deleteSubordinate($event, counter)"/>
        </div>
    </div>
      

        </div>       
        
        
        
        
        
        
        
        
        <div class="hover:cursor-pointer h-auto w-auto my-10 bg-blue-500 text-lg font-bold text-white p-5 rounded-md" @click="addSubordinate">Add Subordinate</div>
        
    </div>


    <div class="flex flex-col  mb-[30px] rounded-md bg-white shadow-md shadow-black p-[50px]  mt-10 justify-center w-full items-center bg-gray-100">
        <div v-for="(detail, counter) in details" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">
       
  
    
           
    <div class="flex flex-row justify-center items-center w-full" >
        <label for="" class="mr-2">Detail {{ counter + 1 }} Name:</label>
        <input class="h-12 w-3/4 border border-solid border-gray-200" v-model="details[counter].label"/>
      


        <div>
            <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="ml-10 text-rose-500 hover:cursor-pointer" @click="deleteDetail($event, counter)"/>
        </div>
    </div>
      

        </div>       
        
        
        
        
        
        
        
        
        <div class="h-auto w-auto my-10 bg-amber-500 text-lg font-bold text-white p-5 rounded-md hover:cursor-pointer" @click="addDetail">Add Extra Detail</div>

    </div>
        
    <div class="flex flex-row items-center w-full justify-end mr-10">
    <div @click="insertDepartment" class="bg-white shadow-md shadow-black h-auto w-auto p-6 mr-10 mb-10 rounded-md  text-black  right-[10px] hover:bg-blue-600 hover:text-white font-bold text-lg hover:cursor-pointer">Create Department</div>
</div>


    </div>

    

  <div v-if="hasServices" class="h-full">
  
  <div class="flex flex-row ml-10 mt-4">
        <label for="" class="mr-10 text-lg">Select Department Head</label>
                 <div class="w-1/3"> <vss :options="powerList" :searchable="true" v-model="head"  /></div>
  </div>
<div class="flex flex-col h-auto rounded-md p-[50px]  mt-4 justify-center items-center bg-gray-100 w-screen" v-for="(service, serviceCounter) in services" :key="serviceCounter" >
    <div class="h-20 bg-gray-100 w-full flex flex-row justify-between p-2 items-center">

        <input type="text" v-model="services[serviceCounter].serviceName" placeholder="Enter Service Name" class="text-2xl p-4 ml-10 w-[500px] rounded-md border border-solid border-gray-600 h-12">
        
        <font-awesome-icon icon="fa-solid fa-trash" class="hover:cursor-pointer text-red-500 " @click="deleteService($event, serviceCounter)" size="3x"/>
</div>
   
   
    <div class="flex flex-row items-center justify-start w-full">
        <label for="" class="mr-10 text-lg">Select Team Leader</label>
       <div class="w-1/3"> <vss :options="leadersList" :searchable="true" v-model="services[serviceCounter].serviceLeader" /></div>

    
</div>
    
    
    
   
<div class="flex flex-col h-full w-full justify-center items-center mt-10">
<div v-for="(subs, counter) in serviceSubordinateList[serviceCounter]" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">        

 <div class="flex flex-row w-3/4 mr-10">
    <label for="" class="">Select Subordinate</label>
    <vss :options="subordinatesList" :searchable="true" v-model="serviceSubordinateList[serviceCounter][counter].user"/>
</div>

       
<div class="flex flex-row justify-center items-center" >
    <label for="" class="mr-2">Select Rank</label>
    <select class="h-12 w-12 border border-solid border-gray-200" v-model="serviceSubordinateList[serviceCounter][counter].rank">
      <option v-for="(x, count) in serviceSubordinateList[serviceCounter].length" :key="count" class="p-2" :value="count + 2">
            {{count + 2}}
      </option>
    </select>


    <div>
        <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="hover:cursor-pointer ml-10 text-rose-500" @click="deleteServiceSubordinate($event, counter, serviceCounter)"/>
    </div>
</div>
  </div>

        
  <div class="hover:cursor-pointer h-auto w-auto mt-10 bg-blue-500 text-md font-bold text-white p-3 rounded-md" @click="addServiceSubordinate($event, serviceCounter)" >Add Subordinate</div>
</div>


<div class="flex flex-col w-full justify-center items-center mt-10">
<div v-for="(detail, counter) in serviceDetailList[serviceCounter]" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">        

 

       
<div class="flex flex-row justify-center items-center w-full" >
    <label for="" class="mr-2">Detail {{ counter + 1 }} Name</label>
    <input class="h-12 w-3/4 border border-solid border-gray-200" v-model="serviceDetailList[serviceCounter][counter].label" />
    


    <div>
        <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="hover:cursor-pointer ml-10 text-rose-500" @click="deleteServiceDetail($event, counter, serviceCounter)"/>
    </div>
</div>


  </div>

        
  <div class="hover:cursor-pointer h-auto w-auto mt-10 bg-amber-500 text-md font-bold text-white p-3 rounded-md" @click="addServiceDetail($event, serviceCounter)" >Add Extra Detail</div>
</div>
    
    
    
    
    
    
    
</div>

<div class="flex flex-row justify-center items-center">
    <div class="hover:cursor-pointer h-auto  w-auto my-10 bg-emerald-500 text-2xl font-bold text-white p-5 rounded-md" @click="addService" >Add Service</div>
    
</div>
<div class="flex flex-row items-center w-full justify-end mr-10">
    <div @click="insertDepartment" class=" h-auto w-auto p-6 mr-10 mb-10 rounded-md bg-blue-600 text-white font-bold text-lg hover:cursor-pointer">Create Team</div>
</div>
  </div>



    </div>



   
</template>



<script>
import axios from 'axios'
import { onBeforeMount } from 'vue';
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
            leadersList:[],
            subordinatesList:[],
            head:null,
            leaders:['',],
            monitors:['',],
            monitorsList:[],
           
            serviceLeadersList:[],
            serviceSubordinatesUserList:[],
            serviceDetailList:[],
            details:[],
            powerList:[],
            problemTypes:[{name:'', subs:['']}]
        }
    },

    created(){
        this.getUsers()
    },

   
   computed:{
  ...mapStores(useAuthStore, useGlobalStore)
   },
    methods:{ 

        insertDepartment(){
            debugger
            var vm = this;
            var newDepartment;
            if(vm.hasServices){
                if(vm.head == null || vm.head == undefined){
                    vm.$toast.warning("Please select a department head first")
                    return
                }
                vm.head = vm.users.filter((user)=>user.mailAddress == vm.head)[0]

                vm.services = vm.services.map((service, counter)=>{
                    service.subordinates = vm.serviceSubordinateList[counter];
                    service.details = vm.serviceDetailList[counter]
                    return service
                })

                for(var x = 0; x < vm.services.length; x++){
                     var leader = vm.users.filter((user)=>user.mailAddress == vm.services[x].serviceLeader)[0]
                     vm.services[x].serviceLeader = leader;

                    for(var y = 0; y < vm.services[x].subordinates.length; y++){
                            var user = vm.users.filter((user)=>user.mailAddress == vm.services[x].subordinates[y].user)[0]
                            vm.services[x].subordinates[y].user = user
                    }
                }


                                
           

                newDepartment = {name:vm.department, services:vm.services, hasServices:vm.hasServices, leader:vm.leader, head:vm.head,  monitors:vm.monitors}
            }else{

                var userCheck = true;
                var rankCheck = true;

                for(var x of vm.subordinates){
                    if(x == null || x == undefined){
                        userCheck = false
                        return
                    }
                }

                if(userCheck == false){
                    vm.$toast.warning("Please select users for all subordinates first")
                    return
                }

            

            


                vm.subordinates = vm.subordinates.map((sub)=>{
                    var user = vm.users.filter((user)=>user.mailAddress == sub)[0]
                    return user
                })
                
                if(vm.leaders == null || vm.leaders == undefined ){
                    vm.$toast.warning("Please select a team leader")
                    return
                }

                if(vm.leaders.includes("")){
                    vm.$toast.warning("Please fill up all the leader boxes ")
                }

            

                vm.leaders = vm.leaders.map((leader)=>{
                    var leader = vm.users.filter((user)=>user.mailAddress == leader)[0]
                    return leader
                })


                if(vm.monitors.includes("")){
                    vm.$toast.warning("Please fill up all the monitor boxes")
                }
                debugger
                console.log(vm.monitors)
                console.log(vm.users)
                vm.monitors = vm.monitors.map((monitor)=>{
                    var user = vm.users.filter((u)=> u.mailAddress == monitor)[0]
                    return user;
                })

                vm.head = vm.users.filter((user)=>user.mailAddress == vm.head)[0]

 

               if(vm.problemTypes[0] == "" || vm.problemTypes.length < 1 || vm.problemTypes == null || vm.problemTypes == undefined){
                vm.$toast.warning("Please define problemTypes properly first")
                return 
               }
                    
                newDepartment = {name:vm.department, subordinates:vm.subordinates, hasServices:vm.hasServices, leaders:vm.leaders, head:vm.head, details:vm.details, problemTypes:vm.problemTypes, monitors:vm.monitors}
            }

            
            var token = this.authStore.token;
            var data = new FormData();
            data.append("token", token);
            data.append("team", JSON.stringify(newDepartment));


            axios.post(this.globalStore.globalUrl + "createTeam", data, {
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

        addSubCategory(event, counter){

         this.problemTypes[counter].subs.push("")

        },


        addSubordinate(){
            var vm = this;
            var newSubordinate = ""
            vm.subordinates.push(newSubordinate)
        },

        addDetail(){
             var vm = this;
             var newDetail = {label:"", input:null}
             vm.details.push(newDetail)
        },

     
        deleteSubordinate(event, counter){
            this.subordinates.splice(counter, 1);
        },


        deleteDetail(event, counter){
            this.details.splice(counter, 1)
        },

        addService(){
            var vm = this;
            var newService = {serviceName:null, subordinates:[], serviceLeader:null, details:[]}
            vm.serviceSubordinateList.push([]);
            vm.serviceDetailList.push([]);
            vm.services.push(newService)
        },

        addServiceSubordinate(event, counter){
         
            var vm = this;
           
            var newSubordinate = {user:null, rank:vm.services[counter].subordinates.length + 2}
            vm.serviceSubordinateList[counter].push(newSubordinate)
          
        },

        addServiceDetail(event, counter){
           var vm = this;
           var newDetail = {label:"", input:null }
           vm.serviceDetailList[counter].push(newDetail)
        },

        deleteServiceSubordinate(event, counter, serviceCounter){
          var vm = this;

          vm.serviceSubordinateList[serviceCounter].splice(counter, 1);
          
        },


        deleteServiceDetail(event, counter, detailCounter){
          var vm = this;

          vm.serviceDetailList[detailCounter].splice(counter, 1);
          
        },

        deleteService(event, counter){
            var vm = this;
            vm.services.splice(counter, 1)
        },


        selectLeader(event, counter){

            this.leaders[counter] = event.target.value;
            
        },

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



        getUsers(){
            var vm = this;
            var token = this.authStore.token
            var data = new FormData();
            data.append("token", token)
            axios.post(this.globalStore.globalUrl + "getUsers", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
  
  }
}).then((result)=>{
                vm.users = result.data
                vm.usersList = vm.users.map((user)=>user.mailAddress)
                vm.leadersList = vm.users.filter((user)=>user.userType == "leader").map((user)=>user.mailAddress)
                vm.subordinatesList = vm.users.filter((user)=>user.userType == "support").map((user)=>user.mailAddress)
                vm.powerList = vm.users.filter((user)=>user.userType == "departmentPower").map((user)=>user.mailAddress)
                vm.monitorsList = vm.users.filter((user)=> user.userType == "Ticket Manager (Department)").map((user)=>user.mailAddress)
            
              
               
            }).catch((error)=>{
                vm.$toast.warning(error)
            })

        }
    }
}



</script>