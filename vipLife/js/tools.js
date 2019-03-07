// JavaScript Document
var CookieUtil = (function () {
    var Cookie = function () {
        // 获取单值cookie
        this.get = function(name) {
            var start = document.cookie.indexOf(encodeURIComponent(name)) ;
            var end = document.cookie.indexOf(';', start) ;
            if(end == -1) {
                end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start+name.length+1,end));
        };
        
        // 设置单值cookie
        this.set = function(name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            // 设置默认过期时间为七天
            if(expires == undefined) {
                var date = new Date();
                date.setTime(date.getTime() + 7*24*60*60*1000);
                expires = date ;
            }
            if(expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            if(path != undefined) {
                cookieText += "; path=" + path;
            }
            if(domain != undefined) {
                cookieText += "; domain" + domain;
            }
            if(secure != undefined) {
                cookieText += "; secure";
            }
            document.cookie = cookieText;
        };
        
        // 清除单值cookie
        this.unset = function(name, path, domain, secure) {
            this.set(name, '', new Date(0), path, domain, secure );
        };
        // 设置多值cookie
        this.setAll = function(name, subCookies, expires, path, domain, secure) {
            var cookieText = ";" + encodeURIComponent(name) + "=",
            arr = new Array();
            for(var attr in subCookies) {
                arr.push([encodeURIComponent(attr)] + ":" + encodeURIComponent(subCookies[attr]));
            } 
            this.set(name, arr.join('&'), expires, path, domain, secure);
        };
        
        // 获取多值cookie
        this.getAll = function(name) {
            var obj = {};
            var arr = this.get(name).split('&');
            for(var i = 0, len = arr.length; i < len; i++) {
                var tmpArr = arr[i].split(':');
                obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1]);
            }
            return obj;
        };
        
        // 获取多值cookie的子cookie
        this.getSub = function(name, subname) {
            var obj = this.getAll(name);
            return obj[subname];
        };
        
        // 清除指定的多值cookie
        this.unsetAll = function(name,path,domain,secure) {
            this.unset(name, '', new Date(0), path, domain, secure);
        };
  
        // 清除指定多值cookie的子cookie
        this.unsetSub = function(name, subname,path, domain, secure) {
            var obj = this.getAll(name);
            delete obj[subname];
            this.setAll(name, obj, null, path, domain, secure);
        };
    };
    return new Cookie();
})();

//获取URL参数
function getParams(key){
    var url = location.search.replace(/^\?/,'').split('&');
    var paramsObj = {};
    for(var i = 0, iLen = url.length; i < iLen; i++){
        var param = url[i].split('=');
        paramsObj[param[0]] = param[1];
    }
    if(key){
        return paramsObj[key] || '';
    }
    return paramsObj;
}
function dateFormatUtil(longTypeDate){
	var dateTypeDate = "";
	var date = new Date();
	date.setTime(longTypeDate);
	dateTypeDate += date.getFullYear(); //年
	dateTypeDate += "-" + getMonth(date); //月
	dateTypeDate += "-" + getDay(date); //日
	dateTypeDate += " " + getHours(date); //时
	dateTypeDate += ":" + getMinutes(date); //分
	dateTypeDate += ":" + getSeconds(date); //秒
	return dateTypeDate;
}
//返回 01-12 的月份值
function getMonth(date){
	var month = "";
	month = date.getMonth() + 1; //getMonth()得到的月份是0-11
	if(month<10){
		month = "0" + month;
	}
	return month;

}
//返回01-30的日期
function getDay(date){
	var day = "";
	day = date.getDate();
	if(day<10){
		day = "0" + day;
	}
	return day;

}
// 返回小时
function getHours(date){
	var hours = "";
	hours = date.getHours();
	if(hours<10){
		hours = "0" + hours;

	}
	return hours;

}
// 返回分钟
function getMinutes(date){
	var minutes = "";
	minutes = date.getMinutes();
	if(minutes<10){
		minutes = "0" + minutes;
	}
	return minutes;
}
// 返回秒
function getSeconds(date){
	var seconds = "";
	seconds = date.getSeconds();
	if(seconds<10){
		seconds = "0" + seconds;
	}
	return seconds;
}



