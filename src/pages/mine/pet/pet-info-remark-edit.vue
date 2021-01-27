<template>
	<view class="content">
		<textarea id="remark_input" @input="uniPopupInput_onKeyInput"
		style="width: 100%;height: 240upx;font-size:12px;color: #5c5f66;line-height: 50upx;background-color: #FFFFFF;padding: 10upx 20upx;"/>
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
				remark_input:"",
				petData:Object
			}
		},
		onLoad(e) {
			this.petData = JSON.parse(decodeURIComponent(e.petData));
		},
		methods: {
			uniPopupInput_onKeyInput: function(event) {
				this.remark_input = event.target.value
			},
			save(){
				if(this.remark_input == ""){
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
					return;
				}
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"petRemark": this.remark_input} 
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.navigateTo({
								url:"pet-info-edit?petData=" + encodeURIComponent(JSON.stringify(this.petData))
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
