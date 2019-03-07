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
;(function toggleGames(){
	var str = '<h3>选择您的游戏</h3>\
	<ul>\
		<li data-gametype="4"><img src="images/logo/zx.jpg" /><div class="shadow"><p class="game_name">诛仙3</p>选择游戏</div></li>\
		<li data-gametype="3"><img src="images/logo/w2i.jpg" /><div class="shadow"><p class="game_name">鑫仔国际2</p>选择游戏</div></li>\
		<li data-gametype="21"><img src="images/logo/xa.jpg" /><div class="shadow"><p class="game_name">笑傲江湖</p>选择游戏</div></li>\
		<li data-gametype="9"><img src="images/logo/mhzx.jpg" /><div class="shadow"><p class="game_name">梦幻诛仙</p>选择游戏</div></li>\
		<li data-gametype="2"><img src="images/logo/wulin.jpg" /><div class="shadow"><p class="game_name">武林外传</p>选择游戏</div></li>\
		<li data-gametype="8"><img src="images/logo/sgcq.jpg" /><div class="shadow"><p class="game_name">神鬼传奇</p>选择游戏</div></li>\
		<li data-gametype="12"><img src="images/logo/sgsj.jpg" /><div class="shadow"><p class="game_name">神鬼世界</p>选择游戏</div></li>\
		<li data-gametype="5"><img src="images/logo/cb.jpg" /><div class="shadow"><p class="game_name">赤壁</p>选择游戏</div></li>\
		<li data-gametype="6"><img src="images/logo/rwpd.jpg" /><div class="shadow"><p class="game_name">热舞派对</p>选择游戏</div></li>\
		<li data-gametype="11"><img src="images/logo/smdl.jpg" /><div class="shadow"><p class="game_name">神魔大陆</p>选择游戏</div></li>\
		<li data-gametype="15"><img src="images/logo/sdxl.jpg" /><div class="shadow"><p class="game_name">神雕侠侣</p>选择游戏</div></li>\
		<li data-gametype="36"><img src="images/logo/hex.jpg" /><div class="shadow"><p class="game_name">HEX</p>选择游戏</div></li>\
		<li data-gametype="34"><img src="images/logo/shushan.jpg" /><div class="shadow"><p class="game_name">蜀山缥缈录</p>选择游戏</div></li>\
		<li data-gametype="7"><img src="images/logo/kdxy.jpg" /><div class="shadow"><p class="game_name">口袋西游</p>选择游戏</div></li>\
		<li data-gametype="22"><img src="images/logo/dota.jpg" /><div class="shadow"><p class="game_name">DOTA2</p>选择游戏</div></li>\
		<li data-gametype="52"><img src="images/logo/csgo.jpg" /><div class="shadow"><p class="game_name">CSGO</p>选择游戏</div></li>\
		<li data-gametype="50"><img src="images/logo/co.jpg" /><div class="shadow"><p class="game_name">创世战车</p>选择游戏</div></li>\
		<li data-gametype="69"><img src="images/logo/hjbsdxl.jpg" /><div class="shadow"><p class="game_name">怀旧版神雕侠侣</p>选择游戏</div></li>\
	</ul>';

	// <li data-gametype="19"><img src="images/logo/seiya.jpg" /><div class="shadow"><p class="game_name">圣斗士星矢OL</p>选择游戏</div></li>\
	
	var div = document.createElement('div');
    div.className = 'vip_pop_games';
    div.setAttribute('id','vip_pop_games');
    div.innerHTML = str;
    document.getElementsByTagName('body')[0].appendChild(div);
})();
var element = '';
$(function(){
	popGames();

	if($('.vip_index').length > 0){
		indexQuick();		
	}
	if($('.vip_personal').length > 0){
		$('.vip_personal .tq10').attr('href','http://cs.wanmei.com/managerApply?gametype=' + CookieUtil.getSub('cookie','gameType'));
		$('.vip_personal .tq11').on('click',function(){
			var _this = $(this);
			element = _this;
			var special = CookieUtil.getSub('cookie','gameType');
			var url = _this.attr('data-url') + special;
			setErrorRecovery(url,special);
		})
		$('#pop_misoperation .close_pop').on('click',function(){
			$.simpleDialog.close('pop_misoperation');
		})
		//误操作恢复重新选择游戏
		$('#re_select').on('click',function(){
			$.simpleDialog({
				skin:false,
				content: '.vip_pop_games',
				id: 'vip_pop_games'
			});
			$.simpleDialog.close('pop_misoperation');
		})
	}
	if($('#selflist').length > 0){
		$('#selflist').text(checkGameName(CookieUtil.getSub('cookie','gameType'))['name']).on('click',function(){
			$.simpleDialog({
				skin:false,
				content: '.vip_pop_games',
				id: 'vip_pop_games'
			});
		})
	}
	if($('.vip_service').length > 0 || $('.vip_personal').length > 0){
		setServiceOnlineUrl();
	}
})

