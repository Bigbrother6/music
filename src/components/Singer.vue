<template>
	<transition name="slide">
		<div class="singer">
			<top :imgUrl="imgUrl" :title="singername"></top>
			<div class="background" :style="`backgroundImage:url(${imgUrl})`" :class="{filter:isAddFilter}"></div>
			<!-- 选项卡组件tab -->
			<div class="navbar" id="navbar">
				<mt-navbar v-model="selected">
					<mt-tab-item id="song">歌曲</mt-tab-item>
					<mt-tab-item id="album">专辑</mt-tab-item>
					<mt-tab-item id="MV">MV</mt-tab-item>
				</mt-navbar>
			</div>
			<!-- 选项卡组件内容 -->
			<div class="main" id="main">
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="song">
						<ul class="song-list">
							<li v-for="(item,index) in songlist" class="song" @click="play(item,index)" :class="{'blue':isplaying(index)}">
								<div class="text">
									<h3>{{item.songname}}</h3>
									<p>{{item.singername+'·'+item.albumname}}</p>
								</div>
							</li>
						</ul>
					</mt-tab-container-item>
					<mt-tab-container-item id="album">
							<ul>
								<div class="loading-container" v-if="!albumlist.length">
										<loading></loading>
								</div>
								<li class="album" v-for="(item,index) in albumlist" :key="index" @click="goAlbum(item)">
									<div class="media-img">
										<img v-lazy="item.img">
									</div>
									<div class="media-text">
										<h3>{{item.name}}</h3>
										<p>{{item.publish}}</p>
									</div>
								</li>
							</ul>

					</mt-tab-container-item>
					<mt-tab-container-item id="MV">
						<h2 class="mvlist-title">最新MV</h2>
                <ul class="mv-ul">
                  <li v-for="item in mvlist" class="mv" @click="playMv(item)">
                    <div class="media-img">
                      <img :src=item.pic alt="暂无">
                    </div>
                    <div class="media-text">
                        <h3>{{item.title}}</h3>
                      <p>{{item.date}}</p>
                    </div>
                  </li>
                </ul>

					</mt-tab-container-item>
				</mt-tab-container>
			</div>
    <div class="audios" ref="sss" v-if="this.mvurl!=''">
				<p><span>{{mvtitle}}</span><i class="iconfont icon-chahao" @click="mvurl=''"></i></p>
        <video :src=this.mvurl autoplay controls></video>
    </div>
		</div>
	</transition>
