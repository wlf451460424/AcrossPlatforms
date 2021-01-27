<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;margin-top: 12upx;">
			<view v-for="(item,index) in list" :key="index"
				@click="itemClick(item.title)" style="flex-direction: row;width: 100%;height: 100upx;line-height: 100upx;border-bottom: 1px solid #c8c7cc;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 70%;height: 100%;align-items: center;">
					<text>{{item.title}}</text>
				</view>
				<view style="width: 30%;height: 100%;justify-content: flex-end;">
					<image style="width: 16upx;height: 26upx;" src="/static/mine-ico/next.png">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{title:"广告内容"},
					{title:"搬运抄袭"},
					{title:"不友善内容"},
					{title:"造谣，伪科学"},
					{title:"虚假互动数据"},
					{title:"色情低俗"},
					{title:"违规违法"},
					{title:"其他"},
				],
				reportTargetId:'',//举报对象ID
				reportTargetType:'',//举报对象type
			}
		},
		onLoad(e) {
			this.reportTargetId = e.id;
			this.reportTargetType = e.type;
		},
		methods:{
			//问题反馈
			itemClick(value){
				uni.navigateTo({
					url:'report-submit?title=' + value +'&id=' + this.reportTargetId +'&type=' + this.reportTargetType
				})
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
