// JavaScript Document

$(function(){
	var getType = getParams('type') ? getParams('type'):0;
	$('.game_nav li:not(.important_notice)').on('click',function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.game_list').hide().eq(index).show();
	}).eq(getType).trigger('click');
})