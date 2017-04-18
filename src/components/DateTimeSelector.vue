<template>
    <bottom-menu class="datetimeselector" @maskclick="cancelSelect" v-show="show">
        <div class="datetimeselector-body">
            <div class="datetimeselector-btnbar">
                <span class="btn btn-cancel" @click="cancelSelect">取消</span>
                <span class="btn btn-current" @click="setCurrent">当前</span>
                <span class="btn btn-sure" @click="sureSelect">确认</span>
            </div>
            <ul class="datetimeselector-label-list">
                <template v-if="showDate">
                    <li class="selector-label">年</li>
                    <li class="selector-label">月</li>
                    <li class="selector-label">日</li>
                </template>
                <template v-if="showTime">
                    <li class="selector-label">时</li>
                    <li class="selector-label">分</li>
                    <li v-if="showSec" class="selector-label">秒</li>
                </template>
                

            </ul>
            <ul class="datetimeselector-list">
                <template v-if="showDate">
                    <li class="selector-year">
                        <selector :show="show" :default="year" :datalist="yearList" @change="yearChange"></selector>
                    </li>
                    <li class="selector-month">
                        <selector :show="show" :default="month" :datalist="monthList" @change="monthChange"></selector>
                    </li>
                    <li class="selector-day">
                        <selector :show="show" :default="day" :datalist="dayList" @change="dayChange"></selector>
                    </li>
                </template>
                
                <template v-if="showTime">
                    <li class="selector-hour">
                        <selector :show="show" :default="hour" :datalist="hourList" @change="hourChange"></selector>
                    </li>
                    <li class="selector-min">
                        <selector :show="show" :default="min" :datalist="minList" @change="minChange"></selector>
                    </li>
                    <li v-if="showSec" class="selector-sec">
                        <selector :show="show" :default="sec" :datalist="secList" @change="secChange"></selector>
                    </li>
                </template>
            </ul>
        </div>
    </bottom-menu>
</template>

<script>
    import Selector from './Selector';
    import BottomMenu from './BottomMenu';
    export default {
        name: 'DateTimeSelector',
        props:{
            show: {
                type: Boolean,
                default: false
            },
            default: {
                default(){
                    return new Date();
                }
            },
            minYear:{
                type: Number,
                default: new Date().getFullYear()
            },
            maxYear:{
                type: Number,
                default: new Date().getFullYear() + 3
            },
            showDate: {
                type: Boolean,
                default: true
            },
            showTime: {
                type: Boolean,
                default: true
            },
            showSec:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                year: null,
                month: null,
                day: null,
                hour: null,
                min: null,
                sec: null,
                yearList:[],
                monthList: [],
                dayList:[],
                hourList:[],
                minList:[],
                secList:[]
            }
        },
        computed: {
            value(){
                let value = '';
                if(this.showDate){
                    value += this._fixZero(this.year) + '-'+this._fixZero(this.month)+'-'+this._fixZero(this.day);
                }
                if(this.showTime){
                    if(this.showDate){
                        value +=' ';
                    }
                    value+=this._fixZero(this.hour)+':'+this._fixZero(this.min);
                    if(this.showSec){
                        value+=this._fixZero(this.sec);
                    }
                }
                return value;
            },
            maxDay(){
                let maxDay = 31;
                if([4,6,9,11].indexOf(this.month)>-1){
                    maxDay = 30;
                }
                else if(this.month==2){
                    if((this.year % 4 == 0) && (this.year % 100 != 0 || this.year % 400 == 0)){
                        maxDay = 29;
                    }
                    else{
                        maxDay = 28;
                    }
                }
                return maxDay;
            }
        },
        methods: {
            _updateList(list,min,max){
                let len = max - min +1;
                list.splice(len);
                for(let i=0;i<len;i++){
                    this.$set(list,i,{value: min+i,text: this._fixZero(min+i)});
                }
            },
            updateYearList(){
                this._updateList(this.yearList,this.minYear,this.maxYear);           
            },
            updateMonthList(){
                this._updateList(this.monthList,1,12);
            },
            updateDayList(){
                this._updateList(this.dayList,1,this.maxDay);
            },
            updateHourList(){
                this._updateList(this.hourList,0,23);
            },
            updateMinList(){
                this._updateList(this.minList,0,59);
            },
            updateSecList(){
                this._updateList(this.secList,0,59);
            },
            yearChange(data){
                this.year = +data.value;
                this.updateDayList();
            },
            monthChange(data){
                this.month = +data.value;
                this.updateDayList();
            },
            dayChange(data){
                this.day = +data.value;
            },
            hourChange(data){
                this.hour = +data.value;
            },
            minChange(data){
                this.min = +data.value;
            },
            secChange(data){
                this.sec = +data.value;
            },
            _fixZero(num){
                if(num<10){
                    return '0'+num;
                }
                return ''+num;
            },
            _setValue(date){
                if(this.showDate){
                    this.year = date.getFullYear();
                    this.month = date.getMonth()+1;
                    this.day = date.getDate();
                }
                if(this.showTime){
                    this.hour = date.getHours();
                    this.min = date.getMinutes();
                    if(this.showSec){
                        this.sec = date.getSeconds();
                    }
                }
            },
            _setValueByDefault(){
                let date = null;
                if(typeof this.default ==='string'){
                    date = new Date(this.default.replace(/-/g,'/'))
                }
                else{
                    date = this.default || new Date();
                }
                this._setValue(date);
            },
            cancelSelect(){
                this._setValueByDefault();
                this.$emit('cancel');
            },
            sureSelect(){
                this.$emit('change',this.value);
            },
            setCurrent(){
                this._setValue(new Date());
            }
        },
        watch: {
            show(){
                this._setValueByDefault();
            },
            default(newValue){
                this._setValueByDefault();
            },
            maxDay(newValue){
                this.updateDayList();
            }
        },
        mounted () {
            this._setValueByDefault();
            if(this.showDate){
                this.updateYearList();
                this.updateMonthList();
                this.updateDayList();
            }
            if(this.showTime){
                this.updateHourList();
                this.updateMinList();
                if(this.showSec){
                    this.updateSecList();
                }
            }
        },
        components: {
            Selector,
            BottomMenu
        }
    }
</script>

<style scoped>
    .datetimeselector { color: #666; }
    .datetimeselector-btnbar { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; }
    .datetimeselector-btnbar .btn { flex: 1; height: 30px; line-height: 30px; border: 0 none;  }
    .datetimeselector-btnbar .btn-cancel { background: #fff; color: #999; }
    .datetimeselector-btnbar .btn-current { border-left: 1px solid #eee; background: #fff; color: #666; }
    .datetimeselector-list { display: flex; background: #fff; }
    .datetimeselector-list>li { flex: 1; }
    .datetimeselector-label-list { display: flex; background: #fff; }
    .datetimeselector-label-list>li { flex: 1; text-align: center; line-height: 24px; }
</style>