<template>
	<view class="content">
		<view class="banner" style="margin-bottom: 4upx;">
			<image class="banner-img" mode="scaleToFill" :src="decodeURIComponent(featurePic)" ></image>
			<view style="position: absolute;width:100%;height: 260upx;background: rgba(0,0,0,0.2);"></view>
			<view class="banner-title">
				<text style="width:100%;max-height: 80upx;line-height: 40upx;font-size: 32upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
					{{featureName}}
				</text>
				<view style="height: 10upx;"></view>
				<text style="width:100%;font-size: 24upx;color: #FFFFFF;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
					{{featureDescription}}
				</text>
			</view>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="width: 100%;flex-direction: column;">
							<view v-for="(item,index) in list" :key="index" @click="goActionItem_Details(item)"
								style="width: 100%;background-color: #FFFFFF;border-radius: 6upx;margin-bottom: 2upx;padding: 20upx 20upx 20upx 12upx;">
								<view style="width: 100%;flex-direction: column;margin-right: 10upx;padding: 12upx;"> 
									<view style="width: 100%;height: 80upx;flex-direction: column;">
										<text style="width:100%;font-size: 28upx;font-weight: bold;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
											{{item.postTitle}}
										</text>
										<text v-if="!item.postTitle" style="width:100%;font-size: 28upx;font-weight: bold;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
											{{item.postContent}}
										</text>
									</view>
									<view style="width:100%;height: 50upx;align-items: flex-end;color: #b7b7b7;font-size: 24upx;">
										<text style="margin-right: 6upx;">{{item.postPageViews}}</text>次浏览
										<text style="margin: 0 10upx;">•</text>
										<text style="margin-right: 6upx;">{{item.postUpvoteCount}}</text>赞
									</view>
								</view>
								
								<view v-if="item.postContentType === 0 && item.postImage" style="min-width: 30%;height: 100%;align-items: center;">
									<!-- <image style="width: 100%;height: 154upx;border-radius: 4upx;" :src="decodeURIComponent(item.postImage)" mode="aspectFill" ></image> -->
									
									<view v-if="item.postImage" style="position: relative;width: 100%;height: 154upx;border-radius: 4upx;">
										<image :src="decodeURIComponent(item.postImage) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
										<view v-if="item.postImageGif" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
											<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
										</view>
									</view>
								</view>
								<view v-if="item.postContentType === 1" style="position: relative;min-width: 30%;height: 100%;align-items: center;">
									<image style="width: 100%;height: 154upx;border-radius: 4upx;" :src="decodeURIComponent(item.postImage)" mode="aspectFill" ></image>
									<view style="border-radius: 10upx;z-index: 2;position: absolute;background: rgba(0,0,0,0.4);width: 100%;height: 100%;align-items:center;justify-content: center;font-size: 40px;">
										<image style="width: 50upx;height: 50upx;" src="@/static/play.png"></image>
									</view>
									<view style="font-size: 12px;z-index: 3;position: absolute;color: #FFFFFF;width: 100%;height: 100%;align-items: flex-end;justify-content: flex-end;">
										<text style="margin:0 12upx;text-align: end;">{{times}}</text>
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
	import qs from 'qs'
	export default {
		data() {
			return {
				featureId:'',
				featurePic:'',
				featureName:'',
				featureDescription:'',
				webUrl:'',
				list:[],
				enableScroll: true,
				loadMoreStatus: 1, //加载更多 0加载前，1加载中，2没有更多了
				limit:10,
				page:1,
				times:"",
			}
		},
		
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU
		onShareAppMessage(res) {
		    return {
		      title: this.featureDescription,
		      // path: this.webUrl,
		    }
		},
		onShareTimeline() {
			return {
				title: this.featureDescription,
				imageUrl: this.featurePic,
			}
		},
		// #endif
		async onShow(){
			if(this.featureId && this.featureName){
				this.trackEvent()
			}
		},
		async onLoad(e) {
			this.featureId = e.id
			let param={
				"limit": this.limit,
				"page": this.page,
				"featurePostFeatureId": this.featureId,
			}
			let str = '/portal/v1/feature/get/' + this.featureId
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					// debugger
					if(res.data.code == 200 ){
						//设置标题
						uni.setNavigationBarTitle({
						    title: res.data.data.featureName
						});
						this.featurePic = res.data.data.featureCoverImage
						this.featureName = res.data.data.featureName
						this.featureDescription = res.data.data.featureDescription
						this.webUrl = res.data.data.webUrl
						
						this.trackEvent()
					}
				}
			)
			this.onPulldownReresh()
		},
		methods: {
			trackEvent(){
				// #ifdef MP-WEIXIN
				wx.uma.trackEvent(this.calculation.umeng_event_feature_detail_total,{'sweetPetsId':this.featureId,'sweetPetsName':this.featureName,'triggerCounter':1});
				// #endif
				// #ifdef MP-QQ
				qq.uma.trackEvent(this.calculation.umeng_event_feature_detail_total,{'sweetPetsId':this.featureId,'sweetPetsName':this.featureName,'triggerCounter':1});
				// #endif
				// #ifdef MP-TOUTIAO
				tt.uma.trackEvent(this.calculation.umeng_event_feature_detail_total,{'sweetPetsId':this.featureId,'sweetPetsName':this.featureName,'triggerCounter':1});
				// #endif
				// #ifdef MP-BAIDU
				swan.uma.trackEvent(this.calculation.umeng_event_feature_detail_total,{'sweetPetsId':this.featureId,'sweetPetsName':this.featureName,'triggerCounter':1});
				// #endif
			},
			//同城详情跳转
			goActionItem_Details(item) {
				if(item.featurePostType == 0 ){//文章
					uni.navigateTo({
						url:this.navigatorUrl.articleDetailsPages + '?id=' + item.featurePostPostId
					})
				}
				if(item.featurePostType == 1){//笔记
					uni.navigateTo({
						url:this.navigatorUrl.noteDetailsPages + '?id=' + item.featurePostPostId
					})
				}
				if(item.featurePostType == 2){//动态
					uni.navigateTo({
						url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.featurePostPostId
					})
				}
				if(item.featurePostType == 3){//问答
					uni.navigateTo({
						url:this.navigatorUrl.qaDetailsPages + '?id=' + item.featurePostPostId
					})
				}
			},
			getTime(duration) {
				var min = parseInt(duration / 60);
				var sec = parseInt(duration % 60);
				return this.getType(min) + ":" + this.getType(sec);
			},
			getType(time) {
				return time<10 ? "0" + time : time.toString();
			},
			//前端查询  列表分页
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"featurePostFeatureId": this.featureId,
				}
				let str = '/portal/v1/feature/getFeatureById'
				let opts={ url:str, method:'POST' }
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
									var str=arr[i].postContent;
									//提取图片
									if(arr[i].featurePostType == 0){
										var str = arr[i].postContent
										//匹配图片（g表示匹配所有结果i表示区分大小写）
										var imgReg = /<img.*?(?:>|\/>)/gi;
										//匹配src属性
										var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
										var array = str.match(imgReg);
										if(array){
											arr[i].postImage = array[0].match(srcReg)[1];
										}
									}
									//只拿首张图
									arr[i].postImage = arr[i].postImage.split(",")[0]
									//判断动图gif
									if(arr[i].postImage){
										arr[i].postImage = decodeURIComponent(arr[i].postImage).split("?")[0]
										if(arr[i].postImage.indexOf(".gif") != -1){
											arr[i].postImageGif = 1
										}else{
											arr[i].postImageGif = 0
										}
									}
									//处理标签
									arr[i].postContent=str.replace(/<.*?>/ig,"");
									
									// 处理赞 评论 浏览数量
									arr[i].postUpvoteCount = this.calculation.digitalConversion(arr[i].postUpvoteCount)
									arr[i].postPageViews = this.calculation.digitalConversion(arr[i].postPageViews)
									
									if(arr[i].postContentType === 1){
										let obj = qs.parse(arr[i].postImage.split('?')[1])
										if(obj.duration){
											arr[i].times = this.getTime(obj.duration)
										}
									}
									
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
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	
	.banner {
	    height: 260upx;
	    overflow: hidden;
	    position: relative;
	    background-color: #ccc;
	}
	.banner-img {
	    width: 100%;
		height: 260upx;
		// filter: blur(2px);
	}
	.banner-title {
		width: 100%;
		flex-direction: column;
	    overflow: hidden;
	    position: absolute;
	    bottom: 10upx;
	    color: white;
	    z-index: 11;
		padding: 0 30upx;
	}
</style>
