// 获取运行环境
// envVersion 在低版本的基础库中不兼容
// 兼容的最低版本是 2.10.0
// 综合用户占比等情况, 本项目选择 2.10.4 作为基础库最低版本设置
// 不过为了避免踩坑, 还是在此处做了 envVersion 是否存在的判断, 如果 envVersion 不存在则默认为 release
const environment = wx.getAccountInfoSync().miniProgram.envVersion ? wx.getAccountInfoSync().miniProgram.envVersion : "release"

// 小程序配置
module.exports = {
  // 本小程序的 AppID
  appid: 'wxb04ce8efcd61db65',
  // 本小程序的 原始ID
  username: 'gh_05b6c951247a',
  // 运行环境
  environment,
  // 接口路径
  apis: environment === "release" ? {
    // 生产环境
    base: "https://appopenbg.offcn.com/apis/wechat/mini-program",
  } : {
    // 测试环境
    // base: "http://localhost:8080/apis/wechat/mini-program",
    base: "https://wt-backend.t.eoffcn.com/apis/wechat/mini-program",
  },
}