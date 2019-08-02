<template>
	<div class="search">
		<div class="search-bar" ref="searchBar">
			<div class="input-warp">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" v-model="value" placeholder="搜索歌曲" @focus="onfocus_fn()" @keyup.enter="search_fn()">
				<i class="iconfont icon-chahao" v-if="value!=''" @click="history_clear"></i>
			</div>
			<div class="cancel-btn" v-show="isShow2" @click="isShow2=false">取消</div>
		</div>
		<!-- 历史 -->
		<div class="history">
				<button v-for="(item,index) in history" v-if="index<4" @click="history_search($event)">{{item}}</button>
		</div>
		<!-- 结果列表 -->
		<div class="search-content" v-show="isShow3">
				<songList></songList>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import store from '../store'
import  consts from '../api/const.js'
// import  loading from '../components/loading'
import songList from '../components/songList'
	export default {
		components:{
        // loading,
      songList
		},
		data(){
			return {
				value:"",
				isShow1:false,
				isShow2:false,
				isShow3:false,
				arr:[],
				history:[],

			}
		},
    computed:{

    },
		created(){
			
			//读搜索历史
			var items = localStorage.getItem("items",);
			if(items==null || items==""){
				this.history=[];
			}else{
				let arr = JSON.parse(items);//读取数据
				this.history=Array.from(new Set(arr))   //去重
			}

		},
		methods:{
			onfocus_fn(){
				  this.isShow2=true;
			},
		//qq音乐 根据关键字搜索
		search_fn(){
      let params={
        keyword: this.value,
        pageSize:30,
        page:0,
        type:"song",
        format:1
			};
			this.history.unshift(this.value);
			this.history=Array.from(new Set(this.history))   //去重
			localStorage.setItem("items",JSON.stringify(this.history))
      let url=consts.url2;
      this.$http.get(url+"/tencent/search", params)
        .then((response)=>{
					this.isShow3=true;
					this.arr=response.data;
					this.$store.commit('tem_playlist_f',this.arr);
        }).catch(function (error) {
          console.log(error);
        });
		},
		history_clear(){
			MessageBox.confirm("确认清除搜索历史？").then(action=>{
				if(action=='confirm'){
					this.history=[];
					localStorage.setItem("items","");
				}
			}).catch(err=>{
				if(err=='cancel'){
					console.log("取消")
				}
			})
		},
    history_search(e){
			let key =	e.target.innerText  //
			this.value=key;
			this.search_fn();
		}



		}
	}
</script>
<style scoped>
	.search-bar{
		display: flex;
		background: #f4f4f4;
		padding: 10px;
	}
	.input-warp{
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
		height: 20px;
		padding: 8px 10px;
		background-color: #fff;
		box-sizing: content-box;
		color: rgba(0,0,0,.3);
	}
	.input-warp i{
		font-size: 18px;
	}
	input::-webkit-input-placeholder{
		color: rgba(0,0,0,.3);
	}
	.input-warp input{
		margin: 0 5px;
		flex-grow: 1;
		outline: none;
		color: rgba(0,0,0,.3);
	}
	.cancel-btn{
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		padding: 0 5px 0 15px;
		color: #555;
		cursor: pointer;
	}
.history{
	padding: 5px;
}
.history button{
		padding: 3px 5px;
    color: #ffffff;
    background: #31c27c;
    margin-left: 5px;
}



	/* 列表 */
	.search-content{
		width: 100%;
		height: 560px;
		overflow: auto;
	}

</style>
