<template>
    <page class="live-common live-page">
        <div class="header-info-box">
            <div class="bg-img filter-blur" style="background-image: url(css/images/1.jpg);"></div>
            <a class="link link-main" href="#"><span class="iconfont icon-home"></span></a>
            <a class="link link-setting" href="#"><span class="iconfont icon-set"></span></a>
            <div class="live-icon-box mg-t-s">
                <i class="live-icon" style="background-image: url(css/images/1.jpg);"></i>
            </div>
            <div class="live-title mg-t-s">火法所发生的发是发的发生打算地</div>
            <div class="live-desc mg-t-s">简介覅安抚盛大发售地方sad发生的发到付阿斯蒂芬safasdfasdfasdd发生打发发生的非法的法师打发sad发阿萨德发生的发士大夫撒打算的发生的开发sad粉丝看到机房空间撒地方解散快递费奥斯卡地方撒地方sad发到发打算士大夫撒地方按时发送到发送到发送到发阿斯蒂芬的发</div>
            <div class="btn btn-fav state-faved">360人关注</div>
        </div>
        <div class="tab-list class-tab-list">
            <div class="tab classing-tab active"><span>正在直播</span></div>
            <div class="tab waiting-tab"><span>尚未开始</span></div>
            <div class="tab review-tab"><span>课程回顾</span></div>
        </div>
        <div class="class-list">
            <a class="class-item">
                <div class="class-img" style="background-image: url(css/images/1.jpg);"></div>
                <div class="class-info">
                    <div class="class-title">广发的发地方撒非得撒地方</div>
                    <div class="class-hot fc-bw1">28</div>
                    <div class="class-time fc-bw1">今天 08:00 结束</div>
                </div>
            </a>
            <a class="class-item">
                <div class="class-img" style="background-image: url(css/images/1.jpg);"></div>
                <div class="class-info">
                    <div class="class-title">广发的发地方撒非得撒ffasdfsad发士大夫撒旦法师的地方</div>
                    <div class="class-hot fc-bw1">28</div>
                    <div class="class-time fc-bw1">今天 08:00 结束</div>
                </div>
            </a>
        </div>
    </page>
</template>

<script>
    import Page from './Page';
    import ClassListItem from './ClassListItem';

    export default {
        components: {
            Page,
            ClassListItem
        }
    }
</script>

<style>
    .live-page {  }
    .live-page .header-info-box {
        height: 19.4rem;
        padding: 1.6rem;
        background: center no-repeat; background-size: cover;
        color: #fff;
        text-align: center;
        overflow: hidden;
    }
    .live-page .header-info-box .bg-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: center no-repeat; background-size: 100% 100%; }
    .live-page .header-info-box .top-bar {
        font-size: 1.2rem;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
    }
    .live-page .header-info-box .link-main { position: absolute; left: 1.6rem; top: 1.6rem; font-size: 1.8rem; }
    .live-page .header-info-box .link-setting { position: absolute; right: 1.6rem; top: 1.6rem; font-size: 1.8rem; }
    .live-page .header-info-box { display: flex; flex-direction: column; align-items: center; position: relative; }
    .live-page .header-info-box .live-icon-box { position: relative; display: block; width: 6rem; height: 6rem; padding: 0.4rem; background: rgba(255,255,255,0.6); border-radius: 50%; flex: 0 0 auto; transition: all ease 0.3s; }
    .live-page .header-info-box .live-icon { display: block; width: 100%; height: 100%;  background: center no-repeat; background-size: cover; }
    .live-page .header-info-box .live-title { line-height: 1; flex: 0 0 auto; transition: all ease 0.3s; }
    .live-page .header-info-box .live-desc { position: relative; display: block; width: 100%; padding-right: 1em; text-align: left; font-size: 1.2rem; height: 1.5em; overflow: hidden; /*white-space: nowrap; text-overflow: ellipsis; word-break: break-all;*/ transition: all ease 0.3s; }
    .live-page .header-info-box .live-desc:after { position: absolute; bottom: 0; right: 0;  font-family: iconfont; content: "\e612"; text-align: center; transition: all ease 0.3s; transform-origin: center center; }
    .live-page .header-info-box .btn-fav { position: absolute; left: 50%; bottom: 1.6rem; transform: translateX(-50%); height: 2.3rem; line-height: 2.3rem; padding: 0 1rem; border-radius: 2.3rem; }
    .live-page .header-info-box .btn-fav:after { margin-left: 0.5rem; font-family: iconfont; content: "\e60d"; }
    .live-page .header-info-box .btn-fav.state-faved:after { content: "\e613"; }

    .live-page .header-info-box.open .live-icon-box { margin-top: -5rem; opacity: 0; }
    .live-page .header-info-box.open .live-title { }
    .live-page .header-info-box.open .live-desc {  height: 9em; white-space: normal; }
    .live-page .header-info-box.open .live-desc:after { transform: rotate(180deg); }   
</style>