var Tool = {
	randomSection:function(minnum,maxnum){
		return Math.floor(minnum+Math.random()*(maxnum-minnum));	
	},
	getPageWidth:function(){//可视区域宽
		return document.documentElement.clientWidth;	
	},
	getPageHeight:function(){//可视区域高
		return document.documentElement.clientHeight;	
	}
}

//初始化配置
function W2i() {
	this.screenWidth=Tool.getPageWidth;//屏宽
	this.screenHeight=Tool.getPageHeight;//屏高
	this.score=0;//总分数
	this.blood=200;//满血
	this.currBlood = this.blood;//当前血
	this.time=15;//时间限制
	this.crit=Tool.randomSection(0,this.time);//暴击出现的位置，随机产生
	this.original=0;//原始计数器
	this.dianTip =1;//轮播点
}

var w2i = new W2i();

//数时间
function toTurnTime(){
	var tempTime = parseInt($('#time').html())-1;
	$('#time').html(tempTime);
	
	//海星来
	/*if(tempTime==w2i.crit){
		$('#haixing').addClass('starToMove');
	}*/
	
	if(parseInt($('#time').html())==0){
		gameover();
	}
}
//游戏开始倒计时
var countTime = 4;

function gameBegin(){
	if(countTime==0){
		setTimeout('gameIng()',500);
		$('.startGmae_begin').hide();
		$('#main').show();
		gameReady();
		return false;
	}else{
		countTime--;
		var countImg = "images/count_"+countTime+".png";
		$('.startGmae_begin .count').attr("src",countImg);
		setTimeout('gameBegin()',1000);
	}
	
}
//游戏前期重置
function gameReady(){
	w2i.currBlood = w2i.blood;
	$('#time').html(w2i.time);
	clearInterval(chouTime);
	chouTime=setInterval('toTurnTime()',1000);
	$('#blood_upper').width($('#blood').width());
	$('.gameover').removeClass('gameoverScale');
}

//游戏结束
function gameover(){
	$('#main').unbind("touchmove");
	clearInterval(chouTime);
	if(w2i.currBlood>0){
		$('.gameover').addClass('gameoverScale');
		setTimeout(function(){
			$('#main').hide();
			$('#no').show();
			$('#no #no_bg').attr('class','no_'+Tool.randomSection(0,3));
		},1000)
	}else{
		$('#main').hide();
		$('#yes').show();
		$('#yes .win_box').eq(Tool.randomSection(0,2)).show().siblings().hide();
	}
}
//游戏进行中
function gameIng(){
	//手指划过
	$('#main').bind("touchmove",function(event){
		var temprandnum = Tool.randomSection(0,2);
		if(w2i.original > event.touches[0].clientX){
			$('#man').hide();
			$('#man1').show();	
		}else{
			$('#man').show();
			$('#man1').hide();
		}
		w2i.original = event.touches[0].clientX;
		
		//光效
		$('.hit').css({top:Tool.randomSection(50,80)+'%',left:Tool.randomSection(20,60)+'%'}).attr('src','images/hit'+temprandnum+'.png').show();
		
		//血条控制
		w2i.currBlood--;
		$('#blood_upper').width($('#blood').width()*(w2i.currBlood/w2i.blood));
		
		//奖品飘出来
		if(w2i.currBlood==parseInt(w2i.blood/3)){
			$('#prize').attr({'src':'images/icon'+Tool.randomSection(0,3)+'.png','class':''}).show().addClass("anm_icon"+Tool.randomSection(1,5));
			console.log(w2i.currBlood);
		}else if(w2i.currBlood==parseInt(w2i.blood/5)){
			$('#prize').attr({'src':'images/icon'+Tool.randomSection(0,3)+'.png','class':''}).show().addClass("anm_icon"+Tool.randomSection(1,5));
			console.log(w2i.currBlood);
		}else if(w2i.currBlood==parseInt(w2i.blood/7)){
			$('#prize').attr({'src':'images/icon'+Tool.randomSection(0,3)+'.png','class':''}).show().addClass("anm_icon"+Tool.randomSection(1,5));
			console.log(w2i.currBlood);
		}else if(w2i.currBlood==parseInt(w2i.blood/1.7)){
			$('#prize').attr({'src':'images/icon'+Tool.randomSection(0,3)+'.png','class':''}).show().addClass("anm_icon"+Tool.randomSection(1,5));
			console.log(w2i.currBlood);
		}else if(w2i.currBlood==parseInt(w2i.blood/1.1)){
			$('#prize').attr({'src':'images/icon'+Tool.randomSection(0,3)+'.png','class':''}).show().addClass("anm_icon"+Tool.randomSection(1,5));
			console.log(w2i.currBlood);
		}
		
		//判断是否有血
		if(w2i.currBlood<=0){
			gameover();	
		}
		//抖动
		var set=null;
		$('#main').bind('touchmove',function(){
			$("#main").removeClass().addClass("shake");
		})
		$('#main').bind('touchend',function(){
			$("#main").removeClass(); 
			$('.hit').hide();
		})
		
		event.preventDefault();
		event.stopPropagation();
	});	
}

//初始化
var chouTime=null;
var dianTime = null;

window.onload = function(){
	$('#main,.result,#no_bg,.win_box,#loading,#share,.get_prize').css({width:w2i.screenWidth(),height:w2i.screenHeight()});
	//首次点击清零
	$('#main').bind("touchstart",function(event){
		w2i.original =0;
		event.preventDefault();
		event.stopPropagation();
	});	
  	/*$('#haixing').bind("touchstart",function(event){
		//判断气泡内容
		if(w2i.crit%2==1){
			$('#haixing span').html('左右开弓');	
			w2i.currBlood-=6;
			$('#blood_upper').width($('#blood').width()*(w2i.currBlood/w2i.blood));
		}else{
			$('#haixing span').html('时间 +5');	
			$('#time').html(parseInt($('#time').html())+5);
			w2i.currBlood+=5;
		}
		
		$('#haixing img').attr('src','images/s2.png').addClass('breakP');
		$('#haixing span').show();
	});*/
	
	//再来一次
	$('.btn_more').bind("touchstart",function(event){
		$('.result').hide();
		$('.startGmae_begin').show();
		countTime=4;
		gameBegin();
	})
	
	//分享
	$('.btn_share').bind("touchstart",function(event){
		$('#share').show();
	})
	$('#share').bind("touchstart",function(event){
		$('#share').hide();
	})
	
	//第一次按气泡
	$('#startGame_btn').bind("touchstart",function(event){
		$('.startGame').hide();
		$('.startGmae_begin').show();
		gameBegin();
	});
	
	//领取奖品
	$('.btn_prize').bind("touchstart",function(event){
		$('.get_prize').show();
	})
}
