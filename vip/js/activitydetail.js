// JavaScript Document

/*
type代表礼包类型1是季度礼包2是生日礼包
gametype代表游戏id
activitydetail.html?type=1&gametype=1
*/
var activityJson = {
    "quarter": {
        4: [
            ["玄武元丹*10", "造化珠*30000", "元神修为珠*30000", "沧浪冰珠*3000", "归元灵玉*30", "星蕴灵魄*600", "文字称号：诛仙白银勇士", "飞剑：冰刃（90天）"],
            ["玄武元丹*20", "元神修为珠*30000", "沧浪冰珠*10000", "一元道契（六品）*5", "大衍奇术（六品）*5", "太乙宝函（六品）*5", "归元灵玉*50", "星蕴灵魄*999", "文字称号：诛仙黄金斗士", "飞剑：上古兽（90天）"],
            ["玄武元丹*30", "沧浪冰珠*30000", "一元道契（六品）*10", "大衍奇术（六品）*10", "太乙宝函（六品）*10", "金色阵灵礼包*3", "归元灵玉*100", "重华星辰*1", "文字称号：诛仙白金至尊", "幻灵石：紫霜（90天）", "宠物：青萝（90天）"],
            ["金精铁玉（11级）×1",  "沧浪冰珠*60000",  "一元道契（六品）*20",  "大衍奇术（六品）*20",  "太乙宝函（六品）*20", "金色阵灵礼包*10", "重华星辰*3", "典藏版轩辕策礼包*2", "归元灵玉*500","地侯星辰（三级）*10", "六皇帝玺×1",],
        ],
        3: [
            ["养生石（一星期）*1", "缩地铃（一星期）*1", "黄金护身符（30天）*1 ", "黄金守神符（30天）*1 ", "战灵之源：S ", "弧光星屑·真*5 ", "星环纭织·斩*5 "],
            ["养生石（一星期）*1", "缩地铃（一星期）*1", "白金护身符（30天）*1 ", "白金守神符（30天）*1 ", "战灵之源：S*3 ", "弧光星屑·真*10 ", "星环纭织·斩*10 ", "弧光星屑·灵*1 ", "星环纭织·弑*1 "],
            ["养生石（一星期）*1", "缩地铃（一星期）*1", "VIP皇冠守神符（30天）（真气值1000W） ", "VIP皇冠护身符（30天）（生命值1000W） ", "战灵之源：S*5 ", "弧光星屑·真*15", "星环纭织·斩*15", "弧光星屑·灵*2", "星环纭织·弑*2", "帮派集结令*5", "队伍集结令*10", "玄铁精金*10"],
            ["2018年1月24日后生效", "赤焰龙珠（白金定制）*1", "专属永久称号*1","每个帐号仅可领取1次"],
        ],
        21: [
            ["手工套装材料礼包*10", "必成符礼包·丁*1", "炽焰结晶*10", "宝石结晶*20", "橙镖令*3"],
            ["紫晶宝珠合成碎片*3", "强化+12必成符*1", "炽焰结晶*10", "宝石结晶*60", "三倍经验丹*3"],
            ["星彩（限时45天）", "金色舍利合成碎片*3", "风物兑换道具*3", "花开富贵*5", "染色剂·纯白*3", "新鲜的龙涎草*5", "倾心万言*1"],
            ["星彩（限时90天）", "金色舍利合成碎片*5", "金色风物志礼包*1", "花开富贵*10", "染色剂·纯白*7", "新鲜的龙涎草*10", "倾心万言*2"],
        ],
        9: [
            ["绑定黄金会员称号（90天）*1","绑定青龙之石*5","绑定白虎之石*5","绑定朱雀之石*5", "绑定玄武之石*5", "绑定天女下凡飞行器*1"],
            ["绑定钻石会员称号（90天）*1","绑定青龙之石*10","绑定白虎之石*10","绑定朱雀之石*10", "绑定玄武之石*10", "恶魔兜兜宝宝袋*1"],
            ["绑定白金会员称号（90天）*1","绑定青龙之石*15","绑定白虎之石*15","绑定朱雀之石*15", "绑定玄武之石*15", "羽翎扇翼翅膀*1"],
            [],
        ],
        2: [
            ["游乐场金币 ", "[称号]锦鲤", "[称号]真香", "白驼山门票兑换券 ", "京龙大侠召集令 ", "客服VIP·草精Ⅰ ", "客服VIP·松狸Ⅰ ", "客服VIP·草精Ⅱ ", "客服VIP·松狸Ⅱ ", "客服VIP时装兑换券（初级）(兑换限时1个月) ", "摩托车·红莲(兑换限时1个月) ", "摩托车·黑洞(兑换限时1个月) "],
            ["游乐场金币 ", "[称号]锦鲤", "[称号]真香", "白驼山门票兑换券 ", "京龙大侠召集令 ", "客服VIP·草精Ⅰ ", "客服VIP·松狸Ⅰ ", "客服VIP·草精Ⅱ ", "客服VIP·松狸Ⅱ ", "客服VIP·草精Ⅲ ", "客服VIP·松狸Ⅲ ", "客服VIP·草精Ⅳ ", "客服VIP·松狸Ⅳ ", "客服VIP时装兑换券（初级）(兑换限时1个月) ", "客服VIP时装兑换券（中级）(兑换限时1个月) ", "摩托车·红莲(兑换限时1个月) ", "摩托车·黑洞(兑换限时1个月) "],
            ["游乐场金币 ", "[称号]锦鲤", "[称号]真香", "白驼山门票兑换券 ", "京龙大侠召集令 ", "客服VIP·草精Ⅰ ", "客服VIP·松狸Ⅰ ", "客服VIP·草精Ⅱ ", "客服VIP·松狸Ⅱ ", "客服VIP·草精Ⅲ ", "客服VIP·松狸Ⅲ ", "客服VIP·草精Ⅳ ", "客服VIP·松狸Ⅳ ", "客服VIP·草精Ⅴ ", "客服VIP·松狸Ⅴ ", "客服VIP时装兑换券（初级）(兑换限时1个月) ", "客服VIP时装兑换券（中级）(兑换限时1个月) ", "客服VIP时装兑换券（高级）(兑换限时1个月) ", "摩托车·红莲(兑换限时1个月) ", "摩托车·黑洞(兑换限时1个月) "],
            [],
        ],
        8: [
            ["神鬼vip徽章（白银版）", "四级宝石币*1", "阿卜的契约中级*1", "VIP至尊卡*1", "神鬼传奇盛世庆典礼盒*3"],
            ["神鬼VIP徽章（黄金版）", "四级宝石币*2", "阿卜的契约中级*1", "VIP至尊卡*1", "超脱*1", "神鬼传奇豪华惊喜礼盒*3"],
            ["神鬼VIP徽章（白金版）", "四级宝石币*3", "阿卜的契约高级*1", "高级VIP至尊卡*1", "超脱*1", "称号：霸道*1", "神鬼传奇至尊荣耀礼盒*3"],
            [],
        ],
        12: [
            ["异界共鸣水晶*1", "VIP荣耀奖章*10", "星魂币*100", "金叶子*20", "春意盎然时装兑换卷轴*1"],
            ["VIP荣耀奖章*10", "星魂币*200", "金叶子*30", "2000绑定元宝卡*10", "春意盎然背饰兑换卷轴*1"],
            ["VIP荣耀奖章*10", "星魂币*200", "金叶子*50", "2000绑定元宝卡*20", "春意盎然徽章兑换卷轴*1"],
            [],
        ],
        6: [
            ["初级VIP男卓越和初级VIP女神萝任选其一", "热舞白银VIP任务书"],
            ["高级VIP男卓越和高级VIP女神萝任选其一", "热舞黄金VIP任务书"],
            ["高级VIP男卓越和高级VIP女神萝任选其一", "热舞白金VIP任务书", "VIP白金之冠兑换券"],
            [],
        ],
        11: [
            ["裂纹晶石（VIP专属）*1", "魂币*50钻*1", "星界重铸耀晶*20", "古代战士之魂*500", "融合符：狂怒*500", "融合符：庇护*500", "紫色灵魂魔法石*60", "华丽的奇迹袋*30", ],
            ["固魂精华*5", "无暇晶石（VIP专属）*1", "魂币*50钻*1", "回溯之卷*100", "星界重铸棱晶*10", "神器碎片箱（绿）*200", "强烈灵魂结晶*20", "紫色灵魂魔法石*200", "迹一迹灵之符*120", "华丽的奇迹袋*50", ],
            ["鑫仔晶石（VIP专属）*1", "魂币*100钻*1", "星界重铸棱晶*30","希莉娅赐福之愿*2", "神龙鳞自选凭证*3", "固魂精华*15", "神器碎片箱（紫）*1", "紫色灵魂魔法石*300", "迹一迹灵之符*180", "燃烧灵魂结晶*10", "强烈灵魂结晶*30",],
            ["称号：克兰蒙多闪耀的星*1","神器碎片箱（紫）*5","燃烧灵魂结晶*30","固魂精华*30",],
        ],
        7: [
            ["500000通宝（50）", "神遁之书*1", "长安特快筋斗云*1", "炼骨丹·1阶*20", "特制胶囊*1（限时1小时）", "活动令牌*5", "果仁饼干*999", "朝元神丹*1", "双倍经验（24072）*1", "特制胶囊*1", "圣魔丹（90级）*1", "埃灼朝元仙丹*1", "无属性时装坐骑（限时90天）", "无属性时装（限时90天）"],
            ["1600000通宝（160）", "神遁之书*3", "长安特快筋斗云*3", "原地复活卷轴*1", "双倍经验（六合）*1", "昊天石（20808）*1", "炼骨丹·2阶*20", "特制胶囊*1（限时1小时）", "大天香豆蔻*1（限时1小时）", "果仁饼干*999", "活动令牌*15", "朝元神丹*3", "轩辕石（20806）*1", "超级胶囊*1", "圣魔丹（90级）*3", "埃灼朝元仙丹*2", "属性坐骑（限时90天）", "无属性时装（限时90天）"],
            ["9000000通宝（900）", "神遁之书*15", "长安特快筋斗云*15", "原地复活卷轴*5", "双倍经验（地支）*1", "昊天石（20808）*5", "特制胶囊*2（限时6小时）", "大天香豆蔻*2（限时6小时）", "炼骨丹·3阶*20", "果仁饼干*999", "朝元神丹*15", "活动令牌*75", "轩辕石（20806）*5", "创世胶囊*1", "圣魔丹（90级）*10", "埃灼朝元仙丹*5", "属性坐骑（限时90天）", "无属性飞行器（限时90天）", "属性时装（限时90天）"],
            [],
        ],
        15: [
            ["八级宠物元魂珠*6", "飞虹石*320", "专属称号“银卡VIP”（90天）*1", "VIP时装体验：暮雪柔情（7天）*1"],
            ["八级宠物元魂珠*12", "飞虹石*320", "碧垠玉魄*11", "专属称号“金卡VIP”（90天）*1", "VIP时装体验：暮雪柔情（30天）*1"],
            ["碧垠玉魄*30", "飞虹石*650", "高级宠物秘籍*11", "专属称号“白金VIP”（90天）*1", "VIP时装体验：暮雪柔情（30天）*1"],
            [],
        ],
        19: [
            ["白银会员圣斗士（称号）", "眼镜1个（饰品）"],
            ["黄金会员圣斗士（称号）", "梦幻童话时装1套（60天）"],
            ["白金会员圣斗士（称号）", "坐骑：剑鱼座飞圣衣1个（60天）"],
            [],
        ],
        36: [
            ["第五版补充包（绑定）*5"],
            ["异画-吸血鬼王子（绑定）*1"],
            ["VIP牌背：创造之眼"],
            ["异画-吸血鬼王子（绑定）*1"],
        ],
        34: [
            ["固形之气*5", "仙宠洗髓丹*10", "显幻之碎*2"],
            ["金麟印*1", "金髓聚灵符*15", "显幻之碎*5"],
            ["聚仙丹*1", "炼仙二气丹*1", "气合丹*20", "弥形丹*1", "玄元塑命丸*1","显幻之碎*10"],
            [],
        ],
        5: [
            [],
            [],
            [],
            [],
        ],
        69: [
            [],
            [],
            [],
            [],
        ]
    },
    "birthday": {
        4: ["专属称号：佳辰乐事奉金杯","沧浪冰珠X2000","造化珠X3000","太极金丹X500","7天限时大药"],
		3: ["锦囊·寿星降临（限时一周）*1","战灵之源：S*5","星云散聚石*10","黄金护身符*1","黄金守身符*1","生日快乐（鲜花）*10","生日蛋糕（烟花）*10"],
        21: ["橙镖令*3","魂兮归来*1（时限坐骑）15天限时","极品穿金石*10","换镖令*10","碎皮兜*1（小包裹10格）","书·生辰之庆（烟花道具）"],
        9: ["生日变身药水","生日称谓","生日烟花","生日礼包"],
        2: ["祝你生日快乐*20","游乐场金币*5","生日蛋糕*1"],
        8: ["生日蛋糕","生日糖果","红包","烟花","绑定元宝","高级强化水晶"],
        12: ["至尊生日蛋糕"],
        11: ["礼花*20","鑫仔的星辰晶耀石*1","温奇家庭的奇幻袋*10","生命和魔法礼盒*1","神秘4级符文礼包*1","希莉娅之泪*5"],
        15: ["专属称号：別期若有定，相思又何妨（30天）*1","橙色雕儿风筝*2","随机时装（7天）*1","醉月泷沙*1","星月灵犀*1","红桥明月夜经典版*1","玉笛听梅落经典版*1","百里无虞经典版*1"],
        19: ["专属称号：祝我快乐必加暴击", "双倍经验能量核20个（可用于兑换金券）"],
        36: ["第三版补充包*1 绑定"],
        34: ["生日快乐烟花×5","狮吼×1","鲜花×10","仙豆×1","九州玉佩×10","专属称号：生日快乐（3天）"],
        5: ["VIP·寿面（50个）","VIP·金甲白虎（7天） ","向日葵（表情）（15天） ","留梦碎片300个 ","玄天寒玉5个（英雄级） ","天机卷兑换卡5个（英雄级） ","生日使者礼包"],
        6: ["VIP生日之冠（30天）","VIP生日之链（30天）","VIP生日之翼（30天、四色可选）","清凉冲浪板（紫、60天）","时光智者POSE可选（7天）","精品天籁","十周年背景（30天）","十周年前景（30天）"],
        69: ["","","","","","","",""]
    }
}

