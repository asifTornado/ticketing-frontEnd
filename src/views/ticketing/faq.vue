<template >
    

  

<div class="fixed   bottom-10 right-16 h-auto w-auto group " @click="scrollToTop">
    <div class="flex flex-col h-full w-full justify-center items-center">
        <font-awesome-icon icon="fa-solid fa-arrow-up" size="3x" class="group-hover:scale-150 group-hover:cursor-pointer"/>
            <label class="mt-2 group-hover:cursor-pointer">Top</label>
    </div>
</div>

    <div class="w-full px-[100px] h-screen  ml-[30px] flex flex-row" ref="app" id="app">

     

     <div class="fixed w-[100vw] h-full bg-white left-0 top-0 overflow-y-scroll p-10" v-if="showFlowChartCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="showFlowChart"/></div>
        <img src="../../assets/flowchart.png" alt="" srcset="">
     </div>
        
        <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="raiseTicketsSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="raiseTicketSlides"/></div>

        
        <carousel :items-to-show="1"  >
            <slide v-for="(slide, slideCounter) in slides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="raiseTicketsSlidesCheck = false"/></div>
              <img :src="slide" alt="" srcset="" class="w-[85vw] h-[80vh] mt-[20px] ">
            </slide>
        
            <template #addons>
              <navigation />
              <pagination />
            </template>
        </carousel>
   
     </div>

     <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="dealingWithTicketSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="dealingWithTicketSlides"/></div>
        <carousel :items-to-show="1" >
               <slide v-for="(slide, slideCounter) in dslides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="dealingWithTicketSlidesCheck = false"/></div> 
                 <img :src="slide" alt="" srcset="" class="w-[85vw] h-[80vh] mt-[20px]">
               </slide>
           
               <template #addons>
                 <navigation />
                 <pagination />
               </template>
           </carousel>
     </div>
    
