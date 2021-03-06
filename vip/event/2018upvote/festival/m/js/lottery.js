var lottery = {
    index: -1,    //当前转动到哪个位置，起点位置
    count: 0,     //总共有多少个位置
    timer: 0,     //setTimeout的ID，用clearTimeout清除
    speed: 20,    //初始转动速度
    times: 0,     //转动次数
    cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,    //中奖位置
    init: function(id) {
        if ($('#' + id).find('.lottery').length > 0) {
            $lottery = $('#' + id);
            $units = $lottery.find('.lottery');
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find('.lottery-item' + this.index).addClass('current');
        };
    },
    roll: function() {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find('.lottery-item' + index).removeClass('current');
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(lottery).find('.lottery-item' + index).addClass('current');
        this.index = index;
        return false;
    },
    stop: function(index) {
        this.prize = index;
        return false;
    }
};

function roll(stopIndex,callback) {
    lottery.times += 1;
    lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            //var index = Math.random() * (lottery.count) | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
            var index = stopIndex
            lottery.prize = index;      
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        };
        lottery.timer = setTimeout(roll, lottery.speed); //循环调用
    }
    if(callback){
        callback();
    }
    return false;
}

