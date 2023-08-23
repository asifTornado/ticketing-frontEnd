import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'
import mkcert from 'vite-plugin-mkcert'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico"],
  manifest:{
    name:"Ticketing",
    short_name: "Ticketing",
    description: "Help Desk Ticketing System for Hameem Group",
    icons:[
      {
        src:"/assets/assigned.svg",
        sizes:"512x512",
        type:'image/svg'
      }
    ],

    theme_color:"#171717",
    background_color:"#e8ebf2",
    display:"standalone",
    scope:"/client",
    start_url:"/client",
    orientation:'portrait'
  },

 
};

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir: 'C:/Users/DELL/source/repos/Eapproval/Eapproval/wwwroot'
  },
  plugins: [vue(), vueJsx(),   VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
