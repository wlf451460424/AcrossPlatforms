<template>
	<view class="content">
		<textarea id="profile_input" @input="uniPopupInput_onKeyInput" :value="default_text"
			style="width: 100%;height: 240upx;font-size:24upx;line-height: 50upx;background-color: #FFFFFF;padding: 10upx 20upx;"/>
		
		<view style="width: 100%;justify-content: center;align-items: center;color: #FFFFFF;padding:40upx;">
			<view @click="save" style="width: 100%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
				<text>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				profile_input:"",
				default_text:''
			}
		},
		onLoad(e) {
			this.default_text = e.p
		},
		methods: {
			uniPopupInput_onKeyInput: function(event) {
				this.profile_input = event.target.value
			},
			save(){
				if(this.profile_input == ""){
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
					return;
				}
				//修改用户信息  个人简介
				let param={ userProfile: this.profile_input}
				let str = '/portal/v1/update/profile'
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.navigateTo({
								url:'index'
							})
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
			}
		}
	}
</script>

<style lang='scss' scoped> 
	template {
		display: flex;
		flex: 1;
	}
	page {
		display: flex;
		min-height: 100%;
		background-color: #f9f9f9;
	}
	view {
		display: flex;
	}
	.content {
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: 12px;
		color: #5c5f66;
		margin-top: 2upx;
	}
</style>
