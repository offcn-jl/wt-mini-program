// pages/announcement/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        suffix: {}, // 推广后缀
        suffixStr: '', // 推广后缀字符串

        openid: '', // 用户 openid
        phone: '', // 用户手机号码

        config: {}, // 配置

        actionSheet: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // options.id = '14' // 测试
        if (typeof options.id !== 'string') {
            getApp().methods.handleError({ err: options, title: "出错啦", content: "缺少 id 参数", reLaunch: true });
            return;
        }
        this.setData(await getApp().methods.getSuffix(options)); // 获取后缀信息

        // 获取配置详情
        wx.showLoading({ title: '获取详情', mask: true })
        wx.request({
            url: `${getApp().globalData.config.apis.base}/announcement/config/info/${options.id}`,
            data: { appid: getApp().globalData.config.appid },
            success: res => {
                wx.hideLoading(); // 隐藏 loading
                if (res.statusCode !== 200 || !res.data.success) {
                    getApp().methods.handleError({ err: res, title: "出错啦", content: res.data.errorMessage ? res.data.errorMessage : '获取配置详情失败，请稍后再试', reLaunch: true })
                } else {
                    this.setData({ config: { ...res.data.data, id: options.id } });
                    // 判断是否是单页模式
                    if (wx.getLaunchOptionsSync().scene !== 1154) {
                        // 不是单页模式，进行登陆操作
                        // 获取登陆状态
                        getApp().methods.loginCheck({ crmEventFormSID: res.data.data.crmEventFormSid, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr }, remark: `活动表单ID:${res.data.data.crmEventFormSid};简易助力活动;${res.data.data.name};${options.id};`, callback: ({ phone, openid }) => this.setData({ phone, openid }) });
                    }
                }
            },
            fail: err => {
                wx.hideLoading() // 隐藏 loading
                getApp().methods.handleError({ err: err, title: "出错啦", content: '获取配置详情失败，请稍后再试', reLaunch: true })
            }
        });
    },

    /**
    * 监听页面滚动
    * 用于 显示 header / 隐藏 header
    */
    onPageScroll: function (e) { this.selectComponent('#header').setData({ scrollTop: e.scrollTop }) },

    // 跳转到广告
    goAdvertising: function () {
        switch (this.data.config.advertisementConfig.type) {
            case 'webview':
                // 跳转网页
                wx.navigateTo({ url: `/pages/web-view/index?src=${this.data.config.advertisementConfig.link}${this.data.suffixStr ? this.data.config.advertisementConfig.link.indexOf('?') === -1 ? `?${this.data.suffixStr}` : `&${this.data.suffixStr}` : ''}` });
                break;
            case 'mini-program-self':
                // 跳转小程序（ 本小程序内 ）
                wx.navigateTo({ url: `${this.data.config.advertisementConfig.path.substr(0, 1) !== '/' ? '/' : ''}${this.data.config.advertisementConfig.path}${this.data.suffixStr ? this.data.config.advertisementConfig.path.indexOf('?') === -1 ? `?${this.data.suffixStr}` : `&${this.data.suffixStr}` : ''}` });
                break;
            case 'mini-program':
                // 跳转小程序（ 其他小程序 ）
                wx.navigateToMiniProgram({ appId: this.data.config.advertisementConfig.appid, path: `${this.data.config.advertisementConfig.path}${this.data.suffixStr ? this.data.config.advertisementConfig.path.indexOf('?') === -1 ? `?${this.data.suffixStr}` : `&${this.data.suffixStr}` : ''}` });
                break;
            default:
                wx.showToast({ title: '活动配置有误', icon: 'error' });
        }
    },

    // 登陆后跳转到广告
    goAdvertisingAfterLogin: function (event) {
        getApp().methods.login({
            event, crmEventFormSID: this.data.config.crmEventFormSid, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr }, remark: `活动表单ID:${this.data.config.crmEventFormSid};加推;${this.data.config.name};${this.data.config.id};`, callback: ({ phone, openid }) => {
                this.setData({ phone, openid });
                this.goAdvertising();
            }
        });
    },

    // 查看原文
    view: function () {
        wx.navigateTo({ url: `/pages/web-view/index?src=${this.data.config.originalLink}${this.data.suffixStr ? this.data.config.advertisementConfig.link.indexOf('?') === -1 ? `?${this.data.suffixStr}` : `&${this.data.suffixStr}` : ''}` });
    },

    // 登陆后查看原文
    goViewAfterLogin: function (event) {
        getApp().methods.login({
            event, crmEventFormSID: this.data.config.crmEventFormSid, suffix: { suffix: this.data.suffix, suffixStr: this.data.suffixStr }, remark: `活动表单ID:${this.data.config.crmEventFormSid};加推;${this.data.config.name};${this.data.config.id};`, callback: ({ phone, openid }) => {
                this.setData({ phone, openid });
                this.view();
            }
        });
    },

    // 转发
    // 弹出转发菜单
    showActionSheet: function () {
        this.setData({ actionSheet: true });
    },

    // 转发
    // 隐藏转发菜单
    hideActionSheet: function () {
        this.setData({ actionSheet: false });
    },

    // 生成海报
    makePoster: async function () {
        const _this = this;
        const context = wx.createCanvasContext('mycanvas');
        wx.showLoading({ title: '正在生成' })

        // 下载海报背景
        wx.getImageInfo({
            src: 'https://appopenoss.offcn.com/prod/mini-program/announcement/poster-background.jpg',
            success: function (res) {
                // 绘制海报背景
                context.drawImage(res.path, 0, 0, res.width, res.height);
                // 下载公告预览
                wx.getImageInfo({
                    src: _this.data.config.previewImage,
                    success: function (res) {
                        // 裁剪并绘制公告预览
                        context.drawImage(res.path, 0, 0, res.width, res.height * (900 / 1380), 94, 172, 900, 1380)
                        // 生成小程序码
                        const drawQrcode = require('../../utils/weapp.qrcode.min.js');
                        drawQrcode({
                            x: 420,
                            y: 1600,
                            width: 230,
                            height: 230,
                            ctx: context,
                            text: `https://appopen.offcn.com/wechat/mini-program/handler/?appid=${getApp().globalData.config.appid}&username=${getApp().globalData.config.username}&path=pages/announcement/index&id=${_this.data.config.id}${_this.data.suffixStr ? `&${_this.data.suffixStr}` : ''}`,
                            callback: () => {
                                // 讲 cavas 保存到 临时文件
                                wx.canvasToTempFilePath({
                                    canvasId: 'mycanvas',
                                    success: function (res) {
                                        // 关闭操作框和 loading
                                        _this.setData({ actionSheet: false });
                                        wx.hideLoading();
                                        // 弹出分享图片窗口
                                        wx.showShareImageMenu({ path: res.tempFilePath });
                                    },
                                    fail: err => {
                                        wx.hideLoading(); // 隐藏 loading
                                        getApp().methods.handleError({ err: err, title: "出错啦", content: '生成海报失败，请稍后再试' });
                                    }
                                });
                            }
                        });
                    },
                    fail: err => {
                        wx.hideLoading(); // 隐藏 loading
                        getApp().methods.handleError({ err: err, title: "出错啦", content: '生成海报失败，请稍后再试' });
                    }
                });
            },
            fail: err => {
                wx.hideLoading(); // 隐藏 loading
                getApp().methods.handleError({ err: err, title: "出错啦", content: '生成海报失败，请稍后再试' });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.config.shareContent,
            imageUrl: this.data.config.shareImage,
        }
    },

    /**
     * 用户点击右上角分享 分享到朋友圈
     */
    onShareTimeline: function () {
        return {
            title: this.data.config.shareContent,
        }
    }
})