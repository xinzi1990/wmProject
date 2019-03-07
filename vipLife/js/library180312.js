/*
	影城列表功能
*/

function GetCinemaAddress(options){
    var opts = $.extend({
        province:null,//省
        city:null,//市
        area:null,//地区
        cityList:null//影院列表
    },options);
    this.province = opts.province;
    this.city = opts.city;
    this.area = opts.area;
    this.cityList = opts.cityList["city"];
    this.arrList = [];
    this.str = '';
}
GetCinemaAddress.prototype = {
    //初始化
    init:function(){
        var _this = this;
        if(_this.area){
            _this.getAreaCinemaList();
        }else if(_this.city){
            _this.getCityCinemaList();
        }else if(_this.province){
             _this.getProvinceCinemaList();
        }else{
            //默认显示全国的影城
            _this.getCountryCinemaList();
        }
        _this.str = '';
        _this.randerCinemaList();
    },
    //获取省级的影院列表
    getProvinceCinemaList:function(){
        var _this = this;
        _this.arrList = [];
        for(var i = 0; i < _this.cityList.length; i++){
            if(_this.cityList[i].cinemaProvince == _this.province){
                _this.arrList.push(_this.cityList[i]);
            }
        }
    },
    //获取市级的影院列表
    getCityCinemaList:function(){
        var _this = this;
        _this.arrList = [];
        for(var i = 0; i < _this.cityList.length; i++){
            if(_this.cityList[i].cinemaCity == _this.city){
                _this.arrList.push(_this.cityList[i]);
            }
        }
    },
    //获取区级的影院列表
    getAreaCinemaList:function(){
        var _this = this;
        _this.arrList = [];
        for(var i = 0; i < _this.cityList.length; i++){
            if(_this.cityList[i].cinemaArea == _this.area){
                _this.arrList.push(_this.cityList[i]);
            }
        }
    },
    //获取全国的影院列表
    getCountryCinemaList:function(){
        var _this = this;
        _this.arrList = [];
        for(var i = 0; i < _this.cityList.length; i++){
            _this.arrList.push(_this.cityList[i]);
        }
    },
    //渲染影院列表
    randerCinemaList:function(){
        var _this = this;
        if(!(_this.arrList == '')){
            for(var j = 0; j < _this.arrList.length; j++){
                //console.log(_this.arrList[j]);
                _this.str += '<li><p class="name">'+_this.arrList[j].cinemaName+'</p><p class="position">'+_this.arrList[j].cinemaAddress+'</p><p class="tel">'+_this.arrList[j].cinemaTel+'</p></li>'
            }
            $('.cinema-items ul').html(_this.str);
        }else{
            $('.cinema-items ul').html('<li class="noCinema">未获取到影院信息！</li>');
        }
    }
}
$.getCinemaAddress = function(options){
    var opts = $.extend({
        province:null,//省
        city:null,//市
        area:null,//地区
        cityList:null,//影院列表
    },options);
    new GetCinemaAddress({
        province : opts.province,
        city : opts.city,
        area : opts.area,
        cityList : opts.cityList
    }).init();
};

//公共地址
var baseUrl = 'http://vipservice.wanmei.com/';

function lightStar(score){
	console.log(Math.round(score))
	var lightSpan = '';
	switch(Math.round(score)){
		case 1:
			lightSpan += '<span class="on"></span><span></span><span></span><span></span><span></span>';
			break;
		case 2:	
			lightSpan += '<span class="on"></span><span class="on"></span><span></span><span></span><span></span>';
			break;
		case 3:	
			lightSpan += '<span class="on"></span><span class="on"></span><span class="on"></span><span></span><span></span>';
			break;
		case 4:	
			lightSpan += '<span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span><span></span>';
			break;
		case 5:	
			lightSpan += '<span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span>';
			break;
	}
	return lightSpan;
}



function render(id, img, name, score){
	var str = '';
	str += '<li>\
		<div class="movies-img"><a href="moviesdetail.html?id='+ id +'"><img src="'+ img +'" /></a></div>\
		<div class="movies-name">'+ name +'</div>\
		<div class="movies-score">\
			<span class="star">'+ lightStar(score) +'</span>\
			<span class="score">'+ score +'分</span>\
		</div>\
	</li>';
	return str;
}




