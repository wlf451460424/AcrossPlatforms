<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;height: 290upx;background-color: #FFFFFF;">
			<view style="flex-direction: row; width: 100%;height: 100%; flex-wrap: wrap;padding: 10upx 20upx;">
				<view v-for="(item,index) in cardBars" :key="index" @click="click_cardBars(item)"
					style="flex-direction: column;width: 25%; height: 140upx;display: inline-block;">
					<view style="width:100%; height:80upx;justify-content:center;align-items:center;">
						<image :src="item.menuConfigurationAvatar" style="width: 70upx; height:70upx;"></image>
					</view>
					<view style="width:100%; height: 50upx;line-height: 40upx;justify-content: center;">
						<text>{{item.menuConfigurationName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;margin-top: 8upx;">
			<view 
				v-for="(item,index) in tabBars" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab'+index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="-40" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll"  @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 文章 -->
							<articleItem v-for="(item,index) in list_0" :key="index" :receive-obj="{obj:item}"></articleItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 问答 -->
							<tweentItem v-for="(item,index) in list_1" :key="index" :receive-obj="{obj:item,isShowType:false}"></tweentItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 话题 -->
							<view v-for="(item,index) in list_2" :key="index" style="flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:8upx;padding: 0 20upx;" >
								<view @click="goTopicList(item.topicId)" style="display: flex;align-items:center;margin-right: 20upx;">
									<image :src="item.topicAvatar" style="width:100upx;height: 100upx;border-radius: 100upx;"></image>
								</view>
								<view @click="goTopicList(item.topicId)" style="flex-direction: column; width: 100%;height: 100%;padding:12upx">
									<view style="flex-direction: column;width: 100%;">
										<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											#{{item.topicTitle}}#
										</text>
										<text style="color: #888888;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.topicIntroduction}}
										</text>
									</view>
									<view style="flex-direction: row;width: 100%;">
										<text style="width: 60%;color: #F76D45;">{{item.partNumber}}人已参与</text>
										<!-- <text style="width: 40%;color: #A7A7A7;text-align:end;">{{item.timerAgo}}</text> -->
									</view>
								</view>
								<view v-if="!item.ifollowed"  style="min-width: 20%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;align-items: center;justify-content: center;background: #ffbf59;">
										<text style="line-height: 50upx;color: #FFFFFF;font-size: 24upx;">关注</text>
									</view>
								</view>
								<view v-if="item.ifollowed" style="min-width: 20%;align-items:center;justify-content: flex-end;">
									<view @click="ClickCareBtn(item)" style="width: 100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;align-items: center;justify-content: center;border: 1px solid #ffbf59;">
										<text style="line-height: 50upx;color: #ffbf59;font-size: 24upx;">已关注</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- 底部更多操作弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view v-if="jubao_show" @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
					<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
				</view>
				<view v-if="del_show" @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
				</view>
			</view>
		</uni-popup>
		<!-- #ifdef H5 -->
		<cover-view class="controls-title" @click="downLoadApp"
			style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
			APP内打开
		</cover-view>
		<!-- #endif -->
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
				cardBars: [],
				tabBars: [{
					name: '热门文章',
					id: '0',
				}, {
					name: '热门问答',
					id: '1'
				}, {
					name: '热门话题',
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
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU
		onShareAppMessage(res) {
		    return {
		      title: '甜宠',
		    }
		},
		onShareTimeline() {
			return {
				title: '甜宠',
			}
		},
		// #endif
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取帖子列表
			this.onPulldownReresh();
		},
		onShow() {
			this.//获取菜单配置列表
			getTabbarsList()
			this.trackEvent("")
		},
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url:'/pages/discover/search/index'
			})
		},
		onNavigationBarButtonTap(val) {
			let token = uni.getStorageSync('token');
			if(token){
				uni.navigateTo({
					url:'/pages/mine/msg/index'
				})
			}else{
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}, 100)
			}
		},
		methods: {
			trackEvent(item){
				if(item == ""){
					// #ifdef MP-WEIXIN
					wx.uma.trackEvent(this.calculation.umeng_event_tab_discover);
					// #endif
					// #ifdef MP-QQ
					qq.uma.trackEvent(this.calculation.umeng_event_tab_discover);
					// #endif
					// #ifdef MP-TOUTIAO
					tt.uma.trackEvent(this.calculation.umeng_event_tab_discover);
					// #endif
					// #ifdef MP-BAIDU
					swan.uma.trackEvent(this.calculation.umeng_event_tab_discover);
					// #endif
				}else{
					// #ifdef MP-WEIXIN
					wx.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':item.menuConfigurationId,'sweetPetsName':item.menuConfigurationName,'triggerCounter':1});
					// #endif
					// #ifdef MP-QQ
					qq.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':item.menuConfigurationId,'sweetPetsName':item.menuConfigurationName,'triggerCounter':1});
					// #endif
					// #ifdef MP-TOUTIAO
					tt.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':item.menuConfigurationId,'sweetPetsName':item.menuConfigurationName,'triggerCounter':1});
					// #endif
					// #ifdef MP-BAIDU
					swan.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':item.menuConfigurationId,'sweetPetsName':item.menuConfigurationName,'triggerCounter':1});
					// #endif
				}
			},
			//获取菜单配置列表
			getTabbarsList(){
				let param={}
				let str = "/portal/v1/menu_configuration/page/list/all"
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.cardBars = res.data.data.records;
						}
					}
				)
			},
			//前端查询帖子列表分页   热门推荐
			getPostList(type){
				let value = "0"
				let param={}
				let opts={}
				switch(this.tabCurrentIndex){
					case 0:
						value=0
						param={
							"limit": this.limit,
							"page": this.page_0,
							"postType": value,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
						}
						opts={ url:'/portal/v1/post/get_post_by_hot', method:'POST' }
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
										// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
										for(let k=0;k<arr.length;k++){
											arr[k].postUpvoteCount = this.calculation.digitalConversion(arr[k].postUpvoteCount)
											arr[k].postCommentCount = this.calculation.digitalConversion(arr[k].postCommentCount)
											arr[k].postPageViews = this.calculation.digitalConversion(arr[k].postPageViews)
										}
										
										for(let i=0;i<arr.length;i++){
											//处理时间
											arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
											if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
											if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
											if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
										}
									}
									for(let i=0;i<this.list_0.length;i++){
										var str = this.list_0[i].postContent
										//匹配图片（g表示匹配所有结果i表示区分大小写）
										var imgReg = /<img.*?(?:>|\/>)/gi;
										//匹配src属性
										var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
										var arr = str.match(imgReg);
										if(arr){
											this.list_0[i].postImageShow = arr[0].match(srcReg)[1];
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
						break;
					case 1:
						value=3
						param={
							"limit": this.limit,
							"page": this.page_1,
							"postType": value,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
						}
						opts={ url:'/portal/v1/post/get_post_by_hot', method:'POST' }
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
										// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
										for(let k=0;k<arr.length;k++){
											arr[k].postUpvoteCount = this.calculation.digitalConversion(arr[k].postUpvoteCount)
											arr[k].postCommentCount = this.calculation.digitalConversion(arr[k].postCommentCount)
											arr[k].postPageViews = this.calculation.digitalConversion(arr[k].postPageViews)
										}
										
										for(let i=0;i<arr.length;i++){
											//处理时间
											arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
											if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
											if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
											if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
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
						break;
					case 2:
						param={
							"limit": this.limit,
							"page": this.page_2,
							"topicTypeId": "",
							"topicTypeName": "",
							"isHot":1,
							"topicIsRecommended":1
						}
						opts={ url:'/portal/v1/topic/page/list', method:'POST' }
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
										// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
										for(let k=0;k<arr.length;k++){
											arr[k].postUpvoteCount = this.calculation.digitalConversion(arr[k].postUpvoteCount)
											arr[k].postCommentCount = this.calculation.digitalConversion(arr[k].postCommentCount)
											arr[k].postPageViews = this.calculation.digitalConversion(arr[k].postPageViews)
										}
										
										for(let i=0;i<arr.length;i++){
											//处理时间
											arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
											if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
											if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
											if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
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
			//导航跳转
			click_cardBars(item){
				this.trackEvent(item)
				
				uni.navigateTo({
					url: "/pages" + item.menuConfigurationUrl
				})
			},
			goTopicList(postTopicId) {
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.topicId, //关注目标ID
					"followTargetType": 8, //关注目标类型 8：话题
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list_2.length;i++){
								if(item.topicId == this.list_2[i].topicId){
									this.list_2[i].ifollowed = !this.list_2[i].ifollowed
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
			},
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.postUserId
				})
			},
			gotoTopicListPage(postTopicId){
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			isFoldFunction(){
				this.isFold = !this.isFold
			},
			moreClick(item){
				this.del_show = false;
				this.jubao_show = false;
				if(item.postUserId === uni.getStorageSync('userInfo').userId){
					this.del_show = true;
				}else{
					this.jubao_show = true;
				}
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.more_Info = item;
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
			downLoadApp(){
				// #ifdef H5
				// this.calculation.wakeUp_app('toMain/main')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("mianDetails",{})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.showToast({
				    title: '请下载APP使用',
					icon: 'none',
				    duration: 2000
				});
				//  #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	page,
	view {
	    display: flex;
	}
	page {
	    display: flex;
	    height: 100%;
	    background-color: #f9f9f9;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		display: block;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 80upx;
		white-space: nowrap;
		background-color: #fff;
		text-align: center;
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
