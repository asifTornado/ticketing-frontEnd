<template>
    

<div class="flex  flex-col justify-start items-center p-12 h-[92vh] overflow-y-scroll w-full">
    
    
    <div class="text-black ml-[2vw] w-[80vw] text-6xl bg-white text-center font-bold mb-10   shadow-md shadow-black py-[10px]  " v-if="blog">{{ blog.headline }}</div>
    
    <div v-if="blog"  v-html="blog.content" class="px-24 bg-white shadow-md shadow-black p-[20px]">
    
    </div>
    
    
    
</div>










</template>


<script>
import axios from "axios"
import {useAuthStore} from "../../stores/authentication"
    import { useGlobalStore } from '../../stores/globalStore'
    import { mapStores } from 'pinia'

export default{

data(){
    return{
         blog:null
    }
},

computed:{
   ...mapStores(useGlobalStore, useAuthStore)
},

created(){
    var vm = this;
            this.user = this.authStore.user
            vm.$toast.info("Loading Article")
            var token = this.authStore.token
            var id = this.$route.params.id
            var data = new FormData();
            data.append("token", token);
            data.append("id", id);
            data.append("user", JSON.stringify(this.user))
            var url = this.globalStore.globalUrl + "getBlog" 
            axios.post(url, data, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then((response)=>{
                vm.blog = response.data
           
                vm.$toast.clear()
                vm.$toast.success("Ticket Loaded")
            }).catch((error)=>vm.$toast.warning(error))
}

}








</script>


<style scoped>
p{
    color:red
}
</style>