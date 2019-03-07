var success = false;//声明一个全局变量用来判断是否登录
var userId;
var userName;
var nickName;
var userTel;
;(function($) {
	loadScript('js/login.js');
	loadScript('js/togglegames.js');
	
    var vip_siderBar = '<a class="btn_siderBar open" href="javascript:;"></a>\
    <div class="login_status loginOut">\
        <div class="my-info clearfix">\
			<div class="my-img-wrap"><span class="my-img"><img src="images/header.png" /></span></div>\
         	<div class="my-person-info">\
                <p class="my-nickname">账号：<span class="cor_red"></span></p>\
                <p class="my-meassage-name">昵称：<span></span></p>\
                <p class="my-meassage-level">等级：<span></span></p>\
			</div>\
        </div>\
        <div class="ip_info">\
            <p>VIP服务到期时间：<span id="endTime"></span></p>\
			<p>升级更高级别还需充值：<span class="cor_red" id="upgrade">0</span></p>\
			<p>保持当前级别还需充值：<span class="cor_red" id="relegation">0</span></p>\
        </div>\
        <div class="game_info">\
            <p>当前游戏：<span class="current_game"></span></p>\
			<a class="btn_cut" href="javascript:;" id="btn_cut">切换游戏</a>\
        </div>\
		<div class="btn_op">\
            <a href="personal.html" class="btn_usercenter"></a>\
            <a href="javascript:;" class="btn_loginOut" id="btn_loginOut">退出登录</a>\
        </div>\
    </div>\
    <div class="login_status loginIn">\
        <div class="my-info clearfix">\
			<div class="my-img-wrap"><span class="my-img"><img src="images/header.png" /></span></div>\
         	<div class="my-person-info">\
                <p class="my-nickname">你好，请<a href="javascript:;" class="cor_red" id="btn_loginIn">[登录]</a>！</p>\
                <p class="my-meassage-name"><a href="http://passport.wanmei.com/reg/" target="_blank">[注册]</a><a href="http://passport.wanmei.com/password/" target="_blank">[忘记密码]</a></p>\
			</div>\
        </div>\
        <a class="btn_vip" href="http://pay.wanmei.com/new/" target="_blank"></a>\
    </div>';
    var div = document.createElement('div');
    div.className = 'vip_siderBar';
    div.innerHTML = vip_siderBar;
    document.getElementsByTagName('body')[0].appendChild(div);

    $('.btn_siderBar').on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.vip_siderBar').animate({'right':'-224px'}, 300)
        } else {
            $(this).addClass('open');
            $('.vip_siderBar').animate({'right':0}, 300)
        }
    })
	$('#btn_cut').on('click', function() {
		$.simpleDialog({
			skin:false,
			content: '.vip_pop_games',
			id: 'vip_pop_games'
		});
	})
	
	$.ajax({
		url:"http://vipservice.wanmei.com/loginStatus",
		type:"POST",
		dataType:"jsonp",
		success:function(data){
			if(data.code==0){
				success = true;
				userId = data.result.userId;
				userName = data.result.username;
				nickName = data.result.nickname;
				$('.loginIn').hide();
				$('.loginOut').show();
				$('.my-person-info .my-nickname span').text(userName);
				$('.my-person-info .my-meassage-name span,.vip_personal .nickname strong').text(nickName);
				getUserInfo();
				
				//判断VIP信息是否为全
				isVipUserInfoComplete();
				
			}
		}
	});
	
	$('#btn_loginIn').on('click',function(){
		login();
	})
	$('#btn_loginOut').on('click',function(){
		loginOut();
	})
		
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
			console.log(data);
			if(data.code == 0 && data.result ){
				userTel = data.result.mobile;
				if(!data.result.infoDate || data.result.infoDate == ''){
					//alert('补填好个人信息后才能操作！');
					var pathname = window.location.pathname;
					if(pathname.indexOf('userinfo') == -1){
						window.location.href = 'userinfo.html';
					}
				}
			}else{
				alert(data.message);
			}
		},  
		error: function(e){  
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}  
	});
}



