var index = (function(){
    var indexLb = {
        t:null,
        n:0,
        count:$(".banner_box li").length,
        lbFn:function(){
            var _this = this;
            $(".banner_box li:not(:first-child)").hide();
            $("#banner_btn li").on('click',function(e) {
                e.stopPropagation();
                var i = $(this).text() - 1;
                _this.n = i;
                if (i >= _this.count) return;
                $(".banner_box li").stop().fadeOut().eq(i).fadeIn();
                $(this).addClass("on").siblings().removeClass("on");
            });
            _this.t = setInterval(function(){_this.showAuto();}, 4000);
            _this.bind();
        },
        showAuto:function(){
            var _this = this;
            _this.n = _this.n >=(_this.count - 1) ? 0 : ++_this.n;
            $("#banner_btn li").eq(_this.n).trigger('click');
        },
        bind:function(){
            var _this = this;
            $("#banner").on("mouseover mouseout",function(event){
                if(event.type == "mouseover"){clearInterval(_this.t)}else if(event.type == "mouseout"){_this.t = setInterval(function(){_this.showAuto();}, 4000);}
            })
        }
    }
    return {
        indexLb:indexLb
    }
})();

$(function(){
    index.indexLb.lbFn();
})