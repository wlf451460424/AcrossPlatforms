<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%; padding: 30upx 30upx;">
				<text style="height: 80upx;line-height: 80upx;background-color: #f1e9e9;margin-bottom: 6upx;">举报理由</text>
				<view style="width: 100%;height: 80upx;align-items: center;border: 1px solid #b7b7b7;margin-bottom: 40upx;" >
					<input @input="Input_onKeyInput" id="title" :value="title" disabled="disabled" style="width: 100%;font-size: 12px;color: #888888;" maxlength="40" placeholder="" />
				</view>
				
				<text style="height: 80upx;line-height: 80upx;background-color: #f1e9e9;margin-bottom: 6upx;">举报描述<text style="padding-left: 30upx;color: #FF0000;">*(必填)</text></text>
				<textarea @input="Input_onKeyInput" id="content" :value="content" placeholder="提供更多信息,有助举报被快速处理" maxlength="500" style="width: 100%;height: 240upx;font-size:12px;color: #888888;line-height: 50upx;border: 1px solid #b7b7b7;margin-bottom: 40upx;"/>
				
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
				
				reportTargetId:'',//举报对象ID
				reportTargetType:'',//举报对象type
			}
		},
		onLoad(e) {
			this.title = e.title
			this.reportTargetId = e.id;
			this.reportTargetType = e.type;
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
				}
			}, 
			save(){
				if(!this.content){
					uni.showToast({
						icon: "none",
						title: "举报描述不能为空"
					})
					return;
				}
				
				// 添加反馈表数据
				let param={
					"reportImage": "",
					"reportDescription": this.content,
					"reportReason": this.title,
					"reportTargetId": this.reportTargetId,   //举报对象ID
					"reportTargetType": this.reportTargetType, //举报对象类型  0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复
				} 
				let opts={ url:'/portal/v1/report/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.showToast({
								icon: "success",
								title: "提交成功"
							})
							this.title =""
							this.content=""
							uni.navigateBack();  
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
	color: #000000;
	font-size: 14px;
	width: 100%;
}

</style>
