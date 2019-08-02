<template>
	<div class="recommend">
		<div class="slider">
			<mt-swipe>
				<mt-swipe-item v-for="(item,index) in slider" :key="index">
					<a :href="item.linkUrl"><img :src="item.picUrl"></a>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="gedan-list clearfix">
			<h3>我的歌单</h3>
			<div class="song_list" @click="go_mysong(songobj)">
				<div class="pic"><img :src="songobj.logo" alt="" class="pic"></div>
				<p v-html="songobj.desc"></p>
				<span v-html="songobj.author"></span>
			</div>
      <div class="song_list" @click="go_mysong(songobj1)">
				<div class="pic"><img :src="songobj1.logo" alt=""></div>
        <p v-html="songobj1.desc"></p>
        <span v-html="songobj1.author"></span>
      </div>
		</div>
		<div class=" gedan-list clearfix">
			<h3>热门歌单</h3>
			<div class="song_list" @click="" v-for="item in hot"  @click="go_mysong2(item)">
				<div>
						<img :src="item.imgurl" alt="" class="pic">
				</div>	
					<p v-html="item.dissname"></p>
					<span v-html="item.creator.name"></span>
			</div>
		</div>
    <div class="router-view">
      <router-view></router-view>
		</div>
		<div class="loadings" v-if="songobj.id==''">
			<div>
					<Loading></Loading>
			</div>
		</div>
	</div>
</template>
<script>
//import $ from 'jquery'
import jsonp2 from '@/assets/js/jsonp.js';
import consts from '../api/const.js'
import Loading from '@/components/Loading'
export default {
	components:{
			 Loading,
		},
		data(){
			return {
				slider:[{linkUrl:"a",picUrl:"aa",}],
				songobj:{
				    id:"",
          	desc:"",
          	author:"",
          	logo:""
          },
        songobj1:{
          id:"",
          desc:"",
          author:"",
          logo:""
				},
				hot:[],

			}
		},
		computed:{

		},

		created(){

			this.getRecommendData();
			this.getRecommendlist();
			this.getsonglist();
			this.hotlist();
		},
		methods:{
			//轮播图 原api
			getRecommendData(){
				let url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
				let data={
						format: "json",
						inCharset: "utf-8",
						outCharset: "utf-8",
						notice: 0,
						platform: "h5",
						needNewCode: 1,
					}
					//return jsonp2(url,data,{param:"jsonpCallback"})
					jsonp2(url,data,{param:"jsonpCallback"}).then((res)=>{
						let data=res.data;          //返回的数据
						 this.slider=data.slider;   //轮播图数据
						 this.radioList=data.radioList;
			 			 this.songList=data.songList;
					})
			},
    //  920197367
			getRecommendlist(){
				// 方法1 ----跨域 不好使
				//   fetch('https://api.itooi.cn/music/tencent/songList?key=579621905&id=1147906982',
				// 	{method: 'GET',mode: 'cors'})
				// 	.then(
				// 		response=>response.json()
				// 		)
				// 	.then(data=>{
				// 		this.gedan=data;
				// 		console.log(this.gedan)
				// 	})
				//方法2 不好使
				// $.ajax({
				// 	type:"Get",
				// 	url:"https://api.itooi.cn/music/tencent/songList?key=579621905&id=1147906982",
				// 	dataType:"jsonp",
				// 	jsonp:"callback",//传递给请求服务器处理程序或页面的，用以获得JSONP回调函数名
				// 	jsonpCallback:"jsonCallBackTest",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，此属性可不配置
				// 	success:function(data){
                //     	alert(data);
				// 	},
				// 	error:function(){
				// 		alert(error);
				// 	}
				// })
			// let	params={key:579621905,id:1147906982}
           	// this.$http.get("/apia/https://api.itooi.cn/music/tencent/songList",params).then(response=>{
            // 	console.log(response.data);
			 // 	})

			 let params={
			   id: 6941920854,
         format: 0
			 };
			 let url=consts.url2;//https://v1.itooi.cn
			 this.$http.get(url+"/tencent/songList", params)
						.then((response)=>{
							this.songobj.desc=  response.data[0].desc
              this.songobj.logo=  response.data[0].logo
              this.songobj.author=  response.data[0].nickname
              this.songobj.id=  params.id;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
      getsonglist(){
        let params={
          id: 6953123374,
          format: 0
        };
        let url=consts.url2;//url2:'"https://v1.itooi.cn"',
        this.$http.get(url+"/tencent/songList", params)
          .then((response)=>{
            this.songobj1.desc=  response.data[0].desc
            this.songobj1.logo=  response.data[0].logo
            this.songobj1.author=  response.data[0].nickname
            this.songobj1.id=  params.id;
          })
          .catch(function (error) {
            console.log(error);
          });
			},
			hotlist(){
					let params={
						categoryId:10000000,   //全部
						sortId:3,  //最热 4最新
						pageSize:10,
						page:1,
					}
					let url=consts.url2;
					this.$http.get(url+"/tencent/songList/hot",params).then((response)=>{
						console.log(response.data.list);
						this.hot=response.data.list;
					})

			},

      go_mysong(obj){
            this.$store.commit('songlist',obj);
			      this.$router.push({path:'/recommend/Mysonglist',query:{id:obj.id}})
			},
			go_mysong2(obj){
						let item ={};
						item.desc=obj.dissname;
						item.logo=obj.imgurl;
						item.author=obj.creator.name;
						item.id=obj.dissid;
						this.$store.commit('songlist',item);
			      this.$router.push({path:'/recommend/Mysonglist',query:{id:obj.dissid}})
      },


		}
	}
</script>
<style scoped>
	.recommend{
		height:652px;
		overflow-y: auto;
	}
	.reccommend h3{
		padding: 10px 2px;
	}
	.slider{
		width: 100%;
		height: 150px;
	}
	.slider a{
		display: block;
	}
	.slider img{
		width: 100%;
		height: 150px;
	}

	.gedan-list>h3{
			padding:5px;
	}
	.song_list{
		width: 50%;
    float: left;
	}
  .song_list div{
    width: 95%;
		height: 150px;
  }
	.song_list p{
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow: hidden;
		height: 24px;
	}
	.loadings{
			position: absolute;
      width: 100%;
			height: 100%;
			background:#030303f7;
			opacity: 0.8;
			top:0;
	}
	.loadings>div{
		width: 100px;
		height: 100px;
		position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
	}
</style>
