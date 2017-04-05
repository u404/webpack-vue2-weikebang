<template>
    <div class="selector">
        <ul class="selector-list">
            <li class="selector-item" v-for="item of datalist" :data-value="item[valueField]">{{item[textField]}}</li>
        </ul>
        <div class="selector-frontsight"></div>
    </div>
    
</template>

<script>
    import Hammer from 'hammerjs';
    export default {
        props: {
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
                enabledTransition: true,
                itemHeight: 0,
                userScrolling: false,
                slowdownInterval: null,
                index: null,
                value: null
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
                this.index = Math.abs(Math.round(-translate/this.itemHeight));
            },
            updateTransform(translate){
                this.listEl.style.transform = 'translateY('+translate+'px)';
            },
            initDomData(){
                this.listEl = this.$el.querySelector('.selector-list');
                this.itemHeight = this.listEl.querySelector('.selector-item').offsetHeight;
            }
        },
        watch: {
            datalist(newDataList){
                if(this.default){
                    this.index = this.datalist.findIndex(o=>o.value==this.default);
                }
                else{
                    this.index = 0;
                }
            },
            index(newIndex, oldIndex){
                let items = this.listEl.querySelectorAll('.selector-item'),
                    selectedItem = items[newIndex],
                    oldItem = items[oldIndex];
                if(!selectedItem){
                    this.index = 0;
                    return;
                }
                this.value = selectedItem.dataset.value;
                this.$emit('change',{text: selectedItem.textContent, value: this.value, index: this.index});
                if(oldItem){
                    oldItem.className = oldItem.className.replace(/ \bselector-item-active\b/,'');
                }
                selectedItem.className = selectedItem.className+ ' selector-item-active';
                if(!this.userScrolling){
                    this.updateTransformByIndex(newIndex);
                }
            },
            value(newValue){
                let items = this.$el.querySelectorAll('.selector-item');
                this.index = Array.prototype.findIndex.call(items,item=>item.dataset.value==newValue);
            },
            default(){
                //this.slowdownInterval && clearInterval(this.slowdownInterval);
                this.value = this.default;
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

            let mc = new Hammer(this.$el),
                startY = 0,
                translatedY = 0;

            this.initDomData();

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
                        console.log(1);
                        _end();
                    }
                    else if(translateY < this.limitTransform){
                        translateY = this.limitTransform;
                        console.log(2);
                        _end();
                    }
                    else if((a>0 && speed<=0) || (a<0 && speed>=0)){
                        console.log(3);
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
            if(this.default){
                this.value = this.default;
            }
            else{
                this.index = 0;
            }
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