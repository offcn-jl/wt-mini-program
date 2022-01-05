Page({
  data: {
    suffix: {}, // 推广后缀
    suffixStr: '', // 推广后缀字符串
    openid: '', // 用户 openid
    phone: '', // 用户手机号码
    crmEventFormSID: '778ad90537b1d86da1589143a67c10cc', // crm 活动表单 id
    zkz: '', // 准考证
    sfindex: null,
    isshow: false,
    showModal: true,
    showModalcg: true,
    jiantoushow: true,
    countDownNum: 3,
    timer: '', //定时器
  },

  async onLoad(options) {
    this.setData(await getApp().methods.getSuffix(options)); // 获取后缀信息

    // 获取用户登状态
    getApp().methods.requsetWithCode({
      path: "/user/login/check",
      callback: res => res.errorMessage !== '用户未登录或登陆态已失效' && this.setData({ phone: res.data.phone, openid: res.data.openid })
    });
  },

  // 登陆
  // 调用公共函数进行登陆操作后，将公共函数返回的登陆信息保存到当前页面的上下文中
  getPhoneNumber: function (event) {
    getApp().methods.login({
      event, crmEventFormSID: this.data.crmEventFormSID, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr }, callback: ({ phone, openid }) => {
        this.setData({ phone, openid });
        this.yctc();
      }
    });
  },

  yctc(e) {
    wx.request({
      url: 'https://zg99.offcn.com/index/biaodan/register',
      data: {
        actid: 45571,
        phone: this.data.phone
      },
      success: () => {
        this.setData({
          showModalcg: false
        })
        this.countDown();
      }
    });
  },

  yctc1() {
    this.setData({
      showModalcg: false,
      showModal: true
    })
    getApp().methods.push2crm({ phone: this.data.phone, crmEventFormSID: this.data.crmEventFormSID, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr } });
    this.yctc();
  },

  close(e) {
    this.setData({
      showModalcg: true
    })
  },
//定时器
countDown: function () {
  let that = this;
  let countDownNum = 3; //获取倒计时初始值 
  that.setData({
    countDownNum: countDownNum
  })
  that.setData({
    timer: setInterval(function () {
      countDownNum--;
      that.setData({
        countDownNum: countDownNum
      })
      if (countDownNum == 0) {
        clearInterval(that.data.timer);
        //关闭定时器之后，可作其他处理     
        wx.navigateTo({
          url: '/pages/web-view/index?src=https://www.offcn.com/gjgwy/2021/1014/79118.html'
        })
      }
    }, 1000)

  })
},
  jumpad(e) {
    var that = this;
    that.setData({
      showModal: false
    });
  },

  zg_confirm(e) {
    this.setData({
      showModal: true
    })
  },

  jump(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://m.offcn.com/zg/allqq/'
    })
  },
  jumpcjcx(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://www.offcn.com/gjgwy/2021/1014/79118.html'
    })
  },
  jumpcjcx(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://www.offcn.com/gjgwy/2021/1014/79118.html'
    })
  },
  onShareAppMessage: function () {
    return {
      "title": "国考成绩查询",
      path: '/pages/gkcjcxtd/gkcjcxtd',
      imageUrl: 'images/zg_fenxiang.jpg'
    }
  },

  onShareTimeline: function () {
    return {
      "title": '国考成绩查询',
      path: '/pages/gkcjcxtd/gkcjcxtd',
    }
  },
})