<template>
	<view>
		<web-view :src="webUrl" v-model="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webTitle:'',
				webUrl: ''
			}
		},
		onLoad() {
			this.webUrl = uni.getStorageSync("webUrl")
			this.webTitle = uni.getStorageSync("webTitle")
			// console.log(this.webTitle)
			//设置标题
			uni.setNavigationBarTitle({
			    title: this.webTitle
			});
		}
	}
</script>

<style lang='scss' scoped> 
</style>
