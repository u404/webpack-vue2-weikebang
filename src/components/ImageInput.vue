<template>
    <component :is="tag" @click="clickHandle">
        <slot></slot>
        <input type="file" :multiple="multiple" @change="fileChange($event)" style="display: none;" />
    </component>
</template>

<script>
    export default {
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            change: {
                type: Function,
                default: function(data){}
            }
        },
        methods: {
            fileChange(ev){
                let el = ev.target;
                new Promise((resolve,reject)=>{
                    let data = {
                            files: el.files,
                            sources: []
                        };
                    [].forEach.call(data.files,function(file,index){
                        let reader = new FileReader();
                        reader.onload = function(e){
                            data.sources[index] = e.target.result;
                            if(data.sources.length === data.files.length){
                                resolve(data);
                            }
                        };
                        reader.onerror = function(e){
                            data.sources[index] = null;
                            if(data.sources.length === data.files.length){
                                resolve(data);
                            }
                        };
                        reader.readAsDataURL(file);
                    });

                }).then(this.change);
            },
            clickHandle(){
                this.$el.lastChild.click();
            }
        }
    }
</script>