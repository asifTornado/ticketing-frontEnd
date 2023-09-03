<template >
   <div class="flex flex-col bg-white border-2 border-solid border-black h-auto p-5 justify-center items-center w-[900px]" style="z-index: 999; position:fixed; top:-400px; left:250px; transition:0.5s;" ref="help"> 
          
<div class="flex flex-row w-full mb-4 border-b border-solid border-b-gray-400">
        <div class="w-1/4 font-bold text-red-500">
            Emergency Priority
        </div>
        <div class=" w-3/4 mb-5 ">
            Defects or major problems that interrupt or halt production or business. Emergency priority support requests
            takes precedence over all other support requests
        </div>
</div>

<div class="flex flex-row w-full mb-4 border-b border-solid border-b-gray-400">
        <div class="w-1/4 font-bold text-orange-400">
            High Priority
        </div>
        <div class=" w-3/4 mb-5">
            Defects or major problems that might slow down business. However, with technical intervention or a functional 
            work-around user can complete the current business business cycle, access the services or enterprise application. High 
            priority support requests take precendence over medium and low priority support requests in a specific area of support.
        </div>
</div>

<div class="flex flex-row w-full mb-4  border-b border-solid border-b-gray-400">
        <div class="w-1/4 font-bold text-blue-500">
            Medium Priority
        </div>
        <div class=" w-3/4 mb-5">
            Problems related to development, system administration, management issues not defined as emergency or high. This is the most 
            common priority level. Medium priority support request take precendence over normal priority support requests in a specific area of support
        </div>
</div>

<div class="flex flex-row w-full mb-4 " >
        <div class="w-1/4 font-bold text-emerald-500">
            Normal Priority
        </div>
        <div class=" w-3/4  mb-5">
            Problems that are not effecting day to day work but needs to be addressed. Normal priority support requests are 
            processed when there is no emergency, high and medium priority support requests in specific area of support.
        </div>
</div>
<div class="flex flex-row justify-end w-full"><div class="font-bold text-white bg-blue-500 p-3 rounded-sm hover:cursor-pointer" @click="showHelp">Close</div></div>
   </div> 

<div class="w-full h-[92vh] px-10 py-10 z-10 overflow-y-scroll" ref="main">
<label class="text-black text-4xl ">New Ticket</label>

<div class='flex flex-col w-full h-[92vh] '>

    
        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Concerned Department:</div>
            <select v-model="ticket.department"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'  @change="setTeam($event)">
              <option v-for="(team, teamCounter) in teams" :key="teamCounter" :value="team.name">
                        {{ team.name }}
              </option>
            </select>
        </div>


     

        <div class=" mt-5 text-black  w-full flex flex-row" v-if="team" >
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Category:</div>
            <select  v-model="ticket.category"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'>
                <option value=""  disabled selected>Please Select </option>
                <option v-for="(category, categoryCounter) in team.problemTypes" :key="categoryCounter" :value="category">{{ category }}</option>
              
             

            </select>
        </div>


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Location:</div>
            <select v-model="ticket.location"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9' >
                <option v-for="(location, locationCounter) in locations" :value="location.name">{{ location.name }}</option>
            </select>
        </div>


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Phone Number:</div>
            <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.phone" />
           
        </div>

        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Extension:</div>
            <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.extension" />
           
        </div>

        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Email:</div>
            <input class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9 px-2' v-model="ticket.email" />
           
        </div>


      <template v-if="details.length > 0">  
        <div class=" mt-5 text-black  w-full flex flex-row" v-for="(detail, detailCounter) in details" :key="detailCounter"  >
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>{{ detail.label }}:</div>
            <input v-model="details[detailCounter].input"  name="" id="" class='w-8/12 p-3 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'/>
               
        </div>
    </template>


<!--         
        <div class=" mt-5 text-black  w-full flex flex-row" v-if="ticket.department == 'Information Technology'">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Service Type:</div>
            <select v-model="ticket.serviceType"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'>
                <option value=""  disabled selected>Please Select </option>
                <option value="Hardware and Networking">Hardware and Networking</option>
              <option value="Software Development and Maintennance">Software Development and Maintennance</option>
              <option value="Telecommunication">Telecommunication</option>
              <option value="Audio Video Production Unit">Audio Video Production Unit</option>

            </select>
        </div> -->

