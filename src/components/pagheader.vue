<template>
	<div class="page-header" :style="imgStyle">
		<i class="iconfont icon-zuojiantou" @click="goback"></i>
		<h3 class="title" v-html="title"></h3>
	</div>
</template>

<script>
export default {
  name: 'pagheader',
  props:{
    title:{
				type:String,
				default:''
			},
		imgUrl:{
				type:String,
				default:''
			}
  },
  data () {
    return {

    }
  },
  computed: {
    imgStyle(){
				return `backgroundImage:url(${this.imgUrl})`
			}
  },
  created(){

		},
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }

  //http://v1.itooi.cn/music/tencent/url?key=579621905&id=001T0nhP3gFjAR&br=192
}
</script>


<style scoped>
  .page-header{
    position:fixed;
    top:0;
		left:0;
		height: 44px;
		width: 100%;
		line-height: 44px;
		z-index: 10;
    background-size: cover;
		background-repeat: no-repeat;
  }
  .page-header::before{
		content: "";
		position: absolute;
		z-index: 8;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		background-color: rgba(10,10,10,.2);
	}
  .page-header i{
		position: absolute;
		z-index: 10;
		left: 15px;
		font-size: 25px;
		color: #fff;
	}
  .page-header h3{
		position: absolute;
		z-index: 9;
		width: 100%;
		height: 44px;
		 font-size: 18px;
		font-weight: normal;
		color: #fff;
		text-align: center;
	}
</style>
