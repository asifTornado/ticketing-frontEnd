<template>
<div class="flex flex-row mt-3">    
    <vue-awesome-paginate
    :total-items="items"
    :items-per-page="itemsPerPage"
    :max-pages-shown="5"
    v-model="currentPage"
    :on-click="onClickHandler"
    />
</div>

</template>






<script>
export default{

data(){
    return {
        currentPage:1,
       
    }
},

props:["items", "itemsPerPage"],

methods:{
    onClickHandler(page){
    this.currentPage = page
    this.$emit("pageChanged", page)
  }
}


}




</script>