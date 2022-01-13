// pages/wb/index.js

// NOTE: 这里的域名请于管理后台-小程序设置-配置域名中配置的域名保持一致
const baseHost = "https://ybgiifcyhb.miniapp.weibanzhushou.com"
const baseWebViewUrl = `${baseHost}/H5/external_links_wx`

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getApp().methods.requsetWithCode({
            path: "/union-id",
            callback: res => {
                // 获取用户 login 后的 unionId
                const unionId = res.data;

                // 微伴会在通过小程序 urlscheme.generate 接口生成 scheme 码
                // 时，将参数 c 和 hash_id 配置在 jump_wxa.query 中。
                // externalLink 页面载入时，会被微信自动加入到页面参数中。
                // 具体逻辑可查阅：https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-scheme/urlscheme.generate.html
                const { c, hash_id, debug } = options

                // 不建议对以下 webViewUrl 的拼接代码进行修改，以免遗漏参数
                const webViewUrl = `${baseWebViewUrl}?hash_id=${hash_id || ''}&_c=${c || ''}&unionId=${unionId}`

                if (!unionId && debug) {
                    wx.showModal({
                        title: '提示',
                        content: '参数错误：缺少 unionId',
                    })
                }

                if (debug) {
                    wx.showModal({
                        title: 'For debug',
                        content: webViewUrl
                    })
                }


                // 参数 c 和 hash_id 用于公司和引流链接配置的匹配
                // 参数 unionId 用于引流链接的访问数据统计
                this.setData({ webViewUrl })
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

    }
})