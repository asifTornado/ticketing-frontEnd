<template >
    

    <div class="w-full h-full px-10 ml-[30px] mt-[10px]">
  <div class="flex flex-row justify-center items-center bg-gray-300 p-4 rounded-md">  <label class="text-black text-4xl font-bold">Insert Article</label></div>
    






<div class="flex flex-col w-full  h-auto">

<div class="flex flex-col my-10">
    <label class="text-4xl font-bold mb-2">Headline</label>
    <input class="border-2 border-gray-400 border-solid p-3" type="text" v-model="headline" placeholder="Insert Article Headline" id="">
</div>

<label class="text-2xl font-bold">Article</label>

<div class=" bg-white" id="editor" >
  <QuillEditor :options="options" v-model:content="content" contentType="html" />
 

</div>


<div class="flex flex-row justify-end items-center mr-10 mt-20 ">
    
    <div class="bg-emerald-500 text-white font-bold p-4 rounded-md hover:cursor-pointer" @click="insertArticle">Insert</div>
</div>




<div>

</div>


</div>

    
    </div>
    
    </template>
    
    
    <script >
    import axios from "axios"
  

    
   export default{
    data(){
        return{
            content: '<p>2333</p>',
      _content: '',
      editorOption: {
        placeholder: 'core',
        modules: {
        
        },



      },
      disabled: false,
      token:null,
      headline:null
        }
    },



  created(){
     this.token = this.authStore.getToken
  },

  methods:{
    insertArticle(){
        var vm = this;
        var user = this.authStore.getUser;
        var token = this.authStore.getToken;
        var content = this.content;
        var headline = this.headline;

        var data = new FormData();
        data.append("user", user)
        data.append("token", token)
        data.append("content", content)
        data.append("headline", headline)

        axios.post(vm.globalUrl + "createBlog", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then((result)=>{
            if(result.data == true){
                vm.content = ''
                vm.headline = ''
            }else{
                vm.$toast.warning(result.data)
            }
        }).catch((error)=> vm.$toast.warning(error))

    }
  }

}




    



   </script>




