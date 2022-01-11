Page({
  data: {
    suffix: {}, // 推广后缀
    suffixStr: '', // 推广后缀字符串
    openid: '', // 用户 openid
    phone: '', // 用户手机号码
    crmEventFormSID: '702ef7a97ab0cf8b963a799fa91af2ea', // crm 活动表单 id
    showModalcg:false,
    contents:'https://www.sifalu.com/uploadfile/2022/0110/20220110041005676.zip',
    showModal: true,
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
        actid: 45708,
        phone: this.data.phone
      },
      success: () => {
        this.setData({
          showModalcg:true
        })
      }
    });
  },

  yctc1() {
    this.setData({
      showModalcg:true
    })
    getApp().methods.push2crm({ phone: this.data.phone, crmEventFormSID: this.data.crmEventFormSID, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr } });
    this.yctc();
  },

  qd1(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/报名登记表（官方）.pdf'
    })
  },
  qd2(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/放弃面试资格声明（参考样式）.pdf'
    })
  },
  qd3(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/报名推荐表（官方）.pdf'
    })
  },
  qd4(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/基层工作经历证明（参考样式）.pdf'
    })
  },
  qd5(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/待业证明（参考样式）.pdf'
    })
  },
  qd6(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/离职证明（参考样式）.pdf'
    })
  },
  qd7(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/面试考生情况表（参考样式）.pdf'
    })
  },
  qd8(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/面试考生情况表（参考样式）.pdf'
    })
  },
  qd9(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/团员证明（参考样式）.pdf'
    })
  },
  qd10(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://dl.offcn.com/aa/offcn/同意报考证明（参考样式）.pdf'
    })
  },
  copyText: function (e) {
    this.setData({
      showModal:true
    })
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.hideToast();
        wx.getClipboardData({
          success: function (res) {
            wx.showModal({  
              title: '复制成功！', 
              showCancel: false, 
              confirmText: "知道了", 
              content: '请用手机浏览器打开进行资料下载' 
          })  
          }
        })
      }
    })
  },
  jump(e) {
    wx.navigateTo({
      url: '/pages/web-view/index?src=https://m.offcn.com/zg/allqq/'
    })
  },
  showup(){
    this.setData({
      showModal:false
    })
  },
  showqx(){
    this.setData({
      showModal:true
    })
  },
  onShareAppMessage: function () {
    return {
      "title": "2022国考资格复审材料清单",
      path: '/pages/gkzgfs/gkzgfs',
      imageUrl: 'images/zg_fenxiang.jpg'
    }
  },

  onShareTimeline: function () {
    return {
      "title": '2022国考资格复审材料清单',
      path: '/pages/gkzgfs/gkzgfs',
    }
  },
})