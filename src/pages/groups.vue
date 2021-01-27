<template>
	<view class="content">
		<view style="width: 100%;height: 80upx;background-color: #FFFFFF;padding: 12upx;">
			<text style="font-weight: 700;">热门小组</text>
		</view>
		<view style="flex-direction: row;width: 100%;max-height:244upx;flex-wrap: wrap;justify-content: center;">
			<view v-for="(item,index) in cardBars" :key="index" @click="click_cardBars(item)"
				style="flex-direction: row;width:49.5%; height: 120upx;background: #FFFFFF;margin-right: 2upx;margin-bottom: 2upx;">
				<view style="width: 140upx; height: 100%;justify-content:center;align-items:center;">
					<image :src="decodeURIComponent(item.groupAvatar)" mode="aspectFill" style="width: 90upx; height: 90upx; border-radius: 50upx;"></image>
				</view>
				<view style="width:60%;height: 100%;flex-direction: column;justify-content: center;">
					<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
						{{item.groupName}}
					</text>
					<text style="color: #AAAAAA;font-size: 20upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
						{{item.followCount}}人已加入
					</text>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<view style="z-index: 2;display: flex;flex-direction: row;width: 100%;height: 80upx; margin-top: 8upx">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="height: 80upx;overflow: hidden;background-color: #FFFFFF;padding-right: 10upx;">
				<view 
					v-for="(item,index) in tabBars" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index,item.kindId)"
				>{{item.kindName}}</view>
			</scroll-view>
			<view @click="moreTypeClick" style="width: 90upx;height: 80upx;align-items: center;justify-content: center;background-color: #FFFFFF;margin-left: 2upx;">
				<image src="@/static/mine-ico/pullDown.png" style="width: 30upx;height: 18upx;"></image>
			</view>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 小组 -->
							<view  v-for="(item,index) in list" :key="index" style="flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:8upx;align-items: center;padding: 12upx 20upx 20upx 12upx;">
								<view style="width:100%;align-items: center;">
									<image :src="decodeURIComponent(item.groupAvatar)" mode="aspectFill"  @click="click_cardBars(item)" style="width: 100upx;height: 100upx;border-radius: 60upx;"></image>
									<view style="flex-direction: column; margin-left: 12upx;width: 80%;">
										<view style="width: 100%;">
											<text  @click="click_cardBars(item)" style="width: 70%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.groupName}}
											</text>
										</view>
										<text  @click="click_cardBars(item)" style="font-size: 24upx;color: #AAAAAA;width: 100%;height: 80upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
											简介 : {{item.groupIntroduction}}
										</text>
									</view>
								</view>
								<view  v-if="!item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 20%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;background: #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">加入</text>
									</view>
								</view>
								<view  v-if="item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 20%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;border: 1px solid #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已加入</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		
		<view v-if="menuView"  style="z-index: 6;position: fixed;margin-top: 416upx;width: 100%;height:100%;background-color:rgba(255,255,255,0);flex-direction: column;">
			<scroll-view scroll-y="true" style="max-height: 400upx;">
				<view ref="aside" style="flex-direction: row; width: 100%;flex-wrap: wrap;background-color: #FFFFFF;padding:20upx 0 40upx 0;">
					<view @click="selectItemClick(index,item.kindId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagId"
						style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx 20upx 10upx 0;">
							<text>{{item.kindName}}</text>
					</view>
				</view>
			</scroll-view>
			<view @click="close" style="width: 100%;height: 100%;background-color:rgba(0,0,0,0.4);"></view>
		</view>
		
	</view>
</template>

<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				avatarUrl_default:"../../static/header_default.png",
				
				tabBars: [],
				cardBars: [],
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				nowSelectTypeId:'',
				
				menuView:false,
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			
			//查询热门品种
			this.getHotList()
			//查询种类
			this.getKindList()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/group/group-search'
			})
		},
		methods: {
			//查询热门品种
			getHotList(type){
				let param={"limit": 10,"page": 1,};
				let str = '/portal/v1/group/hot/list';
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.cardBars = res.data.data.records.slice(0,4);
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
			//查询种类
			getKindList(type){
				let param={};
				let str = '/portal/v1/kind/get';
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.tabBars = res.data.data.records;
							
							this.nowSelectTypeId = this.tabBars[0].kindId;
							//获取帖子列表
							this.loadNewsList('refresh');
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
			moreTypeClick(){
				this.menuView = !this.menuView
			},
			selectItemClick(index,value){
				this.menuView = false
				this.changeTab(index,value)
			},
			close(){
				this.menuView = false
			},
			//查询品种列表
			getBreedList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"groupKindId": this.nowSelectTypeId,
				}
				let opts={ url:'/portal/v1/group/kind/list', method:'POST' }
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
				this.getBreedList(type)
			},
			
			//tab切换
			async changeTab(e,value){
				this.menuView = false
				
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
			click_cardBars(item){
				this.menuView = false
				uni.navigateTo({
					url:this.navigatorUrl.groupDetailsPages + '?id=' + item.groupId
				})
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.groupId, //关注目标ID
					"followTargetType": 9, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.groupId == this.list[i].groupId){
									this.list[i].currentUserFollowStatus = !this.list[i].currentUserFollowStatus
								}
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
			width: 16%;
			height: 80upx;
			line-height: 80upx;
			padding: 0 20upx;
			margin-right: 20upx;
			text-align: center;
			line-height: 80upx;
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				/* border-bottom: 2upx solid #f76d45; */
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
	
</style>
