<template>
    <page class="live-common">
        <slide-left-menu-list :datalist="classlist">
            <template scope="props">
                <class-list-item image="css/images/1.jpg" title="测试课程" :views="28" :time="new Date()" :id="props.data.toString()"></class-list-item>
            </template>
            <template slot="aside">
                <button class="slide-left-menu-btn btn-class-hide">隐藏</button>
                <button class="slide-left-menu-btn btn-class-del">删除</button>
            </template>
        </slide-left-menu-list>
        <router-link slot="footer" class="btn" to="/class/create">创建课程</router-link>
    </page>
</template>

<script>
    import Page from './Page';
    import SlideLeftMenuList from './SlideLeftMenuList';
    import ClassListItem from './ClassListItem';

    export default {
        data(){
            return {
                classlist: [
                    1,2,3,4,5,6,7,8,9
                ]
            }
        },
        components: {
            Page,
            SlideLeftMenuList,
            ClassListItem
        }
    }
</script>


<style>
    .slide-left-menu-btn.btn-class-hide { width: 70px; border: none; background: #f5f5f5; }
    .slide-left-menu-btn.btn-class-del { width: 70px; border: none; background: #eb2f2f; color: #fff; }
    .slide-left-menu-btn:active { box-shadow: 0 0 70px rgba(0,0,0,0.5) inset; }
</style>
