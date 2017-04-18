<template>
    <page>
        <transition :name="transitionName" mode="in-out">
            <keep-alive>
                <step1 v-if="!isStep2" @goNext="toggleStep"></step1>
                <step2 v-else @goPrev="toggleStep" @create="tryCreate"></step2>
            </keep-alive>
        </transition>      
    </page>
</template>

<script>    
    import Page from './Page';
    import DateTimeSelector from './DateTimeSelector';
    import NormalSelector from './NormalSelector';
    import ImageInput from './ImageInput';

    let formData = {
        cover: null,
        name: '',
        time: null,
        duration: 0,
        classtype: 0,
        needSignInfo: false,
        needVerfy: false,
        customKeyA: '',
        customKeyB: '',
        customKeyC: '',
        customKeyD: '',
        price: 0,
        password: ''
    };

    const Step1 = {
        template: `
            <page class="class-create-page step1">
                <image-input :change="coverInputed">
                    <div class="class-cover" data-filename="cover" :style="{'background-image': coverImage}">
                        <div class="setting-tips" v-show="!coverImage">
                            <i class="iconfont icon-camera-fill"></i>
                            <span>设置课程封面</span>
                        </div>
                    </div>
                </image-input>
                
                <section class="form">
                    <div class="form-item">
                        <label class="iconfont icon-book-open"></label>
                        <input :value="name" type="text" placeholder="请输入课程名称（仅限16字）" />
                    </div>
                    <div class="form-item" @click="dateSelectorShow=true">
                        <label class="iconfont icon-clock"></label>
                        <input :value="time" type="text" placeholder="请设置课程开始时间" readonly />
                    </div>
                    <div class="form-item" @click="durationSelectorShow=true">
                        <label class="iconfont icon-hourglass"></label>
                        <input :value="durationText" type="text" placeholder="请选择课程时长" readonly />
                    </div>
                </section>
                <date-time-selector :show="dateSelectorShow" :default="time" @cancel="dateSelectorShow=false" @change="dateChange"/>
                <normal-selector :show="durationSelectorShow" :default="duration" :datalist="durationItemList" @cancel="durationSelectorShow=false" @change="durationChange"/>
                <template slot="footer">
                    <div class="btn btn-next" @click="$emit('goNext')">下一步</div>
                </template>
            </page>
        `,
        data(){
            return {
                show: false,
                cover: null,
                name: '',
                time: null,
                duration: 0,
                durationText: '',
                dateSelectorShow: false,
                durationSelectorShow: false,
                coverImage: null,
                durationItemList: [
                    { value: 60, text: '1小时' },
                    { value: 90, text: '1.5小时' },
                    { value: 120, text: '2小时' },
                    { value: 150, text: '2.5小时' },
                    { value: 180, text: '3小时' },
                    { value: 240, text: '4小时' },                    
                ]
            }
        },
        methods:{
            dateChange(value){
                this.time= value;
                this.dateSelectorShow = false;
            },
            durationChange(data){
                this.duration = data.value;
                this.durationText = data.text;
                this.durationSelectorShow = false;
            },
            coverInputed(data){
                console.log(data);
                this.coverImage = 'url('+data.sources[0]+')';
            }
        },
        watch: {
            cover(value){
                formData.cover = value; 
            },
            name(value){
                formData.name = value;
            },
            time(value){
                formData.time = value;
            },
            duration(value){
                formData.duration = value;
            }

        },
        components: {
            Page,
            DateTimeSelector,
            NormalSelector,
            ImageInput
        },
        created(){
            formData.cover = this.cover;
            formData.name = this.name;
            formData.time = this.time;
            formData.duration = this.duration;
        }
    };

    const Step2 = {
        template: `
            <page class="class-create-page step2">
                <div class="tabs-classtype">
                    <div :class="{'active': classtype===0}" class="tab" @click="classtype=0">
                        <i class="icon icon-free"></i>
                        <span class="text">免费课程</span>
                    </div>
                    <div :class="{'active': classtype===1}" class="tab" @click="classtype=1">
                        <i class="icon icon-fee"></i>
                        <span class="text">收费课程</span>
                    </div>
                    <div :class="{'active': classtype===2}" class="tab" @click="classtype=2">
                        <i class="icon icon-lock"></i>
                        <span class="text">加密课程</span>
                    </div>
                </div>
                <div>
                    <section v-show="classtype===0">
                        <div class="classtype-form classtype-freeinfo-form">
                            <div class="desc">学员无需交费即可进入课程</div>
                        </div>
                    </section>
                    <section v-show="classtype===1">
                        <div class="classtype-form classtype-chargeinfo-form">
                            <div class="desc">学员需交费后进入课程</div>
                            <input type="number" pattern="[\.0-9]*" placeholder="请设置收费金额" v-model:value="price" />
                        </div>
                    </section>
                    <section v-show="classtype===2">
                        <div class="classtype-form classtype-encryptedinfo-form">
                            <div class="desc">学员需输入密码后进入课程</div>
                            <input type="password" placeholder="请输入课程密码" v-model:value="password" />
                        </div>
                    </section>
                </div>
                <section :class="{active: needSignInfo}" class="form pd-lr-m bd-t mg-t-s sign-form">
                    <div class="form-item">
                        <label>学生报名时需填写信息</label>
                        <div>
                            <span :class="{'active': needSignInfo}" class="switch" @click="needSignInfo=!needSignInfo"></span>
                        </div>
                    </div>
                    <div class="form-item bd-none">
                        <input type="text" v-model:value="customKeyA" readonly />
                        <span class="checkbox active mg-l-s"></span>
                    </div>
                    <div class="form-item bd-none">
                        <input type="text" v-model:value="customKeyB" readonly />
                        <span :class="{active: includeCustomKeyB}" class="checkbox mg-l-s" @click="includeCustomKeyB=!includeCustomKeyB"></span>
                    </div>
                    <div class="form-item bd-none" v-show="showCustomKeyC">
                        <input type="text" placeholder="报名的信息（例如QQ）" v-bind:value="customKeyC" />
                        <span class="btn-remove mg-l-s mg-r-s" @click="showCustomKeyC=false"></span>
                        <span :class="{active:requireCustomKeyC}" class="checkbox mg-l-s" @click="requireCustomKeyC=!requireCustomKeyC">必填</span>
                    </div>
                    <div class="form-item bd-none" v-show="showCustomKeyD">
                        <input type="text" placeholder="报名的信息（例如职位）" v-bind:value="customKeyD" />
                        <span class="btn-remove mg-l-s mg-r-s" @click="showCustomKeyD=false"></span>
                        <span :class="{active:requireCustomKeyD}" class="checkbox mg-l-s" @click="requireCustomKeyD=!requireCustomKeyD">必填</span>
                    </div>
                    <div class="form-item bd-none pd-t-m" v-show="!showCustomKeyC || !showCustomKeyD">
                        <button class="cbtn btn-main btn-normal-green btn-additem" @click="appendCustomKey"><i class="iconfont icon-plus"></i> 新增信息项目</button>
                    </div>
                    <div class="form-item">
                        <span :class="{active: needVerfy}" class="radio" @click="needVerfy=!needVerfy">开启审核</span>
                    </div>
                </section>
                <template slot="footer">
                    <div class="btn btn-normal btn-prev" @click="$emit('goPrev')">上一步</div>
                    <div class="btn btn-create" @click="$emit('create')">创建</div>
                </template>
            </page>
        `,
        data(){
            return {
                classtype: 0,
                needSignInfo: false,
                customKeyA: '姓名',
                customKeyB: '电话',
                customKeyC: '',
                customKeyD: '',
                includeCustomKeyB: true,
                showCustomKeyC: false,
                showCustomKeyD: false,
                needVerfy: false,
                requireCustomKeyC: true,
                requireCustomKeyD: true,
                price: 0,
                password: ''
            }
        },
        methods:{
            appendCustomKey(){
                if(!this.showCustomKeyC){
                    this.showCustomKeyC = true;
                }
                else{
                    this.showCustomKeyD = true;
                }
            }
        },
        watch:{
            includeCustomKeyB(newValue){
                if(newValue){
                    formData.customKeyB = this.customKeyB;
                }
                else{
                    formData.customKeyB = '';
                }
            },
            showCustomKeyC(newValue){
                if(!newValue){
                    this.customKeyC = '';
                }
            },
            showCustomKeyD(newValue){
                if(!newValue){
                    this.customKeyD = '';
                }
            },
            classtype(value){
                formData.classtype = value;
            },
            needSignInfo(value){
                formData.needSignInfo = value;
            },
            needVerfy(value){
                formData.needVerfy = value;
            },
            customKeyC(value){
                formData.customKeyC = value;
            },
            customKeyD(value){
                formData.customKeyC = value;
            },
            price(value){
                formData.price = value;
            },
            password(value){
                formData.password = value;
            }
            
        },
        components: {
            Page
        },
        created(){
            formData.classtype = this.classtype;
            formData.customKeyA = this.customKeyA;
            formData.customKeyB = this.customKeyB;
            formData.customKeyC = this.customKeyC;
            formData.customKeyD = this.customKeyD;
            formData.needSignInfo = this.needSignInfo;
            formData.needVerfy = this.needVerfy;       
            formData.password = this.password;
            formData.price = this.price;   
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
            },
            tryCreate(){
                
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

    .class-create-page.step1 .class-cover { width: 100%; padding-top: 56.25%; background: center no-repeat; background-size: 100% 100%; position: relative; }
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