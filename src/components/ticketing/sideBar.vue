<template>

<div class="flex flex-col justify-between w-[50px] bg-[rgb(2,54,61)] h-[92vh]   " style="z-index: 999;">
    <div><template v-if="userType == 'leader'" >
 
    <div @click="clickedTab($event, 'item1', '/ticketing/newTicket')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="absolute  right-[-90px] top-[12px] p-3 bg-gray-600 text-white" style="visibility:hidden;">Raise Ticket</div> 
      <font-awesome-icon icon="fa-solid fa-ticket" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}"  @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="  absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white" style="visibility: hidden;">My Tickets</div> 
         <font-awesome-icon icon="fa-solid fa-clipboard-list" size="2x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item3', '/ticketing/leader/manage')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="  absolute right-[-112px] top-[12px] p-3 bg-gray-600 text-white" style="visibility: hidden;">Manage Tickets</div>  
      <font-awesome-icon icon="fa-solid fa-people-roof" size="2x" class=" hover:cursor-pointer"/>
    </div>
</template>
<template v-if="userType == 'support'">
       
   <div @click="clickedTab($event, 'item1', '/ticketing/newTicket')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
      <font-awesome-icon icon="fa-solid fa-ticket" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white">My Tickets</div> 
         <font-awesome-icon icon="fa-solid fa-clipboard-list" size="2x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item3', '/ticketing/support/assist')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-55px] top-[12px] p-3 bg-gray-600 text-white">Assist</div> 
      <font-awesome-icon icon="fa-solid fa-headset" size="2x" class=" hover:cursor-pointer"/>
    </div>
</template>
<template v-else-if="userType == 'normal'">
    <div @click="clickedTab($event, 'item1', '/ticketing/newTicket')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>   
      <font-awesome-icon icon="fa-solid fa-ticket" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white">My Tickets</div> 
         <font-awesome-icon icon="fa-solid fa-clipboard-list" size="2x" class=" hover:cursor-pointer"/>
    </div>

</template>

<template v-else-if="userType == 'power'">
  
    <div @click="clickedTab($event, 'item1', '/ticketing/power/tickets')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div style="z-index: 999;" class="opacity-0 group-hover:opacity-100 absolute right-[-63px] top-[12px] p-3 bg-gray-600 text-white">Tickets</div>  
      <font-awesome-icon icon="fa-solid fa-ticket-alt" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/power/analytics')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div  class="opacity-0  group-hover:opacity-100 absolute right-[-75px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999999999999">Analytics</div>  
         <font-awesome-icon icon="fa-solid fa-chart-bar" size="2x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item3', '/ticketing/users')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute left-[54px] p-3 bg-gray-600 text-white"  style="z-index: 9999999999999;" >Users</div>  
      <font-awesome-icon icon="fa-solid fa-user" size="2x" class=" hover:cursor-pointer"/>
    </div>

</template>

<template v-else-if="userType == 'departmentPower'">
  <div @click="clickedTab($event, 'item1', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
    <div class="opacity-0 group-hover:opacity-100 absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white">My Tickets</div> 
    <font-awesome-icon icon="fa-solid fa-clipboard-list" size="2x" class=" hover:cursor-pointer"/>
</div>
    <div @click="clickedTab($event, 'item2', '/ticketing/departmentPowerUser/tickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div style="z-index: 999;" class="opacity-0 group-hover:opacity-100 absolute right-[-63px] top-[12px] p-3 bg-gray-600 text-white">Tickets</div>  
      <font-awesome-icon icon="fa-solid fa-ticket-alt" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item3', '/ticketing/departmentPowerUser/analytics')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
          <div  class="opacity-0  group-hover:opacity-100 absolute right-[-75px] top-[12px] p-3 bg-gray-600 text-white">Analytics</div>  
          <font-awesome-icon icon="fa-solid fa-chart-bar" size="2x" class=" hover:cursor-pointer"/>
    </div>

</template>


<template v-if="userType == 'admin'">
        <div @click="clickedTab($event, 'item1', '/ticketing/newTicket')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
         <font-awesome-icon icon="fa-solid fa-ticket" size="x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999">My Tickets</div> 
         <font-awesome-icon icon="fa-solid fa-clipboard-list" size="x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item3', '/ticketing/systemAdmin/manage')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-112px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999">Manage Tickets</div>  
      <font-awesome-icon icon="fa-solid fa-people-roof" size="x" class=" hover:cursor-pointer"/> 
     
    </div>
    <div @click="clickedTab($event, 'item4', '/ticketing/users')" :class="{selectedTab: selectedItem == 'item4', unselectedTab:selectedItem != 'item4'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-105px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999">Manage Users</div>  
      <font-awesome-icon icon="fa-solid fa-user" size="x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item5', '/ticketing/teams')" :class="{selectedTab: selectedItem == 'item5', unselectedTab:selectedItem != 'item5'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-120px] top-[12px] p-3 bg-gray-600 text-white">Manage Services</div>   
      <font-awesome-icon icon="fa-solid fa-user-group" size="x" class=" hover:cursor-pointer"/>
    </div>

    <div @click="clickedTab($event, 'item6', '/ticketing/locations')" :class="{selectedTab: selectedItem == 'item6', unselectedTab:selectedItem != 'item6'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-128px] top-[12px] p-3 bg-gray-600 text-white">Manage Locations</div>   
      <font-awesome-icon icon="fa-solid fa-map" size="x" class=" hover:cursor-pointer"/>
    </div>

    <div @click="clickedTab($event, 'item7', '/ticketing/power/analytics')" :class="{selectedTab: selectedItem == 'item7', unselectedTab:selectedItem != 'item7'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
      <div  class="opacity-0  group-hover:opacity-100 absolute right-[-75px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999999999999">Analytics</div>  
      <font-awesome-icon icon="fa-solid fa-chart-bar" size="x" class=" hover:cursor-pointer"/>
 </div>

 <div @click="clickedTab($event, 'item8', '/ticketing/power/report')" :class="{selectedTab: selectedItem == 'item8', unselectedTab:selectedItem != 'item8'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
  <div  class="opacity-0  group-hover:opacity-100 absolute right-[-75px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:9999999999999999">Analytics</div>  
  <font-awesome-icon icon="fa-solid fa-file-contract" size="x" class=" hover:cursor-pointer"/>
