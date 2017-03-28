<template>
    <page>
        <transition :name="transitionName" mode="in-out">
            <step1 v-if="!isStep2" @goNext="toggleStep"></step1>
            <step2 v-else @goPrev="toggleStep"></step2>
        </transition>      
    </page>
</template>

<script>    
    import Page from './Page';
    import DateTimeSelector from './DateTimeSelector';
    const Step1 = {
        template: `
            <page class="class-create-page step1">
                <form class="createclass-form">
                    <section class="class-cover" data-filename="cover">
                        <div class="setting-tips">
                            <i class="iconfont icon-camera-fill"></i>
                            <span>设置课程封面</span>
                        </div>
                    </section>
                    <section class="form">
                        <div class="form-item">
                            <label class="iconfont icon-book-open"></label><input class="input-name" name="name" type="text" placeholder="请输入课程名称（仅限16字）" />
                        </div>
                        <div class="form-item">
                            <label class="iconfont icon-clock"></label><input class="input-time" name="time" type="text" placeholder="请设置课程开始时间" readonly />
                        </div>
                        <div class="form-item">
                            <label class="iconfont icon-hourglass"></label>
                            <div class="select">
                                <input name="duation" type="hidden" value="" />
                                <span class="text placeholder">请选择课程时长</span>
                                <select>
                                    <option>1小时</option>
                                    <option>1.5小时</option>
                                    <option>2小时</option>
                                    <option>2.5小时</option>
                                    <option>3小时</option>
                                    <option>4小时</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </form>
                <template slot="footer">
                    <div class="btn btn-next" @click="$emit('goNext')">下一步</div>
                </template>
            </page>
        `,
        data(){
            return {

            }
        },
        components: {
            Page
        }
    };

    const Step2 = {
        template: `
            <page class="class-create-page step2">
                <input class="input-type" type="hidden" name="classtype" value="" />
                <div class="tabs-classtype">
                    <div class="tab active" data-value="0">
                        <i class="icon icon-free"></i>
                        <span class="text">免费课程</span>
                    </div>
                    <div class="tab" data-value="1">
                        <i class="icon icon-fee"></i>
                        <span class="text">收费课程</span>
                    </div>
                    <div class="tab" data-value="2">
                        <i class="icon icon-lock"></i>
                        <span class="text">加密课程</span>
                    </div>
                </div>
                <div class="tabcontent-list">
                    <section class="tabcontent">
                        <div class="classtype-form classtype-freeinfo-form">
                            <div class="desc">学员无需交费即可进入课程</div>
                        </div>
                    </section>
                    <section class="tabcontent">
                        <div class="classtype-form classtype-chargeinfo-form">
                            <div class="desc">学员需交费后进入课程</div>
                            <input type="number" pattern="[\.0-9]*" placeholder="请设置收费金额" />
                        </div>
                    </section>
                    <section class="tabcontent">
                        <div class="classtype-form classtype-encryptedinfo-form">
                            <div class="desc">学员需输入密码后进入课程</div>
                            <input type="password" placeholder="请输入课程密码" />
                        </div>
                    </section>
                </div>
                <section class="form pd-lr-m bd-t mg-t-s sign-form">
                    <div class="form-item">
                        <label>学生报名时需填写信息</label>
                        <div>
                            <span class="switch switch-signform"><input type="hidden" value="false" /> </span>
                        </div>
                    </div>
                    <div class="form-item bd-none">
                        <input type="text" name="customKeyA" value="姓名" />
                        <span class="checkbox active mg-l-s disabled" data-init-control="initCheckbox"><input type="hidden" value="" /></span>
                    </div>
                    <div class="form-item bd-none">
                        <input type="text" name="customKeyB" value="电话" />
                        <span class="checkbox active mg-l-s" data-init-control="initCheckbox"><input type="hidden" value="" /></span>
                    </div>
                    <!--<div class="form-item bd-none">-->
                        <!--<input type="text" name="customKeyC" placeholder="报名的信息（例如QQ）" value="" />-->
                        <!--<span class="btn-remove mg-l-s mg-r-s"></span>-->
                        <!--&lt;!&ndash;<span class="checkbox active mg-l-s" data-init-control="initCheckbox">必填<input type="hidden" value="" /></span>&ndash;&gt;-->
                    <!--</div>-->
                    <!--<div class="form-item bd-none">-->
                        <!--<input type="text" name="customKeyD" placeholder="报名的信息（例如职位）" value="" />-->
                        <!--<span class="btn-remove mg-l-s mg-r-s"></span>-->
                        <!--&lt;!&ndash;<span class="checkbox mg-l-s" data-init-control="initCheckbox">必填<input type="hidden" value="" /></span>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="form-item bd-none pd-t-m">
                        <button class="cbtn btn-main btn-normal-green btn-additem"><i class="iconfont icon-plus"></i> 新增信息项目</button>
                    </div>
                    <div class="form-item">
                        <span class="radio" data-init-control="initCheckbox">开启审核<input type="hidden" value="" /></span>
                    </div>
                </section>
                <template slot="footer">
                    <div class="btn btn-normal btn-prev" @click="$emit('goPrev')">上一步</div>
                    <div class="btn btn-create">创建</div>
                </template>
            </page>
        `,
        data(){
            return {

            }
        },
        components: {
            Page
        }
    };

    export default {
        name: 'CreateClass',
        data(){
            return {
                isStep2: false
            }
        },
        methods: {
            toggleStep(){
                this.isStep2 = !this.isStep2;
            }
        },
        computed: {
            transitionName(){
                return this.isStep2?'page-left-in':'page-right-in';
            }  
        },
        components: {
            Page,
            Step1,
            Step2
        }
    }
