<template>
	<view class="content">
		<view style="padding: 0 60upx;flex-direction: column;">
			<view style="flex-direction: column;width: 100%;align-items: center;margin-top: 15%;">
				<image style="width: 160upx;height: 160upx;border-radius: 16upx;" src="@/static/logo.jpg"></image>
				<text style="line-height: 100upx;font-weight: 700;color: #b7b7b7;">一生为你，一心为它</text>
			</view>
			<view style="flex-direction: column;width: 100%;align-items: center;margin-top: 60upx;">
				<text @click="downpage" style="width: 100%;height: 80upx;line-height: 80upx;color: #f76d45;font-weight: 700;text-align: center;border: 1px solid #f76d45;border-radius: 8upx;">立即下载</text>
			</view>
		</view>
		<view style="width: 100%;position: absolute;bottom: 0;">
			<image v-bind:style="{width: imageWidth + 'px'}" mode="scaleToFill" src="@/static/down-pic.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageWidth: uni.getSystemInfoSync().windowWidth * 2,//图片宽度  
			}
		},
		methods: {
			downpage(){
				var u = navigator.userAgent;
				if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
					this.open(process.env.VUE_APP_ANDROID_URL);
				}else if(u.indexOf('iPhone') > -1){
					this.open(process.env.VUE_APP_IOS_URL);
				}
			},
			open(openUrl){
				var ua = window.navigator.userAgent.toLowerCase();  
				//通过window.navigator.userAgent来判断当前设备是IOS还是Android。
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){  
					// window.location.href='downLoadForPhone';  
					uni.showToast({
					    title: "请在浏览器中打开",
						icon: 'none',
					    duration: 1000
					});
					return;
				}else{//非微信浏览器  
					if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {  
						window.location.href = openUrl;
					}else if (navigator.userAgent.match(/android/i)) {  
						window.location.href = openUrl;
					}  
				}  
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
	background-color: #ffffff;
}

template {
	display: flex;
	flex: 1;
}
.content {
	flex-direction: column;
	color: #5c5f66;
	font-size: 14px;
	width: 100%;
}

</style>
