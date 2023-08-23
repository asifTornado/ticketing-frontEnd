<template>

<div class="w-full flex flex-row h-auto">
<div class="h-auto "><SideBar /></div>
<RouterView />
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