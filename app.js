// app.js
App({
  onLaunch() { },

  // 全局数据
  globalData: {
    config: {
      ...require("./config")
    }
  },

  // 全局方法
  methods: {
    /**
     * handleError 处理错误
     * @param {Object} err 错误内容
     * @param {String} [ title = "出错啦" ] 标题
     * @param {String} [ content = "请您稍候再试～" ] 提示语
     * @param {String} [ confirmText = "我知道了" ] 确认按钮文字
     * @param {Boolean} [ reLaunch = false ] 是否重启
     */
    handleError({ err, title = "出错啦", content = "请您稍候再试～", confirmText = "我知道了", reLaunch = false } = {}) {
      // 打印错误到控制台
      console.error(err)
      // 震动反馈
      wx.vibrateLong()
      // 弹出弹窗
      wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        showCancel: false,
        success() {
          if (reLaunch) {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        }
      })
    },

    /**
     * requsetWithCode 公共函数 携带用户 code 发起请求
     * 通常用于需要验证用户身份的接口
     * @param {*} path 请求路径
     * @param {*} method 请求方法
     * @param {*} data 请求要提交的数据 按照 method 自动适应
     * @param {*} queryData 请求 method = post 时, 需额外附加的 query data, 将会自动拼接到 query string 中
     * @param {*} callback 回调函数
     */
    requsetWithCode: ({ path, method = 'GET', data, queryData, callback }) => {
      // 将 queryData 对象转换为 queryString
      let queryString = '';
      if (queryData) {
        for (let key in queryData) {
          queryString += `&${key}=${queryData[key]}`
        }
      }

      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.showLoading({ title: '请稍候...', mask: true })
            wx.request({
              url: `${getApp().globalData.config.apis.base}${path}${path.indexOf('?') === -1 ? '?' : '&'}appid=${getApp().globalData.config.appid}&code=${res.code}${queryString}`,
              method: method,
              data: data,
              success: res => {
                wx.hideLoading(); // 隐藏 loading
                if (res.statusCode !== 200 || !res.data.success) {
                  getApp().methods.handleError({ err: res, title: "出错啦", content: res.data.errorMessage ? res.data.errorMessage : `发送请求失败，状态码：${res.statusCode}` });
                } else {
                  // 调用回调函数, 返回响应内容
                  callback && callback(res.data);
                }
              },
              fail: err => {
                wx.hideLoading() // 隐藏 loading
                getApp().methods.handleError({ err: err, title: "出错啦", content: '发送请求失败' })
              }
            })
          } else {
            // 将返回的报错输出到错误提示
            getApp().methods.handleError({ err: res, title: "登陆失败", content: res.errMsg })
          }
        }
      })
    },

    /**
     * getSuffix 获取后缀信息
     */
    async getSuffix(options) {
      // options.misid = 3118 // 测试参数
      // options.scode = "rtFbZ" // 测试参数
      // options.owner = 32 // 测试参数

      // 根据入参创建推广后缀对象
      let suffix = {};
      if (options.owner) suffix.owner = options.owner
      if (options.channel) suffix.channel = options.channel
      if (options.orgn) suffix.orgn = options.orgn
      if (options.erp) suffix.erp = options.erp
      if (options.erp) suffix.erpcity = options.erp
      if (options.c2) suffix.c2 = options.c2
      if (options.scode) suffix.scode = options.scode
      if (options.misid) suffix.misid = options.misid
      // 生成推广后缀字符串
      let suffixStr = '';
      for (let key in suffix) {
        suffixStr += `${key}=${suffix[key]}&`;
      }
      suffixStr = suffixStr.substr(0, suffixStr.length - 1); // 裁剪最后一个 &

      // 校验并补全后缀信息
      if (suffixStr !== '') {
        // 发起网络请求
        function check() {
          return new Promise(resolve => {
            wx.showLoading({ title: '请稍候...', mask: true })
            wx.request({
              url: `${getApp().globalData.config.apis.base.replace('wechat/mini-program', '')}/suffix/check`,
              data: suffix,
              success: res => {
                wx.hideLoading(); // 隐藏 loading
                if (res.statusCode !== 200 || !res.data.success) {
                  getApp().methods.handleError({ err: res, title: "出错啦", content: res.data.errorMessage ? res.data.errorMessage : `发送请求失败，状态码：${res.statusCode}` });
                  resolve(false)
                } else {
                  // 调用回调函数, 返回响应内容
                  resolve(res.data.data)
                }
              },
              fail: err => {
                wx.hideLoading() // 隐藏 loading
                getApp().methods.handleError({ err: err, title: "出错啦", content: '发送请求失败' })
                resolve(false)
              }
            })
          })
        }

        const suffixInfo = await check();
        if (suffixInfo) {
          if (suffixInfo.Erp) suffix.erp = suffixInfo.Erp;
          if (suffixInfo.Erp) suffix.erpcity = suffixInfo.Erp;
          if (suffixInfo.MisId) suffix.misid = suffixInfo.MisId;
          if (suffixInfo.Organization) suffix.orgn = suffixInfo.Organization;
          if (suffixInfo.Owner) suffix.owner = suffixInfo.Owner;
          if (suffixInfo.SCode) suffix.scode = suffixInfo.SCode;
          suffixStr = '';
          for (let key in suffix) {
            suffixStr += `${key}=${suffix[key]}&`;
          }
          suffixStr = suffixStr.substr(0, suffixStr.length - 1); // 裁剪最后一个 &
        }
      }

      // 保存推广后缀信息
      return { suffix, suffixStr };
    },

    // push2crm 推送数据到 crm
    push2crm({ phone, crmEventFormSID, suffix, remark }) {
      if (phone && crmEventFormSID) {
        // 推送数据
        wx.request({ url: `https://dc.offcn.com:8443/a.gif?mobile=${phone}&sid=${crmEventFormSID}${remark ? `&remark=${remark}` : ''}`, data: suffix && suffix.suffix ? suffix.suffix : {} })
        // 记录推送日志
        wx.request({ url: `${getApp().globalData.config.apis.base.replace('/wechat/mini-program', '')}/crm/push/log?mobile=${phone}&sid=${crmEventFormSID}${remark ? `&remark=${remark}` : ''}`, data: suffix && suffix.suffix ? suffix.suffix : {} })
      }
    },

    /**
     * loginCheck 公共函数 检查登陆状态
     * @param {*} crmEventFormSID CRM 活动表单 SID
     * @param {*} suffix 后缀信息
     * @param {*} remark 备注
     * @param {*} callback 回调函数
     */
    loginCheck({ crmEventFormSID, suffix, remark, callback }) {
      getApp().methods.requsetWithCode({
        path: "/user/login/check",
        // 推送 crm 并返回数据
        callback: res => res.errorMessage !== '用户未登录或登陆态已失效' && (getApp().methods.push2crm({ phone: res.data.phone, crmEventFormSID, suffix, remark }) || (callback && callback({ phone: res.data.phone, openid: res.data.openid })))
      });
    },

    /**
     * login 公共函数 登陆
     * @param {*} event 按钮点击事件
     * @param {*} crmEventFormSID CRM 活动表单 SID
     * @param {*} suffix 后缀信息
     * @param {*} remark 备注
     * @param {*} callback 回调函数
     */
    login({ event, crmEventFormSID, suffix, remark, callback }) {
      // 判断是否授权使用手机号
      if (event.detail.errMsg !== 'getPhoneNumber:ok') {
        getApp().methods.handleError({ err: event.detail.errMsg, title: "出错啦", content: "本功能需要您授权登陆后方可使用" })
        return
      }

      getApp().methods.requsetWithCode({
        path: "/user/login",
        method: "POST",
        data: { encryptedData: event.detail.encryptedData, iv: event.detail.iv },
        // 推送 crm 并返回数据
        callback: res => getApp().methods.push2crm({ phone: res.data.phone, crmEventFormSID, suffix, remark }) || (callback && callback({ phone: res.data.phone, openid: res.data.openid }))
      });
    },

    /**
     * 获取腾讯云签名
     * @param {*} host 服务域名
     * @param {*} payload 请求内容
     * @param {*} callback 回调函数
     */
    getTencentCloudSign(host, payload, callback) {
      getApp().methods.requsetWithCode({
        path: "/tencent-cloud/sign",
        data: { host, hashedRequestPayload: require('utils/sha256').sha256_digest(payload) },
        // 推送 crm 并返回数据
        callback: res => {
          if (!res.success) {
            wx.hideLoading(); // 隐藏 loading
            getApp().methods.handleError({ err: res, title: "出错啦", content: res.errorMessage ? res.errorMessage : '获取签名失败，请稍后再试', reLaunch: true })
          } else {
            // 调用回调函数, 返回签名信息
            callback && callback({ authorizeToOpenid: res.data.authorizeToOpenid, timestamp: res.data.timestamp, authorization: res.data.authorization });
          }
        }
      });
    },
  },
})
