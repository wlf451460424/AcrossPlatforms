<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;margin-bottom: 12upx;">
							<!-- 达人 -->
							<view  v-for="(item,index) in list" :key="index" @click="click_user(item)" style="flex-direction:row;width: 100%; border-radius: 4upx; background-color: #FFFFFF;margin-bottom:8upx;padding:12upx;align-items: center;" >
								<view style="color: #f76d45;width: 10%;height: 100%;align-items: center;justify-content: center;font-size: 32upx;font-weight: bold;">
									{{index+1}}
								</view>
								<view style="width: 90%;flex-direction: column;">
									<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
										<image :src="decodeURIComponent(item.petAvatar)" mode="aspectFill" style="width: 120upx;height: 120upx;border-radius: 75upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width:75%;height: 100%;">
											<view style="width: 100%;align-items: center;line-height: 40upx;">
												<text style="max-width: 85%;max-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.petNickname}}
												</text>
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 40upx;align-items: center;">
												<view style="width: 100%;align-items: center;">
													<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
													{{item.petCount}}
												</view>
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 40upx;align-items: center;">
												<view style="flex-direction: row;width: 100%;line-height: 40upx;font-size: 24upx;color: #AAAAAA;">
													<text v-if="item.petBreedName" style="margin-right: 20upx;">{{item.petBreedName}}</text>
													<text v-if="item.petGender<2" style="margin-right: 20upx;">{{petGender_array[item.petGender]}}</text>
													<text v-if="item.petAge" style="margin-right: 20upx;">{{item.petAge}}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view style="width: 10%;height: 100%;align-items: center;justify-content: center;font-size: 32upx;font-weight: bold;">
									<image  src="@/static/mine-ico/next.png" style="margin-left: 20upx;width: 16upx; height: 26upx;"></image>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	
		<!-- <view @click="gotoTotalList" style="z-index: 3;position: absolute;bottom: 0;width: 100%;height: 50upx;background-color: #FFFFFF;color: #f76d45;justify-content: center;align-items: center;">
			查看总榜
			<view style="width:16upx;height:16upx;border-top:2upx solid #f76d45; border-right:2upx solid #f76d45;transform: rotate(45deg);"></view>
		</view> -->
	</view>
</template>

<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
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
				
				petGender_array: ['弟弟','妹妹','未知'],
			}
		},
		async onLoad() {
			//获取帖子列表
			this.onPulldownReresh('refresh');
		},
		methods: {
			//前端查询达人列表
			getPostList(type){
				let param={
					"limit":this.limit,
					"page": this.page,
					"searchType": '',  	//0:日榜 1：周榜 2：月榜   "":总榜
				}
				let opts={ url:'/portal/v1/archives/get_pet_upvote', method:'POST' }
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
									arr[i].petAge = this.getDaysBetween(arr[i].petBirthday)
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
				
				this.loadMoreStatus = '';
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
			
			click_user(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.userId
				})
			},
			//tab切换
			async changeTab(e){
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
			gotoTotalList(){
				uni.navigateTo({
					url:"pet-list"
				})
			},
			getDaysBetween(dateString1){
			   var  startDate = Date.parse(dateString1);
			   var myDate = new Date();
			   var  endDate = Date.parse(myDate);
			   var days=(endDate - startDate)/(1*24*60*60*1000);
			   var y = days/365
			   
				var str = ''
				if(!y){
					str = ''
				}else{
					if(y<1){
						str = '1岁' 
					}else{
						str = parseInt(y) + '岁' 
					}
				}
			   return  str;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
	    display: flex;
	    min-height: 100%;
		// height: 100%;
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
		// box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		padding: 0 20%;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 33.3%;
			text-align: center;
			line-height: 70upx;
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6upx solid #f76d45;
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
				width: 70%;
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
	
	.active{
		color: #f76d45 !important;
	}
</style>
