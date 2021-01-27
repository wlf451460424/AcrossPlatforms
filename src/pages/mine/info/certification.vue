<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;margin-top: 10upx;background-color: #FFFFFF;padding: 20upx;margin-bottom: 20upx;">
			<view style="width: 100%;flex-direction: column;">
				<text style="font-weight: bold;margin-bottom: 20upx;">我的认证：</text>
				<view @click="gotoApp" style="width: 100%;border: 2upx solid #AAAAAA;padding:40upx 20upx;">
					<text style="width: 30%;font-weight: bold;">身份证认证</text>
					<text style="width: 70%;font-weight: bold;text-align: right;">
						{{authenticationArr[authenticationData.userAuthenticationIdResult+1]}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authenticationData:Object,
				authenticationArr:["未认证","待审核","认证失败","认证成功"], //-1：未上传 0：待审核 1: 认证失败  2:  认证成功
			}
		},
		async onLoad() {
			//查询当前用户认证信息
			let param={}
			let opts={ url:'/portal/v1/user_authentication/get/authentication', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.authenticationData = res.data.data
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});		
					}
				}
			);
		},
		methods: {
			
		}
	}
</script>

<style lang='scss' scoped>
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #f9f9f9;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	view {
	    display: flex;
	}
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
</style>
