<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content"  :top="100" :url="url" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" scroll-y="true" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							
							<view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding:12upx 20upx;background-color: #FFFFFF;margin-bottom: 2upx; ">
								<view style="flex-direction: row;width: 100%;height: 80upx;">
									<view style="width: 80%;height:100%;">
										<image  @click="click_user(item.commentUserId)" :src="decodeURIComponent(item.commentUserAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width: 80%;">
											<view style="width: 100%;align-items: center;">
												<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.commentUserNickname}}
												</text>
												<text v-if="item.commentUserIdISme" style="color: #b7b7b7;margin-right:12upx;">(作者)</text>
												<text style="font-size: 24upx;height: 30upx;line-height: 30upx;padding:0 4upx;background-color: #ffbf59;border-radius: 6upx;color: #FFFFFF;">
													{{item.growthValue}}
												</text>
											</view>
											<text style="line-height: 40upx;color: #b7b7b7;font-size: 24upx;">{{item.commentFriendlyDate}}</text>
										</view>
									</view>
									<view style="width:20%;height: 100%;justify-content: flex-end;align-items: center;">
										 <view @click="clcik_thumbsup_pinlun(item)" style="align-items: baseline;margin-right: 40upx;">
											 <image :src="item.iupvoted?zan_ico_over:zan_ico" style="width: 30upx; height: 30upx;margin-right: 10upx;"></image>
											 <text> {{item.commentUpvoteCount}}</text>
										 </view>
										 <view @click="more(item)" style="height: 100%;align-items: center;">
												<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
										 </view>
									</view>
								</view>
								<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;padding-top:12upx;" >
									{{item.commentContent}}
								</text>
							
								<view @click="gotoHuifu_page(item)" v-if="item.replyCount>0?true:false" style="width: 100%;height: 50upx;">
									<text style="padding: 0 12upx;background-color: #f1f1f1;border-radius: 10upx;">{{item.replyCount}}条回复</text>		
								</view>
							</view>
							
							<!-- <view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding: 20upx 20upx;border-bottom: 1px solid #b7b7b7;">
								<view style="flex-direction: row;width: 100%;height: 80upx;">
									<view style="width: 60%;height:100%;">
										<image :src="decodeURIComponent(item.commentUserAvatar)"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
											<view style="width: 100%;align-items: center;">
												<text style="max-width: 55%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.commentUserNickname}}
												</text>
												<text style="height: 36upx;line-height: 36upx;margin-left: 40upx;padding:0 4upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
													{{item.growthValue}}
												</text>
											</view>
											<text style="line-height: 40upx;color: #b7b7b7;">{{item.commentFriendlyDate}}</text>
										</view>
									</view>
									<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
										<view @click="clcik_thumbsup_pinlun(item)" style="align-items: baseline;margin-right: 40upx;">
											 <image :src="item.iupvoted?zan_ico_over:zan_ico" style="width: 34upx; height: 34upx;margin-right: 10upx;"></image>
											 <text> {{item.commentUpvoteCount}}</text>
										 </view>
										 <image @click="more(item)" src="@/static/actionImg/more.png" style="width: 38upx; height: 12upx;"></image>
									</view>
								</view>
								<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;">
									{{item.commentContent}}
								</text>
								<view @click="gotoHuifu_page(item)" v-if="item.replyCount>0?true:false" style="width: 100%;height: 50upx;">
									<text style="padding: 0 12upx;background-color: #b7b7b7;border-radius: 10upx;">{{item.replyCount}}条回复</text>		
								</view>
							</view> -->
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<view class="foot" style="z-index: 2;">
			<chat-input style="width: 100%;" @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view v-if="jubao_show" @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
					<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
				</view>
				<view v-if="del_show" @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import chatInput from '@/components/im-chat/chatinput.vue'; //input框
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			chatInput,
		},
		data() {
			return {
				avatarUrl_default:"/static/header_default.png",
				zan_ico: "/static/actionImg/thumbsup.png",
				zan_ico_over: "/static/actionImg/thumbsup_over.png",
				
				limit:10,
				page:1,
				list:[],
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				url:'/static/loading.gif',
				
				input_placeholder: '发布评论', //占位内容
				focus: false, //是否自动聚焦输入框
				
				postId:'',//帖子id
				postType:'',//帖子type
				
				del_show:false,
				jubao_show:false,
				more_commentInfo:'',//点击更多对应的评论数据
			}
		},
		onLoad(e) {
			this.postId = e.id;
			this.postType = e.type;
			//下拉刷新
			this.onPulldownReresh()
		},
		onShow() {
			//下拉刷新
			this.onPulldownReresh()
		},
		methods: {
			blur: function() {
				this.focus = false;
			},
			//发布评论
			send_comment: function(message) {
				// #ifdef MP-QQ
				let userInfo = uni.getStorageSync('userInfo')
				if(uni.getStorageSync('token') && userInfo && userInfo.userPhoneNumber == ''){
					//免密登录 0； 找回密码 1； 绑定手机 2；
					uni.setStorageSync('typeLogin', 2);
					uni.navigateTo({
						url:'/pages/mine/login/login'
					})
					return
				}
				// #endif
				
				// console.log(message)
				let param={
					"commentPostType": this.postType,//0: 文章 1：笔记 2：动态 3：问答 4：新闻
					"commentPostId": this.postId,  //帖子id
					"commentContent":message.content, //评论内容
					"commentUserId": uni.getStorageSync('userInfo').userId, //评论用户id
				} ;
				let opts={ url:'/portal/v1/comment/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//刷新加载页面
							// this.onPulldownReresh()
							
							var obj = {};
							obj.commentContent = message.content;
							obj.commentId = res.data.data;
							obj.commentUserId = uni.getStorageSync('userInfo').userId;
							obj.commentUserNickname = uni.getStorageSync('userInfo').userNickname;
							obj.commentUserAvatar = uni.getStorageSync('userInfo').userAvatar;
							obj.growthValue = this.calculation.groupArr(uni.getStorageSync('userInfo').growthValue).split(" ")[0]
							obj.iupvoted = 0;
							obj.commentUpvoteCount = 0;
							obj.replyCount = 0;
							var date = new Date();
							obj.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
							obj.commentFriendlyDate = friendlyDate(new Date(obj.createTime.replace(/\-/g,'/')).getTime(),obj.createTime)
							this.list.unshift(obj)
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
			},
			
			//更多操作
			more(item){
				this.del_show = false;
				this.jubao_show = false;
				if(item.commentUserId === uni.getStorageSync('userInfo').userId){
					this.del_show = true;
				}else{
					this.jubao_show = true;
				}
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.more_commentInfo = item;
			},
			//举报
			jubao(){
				uni.navigateTo({
					url:'/pages/discover/report/index?id='+this.more_commentInfo.commentId + '&type=5' 
				})
				this.$refs.showMore.close()
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let param={"commentId":this.more_commentInfo.commentId} ;
				let opts={ url:'/portal/v1/comment/remove', method:'POST' }
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
							for(var i=0;i<this.list.length;i++){
								if(item.commentId == this.list[i].commentId){
									this.list[i].iupvoted = !this.list[i].iupvoted
									if(this.list[i].iupvoted){
										this.list[i].commentUpvoteCount ++
									}else{
										this.list[i].commentUpvoteCount --
									}
								}
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
			},
			//跳转回复页面
			gotoHuifu_page(item){
				uni.navigateTo({
					url:"post-reply-list?data=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			//下拉刷新
			onPulldownReresh(){
				this.list = [];
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				this.page ++
				this.loadMoreStatus = 1;
				this.loadNewsList('add');
			},
			loadNewsList(type){
				//type add 加载更多 refresh下拉刷新
				if(type === 'add'){
					if(this.loadMoreStatus === 2){
						return;
					}
					this.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if(type === 'refresh'){
					this.refreshing = true;
					// this.loadMoreStatus = 1
				}
				// #endif
				
				//前端查询帖子列表分页
				this.getPinlunList(type)
			},
			//前端查询帖子列表分页
			getPinlunList(type){
				let param={ "limit": this.limit, "page": this.page, "commentPostId":this.postId} ;
				let opts={ url:'/portal/v1/comment/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								if(this.list.length<res.data.data.total){
									this.list = this.list.concat(res.data.data.records)
									for(var i=0;i<this.list.length;i++){
										this.list[i].growthValue = this.calculation.groupArr(this.list[i].growthValue).split(" ")[0]
										this.list[i].commentFriendlyDate = friendlyDate(new Date(this.list[i].createTime.replace(/\-/g,'/')).getTime(),this.list[i].createTime)
										if(this.list[i].commentUserId == this.list[i].commentPostUserId){
											this.list[i].commentUserIdISme = true
										}else{
											this.list[i].commentUserIdISme = false
										}
									}
								}
							}
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});			
						}
						
						//下拉刷新 关闭刷新动画
						if(type === 'refresh'){
							this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							this.refreshing = false;
							// #endif
							this.loadMoreStatus = 2;
						}
						//上滑加载 处理状态
						if(type === 'add')this.loadMoreStatus = 2;
					}
				)
			},
			
		}
	}
</script>

<style lang='scss' scoped>
	view{
		display: flex;
	}
	page, .content{
		color: #5c5f66;
		background-color: #f9f9f9;
		height: 100%;
		width: 100%;
		overflow: hidden;
		flex-direction: column;
	}
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 80upx;
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 100upx;
		min-height: 100upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
</style>