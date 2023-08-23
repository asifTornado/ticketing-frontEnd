<template>



    <div class="p-2 bg-white hover:cursor-pointer border border-solid border-gray-400 rounded-sm mt-2 mb-2" @click="setFilterToggle">  Filter <font-awesome-icon icon="fa-solid fa-filter" class="ml-2 hover:cursor-pointer"/></div>
    
    
    </template>
    
    <script>
    export default{
    
    methods:{
      setFilterToggle(){
        this.mainStore.toggleUserFilter()
      }
    }
    
    
    }
    
    
    
    
    </script>
    
    <style>
    
    .main{
    
        }
    
    
    
    </style>