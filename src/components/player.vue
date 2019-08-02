<template>
	<div class="player" v-show="full">
		<!-- 大页面 -->
		<transition name="normal">
			<div class="normal-player" v-show="gu">
				<!-- 模糊背景 -->
				<div class="background">
					<img :src="curr_item.pic">
				</div>
				<div class="top">
						<div class="back">
							<i class="iconfont icon-jiantouarrow483" @click="back_fn"></i>
						</div>
						<h2 v-html="curr_item.name"></h2>
						<h3 v-html="curr_item.singer"></h3>
				</div>
				<div class="middle">
						<div class="middle-left">
							<div class="image-wrapper" ref="imgWrapper">
								<img :src="curr_item.pic" :class="rotate">
							</div>
							<div class="lyric-wrapper">暂无歌词！</div>
						</div>
						<div></div>
				</div>
				<div class="bottom">
						<div class="progress-wrapper">
								<span class="time">{{format(currentTime)}}</span>
								<div class="progress-bar-wrapper">
										<ProgressCircle :percentage="percentage" @percentChange="percentChange"></ProgressCircle>	
								</div>
								<span class="time">{{format(curr_item.time)}}</span>
						</div>
					<!-- 控制按钮 -->
					<div class="control-wrapper">
						<div class="icon">
							<i class="iconfont" :class="modeIcon" ref="mode" @click="change()"></i>
						</div>
						<div class="icon">
							<i class="iconfont icon-shangyishou" @click.stop="last()"></i>
						</div>
						<div class="icon">
							<i class="iconfont i3" :class="playIcon" @click.stop="togglePlaying()"></i>
						</div>
						<div class="icon">
							<i class="iconfont icon-xiayishou" @click.stop="next()"></i>
						</div>
						<div class="icon">
							<i class="iconfont" :class="getLikeIcon(love_btn)" @click="love(love_btn)"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- 小页面 -->
		<transition name="mini">
				<div class="mini-player" v-show="!gu" @click="open_fn()">
					<div class="icon">
						<img :src="curr_item.pic" :class="rotate">
					</div>
					<div class="text">
						<h3 v-html="curr_item.name"></h3>
						<p v-html="curr_item.singer"></p>
					</div>
					<div class="play-state">
						<i class="iconfont" :class="playIcon" @click.stop="togglePlaying()"></i>
					</div>

				</div>
		</transition>
		<audio :src="curr_item.url"  autoplay ref="audio"   @error="error" @timeupdate="updateTime($event)" @ended="end"></audio>
	</div>
</template>
<script>

