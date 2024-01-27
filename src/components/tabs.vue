<template>
<div class="tabs">

  <ul class="tabs_header">
   <li v-for="title in tabTitles"  :key="title" @click="selectedTitle = title" :class="{selected:title == selectedTitle, notSelected:title != selectedTitle}">
    {{title}}
   </li>
  </ul>
<slot />
</div>
</template>


<script>
import {ref, provide} from 'vue'

export default{
  setup(props, {slots}){
    const tabTitles = ref(slots.default().map((tab)=> tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])

    provide("selectedTitle", selectedTitle)

    return {
      selectedTitle,
      tabTitles
    }
  }
}




</script>


<style scoped>

  .tabs {
    max-width: 400px;

  }


  .tabs_header{
    margin-bottom: 0px;
    list-style: none;
    padding:0;
    display:flex
  }

  /* .tabs_header li{
    width:80px;
    text-align:center;
    padding:10px 20px;
    margin-right: 10px;
    background-color: #ddd;
    border-radius: 5px;
  } */

.selected{
  width:80px;
    text-align:center;
    padding:10px 20px;
    
    background-color: white;
    color:black;
    border-right:1px solid black;
    border-left:1px solid black;
    border-top:1px solid black;
 
  }

.notSelected{
    width:80px;
    text-align:center;
    padding:10px 20px;

    background-color: #ddd;
    
    cursor: pointer;

    border-right:1px solid black;
    border-left:1px solid black;
    border-top:1px solid black;
    border-bottom:1px solid black
}


</style>