//热门电影
var HotMovies = (function(){
	var html = '';
	function getData(dom){
		$.ajax({
			url:baseUrl + "activity/movie/get",
			type:"POST",
			success:function(data){
				//console.log(data)
				if(data.code==0){
					console.log(data.result);
					$.each(data.result,function(i,_this){
						var img = JSON.parse(_this.poster);
						html += render(_this.id, img[0], _this.name, _this.grade/10);
                    })
                    $(dom).find('ul').html(html);
                    $(dom).slide({
                        mainCell:".bd ul",
                        //autoPage:"<a href='javascript:void(0)'></a>",
                        //effect:"leftLoop",
                        effect:"left",
                        trigger:"click",
                        prevCell:".prev",
                        nextCell:".next",
						autoPage:true,
                        scroll:5,
                        vis:5
                    });
				}else{
                    alert(data.message);
                }
			}
		});	
	}
	return getData;
}());

function vipLevel(rank){
	if(rank == 1){
		return 	'VIP银卡会员';	
	}else if(rank == 2){
		return 	'VIP金卡会员';	
	}else if(rank == 3){
		return 	'VIP白金卡会员';	
	}else if(rank == 4){
		return 	'VIP终身会员';	
	}
}


function renderMyorder(id,ticketNums,status,createTime,rank,payment){
	var str = '';
	var statusText;
    var ticketList = [];

	if(status == 0){
		statusText = "";
	}else if(status == 1){
		statusText = "已支付";
	}else if(status == 2){
		statusText = "已退款";
	}else if(status == 3){
		statusText = "已关闭";
	}
    if(ticketNums){
        $.each(JSON.parse(ticketNums),function(i,item){
            ticketList.push(item);
        })
    }else{
        ticketList.push('&nbsp;');
    }
	var payMent = (status == 3) ? 0 : payment;
	var isContinue = (status == 0) ? '<a href="./orderdetail.html?orderId='+ id +'">继续支付</a>' : '';
	str += '<ul class="list">\
			<li class="column1"><span class="table orderNum">'+ id +'</span></li>\
			<li class="column2"><span class="table cinemaTicket">'+ ticketList.join('<br>') +'</span></li>\
			<li class="column3"><span class="table actityName">电影折扣兑换</span></li>\
			<li class="column4"><span class="table orderStatus"><i class="iStatus iStatus'+ status +'"></i>'+ statusText + isContinue + '</span></li>\
			<li class="column5"><span class="table orderTime">'+ createTime +'</span></li>\
			<li class="column6"><span class="table vipRank">'+ vipLevel(rank) +'</span></li>\
			<li class="column7"><span class="table consume cor_red"><strong>'+ payMent +'</strong></span></li>\
		</ul>';
	return str;
}

//查询订单
var orderInfo = (function(){
    var date_pattern = "yyyy-MM-dd hh:mm:ss";    
    //获取今天的日期
    function getToday(){
        var now = new Date();
        return now.format(date_pattern);
    }
   

    Date.prototype.format =function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }  

    //获取上个月
    function getPreMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }
    //查询最近一个月的订单
    $('.orderFilter').on('click','li',function(){
        $(this).addClass('on').siblings().removeClass('on');
        var formDate = $(this).data().type;
        var options = ''
        switch(formDate){
            case 'all':
                options  = '';
                myOrder(false,options);
                break;
            case 'month':
                options  = '&createTimeMax=' + getToday() + '&createTimeMin=' + getPreMonth(getToday());
                myOrder(false,options);
                break;
            case 'custom':
                laydate.render({
                    elem: '#date',
                    trigger: 'click',
                    type: 'datetime',
                    range: '-',
                    show:true,
                    format: 'yyyy年M月d日',
                    max:1,
                    //回调函数
                    done: function(value, date, endDate){
                        console.log(value); //得到日期生成的值，如：2017-08-18
                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
						var pastDate = date.year + '-' + date.month + '-' + date.date;
						var endDate = endDate.year + '-' + endDate.month + '-' + endDate.date;
						options  = '&createTimeMax=' + endDate + '&createTimeMix=' + pastDate;
                        myOrder(false,options);
                    }
                }); 
                break;
        }
    })

    function myOrder(dom,options){
        var options = options || '';
        var dom = dom || $('#orderList');
        console.log(baseUrl + "order/get?userId=" + CookieUtil.getSub('cookie','userId') + options);
		$.ajax({
			url:baseUrl + "order/get?userId=" + CookieUtil.getSub('cookie','userId') + options,
			type:"POST",
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				console.log(data.result)
				if(data.code==0){
					var result = data.result;
					var len = result.length;
                    $(dom).html('');
					for(var i = 0;i < len; i++){
						$(dom).append(renderMyorder(result[i].id,result[i].ticketNums,result[i].status,result[i].createTime,result[i].userRank,result[i].payment));
					}
				}else{
                    alert(data.message);
                }
			}
		});		
	}
	
    //return myOrder;
    return function(dom){
        myOrder(dom);
    };
	
}());




