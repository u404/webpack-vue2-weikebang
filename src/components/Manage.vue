<template>
    <page class="live-common livemanage-page">
        <div class="header-info-box">
            <div class="live-baseinfo">
                <div class="live-icon"></div>
                <span class="live-name">野茫茫</span>
            </div>
        </div>
        <section class="countinfo-box">
            <div class="count-info">
                <div class="label">我的粉丝</div>
                <div class="count">10000</div>
            </div>
            <div class="count-info">
                <div class="label">累计收益</div>
                <div class="count">400.00</div>
            </div>
            <div class="count-info">
                <div class="label">点券余额</div>
                <div class="count">4000点</div>
            </div>
        </section>
        <router-link class="section pd-lr-m link-box" to="live">
            <div class="left-box">
                <i class="icon icon-live"></i>我的直播间
            </div>
            <div class="right-box link">
                满视觉大盛大发售
            </div>
        </router-link>
        <router-link class="section pd-lr-m link-box" to="class/manage">
            <div class="left-box">
                <i class="icon icon-book"></i>我的课程
            </div>
            <div class="right-box link">
                5个
            </div>
        </router-link>
        <section class="link-list mg-t-s">
            <a class="link" href="#">
                <i class="icon icon-1"></i>
                <span>账务中心</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-2"></i>
                <span>信息设置</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-3"></i>
                <span>帮助中心</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-4"></i>
                <span>多主持人</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-5"></i>
                <span>学员管理</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-6"></i>
                <span>学员在线数据</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-7"></i>
                <span>服务号接入</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-8"></i>
                <span>公众号联合推广</span>
            </a>
            <a class="link" href="#">
                <i class="icon icon-9"></i>
                <span>客服</span>
            </a>
        </section>
        <template slot="footer">
            <router-link class="btn" to="/class/create">创建课程</router-link>
            <router-link class="btn bd-l" to="/user/" replace>个人中心</router-link>
        </template>
    </page>
</template>

<script>
    import Page from './Page';

    export default {
        name: 'Manage',
        data(){
            return {
            }
        },
        components: {
            Page
        }
    }

</script>

<style>
    .livemanage-page {  }
    .livemanage-page .header-info-box {
        height: 11.7rem;
        padding: 1.6rem;
        background: center no-repeat; background-size: cover;
        color: #fff;
        display: flex;
        align-items: flex-end;
        background-image: url(../assets/css/images/1.jpg);
    }
    .livemanage-page .header-info-box .live-baseinfo { display: flex; }
    .livemanage-page .header-info-box .live-baseinfo .live-icon { width: 6.1rem; height: 6.1rem; border: 0.3rem solid #fff; background-image: url(../assets/css/images/1.jpg); }
    .livemanage-page .header-info-box .live-baseinfo .live-name { margin-left: 1.6rem; display: flex; align-items: flex-end; font-size: 1.6rem; }

    .livemanage-page .countinfo-box { height: 4.4rem; display: flex; align-items: center; }
    .livemanage-page .countinfo-box .count-info { width: 100%; text-align: center; }
    .livemanage-page .countinfo-box .count-info .label { color: #969696; font-size: 1rem; }
    .livemanage-page .countinfo-box .count-info .count { color: #59b574; font-size: 1.4rem; }
    .livemanage-page .link-box { height: 4.4rem; display: flex; justify-content: space-between; align-items: center; }
    .livemanage-page .link-box .left-box { flex: 0 0 auto; }
    .livemanage-page .link-box .right-box { margin-left: 1.6rem; color: #969696; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative; padding-right: 1.5em; }
    .livemanage-page .link-box .right-box:after { font-family: iconfont; position: absolute; right: 0; content: "\e604"; }

    .livemanage-page .link-list { display: flex; flex-flow: row wrap; }
    .livemanage-page .link-list .link { width: 33%; height: 8rem; flex: 1 0 auto; border-top: 1px solid #e6e6e6; display: flex; flex-flow: column nowrap; justify-content: center; align-items: center; }
    .livemanage-page .link-list .link:not(:nth-child(3n+1)) { border-left: 1px solid #e6e6e6; }

    .livemanage-page .icon { display: inline-block; background: url(../assets/css/images/livemanage-icons.png) 0 0 no-repeat; background-size: 3.5rem; vertical-align: middle; }
    .livemanage-page .link-box .icon { width: 2.3rem; height: 1.7rem; margin-right: 0.8rem; }
    .livemanage-page .link-list .icon { width: 3.5rem; height: 3.5rem; }
    .livemanage-page .icon-live { background-position: 0.2rem 0; }
    .livemanage-page .icon-book { background-position: 0.1rem -2.5rem; }
    .livemanage-page .icon-1 { background-position: 0 -5rem; }
    .livemanage-page .icon-2 { background-position: 0 -8.5rem; }
    .livemanage-page .icon-3 { background-position: 0 -12rem; }
    .livemanage-page .icon-4 { background-position: 0 -15.5rem; }
    .livemanage-page .icon-5 { background-position: 0 -19rem; }
    .livemanage-page .icon-6 { background-position: 0 -22.5rem; }
    .livemanage-page .icon-7 { background-position: 0 -26rem; }
    .livemanage-page .icon-8 { background-position: 0 -29.5rem; }
    .livemanage-page .icon-9 { background-position: 0 -33rem; }
</style>