<template>
  <transition name="slide">
    <div class="singer">
      <top :imgUrl="s.logo" :title="s.author"></top>
      <div class="background" :style="`backgroundImage:url(${s.logo})`" :class="{filter:isAddFilter}"></div>
      <div id="navbar" class="navbar" v-if="!isload">
            <songList></songList>
      </div>
      <div v-if="isload" class="loading">
          <Loading></Loading>
      </div>
    </div>
  </transition>
</template>
<script>
  import store from '../store/index.js'
  import top from "./pagheader"
  import Loading from '@/components/Loading'
  import consts from '../api/const.js'
  import songList from '../components/songList'
  export default {
    components:{
      top,Loading,songList,
    },
    data(){
      return {
        isAddFilter:false,

        songlist:[],
        obj:"",
        isload:true,
      }
    },
    //计算属性
    computed: {

      s(){  //获取全局歌单信息
        console.log(store.state.songList)
        return  store.state.songList;
      }


    },
    created(){
      this.fn1();
    },
    beforeDestroy(){

    },
    methods:{
      fn1(){
        let params={
          id: this.$route.query.id,
          format: 1
        };
        let url=consts.url2;//https://api.itooi.cn
        this.$http.get(url+"/tencent/songList", params)
          .then((response)=>{
            this.songlist=response.data;
            this.$store.commit('tem_playlist_f', this.songlist);
            this.isload=false;
            console.log(this.$store.state.tem_playlist)
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
          }else{
            navbar.classList.remove('fiexd-top');
          }
        top>0?this.isAddFilter=true:this.isAddFilter=false
      },
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
    margin-top: 274px;
    background-color: #fff;
    letter-spacing: 3px;
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

	.loading{
		width: 100px;
		height: 100px;
		position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
	} 















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
</style>
