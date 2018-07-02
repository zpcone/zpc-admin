###后台人员学习搭建

## 学习人员需具备的技能 vue2.0 elementUI

1. vue文档地址 [vue2.0]:https://cn.vuejs.org/v2/guide/index.html
2. elementUI [elementUI]:http://element-cn.eleme.io/#/zh-CN/component/installation 
3. vueX [VUEX]:https://vuex.vuejs.org/zh-cn/intro.html
4. axios [axiox]:https://www.kancloud.cn/yunye/axios/234845

```
# Clone project
git clone git@192.168.3.249:zhangxiucan/engine.git

# Install dependencies
npm install


# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


```


## 目录结构以及说明
```
-vueAdmin-template    	项目文件夹
|--node_modules			项目依赖包
|--bulid				构建文件
|		|--bulid.js     			构建文件
|		|--check-version.js			检查版本	
|		|--utils.js					
|		|--vue-loader.conf.js				loader
|		|--webpack.base.conf.js				webpack基本配置
|		|--webpack.dev.conf.js				webpack开发环境配置
|		|--webpack.prod.conf.js				webpack生产环境配置
|--config
|		|--dev.env.js						环境配置 ENV -> development 以及接口的BASE_URL
|		|--index.js							配置的入口文件，端口号等
|		|--prod.env.js						环境配置 ENV -> production 以及接口的BASE_URL
|--src
|		|--api								接口地址设置
|		|		|--login.js					登陆接口
|		|		|--mockeg.js				测试接口	
|		|		|--table.js					测试接口
|		|--assets							静态资源目录
|		|--components						全局公共组件目录
|		|--icon								图标文件（svg）
|		|--router							路由配置
|		|		|——_import_development.js	import函数（设置文件路径从views开始）
|		|		|--_import_production.js	import函数
|		|		|--index.js					所有页面的路由
|		|--store							VUEX
|		|		|--modules
|		|		|		|--app.js			动态切换侧边栏
|		|		|		|--user.js			用户登陆登出
|		|		|--getters.js				vuex getter
|		|		|--index.js					入口
|		|--styles							css样式表
|		|--untils
|		|		|--auth.js					设置token
|		|		|--index.js					时间日期格式化
|		|		|--request.js				ajax 拦截器 以及设置请求地址
|		|		|--validata.js				token 验证
|		|--views
|		|		|--channel					渠道
|		|		|--circle					圈
|		|		|--circleAndGroup	
|		|		|--dashboard
|		|		|--form
|		|		|--group
|		|		|--layout
|		|		|--login
|		|		|--table
|		|		|--tree
|		|		|--404.vue
|		|--App.vue
|		|--main.js
|		|--permession.js
|--favicon.ico		
|--index.html
|--LICENCE
|--packge.json
|--packagelock.json
|--README.md
|--README-zh.md
```


