<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 小组 -->
							<view  v-for="(item,index) in list" :key="index" style="flex-direction:row;width: 100%;height: 120upx;background-color: #FFFFFF;margin-top:2upx;align-items: center;padding:0 20upx;">
								<view style="width:100%;align-items: center;">
									<image :src="decodeURIComponent(item.followTargetAvatar)" mode="aspectFill"  @click="click_cardBars(item)" style="width: 100upx;height: 100upx;border-radius: 60upx;"></image>
									<view style="flex-direction: column; margin-left: 12upx;width: 80%;">
										<view style="width: 100%;">
											<text  @click="click_cardBars(item)" style="width: 70%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.followTargetName}}
											</text>
										</view>
										<text  @click="click_cardBars(item)" style="font-size: 24upx;color: #AAAAAA;width: 100%;line-height:40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											简介 : {{item.followTargetProfile}}
										</text>
									</view>
								</view>
								<view  v-if="!item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;background: #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">加入</text>
									</view>
								</view>
								<view  v-if="item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;border: 1px solid #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已加入</text>
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
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				list:[],
				limit:10,
				page:1,
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh();
		},
		methods: {
			//前端查询列表分页
			getPostList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"followTargetType": 9, //关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					"followUserId": uni.getStorageSync('userInfo').userId,
				}
				let opts={ url:'/portal/v1/follow/page/list', method:'POST' }
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
			click_cardBars(item){
				uni.navigateTo({
					url:this.navigatorUrl.groupDetailsPages + '?id=' + item.followTargetId
				})
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.followTargetId, //关注目标ID
					"followTargetType": 9, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
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
			}
		}
	}
</script>

<style lang='scss' scoped>
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
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		/* box-shadow: 0 2upx 8upx rgba(0,0,0,.06); */
		background-color: #fff;
		text-align: center;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 40%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			/* font-size: 36upx; */
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				/* border-bottom: 1upx solid #f76d45; */
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #f76d45;
			&:after{
				width: 60%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
