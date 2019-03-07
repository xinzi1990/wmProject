// JavaScript Document
$(function(){
	myGame();
	setUserInfo();
	getGamesInfo();
	changeVipHref();
	
	//检测是否是VIP用户
	checkVipInfo();
	
	//提交修改身份证信息
	$('#submitbtn').on('click',function(){
		submitId();
	})
	
	$('.btn_modifyid').on('click',function(){
		$.simpleDialog({
			skin:false,
			content: '#modifyid',
			id: 'modifyid'
		});
	})
	$('#close_modifyid').on('click',function(){
		$.simpleDialog.close('modifyid');
	})
	//获取生日的年
	var years = generateYears();
	$("#vip_birthyear").empty();
	for(var i=0;i<years.length;i++){
		$("#vip_birthyear").append("<option>"+ years[i] + "</option>");
	}
	//获取生日的月
	var months = generateMonths();
	$("#vip_birthmonth").empty();
	for(var j=0;j<months.length;j++){
		$("#vip_birthmonth").append("<option>" + months[j] + "</option>");
	}
	reGenerateDays(true);
	$("#vip_address_city").citySelect();
	
	$('.user-info .btn_modify').on('click',function(){
		var _this = $(this);
		//判断是否为流式VIP用户
		$.ajax({  
			type: "POST",  
			url: "http://vipservice.wanmei.com/vip", 
			dataType: "jsonp", 
			success: function(res){
				console.log(res)
				if(res.code == 0 && res.result.rank > 0){
					if(_this.hasClass('btn_save')){
						//保存的方法
						var id = _this.parent('li').attr('id');
						var val = '',aid = '',address={};
						var type = _this.attr('data-type');
						switch (id){
							case 'user-info-truename':
									if(!checkTrueName())return false;
									val = $('#vip_truename').val();
								break;
							case 'user-info-birthday':
									if(!checkBirthInfo())return false;
									val = $('#vip_birthyear').val() + '-' + $('#vip_birthmonth').val() + '-' + $('#vip_birthday').val();
								break;
							/*case 'user-info-email':
									if(!checkEmailInfo())return false;
									val = $('#vip_email').val();
								break;
							case 'user-info-phone':
									if(!checkTelephoneInfo())return false;
									val = $('#vip_telephone').val();
								break;*/
							case 'user-info-address':
									if(!checkAddressInfo())return false;
									address.province = $('#vip_province').val();
									address.city =  $('#vip_city').val();
									address.address = $('#vip_address').val();
									val = address.province + address.city + address.address;
								break;
							/*case 'user-info-zipcode':
									if(!checkZipCodeInfo())return false;
									val = $('#vip_zipcode').val();
								break;*/
							case 'user-info-project':
									val = $('#maingame option:checked').text();
									aid = $('#maingame option:checked').val();
								break;
						}
						//改变按钮状态并发送请求
						updateBtnStatus(_this,false);
						updateUserInfo(id,val,type,aid,address);
					}else{
						updateBtnStatus(_this,true);
					};
				}else{
					alert('对不起您还不是VIP用户！');	
				}
			},
			error: function(e){
				alert("请求发送失败，可能是网络原因，请稍候再试！");
			}
		});
	})
})


function updateUserInfo(id,val,type,aid,address){
	/*ajax请求修改 http://vipservice.wanmei.com/vipInfo/modify 修改用户资料 参数 mobile:手机号, rand:验证码, truename:真实姓名, birthday:生日, aid:游戏, province:省, city:市, address:联系地址,zipcode:邮编 */
	
	$('#'+ id).find('.edit-before span').text(val);
	var data={},type = type;
	if(address.province){
		data = address
	}else if(aid){
		data ={
			aid:aid
		};
	}else{
		data[type] = val
	}
	console.log(aid);
	console.log(address);
	console.log(type);
	console.log(val);
	console.log(data);
	$.ajax({  
		type: "POST",  
		url: "http://vipservice.wanmei.com/vipInfo/modify",
		dataType: "jsonp", 
		data: data,  
		success: function(res){
			console.log(res);
			alert(res.message);
			if(res.code != 0){
				window.location.reload();
			}
		},
		error: function(e){
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}
	});
	
	
	
}


