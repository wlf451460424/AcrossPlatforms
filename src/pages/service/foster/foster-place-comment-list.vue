<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" scroll-y="true" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding: 12upx 20upx;background-color: #FFFFFF;margin-bottom: 2upx;">
								<view style="flex-direction: row;width: 100%;height: 80upx;">
									<view style="width: 60%;height:100%;">
										<image :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
											<text style="line-height: 40upx;height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.userNickname}}
											</text>
											<text style="line-height: 40upx;color: #b7b7b7;font-size: 20upx;">{{item.commentFriendlyDate}}</text>
										</view>
									</view>
									<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
										 <view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
										 	<view class="example-body">
										 		<uni-rate :value="item.evaluationScore" disabled="false" />
										 	</view>
										 </view>
										 <view @click="more(item)" style="height: 100%;align-items: center;">
										 	<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
										 </view>
									</view>
								</view>
								<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding-top: 12upx;">
									{{item.evaluationContent}}
								</text>
								<view @click="gotoHuifu_page(item)" v-if="item.replyCount>0?true:false" style="width: 100%;padding-top: 6upx;">
									<text style="padding: 0 12upx;background-color: #f1f1f1;border-radius: 4upx;font-size: 24upx;">{{item.replyCount}}条回复</text>		
								</view>
							</view>
							
							<!-- <view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding: 20upx 20upx;border-bottom: 1px solid #b7b7b7;">
								<view style="flex-direction: row;width: 100%;height: 80upx;">
									<view style="width: 60%;height:100%;">
										<image :src="decodeURIComponent(item.userAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
											<text style="line-height: 40upx;height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.userNickname}}
											</text>
											<text style="line-height: 40upx;color: #b7b7b7;">{{item.commentFriendlyDate}}</text>
										</view>
									</view>
									<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
										 <view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
										 	<view class="example-body">
										 		<uni-rate :value="item.evaluationScore" disabled="false" />
										 	</view>
										 </view>
										 <image @click="more(item)" src="@/static/actionImg/more.png" style="width: 38upx; height: 12upx;"></image>
									</view>
								</view>
								<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;">
									{{item.evaluationContent}}
								</text>
								<view @click="gotoHuifu_page(item)" v-if="item.replyCount" style="width: 100%;height: 50upx;">
									<text style="padding: 0 12upx;background-color: #b7b7b7;border-radius: 10upx;">{{item.replyCount}}条回复</text>		
								</view>
							</view> -->
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
					<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh.vue';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
	import uniSection from '@/components/rate/uni-section/uni-section.vue'
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
			uniRate,
			uniSection
		},
		data() {
			return {
				avatarUrl_default:"/static/header_default.png",
				
				limit:10,
				page:1,
				list:[],
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				jubao_Info:Object,//举报参数
				PlaceId:'',
				
				commentType:'', //0:寄养；1:配对
			}
		},
		onLoad(e) {
			this.PlaceId = e.id;
			this.commentType = e.type; //0:寄养；1:配对
			//下拉刷新
			this.onPulldownReresh()
		},
		// onShow() {
		// 	//下拉刷新
		// 	this.onPulldownReresh()
		// },
		methods: {
			//更多操作
			more(item){
				
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.jubao_Info = item;
			},
			//举报
			jubao(){
				let reportType = ''
				 //0:寄养；1:配对
				if(this.commentType == 0){
					//7: 寄养场所 8：寄养场所评价 9：寄养场所回复
					reportType = 8
				}else{
					//11. 配对详情 12. 配对详情评价 13. 配对详情回复
					reportType = 12
				}
				
				uni.navigateTo({   
					url:'/pages/discover/report/index?id='+this.jubao_Info.evaluationId + '&type=' + reportType
				})
				this.$refs.showMore.close()
			},
			//跳转回复页面
			gotoHuifu_page(item){
				uni.navigateTo({
					url:'foster-place-reply-list?id=' + item.evaluationId + '&type=' + this.commentType
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
				
				//获取寄养家庭评价列表
				this.getPinlunList(type)
			},
			//获取寄养家庭评价列表
			getPinlunList(type){
				let param={ 
					"evaluationPlaceId": this.PlaceId,  //寄养场所id
					"evaluationType": this.commentType, //服务类型 0:寄养 1:配对
					"limit": 10,
					"page": 1
				} ;
				let opts={ url:'/portal/v1/evaluation/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								if(this.list.length<res.data.data.total){
									this.list = this.list.concat(res.data.data.records)
									for(var i=0;i<this.list.length;i++){
										this.list[i].evaluationScore = this.list[i].evaluationScore
										this.list[i].commentFriendlyDate = friendlyDate(new Date(this.list[i].createTime.replace(/\-/g,'/')).getTime(),this.list[i].createTime)
									}
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
		margin: 2upx 0 100upx;
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
</style>