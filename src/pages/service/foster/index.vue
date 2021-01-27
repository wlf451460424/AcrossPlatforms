<template>
	<view class="content">
		<view style="z-index: 1;display: flex;flex-direction: row;width: 100%;height: 64upx;">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;background-color: #FFFFFF;padding-right: 10upx;">
				<view 
					v-for="(item,index) in tabBars" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index,item.tagId)"
				>{{item.tagName}}</view>
			</scroll-view>
			<view @click="showDrawer" style="width: 25%;height: 64upx;align-items: center;justify-content: center;background-color: #FFFFFF;">
				<text>筛选</text>
				<image style="width: 20upx;height: 20upx;margin: 6upx 0 0 6upx;" src="../../../static/service/screening.png"></image>
			</view>
		</view>
		
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 0;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" style="justify-content: center;">
						<view style="flex-direction: column; width: 100%;flex-flow: wrap;padding:6upx 0 12upx 6upx;">
							<view v-for="(item,key) in list" :key="key" @click="gofosterageItem_Details(item)" style="flex-direction: column;width: 48%;height: 530upx;margin:6upx;display:block;background: #FFFFFF;border-radius: 4upx;">
								<view style="flex-direction: column;">
									<image :src="item.fosteragePlaceImage?decodeURIComponent(item.fosteragePlaceImage):base_default" mode="aspectFill" style="width: 100%; height: 410upx; border-radius: 4upx; "></image>
									<view style="flex-direction: column;padding-top: 6upx;">
										<view style="width: 100%;padding:0 12upx;align-items: center;">
											<text style="width:60%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.fosteragePlaceName}}
											</text>
											<text style="width: 40%;text-align: right;font-size: 24upx;color: #ffbf59;">{{item.score}}</text>
										</view>
										<view style="width: 100%;padding:6upx 12upx;font-size: 24upx;color: #b7b7b7;align-items: center;">
											<text style="max-width: calc(100% - 70upx);display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.fosteragePlacePoi}}
											</text> 
											<text style="margin: 0 10upx;"> | </text>
											<text>{{item.distance}}</text>
										</view>
									</view>
								</view>
								<view v-if="item.fosteragePlaceStatus == 1" style="position: relative;top:-520upx;left:0;width: 100%;height: 530upx;background: #FFFFFF;opacity: 0.6;border-radius: 4upx;align-items: center;justify-content: center;padding-bottom: 130upx;">
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
		
		<uni-drawer ref="showRight" mode="right" :mask-click="false">
			<view style="flex-direction: column;">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<view style="width: 100%;flex-direction: column;padding:10upx 20upx;">
						<view style="font-size: 14px;">防护窗</view>
						<view style="flex-direction: row; width: 100%; align-items: center;flex-wrap: wrap;">
							<view @click="select_Click(1,1)" :class="{active:select_1_1}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								有防护窗
							</view>
							<view @click="select_Click(1,2)" :class="{active:select_1_2}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								无防护窗
							</view>
						</view>
						<view style="font-size: 14px;">阳台</view>
						<view style="flex-direction: row; width: 100%;align-items: center;flex-wrap: wrap;">
							<view @click="select_Click(2,1)" :class="{active:select_2_1}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								封闭阳台
							</view>
							<view @click="select_Click(2,2)" :class="{active:select_2_2}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								开放阳台
							</view>
						</view>
						<view style="flex-direction: row; width: 100%;align-items: center;flex-wrap: wrap;">
							<view @click="select_Click(2,3)" :class="{active:select_2_3}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								无阳台
							</view>
						</view>
						<view style="font-size: 14px;">空调</view>
						<view style="flex-direction: row; width: 100%;align-items: center;flex-wrap: wrap;">
							<view @click="select_Click(3,1)" :class="{active:select_3_1}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								有空调
							</view>
							<view @click="select_Click(3,2)" :class="{active:select_3_2}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								无空调
							</view>
						</view>
						<view style="font-size: 14px;">暖气</view>
						<view style="flex-direction: row; width: 100%;align-items: center;flex-wrap: wrap;">
							<view @click="select_Click(4,1)" :class="{active:select_4_1}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								有暖气
							</view>
							<view @click="select_Click(4,2)" :class="{active:select_4_2}" style="font-size: 24upx;width: 40%;height: 70upx;line-height: 70upx;text-align: center;border-radius: 8upx;display: inline-block;margin: 20upx;background-color: #F9F9F9;">
								无暖气
							</view>
						</view>
					</view>
				</scroll-view>
				<view style="position: absolute;bottom: 40upx;width: 100%;justify-content: flex-end;align-items: center;padding: 0 20upx;">
					<view @click="closeDrawer()" style="width: 40%;height: 70upx;align-items: center;justify-content: center;border-radius: 8upx;background-color: #F9F9F9;">
						取消
					</view>
					<view style="width: 5%;"></view>
					<view @click="confirmDrawer()" style="width: 40%;height: 70upx;align-items: center;justify-content: center;background-color: #f76d45;border-radius: 8upx;color: #FFFFFF;">
						确定
					</view>
				</view>
			</view>
		</uni-drawer>
		
		<!-- 评分 -->
		<uni-popup ref="scoreMenu" type="top" style="z-index: 3;">
			<view style="display: flex;flex-direction: column;padding: 6upx 20upx;background-color: #FFFFFF;">
				<view @click="scoreMenuClick(0)" style="width: 100%;height: 80upx;line-height: 70upx;border-bottom: 1px solid #AAAAAA;">
					评分由高到低
				</view>
				<view @click="scoreMenuClick(1)" style="width: 100%;height: 80upx;line-height: 70upx;border-bottom: 1px solid #AAAAAA;">
					评分由低到高
				</view>
			</view>
		</uni-popup>
		<!-- 销量 -->
		<uni-popup ref="saleMenu" type="top" style="z-index: 3;">
			<view style="display: flex;flex-direction: column;padding: 6upx 20upx;background-color: #FFFFFF;">
				<view @click="saleMenuClick(0)" style="width: 100%;height: 80upx;line-height: 70upx;border-bottom: 1px solid #AAAAAA;">
					销量由高到低
				</view>
				<view @click="saleMenuClick(1)" style="width: 100%;height: 80upx;line-height: 70upx;border-bottom: 1px solid #AAAAAA;">
					销量由低到高
				</view>
			</view>
		</uni-popup>
		
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
						tagName: "评分"
					},
					{
						tagId: "2",
						tagName: "销量"
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
				
				select_1_1:false,
				select_1_2:false,
				select_2_1:false,
				select_2_2:false,
				select_2_3:false,
				select_3_1:false,
				select_3_2:false,
				select_4_1:false,
				select_4_2:false,
				
				sortCode:0,//排序 0：综合/1：评分/2：销量
				sortDirection:1,	//排序方向 0：正序/1：倒序,
				fosteragePlaceWindow:'',  			//防护窗 0：没有/1：有
				fosteragePlaceBalcony:'', 			//阳台 0：没有/1：有
				fosteragePlaceAirConditioning:'',	//空调 0：没有/1：有
				fosteragePlaceHeating:'',        	//暖气 0：没有/1：有
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
					"sortDirection": this.sortDirection,
					"fosteragePlaceWindow": this.fosteragePlaceWindow,
					"fosteragePlaceBalcony": this.fosteragePlaceBalcony,
					"fosteragePlaceAirConditioning":this.fosteragePlaceAirConditioning,
					"fosteragePlaceHeating": this.fosteragePlaceHeating,
					
					"fosteragePlaceCityCode": uni.getStorageSync('cityCode'),
					"latitude": uni.getStorageSync('Latitude'),
					"longitude": uni.getStorageSync('Longitude'),
				}
				let opts={ url:'/portal/v1/fosterage_place/page/list', method:'POST' }
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
									arr[i].fosteragePlaceImage = arr[i].fosteragePlaceImage.split(",")[0]
									
									if(arr[i].score > 0){
										arr[i].score = arr[i].score + '分'
									}else{
										arr[i].score = "暂无评分"
									}
									
									arr[i].fosteragePlacePoi = arr[i].fosteragePlacePoi.split("|")[1]
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
				
				// if(this.tabCurrentIndex == 1){
				// 	this.$refs.scoreMenu.open()
				// }
				// if(this.tabCurrentIndex == 2){
				// 	this.$refs.saleMenu.open()
				// }
			},
			// scoreMenuClick(value){
			// 	this.$refs.scoreMenu.close()
			// 	this.sortDirection = value
				
			// 	//下拉刷新  切换完成加载数据
			// 	this.onPulldownReresh()
			// },
			// saleMenuClick(value){
			// 	this.$refs.saleMenu.close()
			// 	this.sortDirection = value
				
			// 	//下拉刷新  切换完成加载数据
			// 	this.onPulldownReresh()
			// },
			
			gofosterageItem_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.fosterageDetailsPages + '?id=' + item.fosteragePlaceId
				})
			},
			
			showDrawer(e) {
				this.$refs.showRight.open()
			},
			// 筛选 关闭窗口
			closeDrawer(e) {
				this.clearDrawer()
			},
			// 筛选 确认
			confirmDrawer(e) {
				//下拉刷新  切换完成加载数据
				this.onPulldownReresh()
				
				this.clearDrawer()
			},
			//清空
			clearDrawer(){
				this.$refs.showRight.close();
				this.select_1_1 = false;
				this.select_1_2 = false;
				this.select_2_1 = false;
				this.select_2_2 = false;
				this.select_2_3 = false;
				this.select_3_1 = false;
				this.select_3_2 = false;
				this.select_4_1 = false;
				this.select_4_2 = false;
				
				this.fosteragePlaceWindow = 0;
				this.fosteragePlaceBalcony = 0;
				this.fosteragePlaceAirConditioning = 0;
				this.fosteragePlaceHeating = 0;
			},
			select_Click(e,index){
				switch(e){
					case 1:
						if(index == 1){
							this.select_1_1 = !this.select_1_1
							this.select_1_2 = false
							if(this.select_1_1){
								this.fosteragePlaceWindow = 1
							}else{
								this.fosteragePlaceWindow = 0
							}
						}
						if(index == 2){
							this.select_1_2 = !this.select_1_2
							this.select_1_1 = false
							if(this.select_1_2){
								this.fosteragePlaceWindow = 0
							}else{
								this.fosteragePlaceWindow = 1
							}
						}
						break;
					case 2:  //0：无阳台/1: 开放阳台/2: 封闭阳台
						if(index == 1){
							this.select_2_1 = !this.select_2_1
							this.select_2_2 = false
							this.select_2_3 = false
							if(this.select_2_1){
								this.fosteragePlaceBalcony = 2
							}else{
								this.fosteragePlaceBalcony = ''
							}
						}
						if(index == 2){
							this.select_2_2 = !this.select_2_2
							this.select_2_1 = false
							this.select_2_3 = false
							if(this.select_2_2){
								this.fosteragePlaceBalcony = 1
							}else{
								this.fosteragePlaceBalcony = ''
							}
						}
						if(index == 3){
							this.select_2_3 = !this.select_2_3
							this.select_2_1 = false
							this.select_2_2 = false
							if(this.select_2_3){
								this.fosteragePlaceBalcony = 0
							}else{
								this.fosteragePlaceBalcony = ''
							}
						}
						break;
					case 3:
						if(index == 1){
							this.select_3_1 = !this.select_3_1
							this.select_3_2 = false
							if(this.select_3_1){
								this.fosteragePlaceAirConditioning = 1
							}else{
								this.fosteragePlaceAirConditioning = 0
							}
						}
						if(index == 2){
							this.select_3_2 = !this.select_3_2
							this.select_3_1 = false
							if(this.select_3_2){
								this.fosteragePlaceAirConditioning = 0
							}else{
								this.fosteragePlaceAirConditioning = 1
							}
						}
						break;
					case 4:
						if(index == 1){
							this.select_4_1 = !this.select_4_1
							this.select_4_2 = false
							if(this.select_4_1){
								this.fosteragePlaceHeating = 1
							}else{
								this.fosteragePlaceHeating = 0
							}
						}
						if(index == 2){
							this.select_4_2 = !this.select_4_2
							this.select_4_1 = false
							if(this.select_4_2){
								this.fosteragePlaceHeating = 0
							}else{
								this.fosteragePlaceHeating = 1
							}
						}
						break;
				}
				
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
			width: 33%;
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
	
	.active_mask{
		// display:  !important;
	}
</style>
