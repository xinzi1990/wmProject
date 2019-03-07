// JavaScript Document
$(function(){
	var url = window.location.search;
	console.log(CookieUtil.getSub('cookie','gameType'))
	if(url){
		$(".service_detail_left a").each(function(i){
			var _this = $(this);
			var src = _this.attr('data-src');
			if(src){
				var text = _this.text();
				setServiceNav(_this,text,src)
				if(src.indexOf(getParams('url')) !== -1){
					_this.trigger('click');
					
				}
			}
		})
	}
})


function setServiceNav(_this,text,src){
	_this.click(function(){
		$(".service_detail_left a").removeClass("on");
		_this.addClass("on");
		$('#service_detail span').text(text);
		
		$.get(src,function(data){
			$(".service_detail_right").html(data);
			if(src == 'service_bdzh.html'){
				$('.btn1').attr('href','http://cs.wanmei.com/getBackItem?gametype=' + CookieUtil.getSub('cookie','gameType'));
			}
			if(src == 'service_dkhjl.html'){
				$('#dkh').attr('href','http://cs.wanmei.com/managerApply?gametype=' + CookieUtil.getSub('cookie','gameType'));
			}
		});
	})
}