# Chaos

[![代码扫描](https://github.com/offcn-jl/wt-mini-program/workflows/CodeQL/badge.svg)](https://github.com/offcn-jl/wt-mini-program/actions?query=workflow%3ACodeQL)
[![代码扫描-测试环境](https://github.com/offcn-jl/wt-mini-program/workflows/CodeQLCI/badge.svg)](https://github.com/offcn-jl/wt-mini-program/actions?query=workflow%3ACodeQLCI)

> 网推活动平台，代号 Chaos.  
> 取自希腊神话流传最为广泛的赫西俄德的《神谱》中的原始神祇名。  
> 天地未形，笼罩一切、充塞寰宇者，实为一相，今名之曰混沌。  
> 万物之先有混沌，以 Chaos 作为代号以期本项目遵循万物之理：从混沌到有序。

## 目录结构
```
├── components            # 公共组件 多个页面可能会用到的组件这个文件夹中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。
├── pages                 # 页面 存放实现具体业务的页面
├── utils                 # 公共工具
├── app.js                # 小程序逻辑
├── app.json              # 小程序公共配置
├── app.wxss              # 小程序公共样式表
├── config.js             # 小程序配置
├── handler.js            # 落地页 页面逻辑 用来辅助实现跨平台跳转小程序 ( 主要是扫码普通二维码打开小程序功能 )
├── handler.wxml          # 落地页 页面结构 用来辅助实现跨平台跳转小程序 ( 主要是扫码普通二维码打开小程序功能 )
├── project.config.json   # 项目配置文件
├── README.md             # 项目自述文件
└── sitemap.json          # sitemap ( 小程序内搜索 ) 配置
```

## 域名白名单
request合法域名:
```
https://appopenbg.offcn.com;https://bda.tencentcloudapi.com;https://dc.offcn.com:8443;https://fmu.tencentcloudapi.com;https://iai.tencentcloudapi.com;https://wt-backend.t.eoffcn.com;
```
> 用途：  
> https://appopenbg.offcn.com; ->> 综合活动平台 - 基础接口 - 生产环境  
> https://bda.tencentcloudapi.com; ->> 中公证件照功能 - 人像分割  
> https://dc.offcn.com:8443; ->> CRM - 推送数据  
> https://fmu.tencentcloudapi.com; ->> 中公证件照功能 - 人脸美颜  
> https://iai.tencentcloudapi.com; ->> 中公证件照功能 - 人脸检测与分析  
> https://wt-backend.t.eoffcn.com; ->> 综合活动平台 - 基础接口 - 测试环境  

downloadFile合法域名:
```
https://appopenoss.offcn.com;
```
> 用途：  
> https://appopenoss.offcn.com; ->> 简易助力活动 - 海报模板下载

web-view ( 业务域名 ) :
```
https://19.offcn.com
https://81jdwz.offcn.com
https://ah.jinrongren.net
https://ah.offcn.com
https://ah.zgjfks.com
https://bj-10353.ntalker.com
https://bj-kf10353.ntalker.com
https://bj.zgjfks.com
https://cq.offcn.com
https://cq.zgjfks.com
https://files.offcn.com
https://fj.offcn.com
https://fj.zgjfks.com
https://gd.offcn.com
https://gd.zgjfks.com
https://gs.offcn.com
https://gs.zgjfks.com
https://gx.yixue99.com
https://gx.zgjfks.com
https://gz.zgjfks.com
https://gzhd.offcn.com
https://hb.offcn.com
https://hb.zgjfks.com
https://he.offcn.com
https://he.zgjfks.com
https://hi.offcn.com
https://hi.zgjfks.com
https://hi.zgsydw.com
https://hlj.zgjfks.com
https://hn.offcn.com
https://hn.yixue99.com
https://hn.zgjfks.com
https://hu.offcn.com
https://hu.yixue99.com
https://hu.zgjfks.com
https://i.offcn.com
https://jl.offcn.com
https://jl.zgjfks.com
https://jl.zgsydw.com
https://js.offcn.com
https://js.yixue99.com
https://js.zgjfks.com
https://jx.offcn.com
https://jx.zgjfks.com
https://ln.jinrongren.net
https://ln.offcn.com
https://ln.zgjfks.com
https://lncx.offcn.com
https://m.fj.offcn.com
https://m.gd.offcn.com
https://m.gx.offcn.com
https://m.gz.offcn.com
https://m.hb.offcn.com
https://m.he.offcn.com
https://m.hi.offcn.com
https://m.hn.offcn.com
https://m.hu.offcn.com
https://m.jl.offcn.com
https://m.js.offcn.com
https://m.ln.offcn.com
https://m.offcn.com
https://m.qh.offcn.com
https://m.sa.offcn.com
https://m.sc.offcn.com
https://m.sh.offcn.com
https://m.sx.offcn.com
https://m.tj.offcn.com
https://m.yixue99.com
https://m.zgjfks.com
https://m.zgxds.cn
https://m.zj.offcn.com
https://mah.jinrongren.net
https://mah.zgjfks.com
https://mbj.zgjfks.com
https://mcq.zgjfks.com
https://mfj.zgjfks.com
https://mgd.zgjfks.com
https://mgs.zgjfks.com
https://mgx.zgjfks.com
https://mgz.zgjfks.com
https://mhb.zgjfks.com
https://mhe.zgjfks.com
https://mhi.zgjfks.com
https://mhlj.zgjfks.com
https://mhn.yixue99.com
https://mhn.zgjfks.com
https://mhu.yixue99.com
https://mhu.zgjfks.com
https://mjl.yixue99.com
https://mjl.zgjfks.com
https://mjs.yixue99.com
https://mjs.zgjfks.com
https://mjx.zgjfks.com
https://mln.jinrongren.net
https://mln.zgjfks.com
https://mnm.zgjfks.com
https://mqh.zgjfks.com
https://msa.zgjfks.com
https://msc.yixue99.com
https://msc.zgjfks.com
https://msd.zgjfks.com
https://msh.zgjfks.com
https://msx.zgjfks.com
https://mtj.zgjfks.com
https://myn.zgjfks.com
https://mzj.zgjfks.com
https://nm.offcn.com
https://nm.zgjfks.com
https://nx.offcn.com
https://offcn.sobot.com
https://qh.offcn.com
https://qh.zgjfks.com
https://sa.offcn.com
https://sa.rebeta.cn
https://sa.zgjfks.com
https://sc.offcn.com
https://sc.yixue99.com
https://sc.zgjfks.com
https://sd.offcn.com
https://sd.zgjfks.com
https://sh.offcn.com
https://sh.zgjfks.com
https://sx.offcn.com
https://sx.zgjfks.com
https://sxhd.offcn.com
https://tj.offcn.com
https://tj.zgjfks.com
https://www.offcn.com
https://www.zggcks.com
https://www.zgjfks.com
https://www.zgxds.cn
https://yn.offcn.com
https://yn.yixue99.com
https://yn.zgjfks.com
https://zgjsks.com
https://zj.offcn.com
https://zj.zgjfks.com
```