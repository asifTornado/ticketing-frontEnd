<template>
    
   <div class="flex flex-row pl-10  w-full  bg-white">
                            <div class="w-1/4 flex flex-row justify-between">
                                <div > {{ action }}</div>
                                <div>:</div>

                            </div>
                            <div class="w-3/4 ml-4">
                                      
                                {{from.empName}}, 
                     <i>{{from.designation}}, {{from.location}}</i> <br/>
                     <i>Extension:<template v-if="from.extension">{{from.extension}},</template><template v-else>N/A,</template> 
                        Phone:<template v-if="from.mobileNo">{{from.mobileNo}},</template><template v-else>N/A,</template>
                        Email:<template v-if="from.mailAddress">{{from.mailAddress}}</template><template v-else>N/A,</template>
                    </i>


                            </div>
        </div>

 

        <div class="flex flex-row pl-10 mt-1" v-if="comment">
                            <div class="w-1/4 flex flex-row justify-between">
                                <div >Comment</div>
                                <div>:</div>

                            </div>
                            <div class="w-3/4 ml-4">{{ comment }}</div>
        </div>



        <div class="flex flex-row pl-10 mt-1 bg-white" v-if="to">
                            <div class="w-1/4 flex flex-row justify-between bg-white">
                                <div > {{ toAction }}</div>
                                <div>:</div>

                            </div>
                            <div class="w-3/4 ml-4">
                                      
                                {{to.empName}}, 
                     <i>{{to.designation}}, {{to.location}}</i> <br/>
                     <i>Extension:<template v-if="to.extension">{{to.extension}},</template><template v-else>N/A,</template> 
                        Phone:<template v-if="to.mobileNo">{{to.mobileNo}},</template><template v-else>N/A,</template>
                        Email:<template v-if="to.mailAddress">{{to.mailAddress}}</template><template v-else>N/A,</template>
                    </i>


                            </div>
        </div>



</template>



<script>
export default{
    data(){
        return {

        }
    },

    props:["action", "to", "from", "toAction", "comment"]
}




</script>