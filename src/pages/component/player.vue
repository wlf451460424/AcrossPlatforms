<template>
	<div class="prism-player" id="J_prismPlayer"></div>
	<!-- <view class="content">
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				postImage:'',
				postVid:'',
				playauth:''
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			console.log(this.receiveObj)
			this.postImage = this.receiveObj.postImage
			// this.postVid = this.receiveObj.postVid
			// this.playauth = this.receiveObj.playauth
			
			this.postVid = '62a65f22fe824daa915e5f33fe7bab86'
			this.playauth = 'http://192.168.1.173:8888/doc.html#/ginkgo-cloud-uaa-portal-server/%E8%A7%86%E9%A2%91%E7%9B%B8%E5%85%B3/getPlayAuthUsingPOST'
			
			var player = new Aliplayer({
				id: 'J_prismPlayer',
				//播放方式二：点播用户推荐
				vid : this.postVid,
				playauth : this.playauth,
				cover: this.postImage,         
				width: '100%',
				autoplay: true,
			},function(player){
				// console.log('播放器创建好了。')
			});
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	page,
	view {
	    display: flex;
	}
	page {
	    display: flex;
	    background-color: #FFFFFF;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #FFFFFF;
		border-top: 2upx solid #F9F9F9;
	}
</style>
