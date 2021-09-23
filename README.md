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
https://appopenbg.offcn.com;https://bda.tencentcloudapi.com;https://fmu.tencentcloudapi.com;https://iai.tencentcloudapi.com;https://wt-backend.t.eoffcn.com;
```
> 用途：  
> https://appopenbg.offcn.com; ->> 综合活动平台 - 基础接口 - 生产环境  
> https://bda.tencentcloudapi.com; ->> 中公证件照功能 - 人像分割  
> https://fmu.tencentcloudapi.com; ->> 中公证件照功能 - 人脸美颜  
> https://iai.tencentcloudapi.com; ->> 中公证件照功能 - 人脸检测与分析  
> https://wt-backend.t.eoffcn.com; ->> 综合活动平台 - 基础接口 - 测试环境  

downloadFile合法域名:
```
https://appopenoss.offcn.com;
```
> 用途：  
> https://appopenoss.offcn.com; ->> 简易助力活动 - 海报模板下载
