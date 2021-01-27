<template>
	<view class="content">
		<view style="z-index: 2;padding: 20upx 60upx;flex-direction: column;">
			<view style="width: 100%;">
				<view style="margin-right: 20upx;">
					<image style="width: 60upx;height: 70upx;" src="@/static/mine-ico/applay_01.png"></image>
				</view>
				<view style="flex-direction: column;">
					<text style="font-size: 28upx;">填写信息</text>
					<text style="font-size: 24upx;">填写认证信息，发布信息；</text>
					<text style="font-size: 24upx;">确认服务协议</text>
				</view>
			</view>
			<view style="width: 100%;margin-top: 30upx;">
				<view style="margin-right: 20upx;">
					<image style="width: 60upx;height: 70upx;" src="@/static/mine-ico/applay_02.png"></image>
				</view>
				<view style="flex-direction: column;">
					<text style="font-size: 28upx;">等待审核</text>
					<text style="font-size: 24upx;">2-3个工作日内反馈审核结果；</text>
					<text style="font-size: 24upx;">进入个人主页-我的服务-寄养/领养/配对页面，</text>
					<text style="font-size: 24upx;">查看审核进度，及时修改或进入下一步</text>
				</view>
			</view>
			<view style="width: 100%;margin-top: 30upx;">
				<view style="margin-right: 20upx;">
					<image style="width: 60upx;height: 70upx;" src="@/static/mine-ico/applay_02.png"></image>
				</view>
				<view style="flex-direction: column;">
					<text style="font-size: 28upx;">成功</text>
					<text style="font-size: 24upx;">用户评分越高，店铺的曝光率就越高</text>
				</view>
			</view>
			
			<view style="flex-direction: column;width: 100%;align-items: center;margin-top: 60upx;">
				<text @click="applayBtn" style="width: 100%;height: 80upx;line-height: 80upx;color: #FFFFFF;font-size: 32upx;text-align: center;background-color: #f76d45;border-radius: 50upx;">{{btn_content}}</text>
			</view>
		</view>
		
		<view style="z-index: 1;width: 100%;position: absolute;bottom: 0;">
			<image v-bind:style="{width: imageWidth + 'px'}" mode="scaleToFill" src="@/static/down-pic.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageWidth: uni.getSystemInfoSync().windowWidth * 2,//图片宽度  
				btn_content:'',
			}
		},
		onLoad(e) {
			if(e.id == 0){
				uni.setNavigationBarTitle({
				    title: '申请入驻'
				});
				this.btn_content = "立即申请"
			}
			if(e.id == 1){
				uni.setNavigationBarTitle({
				    title: '发布送养'
				});
				this.btn_content = "立即发布"
			}
			if(e.id == 2){
				uni.setNavigationBarTitle({
				    title: '发布配对'
				});
				this.btn_content = "立即发布"
			}
		},
		methods: {
			applayBtn(){
				// #ifdef H5
				// this.calculation.wakeUp_app('toMain/main')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("mianDetails",{})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.showToast({
				    title: '请前往APP端进行认证',
					icon: 'none',
				    duration: 2000
				});
				//  #endif
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
.content {
	flex-direction: column;
	color: #5c5f66;
	font-size: 14px;
	width: 100%;
	background-color: #FFFFFF;
	margin-top: 2upx;
}

</style>
