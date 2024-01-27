import { defineStore, storeToRefs } from "pinia";
import {ref, computed} from 'vue'
import {useAuthStore} from './authentication'
import { useGlobalStore } from "./globalStore";
import * as XLSX from 'xlsx';
import axios from "axios";
import { useTeamStore } from "./team";
import { useUserStore } from "./users";
import {useToast} from 'vue-toast-notification';
import Fuse from 'fuse.js'

export const useTicketStore = defineStore("tickets", () => {

    var globalStore = useGlobalStore()
    var tickets = ref([])
    var toast = useToast()

    var ticket = ref({
        department:'',
        problemDetails:'',
        approvalRequired:false,
        raisedFor:'Not Required',
        remarks:'',
        serviceType:'',
        type:'problem',
        location:'',
        phone:'',
        extension:'',
        email:'',
        repeat:false,
        timesRaised:1,
        genesis:true,
        genesisId:null,

    })
    var details = ref([])
   

    var searchCheck = ref(false)
    var filteredTickets = ref([])
    var closedTickets = ref([])
    var initialTickets = ref([])
    var unassigned = ref([])
    var assigned = ref([])
    var approval = ref([])
    var my = ref([])
    var closeRequestsForMe = ref([])
    var myCloseRequests = ref([])
    var info = ref([])
    var reject = ref([])
    var infoMe = ref([])
    var sort = ref(["Priority 6", "Priority 5", "Priority 4", "Priority 3", "Priority 2", "Priority 1"])
    var mentions = ref([])
    var selectedItem = ref("my")
    var itemsPerPage = ref(10)
    var currentPage = ref()
    var support = ref([])
    var teams = ref([])
    var locations = ref([])
    var timePassed = ref('')
    var passedTime = ref('')
    var paginator = ref(null)
    var accepted = ref([])
    var value = ref('')
    var type = ref('')
    var prevAssignee = ref('')
    var categoryCheck = ref(false)
    var files = ref([])
    var helpCheck = ref(false)
    var value = ref('')
    var ticketsAll = ref([])
    var proceedCheck = ref(false)
    var leaderCheck = ref(false)
    var comment = ref('')
    var {team, hasService} = storeToRefs(useTeamStore())
    
    var {user, token} = storeToRefs(useAuthStore())
    var {users} = storeToRefs(useUserStore())
    var main = ref(null)
    var authStore = useAuthStore()

    

    var sortedTickets = computed(()=>{

        console.log("these are the filtered tickets")
        console.log(filteredTickets.value)

        var tickets2 = filteredTickets.value

        console.log("these are the tickets 2")
        console.log(tickets2)

        tickets2.sort(comparator)

        return tickets2
    })







    



    function comparator(a, b){
        var index1 = sort.value.indexOf(a.priority)
        var index2 = sort.value.indexOf(b.priority)
        return index1 - index2
    }


    function getTickets(){
      
              if(user.value){
                var data = new FormData();
                    data.append("token", token.value);
                    data.append("user", JSON.stringify(user.value));


                    var url = ""
                  
                    if(user.value.userType == "Ticket Manager (Department)"){
                        url = "getTicketsForMonitors"
                    }else{
                        url = "getTickets"
                    }

                    console.log("this is the user Type")
                    console.log(user.value.userType)

                   axios.post(globalStore.globalUrl + url, data).then((result)=>{

                    tickets.value = result.data.filter((ticket) => ticket.status != 'Closed Ticket')
                    filteredTickets.value = tickets.value
                    initialTickets.value = tickets.value
                   
                    unassigned.value = tickets.value.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.status != 'Submitted Ticket - Seeking Supervisor Approval')
                    accepted.value = tickets.value.filter((ticket)=>ticket.currentHandler && ticket.currentHandler.mailAddress == user.mailAddress && ticket.accepted == true && ticket.assigned == true && ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress)
                    assigned.value = tickets.value.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.accepted == false)
                    approval.value = tickets.value.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
                 //    vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.madeCloseRequest == true && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress);
                    info.value = tickets.value.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)
                    getSupport()
                   }).catch((error)=>{
                    console.log(error)
                   })
                       
                      
         

              }
                    
               
                        
                 

                
    }


   function getTickets2(){
           
     
           var data = new FormData()
           data.append("token", token.value);
           data.append("user", JSON.stringify(user.value));

      
            axios.post(globalStore.globalUrl + "getTickets2", data).then((result)=>{
               console.log("these are the data")
               console.log(result.data)

                tickets.value = result.data.filter((ticket)=>ticket.raisedBy.mailAddress == user.mailAddress)
                filteredTickets.value = tickets.value
  
                mentions.value = result.data.filter((ticket)=>{
                  if(ticket.mentions){
                      for(var mention of ticket.mentions){
                          
                         if(mention == user.empName){
                          return true
                         }
                      }
                  }
                 })
  
                 unassigned.value = tickets.value.filter((ticket)=>ticket.status != "Rejected" && ticket.assignedTo == null && ticket.status != "Closed Ticket")
                 assigned.value = tickets.value.filter((ticket)=> ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.status != "Closed Ticket")
                 info.value = tickets.value.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)
                 approval.value = result.data.filter((ticket)=>ticket.currentHandler  && ticket.currentHandler.mailAddress == user.mailAddress && ( ticket.status == 'Ticket Submitted - Seeking Additional Approval'  || ticket.status == "Ticket Submitted - Seeking Department Head's Approval"));
                 closeRequestsForMe.value = tickets.value.filter((ticket)=>ticket.currentHandler && ticket.currentHandler && ticket.currentHandler.mailAddress == user.mailAddress && ticket.madeCloseRequest == true);
                 my.value = tickets.value.filter((ticket)=> ticket.raisedBy.mailAddress == user.mailAddress );
                 infoMe.value = result.data.filter((ticket)=>ticket.currentHandler &&  ticket.currentHandler.mailAddress == user.mailAddress && ticket.status == "Open (Seeking Information...)");
                 reject.value = tickets.value.filter((ticket)=>!ticket.currentHandler && ticket.raisedBy.mailAddress == user.mailAddress && ticket.beenRejected == true)
                 closedTickets.value = tickets.value.filter((ticket)=>ticket.raisedBy.mailAddress == user.mailAddress && ticket.status == "Closed Ticket")

            }).catch((error)=>{
                console.log(error)
            })
             
           

    }



    async function getTickets3(){
           
      
        var data = new FormData()
        data.append("token", token.value);
        data.append("user", JSON.stringify(user.value));


        axios.post(globalStore.globalUrl + "getTickets2", data).then((result)=>{

            console.log("these are the results")
            console.log(result.data)
            tickets.value = result.data
            filteredTickets.value = tickets.value
 
            mentions.value = result.data.filter((ticket)=>{
              if(ticket.mentions){
                  for(var mention of ticket.mentions){
                      
                     if(mention == user.empName){
                      return true
                     }
                  }
              }
             })
             console.log("calling from inside the store")
             unassigned.value = tickets.value.filter((ticket)=>ticket.status != "Rejected" && ticket.assignedTo == null && ticket.status != "Closed Ticket")
             console.log("these are the unassigned tickets")
             console.log(unassigned.value)
             assigned.value = tickets.value.filter((ticket)=> ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.status != "Closed Ticket")
             approval.value = tickets.value.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
             // vm.myCloseRequests = vm.tickets.filter((ticket)=>ticket.madeCloseRequest == true && ticket.prevHandler && ticket.prevHandler.mailAddress ==user.mailAddress);
             info.value = tickets.value.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)

        }).catch((error)=>console.log(error))
          
     

 }


 function getTickets4(){
    
    var newUser = user.value;
    var data = new FormData();
    
    data.append("token", token);
    data.append("user", JSON.stringify(newUser));
    axios.post(globalStore.globalUrl + 'getTickets2', data, {
       headers: {
      'Authorization': `Bearer ${token.value}`,

        }
      }).then((result)=>{

    assigned.value = result.data.filter((ticket)=> ticket.assignedTo && ticket.assignedTo.mailAddress == user.value.mailAddress && ticket.currentHandler != null && ticket.status != "Closed Ticket")

}).catch((error)=>{
 console.log(error)
})

  
 }


 function getTickets5(){

   console.log("from get tickets 5")
 

  
    var data = new FormData();
    data.append("token", token.value);
    data.append("user", JSON.stringify(user.value));
    axios.post(globalStore.globalUrl + 'getAllTickets', data).then((result)=>{
       console.log("after getting results")
       tickets.value = result.data
       console.log(1)
       paginator.value.onClickHandler(1)
       console.log(2)
       filteredTickets.value = tickets.value
       initialTickets.value = tickets.value
       unassigned.value = tickets.value.filter((ticket)=>ticket.assigned == false && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.status != 'Submitted Ticket - Seeking Supervisor Approval')
       accepted.value = tickets.value.filter((ticket)=>ticket.currentHandler && ticket.currentHandler.mailAddress == user.mailAddress && ticket.accepted == true && ticket.assigned == true && ticket.assignedTo && ticket.assignedTo.mailAddress == user.mailAddress)
       assigned.value = tickets.value.filter((ticket)=>ticket.assigned == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler != null && ticket.accepted == false)
       approval.value = tickets.value.filter((ticket)=>ticket.higherApprover  && ticket.ticketingHead && ticket.currentHandler  && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.currentHandler.mailAddress == ticket.higherApprover.mailAddress)
       myCloseRequests.value = tickets.value.filter((ticket)=>ticket.status == "Closed Ticket");
       info.value = tickets.value.filter((ticket)=>ticket.ask == true && ticket.ticketingHead && ticket.ticketingHead.mailAddress == user.mailAddress && ticket.prevHandler && ticket.prevHandler.mailAddress == user.mailAddress)
        
       console.log("before calling get Support")
       getSupport();

    }).catch((error)=>{
      
    })
 }


   function getSupport(){
  console.log("from get support")
  

    var data = new FormData();

    data.append("user", JSON.stringify(user.value))
    data.append("token", JSON.stringify(token.value))


    var url = ""

    if(user.userType == "Ticket Manager (Department)"){
        url = "getSupportForDepartmentHead"
    }else if(user.userType == "leader"){
        url = "getSupportFromHead"
    }else{
        url = "getAllSupport"
    }


   
      axios.post(globalStore.globalUrl + url, data).then((result)=>{

        if(result.data){
            console.log("these are the support again")
            console.log(result.data)
            support.value = result.data.filter((item) => item.location == user.value.location)
            console.log("these are the initialized support")
            console.log(support.value)
        }

      }).catch((error)=>console.log(error))

   
        
    }


    function  setPriority(event, ticket){
               
  
        var data = new FormData();
        var priority = event.target.value;
        data.append("priority", priority)
        data.append("id", ticket._id)
        axios.post(globalStore.globalUrl + 'setPriority', data).then((result)=>{
           priority.value = result.data
          
        }).catch((error)=>console.log(error))
  }


    function setTicketType(event, ticket){
        toast.info("setting ticket type...")
        var data = new FormData();
        var type = event.target.value;
        data.append("ticketType", type)
        data.append("id", ticket._id)
        axios.post(globalStore.globalUrl + 'setTicketType', data).then((result)=>{
          
          
           vm.ticketType = result.data
           toast.clear()
           toast.success("Ticket Type Set")
        }).catch((error)=>toast.warning(error))
      }
  


  function setLocation(event, id){
         

    toast.info("setting location")
    var location = event.target.value
    var data = new FormData();
    data.append("id", id)
    data.append("location", location)

    console.log("setting location")

    axios.post(globalStore.globalUrl + "setLocation", data).then((result)=>{
     toast.clear()
     toast.success("Location Set")
   
    }).catch((error)=>console.log(error))
}



    function setRowColor(priority){
        if(priority == 'emergency'){
            return "bg-red-100 hover:bg-red-200 hover:cursor-pointer"
        }else if(priority == 'high'){
            return "bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer"
        }else if(priority == 'normal'){
            return "bg-green-100 hover:bg-green-200 hover:cursor-pointer"
        }else if(priority == 'medium'){
            return "bg-orange-100 hover:bg-orange-200 hover:cursor-pointer"
        }else if(priority == null || priority == '' || priority == undefined || priority == 1 || priority == 2 || priority == 3 || priority == 4 || priority == 5){
            return "bg-white hover:bg-gray-200 hover:cursor-pointer"
        }
     }



     
     function selectItem(item) {
        if (selectedItem.value === item) {
          selectedItem.value = null; 
        } else {
          selectedItem.value = item; 
        }
      }


      function getSelectedItem(){
        if(selectedItem.value == 'my'){
           return "My Issues"
        }else if(selectedItem.value == "close"){
           return "Close Requests For Me"
        }else if(selectedItem.value == "info"){
           return "Information Requested From Me"
        }else if(selectedItem.value == "approval"){
           return "Issues Requiring My Approval"
        }else if(selectedItem.value == "mention"){
           return "Issues Where I Am Mentioned"
        }else if(selectedItem.value == "closedTickets"){
           return "My Closed Issues"
        }else if(selectedItem.value == "unassigned"){
            return "Unassigned Issues"
        }else if(selectedItem.value == "assigned"){
            return "Assigned Issues"
        }else if(selectedItem.value == "info2"){
            return "Issues Awaiting Information"
        }else if(selectedItem.value == "all"){
            return "All Tickets"
        }
     }



     function filter(event, type){

   
        
        selectItem(type);
        
        switch(type){

            case "all":
                console.log("from case all")
                filteredTickets.value = tickets.value
                initialTickets.value = tickets.value
                console.log(filteredTickets.value)

                break;

            case "my":
                
                filteredTickets.value = my.value
                initialTickets.value = my.value
            
                break;
            case "close":
                filteredTickets.value = closeRequestsForMe.value
                initialTickets.value = closeRequestsForMe.value

                break;

            case "unassigned":
                filteredTickets.value = unassigned.value
                initialTickets.value = unassigned.value
                
                break;

            case "assigned":
                filteredTickets.value = assigned.value
                initialTickets.value = assigned.value

                break;
            case "info":
                filteredTickets.value = infoMe.value
                initialTickets.value = infoMe.value
               
                break;
            case "approval":
                filteredTickets.value = approval.value
                initialTickets.value = approval.value
          
                break;
            case "mention":
                filteredTickets.value = mentions.value
                initialTickets.value = mentions.value
         
                break;
            case "closedTickets":
                filteredTickets.value = closedTickets.value
                initialTickets.value = closedTickets.value
             
                break;

            case "info2":
                filteredTickets.value = info.value
                initialTickets.value = info.value
        
        }
        }



        function handlePageChanged(page){
             currentPage.value = page;
        }


        function showDetails(id){
            const baseUrl = globalStore.frontUrl
            const componentUrl = "#/ticketing/ticketDetails/" + id;
            const fullPath = baseUrl + componentUrl
            
        
            window.open(fullPath, '_blank');
        }


        function convertToExcelData(dataList) {
            const headers = Object.keys(dataList[0]);
            const data = dataList.map((item) => Object.values(item));
            return [headers, ...data];
          }



        function downloadExcel() {
            
            toast.info("downloading excel file")
            var dataList = filteredTickets.value
          
              
              const excelData = convertToExcelData(dataList);
          
          
              const workbook = XLSX.utils.book_new();
          
              
              const worksheet = XLSX.utils.aoa_to_sheet(excelData);
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          
              const excelBuffer = XLSX.write(workbook, {
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
    toast.success("Done")

   
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

            }



            function getTeams(){
           
             
                var userMail = user.mailAddress;
            
                var data = new FormData();
                data.append("token", token.value)
                data.append("user", user.value.mailAddress)
    
                if(user.userType == "leader"){
                  axios.post(globalStore.globalUrl +"getTeamsForLeaders", data).then((result)=>{
                    teams.value = result.data
                }).catch((error)=>toast.warning(error))
                }else{
                  axios.post(globalStore.globalUrl +"getTeams", data).then((result)=>{
                    teams.value = result.data
                }).catch((error)=>toast.warning(error))
                }
               
         
            
              }


        function getLocations(){
           
                axios.get(globalStore.globalUrl + "getLocations").then((result)=>{
                 locations.value = result.data
                }).catch((error)=>console.log(error))
                
         }


        function ticketReset(ticket){
                toast.info("Reseting Ticket")
                ticket.priority = ticket.initialPriority
                ticket.location = ticket.initialLocation
                ticket.ticketType = ticket.initialType
                ticket.currentHandler = null;
                ticket.assignedTo = null;
            
               
                
                
            
                var data = new FormData();
            
                data.append("user", JSON.stringify(user.value))
                data.append("token", JSON.stringify(token.value))
                data.append("ticket", JSON.stringify(ticket))


      
            axios.post(globalStore.globalUrl + "updateTicket", data).then((result)=>{
                    if(result.data != false){
                        getTickets5()
                        toast.clear()
                        toast.success("Success")
                    }
            
                }).catch((error)=>{
                    console.log(error)
                })
             
      
            
       
    
         }


         function cancelDepartmentReassign(){
          
            
            categoryCheck.value = false;
          
          }



        function setFile(event){
            for(var x of event.target.files){
                files.data.push(x)
            }
        }

        function removeFile(counter){
            files.data.splice(counter, 1)
        }




        function submit(){
                 
               toast.info("Submitting Ticket please wait")

                if (proceedCheck.value == false) {

                                           var currentTime = new Date();
                                           var timePassed2 =   Math.abs(currentTime.getTime() - timePassed.value.getTime())
                                         if(timePassed2 <  60000){
                                            toast.info("please wait for a while before raising another ticket")
                                             return
                                          }


                        if(ticket.value.email == '' || ticket.value.email == "null" || ticket.value.email == "undefined" || ticket.value.email  == undefined || ticket.value.email == null ){
                            toast.info("Please provide your email address ")
                            return
                        }                  

                        if(ticket.value.category == '' || ticket.value.category == 'Not Available' || ticket.value.category == null || ticket.value.category == undefined || ticket.value.category == "null" || ticket.value.category == "undefined"){
                            toast.info("Please select a problem category first")
                            return
                        }



                                                
                       if(ticket.value.problemDetails == '' || ticket.value.problemDetails == "Not Available"){
                        toast.info("Please write about your problem in detail")
                           return
                       }
                       
                       if(ticket.value.location == '' || ticket.value.location == "Not Available"){
                        toast.info("Please Select A Location")
                           return
                       }


                       if(ticket.value.extension == '' || ticket.value.extension == "Not Available"){
                        toast.info("Please give your extension first")
                           return
                       }
                       
                       if(ticket.value.phone == '' || ticket.value.phone == "Not Available"){
                        toast.info("Please give your phone number first")
                           return
                       }
                       
                       
                       
                       if(ticket.value.department == ''){
                        toast.info("Please Select A Department")
                           return
                        }
                       
                        if(hasService.value && ticket.value.serviceType == ""){
                            toast.info("Please Select A Service Type")
                           return
                        }
                       
                       
                       
                       
                       
                       
                         for(var x of team.value.leaders){
                         if(x.mailAddress == user.value.mailAddress){
              
                           leaderCheck.value = true
                           vm.$refs.main.style.filter = 'blur(10px)'
                           return
                        }
                       }

        }


    
        


            var data =  new FormData();

             for(var x of files.value){
                data.append('file', x)
             }
             
           


            var ticketData = ticket.value
           ticketData.details = details.value

            if(ticketData.approvalRequired ){
                var resultUser1 = users.value.filter((user)=> user.empName == vm.ticket.supervisor.split('/')[0])[0]
                ticketData.supervisor = resultUser1
            }


            if(ticketData.raisedFor != "Not Required" && ticketData.raisedFor != null){
                var resultUser2 = users.value.filter((user)=> user.empName == vm.ticket.raisedFor.split('--')[0])[0]
                ticketData.raisedFor = resultUser2
            }else{
                ticketData.raisedFor = null
            }

  

            ticketData.assignedTo = null

            ticketData.higherApprover = null

            ticketData.hasService = hasService.value;


    

 


             data.append('ticket', JSON.stringify(ticketData))
             data.append('token', token)
             data.append('user', JSON.stringify(user.value))
             data.append('comment', comment.value)
             toast.info("Sending Request")
             axios.post(globalStore.globalUrl + 'submitTicket', data, {
  headers: {
    'Authorization': `Bearer ${token.value}`,

  }
}).then((result)=>{
                toast.success("Ticket raised")
                 
                 timePassed.value = new Date()
                 proceedCheck.value = false;
                 ticket.value.repeat = false;
                 ticket.value.timesRaised = 1;
                 ticket.value.department = '',
                 ticket.value.problemDetails = '',
                 ticket.value.approvalRequired = false,
                 ticket.value.raisedFor = 'Not Required',
                 ticket.value.remarks = '',
                 ticket.value.serviceType = '',
                 ticket.value.type = 'problem',
                 ticket.value.location = '',
                 ticket.value.phone = '',
                 ticket.value.extension = '',
                 ticket.value.email = '',
                 ticket.value.repeat = false,
                 ticket.value.timesRaised = 1,
                 ticket.value.genesis = true,
                 ticket.value.genesisId = null,
                 setContact()
            
             
             }).catch((error)=>{
                toast.clear()
                 toast.warning(error)
             })

            }

        

            function setContact(){
             
              
                ticket.value.extension = user.value.extension
                ticket.value.location = user.value.location
                ticket.value.phone = user.value.mobileNo
                ticket.value.email = user.value.mailAddress
                
            }


            function search(){
          
           
                var data  = new FormData();
                data.append("user", JSON.stringify(user.value))
                axios.post(globalStore.globalUrl + "getTicketsRaisedByUser", data).then((result)=>{
                    ticketsAll.value = result.data
                    tickets.value = result.data.filter((ticket)=>ticket.status == "Closed Ticket" && ticket.genesis == true);
                    searchCheck.value = true
                }).catch((erorr)=>console.log(error))
    
            }
        
           

            function selectTicket(id){
                var selectedTicket = ticketsAll.value.find((ticket)=>ticket._id == id);
        
    
                var ticketCheck = ticketsAll.value.find((ticket)=>{
               
                    
                    if(ticket.value.genesisId == selectedTicket._id && ticket.value.status != "Closed Ticket"){
                   
                        return true
                    }
                } )
    
                if(ticketCheck != null){
                    console.log("You already have an open ticket based on this ticket")
                    return
                }
    
                ticket.value.department = selectedTicket.department
                ticket.value.location = selectedTicket.location
                ticket.value.email = selectedTicket.email
                ticket.value.extension = selectedTicket.extension
                ticket.value.phone = selectedTicket.phone
                ticket.value.category = selectedTicket.category
                ticket.value.assignedTo = null
                ticket.value.raisedBy = selectedTicket.raisedBy
                ticket.value.raisedFor = selectedTicket.raisedFor
                ticket.value.problemDetails = selectedTicket.problemDetails
                team.value = teams.value.find((team)=> team.name == this.ticket.department)
                ticket.value.assignedTo = null
                ticket.value.genesis = false
                ticket.value.genesisId = id
    
                ticket.value.higherApprover = null
    
                ticket.value.hasService = hasService.value;
                ticket.value.remarks = selectedTicket.remarks
            
                if(selectedTicket.raisedFor != "Not Required" && selectedTicket.raisedFor != null){
    
    
                 
                    ticket.value.raisedFor = selectedTicket.raisedFor.empName + '/' + selectedTicket.raisedFor.designation + '/' + selectedTicket.raisedFor.unit
                }else{
                    ticket.value.raisedFor = null
                }
    
    
            
              
                searchCheck.value = false
            }


    function reassignDepartment(){
       
        toast.info("Reassigning ")
     
        categoryCheck.value = false;
   
        var comment = "Not Available"
      
  
        ticket.value.category = category.value 
  
       
        var data = new FormData();
        data.append('token', token.value)
         data.append('user', JSON.stringify(user.value))
         data.append('comment', comment)
         data.append('ticket', JSON.stringify(ticket.value))
         data.append('department', value.name)
         
         
         
         axios.post(globalStore.globalUrl + "reassignDepartment", data).then((result)=>{
           
            getTickets()
         }).catch((error)=>{
          
         })
      }



            function cancelDepartmentReassign(){
             
                categoryCheck.value = false;
              
              }




              function  assignTicket2(event, ticket2){
   
            
                toast.info("Assigning Ticket")
          
      
                var comment = "Not Available"
              
                var prevAssignee = ticket2.assignedTo
    
    
    
    
                if(event.target.value == "Unassigned" && ticket2.assignedTo != null){
                    var data = new FormData();
                    data.append('token', token.value)
                    data.append('user', JSON.stringify(user.value))
                    data.append('comment', comment)
                    data.append('ticket', JSON.stringify(ticket2))
                    data.append("prevAssignee", JSON.stringify(prevAssignee))
    
    
                    axios.post(globalStore.globalUrl + 'unassign', data, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
    
      }
    }).then((result)=>{
                               if(result.data == true){
                                  toast.success("Unassigned")
                                   getTickets5()
                               }else{
                      
                               }
                           }).catch((error)=>{
                           
                           })
    
                   
                }else if(ticket2.assignedTo != null && event.target.value != "Unassigned"){
                     var approver = support.value.filter((user)=>user.mailAddress == event.target.value)[0]
                     console.log("this is the approver");
                     console.log(approver)
                     console.log(event.target.value)
                     var data = new FormData();
                     
                     data.append('token', token)
                     data.append('user', JSON.stringify(user.value))
                     data.append('comment', comment)
                     data.append('ticket', JSON.stringify(ticket2))
                     data.append('approver', JSON.stringify(approver))
    
                     axios.post(globalStore.globalUrl + 'reassign', data, {
      headers: {
        'Authorization': `Bearer ${token.data}`,
    
      }
    }).then((result)=>{
                        if(result.data == true){
                            toast.success("Reassigned Successfully")
                            getTickets5()
                          
                        }else{
                  
                        }
                    }).catch((error)=>{
                  
                    })
    
    
                }else if(ticket2.assignedTo == null && event.target.value != "Unassigned"){
                    console.log("these are the support")
                    console.log(support.value)
               
                    var approver = support.value.filter((user)=> user.mailAddress == event.target.value)[0]
    
                           console.log("from approver branch")
                           console.log(approver)
                           
                           var data = new FormData();
                           
                           data.append('token', token.value)
                           data.append('user', JSON.stringify(user.value))
                           data.append('comment', comment)
                           data.append('ticket', JSON.stringify(ticket2))
                           data.append('approver', JSON.stringify(approver))
                           
                           axios.post(globalStore.globalUrl + 'assign', data, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
       
      }
    }).then((result)=>{
                               if(result.data == true){
                                toast.success("Assigned Successfully")
                                   getTickets5()
                           
                               }else{
                              
                               }
                           }).catch((error)=>{
                          
                           })
                }
                
                
               
            }


