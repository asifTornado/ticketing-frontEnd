<template> 
    <div class="h-screen  w-full"  id="app">

        <div class="h-20 bg-gray-100 w-full flex flex-row justify-between p-2 items-center">

            <input type="text" v-model="department" placeholder="Enter Department Name" class="text-2xl p-4 ml-10 w-[500px] rounded-md border border-solid border-gray-600 h-12">
            
            
        <div class="flex flex-row justify-center items-center">
            <label for="hasServices" >Has Subsections</label>
            <input type="checkbox" v-model="hasServices" name="hasServices" id="hasServices" class="h-9 w-16 border border-solid border-gray-600">
        </div>
        
    </div>


    <div id="body" class="h-24 w-full flex flex-col"  v-if="!hasServices">

        <div class="flex flex-row items-center justify-start mt-10 ml-10">
            <label for="" class="mr-10 text-lg">Select Team Leader</label>
           <div class="w-1/4 "> <vss :options="leadersList" :searchable="true" v-model="leader"  /></div>


           <label for="" class="mr-10 ml-20 text-lg">Select Department Head</label>
           <div class="w-1/4"> <vss :options="powerList" :searchable="true" v-model="head"  /></div>

        
    </div>

    <div class="flex flex-col h-auto rounded-md p-[50px]  mt-10 justify-center items-center bg-gray-100">
        <div v-for="(subs, counter) in subordinates" :key="counter" class="flex flex-row w-full justify-center items-center mt-10">
       
     <div class="flex flex-row w-3/4 mr-10">
        <label for="" class="">Select Subordinate</label>
        <vss :options="subordinatesList" :searchable="true" v-model="subordinates[counter].user"/>
    </div>
    
           
    <div class="flex flex-row justify-center items-center" >
        <label for="" class="mr-2">Select Rank</label>
        <select class="h-12 w-12 border border-solid border-gray-200" v-model="subordinates[counter].rank">
          <option v-for="(x, count) in subordinates.length" class="p-2">
                {{count + 2}}
          </option>
        </select>


        <div>
            <font-awesome-icon icon="fa-solid fa-trash" size="2x" class="hover:cursor-pointer ml-10 text-rose-500" @click="deleteSubordinate($event, counter)"/>
        </div>
    </div>
      

        </div>       
        
        
        
        
        
        
        
        
        <div class="hover:cursor-pointer h-auto w-auto my-10 bg-blue-500 text-lg font-bold text-white p-5 rounded-md" @click="addSubordinate">Add Subordinate</div>
        
    </div>


    <div class="flex flex-col h-auto rounded-md p-[50px]  mt-10 justify-center items-center bg-gray-100">
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
        <div class="flex flex-row items-center w-full justify-end mr-10">
    <div @click="insertDepartment" class=" h-auto w-auto p-6 mr-10 mb-10 rounded-md bg-blue-600 text-white font-bold text-lg hover:cursor-pointer">Create Team</div>
</div>
    </div>
        



    </div>

    

  <div v-if="hasServices" class="h-full">
  
  <div class="flex flex-row ml-10 mt-4">
        <label for="" class="mr-10 text-lg">Select Department Head</label>
                 <div class="w-1/3"> <vss :options="powerList" :searchable="true" v-model="head"  /></div>
  </div>
<div class="flex flex-col h-auto rounded-md p-[50px]  mt-4 justify-center items-center bg-gray-100" v-for="(service, serviceCounter) in services" :key="serviceCounter" >
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
           
            serviceLeadersList:[],
            serviceSubordinatesUserList:[],
            serviceDetailList:[],
            details:[],
            powerList:[]
        }
    },

    created(){
        this.getUsers()
    },

   

    methods:{ 

        insertDepartment(){
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


                                
           

                newDepartment = {name:vm.department, services:vm.services, hasServices:vm.hasServices, leader:vm.leader, head:vm.head}
            }else{

                var userCheck = true;
                var rankCheck = true;

                for(var x of vm.subordinates){
                    if(x.user == null || x.user == undefined){
                        userCheck = false
                        return
                    }
                }

                if(userCheck == false){
                    vm.$toast.warning("Please select users for all subordinates first")
                    return
                }

            

                for(var x of vm.subordinates){
                    if(x.rank == null || x.rank == undefined){
                        rankCheck = false
                        return
                    }
                }


                if(rankCheck == false){
                    vm.$toast.warning("Please select ranks for all subordinates first")
                    return
                }


                vm.subordinates = vm.subordinates.map((sub)=>{
                    var user = vm.users.filter((user)=>user.mailAddress == sub.user)
                    return {user:user[0], rank:sub.rank}
                })
                
                if(vm.leader == null || vm.leader == undefined){
                    vm.$toast.warning("Please select a team leader first")
                    return
                }

                if(vm.head == null || vm.head == undefined){
                    vm.$toast.warning("please select a depeartment head first")
                    return
                }

                vm.leader = vm.users.filter((user)=>user.mailAddress == vm.leader)[0]
                vm.head = vm.users.filter((user)=>user.mailAddress == vm.head)[0]

                
                    
                newDepartment = {name:vm.department, subordinates:vm.subordinates, hasServices:vm.hasServices, leader:vm.leader, head:vm.head, details:vm.details }
            }

            console.log(newDepartment)
            
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append("token", token);
            data.append("team", JSON.stringify(newDepartment));


            axios.post(vm.globalUrl + "createTeam", data).then((result)=>{
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
            console.log("from inside service subordinate" + counter)
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

        }
    }
}



</script>