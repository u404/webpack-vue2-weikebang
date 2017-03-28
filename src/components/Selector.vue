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
                index: null,
                value: null
            }
        },
        methods: {
            scrollByIndex(index){
                let listEl = this.$el.querySelector('.selector-list'), 
                    itemHeight = listEl.querySelector('.selector-item').offsetHeight;
                listEl.style.transform = 'translateY('+(-index*itemHeight)+'px)';
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
            index(newIndex){
                let items = this.$el.querySelectorAll('.selector-item'),
                    selectedItem = items[newIndex];
                if(!selectedItem){
                    this.index = 0;
                    return;
                }
                this.value = selectedItem.dataset.value;
                this.scrollByIndex(newIndex);
                this.$emit('change',{text: selectedItem.textContent, value: this.value, index: this.index});
            },
            value(newValue){
                let items = this.$el.querySelectorAll('.selector-item');
                this.index = Array.prototype.findIndex.call(items,item=>item.dataset.value==newValue);
            }
        },
        mounted () {
            let el = this.$el,
                listEl = el.querySelector('.selector-list'),
                itemHeight = listEl.querySelector('.selector-item').offsetHeight,
                mc = new Hammer(el),
                startY = 0,
                translatedY = 0,
                slowdownInterval = null;
            mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
            // listen to events...
            mc.on("panstart", ev => {
                slowdownInterval&& clearInterval(slowdownInterval);
                startY = ev.deltaY;
                translatedY = +listEl.style.transform.match(/-?\d+/) || 0;
                if(!listEl.className.match(/\bno-transition\b/)){
                    listEl.className+=' no-transition';
                }
            });
            mc.on("panmove", ev => {
                let translateY = translatedY + ev.deltaY - startY;
                listEl.style.transform = 'translateY('+translateY+'px)';
            });
            mc.on("panend", ev => {
                let speed = ev.velocityY,
                    a = speed>0? 0.01: -0.01,                                                           
                    translateY = translatedY + ev.deltaY - startY,
                    //结束时
                    _end=()=>{
                        slowdownInterval && clearInterval(slowdownInterval);
                        if(listEl.className.match(/\bno-transition\b/)){
                            listEl.className = listEl.className.replace(/ \bno-transition\b/,'');
                        }
                        this.index = Math.abs(Math.round(-translateY/itemHeight));
                        listEl.style.transform = 'translateY('+translateY+'px)';
                    };
                //减速停止阶段
                slowdownInterval = setInterval(()=>{
                    let limitTransformY = -itemHeight* (this.datalist.length-1);
                    if(translateY>0){
                        translateY = 0;
                        _end();
                    }
                    else if(translateY < limitTransformY){
                        translateY = limitTransformY;
                        _end();
                    }
                    else if((a>0 && speed<=0) || (a<0 && speed>=0)){
                        _end();
                    }
                    else{
                        speed-=a;
                        translateY+= speed;
                        listEl.style.transform = 'translateY('+translateY+'px)';
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
    .selector-item { height: 24px; line-height: 24px; text-align: center; }
    .selector-frontsight { position: absolute; top: 48px; left: 0; width: 100%; height: 24px; border-top: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6; }
</style>