function getUserInfo(){
	$.ajax({  
		type: "POST",  
		url: 'http://vipservice.wanmei.com/vip',
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code ==0){
				if(!data.result){
					if($('.vip_personal').length > 0){
						$('.my-person-info .my-meassage-level span').text('普通用户');
					}
					if($('.vip_service').length > 0){
						$('.vip_service .my-level').html('普通用户<br>成为VIP可以享受以下专属服务');
					}
				}else{
					var rank = data.result.rank;
					//升级金额
					var validAmount = data.result.validAmount;
					//保级金额
					var serviceAmount = data.result.serviceAmount;
					
					if($('.vip_personal').length > 0){
						$('.my-progress .dot div:lt('+ (rank) +')').show();
						var left = $('.my-progress .d' + rank).position().left + 5;
						$('.my-progress-bar').width(left);
						$.ajax({  
							type: "POST",  
							url: 'http://vipservice.wanmei.com/lastLoginIp',
							dataType: "jsonp", 
							success: function(data){
								$('.vip_personal #ip').text(data.result)
							}
						});
					}
					if($('.vip_unvip .dot').length > 0){
						$('.vip_rate .dot div:lt('+ (rank) +')').show();
						var left = $('.vip_rate .d' + rank).position().left + 5;
						$('.vip_unvip .inner').width(left);
					}
					
					//判断当前级别					
					if(rank == 4){
						$('#upgrade,#personalUpgrade').text(0);
						$('#relegation,#personalRelegation').text(0);
						$('.vip_personal .level .levelImg').attr('src','images/v4.png');
						$('#vipLeavel').text('VIP4（终身白金卡VIP）');
						$('.my-person-info .my-meassage-level span').text('终身白金卡');
						if($('.vip_service').length > 0){
							$('.vip_service .my-level').html('您是<img src="images/v4.png" />终身白金卡VIP<br>可以享受以下专属服务');
						}
					}else if(rank == 3){
						$('#upgrade,#personalUpgrade').text(100000);
						$('#relegation,#personalRelegation').text((24000 - serviceAmount) < 0 ? 0 : (24000 - serviceAmount));
						$('.vip_personal .level .levelImg').attr('src','images/v3.png')
						$('#vipLeavel').text('VIP3（白金卡VIP）');
						$('.my-person-info .my-meassage-level span').text('白金卡');
						if($('.vip_service').length > 0){
							$('.vip_service .my-level').html('您是<img src="images/v3.png" />白金卡VIP<br>可以享受以下专属服务');
						}
					}else if(rank == 2){
						$('#upgrade,#personalUpgrade').text(15000 - validAmount);
						$('#relegation,#personalRelegation').text((4800 - serviceAmount) < 0 ? 0 : (4800 - serviceAmount));
						$('.vip_personal .level .levelImg').attr('src','images/v2.png');
						$('#vipLeavel').text('VIP2（金卡VIP）');
						$('.my-person-info .my-meassage-level span').text('金卡');
						if($('.vip_service').length > 0){
							$('.vip_service .my-level').html('您是<img src="images/v2.png" />金卡VIP<br>可以享受以下专属服务');
						}
					}else if(rank == 1){
						$('#upgrade,#personalUpgrade').text(3000 - validAmount);
						$('#relegation,#personalRelegation').text((1600 - serviceAmount) < 0 ? 0 : (1600 - serviceAmount));
						$('.vip_personal .level .levelImg').attr('src','images/v1.png')
						$('#vipLeavel').text('VIP1（银卡VIP）');
						$('.my-person-info .my-meassage-level span').text('银卡');
						if($('.vip_service').length > 0){
							$('.vip_service .my-level').html('您是<img src="images/v1.png" />银卡VIP<br>可以享受以下专属服务');
						}
					}
					if(rank == 4 || rank == 3){
						if($('.vip_personal').length > 0){
							$('#tq2 .v3').show();
						}
					}else{
						if($('.vip_personal').length > 0){
							$('#tq2 .v3').hide();
						}	
					}
					var endtime = data.result.endtime;
					$('#endTime,#personalEndTime').text(endtime.substr(0,10));
				}
			}else{
				alert(data.message);
			}
		},
		error: function(e){alert("网络错误，请稍后重试！");}
	});  	
}