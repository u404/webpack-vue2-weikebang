<template>
    <page class="live-common usercenter-page">
        <div class="main">
            <div class="header-info-box">
                <div class="user-baseinfo">
                    <div class="user-icon"></div>
                    <span class="user-name">野茫茫</span>
                </div>
            </div>
            <a class="section pd-lr-m link-box" href="#">
                <div class="left-box">
                    <i class="icon icon-live"></i>我关注的直播号
                </div>
                <div class="right-box link">
                    <i class="iconfont">11个</i>
                </div>
            </a>
            <a class="section pd-lr-m link-box" href="#">
                <div class="left-box">
                    <i class="icon icon-book"></i>我报名的课程
                </div>
                <div class="right-box link">
                    <i class="iconfont">11个</i>
                </div>
            </a>
        </div>
        <template slot="footer">
            <router-link class="btn bd-l" to="/" replace>管理中心</router-link>
        </template>
    </page>
</template>

<script>
    import Page from './Page';
    export default {
        name: 'UserCenter',
        components: {
            Page
        }
    }

</script>

<style>
    .usercenter-page {  }
    .usercenter-page .header-info-box {
        height: 11.7rem;
        padding: 1.6rem;
        background: center no-repeat; background-size: cover;
        color: #fff;
        display: flex;
        align-items: flex-end;
        background-image: url(../assets/css/images/1.jpg);
    }
    .usercenter-page .header-info-box .user-baseinfo { display: flex; }
    .usercenter-page .header-info-box .user-baseinfo .user-icon { width: 6.1rem; height: 6.1rem; border: 0.3rem solid #fff; background-image: url(../assets/css/images/1.jpg); }
    .usercenter-page .header-info-box .user-baseinfo .user-name { margin-left: 1.6rem; display: flex; align-items: flex-end; font-size: 1.6rem; }

    .usercenter-page .link-box { height: 4.4rem; display: flex; justify-content: space-between; align-items: center; }
    .usercenter-page .link-box .left-box { flex: 0 0 auto; }
    .usercenter-page .link-box .right-box { margin-left: 1.6rem; color: #969696; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative; padding-right: 1.5em; }
    .usercenter-page .link-box .right-box:after { font-family: iconfont; position: absolute; right: 0; content: "\e604"; }

    .usercenter-page .icon { display: inline-block; background: url(../assets/css/images/livemanage-icons.png) 0 0 no-repeat; background-size: 3.5rem; vertical-align: middle; }
    .usercenter-page .link-box .icon { width: 2.3rem; height: 1.7rem; margin-right: 0.8rem; }
    .usercenter-page .icon-live { background-position: 0.2rem 0; }
    .usercenter-page .icon-book { background-position: 0.1rem -2.5rem; }
</style>