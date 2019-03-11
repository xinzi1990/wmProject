//预加载
var LoadImage = function(obj){
    this.newimages = [];
    this.count = 0;
    this.arr = (typeof obj.imgs!="object")? [obj.imgs] : obj.imgs;
    this.len =this.arr.length;
    this.per=(1/this.len);
    this.loading = obj.loading;
    this.done = obj.done;
    this.Run();
};
LoadImage.prototype.imageloadpost = function() {
    var self = this,num=null;
    self.count++;
    num = self.count*self.per;
    num = parseInt(num*100);
    self.loading(num);
    if (self.count==self.len){
        self.loading(100);
        setTimeout(function(){self.done()},500);
    }
};
LoadImage.prototype.Run = function() {
    var self = this;
    for (var i=0; i<self.arr.length; i++){
        self.newimages[i]=new Image();
        self.newimages[i].src=self.arr[i];
        self.newimages[i].onload=function(){
            self.imageloadpost();
        }
        self.newimages[i].onerror=function(){
            self.imageloadpost();
        }
    }
};


var PCLoadImage = new LoadImage({
    /*imgs: ['http://event51.wanmei.com/zhuxian/201512/boss/images/left.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/left0.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/right.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/right0.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/right1.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/get_prize.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_win_1.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_over_1.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_over_0.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_over_2.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_win_2.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_scene.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/startgame_img2.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/game_begin.jpg'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/startgame_img1.png'
            ,'http://event51.wanmei.com/zhuxian/201512/boss/images/loading_bg.jpg'
        ],*/
    loading: LoadingGame,
    done:  function(){
		$('#loading').hide();
		$('#startGame').show();
	}
});

function LoadingGame(numL){
	$("#loadNumber").html(Math.ceil(numL)+"%");
	$('#loadPlay').css({width: numL + '%'});
	/*$('.circle').each(function(index, el) {
		var num = numL * 3.6;
		if (num<=180) {
			$(this).find('.right').css('transform', "rotate(" + num + "deg)");
		} else {
			$(this).find('.right').css('transform', "rotate(180deg)");
			$(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
		};
	});*/
}