<!-- 
     <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="powerUserSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="powerUserSlides"/></div>

        <carousel :items-to-show="1" >
               <slide v-for="(slide, slideCounter) in poSlides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="dealingWithTicketSlidesCheck = false"/></div> 
                 <img :src="slide" alt="" srcset="" class="w-[80vw] h-[90vh]">
               </slide>
           
               <template #addons>
                 <navigation />
                 <pagination />
               </template>
           </carousel>
     </div> -->

     <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="profileSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="profileSlides"/></div>
        <carousel :items-to-show="1" >
               <slide v-for="(slide, slideCounter) in prSlides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="profileSlidesCheck = false"/></div> 
                 <img :src="slide" alt="" srcset="" class="w-[85vw] h-[80vh] mt-[20px]">
               </slide>
           
               <template #addons>
                 <navigation />
                 <pagination />
               </template>
           </carousel>
     </div>


     <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="knowledgeSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="knowledgeSlides"/></div>
        <carousel :items-to-show="1" >
               <slide v-for="(slide, slideCounter) in kSlides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="knowledgeSlidesCheck = false"/></div> 
                 <img :src="slide" alt="" srcset="" class="w-[85vw] h-[80vh] mt-[20px]">
               </slide>
           
               <template #addons>
                 <navigation />
                 <pagination />
               </template>
           </carousel>
     </div>


     <div class="fixed w-[100vw] h-[100vh] bg-white left-[0px] top-[0px] p-3 " v-if="accessSlidesCheck == true">
        <div class="flex flex-row justify-end"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="accessSlides"/></div>
        <carousel :items-to-show="1" >
               <slide v-for="(slide, slideCounter) in aSlides" :key="slideCounter">
                <div class="fixed top-[30px] right-0"><font-awesome-icon icon="fa-solid fa-multiply" size="2x" class="hover:cursor-pointer" @click="accessSlidesCheck = false"/></div> 
                 <img :src="slide" alt="" srcset="" class="w-[85vw] h-[80vh] mt-[20px]">
               </slide>
           
               <template #addons>
                 <navigation />
                 <pagination />
               </template>
           </carousel>
     </div>
    

        <div class=" w-[70vw] h-[430vh]  p-10 bg-white shadow-md shadow-black mr-2 mt-4 flex flex-col items-center" id="article">
         <article class=" p-3 lg:prose-lg w-full">
            <h1 class="underline" ref="intro">1 Introduction</h1>
            <p>This Help Desk system is designed to faciliate company service givers give services to other employees much more easily. It automates mundanes task, keeps records of 
            all activites and alerts the users on various services related events. Hence, it relieves the concerned employees from the headache of having to keep
            track of things manually, and also acts as a proof of their work for top management. For top management, this system allows them to monitor and see trends related to services
            inside the company and thus take preemptive or proactive actions.    
            </p>

            <h1 class="underline" ref="usage">2 Usage</h1>
            <h2 class="underline" id="types" ref="types">2.1 User Types</h2>
            <p>Before we get into the details of using this website, a primary thing that the user needs to be aware of are the user types
                available in this system. There are basically 6 different types of users in these system. They are: normal users, team leaders, support users, general power users, specific power users, admins and temporary leaders.
                These user types wil be explained in more detail in section 2.2. These user types will be assigned to each of the user of these sytem by the admin of the system(which is also another user type). The admin user type is assigned 
                by the maintainers of the system. 
            </p>
            <h2 class="underline" ref="differentTypes">2.2 Different User Types</h2>
            <ul>
                <li>
                    <h3 for="" class="underline" ref="normal">2.2.1 Normal Users:</h3>
                    <p>They are the most common type of users and the majority of the users are expected to be of this type. They can raise new tickets (requests for help) and can see the status and progression of their own tickets.</p>
                </li>
                <li>
                    <h3 for="" class="underline" ref="leader">2.2.2 Team leaders:</h3>
                    <p>For each support service their will be one assigned team leader. He/She can monitor the tickets raised for his service and determine which team member gets to resolve which ticket. He can monitor the acitivites of his team</p>
                </li>
                <li>
                    <h3 for="" class="underline" ref="support">2.2.3 Support Users:</h3>
                    <p>Each service will have support users headed by a team leader. Their job is to resolve tickets assigned to them by the team leader, and maintain communication with the ticket raiser regarding the ticket.</p>
                </li>
                <!-- <li>
                    <h3 for="" class="underline" ref="powerSpecific">2.2.4 Power Users Specific:</h3>
                    <p>This is a special type of user who cannot raise a ticket or resolve tickets. Usually one person (probably the department head) will be assigned from each department this user type.
                       They can monitor all the service activites under their department and can get analytics and insights from them.

                    </p>
                </li>
                <li>
                    <h3 for="" class="underline" ref="powerGeneral">2.2.5 Power Users General:</h3>
                    <p>They are just like power user specific except that instead of being confined to one particular department, they can monitor all the departments. This type is mostly assigned to top level management.

                    </p>
                </li> -->
                <li>
                    <h3 for="" class="underline" ref="admin">2.2.4 Admin:</h3>
                    <p>The user type with the most priviledges. Not only can they monitor and get analytics of all the company wide services but they can also act as a proxy team leader or proxy support user for any of the service. They can also set up the different sevices and also who will lead these services and who will be in supporting roles. Also, they can assign user types to any user. 
                        These role is mostly assigned for one or two selected individuals in charge of maintaining the site.

                    </p>
                </li>
                
            </ul>

            <h1 class="underline" ref="workflow">3 Basic Workflow</h1>
            <p>In this section we will go through a basic description of the entire ticket handling cycle from the raising of a new ticket to its handing my the service support users and team leaders and finally to its closure.</p>
            <h2 class="underline" ref="flowchart">3.1 Workflow Flowchart (Click For Bigger View)</h2>
             <p>The following flow chart assumes that the ticket is raised for a service which has a service leader and two subordinates under him.</p>
            <img src="../../assets/flowchart.png" alt="" srcset="" class="hover:cursor-pointer" @click="showFlowChart">
              
             <h1 class="underline" ref="access">4 Registering and Logging In(Out)</h1>
             <p>To become eligible to use this system and to learn how to access the system follow the illustrated steps on the related slides. <span class="underline text-blue-500 hover:cursor-pointer" @click="accessSlides">Click here to launch the slide show:</span></p>

            <h1 class="underline" ref="raise">5 Raising a Ticket</h1>
            <p>To raise a new Ticket follow the illustrated steps on the related slide show. <span class="underline text-blue-500 hover:cursor-pointer" @click="raiseTicketSlides">Click here to launch the slide show:</span></p>
        
            <h1 class="underline" ref="deal">6 Dealing with Tickets</h1>
            <p>If you are the team leader of a service or a support user see the related slides to learn how to deal with tickets.  <span class="underline text-blue-500 hover:cursor-pointer" @click="dealingWithTicketSlides">Click here to launch the slide show:</span></p>
            <!-- <h1 class="underline" ref="monitor">7 Monitoring Tickets (For Power Users)</h1>
            <p>If you are a power user follow the related slides to learn how to monitor and get analytics data regarding the tickets.  <span class="underline text-blue-500 hover:cursor-pointer" @click="powerUserSlides">Click here to launch the slide show:</span></p>  -->
            <h1 class="underline" ref="profile">7 User Profile </h1>
            <p>Your user profile shows information regarding you. It also contains some information regarding you that you can edit. See the related slides for more information. <span class="underline text-blue-500 hover:cursor-pointer" @click="profileSlides">Click here to launch the slide show:</span></p> 
            <h1 class="underline" ref="knowledge">8 Knowledge Base </h1>
            <p>The knowledge base is a repository of relevant knowledge and articles, that any of the users can use to aid them regarding any issue in the company. See the related slides for more information. <span class="underline text-blue-500 hover:cursor-pointer" @click="knowledgeSlides">Click here to launch the slide show:</span></p> 
            <h1 class="underline" ref="article">9 Sending Articles For Knowledge Base </h1>
            <p>To send articles for the knowledge base, send links/pdfs/docs etc. to md.asif@hameemgroup.com. Your sent article will be evaluated and uploaded if considered valid. You will be notified by email regarding the status of your article.</p> 
        </article>

        </div>

        <div class="w-[25vw] h-auto   " >
            <div class=" bg-white shadow-md shadow-black mt-[2vh] h-auto w-full ">
                <article class=" p-10  md:prose-lg w-full">
                    <h2>Table of Contents</h2>
                    <h3    @click="scrollToSection('intro')" class="hover:cursor-pointer">1 Introduction</h3>
                    <h3    @click="scrollToSection('usage')" class="hover:cursor-pointer">2 Usage</h3>
                    <h4    @click="scrollToSection('types')" class="ml-5 hover:cursor-pointer">2.1 User Types</h4>
                    <h4    @click="scrollToSection('differentTypes')"  class="ml-5 hover:cursor-pointer">2.2 Different User Types</h4>
                    <h5    @click="scrollToSection('normal')" class="ml-10 hover:cursor-pointer">2.2.1 Normal Users</h5>
                    <h5    @click="scrollToSection('leader')" class="ml-10 hover:cursor-pointer">2.2.2 Team Leaders</h5>
                    <h5    @click="scrollToSection('support')" class="ml-10 hover:cursor-pointer">2.2.3 Support Users</h5>
                    <h5    @click="scrollToSection('admin')" class="ml-10 hover:cursor-pointer">2.2.4 Admin</h5>
                    <h3    @click="scrollToSection('workflow')" class="hover:cursor-pointer">3 Basic Workflow</h3>
                    <h4    @click="scrollToSection('flowchart')" class="ml-5 hover:cursor-pointer">3.1 Workflow Flowchart</h4>
                    <h3    @click="scrollToSection('access')" class="hover:cursor-pointer">4 Registering and Logging In(Out)</h3>
                    <h3    @click="scrollToSection('raise')" class="hover:cursor-pointer">5 Raising a Ticket</h3>
                    <h3    @click="scrollToSection('deal')" class="hover:cursor-pointer">6 Dealing with Tickets</h3>
                    <h3    @click="scrollToSection('monitor')" class="hover:cursor-pointer">7 Monitoring Tickets (For Power Users)</h3>
                    <h3    @click="scrollToSection('profile')" class="hover:cursor-pointer">8 User Profile</h3>
                    <h3    @click="scrollToSection('knowledge')" class="hover:cursor-pointer">9 Knowledge Base</h3>
                    <h3    @click="scrollToSection('article')" class="hover:cursor-pointer">10 Sending Articles For Knowledge Base</h3>
                    

                </article>
            </div>
        </div>
        </div>


       
    
    </template>
    
    
    <script>
    import axios from 'axios'
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    
   export default{
    data(){
        return{
            blogs:[],
            showFlowChartCheck:false,
            raiseTicketsSlidesCheck:false,
            dealingWithTicketSlidesCheck:false,
            powerUserSlidesCheck:false,
            profileSlidesCheck:false,
            knowledgeSlidesCheck:false,
            accessSlidesCheck:false,
          
            slides:['/src/assets/raiseTicket/Slide1.PNG',
            '/src/assets/raiseTicket/Slide2.PNG',
            '/src/assets/raiseTicket/Slide3.PNG',
            '/src/assets/raiseTicket/Slide4.PNG',
            '/src/assets/raiseTicket/Slide5.PNG',
            '/src/assets/raiseTicket/Slide6.PNG',
            '/src/assets/raiseTicket/Slide7.PNG',
            '/src/assets/raiseTicket/Slide8.PNG',
            '/src/assets/raiseTicket/Slide9.PNG',
            '/src/assets/raiseTicket/Slide10.PNG',
            '/src/assets/raiseTicket/Slide11.PNG',
            '/src/assets/raiseTicket/Slide12.PNG',
            '/src/assets/raiseTicket/Slide13.PNG',
            '/src/assets/raiseTicket/Slide14.PNG',
            '/src/assets/raiseTicket/Slide15.PNG',
            '/src/assets/raiseTicket/Slide16.PNG', 
          
        
        
        
        ],
        dslides:[
            '/src/assets/dealingWithTickets/Slide1.PNG',
            '/src/assets/dealingWithTickets/Slide2.PNG',
            '/src/assets/dealingWithTickets/Slide3.PNG',
            '/src/assets/dealingWithTickets/Slide4.PNG',
            '/src/assets/dealingWithTickets/Slide5.PNG',
            '/src/assets/dealingWithTickets/Slide6.PNG',
            '/src/assets/dealingWithTickets/Slide7.PNG',
            '/src/assets/dealingWithTickets/Slide8.PNG',
            '/src/assets/dealingWithTickets/Slide9.PNG',
            '/src/assets/dealingWithTickets/Slide10.PNG',
            '/src/assets/dealingWithTickets/Slide11.PNG',
            '/src/assets/dealingWithTickets/Slide12.PNG',
            '/src/assets/dealingWithTickets/Slide13.PNG',
            '/src/assets/dealingWithTickets/Slide14.PNG',
            '/src/assets/dealingWithTickets/Slide15.PNG',
            '/src/assets/dealingWithTickets/Slide16.PNG',
            '/src/assets/dealingWithTickets/Slide17.PNG',
            '/src/assets/dealingWithTickets/Slide18.PNG',
            '/src/assets/dealingWithTickets/Slide19.PNG',
            '/src/assets/dealingWithTickets/Slide20.PNG',
            '/src/assets/dealingWithTickets/Slide21.PNG',
        ],

        prSlides:[
        '/src/assets/profile/Slide1.PNG',
        '/src/assets/profile/Slide2.PNG',
        '/src/assets/profile/Slide3.PNG',
        '/src/assets/profile/Slide4.PNG',
        '/src/assets/profile/Slide5.PNG',
        '/src/assets/profile/Slide7.PNG',
        '/src/assets/profile/Slide8.PNG',
        ],

        kSlides:[
            '/src/assets/knowledge/Slide1.PNG',
            '/src/assets/knowledge/Slide2.PNG',
            '/src/assets/knowledge/Slide3.PNG',
            '/src/assets/knowledge/Slide4.PNG',
            '/src/assets/knowledge/Slide5.PNG',
            '/src/assets/knowledge/Slide6.PNG',
        ],

        aSlides:[
        '/src/assets/access/Slide1.PNG',
        '/src/assets/access/Slide2.PNG',
        '/src/assets/access/Slide3.PNG',
        '/src/assets/access/Slide4.PNG',
        '/src/assets/access/Slide5.PNG',
        '/src/assets/access/Slide6.PNG',
        '/src/assets/access/Slide7.PNG',
        '/src/assets/access/Slide8.PNG',
        '/src/assets/access/Slide9.PNG',
        ],

        poSlides:[
            '/src/assets/powerUser/Slide1.PNG',
            '/src/assets/powerUser/Slide2.PNG',
            '/src/assets/powerUser/Slide3.PNG',
            '/src/assets/powerUser/Slide4.PNG'
        ]
        }
    },

    components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

    computed:{
         getHeight(){
            var elem = document.getElementById("article")
            var height = elem
 
            return `${height}px`
         }
    },

    methods:{
        showFlowChart(){
            if(this.showFlowChartCheck == false){
                this.showFlowChartCheck = true
            }else{
                this.showFlowChartCheck = false
            }
        },

        raiseTicketSlides(){
            if(this.raiseTicketsSlidesCheck == false){
                this.raiseTicketsSlidesCheck = true
            }else{
                this.raiseTicketsSlidesCheck = false
            }
        },

        dealingWithTicketSlides(){
            if(this.dealingWithTicketSlidesCheck == false){
                this.dealingWithTicketSlidesCheck = true
            }else{
                this.dealingWithTicketSlidesCheck = false
            }
        },

        powerUserSlides(){
            if(this.powerUserSlidesCheck == false){
                this.powerUserSlidesCheck = true
            }else{
                this.powerUserSlidesCheck = false
            }
        },

        profileSlides(){
            if(this.profileSlidesCheck == false){
                this.profileSlidesCheck = true
            }else{
                this.profileSlidesCheck = false
            }
        },

        knowledgeSlides(){
            if(this.knowledgeSlidesCheck == false){
                this.knowledgeSlidesCheck = true
            }else{
                this.knowledgeSlidesCheck = false
            }
        },


        accessSlides(){
            if(this.accessSlidesCheck == false){
                this.accessSlidesCheck = true
            }else{
                this.accessSlidesCheck = false
            }
        },

        scrollToTop(){
            debugger
            window.scrollTo({ top: 30, behavior: 'smooth' });
            // this.$refs.app.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        },

        scrollToSection(sectionRef) {
           
      const element = this.$refs[sectionRef];
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = 60; 
        this.$refs.app.scrollTo({
          top: window.scrollY + rect.top - offset,
          behavior: 'smooth',
        });
      }
    },


    }

   }

   </script>

<style >



</style>