import { Toast } from 'mint-ui';
import store from '../store/index.js'
import ProgressCircle from './ProgressCircle'
import  consts from '../api/const.js'
	export default {
		components:{
			ProgressCircle,
		},
		data(){
			return {
				mode:0,
				modeIcon:'icon-xunhuanbofang',
				love_btn:0,
				currentTime:0  //播放时间开始为0；
			}
		},
		created(){

		},
		beforeDestroy(){

		},
		watch:{

		},
		computed:{
			//大小窗口切换
			 gu(){
			 	return store.state.fullScreen;
			 },
			 //当前信息
			 curr_item(){
				  return store.state.currenitem;
			 },
			 //播放就旋转
			 rotate(){
				return store.state.playing ? 'rotate' : 'rotate rotate-pause'
			 },
			  //播放按钮
			 playIcon() {
				return store.state.playing ? 'icon-bofang' : 'icon-play_icon'
			 },
			 full(){
				return this.$store.state.full;
			 },
			 percentage(){
				return this.currentTime / this.curr_item.time
			}


		},
		methods:{
			getPosAndScale() {
				const targetWidth = 40    //图像缩略图宽度
        		const width = window.innerWidth * 0.8 //图像宽度
        		const scale = targetWidth / width

        		const paddingLeft = 40
        		const x=-(window.innerWidth/2-paddingLeft)

        		const paddingTop = 80
        		const paddingBottom = 30
        		const y=window.innerHeight - paddingTop - width / 2 - paddingBottom
        		return { x,y,scale }
			},
			enter(el,done) {
				// const {x, y, scale} = this.getPosAndScale()
				// let animation = {
				// 	0: {
				// 		transform:`translate(${x}px,${y}px) scale(${scale})`
				// 	},
				// 	60: {
				// 		transform:"translate(0,0) scale(1.1)"
				// 	},
				// 	100: {
				// 		transform:"translate(0,0) scale(1)",
				// 	}
				// }
			},
			afterEnter(){
				// animations.unregisterAnimation('move')
				// this.$refs.imgWrapper.style.animation = ''
			},
			leave(){

			},
			afterLeave(){

			},
			//打开播放
			open_fn(){
				this.$store.commit('setfullScreen',true);
			},
			//收起播放页
			back_fn(){
				this.$store.commit('setfullScreen',false);
			},
			//播放和暂停
			togglePlaying(){
				this.$store.commit('pused');

				this.$store.state.playing ? this.$refs.audio.play() : this.$refs.audio.pause()
			},
      //点击收藏
			love(){
				this.love_btn=!this.love_btn;
			},
      //收藏样式
			getLikeIcon(song) {
				if(song==0){
					return 'icon-xihuan'
				}else{
					return 'icon-xihuan1 red'
				}
			},
      //点击播放模式
			change(){
				this.mode++;
				console.log(this.mode);
				if(this.mode>2){
					this.mode=0;
					Toast('顺序播放') //0
				}
				switch (this.mode)
				{
					case 0:this.modeIcon='icon-xunhuanbofang'; Toast('顺序播放'); break;//0;
					case 1:this.modeIcon='icon-danquxunhuan'; Toast('单曲循环');break; //0;;
					case 2:this.modeIcon='icon-suijibofang'; Toast('随机播放');break; //0;;
				}
			},
      //播放结束时
      end(){
        // console.log(this.$store.state.playlist);
        // console.log(this.mode);
        let arr=this.$store.state.playlist;
        let num=this.$store.state.currentIndex;
        console.log(num)
          if(	this.mode==0  && arr.length-1>num){  //找出下一曲该播放的
            console.log(arr[num+1]);
            store.state.currenitem=  arr[num+1];
            this.$store.commit('getindex',num+1);
          }else if(this.mode==1){
            //单曲循环
            console.log("单曲")
						this.$refs.audio.currentTime = 0
						this.$refs.audio.play()
          }else if(this.mode==2){
            //随机播放
            console.log("随机");
            let max=arr.length;
            let  item = Math.floor(Math.random()*(max-0+1)+0)
            console.log(item)
            store.state.currenitem=  arr[item];
            this.$store.commit('getindex',item);
          }else{
            console.log("最后")
          }


      },
      error(){
			  console.log("错误")
      },
      updateTime($event){
				this.currentTime = $event.target.currentTime
      },
			percentChange(percentage){
				let currentTime = this.currentSong.duration*percentage
				this.$refs.audio.currentTime = currentTime
				if (!this.playing) {
					this.togglePlaying();
				}
			},
      //下一曲
      next(){
        let arr=this.$store.state.playlist;
        let num=this.$store.state.currentIndex;
        store.state.currenitem=  arr[num+1];
        this.$store.commit('getindex',num+1);
      },
      //上一曲
			last(){
        let arr=this.$store.state.playlist;
        let num=this.$store.state.currentIndex;
        store.state.currenitem=  arr[num-1];
        this.$store.commit('getindex',num-1);
      },

			//
			format(time) {
				let minutes = (time / 60) | 0   // |是向下取正
				let  seconds = time % 60 | 0
				if (minutes<10) {
					minutes = '0' + minutes
				}
				if (seconds<10) {
					seconds = '0' + seconds
				}
				return minutes + ':' + seconds
			},



		}
	}
