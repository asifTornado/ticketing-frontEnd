<template>


  <div v-if="sendMailCheck" style="z-index:99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999" class="flex bg-white flex-col w-[350px] h-[300px] fixed bottom-[100px] right-[20px] border border-solid border-black p-[20px] ">
   <div class="flex flex-row w-full sticky top-0 ">Send Report</div>
    <div class="w-full h-full overflow-y-scroll p-[20px]">
    <div class="flex flex-row w-full items-center mb-[10px]" v-for="(user, userCounter) in mailUsers" :key="userCounter"><vss :options="userNames" v-model="mailUsers[userCounter]"/> 
      <font-awesome-icon icon="fa-solid fa-plus" class="ml-2 hover:cursor-pointer" @click="addUser($event, userCounter)" />
      <font-awesome-icon icon="fa-solid fa-minus" class="ml-2 hover:cursor-pointer" @click="removeUser($event, userCounter)" v-if="userCounter != 0"/>
    </div></div>
    <div class="flex flex-row w-full items-center justify-end"><div class="border border-solid border-slate-300 hover:cursor-pointer p-2 mt-4" @click="sendMails()">
      <font-awesome-icon icon="fa-solid fa-arrow-right-long" size="2x"/>    </div></div>
  </div>
  <div style="z-index:999999999999999999999" class="flex font-bold text-white flex-row justify-center items-center w-auto h-auto fixed bottom-[53px] bg-green-500 right-[20px] border border-solid border-black p-[10px] hover:cursor-pointer" @click="sendMailCheck = !sendMailCheck">
    <font-awesome-icon icon="fa-solid fa-envelope" class="mr-3" size="2x"/>
    Send Mails</div>
 
  <div class="flex flex-col justify-center items-start h-[92vh]  w-full overflow-y-scroll " id="report" ref="report">


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">

   <Line />

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">

   <TopTen />

</div>
   

   
<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <Acceptance/>

</div>


   
<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <First/>

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <Resolution/>

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <Current/>

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <Total/>

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <ResponseSLA/>

</div>


<div class="flex flex-row justify-center items-center relative  p-[50px] html2pdf__page-break" style="z-index: 34;">
    
    <ResolutionSLA/>

</div>









  </div>
  


  </template>
  
  <script>
   import { jsPDF } from "jspdf";
   import html2pdf from 'html2pdf.js'
  //  import Vue3Html2pdf from 'vue3-html2pdf'
   import axios from "axios"
   import Line from "../../components/analytics/line.vue"
   import Acceptance from "../../components/analytics/acceptanceTable.vue"
   import First from "../../components/analytics/firstTable.vue"
   import Resolution from "../../components/analytics/resolutionTable.vue"
   import Current from "../../components/analytics/current.vue"
   import Total from "../../components/analytics/total.vue"
   import ResponseSLA from "../../components/analytics/responseSLA.vue"
   import ResolutionSLA from "../../components/analytics/resolutionSLA.vue"
   import TopTen from "../../components/analytics/topTen.vue"
   


   export default{
    data(){
      return {
        tickets:[],
        currentComponent:"Line",
        users:[],
        userNames:[],
        mailUsers:[''],
        sendMailCheck:false
      }
    },
    components:{Line, Acceptance, First, Resolution, Current, Total, ResponseSLA, ResolutionSLA, TopTen},
    
    created(){
      this.getUsers();
    },

    // components:{html2pdf},

    methods:{
      switchComponent(event, Line){
        var vm = this;
        vm.currentComponent = Line;
      },

      addUser(event, counter){
        this.mailUsers.splice(counter + 1, 0, '')

      },

      removeUser(event, counter){
        this.mailUsers.splice(counter, 1)
      },

      getUsers(){
        var vm = this;
        var token = this.authStore.getToken;

        var data = new FormData();
        data.append("token", token)

        axios.post(vm.globalUrl + "getUsers", data).then((result)=>{
          var userNames = result.data.map((user)=>user.empName)
          vm.userNames = userNames
          vm.users = result.data
        }).catch((error)=>vm.$toast.warning(error))
      },


      setUser(value){
        var user = this.users.filter(user=>user.empName == value)[0]

      },

      sendMails(){
        var vm = this;
        vm.$toast.info("sending reports")


       var users = []

       for(var user of vm.users){
        for(var mailUser of vm.mailUsers){
          if(user.empName == mailUser){
            users.push(user)
          }
        }
       }

      


        var elem = document.getElementById("report");

        var pdf;

        var options = {  jsPDF: {
        
        format: 'letter',
        orientation: 'landscape'
    }}

        html2pdf().from(elem).set(options).toPdf().output('blob').then((result) => {
          console.log("this is the pdf")
        console.log(result)
        var data = new FormData();
        data.append("users", JSON.stringify(users))
        data.append("pdf", result, "pdfFile")

        axios.post(vm.globalUrl + "sendReport", data).then((result)=>{
          console.log(result)
          vm.$toast.clear()
          vm.$toast.success("reports send")
        }).catch((error)=>console.log(error))
});
      
     
       
       


      },


  getPdf() {
  // Create a new jsPDF instance
  var pdf = new jsPDF();

  // Get the HTML content you want to convert
  const element = document.getElementById('report'); // Replace with the ID of the element you want to convert

  // Options for pdf.fromHTML method (you can customize these as needed)
  const options = {
    margin: 10,
    pagesplit: true
  };

  var pdfObject;

  // Convert HTML to PDF
 pdf.html(element);
 var blob = new Blob([pdf.output("blob")], { type: "application/pdf" })

return blob
}




      
    }



   }
    
  </script>
  