<template>
<div class="flex flex-row  w-full justify-end mr-[5vw] mt-[20px]">    
   

<div class="bg-[rgb(2,54,61)] text-white mr-1 px-3 py-2 hover:cursor-pointer" @click="previous()">
    <font-awesome-icon icon="fa-solid fa-arrow-left" class=""/>
</div>    
<div  v-for="(page, pageCounter) in pages" :key="pageCounter"  >
<div class="bg-[rgb(2,54,61);] text-white mr-1 ml-1 px-3 py-2 hover:cursor-pointer " v-if="page != currentPage" @click="paginate(page)">
    {{ page }}
</div>
<div class="bg-green-500 text-center mr-1 ml-1 px-3 py-2 hover:cursor-pointer " v-else="page == currentPage" @click="paginate(page)">
{{ page }}
</div>
</div>
<div class="bg-[rgb(2,54,61);] text-white ml-1 px-3 py-2 hover:cursor-pointer" @click="next()">
    <font-awesome-icon icon="fa-solid fa-arrow-right" class=""/>
</div> 
</div>

</template>






<script setup>
import {ref, defineProps, defineEmits, computed, watchEffect} from "vue"
import {useTicketStore} from '../stores/ticket'
import { storeToRefs } from "pinia";


var emits = defineEmits(["changePage"])
debugger
var { currentPage, filteredTickets, initialTickets} = storeToRefs(useTicketStore())
var {getTickets2} = useTicketStore();


// var totalPages = ref(Math.ceil(pages/2))
var itemsPerPage = ref(10)
const skipValue = computed(() => (currentPage.value - 1) * itemsPerPage.value);
debugger

watchEffect(async () => {
    filteredTickets.value = initialTickets.value.slice(skipValue.value, skipValue.value + itemsPerPage.value)
})



    
var pages = computed(()=> Math.ceil(initialTickets.value.length / itemsPerPage.value))





var paginate = (number) => {
    debugger
    currentPage.value = number
    filteredTickets.value = initialTickets.value.slice(skipValue.value, skipValue.value + itemsPerPage.value)
 
    
}


var previous = () => {
   if(currentPage.value < 2){
    return
   }else{
    currentPage.value = currentPage.value - 1
    filteredTickets.value = initialTickets.value.slice(skipValue.value, skipValue.value + itemsPerPage.value)
   }
}

var next = () => {
    if(currentPage.value == pages.value){
        return
    }else{
        currentPage.value = currentPage.value + 1
        filteredTickets.value = initialTickets.value.slice(skipValue.value, skipValue.value + itemsPerPage.value)

    }

}



</script>