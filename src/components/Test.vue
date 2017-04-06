<template>
    <page class="live-common livemanage-page">
        <slide-left-menu-list :datalist="datalist">
            <template scope="props">
                <div>{{props.data}}</div>
            </template>
            <template slot="aside">
                <span>按钮1</span>
                <span>按钮2</span>
            </template>
        </slide-left-menu-list>
    </page>
</template>

<script>
    import Page from './Page';
    import SlideLeftMenuList from './SlideLeftMenuList';

    export default {
        data(){
            return {
                datalist: [
                    '列表项1',
                    '列表项2',
                    '列表项3',
                    '列表项4'
                ]
            }
        },
        components: {
            Page,
            SlideLeftMenuList
        }
    }

</script>