<template>
	<view class="content">
		<view style="margin-top: 60upx;margin-bottom: 50upx;">
			<text style="font-size: 50upx;font-weight: 700;">设置密码</text>
		</view>
		<view style="flex-direction: column;width: 100%;line-height: 100upx;">
			<view style="width: 100%;height: 80upx;align-items: center;margin-bottom: 30upx;border-bottom: 1px solid #f5f5f5;">
				<input @input="onKeyInput_1" password="true" type="text" value="" maxlength="32" placeholder="输入密码" style="width: 100%;font-size: 14px;color: #888888;padding-left: 20upx;" />
			</view>
			<view style="width: 100%;height: 80upx;align-items: center;margin-bottom: 30upx;border-bottom: 1px solid #f5f5f5;">
				<input @input="onKeyInput_2" password="true" value="" maxlength="32" placeholder="确认密码" style="width: 100%;font-size: 14px;color: #888888;padding-left: 20upx;" />
			</view>
			
		</view>
		<view style="width: 100%;">
			<text style="width: 100%;color: #b7b7b7;font-size: 12px;">密码长度6~16个字符，区分大小写</text>
		</view>
		<view style="margin-top: 30upx;">
			<button @click="loginClick" type="primary" style="width: 100%;font-size: 32upx;height: 80upx;line-height: 80upx; background-color: #f76d45;">确认</button>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				password_1:"",
				password_2:""
			}
		},
		onLoad() {
			this.type = uni.getStorageSync('typeLogin');//免密登录 0； 找回密码 1； 绑定手机 2；
		},
		methods: {
			onKeyInput_1: function(event) {  
				this.password_1 = event.target.value  
			},
			onKeyInput_2: function(event) {
			 	this.password_2 = event.target.value  
			},
			loginClick(){
				//1.验证上下是否一致
				if(this.password_1 != this.password_2){
					uni.showToast({
					    title: '两次密码输入不一致',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				//2.验证长度是否符合  6~16
				if(this.password_1.length < 6 || this.password_1.length >16 ){
					uni.showToast({
					    title: '密码长度8~16位',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				//2.验证 规则是否正确
				
				// 字母+数字，字母+特殊字符，数字+特殊字符
				// ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
				// 弱：纯数字，纯字母，纯特殊字符
				// ^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$
				
				var patrn = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/
				var value = !patrn.exec(this.password_1)
				if (!value) {
					uni.showToast({
					    title: '密码须包含数字，字母，符号至少两种',
						icon: 'none',
					    duration: 1000
					});
					return
				}
				let param={}
				let opts={}
				//免密登录 0； 找回密码 1； 绑定手机 2；
				if(this.type == 1){
					//找回 当前用户密码
					param={ 
						"password": md5(this.password_1),
						"passwordConfirm": md5(this.password_2),
						"username": uni.getStorageSync('phone')
					}
					opts={ url:'/portal/v1/recover/password', method:'POST'}
					// 发送请求
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								// //跳转页面
								// uni.switchTab({
								// 	url:"/pages/tab-mine/index"
								// })
								
								//修改密码成功  直接默认登录
								let param={ 
									"loginType": "username",  //mobile;  username;
									"password":  md5(this.password_1),
									"username": uni.getStorageSync('phone'),
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
				//免密登录 0； 找回密码 1； 绑定手机 2；
				if(this.type == 2 || this.type == 0){
					//  设置/修改   当前用户密码
					param={ 
						"password": md5(this.password_1),
						"passwordConfirm": md5(this.password_2),
					}
					opts={ url:'/portal/v1/update/password', method:'POST' }
					// 发送请求
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								//跳转页面
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
							//跳转页面
							uni.switchTab({
								url:'/pages/tab-mine/index'
							})
						}
					}
				)
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
	padding: 50upx;
}	

</style>
