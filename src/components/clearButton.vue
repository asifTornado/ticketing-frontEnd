<template>



<div class="p-2 shadow-black shadow-md bg-white hover:cursor-pointer border border-solid border-gray-400 ml-2 rounded-sm mt-2 mb-2" @click="clear">  Clear <font-awesome-icon icon="fa-solid fa-undo-alt" class="ml-2 hover:cursor-pointer"/></div>


</template>

<script>
export default{

methods:{
  clear(){
    this.mainStore.setFilteredTickets(this.mainStore.getInitialTickets)
  }
}


}




</script>