</template>
<script>
  import store from '../store/index.js'
  import  consts from '../api/const.js'
	import top from "./pagheader"
	import Loading from '@/components/Loading'
	import { getSingerData } from '../api/getlist.js'
	import { createSong } from '@/assets/js/song'
	export default {
		components:{
			top,Loading,
		},
		data(){
			return {
				isAddFilter:false,
				song_name:"",
				selected:"song", //选项卡默认选第一个

				singer:"",
				songlist:[],
				albumlist:[],
        mvlist:[],      //mv列表
				mvurl:"",    //mv播放地址
				mvtitle:"",//mv标题
			}
		},
		//计算属性
		computed: {
			singername(){
				return this.$route.query.name;
			},
			imgUrl(){
				let id=this.$route.query.id;
				return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
			},
			mid(){
				return store.state.currenitem.song_id;
			},
		},
		created(){
			  this.fn1();
			  this.getMv();
		},
    mounted(){
		  console.log("111")
        window.addEventListener('scroll', this.fiexdTop);//监听页面滚动事件
    },
		beforeDestroy(){

		},
    destroyed(){
      console.log("222")
        window.removeEventListener('scroll', this.fiexdTop);//监听页面滚动事件
    },
		methods:{
				fn1(){
					  let id=this.$route.query.id;
            //获取歌手
					  getSingerData(id).then((res)=>{
                  let data=res.data;
                  this.singer=data.singer_name;
              		//获取歌曲列表
                data.list.forEach((item)=>{
                    this.songlist.push(createSong(item.musicData))
                });
								console.log(this.songlist);
								let arr=[];
								for(var i=0;i<this.songlist.length;i++){
									var objs={};
										objs.time=this.songlist[i].duration
										objs.name=this.songlist[i].songname
										objs.singer=this.songlist[i].singername
										objs.id=this.songlist[i].mid;
										objs.pic= consts.url2+"/tencent/pic?id="+this.songlist[i].mid;
										objs.url=consts.url2+"/tencent/url?id="+this.songlist[i].mid;
										arr.push(objs);
        				}
								console.log(arr)
								this.$store.commit('tem_playlist_f', arr);

							console.log(this.$store.state.tem_playlist)




              		//获取专辑列表
              	data.albumlist.forEach((item)=>{
                  this.albumlist.push({
                    albummid:item.albummid,
                    name:item.name,
                    img:item.pic,
                    publish:item.publish_date
                  })
              	})
							 console.log(this.albumlist)
				    })
				},
      	//获取歌手的歌曲列表
     		getsong(){
      //  let url=consts.url2;
      //  let params={
      //    id:this.$route.query.id,
      //    page:0,
      //    pageSize:50,
      //    format:1
      //  }
      //  this.$http.get(url+"/tencent/song/artist", params)
      //    .then((response)=>{
      //      // console.log(response.data);
      //         this.songlist=response.data;
      //    })
      //    .catch(function (error) {
      //      console.log(error);
      //    });
      },
      	//获取专辑列表
      //获取歌手mv
        getMv(){
        let url=consts.url2;
            let params={
              id:this.$route.query.id,
              page:0,
              pageSize:50,
              format:1
            }
            this.$http.get(url+"/tencent/mv/artist", params)
              .then((response)=>{
                // console.log(response.data);
                this.mvlist=response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
      },
      //点击播放MV
       playMv(item){
         let url=consts.url2;
         let params={
           id:item.vid,
           isRedirect:0
				 }
				 this.mvtitle=item.title;
         this.$http.get(url+"/tencent/mvUrl", params)
           .then((response)=>{
						 this.mvurl=response.data;
						 
           })
           .catch(function (error) {
             console.log(error);
           });

       },
				fiexdTop(){
					let navbar=document.getElementById('navbar')
					let main=document.getElementById('main');
					let top=document.documentElement.scrollTop;
					console.log(top);
					if (top>=230) {
						navbar.classList.add('fiexd-top');
						//防止滚动条跳动
						main.style.marginTop="320px";
					}else{
						navbar.classList.remove('fiexd-top');
						main.style.marginTop=0;
					}
					top>0?this.isAddFilter=true:this.isAddFilter=false
			},
      //点击歌曲
      play(item,index){
				console.log(item)
        let url=consts.url2;
        let obj={};
				  obj.time=item.duration;
          obj.name=item.songname;   //歌名
          obj.singer=item.singername; //歌手
          obj.id=item.mid;
          obj.pic= consts.url2+"/tencent/pic?id="+item.mid;
          obj.url=consts.url2+"/tencent/url?id="+item.mid;
          obj.index=index;
        //直接修改
        store.state.currenitem=obj;
				console.log(obj)
        //store.state.playing=true;
        let arr=[];
        for(var i=0;i<this.songlist.length;i++){
          var objs={};
						objs.time=this.songlist[i].duration
            objs.name=this.songlist[i].songname
            objs.singer=this.songlist[i].singername
            objs.id=this.songlist[i].mid;
            objs.pic= consts.url2+"/tencent/pic?id="+this.songlist[i].mid;
            objs.url=consts.url2+"/tencent/url?id="+this.songlist[i].mid;
            arr.push(objs);
        }
        // console.log(arr);
        this.$store.commit('playlist_f',arr);
      //记录当前播放的索引
        this.$store.commit('getindex',index);
        // 需要全局注册通过commit修改
        this.$store.commit('isrotate');
        this.$store.commit('full');

      },

   
		
			isplaying(index){
				if(store.state.currenitem.id===this.$store.state.tem_playlist[index].id){
				    return true;
          }
			},
			goAlbum(val){
				console.log(val);
				this.$store.commit('currentAlbum',val);
				this.$router.push({path:'/Album',query:{id:val.albummid}})
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
	.filter{
		-webkit-filter: blur(2px);
		-moz-filter: blur(2px);
		-o-filter: blur(2px);
		-ms-filter: blur(2px);
		filter: blur(2px);
	}
	.loading-container{
		margin: 150px 0;
	}

	.singer{
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.singer .head{
		height: 44px;
		line-height: 44px;
		background: red;
	}
	.head i{
	 position: absolute;
	 top:0px;
	 left: 0px;
	}
	.head h5{
		text-align: center
	}

	.background{
		position: fixed;
		z-index: -1;
		width: 100%;
		height: 274px;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.background::before{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 274px;
		background-color: rgba(10,10,10,.2);
	}
	.navbar{
		height: 50px;
		margin-top: 274px;
		background-color: #fff;
		letter-spacing: 3px;
	}
	.main{
		background-color: #fff;
		margin-bottom: 80px;
	}
	/* 列表str */
	.song{
    	display: flex;
    	align-items: center;
    	padding: 0 30px 0 20px;
    	margin: 20px 0;
    	border-left: 3px solid #fff;
	}
  .blue{
      border-left:3px solid #31c27c;
  }
  .song-list .blue h3{
    color:#31c27c;
  }
  .song-list .blue p{
    color:#31c27c;
  }
	.song-list .text{
		width: 80%;
	}
	.song-list h3{
		color: #444;
		font-size: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.song-list p{
		color: #777;
		font-size: 14px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
/* 列表end */
.fiexd-top{
		position: fixed;
		z-index: 40;
		top: 44px;
		left: 0;
		width: 100%;
		margin-top: 0;
	}

	.album{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100px;
		margin: 20px;
	}
	.album img{
		width: 100px;
		height: 100px;
	}
	.album .media-text{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 60%;
		height: 50px;
		margin-left: 20px;
	}
	.album h3{
		font-size: 14px;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.album p{
		color: #666;
		font-size: 14px;
	}

	.mvlist-title{
		margin: 40px 0 20px;
		font-size: 17px;
		font-weight: normal;
		text-align: center;
		letter-spacing: 5px;
		color: #333;
	}
	.mv-ul{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: 20px 5px;
	}
	.mv{
		width: 48%;
		margin-right: 5px;
	}
	.mv img{
		width: 100%;
		height: auto;
	}
	.mv h3{
		font-size: 16px;
		font-weight: normal;
		color: #333;
		padding-left: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 5px 0 3px;
	}
	.mv p{
		margin-bottom: 20px;
		padding-left: 10px;
		font-size: 14px;
		color: #333;
	}
  .audios{
    width: 100%;
    height: 300px;
    position: fixed;
		top: 45px;
    z-index: 50;
  }
	.audios p{
		background: #fff;
    position: absolute;
		padding:3px 10px;
    height: 33px;
    width: 100%;
		z-index:3;
	}
	.audios p i{
		color:#31c27c;
		float: right;
	  font-size:22px;
		cursor: pointer;
	}
  .audios video{
		position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #31c27c;
    color: #31c27c;
    margin-bottom: -3px;
  }
</style>
