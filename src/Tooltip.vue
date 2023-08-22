<template>
<div class="relative w-auto h-auto">
<font-awesome-icon icon="fa-solid fa-question" size="2x" @click="showHelp" class="hover:cursor-pointer"/>
<div class=" w-auto p-1 bg-gray-500 text-white" style="display:none; z-index: 9999999; position: absolute; top:-60px; left:30px" ref="help">
    <div class="flex flex-row justify-end items-center">
        <font-awesome-icon icon="fa-solid fa-window-close" class="hover:cursor-pointer" @click="showHelp"/>
    </div>
  <div class="mx-3 my-1">  {{ message }}</div>
</div>
</div>    


    


</template>


<script>
export default{
    data(){
        return{
            show:false

        }
    },

    props:["message"],

    methods:{
        showHelp(){
            if(this.show == false){
                this.$refs.help.style.display = 'block'
                this.show = true
            }else{
                this.$refs.help.style.display = 'none'
                this.show = false
            }
        }
    }
}



</script>