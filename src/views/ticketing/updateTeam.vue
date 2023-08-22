<template>
    <div class="h-full w-full"  id="app">

        <div class="h-20 bg-gray-100 w-full flex flex-row justify-between p-2 items-center">

            <input type="text" v-model="department" placeholder="Enter Department Name" class="text-2xl p-4 ml-10 w-[500px] rounded-md border border-solid border-gray-600 h-12">
            
            
        <div class="flex flex-row justify-center items-center">
            <label for="hasServices" >Has Subsections</label>
            <input type="checkbox" v-model="hasServices" name="hasServices" id="hasServices" class="h-9 w-16 border border-solid border-gray-600">
        </div>
        
    </div>


    <div id="body" class="h-full w-full flex flex-col" v-if="!hasServices">

        <div class="flex flex-row items-center justify-start mt-10 ml-10">
            <label for="" class="mr-10 text-lg">Select Team Leader</label>
           <div class="w-1/4"> <vss :options="leadersList" v-model="leader" :searchable="true"  /></div>

           <label for="" class="mr-10 text-lg ml-20">Select Department Head</label>
           <div class="w-1/4"> <vss :options="powerList" v-model="head" :searchable="true"  /></div>

        
    </div>

    <div class="flex flex-col h-auto rounded-md p-[50px]  mt-10 justify-center items-center bg-gray-100">
        <div v-for="(subs, counter) in subordinates" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">
       
     <div class="flex flex-row w-3/4 mr-10">
        <label for="" class="">Select Subordinate</label>
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

        <input type="text" v-model="services[serviceCounter].serviceName" placeholder="Enter Team Name" class="text-2xl p-4 ml-10 w-[500px] rounded-md border border-solid border-gray-600 h-12">
        
        <font-awesome-icon icon="fa-solid fa-trash" class="text-red-500 hover:cursor-pointer" @click="deleteService($event, serviceCounter)" size="3x"/>
</div>
   
   
    <div class="flex flex-row items-center justify-start w-full">
        <label for="" class="mr-10 text-lg">Select Team Leader</label>
       <div class="w-1/3"> <vss :options="leadersList" v-model="services[serviceCounter].serviceLeader" /></div>

    
</div>
    
    
    
   

<div v-for="(subs, counter) in serviceSubordinateList[serviceCounter]" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">        

 <div class="flex flex-row w-3/4 mr-10">
    <label for="" class="">Select Subordinate</label>
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

        
    
    
    
    
    
    
    
    <div class="h-auto w-auto mt-10 bg-blue-500 text-md font-bold text-white p-3 rounded-md hover:cursor-pointer" @click="addServiceSubordinate($event, serviceCounter)" >Add Subordinate</div>
    
</div>

<div class="flex flex-row justify-center items-center">
    <div class="h-auto  w-auto my-10 bg-emerald-500 text-2xl font-bold text-white p-5 rounded-md" @click="addService" >Add Team</div>
</div>
  </div>

<div class="flex flex-row items-center w-full justify-end mr-10 hover:cursor-pointer">
    <div @click="updateDepartment" class="h-auto w-auto p-6 mr-10 mb-10 rounded-md bg-blue-600 text-white font-bold text-4xl">Update Department</div>
</div>

    </div>


</template>


<script>
import axios from 'axios'

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
            powerList:[]
        }
    },

    created(){
        this.getUsers()
        this.getTeam()
    },

    methods:{ 

        convertToInt(value){
           var newValue = parseInt(value, 10)
           return newValue
        },

        updateDepartment(){
            var vm = this;
            var newDepartment;
            if(vm.hasServices){

                if(vm.servicesHead == null || vm.servicesHead == undefined){
                    vm.$toast.warning("Please select a department head first")
                    return
                }
                
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
                if(vm.head == null || vm.head == undefined){
                    vm.$toast.warning("Please select a department head first")
                    return
                }

                if(vm.leader == null || vm.leader == undefined){
                    vm.$toast.warning("Please select a service leader first")
                    return
                }


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
                 
           

                vm.leader = vm.users.filter((user)=>user.mailAddress == vm.leader)[0]
                vm.head = vm.users.filter((user)=>user.mailAddress == vm.head)[0]
                console.log('this is the head')
                console.log(vm.head)
                    
                newDepartment = {name:vm.department, subordinates:vm.subordinates, hasServices:vm.hasServices, leader:vm.leader, head:vm.head }
            }
            
            console.log("this is the new department")
            newDepartment._id = vm.team._id;
            console.log(newDepartment)

      
            
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append("token", token);
            data.append("team", JSON.stringify(newDepartment));


            axios.post(vm.globalUrl + "editTeam", data).then((result)=>{
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
            console.log("from inside service subordinate" + counter)
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
            var vm = this;
            var token = this.authStore.getToken
            var data = new FormData();
            data.append("token", token)
            axios.post(vm.globalUrl + "getUsers", data).then((result)=>{
                vm.users = result.data
                vm.usersList = vm.users.map((user)=>user.mailAddress)
                vm.leadersList = vm.users.filter((user)=>user.userType == "leader").map((user)=>user.mailAddress)
                vm.subordinatesList = vm.users.filter((user)=>user.userType == "support").map((user)=>user.mailAddress)
                vm.powerList = vm.users.filter((user)=>user.userType == "departmentPower").map((user)=>user.mailAddress)         
            }).catch((error)=>{
                vm.$toast.warning(error)
            })

        },


        getTeam(){
            var vm = this;
            var user = this.authStore.getUser;
            var token = this.authStore.getToken;
            var id = this.$route.params.id

            var data = new FormData();
            data.append("user", JSON.stringify(user));
            data.append("token", token);
            data.append("id", id)

            axios.post(vm.globalUrl + "getTeam", data).then((result)=>{
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
                    vm.leader = result.data.leader.mailAddress
                    vm.head = result.data.head.mailAddress
                }

            })
        }
    }
}



</script>