</script>
<style scoped>
	/* 大窗口 */
	.normal-player{
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
	}
	.background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.background img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(20px);
		transform: scale(1.1);
	}
	.top{
		position: relative;
		margin-bottom: 25px;
		color: #fff;
		text-align: center;
	}
	.back{
		position: absolute;
		height: 40px;
		width: 60px;
		line-height: 40px;
	}
	.back i{
		font-size: 22px;
	}
	.top h2{
		width: 70%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 18px;
		font-weight: normal;
	}
	.top h3{
		width: 70%;
		height: 20px;
		line-height: 20px;
		margin: 0 auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 15px;
		font-weight: normal;
	}
	.middle{
		position: fixed;
		top: 80px;
		bottom: 170px;
		width: 100%;
		text-align: center;
	}
	.image-wrapper{
		width: 80%;
		margin: 0 auto;
	}
	.image-wrapper img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 10px solid hsla(0,0%,100%,.1);
	}
	.rotate{
		animation: rotateAnimation 22s linear infinite;
	}
	.rotate-pause{
		animation-play-state: paused
	}
	@keyframes rotateAnimation{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.bottom{
		position: fixed;
		bottom: 50px;
		width: 100%;
		text-align: center;
	}
	.progress-wrapper{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 80%;
			margin: 0 auto;
			padding:10px;
	}
	.progress-wrapper .time{
		width: 30px;
		height: 30px;
		line-height: 30px;
		color: #fff;
		font-size: 12px;
	}
	.progress-wrapper .progress-bar-wrapper{
		flex-grow: 1;
		height: 30px;
		padding: 0 5px;
	}
	.bottom .control-wrapper{
		display: flex;
		padding: 0 30px;
	}
	.bottom .control-wrapper .icon{
		flex-grow: 1;
		height: 41px;
		line-height: 41px;
		text-align: center;
		color: #31c27c;
	}
	.bottom .icon i{
		font-size: 28px;
	}
	.bottom .icon .i3{
		font-size: 33px;
	}
	icon-xihuan1 .red{
		color:red;
	}



	.normal-enter-active,.normal-leave-active{
		transition: all 0.4s;
	}
	/* 贝赛尔曲线动画 */
	.normal-enter-active .top,.normal-enter-active .bottom{
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
	}
	.normal-leave-active .top,.normal-leave-active .bottom{
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
	}
		/* 执行中间动画 */
	.normal-leave-active .middle,.normal-enter-active .middle{
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
	}

	.normal-enter,.normal-leave-to{
		opacity: 0
	}
	/* 底部动画 */
	 .normal-enter .bottom,.normal-leave-to .bottom{
		transform: translateY(100%)
	}
	/* 头部动画 */
	 .normal-enter .top,.normal-leave-to .top{
		transform: translateY(-100%)
	}
	/* 中间动画 */
	.normal-enter .middle,.normal-leave-to .middle{
		transform: translateY(-100%)
	}

	.mini-enter-active,.mini-leave-active{
		transition: all 0.4s;
	}
	.mini-enter,.mini-leave-to{
		opacity: 0;
	}






	/* 小窗口 */
	.mini-player{
		position: fixed;
		display: flex;
		align-items: center;
		z-index: 100;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60px;
		border-top: 1px solid #ccc;
		background-color: #fff;
	}
	.mini-player .icon{
		width: 40px;
		height: 40px;
		margin: 0 10px 0 20px;
	}
	.mini-player .icon img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.mini-player .text{
		width: 60%;
		height: 70%;
		padding-right: 25px;
	}
	.mini-player .text h3{
		font-size: 14px;
		font-weight: normal;
		margin-bottom: 5px;
	}
	.mini-player .text p{
		font-size: 12px;
		font-weight: normal;
		margin-bottom: 5px;
	}
	.mini-player .control{
		width: 10%;
		color: #31c27c;
		margin-right: 10px;
	}
	.mini-player .play-state i{
		font-size:30px;
		color: #31c27c;
	}

	/* 动画 */
	.rotate{
		animation: rotateAnimation 22s linear infinite;
	}
	.rotate-pause{
		animation-play-state: paused;
		-webkit-animation-play-state:paused; /* Safari 和 Chrome */
	}
	@keyframes rotateAnimation{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