</script>

<style>
    .class-create-page .form .form-item input { width: auto; }

    .class-create-page.step1 .class-cover { width: 100%; padding-top: 56.25%; background: center no-repeat; background-size: contain; position: relative; }
    .class-create-page.step1 .class-cover .setting-tips { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content:  center; align-items: center; background: rgba(0,0,0,0.5); color: #fff; }
    .class-create-page.step1 .class-cover .setting-tips i { font-size: 3.2rem; }
    .class-create-page.step1 .class-cover .setting-tips span { font-size: 1.2rem; }
    .class-create-page.step1 .form label { width: 2.6rem; font-size: 1.6rem; color: #969696; }
    .class-create-page.step1 .form .form-item { justify-content: flex-start; padding: 0 1.6rem; }
    .class-create-page.step1 .form .select { width: 100%; }
    .class-create-page.step1 .form .select:after { display: none; }


    .class-create-page .tabs-classtype { display: flex; height: 11.3rem; background: #59b574; justify-content: space-around; align-items: center; }
    .class-create-page .tabs-classtype .tab { width: auto; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #90d8a5;  }
    .class-create-page .tabs-classtype .tab .icon { width: 6.6rem; height: 6.6rem; border-radius: 50%; border: 1px solid #90d8a5; display: flex; justify-content: center; align-items: center; }
    .class-create-page .tabs-classtype .tab .icon:after { width: 3.5rem; height: 3.5rem; background: url(../assets/css/images/icons-classtype.png) -4.6rem 0rem no-repeat; background-size: 8.5rem; content: ""; }
    .class-create-page .tabs-classtype .tab .text { margin-top: 0.8rem; line-height: 1; }
    .class-create-page .tabs-classtype .tab .icon-free:after { background-position-y: -0.3rem; }
    .class-create-page .tabs-classtype .tab .icon-fee:after { background-position-y: -3.7rem; }
    .class-create-page .tabs-classtype .tab .icon-lock:after { background-position-y: -7.3rem; }
    .class-create-page .tabs-classtype .tab.active { color: #fff; }
    .class-create-page .tabs-classtype .tab.active .icon { background: #fff; border-color: #fff; }
    .class-create-page .tabs-classtype .tab.active .icon:after { background-position-x: -0.3rem; }
    .class-create-page .sign-form .checkbox:not(.active) { color: #969696; }
    .class-create-page .sign-form .checkbox:not(.active):before { color: #969696; }
    .class-create-page .sign-form .checkbox.active { color: #59b574; }
    .class-create-page .sign-form .form-item { align-items: stretch; line-height: 4.4rem; }
    .class-create-page .sign-form .form-item.bd-none input { border-bottom: 1px solid #e6e6e6; }
    .class-create-page .classtype-form { padding: 1.6rem 1.6rem; min-height: 4.4rem; display: flex; flex-direction: column; justify-content: center; align-items: stretch; }
    .class-create-page .classtype-form .desc { font-size: 1.2rem; }
    .class-create-page .classtype-form input { height: 4rem; border: none; border-bottom: 1px solid #59b574; }
    .class-create-page .btn-prev { width: 50%; }

    .class-create-page .sign-form:not(.active) .form-item:not(:first-child) { display: none; }
    .class-create-page .sign-form:not(.active) :first-child { border-bottom: none; }

    .class-create-page .sign-form .form-item { position: relative; }
    .class-create-page .sign-form .form-item .btn-remove { font-size: 1.6rem; color: #969696; }
    .class-create-page .sign-form .form-item .btn-remove:before { font-family: iconfont; content: "\e618"; }
</style>