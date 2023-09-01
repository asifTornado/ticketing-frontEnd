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

import VueAwesomePaginate from "vue-awesome-paginate";
import Pagination from './components/pagination.vue'
import DepartmentReport from './components/departmentReport.vue'




// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import 'mavon-editor/dist/css/index.css'
// import {quillEditor} from 'vue3-quill'

import 'suneditor/dist/css/suneditor.min.css' 



// import VueLodash from 'vue-lodash'
// import lodash from 'lodash'

import { gsap } from 'gsap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CKEditor from '@ckeditor/ckeditor5-vue';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"


import VueApexCharts from "vue3-apexcharts";








import App from './App.vue'


import TooltipComponent from './Tooltip.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'

/* import font awesome icon component */
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {mapStores} from 'pinia'
import {useAuthStore} from './stores/authentication'
import {useMainStore} from './stores/store'
import { VueSignalR } from '@dreamonkey/vue-signalr'
import { useNotificationStore } from './stores/notification'
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

import select2 from '@vueform/multiselect'

import ToastPlugin from 'vue-toast-notification';
import '../node_modules/vue-toast-notification/dist/theme-sugar.css'
import { Tooltip } from 'chart.js'

library.add(fas)
library.add(far)



const app = createApp(App) 

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layers-text', FontAwesomeLayersText)
app.component("star", vue3StarRatings);
app.component("ClearButton", ClearButtton)

app.component('vss', select2)
app.component("Popper", Popper)
app.component("Pagination", Pagination)

app.component('tabs', Tabs);
app.component('tab', Tab);
app.component("DepartmentReport", DepartmentReport)


function downloadExcel() {
  // Your list of JSON objects
var dataList = this.mainStore.getFilteredTickets

  // Convert JSON to an array of arrays (2D array) representing the Excel data
  const excelData = this.convertToExcelData(dataList);

  // Create a new workbook
  const workbook = this.XLSX.utils.book_new();

  // Add a worksheet to the workbook
  const worksheet = this.XLSX.utils.aoa_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate Excel file blob
  const excelBuffer = this.XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.xlsx');

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};


  function convertToExcelData(dataList) {
  const headers = Object.keys(dataList[0]);
  const data = dataList.map((item) => Object.values(item));
  return [headers, ...data];
};



app.config.globalProperties.axios = axios;
app.config.globalProperties.XLSX = XLSX;
app.config.globalProperties.downloadExcel = downloadExcel;
app.config.globalProperties.convertToExcelData = convertToExcelData;


const pinia = createPinia();
pinia.use(piniaPluginPersistedState)


// app.use(quillEditor)
app.use(pinia)
app.use(ToastPlugin)
app.use(VueApexCharts)
app.use(CKEditor)
app.use(VueCollapsiblePanel)
app.use(VueAwesomePaginate)
app.component("Tooltip", TooltipComponent)
app.component("FilterButton", FilterButton)
app.component("FilterDrawer", FilterDrawer)
app.component("NotificationDrawer", NotificationsDrawer)




// app.use(VueLodash, { name: 'custom' , lodash: lodash })

app.config.globalProperties.$gsap = gsap;



app.mixin({

    data(){
        return{
          globalUrl:"http://localhost:5000/",
          frontUrl :"http://localhost:5173/",
          users:[],
          tickets:[]
     
        }
    },

   

    computed:{
        ...mapStores(useAuthStore, useMainStore, useNotificationStore)
    },
    methods:{
        logout(){
            this.authStore.setUser(null);
            this.authStore.setToken(null);
            this.$router.push('/login')
        },

        setPriority(event, ticket){
               
          var vm = this;
          vm.$toast.info("Setting Priority")
          var data = new FormData();
          var priority = event.target.value;
          data.append("priority", priority)
          data.append("id", ticket._id)
          axios.post(vm.globalUrl + 'setPriority', data).then((result)=>{
             vm.priority = result.data
             vm.$toast.clear()
             vm.$toast.success("Priority Set")
          }).catch((error)=>vm.$toast.warning(error))
    },


    setTicketType(event, ticket){
      var vm = this;
      vm.$toast.info("Setting Ticket Type")
      var data = new FormData();
      var type = event.target.value;
      data.append("ticketType", type)
      data.append("id", ticket._id)
      axios.post(vm.globalUrl + 'setTicketType', data).then((result)=>{
         vm.ticketType = result.data
         vm.$toast.clear()
         vm.$toast.success("Ticket Type Set")
      }).catch((error)=>vm.$toast.warning(error))
    },


        loadCurrentRequests(notification){
            console.log("from inside loadCurrentRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
            axios.post(this.globalUrl+ "getCurrentRequests", data).then((result)=>{
          
              vm.mainStore.setRequests(result.data.requests);
                
              console.log(result.data);
              vm.$router.push('/currentRequests/view/' + notification.eventId)
  
              }
              ).catch((error)=>{console.log(error)})
        },

        loadAllRequests(notification){
            console.log("from inside loadAllRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
            
            axios.post(vm.globalUrl + "getCurrentRequestsForAdmin", data).then((result)=>{
            
                vm.mainStore.setRequests(result.data)
           
            }).catch((error)=>{
                console.log(error);

            })
        },

        loadMyRequests(notification){
            console.log("from inside loadMyRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
          
			axios.post(vm.globalUrl + "getMyRequests", data).then(function(response){
	

          vm.mainStore.setRequests(response.data.myRequests)
				console.log(response.data);

            if(notification.event == "Approved"){
                vm.$router.push('/myRequests/notRejected/' + notification.eventId)
            }else if(notification.event == "Rejected"){
                vm.$router.push('/myRequests/Rejected/' + notification.eventId)

            }

                     
          
        }


        
				
			).catch(function(error){
			   console.log(error);
			});
        },


        getNotifications(){
            var token = this.authStore.getToken;
            var user = this.authStore.getUser;
            var data = new FormData();
            data.append("token", token);
            data.append("user", JSON.stringify(user))
            console.log("from get notifications")
            var vm = this;
            axios.post(vm.globalUrl + 'getNotifications', data).then((result) =>{ 
            console.log("these are the get notifications data")
            console.log(result.data)
            vm.notificationStore.setNotifications(result.data);
            console.log("these are the data");
            console.log(result.data)
            console.log("this are the notifications")
            var notifications  = vm.notificationStore.getNotifications
             console.log(notifications)
        
        }).catch((error)=>console.log(error))
          },



          sendPostRequest(url) {
            axios.post(url, {
              // Optional data payload
              // You can modify this object or remove it if you don't need to send any data
              key: 'value'
            })
            .then(response => {
              // Open the response in a new tab
              const newTab = window.open('', '_blank');
              newTab.document.write(response.data);
              newTab.document.close();
            })
            .catch(error => {
              // Handle the error if the POST request fails
              console.error(error);
            });
          },


          getApprovers(){
            var vm = this
            var token = this.authStore.getToken
            var data = {
                token
            }
          axios.post(vm.globalUrl + 'getUsers', data).then(function(response){
          vm.users = response.data;
          
          
          console.log(response.data)}
          
          ).catch(function(error){
          console.log(error);
          });
          },


       


    }
})


app.use(router)

app.mount('#app')
