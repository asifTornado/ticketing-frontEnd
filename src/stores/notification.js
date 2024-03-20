import { defineStore } from "pinia";
import {ref} from "vue";
import { useAuthStore } from "./authentication";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "./globalStore";
import { useRouter } from "vue-router";
import { useMainStore } from "./store";
import {useToast} from 'vue-toast-notification';
import axios from "axios";

export const useNotificationStore = defineStore("notification", ()=>{


   var notifications = ref([])
   var notificationCheck = ref(null)
   var travelNotifications = ref([])
   var {globalUrl} = storeToRefs(useGlobalStore())
   var {token, user} = storeToRefs(useAuthStore())
   var mainStore = useMainStore()
   var router = useRouter()
   var toast = useToast()




  function getToSource(event, notification){
          
  
    var id = notification._id


    var data = new FormData();
    data.append("token", token.value);
    data.append("id", id);
    data.append("user", JSON.stringify(user.value))
    
    debugger
    axios.post(globalUrl.value + 'deleteNotification', data).then((result)=>{

    
      getNotifications()

      if(notification.type == 'chat'){
          router.push("/ticketing/ticketDetails/" +notification.ticketId + "?chat=true")
      }else{
        
          router.push("/ticketing/ticketDetails/" +notification.ticketId)
      }

    
    }).catch((error)=>{toast.warning(error)})

  }



function showNotifications(){


 notificationCheck.value = !notificationCheck.value

}


 function getNotifications(){

      var data = new FormData();
      data.append("token", token.value);
      data.append("user", JSON.stringify(user.value))
   
      axios.post(globalUrl.value + 'getNotifications', data).then((result)=>{ 
     
   
      notifications.value = result.data

      }).catch((error)=>console.log(error))
  
    }
    


  return {notificationCheck, notifications, travelNotifications, getNotifications, getToSource, showNotifications}
  
 
},
  
  {


    persist: true,

  }

);