</div>
</template>


<template v-if="userType == 'tLeader'">
        <div @click="clickedTab($event, 'item1', '/ticketing/newTicket')" :class="{selectedTab: selectedItem == 'item1', unselectedTab:selectedItem != 'item1'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
         <font-awesome-icon icon="fa-solid fa-ticket" size="2x" class=" hover:cursor-pointer"/>
    </div>
        <div @click="clickedTab($event, 'item2', '/ticketing/myTickets')" :class="{selectedTab: selectedItem == 'item2', unselectedTab:selectedItem != 'item2'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
         <div class="opacity-0 group-hover:opacity-100 absolute right-[-85px] top-[12px] p-3 bg-gray-600 text-white">My Tickets</div> 
         <font-awesome-icon icon="fa-solid fa-clipboard-list" size="2x" class=" hover:cursor-pointer"/>
    </div>
    <div @click="clickedTab($event, 'item3', '/ticketing/temporary-leader/manage')" :class="{selectedTab: selectedItem == 'item3', unselectedTab:selectedItem != 'item3'}" @mouseenter="showToolTip($event)" @mouseleave="hideToolTip($event)">
       <font-awesome-icon icon="fa-solid fa-people-roof" size="2x" class=" hover:cursor-pointer"/>
    </div>
  
</template>


<template v-if="this.authStore.getUser.userType != 'admin'">
  <div @click="this.mainStore.toggleSidePanel()" class="unselectedTab" v-if="this.mainStore.getSidePanelCheck == true">
  <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
  <font-awesome-icon icon="fa-solid fa-angles-left" size="2x" class=" hover:cursor-pointer"/>
</div>
<div @click="this.mainStore.toggleSidePanel()" class="unselectedTab" v-if="this.mainStore.getSidePanelCheck == false">
  <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
  <font-awesome-icon icon="fa-solid fa-angles-right" size="2x" class=" hover:cursor-pointer"/>
</div>
</template>
<template v-else>
  <div @click="this.mainStore.toggleSidePanel()" class="unselectedTab" v-if="this.mainStore.getSidePanelCheck == true">
  <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
  <font-awesome-icon icon="fa-solid fa-angles-left" size="x" class=" hover:cursor-pointer"/>
</div>
<div @click="this.mainStore.toggleSidePanel()" class="unselectedTab" v-if="this.mainStore.getSidePanelCheck == false">
  <div class="opacity-0 group-hover:opacity-100 absolute right-[-90px] top-[12px] p-3 bg-gray-600 text-white">Raise Ticket</div>  
  <font-awesome-icon icon="fa-solid fa-angles-right" size="x" class=" hover:cursor-pointer"/>
</div>
</template>
</div>

<!-- <div>
  <div @click="clickedTab($event, '/ticketing/relevant-documents')" class="group relative flex flex-row p-5 text-[rgb(129,154,157)] justify-center items-center hover:cursor-pointer hover:bg-[rgb(47,170,187)] hover:text-white selectedTab">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-140px] top-[12px] p-3 bg-gray-600 text-white">Relevant Documents</div> 
      <font-awesome-icon icon="fa-solid fa-folder" size="2x" class=" hover:cursor-pointer"/>
    </div>

  <div @click="clickedTab($event, '/ticketing/create-document')" class="group relative flex flex-row p-5 text-[rgb(129,154,157)] justify-center items-center hover:cursor-pointer hover:bg-[rgb(47,170,187)] hover:text-white selectedTab">
      <div class="opacity-0 group-hover:opacity-100 absolute right-[-122px] top-[12px] p-3 bg-gray-600 text-white" style="z-index:999">Create Document</div> 
      <font-awesome-icon icon="fa-solid fa-signature" size="2x" class=" hover:cursor-pointer"/>
    </div>


</div>
   -->
</div>


</template>


<script>
export default{
    data(){
        return {
               userType:"",
               selectedItem:null
         
        }
    },

    created(){
        this.userType = this.authStore.getUser.userType
        console.log("this is the userType")
        console.log(this.userType)
    },

    methods:{
      clickedTab(event, item, route){
           
          this.selectItem(item);
          
          this.$router.push(route)
      },

      selectItem(item) {
      if (this.selectedItem === item) {
        this.selectedItem = null; // Deselect the item if already selected
      } else {
        this.selectedItem = item; // Select the clicked item
      }
    },

      showToolTip(event){
             var elem = event.target;
             var tooltip = elem.querySelector("div");
             console.log("this is the tooltip")
             console.log(tooltip)
             
             tooltip.style.visibility = "visible";
      },

      hideToolTip(event){
        var elem = event.target;
             var tooltip = elem.querySelector("div");
             console.log("this is the tooltip")
             console.log(tooltip)
             tooltip.style.visibility = "hidden"
      }
    }
 
}


</script>


<style scoped>
.unselectedTab{
  display:flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  justify-items: center;
  padding:20px;
  color:rgb(129,154,157);

}

.unselectedTab:hover{
   cursor: pointer;
   background-color: rgb(47,170,187);
   color:white;
}

.selectedTab{
  display:flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  justify-items: center;
  padding:20px;
  color:white;
  background-color: rgb(47,170,187);
}

</style>