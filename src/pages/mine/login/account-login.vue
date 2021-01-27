<template>
	<view class="content">
		<!-- #ifdef H5 || MP-TOUTIAO || MP-BAIDU  -->
		<view style="padding: 50upx;flex-direction: column;">
			<view style="margin-top: 60upx;margin-bottom: 50upx;">
				<text style="font-size: 50upx;font-weight: 700;">密码登录</text>
			</view>
			<view style="flex-direction: column;width: 100%;line-height: 80upx;">
				<view style="width: 100%;height: 80upx;align-items: center;margin-bottom: 30upx;border-bottom: 1px solid #f5f5f5;">
					<input @input="onKeyInput_account" type="text" value="" maxlength="15" placeholder="请输手机号或甜宠号" style="width: 100%;font-size: 14px;color: #888888;padding-left: 20upx;" />
				</view>
				<view style="width: 100%;height: 80upx;align-items: center;margin-bottom: 30upx;border-bottom: 1px solid #f5f5f5;">
					<input @input="onKeyInput_password" password="true" type="text" value="" maxlength="32" placeholder="请输入密码" style="width: 100%;font-size: 14px;color: #888888;padding-left: 20upx;" />
				</view>
			</view>
			<view @click="loginClick" style="margin-top: 30upx;width: 100%;height: 80upx;line-height: 80upx;background-color: #f76d45;border-radius: 6upx;font-size: 16px;color: #FFFFFF;justify-content: center;">
				登录
			</view>
			
			<view style="width: 100%;height: 120upx;align-items: center;color: #b7b7b7;">
				<view style="width: 50%;height: 100%;align-items: center;">
					<text @click="etrievePasswordClick">忘记密码？</text>
				</view>
				<view style="width: 50%;height: 100%;align-items: center;justify-content: flex-end;">
					<text @click="go_login" >验证码登录</text>
				</view>
			</view>
			
			<view style="flex-direction: row;width: 100%;height: 100upx;align-items: center;justify-content: center;color: #b7b7b7;font-size: 24upx;">
				<text >注册即代表你同意</text>
				<text @click="PlatformAgree" style="color: #f76d45;">《甜宠用户协议》</text> 与 
				<text @click="PrivacyAgreement" style="color: #f76d45;">《甜宠隐私协议》</text>
			</view>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN || MP-QQ -->
		<view v-if="isCanUse" style="margin-top: 100upx;padding: 40upx 40upx;flex-direction: column;">
			<view style="width: 100%;height: 270upx;justify-content: center;">
				<image style="width: 170upx;height: 170upx;border-radius: 170upx;" src='@/static/logo.jpg'></image>
			</view>
			<view style="width: 100%;flex-direction: column;margin-bottom: 40upx;">
				<view style="line-height: 70upx;font-size: 32upx;">申请获取以下权限</view>
				<view style="line-height: 70upx;color: #CCCCCC;">获得你的公开信息(昵称，头像、地区等)</view>
			</view>
			<button @getuserinfo="wxGetUserInfo" open-type="getUserInfo" type='primary'  withCredentials="true" lang="zh_CN" style="width: 100%;border-radius: 6px;">
				确认登录
			</button>
			<view style="flex-direction: row;width: 100%;height: 80upx;align-items: center;color: #CCCCCC;font-size: 24upx;margin-top: 40upx;">
				<text >注册即代表你同意</text>
				<text @click="PlatformAgree" style="color: #f76d45;">《甜宠用户协议》</text> 与 
				<text @click="PrivacyAgreement" style="color: #f76d45;">《甜宠隐私协议》</text>
			</view>
			<!-- <view @click="contacCustomer" style="width: 100%;height: 100upx;justify-content: center;align-items: center;color: #CCCCCC;">联系客服</view> -->
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				account:"",
				password:"",
				
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse')||true,//默认为true
			}
		},
		onLoad() {//默认加载
			// #ifdef H5
			//设置标题
			uni.setNavigationBarTitle({
				title: "密码登录"
			});
			// #endif
			// #ifdef MP-WEIXIN
			//设置标题
			uni.setNavigationBarTitle({
			    title: "微信登录"
			});
			this.login();
			// #endif
			// #ifdef MP-QQ
			//设置标题
			uni.setNavigationBarTitle({
			    title: "QQ登录"
			});
			this.login();
			// #endif
		},
		methods: {
			contacCustomer(){
				_MEIQIA('showPanel');
			},
			PlatformAgree(){
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=15'
				})
			},
			PrivacyAgreement(){
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=18'
				})
			},
			go_login(){
				//免密登录 0； 找回密码 1； 绑定手机 2；
				uni.setStorageSync('typeLogin', 0);
				uni.navigateTo({
					url:'login'
				})
			},
			onKeyInput_account: function(event) {
				this.account = event.target.value  
			},
			onKeyInput_password: function(event) {
				this.password = event.target.value  
			},
			etrievePasswordClick(){
				//免密登录 0； 找回密码 1； 绑定手机 2；
				uni.setStorageSync('typeLogin', 1);
				
				//跳转页面
				uni.navigateTo({
					url:"login"
				})
			},
			loginClick(){
				if(this.account.length == 0){
					uni.showToast({
					    title: '账号不能为空',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				
				if(this.password.length == 0){
					uni.showToast({
					    title: '密码不能为空',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				
				//登录
				let param={ 
					"loginType": "username",  //mobile;  username;
					"password":  md5(this.password),
					"username": this.account,
				}
				let opts={ url:'/portal/v1/login/token', method:'POST' }
				// 发送请求
				this.http.httpRequestLogin(opts,param).then(
					res => {
						// console.log(res.data);
						if(res.data.code == 200){
							uni.setStorageSync('token', res.data.data.access_token);
							uni.setStorageSync('refresh_token', res.data.data.refresh_token);
							//获取当前登录用户信息
							this.getUserInfo();
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
			//获取 登录用户信息
			getUserInfo(){
				let param={}
				let opts={ url:'/portal/v1/current', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//本地缓存 个人信息
							uni.setStorageSync('userInfo', res.data.data);
							// //跳转页面
							// uni.switchTab({
							// 	url:'/pages/tab-mine/index'
							// })
							uni.navigateBack({});
						}
					}
				)
			},
			
　　　　　　	//登录
			login() {
				let _this = this;
				// 1.wx获取登录用户code
				uni.login({
					// #ifdef MP-WEIXIN
					provider: 'weixin',
					// #endif
					// #ifdef MP-QQ
					provider: 'qq',
					// #endif
					success: function(loginRes) {
						console.log(loginRes)
						let code = loginRes.code;
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								// #ifdef MP-WEIXIN
								provider: 'weixin',
								// #endif
								// #ifdef MP-QQ
								provider: 'qq',
								// #endif
								success: function(infoRes) {
	　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
									_this.nickName = infoRes.userInfo.nickName; //昵称
									_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
									_this.updateUserInfo();//调用更新信息方法
								}
							});
						}
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						// let param={"code":code,}
						// #ifdef MP-WEIXIN
						let param={
							"code":code,
							"type":"wx"
						}
						// #endif
						// #ifdef MP-QQ
						let param={
							"code":code,
							"type":"qqmini"
						}
						// #endif
						let opts={ url:'/portal/v1/miniprogram/authorize', method:'POST' }
						_this.http.httpTokenRequest(opts,param).then(
							res => {
								console.log(res.data)
								if(res.data.code == 200){
									_this.OpenId = res.data.data
									uni.setStorageSync('OpenId', res.data.data);
									// _this.wxGetUserInfo()
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1000
									});
								}
							}
						)
					},
				});
			},
			//授权获取用户信息
			wxGetUserInfo() {
				if(!this.OpenId){
					return;
				}
				uni.showLoading({
					title: '登录中...'
				});
				let _this = this;
				uni.getUserInfo({
					// #ifdef MP-WEIXIN
					provider: 'weixin',
					// #endif
					// #ifdef MP-QQ
					provider: 'qq',
					// #endif
					success: function(infoRes) {
						uni.hideLoading();
						_this.nickName = infoRes.userInfo.nickName; //昵称
						_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
						try {
							uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			//向后台更新信息
			updateUserInfo() {
				//登录
				let param={ 
					"password": md5('666666'),
					"thirdToken": "",
					// "loginType": "wx",
					
					// #ifdef MP-WEIXIN
					"loginType": "wx",
					// #endif
					// #ifdef MP-QQ
					"loginType": "qqmini",
					// #endif
					
					"openId": this.OpenId,
					"username": this.OpenId,
					"nickname":this.nickName,
					"avatar":this.avatarUrl,
				}
				let opts={ url:'/portal/v1/login/token', method:'POST' }
				// 发送请求
				this.http.httpRequestLogin(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.setStorageSync('token', res.data.data.access_token);
							uni.setStorageSync('refresh_token', res.data.data.refresh_token);
							
							//微信登陆是否有手机号  没有的话  强制绑定手机号
							let param={}
							let opts={ url:'/portal/v1/current', method:'POST' }
							this.http.httpTokenRequest(opts,param).then(
								res => {
									if(res.data.code == 200){
										//本地缓存 个人信息
										uni.setStorageSync('userInfo', res.data.data);
										// #ifdef MP-QQ
										//跳转页面
										uni.switchTab({
											url:'/pages/tab-mine/index'
										})
										// #endif
										// #ifndef MP-QQ
										if(res.data.data.userPhoneNumber != ""){
											//跳转页面
											uni.switchTab({
												url:'/pages/tab-mine/index'
											})
										}else{
											//免密登录 0； 找回密码 1； 绑定手机 2；
											uni.setStorageSync('typeLogin', 2);
											uni.navigateTo({
												url:'login'
											})
										}
										// #endif
									}
								}
							)
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
	background-color: #FFFFFF;
}

template {
	display: flex;
	flex: 1;
}
.content {
	flex-direction: column;
	color: #000000;
	font-size: 14px;
	width: 100%;
}	

</style>
