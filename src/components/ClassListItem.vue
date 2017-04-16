<template>
    <router-link class="class-item" :to="'/class/'+id">
        <div class="class-img" :style="{'background-image': 'url('+image+')'}"></div>
        <div class="class-info">
            <div class="class-title">{{title}}</div>
            <div class="class-hot fc-bw1">{{views}}</div>
            <div class="class-time fc-bw1">{{timeStr}}</div>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            image: String,
            title: String,
            views: Number,
            time: Date,
            jsonTime: String,
            id: String
        },
        data () {
            return {
                
            }
        },
        computed: {
            timeStr(){
                let time = this.time;
                if(!time && this.jsonTime){
                    time = this.jsonTime.dateJsonToDate();
                }
                if(!time){
                    return '';
                }
                return time.format('MM-dd hh:mm');
            }
        },
        mounted () {
            console.log(this.image);
        }
    }
</script>

<style>
.class-item { display: flex; justify-content: flex-start; padding: 1.6rem; background: #fff; flex: 0 0 auto; width: 100%; }
.class-item .class-img { flex: 0 0 auto; width: 12.8rem; height: 7.2rem; background: center no-repeat; background-size: cover; }
.class-item .class-info { flex: 1 1 auto; margin-left: 0.8rem; width: 100%; position: relative; }
.class-item .class-title { word-break: break-all; max-height: 3em; overflow: hidden; }
.class-item .class-hot { font-size: 1.2rem; }
.class-item .class-hot:before { margin-right: 0.4rem; font-family: iconfont; content: "\e601"; }
.class-item .class-time { position: absolute; bottom: 0; height: 1.6rem; line-height: 1.6rem; padding: 0 0.4rem; border: 1px solid #e6e6e6; color: #969696; border-radius: 0.2rem; }

.class-item .class-time.state-active { border: 1px solid #59b574; color: #59b574; }

.class-item.state-hidden {  }
.class-item.state-hidden .class-info .class-time { display: none; }
.class-item.state-hidden .class-info:after { position: absolute; bottom: 0; height: 1.6rem; line-height: 1.6rem; padding: 0 0.4rem; border: 1px solid #f00; color: #f00; border-radius: 0.2rem; content: "δչʾ"; }   
</style>