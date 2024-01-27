import{_ as i,f as d,r as c,o as f,c as u,a as o,b as l}from"./index-d0c9d9c3.js";const h={data(){return{approval:0,assigned:0,my:0,myCloseRequests:[],closeRequestsForMe:[],info:[],reject:[],infoMe:[],tickets:[]}},created(){this.$toast.info("Loading Data....");var a=this,t=this.authStore.getToken,s=this.authStore.getUser,m=new FormData;m.append("token",t),m.append("user",JSON.stringify(s)),d.post(a.globalUrl+"getTickets",m).then(r=>{a.tickets=r.data,a.filteredTickets=a.tickets,a.approval=r.data.filter(e=>e.supervisor&&e.higherApprover&&(e.supervisor.empName==s.empName||e.higherApprover.empName==s.empName)&&e.currentHandler.empName==s.empName),a.assigned=r.data.filter(e=>e.assignedTo&&e.assignedTo.empName==s.empName&&e.assigned==!0&&e.currentHandler.empName==s.empName),a.my=r.data.filter(e=>e.raisedBy.empName==s.empName),a.closeRequestsForMe=r.data.filter(e=>e.closeRequested==!0&&e.raisedBy.empName==s.empName&&e.currentHandler.empName==s.empName),a.myCloseRequests=r.data.filter(e=>e.closeRequested==!0&&e.assignedTo&&e.assignedTo.empName==s.empName),a.info=r.data.filter(e=>e.ask==!0&&e.prevHandler.empName==s.empName&&e.raisedBy.empName!=s.empName),a.reject=r.data.filter(e=>e.rejected==!0&&e.assignedTo&&e.assignedTo.empName==s.empName&&e.currentHandler.empName==s.empName),a.infoMe=r.data.filter(e=>e.ask==!0&&e.raisedBy.empName==s.empName&&e.currentHandler.empName==s.empName),a.$toast.clear(),a.$toast.success("Data Loaded Successfully")}).catch(r=>{a.$toast.clear(),console.log("this is the error"),a.$toast.warning(r)})}},N={class:"flex flex-col justify-center items-center h-full w-full text-lg px-24",id:"app"},g={class:"flex flex-row justify-center items-between text-lg px-24 py-10 w-full h-screen",id:"app"},x=o("label",{class:"text-4xl mt-10 hover:cursor-pointer"},"Request",-1),v=o("label",{class:"text-4xl mt-10 hover:cursor-pointer"},"Manage",-1);function _(a,t,s,m,r,e){const n=c("font-awesome-icon");return f(),u("div",N,[o("div",g,[o("div",{onClick:t[0]||(t[0]=p=>this.$router.push("/leader/requests")),class:"hover:cursor-pointer hover:scale-125 flex flex-col justify-center items-center mr-20 mt-10 text-white bg-teal-400 h-2/3 w-1/3 boxShadow"},[l(n,{icon:"fa-solid fa-clipboard-list",size:"10x"}),x]),o("div",{onClick:t[1]||(t[1]=p=>this.$router.push("/temporary-leader/manage")),class:"hover:cursor-pointer hover:scale-125 flex flex-col justify-center items-center bg-purple-400 mt-10 h-2/3 w-1/3 text-white boxShadow"},[l(n,{icon:"fa-solid fa-cog",size:"10x"}),v])])])}const w=i(h,[["render",_]]);export{w as default};