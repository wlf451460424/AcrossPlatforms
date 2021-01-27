<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;">
			<view 
				v-for="(item,index) in tabBars" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab'+index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list_0" :key="index" @click="goActionItem_Details(item)" style="width: 100%;height: 120upx;align-items: center;background: #FFFFFF;padding: 0 12upx;margin-top: 2upx;">
								<view style="width: 13%;">
									<image :src="decodeURIComponent(self_avatarUrl)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
								</view>
								<view style="width: 87%;flex-direction: column;">
									<view style="width: 100%;">
										<view style="width: 75%;">
											<text>我评论了</text>
											<text style="color: #f76d45;max-width: 200upx;overflow: hidden;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">{{item.commentPostUserNickname}}</text>
											的
											<text>{{typeText[item.commentPostType]}}</text>
										</view>
										<view style="width:40%;justify-content: flex-end;align-items: center;">
											<text style="color: #AAAAAA;font-size: 24upx;">{{item.timerAgo}}</text>
										</view>
									</view>
									<text style="color: #AAAAAA;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										{{item.commentContent}}
									</text>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list_1" :key="index" @click="goActionItem_Details(item)" style="width: 100%;height: 120upx;align-items: center;background: #FFFFFF;padding: 0 12upx;margin-top: 2upx;">
								<view style="width: 13%;">
									<image :src="decodeURIComponent(self_avatarUrl)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
								</view>
								<view style="width: 87%;flex-direction: column;">
									<view style="width: 100%;">
										<view style="width:75%;">
											<text>我回复了</text>
											<text style="color: #f76d45;max-width: 200upx;overflow: hidden;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">{{item.replyTargetUserNickname}}</text>
											的
											<text>{{item.replyType == 0?'评论':'回复'}}</text>
										</view>
										<view style="width:40%;justify-content: flex-end;align-items: center;">
											<text style="color: #AAAAAA;font-size: 24upx;">{{item.timerAgo}}</text>
										</view>
									</view>
									<text style="color: #AAAAAA;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										{{item.replyContent}}
									</text>
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
				typeText:["文章","笔记","动态","问答","新闻","评论","回复","用户","话题","小组","赞",
						"收藏","分享","发布","关注","领养","寄养","配对","评价","订单"],
				// typeText:["文章","笔记","动态","问答"],
				avatarUrl_default:"../../../static/header_default.png",
				
				tabBars: [
					{name: "我的评论", id: '0'},
					{name: "我的回复", id: '1'},
				],
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				list_0:[],
				list_1:[],
				
				self_avatarUrl:uni.getStorageSync('userInfo').userAvatar,//自己的头像
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取帖子列表
			this.onPulldownReresh();
		},
		methods: {
			//前端查询帖子列表分页
			getPostList(type){
				let param={}
				let opts={}
				if(this.tabCurrentIndex==0){
					param={
						"limit": this.limit,
						"page": this.page_0,
						"commentUserId": uni.getStorageSync('userInfo').userId
					} ;
					opts={ url:'/portal/v1/comment/page/list', method:'POST' }
				}
				if(this.tabCurrentIndex==1){
					param={
						"limit": this.limit,
						"page": this.page_1,
						"replyUserId": uni.getStorageSync('userInfo').userId,
					} ;
					opts={ url:'/portal/v1/reply/page/list', method:'POST' }
				}
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								if(this.tabCurrentIndex==0)this.page_0 --
								if(this.tabCurrentIndex==1)this.page_1 --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
									if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
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
				this.list_0 = [];
				this.list_1 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
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
			
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			//tab切换
			async changeTab(e){
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
						this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
					}else{
						this.scrollLeft = 0;
					}
					if(typeof e === 'object'){
						this.tabCurrentIndex = index; 
					}
					this.tabCurrentIndex = index; 
					// //第一次切换tab，动画结束后需要加载数据
					// if(this.tabCurrentIndex !== 0 && this.loaded !== true){
					// 	this.loadNewsList('add');
					// 	this.loaded = true;
					// }
					
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
			goActionItem_Details(item) {
				if(this.tabCurrentIndex==0){
					if(item.commentPostType == 0 ){//文章
						uni.navigateTo({
							url:this.navigatorUrl.articleDetailsPages + '?id=' + item.commentPostId
						})
					}
					if(item.commentPostType == 1){//笔记
						uni.navigateTo({
							url:this.navigatorUrl.noteDetailsPages + '?id=' + item.commentPostId
						})
					}
					if(item.commentPostType == 2){//动态
						uni.navigateTo({
							url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.commentPostId
						})
					}
					if(item.commentPostType == 3){//问答
						uni.navigateTo({
							url:this.navigatorUrl.qaDetailsPages + '?id=' + item.commentPostId
						})
					}
				}
				if(this.tabCurrentIndex==1){
					uni.navigateTo({
						url:'comment-list-reply-details?id=' + item.replyTargetId + '&type=' + (item.replyType+5)   + '&list_type=6' + '&list_id=' + item.replyId
					})
				}
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
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		margin-top: 2upx;
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
