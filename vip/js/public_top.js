;(function($) {
    var topMenu = '<div class="muen_box">\
			<ul>\
				<li data-keywords="index"><a href="http://vip.wanmei.com/index.html">首页</a></li>\
				<li data-keywords="activitylist"><a href="http://vip.wanmei.com/activitylist.html">游戏特权</a></li>\
				<li data-keywords="service"><a href="http://vip.wanmei.com/service.html">服务特权</a></li>\
				<li data-keywords="news"><a href="http://vip.wanmei.com/news/index.html">新闻</a></li>\
				<li data-keywords="sh"><a href="http://vip.wanmei.com/life/index.html">生活特权</a></li>\
				<li data-keywords="unvip"><a href="http://vip.wanmei.com/unvip.html">VIP体系介绍</a></li>\
			</ul>\
			<div class="logo">\
				<a href="http://vip.wanmei.com/" target="_blank">鑫仔VIP</a>\
				<span></span>\
			</div>\
		</div>';
    var div = document.createElement('div');
    div.className = 'muen';
    div.innerHTML = topMenu;
	var b = document.getElementsByTagName('body')[0];
	var f = b.firstChild;
	b.insertBefore(div, f);
	var url = window.location.href;
	/*var $li = $('.muen_box li');
	for(var j=0;j < $li.size();j++){
		var keywords = $li.eq(j).attr('data-keywords');
		if(url.indexOf(keywords) !== -1){
			$li.eq(j).addClass('on');
		}
	}*/
})(jQuery);