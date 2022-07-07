# subscribe-convert
#### 基于 uniapp + uview-ui 的订阅转换前端服务

##### 参考了原 vue+element-ui 的 sub-convert 项目，[项目地址](https://github.com/CareyWang/sub-web)。

在原项目的基础上修改了：

- 更好的手机端支持（原项目对手机的支持不太好，虽然也不是不能用就是了）
- 默认添加了客户端列表文件，如需修改，打开项目下`data/appList.json`文件，更改相应内容即可
- 默认添加了远端配置文件，如需修改，打开项目下`data/remoteConfig.json`文件，更改相应内容即可

项目订阅 url 转换功能全部纯前端实现，开源版本不提供后端服务，请自行搭建。如需前后端搭建教程请前往[博客](https://blog.v2jun.com)查看.

ps：博客服务器在香港，如果访问效果不佳可尝试切换网络。



本项目已搭建服务：[订阅转换](https://convert.v2jun.com/convert-web/#/)，仅提供基础转换服务，如有隐私担心请勿使用。



###### 使用：

1、clone 项目到本地，或者下载zip压缩包到本地

2、自行修改内容

ps：如需修改默认后端地址，在项目下`pages/index/index.vue`文件`140`行，默认是`http://127.0.0.1:8000`

3、使用 uniapp 官方推荐编辑器 HbuilderX 发行项目，发行为 网站 即可。