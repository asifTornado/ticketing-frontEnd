<template>
    

<div class="flex flex-col justify-start items-start p-12 h-[92vh] overflow-y-scroll w-full">
    
    
    <div class="text-black text-6xl font-bold mb-10 px-24 border-b-2 border-solid border-black w-full pb-5" v-if="blog">{{ blog.headline }}</div>
    
    <div v-if="blog"  v-html="blog.content" class="px-24">
    
    </div>
    
    
    
</div>










</template>


<script>
import axios from "axios"
export default{

data(){
    return{
         blog:null
    }
},

created(){
    var vm = this;
            this.user = this.authStore.getUser
            vm.$toast.info("Loading Article")
            var token = this.authStore.getToken
            var id = this.$route.params.id
            var data = new FormData();
            data.append("token", token);
            data.append("id", id);
            data.append("user", JSON.stringify(this.user))
            var url = vm.globalUrl + "getBlog" 
            axios.post(url, data).then((response)=>{
                vm.blog = response.data
                console.log("this is the blog")
                console.log(vm.blog)
                vm.$toast.clear()
                vm.$toast.success("Ticket Loaded")
            }).catch((error)=>console.log(error))
}

}








</script>


<style scoped>
p{
    color:red
}
</style>