//生成订单
var CreatMoviesOrder = (function(){
    var currentNum = 1;
    var $maxNum = $('.buy-order-item .type5 .buyNum');
	function creatOredr(){
        $('.btn_buy').on('click',function(){
            var amount = $('.quantity-form .itxt').text();
			if(amount <= 0){
				alert('购买的观影券码数量不能为0，请重新选择！');
				return false;	
			}
            $.ajax({
                url:baseUrl + "order/create?amount=" + amount + "&userId=" + CookieUtil.getSub('cookie','userId'),// + "&movieId=8",
                type:"POST",
                xhrFields: {
                    withCredentials: true
                },
                success:function(data){
                    console.log(data)
                    if(data.code == 0){
                        var result = data.result;
                        window.location.href = 'orderdetail.html?orderId=' + result.id;
                    }else if(data.code == -2){
						login();
					}else{
                        alert(data.message);
                    }
                }
            });
        })
    }
	function getPrice(rank){
        $('.buy-order-item .type3 i').attr('class','icon_rank icon_rank' + rank);
        $('.buy-order-item .type3 p,.buy-order-settlement .rank').html(vipLevel(rank))
		$.ajax({
			url:baseUrl + "activity/priceInfo/get?userId=" + CookieUtil.getSub('cookie','userId'),
			type:"POST",
			success:function(data){
				console.log(data)
				if(data.code == 0){
					var result = data.result;
					var discount = result.discount[rank];
					var limit = result.limit[rank];
					$('.buy-order-item .type2 p').html(result.price + '点券');
					$('.buy-order-item .type4 p').html(discount + '%');
                    $('.buy-order-settlement .sale').html(discount/100 + '折优惠');
                    $maxNum.text(limit);
                    //一张票的单价
                    var unitPrice = result.price * discount/100 ;

                    changePrice(1, unitPrice,result.price);

                    $('.quantity-form .increment').on('click',function(){
                        if(currentNum >= Number($maxNum.text())){
                            alert('已经超过购买的最大张数！')
                            return false;
                        }else{
                            currentNum++;
                            changePrice(currentNum, unitPrice,result.price);
                        }
                    })
                    $('.quantity-form .decrement').on('click',function(){
                        if(currentNum <= 0){
                            return false;
                        }else{
                            currentNum--;
                            changePrice(currentNum,unitPrice,result.price);
                        }
                    })
				}else{
                    alert(data.message);
                }
			}
		});
	}
    //更新购买的张数和价格
    function changePrice(num,current,price){
        $('.quantity-form .itxt').text(num);
        $('.buy-order-item .type6 .original').text(num * price + '点券');
        $('.buy-order-item .type6 .present').text(num * current + '点券');
    }


	function getUserRank(){
		$.ajax({
			url:baseUrl + "user/rank/get",
			type:"POST",
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				console.log(data)
				if(data.code == 0){
					var result = data.result
					getPrice(result);
				}else if(data.code == -2){
					login();
				}
				
			}
		});
	}
	return function(){
		getUserRank();
        creatOredr();
	}		
}());

