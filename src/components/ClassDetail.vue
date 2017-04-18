<template>
    <page class="class-detail-page">
        <header class="header-info-box" style="background-image: url(/css/images/1.jpg);">
            <a class="link link-back" href="#"><span class="iconfont icon-arrowleft"></span></a>
            <a class="link link-share" href="#"><span class="iconfont icon-share"></span></a>
            <span class="link link-changebg">更换背景</span>
        </header>
        <section class="classinfo-box pd-lr-m">
            <div class="row">
                <h1 class="class-title">如何在工作生活当中培养习惯？</h1>
                <div class="class-live-info flex-l">
                    <div class="class-live-from fc-bw1">来自 <span class="class-livename fc-green">大家来冒险</span></div>
                    <div class="cbtn btn-class-fav mg-l-s" :class="{'state-faved':faved}" @click="faved=!faved">{{faved?'已关注':'+关注'}}</div>
                </div>
            </div>
            <div class="row flex-lr">
                <div class="class-hot-count">{{views}}</div>
            </div>
            <div class="row flex-lr">
                <div class="class-time">04.01(周二)17:30</div>
                <i class="iconfont icon-arrowright"></i>
            </div>
            <div class="row flex-lr">
                <div class="class-price fc-yellow">¥ 25.00</div><i class="iconfont icon-arrowright"></i>
            </div>
            <div class="row flex-lr">
                <ul class="student-list flex-l">
                    <li class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></li>
                    <li class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></li>
                    <li class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></li>
                    <li class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></li>
                    <li class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></li>
                </ul>
                <div>
                    <span class="student-count">12164报名</span>
                    <i class="iconfont icon-arrowright"></i>
                </div>
            </div>
        </section>
        <section class="countdown-box pd-lr-m mg-t-s flex-l">
            <label>倒计时</label>
            <div class="countdown">
                <div class="days"></div><span class="unit">天</span>
                <div class="hours"></div><span class="unit">时</span>
                <div class="minutes"></div><span class="unit">分</span>
                <div class="seconds"></div><span class="unit">秒</span>
            </div>
        </section>
        <section class="teacher-box pd-lr-m mg-t-s">
            <div class="row flex-lr">
                <label>讲师简介</label>
                <i class="iconfont icon-add-fill fc-green"></i>
            </div>
            <div class="row teacher">
                <div class="row flex-lr bd-none">
                    <div class="flex-l">
                        <i class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></i>
                        <span class="teacher-name">高原</span>
                        <span class="teacher-role fc-bw1">讲师</span>
                    </div>
                    <div class="flex-r">
                        <i class="iconfont icon-edit fc-bw1"></i>
                        <i class="iconfont icon-minus fc-bw1 mg-l-m"></i>
                    </div>
                </div>
                <div class="teacher-desc">
                    人生导师，通过生活中的点滴小事叫你感悟人生大智慧fasdfasdfasdfas,fasjdflk asdf jas df
                </div>
            </div>
            <div class="row teacher">
                <div class="row flex-lr bd-none">
                    <div class="flex-l">
                        <i class="user-icon" style="background-image: url(https://weiclasstest.blob.core.chinacloudapi.cn/headimgs/8/64.png);"></i>
                        <span class="teacher-name">高原</span>
                        <span class="teacher-role fc-bw1">讲师</span>
                    </div>
                    <div class="flex-r">
                        <i class="iconfont icon-edit fc-bw1"></i>
                        <i class="iconfont icon-minus fc-bw1 mg-l-m"></i>
                    </div>
                </div>
                <div class="teacher-desc">
                    人生导师，通过生活中的点滴小事叫你感悟人生大智慧fasdfasdfasdfas,fasjdflk asdf jas df
                </div>
            </div>
        </section>
        <section class="classdesc-box pd-lr-m mg-t-s">
            <div class="row flex-lr">
                <label>课程简介</label>
                <i class="iconfont icon-edit fc-bw1"></i>
            </div>
            <div class="row class-desc">
                课程减减肥的开发技术发神经打gasfasdfasdfasdfafsdfasdfasdfasdfasdfasdfasfasdfas开阿斯顿发伺机待发撒地方阿斯蒂芬阿萨德发送发送发是打发阿斯蒂芬阿萨德发送发生的发生大发，
            </div>
        </section>
        <figure class="qrcode">
            <img src="http://open.weikebang.com/content/images/weikehelp_code.jpg">
            <figcaption>长按上方二维码，联系开课方</figcaption>
        </figure>
        <div class="weikebang-support">
            <span class="logo"></span>
            <span class="text">微课帮提供技术支持</span>
        </div>
        <template slot="footer">
            <button class="btn btn-normal">报名设置</button>
            <button class="btn btn-normal bd-l">
                <span class="relative">报名列表<span class="pop-tips">12</span></span>
            </button>
            <a class="btn" href="#">进入直播</a>
        </template>
    </page>
