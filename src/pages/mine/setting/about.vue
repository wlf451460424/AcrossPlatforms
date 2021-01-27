<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;align-items: center;padding: 50upx;">
			<image style="width: 180upx;height: 300upx;" src="@/static/about_logo.png"></image>
			<!-- <text style="font-size:60upx;margin-top:20upx;">{{name}}</text> -->
		</view>
		<view style="flex-direction: column;width: 100%;align-items: center;">
			<view @click="privacyPolicyClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>隐私政策</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view @click="communitySpecificationClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>社区规范</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view @click="agreeClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>用户协议</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<!-- #ifndef MP-QQ -->
			<view @click="douyinClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width:30%;height: 100%;align-items: center;">
					<text>官网</text>
				</view>
				<view style="width: 70%;height: 100%;align-items: center;justify-content: flex-end;color: #f76d45;">
					<!-- <text>甜宠</text> -->
					<image style="width: 16upx;height: 26upx;margin-left: 16upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view @click="thePublicClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width: 30%;height: 100%;align-items: center;">
					<text>公众号</text>
				</view>
				<view style="width: 70%;height: 100%;align-items: center;justify-content: flex-end;color: #f76d45;">
					<image style="width: 16upx;height: 26upx;margin-left: 16upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view @click="weiboClick" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<view style="width: 30%;height: 100%;align-items: center;">
					<text>微博</text>
				</view>
				<view style="width: 70%;height: 100%;align-items: center;justify-content: flex-end;color: #f76d45;">
					<image style="width: 16upx;height: 26upx;margin-left: 16upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	// import json from '@/json'
	import h5Copy  from '@/components/h5-copy/junyi-h5-copy.js';
	export default {
		data() {
			return {
				name:'',
				weiboUrl:'',
				douyinUrl:'',
				publicUrl:'',
			}
		},
		onLoad() {
			this.name = process.env.VUE_APP_NAME
			this.weiboUrl = process.env.VUE_APP_WEIBO
			this.douyinUrl = process.env.VUE_APP_GUANWANG
			this.publicUrl = process.env.VUE_APP_MP
		},
		methods: {
			//隐私政策
			privacyPolicyClick(){
				uni.navigateTo({
					url:'../agree/index?type=18'
				})
			},
			//社区规范
			communitySpecificationClick(){
				uni.navigateTo({
					url:'../agree/index?type=17'
				})
			},
			//用户协议
			agreeClick(){
				uni.navigateTo({
					url:'../agree/index?type=15'
				})
			},
			//微博
			weiboClick(){
				// let content = String(this.weiboUrl);
				// const result = h5Copy(content)
				// if (result === false) {
				// 	uni.showToast({
				// 		title:'不支持',
				// 	})
				// } else {
				// 	uni.showToast({
				// 		title:'复制成功',
				// 		icon:'none'
				// 	})
				// }
				window.location.href=this.weiboUrl;  
			},
			//抖音
			douyinClick(){
				// let content = String(this.douyinUrl);
				// const result = h5Copy(content)
				// if (result === false) {
				// 	uni.showToast({
				// 		title:'不支持',
				// 	})
				// } else {
				// 	uni.showToast({
				// 		title:'复制成功',
				// 		icon:'none'
				// 	})
				// }
				window.location.href=this.douyinUrl;  
			},
			//公众号
			thePublicClick(){
				let content = String(this.publicUrl);
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title:'不支持',
					})
				} else {
					uni.showToast({
						title:"'甜宠号'已复制成功，请前往微信公众号搜索",
						icon:'none'
					})
				}
				// window.location.href=this.publicUrl;  
			}
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
	padding: 20upx;
}

</style>
