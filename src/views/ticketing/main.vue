<template>
   
   <div class="flex flex-row">
           
    <div class="flex flex-col  w-2/12 h-ful bg-white items-start pl-2 " >
           <div class="mt-10 ml-3 mr-2 text-black font-bold hover:text-blue-600 hover:cursor-pointer" @click="this.$router.push('/ticketing/newTicket')">
            <font-awesome-icon icon="fa-solid fa-file-lines rounded-sm" size="lg"/>   Raise New Ticket
            </div>
            <div class="mt-10 ml-3  text-black font-bold hover:text-blue-600 hover:cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket rounded-sm"  size="lg"/>
                Re-Open Ticket
            </div>
            <div class="mt-10 ml-3 text-black font-bold hover:text-blue-600 hover:cursor-pointer"  @click="this.$router.push('/ticketing/searchTicket')">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus rounded-sm"  size="lg"/>
                Search Ticket
            </div>
            <div class=" ml-3 mt-20 hover:text-blue-600 hover:cursor-pointer">
                <label for="" class="text-blue-600 font-bold">Quick Search</label>
                <div class="flex flex-row ">
                    <input type="search" name="" id="" class="border border-solid border-black w-3/4">
                    <div class=" bg-blue-500 text-white p-3 border  border-solid border-black"><font-awesome-icon icon="fa-solid fa-magnifying-glass rounded-sm" size="sm"/></div>
                </div>            
            </div> 

            <button class="bg-gray-200 text-black text-lg font-bold h-auto w-auto mx-5 mt-10 p-2 border border-solid border-black" @click="returnBack()">Return</button>
    </div>
    <div class="flex flex-col w-10/12 h-screen bg-red-500 ">
        <RouterView class="h-screen w-full bg-gray-200" />
    </div>

   </div>


  


</template>


<script>
export default{

methods:{
    returnBack(){
        var user = this.authStore.getUser
        if(user.userType == 'Admin'){
            this.$router.push('/admin')
        }else(
            this.$router.push('/user')
        )
    },

    
}

}



</script>