function popGames(){
	var getLocalCookie = judgeCookie();
	console.log(getLocalCookie);
	// if(CookieUtil.getSub('cookie','gameType') == 4){
	// 	if($('.zx3_prompt').size()){
	// 		$.simpleDialog({
	// 		    skin:false,
	// 		    content: '.zx3_prompt',
	// 		    id: 'zx3_prompt'
	// 		});
	// 		$('.zx3_prompt .close').on('click',function(){
	// 			$.simpleDialog.close('zx3_prompt');
	// 		});
	// 	}
	// }

	//从COOKIE里取游戏名字给侧边栏
	if(getLocalCookie){
		$('.current_game').text(getLocalCookie);
		if($('.vip_index_sns').length > 0){
			setIndexOnlineUrl(CookieUtil.getSub('cookie','imUrl'))
		}
	}
	//设置服务特权账号问题提交快速处理
	changeVipService();
	//个人中心判断误操作回复
	isShowPersonal(CookieUtil.getSub('cookie','gameType'));

	//选择游戏列表

	$('.vip_pop_games').on('click','li',function(){
		var gameType = $(this).attr('data-gametype');
		var gameName = checkGameName(gameType)['name'];
		var imUrl = checkGameName(gameType)['imUrl'];
		$('.current_game').text(gameName);
		//设置COOKIE
		CookieUtil.setAll('cookie',{gameName:gameName,imUrl:imUrl,gameType:gameType},'','/','.wanmei.com');
		$.simpleDialog.close('vip_pop_games');
		//首页在线客服链接地址设置
		if($('.vip_index_sns').length > 0){
			setIndexOnlineUrl(imUrl);
		}
		if($('#selflist').length > 0){
			$('#selflist').text(gameName);
		}
		if($('.vip_personal').length > 0){
			changeVipHref(gameType)	
		}
		
		//判断是否是首页快速入口点击
		if(element != ''){
			if(element.text() == '在线客服'){
				setShortcut(element,'imUrl');
			}else if(element.text() == '问题提交'){
				setShortcut(element,'gameType');
			}else if(element.text() == '误操作恢复'){
				var special = CookieUtil.getSub('cookie','gameType')
				var url = element.attr('data-url') + special;
				setErrorRecovery(url,special);
			}
		}
		//设置服务特权账号问题提交快速处理
		changeVipService();
		//个人中心判断误操作回复
		isShowPersonal(gameType);
	});
}

if($('.vip_personal').length > 0){
	var gameType = CookieUtil.getSub('cookie','gameType');
	changeVipHref(gameType);	
}

