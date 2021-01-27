<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list" :key="index" style="width: 100%;height: 120upx;align-items: center;background-color: #FFFFFF;padding: 0 12upx;margin-top: 2upx;">
								<view style="width: 13%;flex-direction: column;">
									<view v-if="!item.messageStatus" style="width: 16upx;height: 16upx;border-radius: 8upx;background-color: #FF0000;"></view>
									<image @click="gotoPersonalPage(item)" :src="decodeURIComponent(item.messageTargetUserAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
								</view>
								<view style="width: 87%;flex-direction: column;" @click="go_Details(item)">
									<view style="width: 100%;align-items: center;">
										<view style="width:70%;">
											<text style="color: #f76d45;max-width: 200upx;overflow: hidden;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">{{item.messageTargetUserNickname}}</text>
											赞了我的
											<text>{{typeText[item.messageRecordTargetType]}}</text>
										</view>
										<view style="width:40%;height: 100%;justify-content: flex-end;">
											<text style="color: #AAAAAA;font-size: 24upx;">{{item.timerAgo}}</text>
										</view>
									</view>
									<text style="color: #AAAAAA;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										{{item.messageTitleOrContent}}
									</text>
									<!-- <text v-if="item.messageRecordTargetType !=5 && item.messageRecordTargetType !=6" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										{{item.messageTitleOrContent}}
									</text>
									<text v-if="item.messageRecordTargetType ==5 || item.messageRecordTargetType ==6" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										{{item.messageContent}}
									</text> -->
								</view>
								
								<!-- <view style="width:20%;align-items: center;flex-direction: column;">
									<view style="width: 100%;height: 50upx;justify-content: flex-end;">
										<image @click="more(item)" src="@/static/actionImg/more.png" style="width: 38upx; height: 12upx;"></image>
									</view>
									<view style="width: 100%;height: 50upx;justify-content: flex-end;">
										<text style="color: #b7b7b7;text-align: end;">{{item.timerAgo}}</text>
									</view>
								</view> -->
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;border: 1px solid #f76d45;justify-content: center;align-items: center;border-radius: 30px;">
					<text style="color:#f76d45;">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
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
				typeText:["文章","笔记","动态","问答","新闻","评论","回复"],
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				list:[],
				limit:10,
				page:1,
				
				more_Info:'',//点击更多对应的数据
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh();
		},
		onNavigationBarButtonTap() {
			let param={
				// "message_type":0,   //消息类型 0：赞/1：收藏/2：评论/3：回复/4：关注
				"message_type": 10, //关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
			} ;
			let opts={ url:'/portal/v1/message/update/readed/type', method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						for(let i=0;i<this.list.length;i++){
							this.list[i].messageStatus = 1
						}
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});
					}
				}
			)
		},
		methods: {
			//前端查询消息列表
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page, 
					// "messageType": 0,//消息类型 0：赞/1：收藏/2：评论/3：回复/4：关注
					"messageType": 10, //关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/message/list', method:'POST' }
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
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
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
			go_Details(item) {
				//根据消息id 更改消息查看状态
				let param={"messageId":item.messageId} ;
				let str = '/portal/v1/message/update/' + item.messageId;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
				
				for(let i=0;i<this.list.length;i++){
					if(item.messageId == this.list[i].messageId){
						this.list[i].messageStatus = 1
					}
				}
				
				switch (item.messageRecordTargetType) {
					case 0:
					case 1:
					case 2:
					case 3:
						if(item.messageRecordTargetType == 0 ){//文章
							uni.navigateTo({
								url:this.navigatorUrl.articleDetailsPages + '?id=' + item.messageRecordTargetId
							})
						}
						if(item.messageRecordTargetType == 1){//笔记
							uni.navigateTo({
								url:this.navigatorUrl.noteDetailsPages + '?id=' + item.messageRecordTargetId
							})
						}
						if(item.messageRecordTargetType == 2){//动态
							uni.navigateTo({
								url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.messageRecordTargetId
							})
						}
						if(item.messageRecordTargetType == 3){//问答
							uni.navigateTo({
								url:this.navigatorUrl.qaDetailsPages + '?id=' + item.messageRecordTargetId
							})
						}
						break;
					case 5:
						uni.navigateTo({
							url:'../more/comment-list-comment-details?id=' + item.messageRecordTargetId
						})
						break;
					case 6:	
						uni.navigateTo({
							url:'../more/comment-list-reply-details?id=' + item.messageRecordTargetId + '&type=' + item.messageRecordTargetType   + '&list_type=' + item.messageContentType + '&list_id=' + item.messageContentId
						})
						break;
				}
			},
			//更多操作
			more(item){
				this.$refs.showMore.open();
				this.more_Info = item;
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let param={"messageId":this.more_Info.messageId} ;
				let str = '/portal/v1/message/delete/' + this.more_Info.messageId;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//刷新加载页面
							this.onPulldownReresh()
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});	
						}
					}
				)
			},
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.messageUserId
				})
			},
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
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
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
