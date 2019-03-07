;(function($) {
    var top_bar = '<div class="top_con_l"><div class="title"><a href="http://vip.wanmei.com/life/index.html"><span class="red">VIP生活特权</span>|<span>观影</span></a></div></div>\
		<div class="top_con_r">\
			<div class="top_order"><a href="myorder.html" target="_blank">订单中心</a></div>\
			<div class="login_in login_box"><a class="btn_login" href="javascript:;" id="loginIn">登 录</a></div>\
			<div class="login_out login_box"><span>欢迎您！ <label id="userName"><label></span>|<a class="btn_login cor_red" href="javascript:;" id="loginOut">退 出</a></div>\
    	</div>';
    var div = document.createElement('div');
    div.className = 'top_bar';
    div.innerHTML = top_bar;
	var first=document.body.firstChild;
    document.body.insertBefore(div,first);
	$('#loginIn').on('click',function(){
		login();
	})
	$('#loginOut').on('click',function(){
		loginOut();
		//CookieUtil.unsetAll('cookie',userId,'','/','.wanmei.com');
	})
	isVipUserInfoComplete();
})(jQuery);

function loadScript(url,callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
	script.onload = script.onreadystatechange = function () {
		if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
			script.onload = script.onreadystatechange = null;
			if (callback) callback();
			//script.parentNode.removeChild(script);
		}
	};
}

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