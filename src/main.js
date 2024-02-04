import './index.css'
import axios from 'axios'
import vue3StarRatings from "vue3-star-ratings";
import * as XLSX from 'xlsx'
import FilterButton from "../src/components/filterButton.vue"
import FilterDrawer from "../src/components/filterDrawer.vue"
import NotificationsDrawer from '../src/components/notificationsDrawer.vue'
import Popper from "vue3-popper";
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import ClearButtton from './components/clearButton.vue'
import Treeselect from 'vue3-treeselect'
import VueAwesomePaginate from "vue-awesome-paginate";
import Pagination from './components/pagination.vue'

import {VueHeadMixin, createHead } from '@unhead/vue'
import {ref} from 'vue';
import DialogService from 'primevue/dialogservice';








import "vue-awesome-paginate/dist/style.css";










import { gsap } from 'gsap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedState from "pinia-plugin-persistedstate"


import VueApexCharts from "vue3-apexcharts";








import App from './App.vue'


import TooltipComponent from './Tooltip.vue'
import router from './router'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'


import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'


import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {mapStores} from 'pinia'
import {useAuthStore} from './stores/authentication'
import {useMainStore} from './stores/store'
import { VueSignalR } from '@dreamonkey/vue-signalr'
import { useNotificationStore } from './stores/notification'
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import 'vue3-treeselect/dist/vue3-treeselect.css'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";

import select2 from '@vueform/multiselect'

import ToastPlugin from 'vue-toast-notification';
import '../node_modules/vue-toast-notification/dist/theme-sugar.css'
import { Tooltip } from 'chart.js'

library.add(fas)
library.add(far)

const head = createHead()

const app = createApp(App) 

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layers-text', FontAwesomeLayersText)
app.component("star", vue3StarRatings);
app.component("ClearButton", ClearButtton)
app.component("TreeSelect", Treeselect)

app.component('vss', select2)
app.component("Popper", Popper)
app.component("Pagination", Pagination)

app.component('tabs', Tabs);
app.component('tab', Tab);




function downloadExcel() {

var dataList = this.mainStore.getFilteredTickets

 
  const excelData = this.convertToExcelData(dataList);


  const workbook = this.XLSX.utils.book_new();


  const worksheet = this.XLSX.utils.aoa_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

 
  const excelBuffer = this.XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

 
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.xlsx');


  document.body.appendChild(link);
  link.click();


  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};


  function convertToExcelData(dataList) {
  const headers = Object.keys(dataList[0]);
  const data = dataList.map((item) => Object.values(item));
  return [headers, ...data];
};




app.config.globalProperties.XLSX = XLSX;
app.config.globalProperties.downloadExcel = downloadExcel;
app.config.globalProperties.convertToExcelData = convertToExcelData;


const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(head)

app.use(pinia)
app.use(ToastPlugin)
app.use(VueApexCharts)

app.use(VueCollapsiblePanel)
app.use(VueAwesomePaginate)
app.use(PrimeVue)
app.use(DialogService);

app.component("Tooltip", TooltipComponent)
app.component("FilterButton", FilterButton)
app.component("FilterDrawer", FilterDrawer)
app.component("NotificationDrawer", NotificationsDrawer)
app.component('QuillEditor', QuillEditor)






app.config.globalProperties.$gsap = gsap;
app.config.globalProperties.$globalUrl = 'http://localhost:5000/'

const globalStore = {
  globalUrl:ref("http://localhost:5000/"),
  toast:ref(app.config.globalProperties.$toast)
}


app.provide('globalStore', globalStore);


 


app.use(router)

app.mount('#app')