<!-- 
        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Type:</div>
            <select v-model="ticket.type"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'>
              <option value="service">Service</option>
              <option value="problem">Problem</option>
            
           
            </select>

        </div> -->

<!-- 

        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Priority:</div>
            <select v-model="ticket.priority"  name="" id="" class='w-8/12 bg-lime-50 border border-solid rounded-md border-slate-300 h-9'>
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="emergency">Emergency</option>
           
            </select>
          <div class="flex flex-col justify-center items-center p-1 rounded-sm ml-2 hover:cursor-pointer bg-blue-500"  @click="showHelp"><font-awesome-icon icon="fa-solid fa-question" class="font-bold text-white" size="2x"/></div>
        </div> -->
 


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Problem Details:</div>
            <textarea v-model="ticket.problemDetails"  name="" id="" class='w-8/12 text-black bg-lime-50 border border-solid px-2 rounded-md border-slate-300 h-13' placeholder="Write the problem being faced in details">
     
            </textarea>


        </div>




  


        
    


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Raise on behalf of:</div>
           <div class='w-8/12'> <vss searchabel="true" :options="processedUsers" v-model="ticket.raisedFor"/></div>
        </div>


        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'>Remarks:</div>
           <input v-model="ticket.remarks" type="text" name="" id="" class='w-8/12 rounded-md h-9 border-slate-300 border-solid border'/>
        </div>

        

        <div class=" mt-5 text-black  w-full flex flex-row">
            <div for="" class='w-44 text-end mr-10 flex flex-col justify-center font-bold'></div>
            <div class='w-8/12'>
             <font-awesome-icon icon='fa-solid fa-paperclip' size='xl' class='text-blue-700 mr-5' />
             <label for="file" class='hover:cursor-pointer'>Attach File</label>
             <input type="file" name="Attack File" id="file" placeholder="Attach File" class='hidden' multiple  @change="setFile($event)" >
             <div class="flex-col mt-2 w-full">
                <div for="" v-for="(file, fileCounter) in files" :key="fileCounter" class="flex-row flex w-full">
                    
                 <div class="w-1/2">   {{file.name}}</div>

                   <div class="w-1/2"> <font-awesome-icon icon="fa-solid fa-circle-minus" class="ml-4 hover:cursor-pointer" @click="removeFile(fileCounter)"/></div>
                </div>
             </div>
            </div>
           
        </div>
         
<hr class="border border-solid border-slate-300 "/>
      
    
<div class="flex flex-row justify-center items-center mt-5"><button class="bg-amber-500 h-auto w-auto text-white font-bold py-2 px-10 shadow shadow-black" @click="submit()">Submit Ticket</button></div>

   
</div>

</div>

</template>


<script>
import axios from 'axios'
import TextEditor from '../../components/ticketing/textEditor.vue'




