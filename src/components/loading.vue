<template>
	<div class="loading">
		<img src="../assets/img/loading.gif">
		<p class="desc">正在加载</p>
	</div>
</template>
<script>


	export default {
		components:{

		},
		data(){
			return {

			}
		},
		created(){

		},
		methods:{


		}
	}
</script>
<style scoped>
.loading{
	text-align: center;
}
  .loading img{
	  width: 24px;
	  height:24px;

  }
  .desc{
		margin-top: 10px;
		font-size: 14px;
		color: #666;
  }
</style>
