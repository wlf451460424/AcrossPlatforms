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
							<!-- 小组 -->
							<view  v-for="(item,index) in list_0" :key="index" style="flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:2upx;align-items: center;padding:24upx;">
								<view @click="go_page(item.followTargetId)" style="width:100%;align-items: center;">
									<image :src="decodeURIComponent(item.followTargetAvatar)" mode="aspectFill"  @click="click_cardBars(item)" style="width: 100upx;height: 100upx;border-radius: 60upx;"></image>
									<view style="flex-direction: column; margin-left: 12upx;width: 80%;">
										<view style="width: 100%;">
											<text style="width: 70%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.followTargetName}}
											</text>
										</view>
										<text style="font-size: 24upx;color: #AAAAAA;width: 100%;line-height:50upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											简介 : {{item.followTargetProfile}}
										</text>
									</view>
								</view>
								<view  v-if="!item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;background: #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">加入</text>
									</view>
								</view>
								<view  v-if="item.followTargetStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;border: 1px solid #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已加入</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 话题 -->
							<view v-for="(item,index) in list_1" :key="index" style="flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:2upx;padding:24upx;" >
								<view @click="go_page(item.followTargetId)" style="display: flex;align-items:center;margin-right: 20upx;">
									<image :src="item.followTargetAvatar" style="width:100upx;height: 100upx;border-radius: 100upx;"></image>
								</view>
								<view @click="go_page(item.followTargetId)" style="flex-direction: column; width: 100%;height: 100%;">
									<view style="flex-direction: column;width: 100%;">
										<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											#{{item.followTargetName}}#
										</text>
										<text style="color: #888888;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.followTargetProfile}}
										</text>
									</view>
									<view style="flex-direction: row;width: 100%;">
										<text style="width: 60%;color: #F76D45;">{{item.partNumber}}人已参与</text>
									</view>
								</view>
								<view v-if="!item.followTargetStatus"  style="min-width: 25%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;background: #ffbf59;">
										<text style="line-height: 50upx;color: #FFFFFF;font-size: 24upx;">关注</text>
									</view>
								</view>
								<view v-if="item.followTargetStatus" style="min-width: 25%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;border: 1px solid #ffbf59;">
										<text style="line-height: 50upx;color: #ffbf59;font-size: 24upx;">已关注</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 标签 -->
							<view v-for="(item,index) in list_2" :key="index" style="flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:2upx;padding:24upx;" >
								<view @click="go_page(item.followTargetId)" style="display: flex;align-items:center;margin-right: 20upx;">
									<image :src="item.followTargetAvatar" style="width:100upx;height: 100upx;border-radius: 100upx;"></image>
								</view>
								<view @click="go_page(item.followTargetId)" style="flex-direction: column; width: 100%;height: 100%;">
									<view style="flex-direction: column;width: 100%;">
										<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.followTargetName}}
										</text>
										<text style="color: #888888;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.followTargetProfile}}
										</text>
									</view>
									<view style="flex-direction: row;width: 100%;">
										<text style="width: 60%;color: #F76D45;">{{item.partNumber}}人已参与</text>
									</view>
								</view>
								<view v-if="!item.followTargetStatus"  style="min-width: 25%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;background: #ffbf59;">
										<text style="line-height: 50upx;color: #FFFFFF;font-size: 24upx;">订阅</text>
									</view>
								</view>
								<view v-if="item.followTargetStatus" style="min-width: 25%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;border: 1px solid #ffbf59;">
										<text style="line-height: 50upx;color: #ffbf59;font-size: 24upx;">已订阅</text>
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
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	import tweentItem from 'pages/component/tweent-item.vue';
	import articleItem from 'pages/component/article-item.vue';
	export default {
		components: {
			tweentItem,
			articleItem
		},
		data() {
			return {
				isFold:false,
				avatarUrl_default:"../../static/header_default.png",
				
				tabBars: [{
					name: '小组',
					id: '0',
				}, {
					name: '话题',
					id: '1'
				}, {
					name: '标签',
					id: '2',
				}],//导航
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: false,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				page_2:1,
				list_0:[],
				list_1:[],
				list_2:[],
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取帖子列表
			this.onPulldownReresh();
		},

		methods: {
			//前端查询帖子列表分页   热门推荐
			getPostList(type){
				let param={}
				let opts={}
				switch(this.tabCurrentIndex){
					case 0:
						param={
							"limit": this.limit,
							"page": this.page,
							"followTargetType": 9, //关注目标类型 //关注目标类型  7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注  20-标签
							"followUserId": uni.getStorageSync('userInfo').userId,
						}
						opts={ url:'/portal/v1/follow/page/list', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								// debugger
								if(res.data.code == 200 ){
									if(res.data.data.records.length ==0){//没有数据
										if(this.tabCurrentIndex==0)this.page_0 --
										if(this.tabCurrentIndex==1)this.page_1 --
										if(this.tabCurrentIndex==2)this.page_2 --
										// //上滑加载 处理状态
										this.loadMoreStatus = 2;
									}else{
										let arr = res.data.data.records
										for(let i=0;i<arr.length;i++){
											//处理时间
											if(this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
										}
									}
									
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
						break;
					case 1:
						param={
							"limit": this.limit,
							"page": this.page,
							"followTargetType": 8, //关注目标类型 //关注目标类型  7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注  20-标签
							"followUserId": uni.getStorageSync('userInfo').userId,
						}
						opts={ url:'/portal/v1/follow/page/list', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								// debugger
								if(res.data.code == 200 ){
									if(res.data.data.records.length ==0){//没有数据
										if(this.tabCurrentIndex==0)this.page_0 --
										if(this.tabCurrentIndex==1)this.page_1 --
										if(this.tabCurrentIndex==2)this.page_2 --
										// //上滑加载 处理状态
										this.loadMoreStatus = 2;
									}else{
										let arr = res.data.data.records
										for(let i=0;i<arr.length;i++){
											if(this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
										}
									}
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
						break;
					case 2:
						param={
							"limit": this.limit,
							"page": this.page,
							"followTargetType": 20, //关注目标类型 //关注目标类型  7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注  20-标签
							"followUserId": uni.getStorageSync('userInfo').userId,
						}
						opts={ url:'/portal/v1/follow/page/list', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								// debugger
								if(res.data.code == 200 ){
									if(res.data.data.records.length ==0){//没有数据
										if(this.tabCurrentIndex==0)this.page_0 --
										if(this.tabCurrentIndex==1)this.page_1 --
										if(this.tabCurrentIndex==2)this.page_2 --
										// //上滑加载 处理状态
										this.loadMoreStatus = 2;
									}else{
										let arr = res.data.data.records
										for(let i=0;i<arr.length;i++){
											if(this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
										}
									}
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
						break;
				}
			},
			//下拉刷新
			onPulldownReresh(){
				this.list_0 = [];
				this.list_1 = [];
				this.list_2 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				this.page_2 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
				if(this.tabCurrentIndex==2)this.page_2 ++
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
				// uni.pageScrollTo({
				// 	duration:0,
				// 	scrollTop:0
				// })
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
			
			go_page(value) {
				if(this.tabCurrentIndex == 0){//小组
					uni.navigateTo({
						url:this.navigatorUrl.groupDetailsPages + '?id=' + value
					})
				}
				if(this.tabCurrentIndex == 1){//话题
					uni.navigateTo({
						url:this.navigatorUrl.topicDetailsPages + '?id=' + value
					})
				}
				if(this.tabCurrentIndex == 2){//标签
					uni.navigateTo({
						url:this.navigatorUrl.tagDetailsPages + '?id=' + value
					})
				}
			},
			//添加/修改关注状态
			ClickCareBtn(item){
				if(this.tabCurrentIndex == 0){//小组
					let param={
						"followTargetId": item.followTargetId, //关注目标ID
						"followTargetType": 9, //关注目标类型   8：话题 9：小组 20：标签
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								for(var i=0;i<this.list_0.length;i++){
									if(item.followTargetId == this.list_0[i].followTargetId){
										this.list_0[i].followTargetStatus = !this.list_0[i].followTargetStatus
									}
								}
							}
						}
					)
				}
				if(this.tabCurrentIndex == 1){//话题
					let param={
						"followTargetId": item.followTargetId, //关注目标ID
						"followTargetType": 8, //关注目标类型   8：话题 9：小组 20：标签
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								for(var i=0;i<this.list_1.length;i++){
									if(item.followTargetId == this.list_1[i].followTargetId){
										this.list_1[i].followTargetStatus = !this.list_1[i].followTargetStatus
									}
								}
							}
						}
					)
				}
				if(this.tabCurrentIndex == 2){//标签
					let param={
						"followTargetId": item.followTargetId, //关注目标ID
						"followTargetType": 20, //关注目标类型    8：话题 9：小组 20：标签
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								for(var i=0;i<this.list_2.length;i++){
									if(item.followTargetId == this.list_2[i].followTargetId){
										this.list_2[i].followTargetStatus = !this.list_2[i].followTargetStatus
									}
								}
							}
						}
					)
				}
			},
			//举报
			jubao(){
				this.$refs.showMore.close()
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'report/index?id='+ this.more_Info.postId + '&type=' + this.more_Info.postType
					})
				}else{
					uni.showToast({
						icon:'none',
					    title: "请重新登录",
					    duration: 1000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/login/account-login'
						})
					}, 500)
				}
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let token = uni.getStorageSync('token');
				if(token){
					let param={
						"postId":this.more_Info.postId,//对象Id
						"postType": this.more_Info.postType,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
					} ;
					let opts={ url:'/portal/v1/post/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								uni.navigateBack()
							}else{
								uni.showToast({
								    title: res.data.msg,
									icon: 'none',
								    duration: 1000
								});
							}
						}
					)
				}else{
					uni.showToast({
						icon:'none',
					    title: "请重新登录",
					    duration: 1000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/login/account-login'
						})
					}, 500)
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
		height: 80upx;
		white-space: nowrap;
		background-color: #fff;
		text-align: center;
		padding: 0 10%;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 33.3%;
			height: 80upx;
			text-align: center;
			line-height:80upx;
			position: relative;
			// font-weight: 700;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #f76d45;
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
				width: 50%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 110upx;
	}
</style>