//确认订单
var confirmOrder = (function(){
    var id = getParams('orderId');
    function sendMsg(){
        $.ajax({
            url:baseUrl + "order/sms/get?orderId=" + id,
            type:"POST",
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                console.log(data);
                alert(data.result);
            }
        });
    }
    function payOredr(){
        $('.btn-submit').on('click',function(){
            $.ajax({
                url:baseUrl + "order/pay?orderId=" + id,
                type:"POST",
                xhrFields: {
                    withCredentials: true
                },
                success:function(data){
                    console.log(data)
                    if(data.code==0){
                        
                        //sendMsg();
                        window.location.href = 'ordersuccess.html?orderId=' + id;

                    }else{
                        alert(data.message);
                    }
                }
            });
        })
    };


    function getOrederInfo(){
        $.ajax({
            url:baseUrl + "order/get?id=" + id,
            type:"POST",
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                console.log(data.result)
                if(data.code==0){
                    var result = data.result[0];
                    $('.order-box .code').text(result.id);
                    $('.order-box .name').text(result.userName);
                    $('.order-box .num').text(result.amount);
                    $('.order-box .n_price').text(result.payment /result.discount * 100 / result.amount + ' * ' + result.amount + ' * ' + result.discount/100);
                    $('.order-box .total strong').text(result.payment);
                }else{
                    alert(data.message);
                }
            }
        });
    }

    function getPrice(rank){
        $.ajax({
            url:baseUrl + "activity/priceInfo/get?userId=" + CookieUtil.getSub('cookie','userId'),
            type:"POST",
            success:function(data){
                console.log(data)
                if(data.code == 0){
                    var result = data.result;
                    var discount = result.discount[rank];
                    var limit = result.limit[rank];
                    $('.order-box .rank').text(vipLevel(rank));
                    $('.order-box .sale').text(discount/100 + '折');
                    $('.order-box .o_price').text(result.price + '鑫仔点券');
                }else{
                    alert(data.message);
                }
            }
        });
    }
    function getUserRank(){
        $.ajax({
            url:baseUrl + "user/rank/get",
            type:"POST",
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                console.log(data)
                if(data.code == 0){
                    var result = data.result
                    getPrice(result);
                }
            }
        });
    }
	function lookSurplus(){
		$.ajax({
			url:baseUrl + "/user/coupon/get",
			type:"POST",
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				console.log(data.result)
				if(data.code==0){
					$('.lookSurplus').text(data.result); 
				}else{
					alert(data.message);
				}
			}
		});
    }
	
	
    return function(){
		lookSurplus();
        getOrederInfo();
        getUserRank();
        payOredr();
    }
}());


//下单成功
var successOrder = (function(){
    var id = getParams('orderId');

    function lookSurplus(){
        $('.btn-surplus').on('click',function(){
            $.ajax({
                url:baseUrl + "/user/coupon/get",
                type:"POST",
                xhrFields: {
                    withCredentials: true
                },
                success:function(data){
                    console.log(data.result)
                    if(data.code==0){
                        alert('您当前的点券余额为：' + data.result);
                    }else{
                        alert(data.message);
                    }
                }
            });
        })
    }


    function getOrder(){
        $.ajax({
            url:baseUrl + "order/get?id=" + id,
            type:"POST",
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                console.log(data)
                if(data.code==0){
                    var result = data.result[0];
                    $('.order_num').text(result.id);
                    //券码
                    if(result.ticketNums){
                        var ticketList = [];
                        $.each(JSON.parse(result.ticketNums),function(i,item){
                            ticketList.push(item);
                        })
                        $('.code').html(ticketList.join('<br>'));
                    }else{
                         $('.code').html('&nbsp');
                    }
                    $('.coupons').text(result.payment);
					$('.ticketTime').text(result.ticketExpTime);
                }else{
                    alert(data.message);
                }
            }
        });
    };
    return function(){
        getOrder();
        lookSurplus();
    }
}());