function  assignTicket(event, ticket2){
   
            
    toast.info("Assigning Ticket please wait")
          
      
                var comment = "Not Available"
              
                var prevAssignee = ticket2.assignedTo
    
    
    
    
                if(JSON.parse(event.target.value).value == "Unassigned" && ticket2.assignedTo != null){
                    var data = new FormData();
                    data.append('token', token.value)
                    data.append('user', JSON.stringify(user.value))
                    data.append('comment', comment)
                    data.append('ticket', JSON.stringify(ticket2))
                    data.append("prevAssignee", JSON.stringify(prevAssignee))
    
    
                    axios.post(globalStore.globalUrl + 'unassign', data, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
    
      }
    }).then((result)=>{
                               if(result.data == true){
                                toast.success("Success")
                                   getTickets()
                               }else{
                      
                               }
                           }).catch((error)=>{
                           
                           })
    
                   
                }else if(ticket2.assignedTo != null && JSON.parse(event.target.value).value != "Unassigned"){
                     var approver = support.value.filter((user)=>user.empName == JSON.parse(event.target.value).value)[0]
                     var data = new FormData();
                     
                     data.append('token', token)
                     data.append('user', JSON.stringify(user.value))
                     data.append('comment', comment)
                     data.append('ticket', JSON.stringify(ticket2))
                     data.append('approver', JSON.stringify(approver))
    
                     axios.post(globalStore.globalUrl + 'reassign', data, {
      headers: {
        'Authorization': `Bearer ${token.data}`,
    
      }
    }).then((result)=>{
                        if(result.data == true){
                            toast.success("Success")
                            getTickets()
                          
                        }else{
                  
                        }
                    }).catch((error)=>{
                        toast.warning("error")
                    })
    
    
                }else if(ticket2.assignedTo == null && JSON.parse(event.target.value).value != "Unassigned"){
                    console.log("these are the support")
                    console.log(support.value)
                    console.log(JSON.parse(event.target.value))
                    var approver = support.value.filter((user)=> user.empName == JSON.parse(event.target.value).value)[0]
    
                           console.log("from approver branch")
                           console.log(approver)
                           
                           var data = new FormData();
                           
                           data.append('token', token.value)
                           data.append('user', JSON.stringify(user.value))
                           data.append('comment', comment)
                           data.append('ticket', JSON.stringify(ticket2))
                           data.append('approver', JSON.stringify(approver))
                           
                           axios.post(globalStore.globalUrl + 'assign', data, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
       
      }
    }).then((result)=>{

        toast.success("Success")
                               if(result.data == true){
                                
                                   getTickets()
                           
                               }else{
                              
                               }
                           }).catch((error)=>{
                          
                           })
                }
                
                
               
            }

 return {
    support, unassigned, currentPage, itemsPerPage, authStore, globalStore, tickets, ticket, filteredTickets, initialTickets, closedTickets, assigned, approval, 
    my, closeRequestsForMe, myCloseRequests, info, reject, infoMe, sort, mentions, selectedItem, timePassed,
    sortedTickets, paginator, locations, files, helpCheck, searchCheck, passedTime, locations, details, proceedCheck, leaderCheck,
    selectTicket, setTicketType, setPriority, reassignDepartment, assignTicket2,
    ticketReset, handlePageChanged, setLocation, cancelDepartmentReassign, search, submit, setFile, removeFile, setContact,
    getLocations, getTeams, getTickets, getSupport, downloadExcel, comparator, getTickets2, setRowColor, selectItem, 
    getSelectedItem, filter, showDetails, getTickets3, getTickets4, getTickets5, assignTicket, cancelDepartmentReassign
 }



})
