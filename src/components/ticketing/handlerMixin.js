

import axios from 'axios'

var mixin = {

    data(){
        return{
            files:[]
        }
    },
    
    methods:{

        setFile(event){
            for(var x of event.target.files){
                this.files.push(x)
            }
        },

        removeFile(counter){
            this.files.splice(counter, 1)
        },


        supervisorApprove(comment, ticket){
            var vm = this;
            this.$toast.info("Approving...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
          
         
            var data = new FormData()

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))

        

            axios.post(vm.globalUrl + 'supervisorApprove', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Approved')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },

        higherApprove(comment, files, ticket, additionalInfo, ){
            var vm = this;
            this.$toast.info("Approving...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            
          
            var data = new FormData()


            for(var x of files){
                data.append('file', x)
          
             }
             

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('ticket', JSON.stringify(ticket))
            data.append('comment', comment)

         

            axios.post(vm.globalUrl + 'higherApprove', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Approved')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },

        assignTicket(comment, approver, ticket){
            
            var vm = this;
            this.$toast.info("Assigning Ticket...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
   

            var data = new FormData()
            var ticket = ticket;
         
            data.append('token', token)
            data.append('user', JSON.stringify(user))
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))
            data.append('approver', JSON.stringify(approver))

            axios.post(vm.globalUrl + 'assign', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Done')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },

        closeRequest(comment, files, ticket, additionalInfo){
            var vm = this;
            this.$toast.info("Requesting...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            
            
     

            var data = new FormData()

            for(var x of files){
                data.append('file', x)
            }
            
            data.append('additionalInfo', additionalInfo)
            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))

  
            

            axios.post(vm.globalUrl + 'closeRequest', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Request Sent')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },


        closeTicket(comment, ticketing, rating, files){
            var vm = this;
            this.$toast.info("Closing Ticket...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            var ticket = this.componentTicket
            var rating = rating
            
          

            var data = new FormData()

            for(var x of files){
                data.append('file', x)
            }

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))
            data.append("rating", rating)

            axios.post(vm.globalUrl + 'closeTicket', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Ticket Closed')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },



        closeRequestReject(comment){
            var vm = this;
            this.$toast.info("Rejecting...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            var ticket = this.componentTicket
            
            

            var data = new FormData()

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))

            
            

            axios.post(vm.globalUrl + 'closeRequestReject', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Rejected')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },



        ask(comment, ticket, approver){
            var vm = this;
            this.$toast.info("asking for additional info...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            var ticket = this.ticket

         
            

           var data = new FormData();
           data.append('user', JSON.stringify(user))
           data.append('token', token)
           data.append('comment', comment)
           data.append('ticket', JSON.stringify(ticket))
           data.append("approver", JSON.stringify(approver))

           
      

            axios.post(vm.globalUrl + 'askInfo', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Asked')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },


        askApproval(comment, ticket, approver){
            var vm = this;
            this.$toast.info("asking for additional info...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            var ticket = this.ticket

         
            

           var data = new FormData();
           data.append('user', JSON.stringify(user))
           data.append('token', token)
           data.append('comment', comment)
           data.append('ticket', JSON.stringify(ticket))
           data.append("approver", JSON.stringify(approver))

    

            axios.post(vm.globalUrl + 'askApproval', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Asked')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },

        assignSelf(comment, ticket){
            var vm = this;
            var user = this.authStore.getUser;
            var token = this.authStore.getToken;
          

            var data = new FormData();
        
            data.append("token", token);
            data.append("comment", comment);
            data.append("ticket", JSON.stringify(ticket));
            data.append("user", JSON.stringify(user));

            this.axios.post(vm.globalUrl + "assignSelf", data).then((result)=>{
               
                    vm.$toast.clear()
                    vm.$toast.success('Done')
                    
           
                    location.reload();
               
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })
        },

        Reassign(comment, approver, ticket){
          
            var vm = this;
            
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
   

            var data = new FormData()
            var ticket = ticket;
         
            data.append('token', token)
            data.append('user', JSON.stringify(user))
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))
            data.append('approver', JSON.stringify(approver))

                axios.post(vm.globalUrl + 'reassign', data).then((result)=>{
                    if(result.data == true){
                        vm.$toast.clear()
                        vm.$toast.success('Done')
                        this.$router.push('/ticketing/myTickets')
                    }else{
                        vm.$toast.clear()
                        vm.$toast.warning(result.data)
                    }
                }).catch((error)=>{
                    vm.$toast.clear()
                    vm.$toast.warning(error)
                })
        },


        giveInfo(comment, files, ticket, additionalInfo){
            var vm = this;
            this.$toast.info("Giving Info...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
            var comment = comment
            var ticket = this.componentTicket


         
            

            var data = new FormData()

            for(var x of files){
                data.append('file', x)
             }

             data.append('user', JSON.stringify(user))
             data.append('token', token)
             data.append('comment', comment)
             data.append('ticket', JSON.stringify(ticket))
             data.append('additionalInfo', additionalInfo)

         

            axios.post(vm.globalUrl + 'giveInfo', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Done')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },

    


        rejectTicket(comment, ticket){
            var vm = this;
            this.$toast.info("Rejecting...")
            var user = this.authStore.getUser
            var token = this.authStore.getToken
          

            var data = new FormData()

            data.append('user', JSON.stringify(user))
            data.append('token', token)
            data.append('comment', comment)
            data.append('ticket', JSON.stringify(ticket))


            axios.post(vm.globalUrl + 'rejectTicket', data).then((result)=>{
                if(result.data == true){
                    vm.$toast.clear()
                    vm.$toast.success('Rejected')
                    this.$router.push('/ticketing/myTickets')
                }else{
                    vm.$toast.clear()
                    vm.$toast.warning(result.data)
                }
            }).catch((error)=>{
                vm.$toast.clear()
                vm.$toast.warning(error)
            })

        },








    }
}


export default mixin