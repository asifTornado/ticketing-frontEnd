import { defineStore } from "pinia";
import {ref, computed} from 'vue'
import {useAuthStore} from "./authentication"
import { storeToRefs } from "pinia";
import { useGlobalStore } from "./globalStore";
import {useRouter} from "vue-router"
import axios from "axios"
import { useTicketStore } from "./ticket";
import Fuse from 'fuse.js'
import {useToast} from 'vue-toast-notification';



export const useUserStore = defineStore("users", () => {
       var toast = useToast()
       var selectedUser = ref(null)
       var updateUserCheck = ref(false)
       var mailUsers = ref([''])
       var sendMailCheck = ref(false)
       var userNames = ref([])
       var showUser = ref(null)
       // var token = ref(null)
       var refreshToken = ref(null)
       var update = ref(false)
       var users = ref([])
       var email  = ref('')
       var departments = ref([])
       var groups = ref(null)
       var groupTags = ref(null)
       var updateUserGroupTags = ref(null)
       var edit = ref(false)
       var eye = ref("fa-solid fa-eye")
       var save = ref(false)
       var filterMail = ref(null)
       var filterId = ref(null)
       var filterName = ref(null)
       var filteredUsers = ref(null)
       var searchTerm = ref(null)
       var fuse = ref(null)
       var router = useRouter()
       debugger;
       var {token, user} = storeToRefs(useAuthStore())
       
       var globalStore = useGlobalStore()
       var {locations} = storeToRefs(useTicketStore())

      
       const emailList = computed(()=>{
              var result = users.value.map((user)=>user.mailAddress)
              return result
       })

       const nameList = computed(()=>{
              var result = users.value.map((user)=>user.empName)
              return result
       })

       const idList = computed(()=>{
              var result = users.data.map((user)=>user._id)
              return result
       })


       const processedUsers = computed(()=>{
              if(users){

                     var result = users.value.map((user)=>{

               
                            return user.empName + '--' + user.designation + ' (' + user.unit + ')'
                        })
                        var extra = 'Not Required'
                        result.unshift(extra)
                        return result

              }
       
       })


       const processedUsers2 = computed(()=>{
              var result = users.value.map((user)=>{

               
                     return user.empName + '/' + user.designation + '/' + user.unit
                 })
                 
                 return result
       })


       function loadUsers(){
        
              const options = {
                     includeScore: true,
             
                       keys: [{name:'empName', weight:0.5},
                      {name:'location', weight:0.3},
                      {name:'userType', weight:0.2} 
                     
                     ]
                     };
             
             
                            
             
                               
                                  var data = new FormData();
                                  debugger
                                  data.append("token", token.value)
             
             
                                  axios.post(globalStore.globalUrl + 'getUsers', data, {
               headers: {
                 'Authorization': `Bearer ${token}`,
             
               }
             }).then(function(response){
                                         users.value = response.data;
                                         filteredUsers.value = response.data;
                                        
                                         fuse.value = new Fuse(response.data, options)
                                  }
                                         
                                  ).catch(function(error){
                                         console.log(error)
                                  });
             
                                  
             
       }


       function showUser(event, user){
  
          
              showUser.value = user
              router.push('/ticketing/show-user')
            }


       function deleteUser(user){ 
           
              var data = new FormData();
              data.append("token", token.value);
              data.append("user", JSON.stringify(user.value));

              axios.post(globalStore.globalUrl + 'deleteUser', data, {
             headers: {'Authorization': `Bearer ${token.value}`,}
           }).then((response) => {;
                  loadUsers();
             }, (error) => {console.log(error)});
         }


       function filter(){
              
              if(searchTerm.value == '' || searchTerm.value == null || searchTerm.value == undefined){
                     filteredUsers.value = users.value
                     return
                 }
                 var result = fuse.value.search(searchTerm.value);
         
                 filteredUsers.value = result.map(result => result.item);

               
              
       }


 function getApprovers(){
          
          
              var data = {
                  token:token.value
              }
                       axios.post(globalStore.globalUrl + 'getUsers', data, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
    
    }
  }).then(function(response){
                           users.value = response.data.filter((user)=>user.userType == 'normal' || user.userType == 'leader' || user.userType == 'support');
                
                       
                       }
                              
                       ).catch(function(error){
                  console.log(error)
                       });
          }


function makeChange(){
                    
        
           
        
               
              var data = new FormData()
  
              data.append("token", token.value);
              data.append("user", JSON.stringify(user.value))
  
              axios.post(globalStore.globalUrl + "updateUserNormal", data, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      
    }
  }).then((result)=>{
                
                  if(result.data == true){
                  
      
                      location.reload()
                  }else{
                
                  }
              }).catch((error)=>{
           
              })
          }




          
function getUsers(){
     

       var data = new FormData();
       data.append("token", token.value)

       axios.post(globalStore.globalUrl + "getUsers", data, {
 headers: {
   'Authorization': `Bearer ${token.value}`,
 
 }
}).then((result)=>{
         userNames.value = result.data.map((user)=>user.empName)
         users.value = result.data
       }).catch((error)=>console.log(error))
     }


     function addUser(event, counter){
       mailUsers.value.splice(counter + 1, 0, '')

     }

     function removeUser(event, counter){
       mailUsers.value.splice(counter, 1)
     }


     function setUser(value){
     user.value = users.value.filter(user=>user.empName == value)[0]

     }


function updateUser(){
       
       var data =  new FormData();
       
       data.append("token", token.value);
       data.append("user", JSON.stringify(selectedUser.value));

       axios.post(globalStore.globalUrl + 'updateUserNormal', data, {
headers: {
'Authorization': `Bearer ${token.value}`,

}
}).then((response)=>{
       
              router.push('/ticketing/users')
       }, (error)=>{
              console.log(error)
       });
}

       



       return {updateUserCheck, selectedUser, nameList, idList, emailList, processedUsers, processedUsers2, edit, eye, save, mailUsers, userNames,
              refreshToken, update, users, departments, groups, groupTags, updateUserGroupTags, email,
            filterMail, filterId, filterName, filteredUsers,  searchTerm, fuse, emailList, nameList, idList,
              loadUsers, showUser, deleteUser, filter, getApprovers, makeChange, getUsers, addUser, 
              updateUser,
              removeUser, setUser
       }



     

},
{persist: true}
)



