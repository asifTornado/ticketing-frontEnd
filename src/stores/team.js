import { defineStore, storeToRefs } from "pinia";
import {ref, computed} from 'vue'
import { useGlobalStore } from "./globalStore";
import { useRouter } from "vue-router";
import VueJwtDecode from 'vue-jwt-decode'
import axios from "axios";
import { useAuthStore } from "./authentication";
import {useToast} from 'vue-toast-notification';



export const useTeamStore = defineStore("team", () => {
    var toast = useToast()
    var teams = ref([])
    var departments = ref([])
    var team = ref(null)
    var currentTeam = ref(null)
    var details = ref('')
    var hasService = ref(false)
    var {user, token} = storeToRefs(useAuthStore())
    var globalStore = useGlobalStore()


    const options = computed(() => {
        var problems = team.value.problemTypes
        var options2 = problems.map((problem)=>{
            var newOption = {
                id:problem.name,
                label:problem.name,
                children:[]
            }

            newOption.children = problem.subs.map((sub)=>{
                var newChild = {
                    id:sub,
                    label:sub
                }

                return newChild
            })

         

            return newOption
    })

    return options2

})


function checkServiceDetail(){
    var service = team.data.services.filter((service) => service.serviceName == vm.ticket.serviceType)[0]
    
    if(service.details.length > 0){
       details.value = service.details
    }
}

function checkService(){
         
   
 team.value = teams.value.filter((team)=> team.name == this.ticket.department)[0]
 

   if(team.value.hasServices){
    hasService.value = true
   }else{
    hasService.value = false
    if(team.value.details.length > 0){
    details.value = team.value.details
   }
   }
}



function setTeam(event){
 
    var teamName = event.target.value

    var selectedTeam = teams.value.filter((team)=>team.name == teamName)[0];
    team.value = selectedTeam
}


function getTeams(){
    

    debugger
    var data = new FormData();
    data.append("user", user.value);
    data.append("token", token.value);

    axios.post(globalStore.globalUrl + "getTeams", data, {
headers: {
'Authorization': `Bearer ${token.value}`,

}
}).then((result)=>{
    debugger
        teams.value = result.data;

    }).catch((error)=>toast.warning(error))
}



function getTeams2(){
    


    var data = new FormData();
    data.append("token", token.value)
    data.append("user", user.value.mailAddress)

    if(user.value.userType == "leader"){
      axios.post(globalStore.globalUrl +"getTeamsForLeaders", data).then((result)=>{
        teams.value = result.data
    }).catch((error)=>console.log(error))
    }else{
      axios.post(globalStore.globalUrl +"getTeams", data).then((result)=>{
        teams.value = result.data
    }).catch((error)=>console.log(error))
    }
   


  }


return {
    teams, team, currentTeam, details, hasService,
    options, departments,
    checkService, checkServiceDetail, setTeam, getTeams, getTeams2
}


})