// var isAdd = false;
function addXa(){
	// if(isAdd == false){
		$('#xajd, .sub_tit, .xa_tips').remove();
		var str2 = '';
		str2 += '<div class="sub_tit" style="font-size:18px; color:#333; font-weight:bold; border-left:4px solid #e7414b; padding-left:6px; margin:20px 0 20px 20px;">经典服</div>';
		str2 += '<div class="gift_info_detail" id="xajd">';
		str2 += '    <ul class="clearfix">';
		str2 += '        <li>';
		str2 += '            <div class="pic"><img src="images/v1.png" /></div>';
		str2 += '            <div class="text">';
		str2 += '                <p>（1小时）双倍经验药*1</p>';
		str2 += '                <p>橙镖令*3</p>';
		str2 += '                <p>神奇的穿金石*5</p>';
		str2 += '            </div>';
		str2 += '        </li>';
		str2 += '        <li>';
		str2 += '            <div class="pic"><img src="images/v2.png" /></div>';
		str2 += '            <div class="text">';
		str2 += '                <p>（1小时）双倍经验药*2</p>';
		str2 += '                <p>新鲜的龙涎草*1</p>';
		str2 += '                <p>星尘砂*10</p>';
		str2 += '            </div>';
		str2 += '        </li>';
		str2 += '        <li>';
		str2 += '            <div class="pic"><img src="images/v3.png" /></div>';
		str2 += '            <div class="text">';
		str2 += '                <p>紫晶宝珠合成碎片*2</p>';
		str2 += '                <p>辉光千语*1</p>';
		str2 += '                <p>染色剂·纯白*3</p>';
		str2 += '                <p>星尘砂*20</p>';
		str2 += '                <p>新鲜的龙涎草*2</p>';
		str2 += '            </div>';
		str2 += '        </li>';
		str2 += '        <li>';
		str2 += '            <div class="pic"><img src="images/v4.png" /><br>（需联系大客户经理）</div>';
		str2 += '            <div class="text">';
		str2 += '                <p>紫晶宝珠合成碎片*2</p>';
		str2 += '                <p>倾心万言*2</p>';
		str2 += '                <p>染色剂·红宝石*3</p>';
		str2 += '                <p>染色剂·纯黑*3</p>';
		str2 += '                <p>花开富贵*5</p>';
		str2 += '            </div>';
		str2 += '        </li>';
		str2 += '    </ul>';
		str2 += '</div>';

		$('.btn_get').before(str2);
		$('.gift_detail_left .gift_info .gift_info_tit').after('<div class="sub_tit" style="font-size:18px; color:#333; font-weight:bold; border-left:4px solid #e7414b; padding-left:6px; margin:20px 0 20px 20px;">正式服</div>');
		$('.gift_tips').after('<p class="xa_tips" style=" text-align:center; color:#F00;">凭借不同档次的道具，可以在NPC【千小伊】处，领取且完成不同的任务奖励。</p>');
		// isAdd = true;
	// }
}

