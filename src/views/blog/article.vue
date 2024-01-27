<template>
    

<div class="flex flex-col justify-start items-start p-12 h-[92vh] overflow-y-scroll w-full">
    
    
    <div class="text-black text-6xl font-bold mb-10 px-24 border-b-2 border-solid border-black w-full pb-5" v-if="blog">{{ blog.headline }}</div>
    
    <div v-if="blog"  v-html="blog.content" class="px-24">
    
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