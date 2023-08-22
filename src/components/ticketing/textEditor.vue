<template>

<textarea class="w-full " id="editor" >
asds
</textarea> 


</template>

<script>

import suneditor from 'suneditor'


import image from 'suneditor/src/plugins/dialog/link'
import list from 'suneditor/src/plugins/submenu/list'
import {font, video} from 'suneditor/src/plugins'

// How to import language files (default: en)
import lang from 'suneditor/src/lang'
import {ko} from 'suneditor/src/lang'
import de from 'suneditor/src/lang/de'
export default{
    data(){
        return{
          value:''
        }
    },


   
    methods:{
        applyStyle(event, styleType, style){
            const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontWeight = 'bold';
        span.appendChild(range.extractContents());
        range.insertNode(span);
        selection.removeAllRanges();
    }
    },

    created(){
         var editor = document.getElementById("editor")
         suneditor.create(editor, {
    plugins: [font, video, image, list],
    buttonList: [
        ['font', 'video', 'image', 'list']
    ],
    lang: lang.ko
});
    }


}

}



</script>