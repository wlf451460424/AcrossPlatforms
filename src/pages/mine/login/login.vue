<template>
	<view class="content">
		<view style="padding: 50upx;flex-direction: column">
			<view style="margin-top: 60upx;margin-bottom: 40upx;flex-direction: column">
				<text style="font-size: 50upx;font-weight: 700">{{pageName}}</text>
				<view style="width: 80%;height: 50upx;align-items: center;color: #b7b7b7">
					<text v-if="type == 0" >未注册手机验证后自动登录</text>
				</view>
			</view>
			<view style="width: 100%;height: 80upx;line-height: 80upx;border-bottom: 1px solid #f1f1f1;margin-bottom: 30upx">
				<view style="width: 20%;height: 100%;align-items: center">
					<text style="width: 100%;font-size: 14px;text-align: center">+86</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;padding-left: 40upx">
					<input @input="onKeyUserNameInput" type="number" value="" maxlength="11" placeholder="请输入手机号" style="width: 100%;font-size: 14px;color: #888888" />
				</view>
			</view>
			<view style="width: 100%;height: 80upx;line-height: 80upx;border-bottom: 1px solid #f1f1f1;margin-bottom: 30upx">
				<view style="width: 70%">
					<view style="width: 30%;height: 100%;align-items: center">
						<text style="width: 100%;font-size: 14px;text-align: center">验证码</text>
					</view>
					<view style="width: 70%;height: 100%;align-items: center;padding-left: 40upx">
						<input @input="onKeyCodeInput" type="number" value="" maxlength="6" placeholder="请输入验证码" style="width: 100%;font-size: 14px;color: #888888" />
					</view>
				</view>
				<view v-if="!timeView" @click="getCode" style="width: 30%;height: 100%;align-items: center;margin-left: 20upx;border-radius: 6upx">
					<text style="width: 100%;font-size: 14px;text-align: center;color: #f76d45">获取验证码</text>
				</view>
				<view v-if="timeView" style="width: 30%;height: 100%;align-items: center;margin-left: 20upx;border-radius: 6upx">
					<text style="width: 100%;font-size: 14px;text-align: center;color: #f76d45">{{timeNum}} s</text>
				</view>
			</view>
			
			
			<view @click="loginClick" style="margin-top: 30upx;width: 100%;height: 80upx;line-height: 80upx;background-color: #f76d45;border-radius: 6upx;font-size: 16px;color: #FFFFFF;justify-content: center">
				{{btnValue}}
			</view>
			
			<!-- <view style="margin-top: 40upx">
				<button @click="loginClick" type="primary" style="width: 100%;font-size: 16px; background-color: #f76d45">登录</button>
			</view> -->
			
			<view v-if="type == 2" style="width: 100%;align-items: center;color: #b7b7b7;margin-top: 20upx">
				温馨提示：应国家相关法律法规要求，使用互联网服务需进行账号实名。
			</view>
			
			<view v-if="type == 0" style="width: 100%;height:120upx;align-items: center;color: #b7b7b7">
				<view style="width: 100%;height: 100%;align-items: center;justify-content: flex-end">
					<text @click="goAccount_login">密码登录</text>
				</view>
			</view>
			
			<view v-if="type == 1" style="width: 100%;height:120upx;align-items: center;color: #b7b7b7">
				<view style="width: 100%;height: 100%;align-items: center;justify-content: flex-end">
					<text @click="contacCustomer">联系客服</text>
				</view>
			</view>
			
			<view style="flex-direction: row;width: 100%;height: 100upx;align-items: center;justify-content: center;color: #b7b7b7;font-size: 24upx">
				<text >注册即代表你同意</text>
				<text @click="PlatformAgree" style="color: #f76d45">《甜宠用户协议》</text> 与 
				<text @click="PrivacyAgreement" style="color: #f76d45">《甜宠隐私协议》</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				candidates:["+86","+886","+852","+853",],
				phone:'',
				code:'',
				timeView:false,
				timeNum:'',
				
				type:'',//免密登录 0； 找回密码 1； 绑定手机 2；
				pageName:'',
				btnValue:''
			}
		},
		onBackPress(e) {
			// // 这里可以自定义返回逻辑，比如下面跳转其他页面
			// uni.switchTab({
			// 	url: '../mine/index'
			// });
			// // return true 表示禁止默认返回
			// return true
		},
		onLoad() {
			this.type = uni.getStorageSync('typeLogin');//免密登录 0； 找回密码 1； 绑定手机 2；
			if(this.type == 0){
				uni.setNavigationBarTitle({
					title: '验证码登录'
				})
				this.pageName = '验证码登录'
				this.btnValue = '登录'
			}
			if(this.type == 1){
				uni.setNavigationBarTitle({
					title: '找回密码'
				})
				this.pageName = '找回密码'
				this.btnValue = '确定'
			}
			if(this.type == 2){
				uni.setNavigationBarTitle({
					title: '绑定手机'
				})
				this.pageName = '绑定手机'
				this.btnValue = '确定'
			}
		},
		methods: {
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
			goAccount_login(){
				uni.navigateTo({
					url:'account-login'
				})
			},
			onKeyUserNameInput: function(event) {  
				this.phone = event.target.value  
			}, 
			onKeyCodeInput: function(event) {  
				this.code = event.target.value  
			}, 
			getCode(){
				if(this.phone.length == 0){
					uni.showToast({
					    title: '请输入手机号',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				var re_1 = /^1\d{10}$/
				if( !re_1.exec(this.phone) ){
					uni.showToast({
					    title: '手机号格式有误',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				
				//发送验证码
				let param={}
				if(this.type == 0){ //验证码登录
					param={
						username: this.phone, 
						smsType: 1,  //发送类型(1: 登录--不进行用户是否存在验证  2：其他)
					}	
				}
				if(this.type == 1){ //找回密码
					param={
						username: this.phone, 
						smsType: 2,  //发送类型(1: 登录--不进行用户是否存在验证  2：其他)
					}	
				}
				if(this.type == 2){ //第三方登录绑定手机号
					param={
						username: this.phone, 
						smsType: 5,  //发送类型(1: 登录--不进行用户是否存在验证  2：其他)
						// #ifdef MP-WEIXIN
						thirdType :'wx',
						// #endif
						// #ifdef MP-QQ
						thirdType :'qqmini',
						// #endif
					}	
				}
				let opts={ url:'/portal/v1/sms/code', method:'POST' }
				// 发送请求
				this.http.httpRequestLogin(opts,param).then(
					res => {
						if(res.data.code == 200){
							//倒计时60s
							this.timeView = true
							this.timeNum = res.data.data;
							
							var second = res.data.data;
							this.timer = setInterval(() => {
								second = second - 1;
								this.timeNum = second;
								
								if (second <= 1) {
									second = 1;
									clearInterval()
									this.timeView = false
								}
								// console.log(second)
							}, 1000);
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
			
			loginClick(){
				// console.log(this.phone)
				if(this.phone.length == 0){
					uni.showToast({
					    title: '请输入手机号',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				var re_1 = /^1\d{10}$/
				if( !re_1.exec(this.phone) ){
					uni.showToast({
					    title: '手机号格式有误',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				if(this.code.length == 0){
					uni.showToast({
					    title: '请输入验证码',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				if(this.code.length < 6){
					uni.showToast({
					    title: '验证码格式有误',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				
				if(this.type == 0){
					//登录
					this.phone_login()
				}
				if(this.type == 1){
					//验证码验证  成功跳转设置密码
					let param={
						"username": this.phone,
						"validCode": this.code,
						"validType": this.type,   //"(1：找回密码 2：修改手机号 3：修改密码 4:绑定手机号)
					}
					let opts={ url:'/portal/v1/phone/valid', method:'POST' }
					// 发送请求
					this.http.httpRequestLogin(opts,param).then(
						res => {
							// console.log(res.data);
							if(res.data.code == 200){
								uni.setStorageSync('phone', this.phone);
								//设置密码页面
								uni.navigateTo({
									url:"setPassword"
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
				if(this.type == 2){
					//验证码验证  成功跳转设置密码
					let param={
						"username": this.phone,
						"validCode": this.code,
						"validType": 4,   //"(1：找回密码 2：修改手机号 3：修改密码 4:绑定手机号)
					}
					let opts={ url:'/portal/v1/phone/valid', method:'POST' }
					// 发送请求
					this.http.httpRequestLogin(opts,param).then(
						res => {
							// console.log(res.data);
							if(res.data.code == 200){
								//绑定手机号
								let param={
									"userPhoneNumber": this.phone,
									// #ifdef MP-WEIXIN
									"thirdType" :'wx',
									// #endif
									// #ifdef MP-QQ
									"thirdType" :'qqmini',
									// #endif
								}
								let opts={ url:'/portal/v1/bind/phone', method:'POST' }
								// 发送请求
								this.http.httpTokenRequest(opts,param).then(
									res => {
										// console.log(res.data);
										if(res.data.code == 200){
											uni.showToast({
											    title: '绑定成功',
												icon: 'none',
											    duration: 1000
											});
											if(res.data.data == 0){ //0 正常绑定 1代表用户合并
												//获取 登录用户信息
												this.getUserInfo()
											}else{ 
												uni.setStorageSync('userInfo','');
												uni.setStorageSync('token','');
												uni.setStorageSync('refresh_token','');
												//跳转页面
												uni.navigateTo({
													url:'account-login'
												})
											}
										}else{
											uni.showToast({
											    title: res.data.msg,
												icon: 'none',
											    duration: 1000
											});
										}
									}
								);
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
			},
			
			phone_login(){
				//登录
				let param={ 
					"loginType": "mobile", //mobile;  username;
					"password":  this.code, // 验证码; 	用户密码
					"username": this.phone,
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
							// 清空验证码
							// this.$refs.code.clear();
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
							if(this.type == 2){
								//跳转页面
								uni.switchTab({
									url:'/pages/tab-mine/index'
								})
								return;
							}
							if(res.data.data.flag){
								//跳转页面
								uni.switchTab({
									url:'/pages/tab-mine/index'
								})
							}else{
								//设置密码页面
								uni.navigateTo({
									url:"setPassword"
								})
							}
						}else{uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
			},
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

/* 定位底部 */
.position-bottom{
    flex: 1 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

</style>
