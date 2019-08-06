# music
 我的音乐

#项目架构
├─dist               #打包后文件         
│  │  index.html     
│  ├─static
│  │      ├─css/
│  │      ├─img/
│  │      ├─js/
│  │      config.js
├─build
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
│  .babelrc
│  .editorconfig
│  .gitattributes
│  .gitignore
│  .postcssrc.js
│  index.html          #入口html
│  package-lock.json
│  package.json        #
│  README.md
│
