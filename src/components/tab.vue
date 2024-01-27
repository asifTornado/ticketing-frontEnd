<template>
  <div class="tab-content" v-show="title == selectedTitle">
{{content}}
  </div>
</template>

<script>
import {inject} from 'vue'

export default{
  
  data(){
    return {
      selectedTitle:null
    }
  },

  props:["title", "content"],

  

  created(){
    this.selectedTitle = inject("selectedTitle")

   
  }
}
</script>


<style scoped>
.tab-content{
  min-height: 500px;
  min-width:90vw;
  padding:20px;

  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  border-bottom:1px solid black;
  border-left:1px solid black;
  border-left:1px solid black;

}


</style>