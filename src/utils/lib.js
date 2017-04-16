/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
Date.prototype.isToday = function() {
    return new Date(this.toString()).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
}
Date.prototype.toLocalDateStr = function() {
    var now = new Date();
    if (this.isToday()) {
        return '今天';
    } else if (new Date(this.setHours(this.getHours() + 24)).isToday()) {
        return '昨天';
    }
    return this.format('MM-dd');
}
String.prototype.dateJsonToDate = function(fixHours) {
    var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
    return new Date(date.setHours(date.getHours() + (fixHours || 0)));
}
String.prototype.dateJsonFormat = function(fmt, fixHours) {
    return this.dateJsonToDate(fixHours).format(fmt);
}
//字符编码数值对应的存储长度：
//UCS-2编码(16进制) UTF-8 字节流(二进制)
//0000 - 007F       0xxxxxxx （1字节）
//0080 - 07FF       110xxxxx 10xxxxxx （2字节）
//0800 - FFFF       1110xxxx 10xxxxxx 10xxxxxx （3字节）
//String.prototype.getBytesLength = function() {
//    var totalLength = 0;
//    var charCode;
//    for (var i = 0; i < this.length; i++) {
//        charCode = this.charCodeAt(i);
//        if (charCode < 0x007f)  {
//            totalLength++;
//        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {
//            totalLength += 2;
//        } else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {
//            totalLength += 3;
//        } else{
//            totalLength += 4;
//        }
//    }
//    return totalLength;
//}
String.prototype.getBytesLength = function() {
    var char = this.replace(/[^\x00-\xff]/g, '**');
    return char.length;
}
Array.prototype.remove = function(ele) {
    for (var index = this.indexOf(ele); index > -1; index = this.indexOf(ele)) {
        this.splice(index, 1);
    }
}

