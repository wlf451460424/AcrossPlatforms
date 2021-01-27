<template>
	<view class="index">
		<swiper :circular="true" @change="swpierChange" :style="{height:screenHeight + 'px'}">
			<swiper-item  v-for="(value,index) in data" v-model="data" :key="index" >
				<scroll-view scroll-y="true">
					<image :src="decodeURIComponent(value)" mode="aspectFit"></image>
				</scroll-view>
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
				index: 0,
				screenHeight: 0,
				imgLength: 0,
				data: [],
			}
		},
		onLoad(e) {
			this.data = e.imgArr
			this.data = e.imgArr.split(",");
			// for(var i=0;i<this.data.length;i++){
			// 	this.data[i] = decodeURIComponent(this.data[i])
			// }
			// console.log(this.data)
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.imgLength = this.data.length;
			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			});
		},
		methods: {
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + "/" + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index] ,
						urls: this.data
					})
				}, 150)
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
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
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
