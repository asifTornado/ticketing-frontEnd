<template>
    
<div class="fixed w-full h-full top-0 left-0 ">


  


</div>

<div class="text-black relative flex flex-col justify-start pt-32 items-center h-full w-full ">
    <font-awesome-icon icon="fa-solid fa-circle-check" size="8x"/>
    <h1 class="mt-10 text-lg">This request has already been processed</h1>

    <div class="flex flex-row mt-10">
         <button class="h-aut0 w-auto bg-amber-500 p-3 text-white" @click="this.$router.push('/currentRequests')" v-if="this.$route.path.split('/')[1] == 'currentRequests'">Current Requests</button>
         <button class="h-aut0 w-auto bg-amber-500 p-3 text-white" @click="this.$router.push('/myRequests')" v-if="this.$route.path.split('/')[1] == 'myRequests'">My Requests</button>
         <div class="inline-block" v-if="this.$route.path.split('/')[1] == 'email'">
            <button class="h-aut0 w-auto bg-amber-500 p-3 text-white" @click="this.$router.push('/currentRequests')" v-if="this.$route.path.split('/')[2] == 'currentRequests'">Current Requests</button>
            <button class="h-aut0 w-auto bg-amber-500 p-3 text-white" @click="this.$router.push('/currentRequests')" v-if="this.$route.path.split('/')[2] == 'myRequests'">My Requests</button>
         </div>
         <button class="ml-4 h-aut0 w-auto bg-green-500 p-3 text-white" @click="this.$router.push('/admin')" v-if="this.authStore.getUser.userType == 'Admin'">Home</button>
         <button class="ml-4 h-aut0 w-auto bg-green-500 p-3 text-white" @click="this.$router.push('/user')" v-if="this.authStore.getUser.userType != 'Admin'">Home</button>

    </div>
</div>



</template>


<script>
export default{




}





</script>