
<template class="h-[92vh] w-full bg-gray-200">


  <Topbar class="sticky top-0 z-20 noprintheader p-3 shadow-md shadow-black" @drawer="toggleDrawer()" @faq="toggleFaq()" /> 
  
  <div class="flex flex-row h-[92vh]" >
    <NotificationDrawer/>
    <Drawer ref="drawer" @cancel="toggleDrawer()" />
      <div class="h-[100%] w-full   z-10" >
        <RouterView class="h-[100%] w-full z-0 bg-white " />
        </div>
  </div>
</template>


<script >
import { RouterLink, RouterView } from 'vue-router'
import Topbar from './components/topBar.vue'



export default{
  data(){
    return{
      drawer:false,
      user:null,
      
    }
  },

  

  components:{RouterLink, RouterView, Topbar},

  methods:{



    toggleDrawer(){
      if(!this.drawer){
        var user = this.authStore.getUser;
        this.user = user
        this.drawer = true;
        this.$refs.drawer.open();
        }else if(this.drawer){
          this.$refs.drawer.close();
          this.drawer = false;
        }
    },

  
  }
}




</script>


<style scoped>

*{
 font-family: Arial, Helvetica, sans-serif;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}




</style>



<style>
@media print {
   .noprint {
      visibility: hidden;
      display:none;
   }

   .noprintheader{
    
    position:relative;
  
   }
}





*{
  font-size: small;
}


</style>


<style src="../node_modules/@vueform/multiselect/themes/default.css"></style>
