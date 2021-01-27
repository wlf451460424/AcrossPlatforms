<template>
	<view class="content">
		<view style="z-index: 1;display: flex;flex-direction: row;width: 100%;height: 64upx;background-color: #FFFFFF;">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;">
				<view 
					v-for="(item,index) in tabBars" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index,item.tagId)"
				>{{item.tagName}}</view>
			</scroll-view>
		</view>
		
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 0;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;flex-flow: wrap;padding:6upx 0 12upx 6upx;">
							<view v-for="(item,key) in list" :key="key" @click="gofosterageItem_Details(item)" style="flex-direction: column;width: 48%; height: 530upx;margin:6upx;display:block;background: #FFFFFF;border-radius: 4upx;">
								<view style="flex-direction: column;">
									<image :src="item.pairPetImage?decodeURIComponent(item.pairPetImage):base_default" mode="aspectFill" style="width: 100%; height: 410upx; border-radius: 4upx; "></image>
									<view style="flex-direction: column;padding-top: 6upx;">
										<view style="width: 100%;padding:0 12upx;align-items: center;">
											<text style="width:60%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.pairTitle}}
											</text>
											<text style="width: 40%;text-align: right;font-size: 24upx;color: #ffbf59;">{{item.score}}</text>
										</view>
										<view style="width: 100%;padding:6upx 12upx;font-size: 24upx;color: #b7b7b7;">
											<text style="max-width: calc(100% - 70upx);display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.pairPoi}}
											</text> 
											<text style="margin: 0 10upx;"> | </text>
											<text>{{item.distance}}</text>
										</view>
									</view>
								</view>
								<view v-if="item.pairStatus == 1" style="position: relative;top:-520upx;left:0;width: 100%;height: 530upx;background: #FFFFFF;opacity: 0.6;border-radius: 4upx;align-items: center;justify-content: center;padding-bottom: 130upx;">
									<view style="width: 140upx;height: 140upx;border-radius: 100upx; background-color: #000000;align-items: center;justify-content: center;">
										<text style="color: #FFFFFF;font-size: 28upx;">暂停营业</text>
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
				tabBars: [
					{
						tagId: "0",
						tagName: "综合"
					},
					{
						tagId: "1",
						tagName: "距离"
					},
				],//导航
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				nowSelectTypeId:'',
				
				sortCode:0,//排序 0：综合/1：评分/2：销量
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh()
		},
		methods: {
			//根据条件查询寄养家庭列表
			getPostList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"sortCode": this.sortCode,
					"cityCode": uni.getStorageSync('cityCode'),
					"latitude": uni.getStorageSync('Latitude'),
					"longitude": uni.getStorageSync('Longitude'),
				}
				let opts={ url:'/portal/v1/pair/page/list', method:'POST' }
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
									//处理图片
									arr[i].pairPetImage = arr[i].pairPetImage.split(",")[0]
									
									if(arr[i].score > 0){
										arr[i].score = arr[i].score + '分'
									}else{
										arr[i].score = "暂无评分"
									}
									arr[i].pairPoi = arr[i].pairPoi.split("|")[1]
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
			
			//tab切换
			async changeTab(e,value){
				// console.log(value)
				this.list = [];
				this.page = 1;
				
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
				this.tabCurrentIndex = e; 
				
				this.sortCode = this.tabCurrentIndex 
				//下拉刷新  切换完成加载数据
				this.onPulldownReresh()
			},
			
			gofosterageItem_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.pairDetailsPages + '?id=' + item.pairId
				})
			},
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
		margin-top: 2upx;
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
		height: 64upx;
		white-space: nowrap;
		background-color: #fff;
		/* text-align: center; */
		.nav-item{
			display: inline-block;
			// width: 150upx;
			width: 50%;
			padding: 0 20upx;
			// margin-right: 20upx;
			text-align: center;
			line-height: 64upx;
			color: #303133;
			position: relative;
			// font-weight: bold;
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
		margin: 0 0 100upx;
		
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
	
	.active{
		background-color: #f76d45;
		color: #FFFFFF;
		border: 1px solid #f76d45 !important;
	}
</style>
