# music
 我的音乐

 npm install  安装依赖

 npm run dev  运行项目

 npm run build  打包项目

 感兴趣的童鞋可以来个star
# 技术栈
*node 运行环境
*vue-cli脚手架搭建项目
*vue-router3.0 来做路由，实现单页面跳转
*mint-ui 手机端ui框架
*vuex3.1 状态管理器，用来集中管理数据
*vue-axios 基于 promise 的 HTTP 库 用来请求接口，实现前后端分离
#注意
  测试一下：配置了2个地址，一个页面可以同时请求2个后台地址。
# 项目目录结构
```
├─dist               #打包后文件         
│  │  index.html     
│  ├─static
│  │      ├─css/
│  │      ├─img/
│  │      ├─js/
│  │      config.js
├─build            #里面是对 webpack 开发和打包的相关设置，包括入口文件、输出文件、使用的模块等
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config           #配置文件
│      dev.env.js
│      index.js
│      prod.env.js
│
├─src            #项目源码
│  │  App.vue     #根组件文件
│  │  main.js     #入口js
│  │
│  ├─api
│  │      const.js    #url配置文件
│  │      getlist.js  #jsonp获取数据接口
│  │      http.js     #请求工具封装
│  │
│  ├─assets
│  │  ├─css
│  │  │      my-mint.css     #重新定义mint-ui样式
│  │  │      reset.css       #全局样式重置
│  │  │
│  │  ├─font               #字体图标
│  │  │      demo.css
│  │  │      demo_fontclass.html
│  │  │      demo_symbol.html
│  │  │      demo_unicode.html
│  │  │      iconfont.css
│  │  │      iconfont.eot
│  │  │      iconfont.js
│  │  │      iconfont.svg
│  │  │      iconfont.ttf
│  │  │      iconfont.woff
│  │  │
│  │  ├─img              #图片图标
│  │  │      icon_list_menu.png
│  │  │      lazy.png
│  │  │      lazy1.jpg
│  │  │      list_sprite.png
│  │  │      loading.gif
│  │  │      logo.png
│  │  │      logo2.png
│  │  │      player.png
│  │  │
│  │  └─js              #工具类
│  │          jsonp.js
│  │          song.js
│  │          util.js
│  │
│  ├─components            #组件
│  │      Album.vue           #专辑组件
│  │      indexhead.vue       #头部组件
│  │      loading.vue         #loading组件
│  │      mysonglist.vue      #我的歌单歌曲列表组件
│  │      pagheader.vue       #标题组件
│  │      player.vue          #播放器组件
│  │      ProgressCircle.vue  #进度条组件
│  │      Singer.vue          #歌手歌曲组件
│  │      songList.vue        #公共歌曲列表组件
│  │
│  ├─page  #页面
│  │      Recommend.vue     #首页
│  │      search.vue        #搜索页面
│  │      Singerlist.vue    #歌手列表页
│  │      toplists.vue      #热门歌曲排行页面
│  │
│  ├─router
│  │      index.js          #vue路由配置
│  │
│  └─store
│          index.js        #vuex配置
│
└─static                  #静态文件
        .gitkeep
        config.js
│  .babelrc           #使用 babel 的配置文件，用来设置转码规则和插件；
│  .editorconfig      #代码的规范文件，规定使用空格或 tab 缩进，缩进的长度是两位还是四位之类的代码风格，使用的话需要在编辑器里下载对应的插件；
│  .gitattributes
│  .gitignore         #指定 git 忽略的文件
│  .postcssrc.js      #指定使用的 css 预编译器，里面默认配置了 autoprefixer ，自动补全浏览器前缀；
│  index.html          #入口html
│  package-lock.json    #这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新
│  package.json       #指定项目开发和生成环境中需要使用的依赖库；
│  README.md          #你看的就是我
│