var baseUrl = 'http://vipservice.wanmei.com';
;(function(){
	$.getNickName = function(){
		$.ajax({
			url:baseUrl + '/loginStatus',
			type:"GET",
			dataType:"jsonp",
			//jsonpCallback:"callback",
			success:function(data){
				$('#realName').text(data.result.nickname);
			},
			error:function(){
				alert("网络错误，请稍后重试！");
			}
		});
	}
	$.renderGift = function(type,gametype){
		var type = type || 1;
		var gametype = gametype || 1;
		var item = '',str='',li = '',txt = '';
		if(type==1){
			item = activityJson.quarter;
			for(var k in item){
				if(gametype == k){
					for(var j=0;j<item[k].length;j++){
						for(var s=0;s<item[k][j].length;s++){
							str += '<p>'+ item[k][j][s] + '</p>';
							console.log(!item[k][3][s])
							if(!item[k][3][s]){
								txt = '敬请期待';
								
							}else{
								txt = '需联系大客户经理';	
							}
						}
						
						
						li += '<li><div class="pic"><img src="images/v'+(j+1)+'.png" />' + ((j==3)?'<br>（' + txt + '）':'') + '</div><div class="text">' + str + '</div></li>';
						
						str = ''
					}
					$('#quarter_list').html(li);
				}
			}
		}else if(type==2){
			item = activityJson.birthday;
			for(var k in item){
				if(gametype == k){
					for(var j=0;j<item[k].length;j++){
						str += '<p>' + item[k][j] + '</p>';
					}
					$('#birthday_list').html(str);
				}
				// if(gametype == 6){
				// 	$('.gift_detail_left .gift_info .btn_get').hide();
				// }else{
				// 	$('.gift_detail_left .gift_info .btn_get').show();
				// }
			}
		}
	}
})()
$(function(){
	$.renderGift(getParams('type'),getParams('gametype'));
	// console.log(getParams('type'));
	bindDeatailNav();
	
	//领取礼包
	$('.btn_get').on('click',function(){

		// alert('礼包更新中，请稍后尝试领取');
		// return;
		
		var _this = $(this);
		var type = _this.attr('data-type');
		var aid = _this.attr('data-aid');
		$("#role").html('');
		$.ajax({
			url:baseUrl+"/loginStatus",
			type:"POST",
			dataType:"jsonp",
			success:function(data){
				if(data.code==0){
					if(_this.hasClass('btn_get2')){
						$('.gift_pop ul li.item1').hide();
						$('.gift_pop ul li.item2').show();
					}else{
						$('.gift_pop ul li.item1').show();
						$('.gift_pop ul li.item2').hide();
					}
					$('.user_name').val(userName);
					$('.user_tel').val(userTel);
					diogPrize();
					//获取游戏列表
					getGamesInfo(aid);
					getPrizeInfo(type,aid);
				}else{
					login();
				}
			}
		});
	});
});
	
	//获取短信验证码
	var wait = 60; 
	$("#yzm").click(getVerifyCode); 
	function getVerifyCode() {
		$.ajax({
			url:baseUrl+"/sendCodeToDefaultMobile",
			type:"POST",
			data:{
				'mobile':userTel
			},
			dataType:"jsonp",
			success:function(data){
				if(data.code == 0){
					var timer = setInterval(function() {
						if (wait == 0) { 
							clearInterval(timer);   
							$("#yzm").removeClass('off').html("发送验证码"); 
							$("#yzm").on('click', getVerifyCode); 
							wait = 60; 
						}else {
							wait--;
							$("#yzm").off('click');
							$("#yzm").addClass('off').html("重新发送(" + wait + ")"); 
						}
					}, 1000); 
				}
			}
		});
	}

	function subMitGift(type){
		//提交礼包领取信息
		$('#btn_submit').off('click').on('click',function(){
			grantPrize(type);
			console.log(type)
		})
	}

	//绑定导航按钮
	function bindDeatailNav(){
		if(!getParams('gametype')){
			$('.detail_game_nav li').eq(0).trigger('click');
		}
		var type = (getParams('type'))?(getParams('type'))-1:0;
		showNow();
		$('.detail_nav li:not(.d_inmportant)').click(function(){
			var _this = $(this),index = _this.index();
			_this.addClass('on').siblings().removeClass('on');
			$('.detail_con').hide().eq(index).show();
			showNow(index);
		}).eq(type).trigger('click');		
	}
	//小导航
	function showNow(n){
		$('.detail_game_nav:eq(' + n + ') li').each(function(index) {
			var _this = $(this);
			var gametype = $(this).attr("data-gametype");
			_this.unbind('click').click(function(){
				var title = _this.find('span').text();
				var type = _this.attr("data-type");
				var aid = _this.attr("data-aid");
				if(gametype == 34){//蜀山
					alert('礼包更新中，请稍后尝试领取');
					return false;
				}
				else if(gametype == 69){//怀旧版神雕侠侣
					alert('该游戏尚未开启，尽情期待！');
					return false;
				}
				// else if(type == 1 && gametype == 9){
				// 	alert('礼包更新中，请稍后尝试领取');
				// 	return false;
				// }
				else{
					_this.addClass('on').siblings().removeClass('on');
					$('.btn_get').attr('data-aid',aid);
					if(type==1 && gametype==21){
						addXa();
					}else{
						$('#xajd, .sub_tit, .xa_tips').remove();
					}
					if(type==1){
						$('.gift_info_tit').text('《'+ title +'》' + ' 2019年第一季度VIP礼包');
						$('.crumbs_nav span').text('《'+ title +'》' + ' 季度VIP礼包');
						// alert('礼包更新中，请稍后尝试领取');
						// return false;
					}else if(type == 3){
						$('.gift_info_tit').text('《'+ title +'》' + ' 白金特权礼包');
						$('.crumbs_nav span').text('《'+ title +'》' + ' 白金特权礼包');
					}else{
						$('.gift_info_tit').text('《'+ title +'》' + ' VIP生日礼包');
						$('.crumbs_nav span').text('《'+ title +'》' + ' VIP生日礼包');
					}
					$.renderGift(type,gametype);
					subMitGift(type)
					//window.location.href = changeURLPar(window.location.href,'id',type);
				}
			})
			if(getParams('gametype') == gametype){
				_this.trigger('click');
			}
		});

		// $('.detail_game_nav').each(function(){
		// 	$(this).find('li').each(function(){
		// 		var _this = $(this);
		// 		var gametype = $(this).attr("data-gametype");
		// 		_this.click(function(){
		// 			_this.addClass('on').siblings().removeClass('on');
		// 			var title = _this.find('span').text();
		// 			var type = _this.attr("data-type");
		// 			var aid = _this.attr("data-aid");
		// 			$('.btn_get').attr('data-aid',aid);
		// 			console.log(type);
		// 			if(type==1){
		// 				$('.gift_info_tit').text('《'+ title +'》' + ' 2018年第三季度VIP礼包');
		// 				$('.crumbs_nav span').text('《'+ title +'》' + ' 季度VIP礼包');
		// 				// alert('礼包更新中，请稍后尝试领取');
		// 				// return false;
		// 			}else if(type == 3){
		// 				$('.gift_info_tit').text('《'+ title +'》' + ' 白金特权礼包');
		// 				$('.crumbs_nav span').text('《'+ title +'》' + ' 白金特权礼包');
		// 			}else{
		// 				$('.gift_info_tit').text('《'+ title +'》' + ' VIP生日礼包');
		// 				$('.crumbs_nav span').text('《'+ title +'》' + ' VIP生日礼包');
		// 			}
		// 			$.renderGift(type,gametype);
		// 			subMitGift(type)
		// 			//window.location.href = changeURLPar(window.location.href,'id',type);
		// 		})
		// 		if(getParams('gametype') == gametype){
		// 			_this.trigger('click');
		// 		}
		// 	});
		// });
	}

	function changeURLPar(destiny, par, par_value){ 
		var pattern = par+'=([^&]*)'; 
		var replaceText = par+'='+par_value; 
		if (destiny.match(pattern)){ 
			var tmp = '/\\'+par+'=[^&]*/'; 
			tmp = destiny.replace(eval(tmp), replaceText); 
			return (tmp); 
		}else{
			if (destiny.match('[\?]')){
				return destiny+'&'+ replaceText; 
			}else{
				return destiny+'?'+replaceText; 
			} 
		} 
		return destiny+'\n'+par+'\n'+par_value; 
	}
	//获取游戏列表
	function getGamesInfo(aid) {
		$("#game").empty();
		var str = '';
		var url = baseUrl + '/prize/games';
		$.ajax({  
			type: "POST",  
			url: url, 
			dataType: "jsonp", 
			//data: data,  
			success: function(data){
				console.log(data);
				if(data.code == 0){
					$.each(data.result,function(i,item){
						if(aid == item.aid){
							str+='<option name="game" value="'+item.aid+'">'+item.name+'</option>';
						}
					})
					$("#game").html(str);
					getZoneInfo();
					checkGameType();
				}else{
					$("#game").html('');
				}
			},  
			error: function(e){alert("网络错误，请稍后重试！");}
		});
	}
	
	//获取服务器列表和礼包列表
	/*function updateZonePrize(){
		checkGameType();
		getZoneInfo();
	}*/
	//判断游戏是否为代理游戏
	function checkGameType(){
		var val = $('#game').val();
		if(val > 1000){
			$('#roleArea').hide();
		}else{
			$('#roleArea').show();
		}
	}
	//获取服务器列表
	function getZoneInfo(){
		var aid = $("#game").val();
		var gamename = $("#game option:selected").text();
		$("#zone").empty();
		var str = '';
		var url = baseUrl + '/prize/zones';
		var data = {aid:aid};
		$.ajax({  
			type: "GET",  
			url: url,
			dataType: "jsonp", 
			data: data,
			success: function(data){
				if(data.code == 0){
					$.each(data.result,function(i,item){
						str+='<option name="game" value="'+item.id+'">'+item.serverName+'</option>';
					})
					str = "<option name='zoneid' value='0'>请选择服务器</option>" + str;
					$("#zone").html(str);
					getRoleInfo();
				}else{
					$("#zone").empty();
				} 
			},  
			error: function(e){alert("网络错误，请稍后重试！");}
		});  
	}
	
	//获取奖品信息
	function getPrizeInfo(type,aid){
		var str = '';
		$("#prize").empty();
		if(type==1){
			var url = baseUrl + '/prize/prizeList';
		}
		if(type==2){
			var url = baseUrl + '/prize/activityPrizeList';
		}
		$.ajax({  
			type: "POST",  
			url: url,
			dataType: "jsonp",
			success: function(data){
				console.log(data)
				if(data.code == 0){			      	  
					$.each(data.result,function(i,item){
						if(aid == item.aid){
							str+='<option name="game" value="'+item.id+'">'+item.prizeName+'</option>';
						}
					})
					$("#prize").html(str);
					//更新领取状态
					updateGrantStatus(type);
				}else{
					$("#prize").empty();
				}
			},
			error: function(e){alert("网络错误，请稍后重试！");}
		});
	}
	
	//获取角色名称
	function getRoleName() {
		var visible = $("#role").is(":visible");
		if(visible) {
			return $("#role option:selected").text();
		}
		return $("#rolename").val();
	}
	//选择礼包时更新状态
	function getPrizeStatus(){
		var type = $('.btn_get').attr('data-type');
		updateGrantStatus(type);
	}
	//获取角色信息
	function getRoleInfo(){
		var aid = $("#game").val();
		switch(aid) {
			case "9" :
			case "10" :
			case "12" :
			case "13" :
			case "18" :
			case "19" :
			case "25" :
				$("#role").hide();
				$("#rolename").show();
				//updateGrantStatus(); // 这几个游戏，玩家填写角色名称
				return;
			default :
			$("#role").show();
			$("#rolename").hide(); // 其他游戏，玩家选择角色
		}
		var gamename = $("#game option:selected").text();
		if(aid==null || aid == "") return;
		var zoneid = $("#zone").val();
		var zonename = $("#zone option:selected").text();
		if(zoneid==null || zoneid == "0" || zonename == "") return;
		$("#role").empty();
		var url = baseUrl + '/prize/roles';
		var data = {
			aid : aid,
			zoneid : zoneid
		};
		var str = '';
		$.ajax({  
			type: "POST",  
			url: url,
			dataType: "jsonp", 
			data: data,  
			success: function(data){
				console.log(data);
				$("#role").html('');
				if(data.result){
					$.each(data.result,function(i,item){
						str+='<option value="'+item.roleId+'">'+item.roleName+'</option>';
					})
					$("#role").html(str);
					//更新领取状态
					//updateGrantStatus();						
				}
			},  
			error: function(e){alert("网络错误，请稍后重试！");}
		});
	}
		
	//提交礼包领取
	function grantPrize(type){
		if(!checkGrantPrizeInfo(true)) return false;
		var aid = $("#game").val();
		var zoneid = $("#zone").val();
		var rolename = getRoleName();
		var prizeid = $("#prize").val();
		// var userPrize = $('.user_prize').attr('prizeId');
		var userPrize = $('.user_prize').val();
		var userTel = $('.user_tel').val();
		var getYzm = $('.get_yzm').val();
		var data;//= {aid:aid, zoneid:zoneid, rolename: rolename, prizeId:prizeid};
		if(type==1){
			data = {aid:aid, zoneid:zoneid, rolename: rolename, prizeId:prizeid};
			var url = baseUrl + '/prize/grantVipPrize';
		}
		if(type==2){
			data = {aid:aid, zoneid:zoneid, rolename: rolename, prizeId:prizeid};
			var url = baseUrl + '/prize/grantActivityPrize';
		}
		if(type == 3){
			data = {aid:aid, zoneId:zoneid, roleName: rolename, prizeId:prizeid};
			var url = baseUrl + '/prize/applyForCompPrize';
			data.prizeId = userPrize;
			data.mobile = userTel;
			data.rand = getYzm;
		}
		console.log(type);
		$.ajax({  
			type: "POST",  
			url: url, 
			dataType: "jsonp", 
			data: data,  
			success: function(data){
				console.log(data);
				alert(data.message);
				$.simpleDialog.close('gift_pop');
				$('.get_yzm').val('');
				//更新领取状态
				updateGrantStatus(type);
			},  
			error: function(e){alert("网络错误，请稍后重试！");}
		}); 
	}
	//领取状态
	function updateGrantStatus(type){
		if(type == 3){
			return false;
		}
		$("#grantstatus").html("<p>&nbsp;&nbsp;</p>");
		/*if(!checkGrantPrizeInfo(false)) return false;*/
		var aid = $("#game").val();
		var prizeid = $("#prize").val();
		var data = {aid:aid,prizeId:prizeid};
		if(aid == null){return false}
		if(type==1){
			var url = baseUrl + '/prize/grantPrizeInfo';
		}
		if(type==2){
			var url = baseUrl + '/prize/grantActivityPrizeInfo';
		}
		// if(type==3){
		// 	var url = baseUrl + '';
		// }
		console.log(data)
		$.ajax({  
			type: "POST",  
			url: url, 
			dataType: "jsonp", 
			data: data,  
			success: function(data){
				console.log(data)
				if(data.code == 0){
					$("#granttime").html(data.result.granttime);
					if(data.result.result == 1){
						$("#grantstatus").html('领取成功');
					}
				}else{
					$("#granttime").html('未知');
					$("#grantstatus").html('未知');
				}
			},  
			error: function(e){alert("网络错误，请稍后重试！");}
		});
	}
		
	function checkGrantPrizeInfo(showalert){
		var gameid = $("#game").val();
		var gamename = $("#game option:selected").text();
		var zoneid = $("#zone").val();
		var zonename = $("#zone option:selected").text();
		var rolename = getRoleName();
		var prizeid = $("#prize").val();
		// var userPrize = $('.user_prize').attr('prizeId');
		var userPrize = $('.user_prize').val();
		var prizename = $("#prize option:selected").text();
		var result = true;
		var msg = ""; 
		if(gameid == null || gamename == null || gameid == undefined || gamename == undefined){
			result = false;
			msg = "请选择游戏!";
		}
		if(zoneid == null || zoneid == "0" || zoneid == undefined){
			result = false;
			msg = "请选择服务器!";
		}
		/*if($("#role").is(":visible") && ($("#role").attr("disabled") == true || $("#role").attr("disabled") == "disabled")) {
			result = false;
			msg = "未获得角色，无法领取礼包!";
		}
		*/
		if(rolename == null || rolename == undefined || rolename == ""){
			result = false;
			msg = "请输入角色名称!";
		}
		if($('.gift_pop ul li.item2').is(":visible")){
			if(userPrize == null || userPrize == undefined || userPrize == ""){
				result = false;
				msg = "请选择礼包123！";
			}
		}else{
			if(prizeid == null || prizeid == undefined || prizeid == ""){
				result = false;
				msg = "请选择礼包！";
			}
		}
		if(!result){
			if(showalert)
			{
				alert(msg);
			}
			return false;
		}
		return true;
	}
	
	function diogPrize(){
		$.simpleDialog({
			skin:false,
			content: '#gift_pop',
			id: 'gift_pop'
		});
		//$.getNickName();
	}
	$("#gift_pop .close_pop").click(function(){
		$.simpleDialog.close('gift_pop');
		$('.get_yzm').val('');
	});