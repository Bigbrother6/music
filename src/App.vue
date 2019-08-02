<template>
  <div id="app">
    <indexhead></indexhead>
    <router-view/>
    <div class="play">
      <player></player>
    </div>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/my-mint.css'
import '@/assets/font/iconfont.css' 
import indexhead from './components/indexhead'
import player from './components/player'  
export default {
  name: 'App',
  components:{
    indexhead,player,
  }
}
</script>

<style>
	  /*隐藏滚动条*/
	  ::-webkit-scrollbar{
    display:none;
  }
</style>
