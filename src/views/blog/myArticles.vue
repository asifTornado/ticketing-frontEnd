<template >
    

    <div class="w-full h-full px-10 py-10">
  <div class="flex flex-row justify-center items-center bg-gray-300 p-4 rounded-md">  <label class="text-black text-4xl font-bold">Knowledge Base</label></div>
    


<div class="flex flex-row justify-end w-full ">

    <div class="flex flex-row mt-5 justify-center bg-white shadow-md shadow-black  ">
        <div @click="this.$router.push('/blog/insertArticle')" class="bg-blue-500 p-3 text-white font-bold w-[100px] rounded-md mr-10 flex flex-col justify-center items-center h-full hover:cursor-pointer " v-if="checkUser()">Insert Article</div>
     <input v-model="searchTerm" type="search" name="" placeholder="Search Article" id="" class="focus:outline-none text-bold text-lg border-b-2 border-t-2 border-l-2 border-solid border-l-gray-500 border-t-gray-500 border-b-gray-500 p-3 w-[200px]">
     <div class="flex flex-col justify-center bg-gray-300 items-center p-3 border-t-2 border-r-2 border-b-2 border-solid border-r-gray-500 border-t-gray-500 border-b-gray-500 hover:cursor-pointer" @click="search()"><font-awesome-icon icon="fa-solid fa-search"/></div>
    </div>

</div>



<div class="flex flex-col w-full  h-auto">

<label class="text-2xl font-bold">Articles:</label>

<div class="flex flex-col w-3/4 h-auto ">

    <div class="w-full mb-5 p-3 bg-white    h-auto flex flex-col border-2 border-solid border-gray-800" v-for="(article, articleCounter) in articles" :key="articleCounter" >
         <div class="text-3xl pb-4 font-bold text-black mb-4 border-b-2 border-b-gray-500 flex flex-row justify-between">{{ article.headline }} 
            <div class="flex flex-row justify-around w-16 items-center"><font-awesome-icon icon="fa-solid fa-copy" size="lg" class="hover:text-emerald-600 hover:scale-125 hover:cursor-pointer" @click="copy($event, this.frontUrl + 'blog/article/' + article._id)"/>
            <font-awesome-icon icon="fa-solid fa-trash" size="lg" class="hover:text-rose-600 hover:scale-125 hover:cursor-pointer" @click="deleteArticle($event, article._id)" /></div>
        </div>
         <div class=" text-black h-[60px] truncate"  v-html="article.content"></div>
         <div class="mt-2 flex flex-row justify-between items-center"><div class=" border-2 border-solid border-black p-2">Written By: {{article.authors.empName}}</div>
         <div class="border-2 border-solid border-black hover:cursor-pointer bg-blue-500 text-white font-bold p-2" @click="this.$router.push('/blog/article/'+article._id)">Read Article</div>
         
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
    
   export default{
    data(){
        return{
            articles:[],
            searchTerm:null
        }
    },


    created(){
        var vm  = this;
        var user = this.authStore.getUser;
        var token = this.authStore.getToken;

        var data = new FormData();
        data.append("user", user);
        data.append("token", token);

        axios.post(vm.globalUrl + "getBlogsForUser", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result)=>{
            vm.articles = result.data
        }).catch((error)=>vm.$toast.warning(error))

    },

methods:{
    search(){

        var vm = this;
        var user = this.authStore.getUser;
        var token = this.authStore.getToken;
        var searchTerm = this.searchTerm;


        var data = new FormData();
        data.append("user", JSON.stringify(user))
        data.append("token", token)
        data.append("search", searchTerm)


        axios.post(vm.globalUrl + "getFilteredBlogsForUser", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result)=>{
            vm.articles = result.data;
        }).catch((error)=>vm.$toast.warning(error))

    },


    deleteArticle(event, id){

           var vm = this;
           var token = this.authStore.getToken;
           var id = id

           var data = new FormData();
           data.append("id", id);
           data.append("token", token)

           axios.post(vm.globalUrl + "deleteArticle", data, {
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


    checkUser(){
        var userType = this.authStore.getUser.userType

        if(userType != "normal"){
            return true
        }
    },

    async copy($event, text){
        await navigator.clipboard.writeText(text);
    }
}

   }

   </script>