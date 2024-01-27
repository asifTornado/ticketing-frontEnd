import { defineStore } from "pinia";
import {ref, computed} from "vue";
import {useToast} from 'vue-toast-notification';

export const useGlobalStore = defineStore("global", () => {
  
     var globalUrl = ref("http://localhost:5000/")

     var frontUrl = ref("http://localhost:5173/")

     return {
        globalUrl, frontUrl
     }


});