function updateBtnStatus(id,flag){
	if(!flag){
		id.removeClass('btn_save');
		id.siblings('.edit-before').css('display','inline').siblings('.edit-after').css('display','none');
	}else{
		id.addClass('btn_save');
		id.siblings('.edit-before').css('display','none').siblings('.edit-after').css('display','inline');
	}
}

//我已开启VIP特权的游戏
function myGame(){
	var l = $('.my-game-box li').size(),$ul = $('.my-game-box ul'),$up = $('.my-game-box .up'),$down = $('.my-game-box .down'),n = 0,isLoop = false;
	$ul.css('height',l*97);
	$up.on('click',function(){
		liveScroll('up');
	});
	$down.on('click',function(){
		liveScroll('down');
	});
	function liveScroll(direction){
		if(direction=='up'){
			if(n==0){return false}
			n -= 1;
		}   
		if(direction=='down'){
			if(l-5 <= n){return false}
			n += 1;
		}
		$ul.animate({'top':-97*n},300);
	}
}

function reGenerateDays(nocheck){
	if(nocheck == undefined || nocheck == null)
		nocheck =false;
	var year = $("#vip_birthyear").val();
	var month = $("#vip_birthmonth").val();
	var days = generateDays(year,month);
	var j;
	$("#vip_birthday").empty();
	for(j=0;j<days.length;j++){
		$("#vip_birthday").append("<option>" + days[j] + "</option>");
	}	
	if(!nocheck)
		checkBirthInfo();
}

//获取游戏信息
function getGamesInfo() {
	$("#maingame").empty();
	var url = "http://vipservice.wanmei.com/prize/games";
	$.ajax({  
		type: "POST",  
		url: url, 
		dataType: "jsonp", 
		data: "",
		success: function(data){
		   if(data.code == 0){
			   $("#maingame").empty();
			   var str = '';
			   $.each(data.result,function(i,item){
					str+='<option name="game" value="'+item.aid+'">'+item.name+'</option>';
				})
				$("#maingame").html(str);
		   }else{
			   $("#maingame").empty();
		   }
		},
		error: function(e){
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}  
	});
}

//获取用户信息
function setUserInfo(){
	$.ajax({  
		type: "GET",  
		url: "http://vipservice.wanmei.com/vipInfo", 
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code == 0 && data.result){
				var data = data.result;
				var truename = data.truename
				//var birthday = data.birthday?data.birthday.substr(0,10):'';
				var birthday = data.birthdayString;
				var email = data.email;
				var phone = data.phone;
				var mobile = data.mobile;
				var address = data.province + data.city + data.address;
				var zipcode = data.zipcode;
				var code = data.code;
				
				$('#user-info-truename .edit-before span').text(truename);
				$('#user-info-id .edit-before span').text(code);
				$('#user-info-birthday .edit-before span').text(birthday);
				$('#user-info-email .edit-before span').text(email);
				$('#user-info-phone .edit-before span').text(phone);
				$('#user-info-mobile .edit-before span').text(mobile);
				$('#user-info-address .edit-before span').text(address?address:'');
				$('#user-info-zipcode .edit-before span').text(zipcode);
				getGameName(data.aid);
			}
		},  
		error: function(e){  
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}  
	});
}
//根据游戏ID获取游戏名称
function getGameName(aid){
	$.ajax({  
		type: "POST",
		url: "http://vipservice.wanmei.com/prize/games",
		dataType: "jsonp", 
		success: function(res){
			if(res.code == 0){
				$.each(res.result,function(i,item){
					if(item['aid'] == aid){
						$('#user-info-project .edit-before span').text(item['name']);
					}
				})
			}
		}  
	});
}

