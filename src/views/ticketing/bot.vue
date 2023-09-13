<template>
<div id="app">
<div>
{{root.value}}

<div @click="insertChild(root)">Insert a child</div>
</div>
<div v-for="(children, childrenCounter) in root.children">
{{children.value}}
<div @click="insertChild(children)">Insert a child</div>
<div v-for="(child, childCounter) in children.children">{{child.value}}</div>
</div>

</div>


</template>







<script>
import * as Bot from "../../components/ticketing/bot.js"
    import axios from "axios"
export default{


    data(){
        return {
            root:null,
            toggle:false
        }
    },


    created(){
        var root = new Bot.ChatObject("text", "Hello, how may I help You")
        this.root = root
    },

    methods:{
        insertChild(parent){
            console.log("insert child fired")
            var child = new Bot.ChatObject("text", "hello I am a child")
            var parent2 = Bot.findObjectByValue(this.root, parent.value)
            Bot.insertChild(parent2, child)
            this.toggle = !this.toggle
        }

    }


    


}




</script>