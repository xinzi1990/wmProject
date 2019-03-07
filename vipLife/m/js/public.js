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

function toHex(str){
	var dest = "";
	for (var i = 0; i < str.length; i++) {
		dest += str.charCodeAt(i).toString(16);
	}
	return dest;
}
function login(){
	var loginUrl = 'http://passport.wanmei.com/sso/login?service=ssowanmei&continue=logintoiframe&isiframe=1&location=' + toHex(location.href);
	var layer = $('#loginLayer');
	if (layer.size() == 0) {
		layer = $('<div id="loginLayer"></div>');
		layer.css({
			'width': '624px',
			'height': '310px',
			'position': 'fixed',
			'left': '50%',
			'top': '50%',
			'margin-left': '-312px',
			'margin-top': '-155px',
			'border-top': '3px solid #dc4949',
			'background':'#fff',
			'padding-top':'50px',
			'z-index': 111
		});
		var closeBtn = $('<a onclick="closeLogin()"></a>')
		closeBtn.css({
			'position': 'absolute',
			'right': '14px',
			'top': '14px',
			'width': '20px',
			'height': '20px',
			'cursor': 'pointer',
			'background':'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEUAAAB6cHAAAAC7N4c0AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAiSURBVAjXY3BgEABCBwYWRgYGRhYGBoYACAaxQWIgOaAaACdCAfWeiITAAAAAAElFTkSuQmCC) 50% 50% no-repeat'
		});
		layer.append(closeBtn);
		layer.append('<iframe scrolling="no" allowtransparency="yes" src="' + loginUrl + '" frameborder="0" width="624" height="310"></iframe>');
		$('body').append(layer);
	}
	layer.show();
}
function closeLogin(){
	$('#loginLayer').hide();
}
function loginOut(){
	var qurl=window.location.href;
	$('.top_bar .after a').attr('href','https://passport.wanmei.com/sso/logout?service=csgo&serviceurl='+qurl);
}

var isLogin = false;//声明一个全局变量用来判断是否登录
var userId;
var userName;
var nickName;
$.ajax({
	url:"http://vipservice.wanmei.com/loginStatus",
	type:"POST",
	dataType:"jsonp",
	success:function(data){
		if(data.code==0){
			isLogin = true;
			userId = data.result.userId;
			CookieUtil.setAll('cookie',{userId:userId},'','/','.wanmei.com');
			userName = data.result.username;
			nickName = data.result.nickname;
			$('.top_bar .before').hide();
			$('.top_bar .after').show();
			$('.top_bar .after span').html(userName);
		}else{
			$('.top_bar .before').show();
			$('.top_bar .after').hide();
		}
	}
});

function isVipUserInfoComplete(){
	$.ajax({  
		type: "GET",  
		url: "http://vipservice.wanmei.com/vipInfo",
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code == 0 && data.result ){
				if(!data.result.infoDate || data.result.infoDate == ''){
					//alert('补填好个人信息后才能操作！');
					var pathname = window.location.pathname;
					if(pathname.indexOf('userinfo') == -1){
						window.location.href = 'http://vip.wanmei.com/userinfo.html';
					}
				}
			}else{
				//alert(data.message);
			}
		},  
		error: function(e){  
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}  
	});
}
// isVipUserInfoComplete();

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

//公共地址
var baseUrl = 'http://vipservice.wanmei.com/';