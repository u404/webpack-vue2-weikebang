<template>
    <transition :name="transitionName" mode="in-out">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default{
        name: 'page-router',
        data(){
            return {
                transitionName: 'page-left-in'
            }
        },
        watch: {
            '$route' (to,from){
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'page-right-in' : 'page-left-in';
            }
        }
    }
</script>


<style>
    .page-left-in-enter-active {
        transition: transform 0.5s;
    }
    .page-left-in-enter {
        transform: translate(100%,0);
    }
    .page-right-in-enter-active {
        transition: transform 0.5s;
    }
    .page-right-in-enter {
        transform: translate(-100%,0);
    }
</style>