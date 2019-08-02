import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

let playMode={    //播放模式，
	sequence:0,
	loop:1,
	random:2
}

const state={
    playing:false,				//播放状态
    mode:playMode.sequence,     //播放模式，这种写法更语义化
		playlist:[],				//播放列表
		tem_playlist:[],    //临时播放列表
		songList:{}, //歌单信息

    currenitem:{},              //当前歌曲信息
		// id: "003W3cOz3VU0WK"
		// lrc: "https://v1.itooi.cn/tencent/lrc?id=003W3cOz3VU0WK"
		// name: "心痛2009"
		// pic: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RzsjT3WTZnn.jpg?max_age=2592000"
		// singer: "欢子"
		// time: 265
		// url: "https://v1.itooi.cn/tencent/url?id=003W3cOz3VU0WK

    sequencelist:[],  			//顺序播放列表
    currentIndex:-1,            //当前播放索引
    fullScreen: false,			//播放页面是否折叠
    full: false,			//播放页面是否折叠
    other:{},					//其他选项,
    currentAlbum:{},  //当前专辑信息
  

    mylikeSongs:localStorage['mylikeSongs']?JSON.parse(localStorage['mylikeSongs']):[],
    playHistory:localStorage['playHistory']?JSON.parse(localStorage['playHistory']):[],
    searchHistory:localStorage['searchHistory']?JSON.parse(localStorage['searchHistory']):[],
}
const getters={
	currentSong(state) {
		return state.playlist[state.currentIndex]||{}
	}
}

const mutations={
	isrotate(state){
		state.playing=true;
	},
	norotate(state){
		state.playing=false;
	},
  getindex(state,index){
	  state.currentIndex=index
  },
	pused(state){
		state.playing=!state.playing;
	},

	full(){
		state.full=true;
	},
	setfullScreen(state,flag){
		state.fullScreen=flag
	},
  songlist(state, data) {
    state.songList = data;
  },
  //播放列表
  playlist_f(state,data){
	  state.playlist=data;
	},
	//临时播放列表
	tem_playlist_f(state,data){
			state.tem_playlist=data;
	},
	//当前专辑
	currentAlbum(state,data){
		state.currentAlbum=data;
	}

}
//Action 一般做异步处理，或将多个mutation封装
const actions={
	tem_playlist_F(context,data){
		console.log(data);
		context.commit('tem_playlist_f',data)
	}
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})
