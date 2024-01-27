<template >
  
    <div class="flex flex-col justify-center items-center h-auto text-xs">
        
          <div class="shadow-2xl hover:shadow-blue-600 w-auto   flex flex-col justify-center items-center bg-white ">
          
          <div class="flex text-white flex-row justify-center items-start w-full bg-blue-500 mb-10 p-4"><span class="text-4xl  font-bold">Add User</span></div>
          
                  <form @submit.prevent="addUser" class="h-auto w-auto px-10">
                 
                  
          <label  class="mb-20 font-bold">Email Address</label>
                   <input list="emailList" v-model="user.mailAddress" required class=" w-full h-11 mb-4 border border-solid border-gray-200">
                        <datalist  id="emailList">
                            <template v-for="(user, userCounter) in users" :key="userCounter">    <option :value="user.mailAddress" v-if="user.mailAddress" >{{user.mailAddress}}</option></template>
                        </datalist>
                   
                 
       
                

                   
                    <label class="mb-20 font-bold mt-10" >Department</label>
                  <select type="text" name="department" id="department" v-model="user.department"  class="mb-4 h-11 w-full  border border-solid border-gray-200">
                           
                        <template v-for="(department, departmentCounter) in departments" :key="departmentCounter"><option :value="department.name">{{ department.name }}</option></template>	
                          
                    </select>
          
                  <label class="mb-20 font-bold mt-10" >Groups</label>
                  <input type="text" name="groups" id="groups"  class="mb-4 h-11 w-full  border border-solid border-gray-200">
              
              
          
               
          
            <label class="mb-20 font-bold mt-10" > User Type</label>
                    <select name="userType" v-model="user.userType" required class="mb-4 h-11 w-full  border border-solid border-gray-200" >
                      
                      <option  >Requester</option>
                      <option  >Watcher</option>
                      <option  >Approver</option>
                               
                    </select>
          
                    <br class="border border-solid border-black">
          
            
                 <button type="submit" class="w-full mt-8 h-11 bg-blue-500 rounded-md text-2xl text-white font-bold mb-2">Add</button>
          
          
                 <button @click="this.$router.push('/admin/users')" class="w-full h-11 bg-gray-300 rounded-md text-2xl text-gray-500 font-bold mb-10">Return</button>
          
                </form>
              </div>
          
    
  
</div>




</template>


<script>
import axios from 'axios'







export default{
data(){
    return{
        token:null,
        user:{},
        groups:null,
        groupTags:null,
        addUserCheck:false,
        deparmtents:null,
        users:null
     
    }
},

watch:{
 addUserCheck(newVal, oldVal){
       if(newVal == true){
     this.$nextTick(() => {
      this.loadGroups();
    });
       }
  },


},


created(){
    
    this.token = this.authStore.getToken;
    this.groups = this.mainStore.getGroups;
    var departments = this.mainStore.getDepartments
    this.departments = departments.filter((department)=>{
    return department.email == null && department.name != null
  })
    this.addUserCheck = true;
    this.getUsers();
},

methods:{


    getUsers(){
    var vm = this;
    var token = vm.authStore.getToken
    axios.get(vm.globalUrl + 'api/getUsers', {
  headers: {
    'Authorization': `Bearer ${token}`,
   
  }
}).then((response)=>{
        vm.users = response.data;
  
        
    }).catch((error)=>{
        vm.$toast.warning(error)
    })

    },


    addUser:function(){
        var vm = this;
        this.user.groups = this.groupTags.value.map(function(item){
            return item.value
        })

        var mainUser = this.users.filter((user)=> user.mailAddress == this.user.mailAddress)[0];
        mainUser.groups = this.user.groups;
        mainUser.department = this.user.department;
        mainUser.userType = this.user.userType;

        var data = {
            user:mainUser,
            token:this.token
        }
        axios.post(vm.globalUrl + 'insertUser', data, {
  headers: {
    'Authorization': `Bearer ${vm.token}`,
    'Content-Type': 'application/json'
  }
}).then((response)=>{
      
            vm.$router.push('/admin/users')
        }, (error)=>{
          vm.$toast.warning(error);
        });
    },
    

loadGroups(){
        
var vm = this;
var list = [];


for(let x of this.groups){
list.push(x.name)

}

var input = document.querySelector("#groups")

// this.groupTags=  new Tagify(input, {
//     whitelist:list,
//     maxTags: 10,
//     enforceWhitelist: true,
//     dropdown: {
//     maxItems: 20,  	           
//     classname: "tags-look", 
//     enabled: 0,             
//     closeOnSelect: false     }
// })

},






}
}





</script>