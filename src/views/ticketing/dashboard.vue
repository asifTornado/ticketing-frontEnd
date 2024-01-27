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




  <div class="noprint fixed top-[153px] p-[10px] font-bold text-white hover:cursor-pointer flex flex-row  right-[20px]  bg-red-500 border border-solid border-black" @click="printPage">
    <font-awesome-icon icon="fa-solid fa-print" class="mr-3" size="2x"/>
Print
  </div>
  <div v-if="!sendMailCheck" style="z-index:999999999999999999999" class="noprint flex font-bold text-white flex-row justify-center items-center w-auto h-auto fixed bottom-[53px] bg-green-500 right-[20px] border border-solid border-black p-[10px] hover:cursor-pointer" @click="sendMailCheck = !sendMailCheck">
    <font-awesome-icon icon="fa-solid fa-envelope" class="mr-3" size="2x"/>
    Send Mails
  </div>
  <div v-if="sendMailCheck" style="z-index:999999999999999999999" class="flex font-bold text-white flex-row justify-center items-center w-auto h-auto fixed bottom-[53px] bg-rose-500 right-[20px] border border-solid border-black p-[10px] hover:cursor-pointer" @click="sendMailCheck = !sendMailCheck">
    <font-awesome-icon icon="fa-solid fa-rectangle-xmark" class="mr-3" size="2x"/>
    Close
  </div>
 
  <div class="flex flex-col justify-center items-start pl-[20px] pt-[2600px] h-full  w-full  " id="report" ref="report" style="background-color: white;">

  <div ref="repeat" class="flex flex-row justify-center items-center relative  p-[50px]  " style="z-index: 34;">
    
    <Repeat/>

</div>

<div ref="line" class="flex flex-row justify-center items-center relative  p-[50px]  " style="z-index: 34; background-color: white;" >

   <Line  />

</div>


<div ref="topTen" class="flex flex-row justify-center items-center relative  p-[50px] " style="z-index: 34;">

   <TopTen />

</div>
   

   
<div ref="acceptance" class="flex flex-row justify-center items-center relative  p-[50px] " style="z-index: 34;">
    
    <Acceptance />

</div>


   
<div ref="first" class="flex flex-row justify-center items-center relative  p-[50px] changePrint " style="z-index: 34;">
    
    <First/>

</div>


<div ref="resolution" class="flex flex-row justify-center items-center relative  p-[50px]  changePrint" style="z-index: 34;">
    
    <Resolution/>

</div>


<div ref="current" class="flex flex-row justify-center items-center relative  p-[50px] changePrint " style="z-index: 34;">
    
    <Current/>

</div>


<div ref="total" class="flex flex-row justify-center items-center relative  p-[50px] " style="z-index: 34;">
    
    <Total/>

</div>


<div ref="responseSlA" class="flex flex-row justify-center items-center relative  p-[50px] " style="z-index: 34;">
    
    <ResponseSLA/>

</div>


<div ref="resolutionSLA" class="flex flex-row justify-center items-center relative  p-[50px] " style="z-index: 34;">
    
    <ResolutionSLA/>

</div>









  </div>
  


  </template>


<script setup>

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
   import Repeat from "../../components/analytics/repeat.vue"
   
   import html2canvas from 'html2canvas';
   import {jsPDF} from 'jspdf';

   import {ref} from "vue"

   import { useTicketStore } from "../../stores/ticket"
   import { useUserStore } from "../../stores/users"
   import { storeToRefs } from "pinia"
   import { useAuthStore } from "../../stores/authentication"
   import { useGlobalStore } from "../../stores/globalStore"


  
    var line = ref(null)
    var topTen = ref(null)
    var acceptance = ref(null)
    var first = ref(null)
    var resolution = ref(null)
    var current = ref(null)
    var responseSLA = ref(null)
    var resolutionSLA = ref(null)
    var repeat = ref(null)


    var sendMailCheck = ref(false)
 
    var {getUsers, addUser, removeUser} = useUserStore()

      getUsers()

   var globalStore = useGlobalStore()
   
   var {tickets} = storeToRefs(useTicketStore())
   var {users, mailUsers, userNames} = storeToRefs(useUserStore())
   var {token, user} = storeToRefs(useAuthStore())
 
   var currentComponent  = ref("Line") 

 


   function switchComponent(event, Line){
       
        currentComponent.value = Line;
      }


    async function generatePDF() {
        const pdf = new jsPDF('l', 'mm', 'letter');
    let isFirstPage = true;

    for (const refName of [line, topTen, acceptance, first, resolution, current, responseSLA, resolutionSLA, repeat]) {
        const element = refName.value;
       
        if (element) {
          var top = element.querySelector("#top");

          if(top){
            top.style.display = 'none'
            var canvas = await html2canvas(element, {
                scale: 3,
                backgroundColor: 'white'
            });
          }else{
            var canvas = await html2canvas(element, {
                scale: 3,
                backgroundColor: 'white'
            });
          }
       

              const imgData = canvas.toDataURL("image/jpeg", 1.0);

              if (!isFirstPage) {
                  pdf.addPage();
              } else {
                  isFirstPage = false;
              }

              const pdfWidth = 297; 
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width ;

              pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

              if(top){
                top.style.display = "block" 
              }
             
        }
    }

    var blob = pdf.output('blob');
    return blob
    }




    async function sendMails(){
  


       var users2 = []

       for(var user of users.value){
        for(var mailUser of mailUsers.value){
          if(user.empName == mailUser){
            users2.push(user)
          }
        }
       }

      


       var elem = document.getElementById("report")

       var pdf =  await generatePDF(elem);
        
        

 

   
 
    
        var data = new FormData();
        data.append("users", JSON.stringify(users2))
        data.append("pdf", pdf)

        axios.post(globalStore.globalUrl + "sendReport", data, {
  headers: {
    'Authorization': `Bearer ${token}`,
 
  }
}).then((result)=>{
    
     
        }).catch((error)=>	console.log(error))

      
     
       
       


      }



  function saveAsHTML() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  
}




async function generatePDFForViewing() {
    const pdf = new jsPDF('l', 'mm', 'letter');
    let isFirstPage = true;

    for (const refName of [line, topTen, acceptance, first, resolution, current, responseSLA, resolutionSLA, repeat]) {
        const element = refName.value;
     
        if (element) {
            var top = element.querySelector("#top");

            if(top){
                top.style.display = 'none'
                var canvas = await html2canvas(element, {
                    scale: 3,
                    backgroundColor: 'white'
                });
            }else{
              var canvas = await html2canvas(element, {
                    scale: 3,
                    backgroundColor: 'white'
                });
            }

            const imgData = canvas.toDataURL("image/jpeg", 1.0);

            if (!isFirstPage) {
                pdf.addPage();
            } else {
                isFirstPage = false;
            }

            const pdfWidth = 297; 
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width ;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            if(top){
                top.style.display = "block" 
            }
        }
    }

    // Get the PDF as a data URI string
    const dataURI = pdf.output('datauristring');

    const pdfWindow = window.open("", "_blank");
pdfWindow.document.write(`
    <iframe 
        width='100%' 
        height='100%' 
        frameborder='0' 
        border='0' 
        src='${dataURI}'>
    </iframe>
`);
};


async function printPage(){
  await generatePDFForViewing();
}

</script>
  
  