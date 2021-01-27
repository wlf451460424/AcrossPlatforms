<template>
	<view class="content">
		<!-- 文章 -->
		<view style="flex-direction:column;width: 100%;padding:12upx 20upx; background-color: #FFFFFF;margin-bottom:8upx;" >
			<view style="flex-direction: row;">
				<view style="width:100%;">
					<image  @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.postUserAvatar)"  style="width: 76upx;height: 76upx;border-radius: 50upx;"></image>
					<view @click="goActionItem_Details(item)" style="flex-direction: column; margin-left: 20upx;width: 80%;">
						<view style="width: 100%;align-items: center;line-height: 40upx;">
							<text v-if="item.postUserNickname" style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.postUserNickname}}
							</text>
							<image v-if="item.subjectInformationName" style="width: 30upx;height: 30upx;margin-left:20upx;margin-right: 6upx;" src="../../static/badge.png"></image>
							<text v-if="item.subjectInformationName" style="color: #b7b7b7;font-size: 20upx;">{{item.subjectInformationName}}</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text>{{item.timerAgo}}</text>
							<text v-if="item.postSource" style="margin-left: 20upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								来自{{item.postSource}}
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<view @click="goActionItem_Details(item)" style="width: 100%;margin-top: 12upx;">
				<view style="flex-direction: column; min-width: 75%;height: 100%;">
					<view style="width: 100%;padding-right: 10upx;">
						<!-- <text v-if="item.postTitle" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
							<span v-if="item.topicTitle" @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
								#{{item.topicTitle}}#
							</span>
							<span >
								{{item.postTitle}}
							</span>
						</text>
						<text v-if="!item.postTitle && item.postContent" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
							<span @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
								{{item.topicTitle}}
							</span>
							<span >
								{{item.postContent}}
							</span>
						</text> -->
						
						<view v-if="item.postTitle" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
							<!-- <span v-if="item.topicTitle" @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
								#{{item.topicTitle}}#
							</span>
							<span > -->
								{{item.postTitle}}
							<!-- </span> -->
						</view>
						<view v-if="!item.postTitle && item.postContent" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
							<!-- <span @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
								{{item.topicTitle}}
							</span>
							<span > -->
								{{item.postContent}}
							<!-- </span> -->
						</view>
					</view>
					<view style="flex-direction: row; width: 100%; margin-top: 12upx;">
						<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
							<image src="@/static/actionImg/thumbsup.png" style="width: 24upx; height:24upx; margin:0 5% 0 25%"></image>
							<text>{{item.postUpvoteCount}}</text>	
						</view>
						<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
							<image src="@/static/actionImg/pinglun.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
							<text >{{item.postCommentCount}}</text>	
						</view>
						<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
							<image src="@/static/actionImg/see.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
							<text >{{item.postPageViews}}</text>	
						</view>
					</view>
				</view>
				<view v-if="item.postImageShow" style="min-width: 25%;justify-content:center;align-items:center;">
					<image :src="decodeURIComponent(item.postImageShow)" mode="aspectFill" style="width:100%; height:100%;border-radius: 8upx;"></image>
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
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			this.item = this.receiveObj.obj
		},
		computed: {
		},
		methods: {
			goActionItem_Details(item) {
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
			gotoTopicListPage(postTopicId){
				event.stopPropagation();//阻止触发父元素的点击事件
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id='  +  item.postUserId
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

<!-- 原型代码 -->
<!-- 文章 -->
<!-- <view v-for="(item,index) in list" :key="index" style="flex-direction:column;width: 100%;padding:12upx; border-radius: 4upx; background-color: #FFFFFF;margin-bottom:8upx;" >
	<view style="flex-direction: row;">
		<view style="width:85%;">
			<image  @click="gotoPersonalPage(item)" :src="item.postUserAvatar?item.postUserAvatar:avatarUrl_default"  style="width: 76upx;height: 76upx;border-radius: 50upx;"></image>
			<view style="flex-direction: column; margin-left: 20upx;width: 80%;">
				<view style="width: 100%;align-items: center;line-height: 40upx;">
					<text style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{item.postUserNickname}}
					</text>
				</view>
				<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
					<text>{{item.timerAgo}}</text>
					<text v-if="item.postSource" style="width: 70%;margin-left: 20upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						来自 {{item.postSource}}
					</text>
				</view>
			</view>
		</view>
		<view style="width: 15%;justify-content: flex-end;align-items: center;">
			<image @click="moreClick(item)" src="@/static/actionImg/more.png" style="width: 38upx; height: 12upx;"></image>
		</view>
	</view>
	
	<view style="width: 100%;margin-top: 12upx;">
		<view style="flex-direction: column; min-width: 75%;height: 100%;">
			<view style="width: 100%;padding-right: 10upx;">
				<text v-if="item.postTitle" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
					<span v-if="item.topicTitle" @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
						#{{item.topicTitle}}#
					</span>
					<span @click="goActionItem_Details(item)">
						{{item.postTitle}}
					</span>
				</text>
				<text v-if="!item.postTitle && item.postContent" style="max-height: 80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
					<span @click="gotoTopicListPage(item.postTopicId)" style="color: #f76d45;padding-right: 10upx;">
						{{item.topicTitle}}
					</span>
					<span @click="goActionItem_Details(item)">
						{{item.postContent}}
					</span>
				</text>
			</view>
			<view @click="goActionItem_Details(item)" style="flex-direction: row; width: 100%; margin-top: 12upx;">
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image src="@/static/actionImg/thumbsup.png" style="width: 24upx; height:24upx; margin:0 5% 0 25%"></image>
					<text>{{item.postUpvoteCount}}</text>	
				</view>
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image src="@/static/actionImg/pinglun.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
					<text >{{item.postCommentCount}}</text>	
				</view>
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image src="@/static/actionImg/see.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
					<text >{{item.postPageViews}}</text>	
				</view>
			</view>
		</view>
		<view @click="goActionItem_Details(item)" v-if="item.postImageShow" style="min-width: 25%;justify-content:center;align-items:center;">
			<image :src="item.postImageShow" mode="aspectFill" style="width:100%; height:100%;border-radius: 8upx;"></image>
		</view>
	</view>
</view> -->