export default{
    data(){
        return {
            files:[],
            helpCheck:false,
            ticket:{
                department:'',
                problemDetails:'',
                // priority:'normal',
                approvalRequired:false,
                raisedFor:'',
                remarks:'',
                serviceType:'',
                type:'problem',
                location:'',
                phone:'',
                extension:'',
                email:'',
              
                
               
            },
            users:[],
            teams:[], 
            team:null,
            hasService:false,
            currentTeam:null,
            details:[],
            locations:[]
            
        }
    },

    computed:{
          processedUsers(){
            var result = this.users.map((user)=>{

               
                return user.empName + '/' + user.designation + '/' + user.unit
            })
            var extra = 'Not Required'
            result.unshift(extra)
            return result
          },


          processedUsers2(){
            var result = this.users.map((user)=>{

               
                return user.empName + '/' + user.designation + '/' + user.unit
            })
            
            return result
          },

       

    },

    components:{TextEditor},

    created(){
        var vm = this;
        this.getApprovers()
        this.getTeams()
        this.setContact()
        axios.get(vm.globalUrl + 'getLocations').then((result)=>{
                vm.locations = result.data
            }).catch((error)=>vm.$toast.warning(error))
    },


    methods:{

        checkServiceDetail(){
            var vm = this;
            console.log("this is the service type")
            console.log(vm.ticket.serviceType)
            var service = vm.team.services.filter((service) => service.serviceName == vm.ticket.serviceType)[0]
            console.log("this is the service name")
            console.log(service)
             if(service.details.length > 0){
                vm.details = service.details
             }
        },

        checkService(){
            console.log("fired check service")
            var vm = this;
           vm.team = vm.teams.filter((team)=> team.name == this.ticket.department)[0]
         

           if(vm.team.hasServices){
            vm.hasService = true
           }else{
            vm.hasService = false
            if(vm.team.details.length > 0){
            vm.details = vm.team.details
           }
           }
        },
    
        setFile(event){
            for(var x of event.target.files){
                this.files.push(x)
            }
        },

        removeFile(counter){
            this.files.splice(counter, 1)
        },

        submit(){


            var vm = this;

            if(this.ticket.location == '' || this.ticket.location == "Not Available"){
                this.$toast.warning("Please Select A Location")
                return
            }

            if(this.ticket.phone == '' || this.ticket.phone == "Not Available"){
                this.$toast.warning("Please Select A Phone Number")
                return
            }


            
            if(this.ticket.department == ''){
                this.$toast.warning("Please Select A Department")
                return
             }

             if(this.hasService && this.ticket.serviceType == ""){
                this.$toast.warning("Please Select A Service Type")
                return
             }



            this.ticket.supervisor = this.teams.filter((item)=> item.name == vm.team.name).map((item)=>item.head)[0]



            this.$toast.info("Submitting Ticket.....")
            var token = this.authStore.getToken
            var user = this.authStore.getUser
            console.log("this is the user")
            console.log(user)
            var data =  new FormData();

             for(var x of this.files){
                data.append('file', x)
             }
             
           


            var ticketData = this.ticket
           ticketData.details = vm.details

            if(ticketData.approvalRequired ){
                var resultUser1 = this.users.filter((user)=> user.empName == vm.ticket.supervisor.split('/')[0])[0]
                ticketData.supervisor = resultUser1
            }

            if(ticketData.raisedFor != "Not Required"){
                var resultUser2 = this.users.filter((user)=> user.empName == vm.ticket.raisedFor.split('/')[0])[0]
                ticketData.raisedFor = resultUser2
            }else{
                ticketData.raisedFor = null
            }

            console.log("this is the user")
            console.log(user)

            ticketData.assignedTo = null

            ticketData.higherApprover = null

            ticketData.hasService = vm.hasService;

            console.log("this is the has service");
            console.log(ticketData.hasService)
            // if(ticketData.priority == '' || ticketData.priority == ""){
            //     ticketData.priority = "normal"
            // }
            

             data.append('ticket', JSON.stringify(ticketData))
             data.append('token', token)
             data.append('user', JSON.stringify(user))
             data.append('comment', this.comment)
             console.log("this is the ticket data")
             console.log(ticketData)
             console.log('this is the url ' + vm.globalUrl + 'submitTicket')
             axios.post(vm.globalUrl + 'submitTicket', data).then((result)=>{
                 vm.$toast.clear()
                 vm.$toast.success("Ticket Submitted")
                //  location.reload();
            
             }).catch((error)=>{
                vm.$toast.clear()
                 vm.$toast.warning(error)
             })

        },

        getApprovers(){
            var vm = this
            var token = this.authStore.getToken
            var data = {
                token
            }
			axios.post(vm.globalUrl + 'getUsers', data).then(function(response){
			    vm.users = response.data.filter((user)=>user.userType == 'normal' || user.userType == 'leader' || user.userType == 'support');
		
			
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});
        },

        getTeams(){
            var vm = this;
            var user = this.authStore.getUser;
            var token = this.authStore.getToken;

            var data = new FormData();
            data.append("user", user);
            data.append("token", token);

            axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
                vm.teams = result.data;
                console.log("this is the teams result")
                console.log(result.data)
            }).catch((error)=>vm.$toast.warning(error))
        },

        showHelp(){
             if(this.helpCheck == false){
                this.$refs.help.style.top = "100px"
                this.$refs.main.style.filter = "blur(10px)"
                this.helpCheck = true
             }else{
                this.$refs.help.style.top = "-400px"
                this.$refs.main.style.filter = "blur(0px)"
                this.helpCheck = false
             }
        },

        setContact(){
            var vm = this;
            var user = this.authStore.getUser
            vm.ticket.extension = user.extension
            vm.ticket.location = user.location
            vm.ticket.phone = user.mobileNo
            vm.ticket.email = user.mailAddress
            
        },

        setTeam(event){
            var vm = this;
            var teamName = event.target.value

            var selectedTeam = vm.teams.filter((team)=>team.name == teamName)[0];
            vm.team = selectedTeam
        }

    }
}

</script>