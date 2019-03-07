$(function(){
	//buy
	var success = false;//声明一个全局变量用来判断是否登录
	var userId;
	var userName;
	function loginOut(){
		var qurl=window.location.href;
		$('#loginOutBtn').attr('href','https://passport.wanmei.com/sso/logout?serviceurl='+qurl);
	}
	loginOut();
	function login() {
		var loginUrl = 'http://passport.wanmei.com/sso/login?service=ssowanmei&continue=logintoiframe&isiframe=1&location=' + toHex(location.href);
		var layer = $('#loginLayer');
		if (layer) {
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
		$('.prompt_bg').show();
		layer.show();
	}

	function toHex(str) {
		var dest = "";
		for (var i = 0; i < str.length; i++) {
			dest += str.charCodeAt(i).toString(16);
		}
		return dest;
	}
	function strToJson(str){ 
		return JSON.parse(str); 
	}
	$.ajax({
        url:"https://passport.wanmei.com/sso/loginstatus",
        type:"POST",
        dataType:"jsonp",
        jsonp:"jsonpCallback",
        success:function(data){
			if(data.code==0){
				success=true;
                userId=data.data.id;
                userName=data.data.username;
	            $(".logout").show();
	            $(".login").hide();
	            $("#userName").html(userName);
				}
        }
	});
	$('#loginBtn').on('click',function(){
		login();
	});
		
	$('#btn-go').on('click',function(){
		if(success){
			$.ajax({
			    url : 'http://event.wanmei.com/kefu/questionnaire/init?'+ Math.random(),
			    type:"get",
			    dataType : 'jsonp',
			    jsonp:"callback",
			    success : function(data){
			    	console.log(data)
			        	if(data.status == 1){//是vip且未完成问卷
							window.location.href = 'http://surveys.wanmei.com/survey/bEBFve?vc='+data.message;
			        	}else if(data.status == -1){//未登录
							alert('请登录')
			        	}else if(data.status == -2){//获取VIP状态失败
			        		$(".win-pop").fadeIn(400);
			        		$('#message').html('获取状态失败')
			        	}else if(data.status == -3){//非正式VIP用户
			        		$(".win-pop").fadeIn(400);
			        		$('#message').html('对不起，此活动仅限VIP账号参与')
			        	}else if(data.status == -4){//是VIP且已提交问卷
			        		$(".win-pop").fadeIn(400);
			        		$('#message').html('对不起，您参与活动的次数已达上限')
			        	}else{
			        		alert(data.message);
			        	}
			     }
			});
		}else{
			login();
		}
	});	
$(".pop-btn,.pop-close").on("click",function () {
    $(this).parents('.win-pop').fadeOut(400,function () {
      $("#message").html("");
    });
  })
$.ajax({
    url : 'http://event.wanmei.com/kefu/questionnaire/init',
    type:"get",
    dataType : 'jsonp',
    jsonp:"callback",
   success : function(data){
        	var singleString='';
        	if(data.pUser){
        		console.log(data)
	           for(var i=0;i<data.pUser.length;i++){
					singleString+='<li><span>'+data.pUser[i].username+'</span><span>'+data.pUser[i].phone+'</span>'
					singleString+='<span>'+data.pUser[i].ptime+'</span><span>'+data.pUser[i].prizename+'</span></li>'
	        	}
        	}
        	$(".list-prize").html(singleString);
    	}
	});
});


function closeLogin() {
	$('.prompt_bg').hide();
	$('#loginLayer').hide();
}
