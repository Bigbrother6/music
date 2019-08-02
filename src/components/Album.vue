<template>
	<transition name="slide">
		<div class="singer">
			<top :title="singername" class="topb"></top>
			<div class="background" :class="{filter:isAddFilter}">
				<div class="mr10">
						<img :src="Album.img" alt="" width="150px" height="150px">
				</div>
				<div>
						<h4>{{AlbumInfo.name}}</h4>
						<p>演唱者：{{AlbumInfo.singer}}</p>
						<p>语言：{{AlbumInfo.language}}</p>
						<p>唱片公司：{{AlbumInfo.company}}</p>
						<p>发行时间：{{AlbumInfo.time}}</p>
				</div>
			</div>
			<!-- 选项卡组件tab -->
			<div class="navbar" id="navbar">
				<mt-navbar v-model="selected">
					<mt-tab-item id="album">专辑</mt-tab-item>
					<mt-tab-item id="desc">简介</mt-tab-item>
					<mt-tab-item id="MV">评论</mt-tab-item>
				</mt-navbar>
			</div>
			<!-- 选项卡组件内容 -->
			<div class="main" id="main">
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="album">
						<ul class="song-list">
							<li v-for="(item,index) in Songlist" class="song" @click="play(item,index)" :class="{'active':isplaying(index)}">
								<div class="text">
									<span>{{index+1}}</span>
									<h3>{{item.name}}</h3>
									<p>{{item.albumname}}</p>
								</div>
							</li>
						</ul>
					</mt-tab-container-item>
					<mt-tab-container-item id="desc">
							<ul>
								<li>{{Albumdesc.Falbum_desc}}</li>
							</ul>
					</mt-tab-container-item>
					<mt-tab-container-item id="MV">
						<h2 class="mvlist-title">最新评论</h2>
                <ul class="mv-ul">
									<li>暂无评论</li>
                </ul>

					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
	</transition>
</template>
<script>
	import  consts from '../api/const.js'
  import store from '../store/index.js'
	import top from "./pagheader"
	import Loading from '@/components/Loading'

	export default {
		components:{
			top,Loading,
		},
		data(){
			return {
				isAddFilter:false,
				selected:"album", //选项卡默认选第一个
				AlbumInfo:{

				},
				Albumsong:"",
				Songlist:"",
				Albumdesc:"",
			}
		},
		//计算属性
		computed: {
			singername(){
				return "专辑";
			},
		
			Album(){
				return store.state.currentAlbum;
			},
		},
		created(){
			this.show_album();
			this.pinglun();
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
				show_album(){
					let url=consts.url2;
					let parm={
						id:this.$route.query.id
					}
					this.$http.get(url+"/tencent/album",parm).then(res=>{
								//专辑名
								this.AlbumInfo.name=res.data.getAlbumInfo.Falbum_name;
								//发行时间
								this.AlbumInfo.time=res.data.getAlbumInfo.Fpublic_time
								//演唱者
								this.AlbumInfo.singer=res.data.singerInfo[0].Fsinger_name;
								//公司
								this.AlbumInfo.company=res.data.company.name;
								//语言
								this.AlbumInfo.language=res.data.language;
								//描述
								this.Albumdesc=res.data.getAlbumDesc;
								this.Albumsong=res.data.getSongInfo; //专辑歌曲
								let arr=[];
								for(var i=0;i<this.Albumsong.length;i++){
          				var objs={};
									objs.albumname=this.Albumsong[i].albumname;
            			objs.name=this.Albumsong[i].songname;
            			objs.singer=this.Albumsong[i].singer[0].name;
            			objs.id=this.Albumsong[i].songmid;
            			objs.pic= consts.url2+"/tencent/pic?id="+this.Albumsong[i].songmid;
            			objs.url=consts.url2+"/tencent/url?id="+this.Albumsong[i].songmid;
            			arr.push(objs);
        	}
					this.Songlist=arr;
					console.log(this.Songlist)
					}).catch(function (error) {
                console.log(error);
              });
					
				},
			pinglun(){
				let parm={id:this.$route.query.id,page:0,pageSize:30}
				let url=consts.url2;
				this.$http.get(url+"/netease/comment/album/hot",parm).then(res=>{
						console.log(res.data)
				}).catch(function(error){
					console.log(error)
				})
			},
				//点击歌曲
				play(item,index){
					console.log(item)
					store.state.currenitem=item;  //播放歌曲
					store.state.playing=true;
				// 创建播放列表 点击的时候把临时列表数据存到正式播放列表
					this.$store.commit('playlist_f',this.Songlist);
        //记录当前播放的索引
           this.$store.commit('getindex',index);
        // 需要全局注册通过commit修改
           this.$store.commit('isrotate');
           this.$store.commit('full');
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
			//如果播放的id===临时列表点击的id就改变字体颜色
				isplaying(index){ 
				if(store.state.currenitem.id==undefined){
					return false;
				}else{
					if(store.state.currenitem.id===this.$store.state.playlist[index].id){
				    return true;
          }
				}	
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
.topb{
	background: #96c7aa;
}
	.background{
		position: fixed;
		z-index: -1;
		width: 100%;
		height: 274px;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
    background: #31c27c;
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
	.mr10{
		margin-right:10px;
	}
	/* <!-- 选项卡组件tab --> */
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
	.song-list span{
		color: #444;
		font-size: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		position:relative;
		top:30px;
		left:5px;
	}
	.song-list h3{
		color: #444;
		font-size: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 30px;
	}
	.song-list p{
		color: #777;
		font-size: 14px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 30px;
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

.active h3,.active p,.active span{
	color:#31c27c;
}

</style>
<style>
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #31c27c;
    color: #31c27c;
    margin-bottom: -3px;
  }
</style>
