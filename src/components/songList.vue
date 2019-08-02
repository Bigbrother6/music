<!--    歌曲列表组件-->
<template>
      <div>
            <ul>
              <li v-for="(item,index) in  getdata" @click="play(item,index)" class="list" :class="{'active':isplaying(index)}">
                <img :src=item.pic>
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.singer}}</p>
                </div>
              </li>
            </ul>
      </div>
</template>

<script>
  import store from '../store/index.js'
    export default {
      name: "songList",
      data(){
          return {
            songlist:[],
          }
      },
      computed:{
       getdata(){
         return this.$store.state.tem_playlist;
       }
      },
      watch:{
         getdata(news,olds){
           this.songlist=news;
         }
      },
      created(){
        
      },

      methods:{
        //点击播放 
         play(item,index){

          store.state.currenitem=item;
          store.state.playing=true;
           // 创建播放列表 点击的时候把临时列表数据存到正式播放列表
           this.$store.commit('playlist_f',this.$store.state.tem_playlist);
        //   //记录当前播放的索引
           this.$store.commit('getindex',index);
           // 需要全局注册通过commit修改
           this.$store.commit('isrotate');
           this.$store.commit('full');
        }, 
       //如果播放的id===临时列表点击的id就改变字体颜色
        isplaying(index){ 
				  if(store.state.currenitem.id===this.$store.state.tem_playlist[index].id){
				    return true;
          }
      }
      }
    }
</script>

<style scoped>
 .list{
  padding:10px;
 }
  .list>img{
    width:60px;
    height:60px;
    border-radius:50%;
  }
  .list>div{
      /* width: 320px; */
      width: 270px;
      display: inline-block;
  }
  .list >div p{
      margin-top: 10px;
  }
  .active{
    color:#31c27c;
  }



</style>
