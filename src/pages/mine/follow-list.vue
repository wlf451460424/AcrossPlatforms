<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" :url="url" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" scroll-y="true" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 达人 -->
							<view  v-for="(item,index) in list" :key="index" style="flex-direction:column;width: 100%;background-color: #FFFFFF;margin-top:2upx;padding:12upx 20upx;" >
								<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
									<image @click="click_user(item)" :src="decodeURIComponent(item.followTargetAvatar)"  style="width: 120upx;height: 120upx;border-radius: 75upx;"></image>
									<view style="flex-direction: column; margin-left: 20upx;width:80%;height: 100%;">
										<view style="width: 100%;align-items: center;line-height: 50upx;">
											<text style="max-width: 85%;max-height: 60upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.followTargetNickname}}
											</text>
											<text style="font-size: 24upx;height: 30upx;line-height:30upx;margin-left: 20upx;padding:0 4upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
												{{item.growthValue}}
											</text>
										</view>
										<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;">
											<view style="flex-direction: row;width:70%;line-height: 40upx;font-size: 24upx;color: #AAAAAA;">
												<text style="width: 60%;">粉丝：{{item.followTargetFansCount}}</text>
											</view>
											<view v-if="!item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
												<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
													<text style="line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
												</view>
											</view>
											<view v-if="item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
												<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
													<text style="line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;color: #AAAAAA;font-size: 24upx;">
									<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										简介：{{item.followTargetProfile?item.followTargetProfile:'此用户很懒，什么都没有留下'}}
									</text>
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
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh.vue';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
		},
		data() {
			return {
				avatarUrl_default:"/static/header_default.png",
				
				limit:10,
				page:1,
				list:[],
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				url:'/static/loading.gif',
				
				currentUserId:''
			}
		},
		onLoad(e) {
			this.currentUserId = e.id
			//下拉刷新
			this.onPulldownReresh()
		},
		methods: {
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followStatus": item.followStatus?0:1, //关注状态 0: 取消 1： 关注
					"followTargetId": item.followTargetId, //关注目标ID
					"followTargetType": 7, //关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.followTargetId == this.list[i].followTargetId){
									this.list[i].followTargetStatus = !this.list[i].followTargetStatus
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
			click_user(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.followTargetId
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
				
				//前端用户获取粉丝列表
				this.getFollowList(type)
			},
			//获取关注列表
			getFollowList(type){
				let param={
					"limit": 10,
					"page": this.page,
					"followUserId": this.currentUserId, //关注目标ID
					"followTargetType": 7,//关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									// 处理 关注状态
									if(arr[i].userId == uni.getStorageSync('userInfo').userId){
										arr[i].isShowCareBtn = false
										arr[i].isMyself = true
									}else{
										if(arr[i].ifollowed){
											arr[i].isShowCareBtn = false
										}else{
											arr[i].isShowCareBtn = true
										}
									}
									arr[i].growthValue = this.calculation.groupArr(arr[i].growthValue).split(" ")[0]
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
								
								// if(this.list.length<res.data.data.total){
								// 	this.list[i].growthValue = this.calculation.groupArr(this.list[i].growthValue).split(" ")[0]
								// 	this.list = this.list.concat(res.data.data.records)
								// }
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
		margin: 0 0 100upx;
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	.active{
		border: 1px solid #ffbf59 !important;
		color: #ffbf59 !important;
	}
</style>