<template >
    

    <div class="w-[100vw] h-[92vh] px-10 py-10 overflow-y-scroll ml-[30px]">
  <div class="flex flex-row justify-center items-center border-2 border-solid border-black p-4 rounded-md">  <label class="text-black text-4xl font-bold">Knowledge Base</label></div>
    


<div class="flex flex-row justify-end w-full ">

    <div class="flex flex-row mt-5 justify-center ">

     <input v-model="searchTerm" type="search" name="" placeholder="Search Article" id="" class="focus:outline-none text-bold text-lg border-b-2 border-t-2 border-l-2 border-solid border-l-gray-500 border-t-gray-500 border-b-gray-500 p-3 w-[200px]">
     <div class="flex flex-col justify-center bg-gray-300 items-center p-3 border-t-2 border-r-2 border-b-2 border-solid border-r-gray-500 border-t-gray-500 border-b-gray-500 hover:cursor-pointer" @click="search()"><font-awesome-icon icon="fa-solid fa-search"/></div>
    </div>

</div>



<div class="flex flex-col w-full  h-auto">

<label class="text-2xl font-bold">Articles:</label>

<div class="flex flex-col w-3/4 h-auto ">

    <div class="w-full mb-5 p-3 bg-white    h-auto flex flex-col border-2 border-solid border-gray-800" v-for="(article, articleCounter) in filteredArticles" :key="articleCounter" >
         <div class="text-3xl pb-4 font-bold text-black mb-4 border-b-2 border-b-gray-500 flex flex-row justify-between">{{ article.headline }} 
            <div class="flex flex-row justify-end w-16 items-center">
                <font-awesome-icon icon="fa-solid fa-copy" size="lg" class="hover:text-emerald-600 hover:scale-125 hover:cursor-pointer" @click="copy($event, this.frontUrl + '#/ticketing/blog/article/' + article._id)"/>
                <font-awesome-icon icon="fa-solid fa-trash" size="lg" class="hover:text-red-600 hover:scale-125 hover:cursor-pointer ml-3" @click="deleteArticle($event, article._id)" v-if="this.authStore.user.userType == 'admin'"/>
            </div>
        </div>
         <div class=" text-black h-[60px] truncate"  v-html="article.content"></div>
         <div class="mt-2 flex flex-row justify-between items-center"><div class=" border-2 border-solid border-black p-2">Written By: {{article.authors.empName}}</div>
         <div class="border-2 border-solid border-black hover:cursor-pointer bg-blue-500 text-white font-bold p-2" @click="this.$router.push('/ticketing/blog/article/'+article._id)">Read Article</div>
         
        </div>
         
        </div>

</div>








<div>

</div>


</div>

    
    </div>
    
    </template>
    
    
    <script>
    import axios from 'axios'
    import Fuse from 'fuse.js'
    import {useAuthStore} from "../../stores/authentication"
    import { useGlobalStore } from '../../stores/globalStore'
    import { mapStores } from 'pinia'
import { useMainStore } from '../../stores/store'

    
   export default{
    data(){
        return{
            articles:[],
            filteredArticles:[],
            searchTerm:null,
            fuse:null
        }
    },


    computed:{
        ...mapStores(useAuthStore, useGlobalStore)
    },


    created(){
        var vm  = this;
        var user = this.authStore.user;
        var token = this.authStore.token;
        

        const options = {
        includeScore: true,

          keys: [{name:'authors.empName', weight:0.1},
         {name:'content', weight:0.6},
         {name:'headline', weight:0.3} 
        
        ]
        };

       



        var data = new FormData();
        data.append("user", user);
        data.append("token", token);

        axios.post(this.globalStore.globalUrl + "getAllBlogs", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result)=>{
            vm.articles = result.data
            vm.filteredArticles = vm.articles
            vm.fuse = new Fuse(result.data, options)
        }).catch((error)=>vm.$toast.warning(error))

    },

methods:{
    search(){
  
        var vm = this;

        if(this.searchTerm == '' || this.searchTerm == null || this.searchTerm == undefined){
            vm.filteredArticles = vm.articles
            return
        }
        var result = vm.fuse.search(vm.searchTerm);

        vm.filteredArticles = result.map(result => result.item);

        



    },


    deleteArticle(event, id){
      
           var vm = this;
           var token = this.authStore.getToken;
           var id = id

           var data = new FormData();
           data.append("id", id);
           data.append("token", token)

           axios.post(this.globalStore.globalUrl + "deleteArticle", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result) => {
            if(result.data == true){
                
                vm.articles = vm.articles.filter((article)=>article._id != id)
            }
           }).catch((error)=>vm.$toast.warning(error))
    },

    async copy($event, text){
        await navigator.clipboard.writeText(text);
    }
}

   }

   </script>