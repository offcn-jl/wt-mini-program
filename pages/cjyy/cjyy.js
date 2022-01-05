Page({
  data: {
    suffix: {}, // 推广后缀
    suffixStr: '', // 推广后缀字符串

    openid: '', // 用户 openid
    phone: '', // 用户手机号码

    crmEventFormSID: '525a93a9898decc9447f207778abdb85', // crm 活动表单 id

    zkz: '', // 准考证

    content: "请选择您的报考地区",
    sfindex: null,
    isshow: false,
    showModal: true,
    showModalcg: true,
    jiantoushow: true,
    sflist: ['安徽', '北京', '重庆', '福建', '广东', '广西', '贵州', '甘肃', '黑龙江', '河南', '河北', '湖北', '湖南', '海南', '江苏', '江西', '吉林', '辽宁', '内蒙古', '宁夏', '青海', '山东', '上海', '陕西', '山西', '四川', '天津', '新疆', '西藏', '云南', '浙江'],
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

  bindPickerChange: function (e) {
    this.setData({
      sfindex: e.detail.value
    })

    if (this.data.content == "请选择您的报考地区") {
      this.setData({
        jiantoushow: false,
        content: ""
      })
    } else {
      if (this.data.zkz != "" && this.data.zkz.length > 10) {
        this.setData({
          isshow: true,
        })
      }
    }
  },

  yctc(e) {
    wx.request({
      url: 'https://zg99.offcn.com/index/biaodan/register',
      data: {
        actid: 44475,
        phone: this.data.phone,
        shengfen: this.data.sflist[this.data.sfindex],
        zkz: this.data.zkz
      },
      success: () => {
        this.setData({
          showModalcg: false
        })
      }
    });
  },

  yctc1() {
    getApp().methods.push2crm({ phone: this.data.phone, crmEventFormSID: this.data.crmEventFormSID, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr } });
    this.yctc();
  },

  close(e) {
    this.setData({
      showModalcg: true
    })
  },

  getInputValue(e) {
    this.setData({zkz: e.detail.value})
    if(e.detail.value != "" && e.detail.value.length > 10 &&  this.data.sfindex){
      this.setData({
         isshow: true,
      })
    }
  },

  jumpad(e) {
    var that = this;
    that.setData({
      showModal: false
    });
    setTimeout(function () {
      that.setData({
        showModal: true
      })
    }, 3000);
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

  onShareAppMessage: function () {
    return {
      "title": "2022国家公务员考试成绩预约",
      path: '/pages/cjyy/cjyy',
      imageUrl: 'images/zg_fenxiang.jpg'
    }
  },

  onShareTimeline: function () {
    return {
      "title": '2022国家公务员考试成绩预约',
      path: '/pages/cjyy/cjyy',
    }
  },
})