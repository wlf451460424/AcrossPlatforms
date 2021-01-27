<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<view style="z-index: 2;display: flex;flex-direction: row;width: 100%;height: 90upx;background-color: #FFFFFF;">
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
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;padding: 8upx 12upx;">
							<!-- 我的预约寄养 -->
							<view v-for="(item,index) in list" :key="index"  @click="go_Details(item)"  style="flex-direction:column;width: 100%;border-radius: 2px; background-color: #FFFFFF;margin-bottom:4px;padding:6px 6px 0;" >
								<view style="width: 100%;">
									<view style="margin-right: 20upx;">
										<image :src="decodeURIComponent(item.userAvatar)" mode="aspectFill" style="width: 100upx;height: 100upx;border-radius: 65upx;"></image>
									</view>
									<view style="width: 75%;flex-direction: column;">
										<view style="width: 100%;align-items: center;height: 50upx;">
											<view style="width: 100%;">
												<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.userNickname}}
												</text>
											</view>
										</view>
										<view style="width: 100%;height: 50upx;align-items: center;">
											<view style="width: 60%;line-height: 24upx;">
												<text style="color:#ffbf59;font-size: 24upx;"  :class="{greenStyle:item.adoptOrderStatus >= 3}">{{statusArr[item.adoptOrderStatus]}}</text> 
											</view>
										</view>
									</view>
								</view>
								<view  @click="go_Details(item)" style="width: 100%;align-items: center;height: 60upx;margin-top: 12upx;font-size: 24upx;color: #b7b7b7;border-top: 1px solid #f9f9f9;">
									送养宠物：
									<text style="margin-right: 30upx;">{{item.breedName}}</text>
									<text style="margin-right: 30upx;">{{greden[item.fosterPetGender]}}</text>
									<text style="margin-right: 30upx;">{{item.fosterPetBirthday}}</text>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- 弹窗 -->
		<uni-popup ref="selectMenu" type="top" style="z-index: 3;">
			<scroll-view scroll-y="true" style="max-height: 600upx;">
				<view style="display: flex;flex-direction: column;padding: 20upx 20upx;background-color: #FFFFFF;">
					<view style="flex-direction: row; width: 100%;height: 100%; flex-wrap: wrap;">
						<view @click="selectItemClick(index,item.tagId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagId"
							style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx;">
								<text>{{item.tagName}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				greden:["弟弟","妹妹","未知"],
				avatarUrl_default:"../../../static/header_default.png",
				tabBars: [
					{tagId: "",tagName: "全部"},
					{tagId: "0", tagName: "待确认"},
					{tagId: "1", tagName: "带领养"},
					{tagId: "3", tagName: "已领养"},
					// {tagId: "4", tagName: "已关闭"},
				],//导航
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				nowSelectTypeId:'',
				
				statusArr:["待确认","待领养","","已领养","已关闭" ],
				
				limit:10,
				page:1,
				list:[],
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"service-adopt-placeList?id=" + uni.getStorageSync('userInfo').userId
			})
		},
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//查询订单列表
			this.onPulldownReresh()
		},
		onShow() {
			//查询订单列表
			this.onPulldownReresh()
		},
		methods: {
			//前端商家根据寄养订单状态查询订单列表
			getorderList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"status": this.nowSelectTypeId,
					// "userId": uni.getStorageSync('userInfo').userId,
				}
				let opts={ url:'/portal/v1/adopt_order/list/status', method:'POST' }
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
									arr[i].fosterPetBirthday = this.getBirthday(arr[i].fosterPetBirthday)
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
				this.getorderList(type)
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
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(()=>{
					if (width - nowWidth/2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth/2 - windowWidth / 2 + 180;
					}else{
						this.scrollLeft = 0;
					}
					if(typeof e === 'object'){
						this.tabCurrentIndex = index; 
					}
					this.tabCurrentIndex = index; 
					
					this.nowSelectTypeId = value;
					//下拉刷新  切换完成加载数据
					this.onPulldownReresh()
				}, 300)
			},
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			go_Details(item) {
				uni.navigateTo({
					url:'service-adopt-record-details?id=' + item.adoptOrderId
				})
			},
			getBirthday(dateString1){
				if(dateString1){
					var  startDate = Date.parse(dateString1);
					var myDate = new Date();
					var  endDate = Date.parse(myDate);
					var days=(endDate - startDate)/(1*24*60*60*1000);
					var y = days/365
					var str = ''
					if(y<1){
					   str = '1岁' 
					}else{
					    str = parseInt(y) + '岁' 
					}
					return  str;
				}else{
					return ''
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
		height: 80upx;
		white-space: nowrap;
		background-color: #fff;
		/* text-align: center; */
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			/* width: 33.3%; */
			padding: 0 15upx;
			margin-right: 10upx;
			text-align: center;
			line-height: 80upx;
			// color: #303133;
			position: relative;
			// font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #f76d45;
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
	.greenStyle{
		color: #b7b7b7 !important;
	}
</style>
