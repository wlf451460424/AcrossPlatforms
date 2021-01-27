<template>
	<view class="index">
		<swiper :circular="true" :style="{height:screenHeight + 'px'}">
			<swiper-item  v-for="(value,index) in data" :key="index" @click="preImg(index)">
				<image :src="decodeURIComponent(value)" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ceshi:'',
				imgShow: false,
				index: 5,
				screenHeight: 0,
				imgLength: 0,
				data: []
			}
		},
		onLoad(e) {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.data = e.imgArr.toString().split(",");
			this.ceshi = e.name;
			this.imgLength = this.data.length;
			// console.log(this.ceshi)
			// console.log(this.data)
			// uni.setNavigationBarTitle({
			// 	title: "1/" + this.imgLength
			// });
		},
		methods: {
			preImg(index) {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang='scss' scoped> 
	page,
	view {
	    display: flex;
	}
	
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #f9f9f9;
	}
	
	template {
	    display: flex;
	    flex: 1;
	}
	page {
		background-color: #000;
		/* background-color: rgba(0, 0, 0,.7); */
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		/* background-color: rgba(0, 0, 0,.7); */
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}
</style>
