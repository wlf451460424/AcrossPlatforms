<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view v-for="(item,index) in list" :key="index" @click="gotoDetails(item)"
							style="flex-direction: column;width: 100%;margin-top: 12upx;padding:0 12upx;border-radius: 8upx;">
							<view style="width:100%; height: 240upx;display:flex;justify-content:center;align-items: center;">
								<image style="width: 100%;height:240upx;border-radius: 8upx;" mode="scaleToFill" :src="decodeURIComponent(item.featureCoverImage)">
									<view style="position: absolute;width:97%;height: 240upx;background: rgba(0,0,0,0.4);justify-content: center;align-items: center;">
										<text style="padding:0 60upx;font-size: 32upx;font-weight: bold;color: #FFFFFF;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
											{{item.featureName}}
										</text>
									</view>
								</image>
							</view>
							<view style="width: 100%;height: 60upx;align-items: center;justify-content: center;padding: 0 20upx;background-color: #FFFFFF;">
								<text style="line-height: 60upx;padding:0 10upx;">
									<text>查看更多相关文章</text>
								</text>
								<view style="width:16upx;height:16upx;border-top:2upx solid #5c5f66; border-right:2upx solid #5c5f66;transform: rotate(45deg);"></view>
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
				title:'新手养猫'	,
				list:[],
				enableScroll: true,
				loadMoreStatus: 1, //加载更多 0加载前，1加载中，2没有更多了
				limit:10,
				page:1,
				featureListId:''
			}
		},
		async onLoad(e) {
			this.featureListId = e.id
			this.onPulldownReresh()
		},
		methods: {
			gotoDetails(item){
				uni.navigateTo({
					url:this.navigatorUrl.featureDetailsPages + '?id=' + item.featureId
				})
			},
			//前端查询  列表分页
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"featureListId": this.featureListId,
				}
				let opts={ url:'/portal/v1/feature_list/get', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							//设置标题
							uni.setNavigationBarTitle({
							    title: res.data.data.featureListName
							});
							if(res.data.data.featurePage.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								let arr = res.data.data.featurePage.records
								for(let i=0;i<arr.length;i++){
									if(this.list.length<res.data.data.featurePage.total)this.list.push(arr[i])
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
		margin: 0 0 100upx 0;
		.panel-item{
			// background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
