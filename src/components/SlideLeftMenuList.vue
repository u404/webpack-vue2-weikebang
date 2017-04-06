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
    export default {
        props:{
            datalist:{
                type: Array,
                default: []
            },

        },
        data(){
            return {
                
            }
        }
    }
</script>

<style>
</style>
