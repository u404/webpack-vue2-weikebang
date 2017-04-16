<template>
    <ul class="slide-left-menu-list">
        <li class="slide-left-menu" v-for="data in datalist">
            <div class="slide-left-menu-wrap">
                <div class="slide-left-menu-main">
                    <slot :data="data"></slot>
                </div>
                <div class="slide-left-menu-aside">
                    <slot name="aside"></slot>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import Hammer from 'hammerjs';
    export default {
        props:{
            datalist:{
                type: Array,
                default(){
                    return [];
                }
            },
            mutex:{
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
            }
        },
        watch: {

        },
        methods: {
            getTargetWrap(target){
                if(target.className.match(/slide-left-menu-wrap/)){
                    return target;
                }
                else{
                    return this.getTargetWrap(target.parentNode);
                }
            },
            updateTargetWrapTranslate(targetWrap,translate){
                targetWrap.style.transform = 'translateX('+translate+'px)';
            }
        },
        mounted () {
            let mc = new Hammer(this.$el),
                onTargetWrap = null;

            mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
            // listen to events...
            mc.on("panstart", ev => {
                let targetWrap = this.getTargetWrap(ev.target),
                    limitTranslateX = -targetWrap.querySelector('.slide-left-menu-aside').clientWidth,
                    startX = ev.deltaX,
                    translatedX = +targetWrap.style.transform.match(/-?\d+/) || 0,
                    lastTranslatedX = translatedX,
                    enableTransition = function(){
                        targetWrap.className = targetWrap.className.replace(/ \bno-transition\b/,'');
                    },
                    disableTransition = function(){
                        if(!targetWrap.className.match(/\bno-transition\b/)){
                            targetWrap.className += ' no-transition';
                        }
                    };
                if(this.mutex && onTargetWrap){
                    this.updateTargetWrapTranslate(onTargetWrap,0);
                }
                disableTransition();
                mc.on("panmove", ev => {
                    let translateX = translatedX + ev.deltaX - startX;
                    if(translateX>0){
                        translateX = 0;
                    }
                    else if(translateX<limitTranslateX){
                        translateX = limitTranslateX;
                    }
                    this.updateTargetWrapTranslate(targetWrap,translateX);
                    lastTranslatedX = translateX;
                });
                mc.on("panend", ev => {
                    enableTransition();
                    if(lastTranslatedX<limitTranslateX/2){
                        lastTranslatedX = limitTranslateX;
                        onTargetWrap = targetWrap;
                    }
                    else{
                        lastTranslatedX = 0;
                        onTargetWrap = null;
                    }
                    this.updateTargetWrapTranslate(targetWrap,lastTranslatedX);
                    mc.off("panmove");
                    mc.off("panend");
                });
            });
            
        }
    }
</script>

<style>
    .slide-left-menu-list {  }
    .slide-left-menu { overflow: hidden; }
    .slide-left-menu-wrap { display: flex; transition: transform ease 0.3s; }
    .slide-left-menu-wrap.no-transition { transition: none; }
    .slide-left-menu-main { width: 100%; flex: 0 0 auto; }
    .slide-left-menu-aside { flex: 0 0 auto; display: flex; align-items: stretch; }
    .slide-left-menu-btn {  }
</style>
