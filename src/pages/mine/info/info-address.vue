<template>
	<view class="content">
		<textarea id="address_input" @input="uniPopupInput_onKeyInput" :value="default_text" placeholder="填写详细地址,便于使用服务相关内容"
			style="width: 100%;height: 240upx;font-size:24upx;line-height: 50upx;background-color: #FFFFFF;padding: 10upx 20upx;"/>
		<text v-if="default_text" style="padding: 20upx;color: #b7b7b7;font-size: 24upx;">填写详细地址,便于使用服务相关内容</text>
		<!-- <text style="padding: 20upx 40upx;color: #b7b7b7;">0~50个字符</text> -->
		
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
				address_input:"",
				default_text:''
			}
		},
		onLoad(e) {
			this.default_text = e.p
		},
		methods: {
			uniPopupInput_onKeyInput: function(event) {
				this.address_input = event.target.value
			},
			save(){
				if(this.address_input == ""){
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
					return;
				}
				//修改用户信息  地址
				let param={ userAddress: this.address_input}
				let str = '/portal/v1/update/address'
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
