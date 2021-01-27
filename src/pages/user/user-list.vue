<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;padding: 8upx 12upx;">
							<!-- 达人 -->
							<view  v-for="(item,index) in list" :key="index" style="flex-direction:row;width: 100%;height: 160upx; border-radius: 4upx; background-color: #FFFFFF;margin-bottom:8upx;padding:12upx 12upx 12upx 0;" >
								<view style="color: #f76d45;width: 10%;height: 100%;align-items: center;justify-content: center;font-size: 32upx;font-weight: bold;">
									{{index+1}}
								</view>
								<view style="width: 90%;flex-direction: column;">
									<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
										<image @click="click_user(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 120upx;height: 120upx;border-radius: 75upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width:75%;height: 100%;">
											<view style="width: 100%;align-items: center;line-height: 40upx;">
												<text style="max-width: 85%;max-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.userNickname}}
												</text>
												<!-- <text style="font-size: 24upx;height: 30upx;line-height:30upx;margin-left: 20upx;padding:0 10upx;background-color: #f76d45;border-radius: 4upx;color: #FFFFFF;">
													{{item.growthValue_level}}
												</text> -->
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;">
												<view v-if="type==0" style="flex-direction: row;width: 100%;line-height: 50upx;font-size: 24upx;color: #AAAAAA;">
													<view style="width: 60%;align-items: center;">
														<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/growth.png"></image>
														{{item.growthValue}}分
													</view>
												</view>
												<view v-if="type==1" style="flex-direction: row;width: 100%;line-height: 50upx;font-size: 24upx;color: #AAAAAA;">
													<view style="width: 60%;align-items: center;">
														<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
														{{item.approvalCount}}
													</view>
												</view>
												<view v-if="item.isShowCareBtn && !item.isMyself" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
													<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
														<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
													</view>
												</view>
												<view v-if="!item.isShowCareBtn && !item.isMyself" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
													<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
														<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
													</view>
												</view>
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;color: #AAAAAA;font-size: 24upx;">
												<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
													简介：{{item.userProfile?item.userProfile:'此用户很懒，什么都没有留下'}}
												</text>
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
	export default {
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				type:0,
			}
		},
		async onLoad(e) {
			this.type = e.type
			
			if(this.type == 0){
				uni.setNavigationBarTitle({
				    title: '经验总榜'
				});
			}
			if(this.type == 1){
				uni.setNavigationBarTitle({
				    title: '人气总榜'
				});
			}
			
			
			//获取帖子列表
			this.onPulldownReresh('refresh');
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'search'
			})
		},
		methods: {
			moreTypeClick(){
				this.$refs.selectMenu.open()
			},
			selectItemClick(index){
				this.$refs.selectMenu.close()
			},
			//前端查询达人列表
			getPostList(type){
				let param={
					"limit":this.limit,
					"page":this.page,
					"rankingType": this.type,  //0:根据积分 1：根据点赞数
					"searchType": '',   //0:日榜 1：周榜 2：月榜  "":总榜
				}
				let opts={ url:'/portal/v1/ranking/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
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
									arr[i].growthValue_level = this.calculation.groupArr(arr[i].growthValue).split(" ")[0]
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
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
						if(type === 'add'){
							this.loadMoreStatus = 2;
						}
					}
				)
			},
			//下拉刷新
			onPulldownReresh(){
				this.list = [];
				this.page = 1;
				
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
				this.getPostList(type)
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.userId, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.userId == this.list[i].userId){
									this.list[i].isShowCareBtn = !this.list[i].isShowCareBtn
								}
							}
						}else if(res.data.code == 2012 ){
							uni.showToast({
								icon:'none',
							    title: res.data.msg,
							    duration: 1000
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/mine/login/account-login'
								})
							}, 1000)
						}else{
							consuni.showToast({
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
					url:this.navigatorUrl.personalPages + '?id=' +  item.userId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #f9f9f9;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	view {
	    display: flex;
	}
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		} 
		position: relative;
		z-index: 10;
		height: 80upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		/* text-align: center; */
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			/* width: 33.3%; */
			padding: 0 20upx;
			margin-right: 20upx;
			text-align: center;
			line-height: 80upx;
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				// border-bottom: 2upx solid #f76d45;
				position: absolute;
				left:50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #f76d45;
			&:after{
				width: 80%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #FFFFFF;
		padding-bottom: 20upx;
	}
	.uni-share-title {
		line-height: 60upx;
		font-size: 16px;
		padding: 15rpx 0;
		text-align: center;
	}
</style>
