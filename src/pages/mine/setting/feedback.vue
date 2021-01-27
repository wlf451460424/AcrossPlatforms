<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%; padding: 30upx 30upx;">
				<text style="height: 80upx;line-height: 80upx;margin-bottom: 6upx;">标题<text style="padding-left: 30upx;color: #FF0000;">*(必填)</text></text>
				<view style="width: 100%;height: 80upx;align-items: center;border: 2upx solid #F9F9F9;margin-bottom: 40upx;" >
					<input @input="Input_onKeyInput" id="title" :value="title" style="width: 100%;font-size: 24upx;color: #888888;padding-left: 10upx;" maxlength="40" placeholder="填写标题" />
				</view>
				
				<text style="height: 80upx;line-height: 80upx;margin-bottom: 6upx;">问题意见<text style="padding-left: 30upx;color: #FF0000;">*(必填)</text></text>
				<textarea @input="Input_onKeyInput" id="content" :value="content" placeholder="请详细描述你们的问题和意见" maxlength="500" style="width: 100%;height: 240upx;font-size:24upx;color: #888888;line-height: 50upx;border: 2upx solid #F9F9F9;margin-bottom: 40upx;padding: 10upx;"/>
				
				<text style="height: 80upx;line-height: 80upx;margin-bottom: 6upx;">QQ/邮箱/电话</text>
				<view style="width: 100%;height: 80upx;align-items: center;border: 2upx solid #F9F9F9;margin-bottom: 6upx;" >
					<input @input="Input_onKeyInput" id="tel" :value="tel" style="width: 100%;font-size: 24upx;color: #888888;padding-left: 10upx;" maxlength="40" placeholder="选填,方便我们联系到您" />
				</view>
				
				<view @click="save" style="width: 100%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;color: #FFFFFF;margin-top: 60upx;">
					<text>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</text>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				content:'',
				tel:''
			}
		},
		methods: {
			Input_onKeyInput: function(event) {
				// this.type = event.target.value
				switch (event.target.id) {
					case 'title':
						this.title = event.target.value
						break
					case 'content':
						this.content = event.target.value
						break
					case 'tel':
						this.tel = event.target.value
						break
				}
			}, 
			save(){
				if(!this.title){
					uni.showToast({
						icon: "none",
						title: "标题不能为空"
					})
					return;
				}
				if(!this.content){
					uni.showToast({
						icon: "none",
						title: "内容不能为空"
					})
					return;
				}
				
				// 添加反馈表数据
				let param={
					"feedbackTitle": this.title,
					"feedbackContent": this.content,
					"feedbackContactInformation": this.tel,
					"feedbackImage":''
				} 
				let opts={ url:'/portal/v1/feedback/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.showToast({
								icon: "success",
								title: "提交成功"
							})
							this.title =""
							this.content=""
							this.tel=""
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
	color: #5c5f66;
	font-size: 14px;
	width: 100%;
}

</style>
