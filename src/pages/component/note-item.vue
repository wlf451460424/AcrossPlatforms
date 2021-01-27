<template>
	<view class="content">
		<!-- 笔记 -->
		<view @click="goActionItem_Details(item)" style="width: 100%;flex-direction: column;background-color: #FFFFFF;border-radius:4upx;">
			<!-- <image :src="postImageArr[0]?decodeURIComponent(postImageArr[0]):base_default"  mode="aspectFill" style="width: 100%; height: 410upx; border-radius: 4upx; "></image> -->
			
			<view v-if="postImageArr[0]" style="position: relative;width:100%; height:410upx; padding: 6upx;border-radius: 4upx;">
				<image :src="decodeURIComponent(postImageArr[0]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				<view v-if="postImageGifArr[0] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
					<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
				</view>
			</view>
			
			<view v-if="item.postContentType === 1" style="z-index: 2;position: absolute;background: rgba(0,0,0,0.5);width: 48%; height: 410upx;align-items:center;justify-content: center;">
				<image style="width: 50upx;height: 50upx;" src="@/static/play.png"></image>
			</view>
			
			<view style="flex-direction: column;">
				<text v-if="item.postTitle" style="padding:0 12upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
					{{item.postTitle}}
				</text>
				<view style="flex-direction: row; width: 100%;padding:12upx;">
					<view style="width: 60%;align-items: center;">
						<image :src="decodeURIComponent(item.postUserAvatar)" style="width: 50upx;height: 50upx;border-radius: 25upx;"></image>
						<text v-if="item.postUserNickname" style="width: calc(100% - 60upx);;margin-left: 10upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{item.postUserNickname}}
						</text>
					</view>
					<view style="width: 40%;align-items: center;justify-content: flex-end;">
						<image src="@/static/actionImg/thumbsup.png" style="width: 28upx;height: 28upx;"></image>
						<text style="margin-left: 4upx;color: #AAAAAA;line-height: 24upx;height: 20upx;font-size: 24upx;">
							{{item.postUpvoteCount}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default{
		data(){
			return {
				avatarUrl_default:"../../static/header_default.png",
				base_default:"../../static/default_item.png",
				item:{},
				postImageArr:[],
				postImageGifArr:[],
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			this.item = this.receiveObj.obj
			this.postImageArr = this.receiveObj.obj.postImage.toString().split(",")
			
			for( var j=0;j<this.postImageArr.length;j++){
				if(this.postImageArr[j]){
					this.postImageArr[j] = decodeURIComponent(this.postImageArr[j]).split("?")[0]
					if(this.postImageArr[j].indexOf(".gif") != -1){
						this.postImageGifArr.push("1")
					}else{
						this.postImageGifArr.push("0")
					}
				}
			}
		},
		methods: {
			//同城详情跳转
			goActionItem_Details(item) {
				if(item.postAuditStatus != 1){
					uni.showToast({
					    title: '正在审核中，请稍后点击查看',
						icon: 'none',
					    duration: 2000
					});
					return;
				}
				
				if(item.postType == 0 ){//文章
					uni.navigateTo({
						url:this.navigatorUrl.articleDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 1){//笔记
					uni.navigateTo({
						url:this.navigatorUrl.noteDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 2){//动态
					uni.navigateTo({
						url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 3){//问答
					uni.navigateTo({
						url:this.navigatorUrl.qaDetailsPages + '?id=' + item.postId
					})
				}
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
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
	}
</style>