function changeVipHref(gameType){
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

//设置服务特权账号问题提交快速处理
function changeVipService(){
	if($('.vip_service').length > 0){
		$('.vip_service .service_btns .p2').attr('href','http://cs.wanmei.com/getServicesByGameType?gametype=' + CookieUtil.getSub('cookie','gameType'));
	}
	if($('.vip_personal').length > 0){
		$('.vip_personal .tq .tq6').attr('href','http://cs.wanmei.com/getServicesByGameType?gametype=' + CookieUtil.getSub('cookie','gameType'));
	}
}
//个人中心判断误操作回复
function isShowPersonal(n){
	console.log(n)
	//诛仙3误操作弹出框
	// if(n == 4){
		// if($('.zx3_prompt').is(':hidden') && $('#pop_misoperation').is(':hidden')){
		// 	$.simpleDialog({
		// 	    skin:false,
		// 	    content: '.zx3_prompt',
		// 	    id: 'zx3_prompt'
		// 	});
		// 	$('.zx3_prompt .close').on('click',function(){
		// 		$.simpleDialog.close('zx3_prompt');
		// 	});
		// }
	// 	$('#pop_misoperation').addClass('vip_pop_zx3');
	// }else{
	// 	$('#pop_misoperation').removeClass('vip_pop_zx3');
	// }
	if($('.vip_personal').length > 0){
		switch(Number(n)){
			//笑傲、梦诛、蜀山、圣斗士、热舞、口袋西游
			case 21:
			case 9 :
			case 34:
			case 19:
			case 6 :
			case 7 :
				$('.vip_personal .tq11').hide();
			break;
			default:
				$('.vip_personal .tq11').show();
			break;
		}
		switch(Number(n)){
			//笑傲、HEX、dota、创世战车、csgo
			case 5:
			case 36:
			case 22:
			case 50:
			case 52:
				$('.vip_personal .tq1').hide();
			break;
			default:
				$('.vip_personal .tq1').show();
			break;
		}
		switch(Number(n)){
			//鑫仔国际、热舞派对、HEX、dota、创世战车、csgo
			case 6:
			case 7:
			case 36:
			case 22:
			case 50:
			case 52:
				$('.vip_personal .tq2').hide();
			break;
			default:
				$('.vip_personal .tq2').show();
			break;
		}

	}
	if($('.vip_service').length > 0){
		switch(Number(n)){
			//笑傲、梦诛、蜀山、圣斗士、热舞、口袋西游
			case 21:
			case 9 :
			case 34:
			case 19:
			case 6 :
			case 7 :
				$('.vip_service .p7').hide();
			break;
			default:
				$('.vip_service .p7').show();
			break;
		}
	}
}

function indexQuick(){
	//在线客服
	$('#onlineService').on('click','a',function(){
		setShortcut($(this),'imUrl');
	})
	//账号问题
	$('#accountQuestion').on('click','a',function(){
		setShortcut($(this),'gameType');
	})
	//误操作恢复
	$('#errorRecovery').on('click','a',function(){
		element = $(this);
		var _this = $(this);
		var special = CookieUtil.getSub('cookie','gameType')
		var url = _this.attr('data-url') + special;
		setErrorRecovery(url,special);
	})
	
	//重新选择游戏
	$('#reselection_games,#reselection_games2').on('click',function(){
		$.simpleDialog({
			skin:false,
			content: '.vip_pop_games',
			id: 'vip_pop_games'
		});
		$.simpleDialog.close('pop_shortcut');
	})
	//误操作恢复重新选择游戏
	$('#re_select').on('click',function(){
		$.simpleDialog({
			skin:false,
			content: '.vip_pop_games',
			id: 'vip_pop_games'
		});
		$.simpleDialog.close('pop_misoperation');
	})
	//关闭
	$('#pop_shortcut .close_pop').on('click',function(){
		element = '';
		$.simpleDialog.close('pop_shortcut');
	})
	//误操作恢复关闭
	$('#pop_misoperation .close_pop').on('click',function(){
		element = '';
		$.simpleDialog.close('pop_misoperation');
	})
}
function judgeCookie(){
	//从cookie中取得当前的游戏
	var getLocalCookie = decodeURIComponent(CookieUtil.getSub('cookie','gameName'));
	if(getLocalCookie == '' || getLocalCookie == null || getLocalCookie == 'undefined'){
		$.simpleDialog({
			skin:false,
			content: '.vip_pop_games',
			id: 'vip_pop_games'
		});
		return false;
	}

	return getLocalCookie;
}
//快速入口除了误操作恢复意外的弹窗
function setShortcut(ele,cookie){
	element = ele;
	var _this = ele;
	//从COOKIE里获取gameType
	var url = _this.attr('data-url') + CookieUtil.getSub('cookie',cookie);
	var getLocalCookie = judgeCookie();
	if(getLocalCookie){
		$.simpleDialog({
			skin:false,
			content: '#pop_shortcut',
			id: 'pop_shortcut'
		});
		$('#pop_shortcut .vip_pop_tit span,#pop_shortcut .fn').text(_this.text());
		$('#pop_shortcut .gamename').text(getLocalCookie);	
		$('#ok_games').addClass('on').html('好的').attr('href',url);
		//countDown(url)
	}
}
function setErrorRecovery(url,special){
	var isClose = true;
	var detailRules = '',becareful = '';
	// console.log(special)
	switch(Number(special)){
		//武林外传
		case 2:
			detailRules = 'A. 时间限制：一个白金周期之内最多恢复2次；<br>B. 频率限制：每次间隔30天以上；（自恢复之日起计算）<br>C. 数量限制：每次最多4件，同一部位最多恢复1件；<br>D. 精炼等级限制：误操作恢复装备精炼等级最高到+16（成功升级的装备，无法单独保留）；<br>E. 装备职业限制：每次恢复，只能恢复本职业的装备；<br>F. 绑定限制：所有恢复的装备自动绑定（不能绑定不予恢复）；<br>G. 角色限制：经过装备恢复的角色，自动加锁不允许角色交易，期限90天。';
			becareful = '《武林外传》误操作服务细则生效时间：2016-07-04 00:00<br>提交误操作恢复的账号需要在武林外传升级成为白金卡账号或者保级成为白金卡账号。<br>魂物品无法恢复。';
			isClose = false;
		break;
		//诛仙
		case 4:
			detailRules = 'A、 时间限制：一个账号一自然年内最多恢复2次。<br>B、 无法恢复任何带有精炼行为的装备，有且不限于精炼消失或者降级的装备。<br>C、 无法恢复任何带有获利行为误操作<br>D、 误操作恢复后的物品均为绑定<br>注：无法承诺任何误操作行为都可以恢复，是否可以恢复以及恢复结果均以官方数据记录为准。';
			// isClose = false;
			becareful = '此规则仅适用于当前白金周期起始时间在2018年6月1日0点前的白金账号。<br />终身白金卡在2018年6月1日0点前使用原规则，在2018年6月1日0点后使用新规则。';
		break;
		//神鬼传奇
		case 8:
			detailRules = 'A. 时间限制：一年内最多恢复2次；<br>B. 频率限制：每次间隔30天以上；（自恢复之日起计算）<br>C. 恢复规则：宝石/圣杯/众神之辉/魂石恢复每年仅限一次（任选其一）；宝石最高恢复等级为6级、众神之辉和魂石恢复最高等级为4级、圣杯最高恢复13阶。<br><span class="cor_red">说明：</span><br>若出现众神之辉所兑换的物品（如神力、神印、星石等）官方恢复最高等级为众神之辉（4级）所对应物品，恢复形式将物品对应等级的众神之辉（绑定）归还玩家。<br>若出现诸神印章兑换的物品（神子魂石）官方恢复最高等级为诸神印章（4级）所对应物品，恢复形式将物品对应等级的诸神印章（绑定）归还玩家。<br>D. 数量限制：同部位装备只恢复1件。';
			becareful = '《神鬼传奇》误操作服务细则生效时间：2016年11月14日 18:00';
		break;
		//神鬼世界
		case 12:
			detailRules = 'A. 时间限制：一年内最多恢复2次；<br>B. 频率限制：每次间隔30天以上；（自恢复之日起计算）<br>C. 恢复规则：宝石类恢复每年仅限一次，最高恢复等级为6级；<br>D. 数量限制：同部位装备/圣杯只恢复1件；<br>E. 绑定限制：恢复装备、道具均为绑定，若不能绑定不予恢复。';			
			becareful = '《神鬼世界》误操作服务细则生效时间：2014-2-13 00:00'
		break;
		//笑傲、梦诛、蜀山、圣斗士、热舞、口袋西游
		case 21:
		case 9 :
		case 34:
		case 19:
		case 6 :
		case 7 :
			detailRules = '此游戏暂未推出该服务，敬请期待！或尝试联系大客户经理';	
		break;
		//鑫仔国际、神魔、赤壁、神雕侠侣
		case 3 :
		case 11:
		case 5 :
		case 15:
			detailRules = '请联系大客户经理或VIP专线（028-68723798）提交申请';
		break;
		default:
			detailRules = '';
			becareful = '';
		break;
	}
	if(detailRules != ''){
		$('#detailRules').show();
		//细则内容
		$('#detailRules .rule_info_cont').html(detailRules);
	}else{
		$('#detailRules').hide();
	}
	if(becareful != ''){
		$('#becareful').show();
		//特别注意
		$('#becareful .rule_info_cont').html(becareful);
	}else{
		$('#becareful').hide();
	}
	
	
	//从cookie中取得当前的游戏
	var getLocalCookie = decodeURIComponent(CookieUtil.getSub('cookie','gameName'));
	$('#pop_misoperation .shortcutInfo .name').text(getLocalCookie);
	$.simpleDialog({
		skin:false,
		content: '#pop_misoperation',
		id: 'pop_misoperation'
	});
	console.log(isClose);
	countDown(url,isClose);
}

var intervalid = null;
//倒计时5秒
function countDown(url,isClose){
	var i = 5; 
	clearInterval(intervalid);
	intervalid = setInterval(function(){fun()}, 1000);
	$('.btn_readOver').removeClass('on').html('我已阅读完成（<span class="cor_darkred">'+ i +'</span>）').attr({'href':'javascript:void(0)'}).removeAttr('target');
	function fun() { 
		if (i == 0) { 
			if(isClose){
				$('.btn_readOver').addClass('on').html('我已阅读完成').attr({'href':'javascript:void(0)'}).removeAttr('target').on('click',function(){
					$.simpleDialog.close('pop_misoperation');
				})
			}else{
				$('.btn_readOver').off('click').addClass('on').html('我已阅读完成').attr({'href':url,'target':'_blank'});
			}
			element = ''; 	
			clearInterval(intervalid); 
		}else{
			$('.btn_readOver').html('我已阅读完成（<span class="cor_darkred">'+ i +'</span>）');
		} 
		i--; 
	}
}

function setIndexOnlineUrl(gameType){
	$('#onlinekefu a').attr('href','http://cs.wanmei.com/genius?imCode=' + gameType);
}
function setServiceOnlineUrl(){
	$('.vip_service .p5,.vip_personal .tq .tq9').attr('href','http://cs.wanmei.com/genius?imCode=' + CookieUtil.getSub('cookie','imUrl'));
}