<template>
    <div class="selector">
        <ul ref="list" class="selector-list">
            <li class="selector-item" v-for="item of datalist" :data-value="item[valueField]">{{item[textField]}}</li>
        </ul>
        <div class="selector-frontsight"></div>
    </div>
</template>

<script>
    import Hammer from 'hammerjs';
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            default: {
                default: null,
            },
            valueField: {
                type: String,
                default: 'value'
            },
            textField: {
                type: String,
                default: 'text'
            },
            datalist: {
                type: Array,
                default: []
            }
        },
        data(){
            return {
                listEl: null,
                itemEls: null,
                enabledTransition: true,
                itemHeight: 0,
                userScrolling: false,
                slowdownInterval: null,
                index: null,
                value: null,
                renderFunctionCache: null,
            }
        },
        computed: {
            limitTransform(){
                return -this.itemHeight* (this.datalist.length-1);
            }
        },
        methods: {
            updateTransformByIndex(index){
                this.updateTransform(-index*this.itemHeight);
            },
            updateIndexByTranslate(translate){
                var index = Math.round(-translate/this.itemHeight);
                if(index<0){
                    index = 0;
                }
                else if(index > this.datalist.length - 1){
                    index = this.datalist.length - 1;
                }
                this.index = index;
            },
            updateTransform(translate){
                this.listEl.style.transform = 'translateY('+translate+'px)';
            }
        },
        watch: {
            show(value){
                if(value){
                    this.itemHeight = this.listEl.querySelector('.selector-item').offsetHeight;
                    this.renderFunctionCache && this.renderFunctionCache();
                    this.renderFunctionCache = null;
                }
                else{
                    this.slowdownInterval && clearInterval(this.slowdownInterval);
                    this.enabledTransition = true;
                    this.updateTransformByIndex(this.index);
                    this.userScrolling = false;
                }
            },
            default(){
                this.value = this.default;
            },
            datalist(newDataList){
                if(!this.default || (this.index = this.datalist.findIndex(o=>o.value==this.default))<0){
                    this.index = 0;
                }
                this.itemEls = null;
                this.$nextTick(()=>{
                    this.itemEls = this.listEl.querySelectorAll('.selector-item');
                    if(this.show){
                        this.renderFunctionCache && this.renderFunctionCache();
                        this.renderFunctionCache = null;
                    }
                });
                
            },
            value(newValue){
                this.index = this.datalist.findIndex(item=>item[this.valueField]==newValue);
            },
            index(newIndex, oldIndex){
                this.value = this.datalist[newIndex][this.valueField];
                this.$emit('change',{text: this.datalist[newIndex][this.textField], value: this.value, index: this.index});
                this.renderFunctionCache = ()=>{
                    let selectedItem = this.itemEls[newIndex],
                        oldItem = this.itemEls[oldIndex];
                    if(oldItem){
                        oldItem.className = oldItem.className.replace(/ \bselector-item-active\b/,'');
                    }
                    selectedItem.className = selectedItem.className+ ' selector-item-active';
                    if(!this.userScrolling){
                        this.updateTransformByIndex(newIndex);
                    }
                };

                if(this.show && this.itemEls){
                    this.renderFunctionCache();
                    this.renderFunctionCache = null;
                }
            },
            enabledTransition(value){
                if(value){
                    this.listEl.className = this.listEl.className.replace(/ \bno-transition\b/,'');
                }
                else{
                    if(!this.listEl.className.match(/\bno-transition\b/)){
                        this.listEl.className+=' no-transition';
                    }
                }
            }
        },
        mounted () {
            this.listEl = this.$refs.list;
            this.itemEls = this.listEl.querySelectorAll('.selector-item');

            let mc = new Hammer(this.$el),
                startY = 0,
                translatedY = 0;

            mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
            // listen to events...
            mc.on("panstart", ev => {
                this.userScrolling = true;
                this.slowdownInterval&& clearInterval(this.slowdownInterval);
                startY = ev.deltaY;
                translatedY = +this.listEl.style.transform.match(/-?\d+/) || 0;
                this.enabledTransition = false;
            });
            mc.on("panmove", ev => {
                let translateY = translatedY + ev.deltaY - startY;
                this.updateIndexByTranslate(translateY);
                this.updateTransform(translateY);
            });
            mc.on("panend", ev => {
                let speed = ev.velocityY,
                    a = speed>0? 0.01: -0.01,                                                           
                    translateY = translatedY + ev.deltaY - startY,
                    //结束时
                    _end=()=>{
                        this.slowdownInterval && clearInterval(this.slowdownInterval);
                        this.enabledTransition = true;
                        this.updateIndexByTranslate(translateY);
                        this.updateTransformByIndex(this.index);
                        this.userScrolling = false;
                    };
                //减速停止阶段
                this.slowdownInterval = setInterval(()=>{
                    if(translateY>0){
                        translateY = 0;
                        _end();
                    }
                    else if(translateY < this.limitTransform){
                        translateY = this.limitTransform;
                        _end();
                    }
                    else if((a>0 && speed<=0) || (a<0 && speed>=0)){
                        _end();
                    }
                    else{
                        speed-=a;
                        translateY+= speed;
                        this.updateIndexByTranslate(translateY);
                        this.updateTransform(translateY);
                    }
                },1);
            });
        }
    }
</script>


<style>
    .selector { height: 120px; overflow: hidden; position: relative; }
    .selector-list { margin-top: 48px; transition: transform ease 0.3s; }
    .selector-list.no-transition { transition: none; }
    .selector-item { height: 24px; line-height: 24px; text-align: center; color: #999; }
    .selector-frontsight { position: absolute; top: 48px; left: 0; width: 100%; height: 24px; border-top: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6; }
    
    .selector-item-active { font-size: 1.4rem; color: #666; }
</style>