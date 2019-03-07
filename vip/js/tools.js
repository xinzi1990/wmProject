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

window.console = window.console || (function () {  
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile  
    = c.clear = c.exception = c.trace = c.assert = function () { };  
    return c;  
})();  

//获取游戏名称的
function checkGameName(str){
	switch(Number(str)){
		case 4:
			return {
				imUrl:'imzxgames',
				name:'诛仙3'	
			}
		break;
		case 3:
			return {
				imUrl:'imwmgjgames',
				name:'鑫仔国际2'	
			}
		break;
		case 21:
			return {
				imUrl:'imxagames',
				name:'笑傲江湖OL'	
			}
		break;	
		case 9:
			return {
				imUrl:'immhgames',
				name:'梦幻诛仙2'	
			}
		break;	
		case 2:
			return {
				imUrl:'imwlgames',
				name:'武林外传'
			}
		break;	
		case 8:
			return {
				imUrl:'imsgcqgames',
				name:'神鬼传奇'
			}
		break;	
		case 12:
			return {
				imUrl:'imsggames',
				name:'神鬼世界'
			}
		break;	
		case 1:
			return {
				imUrl:'imwmsjgames',
				name:'鑫仔世界'
			}
		break;	
		case 5:
			return {
				imUrl:'imcbgames',
				name:'赤壁'
			}
		break;	
		case 6:
			return {
				imUrl:'imxmgames',
				name:'热舞派对Ⅱ'
			}
		break;
		case 11:
			return {
				imUrl:'imsmgames',
				name:'神魔大陆2'
			}
		break;
		case 7:
			return {
				imUrl:'imkdgames',
				name:'口袋西游'
			}
		break;
		case 15:
			return {
				imUrl:'imsdgames',
				name:'神雕侠侣'
			}
		break;
		case 19:
			return {
				imUrl:'imsdsgames',
				name:'圣斗士星矢OL'
			}
		break;
		case 22:
			return {
				imUrl:'imdotagames',
				name:'DOTA2'
			}
		break;
		case 37:
			return {
				imUrl:'imsgcqjdbgames',
				name:'神鬼传奇经典版'
			}
		break;
		case 36:
			return {
				imUrl:'imhexgames',
				name:'HEX'
			}
		break;
		case 34:
			return {
				imUrl:'imsspmlgames',
				name:'蜀山缥缈录'
			}
		break;
		case 48:
			return {
				imUrl:'imhyzsgames',
				name:'幻影突击'
			}
		break;
		case 50:
			return {
				imUrl:'imcszcgames',
				name:'创世战车'
			}
		break;
		case 52:
			return {
				imUrl:'imcsgogames',
				name:'CS:GO'
			}
		break;
		case 20:
			return {
				imUrl:'imtouchgames',
				name:'TOUCH'
			}
		break;
		case 69:
			return {
				imUrl:'imsdlygames',
				name:'怀旧版神雕侠侣'
			}
		break;
	} 
}

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

