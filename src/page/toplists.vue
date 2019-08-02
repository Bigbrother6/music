<template>
	<transition name="slide">
		<div class="toplist">
        <div class="loading-container" v-if="isloading">
            <Loading></Loading>
        </div>
        <div class="songlins-container" v-if="!isloading">
            <songList></songList>
        </div>
		</div>
	</transition>
</template>
<script>

  import store from '../store'
  import Loading from '@/components/Loading'
  import songList from '@/components/songList'
  import consts from '../api/const.js'
	export default {
		components:{
			songList,Loading
		},
		data(){
			return {
        songlist:[],
        isloading:true,
			}
		},
		created(){

			this.fn();
		},
		beforeDestroy(){

		},
		computed:{

		},
		methods:{
          fn(){
              let url=consts.url2;
              let params={
                  id:26,
                pageSize:100,
                page:0,
                format:1
              }
            this.$http.get(url+"/tencent/topList", params)
              .then((response)=>{
                console.log(response.data)
                  this.isloading=false;
                  this.songlist=response.data;
                  this.$store.commit('tem_playlist_f',this.songlist);

              })
              .catch(function (error) {
                console.log(error);
              });
          },
      // goTo(params,query){
      //     this.$router.push({path:'/singerlist/Singer',query:{id:params,name:query}})
      // }
      //点击播放
      play(item,index){
        let url=consts.url2;
        let obj={};
        obj.name=item.name;   //歌名
        obj.singer=item.singer; //歌手
        obj.song_id=item.id;
        obj.pic= item.pic;
        obj.url=item.url;
        obj.index=index;
        //直接修改
        store.state.currenitem=obj;
        //store.state.playing=true;
        let arr=[];
        for(var i=0;i<this.songlist.length;i++){
          var objs={};
          objs.name=this.songlist[i].name
          objs.singer=this.songlist[i].singer
          objs.song_id=this.songlist[i].id;
          objs.pic=this.songlist[i].pic;
          objs.url=this.songlist[i].url;
          objs.index=i;
          arr.push(objs);
        }
        // console.log(arr);
        // 创建播放列表
        this.$store.commit('playlist_f',arr);
        //记录当前播放的索引
        this.$store.commit('getindex',index);
        // 需要全局注册通过commit修改
        this.$store.commit('isrotate');
        this.$store.commit('full');
      }


		}
	}
</script>
<style scoped>
	.slide-enter-active,.slide-leave-active{
		transition: all 0.3s;
	}
	.slide-enter, .slide-leave-to{
		transform: translateX(100%);
	}
  .loading-container{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
  }
  .songlins-container{
    height: 620px;
    overflow-y: scroll;
  }
</style>
