<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;padding: 8upx 12upx;">
							<!-- 我的预约寄养 -->
							<view v-for="(item,index) in list" :key="index" style="flex-direction:column;width: 100%;border-radius: 2px; background-color: #FFFFFF;margin-bottom:4px;padding: 6px 6px 0;" >
								<view style="width: 100%;">
									<view  @click="go_Details(item)" style="width: 20%;">
										<image :src="decodeURIComponent(item.pairPetImage)" mode="aspectFill" style="width: 100upx;height: 100upx;"></image>
									</view>
									<view style="width: 80%;flex-direction: column;">
										<view  @click="go_Details(item)" style="width: 100%;align-items: center;height: 50upx;">
											<view style="width: 80%;">
												<text style="font-size: 32upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.pairTitle}}
												</text>
											</view>
										</view>
										<view style="width: 100%;align-items: center;height: 50upx;">
											<view  @click="go_Details(item)" style="width: 60%;line-height: 24upx;">
												<!-- <text>状态：</text> -->
												<text style="color:#ffbf59;font-size: 24upx;" :class="{greenStyle:item.pairOrderStatus >= 4}">{{statusArr[item.pairOrderStatus]}}</text>
											</view>
											<!--  v-if="item.pairOrderStatus==3" -->
											<view v-if="item.pairOrderStatus==3" style="width: 40%;justify-content: flex-end;">
												<view @click="gotoCommentPage(item)" style="width: 120upx;height:50upx;background-color:#ffbf59;border-radius: 8upx;align-items: center;justify-content: center;">
													<text style="color: #FFFFFF;">评价</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view  @click="go_Details(item)" style="width: 100%;align-items: center;height: 60upx;margin-top: 12upx;color: #b7b7b7;font-size: 24upx;border-top: 1px solid #f9f9f9;">
										配对宠物：
										<text style="margin-right: 30upx;">{{item.breedName}}</text>
										<text style="margin-right: 30upx;">{{greden[item.pairPetGender]}}</text>
										<text style="margin-right: 30upx;">{{item.pairPetBirthday}}</text>
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
		data() {
			return {
				greden:["弟弟","妹妹","未知"],
				avatarUrl_default:"../../../static/header_default.png",
				
				isShowCareBtn:false,
				
				tabCurrentIndex: 0, //当前选项卡索引
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				statusArr:["待确认","待完成","","待评价","已评价","已关闭"],
				
				limit:10,
				page:1,
				list:[],
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh()
		},
		onShow() {
			//查询订单列表
			this.onPulldownReresh()
		},
		methods: {
			//前端列表分页
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					// "pairOrderUserId": uni.getStorageSync('userInfo').userId,
				}
				let opts={ url:'/portal/v1/pair_order/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
								return;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									arr[i].pairPetImage = arr[i].pairPetImage.split(",")[0]
									arr[i].pairPetBirthday = this.getBirthday(arr[i].pairPetBirthday)
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
							this.loadMoreStatus = 3;
						}
						//上滑加载 处理状态
						if(type === 'add'){
							this.loadMoreStatus = 2;
						}
					}
				)
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
					return '-'
				}
				
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
				this.getList(type)
			},
			go_Details(item) {
				uni.navigateTo({
					url:'pair-record-details?id=' + item.pairOrderId
				})
			},
			gotoCommentPage(item){
				uni.navigateTo({
					url:'add-comment?id=' + item.pairOrderId + '&type=1'
				})
			},
			dateSpace(sDate1, sDate2) {
				//sDate1和sDate2是2006-12-18格式 得出两日期之间的天数
				var dateSpan, tempDate, iDays;
				sDate1 = Date.parse(sDate1);
				sDate2 = Date.parse(sDate2);
				dateSpan = sDate2 - sDate1;
				dateSpan = Math.abs(dateSpan);
				iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				return iDays;
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
	.greenStyle{
		color: #b7b7b7 !important;
	}
</style>
