var success = false;//声明一个全局变量用来判断是否登录
var userId;
var userName;
var nickName;

//登录JS
function login() {
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
            'z-index': 11111
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

function loginOut(){
	var qurl = window.location.href;
	window.location.href = 'https://passport.wanmei.com/sso/logout?serviceurl='+qurl;
}

function closeLogin() {
    $('.prompt_bg').hide();
    $('#loginLayer').hide();
}

function toHex(str) {
    var dest = "";
    for (var i = 0; i < str.length; i++) {
        dest += str.charCodeAt(i).toString(16);
    }
    return dest;
}

$.ajax({
	url:"http://vipservice.wanmei.com/loginStatus",
	type:"POST",
	dataType:"jsonp",
	success:function(data){
		console.log(data);
		if(data.code==0){
			success = true;
			userId = data.result.userId;
			CookieUtil.setAll('cookie',{userId:userId},'','/','.wanmei.com');
			userName = data.result.username;
			nickName = data.result.nickname;
			$('.login_in').hide();
			$('.login_out').show();
			$('#userName').text(userName);
		}else{
			$('.login_in').show();
			$('.login_out').hide();
		}
	}
});