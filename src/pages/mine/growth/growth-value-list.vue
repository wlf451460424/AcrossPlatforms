<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="width: 100%;height: 70px;flex-direction: column;background-color: #ffbf59;color: #FFFFFF;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
							<text style="line-height: 100upx;font-size: 22px;padding-left: 10px;">{{growthValue}}</text>
						</view>
						<view style="flex-direction: column;position: absolute;left: 6px;right:6px;top:45px;border-radius: 5px;margin-bottom: 5px;background-color: #FFFFFF;padding: 5px;">
							<!-- item -->
							<view v-for="(item,index) in list" :key="index"
								style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;border-bottom: 1px solid #F9F9F9;background-color: #FFFFFF;padding: 0 20upx;">
								<view style="flex-direction: column;width: 80%;height: 100%;justify-content: center;">
									<text>{{item.growthValueSource}}</text>
									<text style="color: #AAAAAA;">{{item.updateTime}}</text>
								</view>
								<view style="width: 20%;height: 100%;align-items: center;justify-content: flex-end;" >
									<text v-if="item.growthValueRecordValue<0">{{item.growthValueRecordValue}}</text>
									<text v-else>+{{item.growthValueRecordValue}}</text>
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
				tabCurrentIndex: 0, //当前选项卡索引
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				
				growthValue:'',
			}
		},
		async onLoad(e) {
			this.growthValue = e.value
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh()
		},
		onShow() {
			//查询订单列表
			// this.onPulldownReresh()
		},
		methods: {
			//前端列表分页
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
				}
				let opts={ url:'/portal/v1/growth_record/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
								return;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									arr[i].updateTime = arr[i].updateTime.split(" ")[0]
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
		// margin: 10upx 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	.greenStyle{
		color: #09BB07 !important;
	}
</style>
