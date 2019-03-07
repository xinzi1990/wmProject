// JavaScript Document
$(function(){
	//获取游戏列表
	getGamesInfo();
	
	//检测是否是VIP用户
	checkVipInfo();
	
	//提交资料
	$('#submitVipUserInfo').on('click',function(){
		submitVipUserInfo();
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
	
	//disp_confirm();
})


function submitVipUserInfo(){
	$.ajax({
		url:"http://vipservice.wanmei.com/loginStatus",
		type:"POST",
		dataType:"jsonp",
		success:function(data){
			if(data.code == -2){
				login();
				return false;
			}
		}
	});
	$.ajax({  
		type: "POST",  
		url: "http://vipservice.wanmei.com/vip", 
		dataType: "jsonp", 
		success: function(res){
			console.log(res)
			if(res.code == 0 && res.result.rank > 0){
				
				if(!checkTrueName())return false;
				var trueName = $('#vip_truename').val();
				if(!checkBirthInfo())return false;
				var birthday = $('#vip_birthyear').val() + '-' + $('#vip_birthmonth').val() + '-' + $('#vip_birthday').val();
				if(!checkAddressInfo())return false;
				var addressProvince = $('#vip_province').val();
				var addressCity =  $('#vip_city').val();
				var addressAddress = $('#vip_address').val();
				var aid = $('#vipFirstGame option:checked').val();
				var data = {
					truename:trueName,
					birthday:birthday,
					province:addressProvince,
					city:addressCity,
					address:addressAddress,
					aid:aid
				}
				//校验身份证信息
				var code = $('#vipUserInfoRealId').val();
				
				if(checkMobilephoneInfo() && checkIDCodeInfo(code) && checkCode()){
					var mobilephone = checkMobilephoneInfo();
					var rand = checkCode();
				}else{
					return false;	
				}

				data.code = code;
				data.mobile = mobilephone;
				data.rand = rand;
				
				console.log(data);

				$.ajax({
					type: "POST",
					url: "http://vipservice.wanmei.com/vipInfo/add",
					dataType: "jsonp",
					data: data,
					success: function(msg){
						if(msg.code == 0){
							alert('信息提交成功！');
							window.location.href = 'personal.html';
						}else{
							alert(msg.message);
						}
					},
					error: function(e){
						alert("请求发送失败，可能是网络原因，请稍候再试！");
					}
				});

				/*
				$.ajax({  
					type: "POST",  
					url: "http://vipservice.wanmei.com/vipInfo/modify", 
					dataType: "jsonp", 
					data: data,  
					success: function(res){
						console.log(res)
						if(res.code == 0){
							$.ajax({  
								type: "POST",  
								url: "http://vipservice.wanmei.com/vipInfo/modifyIdCard", 
								dataType: "jsonp", 
								data: {"mobile":mobilephone,"rand":rand,"newIdCard":userId},  
								success: function(res){
									console.log(res)
									if(res.code == 0){
										alert('信息提交成功！');
										window.location.href = 'personal.html';
									}else{
										alert(res.message);
										window.location.reload();
									}
								},  
								error: function(e){
									alert("请求发送失败，可能是网络原因，请稍候再试！");
								}
							});
						}else{
							alert(res.message);
							window.location.reload();
						}
						
					},
					error: function(e){
						alert("请求发送失败，可能是网络原因，请稍候再试！");
					}
				});
				*/
				
			}else{
				alert('对不起您还不是VIP用户！');
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
	$("#vipFirstGame").empty();
	var url = "http://vipservice.wanmei.com/prize/games";
	$.ajax({  
		type: "POST",  
		url: url, 
		dataType: "jsonp", 
		data: "",
		success: function(data){
		   	if(data.code == 0){
			   $("#vipFirstGame").empty();
			   var str = '';
			   $.each(data.result,function(i,item){
					str+='<option name="game" value="'+item.aid+'">'+item.name+'</option>';
				})
				$("#vipFirstGame").html(str);
		   }else{
			   $("#vipFirstGame").empty();
		   }
		},
		error: function(e){
			alert("请求发送失败，可能是网络原因，请稍候再试！");
		}  
	});
}
var intervalid = null;

//发送手机验证码
function sendmobilecode(node){
	if($(node).hasClass('btn_disable')) return;
	var mobilephone = $("#vip_fullMobile").val();	
	var data={"mobile":mobilephone};
	console.log(mobilephone)
	$.ajax({  
		type: "POST",  
		url: "http://vipservice.wanmei.com/sendMobileCode",
		dataType: "jsonp", 
		data: data,  
		success: function(res){
			console.log(res);
			if(res.code == 0){
				$('#codestatus').html(res.message);	
				$(node).addClass('btn_disable');
				var i = 60; 
				clearInterval(intervalid);
				intervalid = setInterval(function(){fun()}, 1000);
				function fun() { 
					if (i == 0) { 
						$(node).html('重新发送');
						$(node).removeClass('btn_disable');
						clearInterval(intervalid); 
					}else{
						
						$(node).html('重新发送('+ i +')');
					} 
					i--; 
				}
			}else{
				alert(res.message);
			}
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
		$('#codestatus').html("验证码不能为空！");
		return false;
	}
	return code;
}

//检查手机信息
function checkMobilephoneInfo(){
	var mobilephone = $("#vip_fullMobile").val();
	if(isNull(mobilephone)){
		$('#phonestatus').html("手机号码不能为空！");
		return false;
	}
	if(!checkMobilephone(mobilephone)){
		$('#phonestatus').html("手机号码格式不正确！");
		return false;
	}
	$("#phonestatus").html("√");
	return mobilephone;
}

//检查身份证信息
function checkIDCodeInfo(val){	
	if(isNull(val)){
		$('#idstatus').html("身份验证码不能为空！");
		return false;
	}
	if(!checkIDCode(val)){
		$('#idstatus').html("身份验证码无效,验证码为有效证件号码8-18位数字组合！");
		return false;
	}
	$("#idstatus").html("√");
	return true;
}

function getVipUserPhone(){
	$.ajax({  
		type: "POST",  
		url: 'http://vipservice.wanmei.com/vipInfo',
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code ==0){
				//$('#vip_fullMobile').val(data.result.mobile);
				if(!(data.result.mobile)){
					$('#bindPhone').show();
					disp_confirm();
				}
			}
		},
		error: function(e){alert("网络错误，请稍后重试！");}
	});
}

function disp_confirm() {
	var r = confirm("请先完善账号绑定手机！");
	if (r==true) {
		window.location.href  = 'http://passport.wanmei.com/mobilebind';
	}
}

function checkVipInfo(){
	$.ajax({  
		type: "POST",  
		url: 'http://vipservice.wanmei.com/vip',
		dataType: "jsonp", 
		success: function(data){
			console.log(data)
			if(data.code ==0){
				if(!data.result){
					alert('对不起您当前不是VIP用户！');
					window.location.href = 'http://pay.wanmei.com/';
				}
				getVipUserPhone();
			}else if(data.code == -2){
				login();
			}else{
				alert(data.message);
			}
		},
		error: function(e){alert("网络错误，请稍后重试！");}
	});
}