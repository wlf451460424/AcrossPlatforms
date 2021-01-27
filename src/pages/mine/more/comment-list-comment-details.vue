<template>
	<view class="content">
		<scroll-view scroll-y="true" style="margin-top: 2upx;">
			<view style="z-index: 2;flex-direction: column;width: 100%;padding: 20upx 20upx;border-bottom: 1px solid #F9F9F9;background-color: #FFFFFF;">
				<view style="flex-direction: row;width: 100%;height: 80upx;">
					<view style="width: 60%;height:100%;">
						<image :src="decodeURIComponent(recive_data.commentUserAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
						<view style="flex-direction: column; margin-left: 10upx;">
							<view style="width: 100%;align-items: center;">
								<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
									{{recive_data.commentUserNickname}}
								</text>
								<text style="font-size: 24upx;height: 30upx;line-height: 30upx;padding:0 4upx;background-color: #ffbf59;border-radius: 6upx;color: #FFFFFF;">
									{{recive_data.growthValue}}
								</text>
							</view>
							<text style="line-height: 40upx;color: #b7b7b7;">{{postFriendlyDate}}</text>
						</view>
					</view>
					<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;padding-right: 20upx;">
						<view @click="clcik_thumbsup_pinlun(recive_data)" style="align-items: baseline;margin-right: 40upx;">
							<image :src="recive_data.iupvoted?zan_ico_over:zan_ico" style="width: 34upx; height: 34upx;margin-right: 10upx;"></image>
							<text> {{recive_data.commentUpvoteCount}}</text>
						</view>
						<view @click="more(recive_data,0)" style="height: 100%;align-items: center;">
							<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
						</view>
					</view>
				</view>
				<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;">
					{{recive_data.commentContent}}
				</text>
			</view>
			
			<!-- 底部分享弹窗 -->
			<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
				<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
					<view @click="gotoPostDetails" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
						<text>查看原文</text>
					</view>
					<view v-if="jubao_show" @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
						<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
					</view>
					<view v-if="del_show" @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
						<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
					</view>
				</view>
			</uni-popup>
		</scroll-view>
	</view>
</template>
<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh.vue';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	import chatInput from '@/components/im-chat/chatinput.vue'; //input框
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
			chatInput,
		},
		data() {
			return {
				recive_data:Object,
				avatarUrl_default:"/static/header_default.png",
				zan_ico: "/static/actionImg/thumbsup.png",
				zan_ico_over: "/static/actionImg/thumbsup_over.png",
				
				nowTargetData:Object,
				
				del_show:false,
				jubao_show:false,
				more_commentInfo:'',//点击更多对应的评论数据
				more_type:'',
				
				//多久之前
				postFriendlyDate:'',
				
				//回复类型   0:回复的评论  1:回复的回复
				replyType:'',
				
				postId:'',
				postType:''
			}
		},
		onLoad(e) {
			//根据评论id查询详情
			let param={"commentId":e.id} ;
			let str = '/portal/v1/comment/get/' + e.id;
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.recive_data = res.data.data;
						this.recive_data.growthValue = this.calculation.groupArr(this.recive_data.growthValue).split(" ")[0]
						this.postFriendlyDate = friendlyDate(new Date(res.data.data.createTime.replace(/\-/g,'/')).getTime(),res.data.data.createTime)
						this.postId = res.data.data.commentPostId
						this.postType = res.data.data.commentPostType
					}else{uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});}
				}
			)
		},
		methods: {
			//更多操作
			more(item,type){
				// //存贮对象数据用于举报删除
				this.more_commentInfo = item;
				this.more_type = type
				
				this.del_show = false;
				this.jubao_show = false;
				if(this.more_type)
				{//回复
					if(item.replyUserId === uni.getStorageSync('userInfo').userId){
						this.del_show = true;
					}else{
						this.jubao_show = true;
					}
				}else{//评论
					if(item.commentUserId === uni.getStorageSync('userInfo').userId){
						this.del_show = true;
					}else{
						this.jubao_show = true;
					}
				}
				this.$refs.showMore.open();
				
			},
			//查看原文
			gotoPostDetails(){
				this.$refs.showMore.close()
				if(this.postType == 0 ){//文章
					uni.navigateTo({
						url:this.navigatorUrl.articleDetailsPages + '?id=' + this.postId
					})
				}
				if(this.postType == 1){//笔记
					uni.navigateTo({
						url:this.navigatorUrl.noteDetailsPages + '?id=' + this.postId
					})
				}
				if(this.postType == 2){//动态
					uni.navigateTo({
						url:this.navigatorUrl.tweetDetailsPages + '?id=' + this.postId
					})
				}
				if(this.postType == 3){//问答
					uni.navigateTo({
						url:this.navigatorUrl.qaDetailsPages + '?id=' + this.postId
					})
				}
				if(this.postType == 15){//领养
					uni.navigateTo({
						url:this.navigatorUrl.adoptDetailsPages + '?id=' + this.postId
					})
				}
			},
			//举报
			jubao(){
				this.$refs.showMore.close()
				if(this.more_type){//回复
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+this.more_commentInfo.replyId  + '&type=6' 
					})
				}else{//评论
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+this.more_commentInfo.commentId  + '&type=5' 
					})
				}
			},
			//删除
			del(){
				this.$refs.showMore.close()
				if(this.more_type){//删除回复  刷新列表
					let param={"replyId":this.more_commentInfo.replyId} ;
					let opts={ url:'/portal/v1/reply/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								//刷新加载页面
								this.onPulldownReresh()
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});		
							}
						}
					)
				}else{//评论删除  返回上一页
					let param={"commentId":this.more_commentInfo.commentId} ;
					let opts={ url:'/portal/v1/comment/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								uni.navigateBack() 
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
			},
			//点赞  评论
			clcik_thumbsup_pinlun(item){
				let param={
					"upvoteTargetId":item.commentId,//点赞对象Id
					"upvoteTargetType": 5,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.recive_data.iupvoted = !this.recive_data.iupvoted
							if(this.recive_data.iupvoted){
								this.recive_data.commentUpvoteCount ++
							}else{
								this.recive_data.commentUpvoteCount --
							}
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
		background-color: #f9f9f9;
	}
	
	/* 
	view{
		display: flex;
	}
	page, .content{
		color: #5c5f66;
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;
		overflow: hidden;
		flex-direction: column;
	} */
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		margin: 10upx 0 100upx;
		.panel-item{
			background: #fff;
			padding: 30px 0;
			/* border-bottom: 2px solid #000; */
		}
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0;
		overflow: hidden;
	}
</style>