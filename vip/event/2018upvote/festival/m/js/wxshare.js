wx.ready(function(){
            wx.onMenuShareAppMessage({
              title: 'VIP会员福利 邀您闹元宵',
              desc: '',
              link: window.location.href,
              imgUrl: 'http://vip.wanmei.com/event/2018upvote/festival/m/images/thumb.jpg',
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
              },
              success: function (res) {
                //window.location.href = "http://t.cn/RZmX3L7" ;
              },
              cancel: function (res) {
                //alert('已取消');
              },
              fail: function (res) {
                //alert(JSON.stringify(res));
              }
            });

            wx.onMenuShareTimeline({
              title: 'VIP会员福利 邀您闹元宵',
              link: window.location.href,
              imgUrl: 'http://vip.wanmei.com/event/2018upvote/festival/m/images/thumb.jpg',
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
              },
              success: function (res) {
                //window.location.href = "http://t.cn/RZmX3L7" ;
              },
              cancel: function (res) {
                //alert('已取消');
              },
              fail: function (res) {
                //alert(JSON.stringify(res));
              }
            });
        });