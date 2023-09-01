<template >
    <div class="h-full w-full flex flex-col justify-start items-start p-4">
     <div class="tabs">
        <div :class="{selected:department.name == selectedDepartmentName, notSelected:department.name != selectedDepartmentName}" @click="selectDepartment($event, counter)" v-for="(department, counter) in departments">{{department.name}}
        <div :class="{active:department.name == selectedDepartmentName}">
        </div>
        </div>
     </div>
     <div class="tab-content">
          <ReportComponent :department="selectedDepartment"/>
     </div>


    </div>
  </template>
  
  <script>
  import axios from "axios"
  import ReportComponent from "../../components/reportComponent.vue"
  
  export default {
      data(){
        return{
            departments:null,
            selectedDepartment:null,
            selectedDepartmentName:null,
        }
      },

      components:{ReportComponent},
      
      created(){
         var vm = this;

         var data = new FormData();

         data.append("token", vm.authStore.getToken)

         axios.post(vm.globalUrl + "getTeams", data).then((result)=>{
            vm.departments = result.data
            vm.selectedDepartment = vm.departments[0]
         }).catch((error)=>vm.$toast.warning(error))
      },

      methods:{
        selectDepartment(event, counter){
            this.selectedDepartment = this.departments[counter]
            this.selectedDepartmentName = this.departments[counter].name
        }
      }
    }
  </script>

  <style>
    .tab-content{
  min-height: 500px;
  min-width:90vw;
  padding:20px;
  background-color: white;

  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  border-bottom:1px solid black;
  border-left:1px solid black;
  border-right:1px solid black;
  border-top:1px solid black;

}

.tabs{
    display:flex;
    flex-direction: row;
    
}


.selected{
    border-top:1px solid black;
    border-left:1px solid black;
    border-right:1px solid black;
    background-color: white;
    color:black;
    position: relative;

}

.notSelected{
    border-top:1px solid black;
    border-left:1px solid black;
    border-right:1px solid black;
    border-bottom:1px solid black;
    background-color: #ddd;
    color:black;
    
}


.tabs div{
    padding: 5px;
    cursor: pointer;
}

.active{
    width: 100%;
    height: 20%;
    bottom:-5px;
    left:0px;
    position: absolute;
    background-color: white;
}

  </style>