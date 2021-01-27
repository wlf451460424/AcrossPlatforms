<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view @click="tipClick" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>帮助中心</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view>
			<view @click="problemClick" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>问题反馈</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view @click="contacCustomer" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>联系客服</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view>
			<!-- #endif -->
			<!-- <view @click="clearData" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>清除缓存</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 28upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view> -->
			<!-- <view @click="agreementClick" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>用户协议</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 28upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view> -->
			<view @click="aboutClick" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>关于我们</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view>
		</view>
		
		<view style="flex-direction: column;width: 100%;margin-top: 20upx;padding: 20upx;" @click="loginoutClick">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #f76d45;border-radius: 10upx;">
				<view style="width: 100%;height: 100%;align-items: center;justify-content: center;">
					<text style="font-size: 36upx;color: #FFFFFF;font-weight: 600;">退出登录</text>
				</view>
			</view>
		</view>	
		
		<uniPopup ref="app_uniPopup" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-content" >确认要退出登录吗？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" style="color: #f76d45;" @click="cancel()">取消</text>
					<text class="uni-tip-button" style="color: #f76d45;" @click="confirm()">确定</text>
				</view>
			</view>
		</uniPopup>
		
	</view>
</template>

<script>
	 
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			//联系客服
			contacCustomer(){
				_MEIQIA('clientId',uni.getStorageSync('userInfo').userId);
				_MEIQIA('metadata', {
				    address:uni.getStorageSync('userInfo').userAddress,
					age:uni.getStorageSync('userInfo').userAge,
					comment:uni.getStorageSync('userInfo').userProfile,
					gender:uni.getStorageSync('userInfo').userGender==0?'男':'女',
					name:uni.getStorageSync('userInfo').userNickname,
					tel:uni.getStorageSync('userInfo').userPhoneNumber
				});
				_MEIQIA('showPanel');
			},
			//问题反馈
			problemClick(){
				uni.navigateTo({
					url:'feedback'
				})
			},
			//小技巧
			tipClick(){
				// uni.navigateTo({
				// 	url:'tip'
				// })
				uni.navigateTo({
					url:'../agree/index?type=19'
				})
			},
			//协议
			agreementClick(){
				uni.navigateTo({
					url:'../agree/index?type=15'
				})
			},
			aboutClick(){
				uni.navigateTo({
					url:'about'
				})
			},
			clearData(){
				// console.log(window.localStorage.getItem("vuejs__token") )
				// window.localStorage.removeItem("userInfo")
				window.localStorage.clear()
				uni.showToast({
				    title: '清理中',
					icon: 'loading',
				    duration: 2000,
					mask:true
				});
				setTimeout(()=>{
					uni.showToast({
					    title: '清理完成',
						icon: 'success',
					    duration: 1000,
						mask:true
					});
				}, 2000)
			},
			loginoutClick(){
				this.$refs.app_uniPopup.open()
			},
			cancel(){
				this.$refs.app_uniPopup.close()
			},
			confirm(){
				this.$refs.app_uniPopup.close()
				this.loginout()
			},
			loginout(){
				// 退出登录
				let param={ token:uni.getStorageSync('token') }
				let opts={ url:'/portal/v1/logout/token', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// console.log(res.data);
						if(res.data.code == 200){
							uni.setStorageSync('userInfo','');
							// uni.setStorageSync('token', '');
							uni.removeStorageSync('token');
							uni.removeStorageSync('refresh_token');
							uni.switchTab({
								url:"/pages/tab-mine/index"
							})
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				);
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
}
</style>
