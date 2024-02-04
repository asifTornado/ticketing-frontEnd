<template>

<div class="w-full flex flex-row h-screen pt-[50px] ">
<div class="h-screen"><SideBar /></div>
<RouterView  />
</div>

</template>


<script>

import { RouterLink, RouterView } from 'vue-router'
import SideBar from '../components/ticketing/sideBar.vue'


export default{
    data(){
        return {

        }
    },

    components:{RouterLink, RouterView, SideBar}
}





</script>