//获取电影详情
var getMoviesDetail = (function(){
	var result,id,pics = '',videos = '';
	
	function getData(){
		if(getParams('id')){
			id = getParams('id');	
		}else{
			window.location.href = 'index.html';
		}
		$.ajax({
			url:baseUrl + "activity/movie/get?id=" + id,
			type:"POST",
			success:function(data){
				console.log(data)
				if(data.code==0){
					result = data.result[0];
					var poster = JSON.parse(result.poster);
					var picture = JSON.parse(result.picture);
					var video = JSON.parse(result.video);
					var score = result.grade / 10;
					var offTime = result.offTime?result.offTime:'请以院线信息为准';
					var sumIncome = result.sumIncome;
					$('.movies-wrap .movies-view img').attr('src',poster[0]);
					$('.movies-wrap .m-name h1').text(result.name);
					$('.movies-wrap .m-name h2').text(result.subName);
					$('.movies-wrap .m-time').html(result.duration + '分钟&emsp;|&emsp;' + result.movieType + '<br>' + result.releaseTime + '<span class="icon_sketch">上映</span>&emsp;&emsp;|&emsp;&emsp;' + offTime + '<span class="icon_sketch">下映</span>');
					$('#moviesTime').html(result.duration + '分钟');
					$('#director').html(result.director);
					$('#location').html(result.location);
					$('#lang').html(result.lang);
					
					$('.movies-wrap .m-score strong').text(score);
					if(sumIncome){
						$('.movies-wrap .m-score-txt').show();
						$('.movies-wrap .m-score-txt h3').text((result.sumIncome/100) + '亿');
					}else{
						$('.movies-wrap .m-score-txt').hide();
						$('.movies-wrap .m-score-txt h3').text('');
					}
					$('.movies-wrap .m-rank').html(lightStar(score));
					//剧情简介
					$('.film-intro p').html(result.synopsis);
                    moviesPic(picture);
					moviesVideos(video)
				}else{
                    alert(data.message);
                }
			}
		});	
	}
    function moviesPic(img){
        $.each(img,function(i,_this){
			var imgObj = new Image();
			imgObj.src = _this[0];
			var newHeight = 0;
			imgObj.onload = function(){
				newHeight = imgObj.height * 210 / imgObj.width / 2;
				console.log(newHeight)
				pics += '<li><div class="movies-img"><img style="top:50%; margin-top:-' + newHeight + 'px" src="'+ _this[0] +'" /></div></li>';
				$('.film_pic_slides').find('ul').html(pics);
				$(".film_pic_slides").slide({
					mainCell:".bd ul",
					//autoPage:"<a href='javascript:void(0)'></a>",
					effect:"leftLoop",
					trigger:"click",
					prevCell:" .prev",
					nextCell:" .next",
					scroll:1,
					delayTime:300,
					vis:4
				});
			}
            
        })
        
    }
	function moviesVideos(arr){
        $.each(arr,function(i,_this){
            videos += '<li><div class="movies-img"><a href="javascript:void(0);" data-src="'+ _this.video +'"><img src="'+ _this.pic[0] +'" /></a></div></li>';
        })
        $('.film_video_slides').find('ul').html(videos);
        $(".film_video_slides").slide({
			mainCell:".bd ul",
			//autoPage:"<a href='javascript:void(0)'></a>",
			effect:"leftLoop",
			trigger:"click",
			prevCell:" .prev",
			nextCell:" .next",
			scroll:1,
			delayTime:300,
			vis:3
		});
		$(".film_video_slides a").on('click',function(){
			var src = $(this).attr('data-src');
			$.simpleDialog({
				skin: false,
				content: '#pop_video',
				id: 'pop_video'
			});
			$('#pop_iframe').attr('src',src);
		});
		$('#closeBtn').click(function() {
			$.simpleDialog.close('pop_video');
		});
    }

	return function(){
		getData();
	}
}());


var checkLoginStatus = (function(){
	return function(){
		$('.buy').on('click',function(){
			if(success){
				window.location.href = 'buy.html';
			}else{
				login();	
			}
		});
	}	
})()