</template>

<script>
    import Page from './Page';

    export default {
        data(){
            return {
                faved: false,
                views: 2888,
                
            }
        },
        components: {
            Page
        }
    }
</script>

<style>
    .class-detail-page {  }
    .class-detail-page .header-info-box {
        position: relative;
        height: 56.25vw;
        padding: 1.6rem;
        background: center no-repeat; background-size: cover;
        color: #fff;
        text-align: center;
    }
    .class-detail-page .header-info-box .link-back { position: absolute; left: 1.6rem; font-size: 2.3rem; }
    .class-detail-page .header-info-box .link-share { position: absolute; right: 1.6rem; font-size: 2.3rem;  }
    .class-detail-page .header-info-box .link-changebg { position: absolute; bottom: 0.8rem; right: 0; width: 6.5rem; height: 2.2rem; line-height: 2.2rem; background: rgba(0,0,0,0.5); border-radius: 1.1rem 0 0 1.1rem; font-size: 1.2rem; color: #fff; }

    .class-detail-page .row { min-height: 4.4rem; padding: 0.8rem 0; border-bottom: 1px solid #e6e6e6; }
    .class-detail-page .row:last-child,
    .class-detail-page .row.bd-none { border-bottom: none; }
    .class-detail-page .flex { display: flex; align-items: center; }
    .class-detail-page .flex-l { display: flex; justify-content: flex-start; align-items: center; }
    .class-detail-page .flex-r { display: flex; justify-content: flex-end; align-items: center; }
    .class-detail-page .flex-lr { display: flex; justify-content: space-between; align-items: center; }
    .class-detail-page .classinfo-box .class-title { font-size: 1.6rem; font-weight: normal; line-height: 1.8; }
    .class-detail-page .class-live-info { line-height: 1.8; }
    .class-detail-page .btn-class-fav { width: 5rem; text-align: center; border: 1px solid transparent; }
    .class-detail-page .btn-class-fav:not(.state-faved) { border: 1px solid #59b574; color: #59b574; border-radius: 0.2rem; }
    .class-detail-page .btn-class-fav.state-faved { color: #969696; }
    .class-detail-page .class-hot-count {  }
    .class-detail-page .class-hot-count:before { font-family: iconfont; color: #59b574; content: "\e601"; margin-right: 1rem; font-size: 1.6rem; vertical-align: middle; }
    .class-detail-page .class-time {  }
    .class-detail-page .class-time:before { font-family: iconfont; color: #59b574; content: "\e600"; margin-right: 1rem; font-size: 1.6rem; vertical-align: middle; }
    .class-detail-page .class-price {  }
    .class-detail-page .class-price:before { font-family: iconfont; color: #59b574; content: "\e607"; margin-right: 1rem; font-size: 1.6rem; vertical-align: middle; }
    .class-detail-page .user-icon { width: 3rem; height: 3rem; margin-right: 0.8rem; }
    .class-detail-page .student-count { margin-right: 0.8rem; }
    .class-detail-page .countdown-box { height: 6.5rem; }
    .class-detail-page .countdown-box .countdown { margin-left: 2.0rem; }
    .class-detail-page .teacher-box .teacher-name {  }
    .class-detail-page .teacher-box .teacher-role { margin-left: 0.5em; }
    .class-detail-page .teacher-box .teacher-desc { padding-bottom: 0.8rem; }
    .class-detail-page .classdesc-box .class-desc { padding-bottom: 1.6rem; }

    .class-detail-page .qrcode { margin-top: 2.5rem; text-align: center; }
    .class-detail-page .qrcode img { width: 15rem; height: 15rem; }
    .class-detail-page .qrcode figcaption { color: #969696; font-size: 1.2rem; }
    .class-detail-page .weikebang-support { margin: 2.5rem 0; text-align: center; }
    .class-detail-page .weikebang-support .logo { display: block; margin: 0 auto; }
    .class-detail-page .weikebang-support .text { display: block; color: #969696; font-size: 0.9rem; }

    .class-detail-page .iconfont { font-size: 1.6rem; vertical-align: middle; }
    .class-detail-page .row .icon-arrowright { font-size: inherit; }
</style>