//发送手机验证码
function sendmobilecode(){
	var mobilephone = $("#vip_fullMobile").val();	
	var data={"mobile":mobilephone};
	$.ajax({  
		type: "POST",  
		url: "http://vipservice.wanmei.com/sendMobileCode",
		dataType: "jsonp", 
		data: data,  
		success: function(res){
			console.log(res);
			alert(res.message);
		},  
		error: function(e){
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}
	});
}

//检查验证码
function checkCode(){
	var code = $("#vip_mobilecode").val();
	if(isNull(code)) {
		alert("验证码不能为空！");
		return false;
	}
	return code;
}

//检查手机信息
function checkMobilephoneInfo(){
	var mobilephone = $("#vip_fullMobile").val();
	if(isNull(mobilephone)){
		alert("手机号码不能为空！");
		return false;
	}
	if(!checkMobilephone(mobilephone)){
		alert("手机号码格式不正确！");
		return false;
	}
	return mobilephone;
}

//检查身份证信息
function checkIDCodeInfo(val){	
	if(isNull(val)){
		alert("身份验证码不能为空！");
		return false;
	}
	if(!checkIDCode(val)){
		alert("身份验证码无效,验证码为有效证件号码8-18位数字组合！");
		return false;
	}
	return true;
}

//提交修改身份证信息
function submitId(){
	var oldid = $('#oldid').val();
	var newid = $('#newid').val();
	var newidagin = $('#newidagin').val();
	if(checkMobilephoneInfo() && checkIDCodeInfo(oldid) && checkIDCodeInfo(newid) && checkIDCodeInfo(newidagin) && checkCode()){
		var mobilephone = checkMobilephoneInfo();
		var rand = checkCode();
		/*if(oidId == newid || oidId == newidagin){
			alert('旧的身份证信息不能和新的身份证信息一样！')
			return false;
		}*/
		if(newid !== newidagin){
			alert('两次输入的身份证号不一样！')
			return false;
		}
	}else{
		return false;	
	}
	var data = {"mobile":mobilephone,"rand":rand,"oldIdCard":oldid,"newIdCard":newid}
	$.ajax({  
		type: "POST",  
		url: "http://vipservice.wanmei.com/vipInfo/modifyIdCard", 
		dataType: "jsonp", 
		data: data,  
		success: function(res){
			console.log(res)
			if(res.code == 0){
				alert(res.message);
				$.simpleDialog.close('modifyid');
				$('#modifyid input').val('');
				setUserInfo();
				// $('#user-info-id .edit-before span').text();
			}else{
				alert(res.message);
			}
		},  
		error: function(e){
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}
	});
}


function checkVipInfo(){
	$.ajax({  
		type: "POST",  
		url: 'http://vipservice.wanmei.com/vip',
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code ==0){
				if(!data.result || data.result.rank == 0){
					alert('对不起您当前不是VIP用户！');
					window.location.href = 'http://pay.wanmei.com/';
				}
			}else if(data.code == -2){
				login();
			}else{
				alert(data.message);
			}
		},
		error: function(e){alert("网络错误，请稍后重试！");}
	});
}


function changeVipHref(){
	var gameType = CookieUtil.getSub('cookie','gameType');
	console.log(gameType);
	if(gameType == 34){//蜀山
		$('.vip_personal .tq1').attr('href','javascript:alert("礼包更新中，请稍后尝试领取")');
		$('.vip_personal .tq2').attr('href','javascript:alert("礼包更新中，请稍后尝试领取")');
	}
	else if(gameType == 69){//怀旧版神雕侠侣
		$('.vip_personal .tq1').attr('href','javascript:alert("该游戏尚未开启，尽情期待！")');
		$('.vip_personal .tq2').attr('href','javascript:alert("该游戏尚未开启，尽情期待！")');
	}
	else{
		$('.vip_personal .tq1').attr('href','activitydetail.html?type=1&gametype=' + gameType);
		$('.vip_personal .tq2').attr('href','activitydetail.html?type=2&gametype=' + gameType);
	}
}