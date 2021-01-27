<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" :url="url" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" scroll-y="true" @scrolltolower="loadMore">
						<!-- 达人 -->
						<view  v-for="(item,index) in list" :key="index" style="flex-direction:column;width: 100%; background-color: #FFFFFF;margin-bottom:2upx;padding:24upx;" >
							<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
								<image @click="click_user(item)" :src="decodeURIComponent(item.upvoteUserAvatar)"  style="width: 100upx;height: 100upx;border-radius: 75upx;"></image>
								<view style="flex-direction: column; margin-left: 20upx;width:80%;height: 100%;">
									<view style="width: 100%;align-items: center;line-height: 50upx;">
										<text style="max-width: 85%;max-height: 60upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
											{{item.upvoteUserNickname}}
										</text>
										<text style="font-size: 24upx;height: 30upx;line-height:30upx;margin-left: 20upx;padding:0 4upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
											{{item.growthValue}}
										</text>
									</view>
									<view style="flex-direction: row;width: 100%;align-items: center;">
										<view style="flex-direction: row;width:70%;line-height: 50upx;font-size: 24upx;color: #AAAAAA;">
											<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												简介：{{item.upvoteUserProfile?item.upvoteUserProfile:'此用户很懒，什么都没有留下'}}
											</text>
										</view>
										<view v-if="!item.currentUserFollowStatus && item.upvoteUserId!=myUserId" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
											<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
												<text style="line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
											</view>
										</view>
										<view v-if="item.currentUserFollowStatus && item.upvoteUserId!=myUserId" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
											<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
												<text style="line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	</view>
</template>
<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
		},
		data() {
			return {
				avatarUrl_default:"/static/header_default.png",
				
				limit:10,
				page:1,
				list:[],
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				url:'/static/loading.gif',
				
				myUserId:'',
				postId:'',
				postType:''
			}
		},
		onLoad(e) {
			this.postId = e.id;
			this.postType = e.type;
			this.myUserId = uni.getStorageSync('userInfo').userId;
			
			//下拉刷新
			this.onPulldownReresh()
		},
		methods: {
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followStatus": item.currentUserFollowStatus?0:1, //关注状态 0: 取消 1： 关注
					"followTargetId": item.upvoteUserId, //关注目标ID
					"followTargetType": 7, //关注目标类型 7:用户 8：话题 9：小组
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.upvoteUserId == this.list[i].upvoteUserId){
									this.list[i].currentUserFollowStatus = !this.list[i].currentUserFollowStatus
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
				
				//查询点赞列表
				this.getUpvoteList(type)
			},
			//查询点赞列表
			getUpvoteList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"upvoteTargetId": this.postId,  //点赞帖子id
					"upvoteTargetType": this.postType,  //点赞帖子类别  "0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复",
				} ;
				let opts={ url:'/portal/v1/upvote/list', method:'POST' }
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
								}
								for(let i=0;i<this.list.length;i++){
									this.list[i].growthValue = this.calculation.groupArr(this.list[i].growthValue).split(" ")[0]
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
			click_user(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.upvoteUserId
				})
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
		margin-top: 2upx;
		.panel-item{
			background: #fff;
			padding: 20px;
			border-bottom: 2px solid #000;
		}
	}
	.active{
		border: 1px solid #AAAAAA !important;
		color: #AAAAAA !important;
	}
</style>