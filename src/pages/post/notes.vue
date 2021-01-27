<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<view style="z-index: 2;display: flex;flex-direction: row;width: 100%;height: 80upx;">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;background-color: #FFFFFF;padding-right: 10upx;">
				<view 
					v-for="(item,index) in tabBars" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index,item.tagCategoryId)"
				>{{item.tagCategoryName}}</view>
			</scroll-view>
			<view @click="moreTypeClick" style="width: 90upx;height: 80upx;align-items: center;justify-content: center;background-color: #FFFFFF;margin-left: 2upx;">
				<image src="@/static/mine-ico/pullDown.png" style="width: 30upx;height: 18upx;"></image>
			</view>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300" >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; flex-flow: wrap;">
							<!-- 笔记 -->
							<noteItem v-for="(item,index) in list" :key="index" :receive-obj="{obj:item}" style="width: 48%;display: inline-block;margin: 10upx 0 0 10upx;"></noteItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- 弹窗 -->
		<uni-popup ref="selectMenu" type="top" style="z-index: 3;">
			<scroll-view scroll-y="true" style="max-height: 600upx;">
				<view style="display: flex;flex-direction: column;padding: 20upx 20upx;background-color: #FFFFFF;">
					<view style="flex-direction: row; width: 100%;height: 100%; flex-wrap: wrap;">
						<view @click="selectItemClick(index,item.tagCategoryId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagCategoryId"
							style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx;">
								<text>{{item.tagCategoryName}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	import noteItem from 'pages/component/note-item.vue';
	export default {
		components: {
			noteItem
		},
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				tabBars: [
					{
						tagCategoryId: "",
						tagCategoryName: "全部"
					},
					{
						tagCategoryId: "",
						tagCategoryName: "推荐"
					},
				],//导航
				isShowCareBtn:false,
				
				tabCurrentIndex: 1, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				nowSelectTypeId:''
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			// this.tabBars = json.discoverList;
			
			let param={"tagCategoryType":1};
			let str = '/portal/v1/tag/list/1';
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						// this.tabBars =[];
						var typeArr = res.data.data;
						if(typeArr.length){
							for(var i=0;i<typeArr.length;i++){
								//三级菜单
								// var tags = typeArr[i].tags
								// for(var j=0;j<tags.length;j++){
									// this.tabBars.push(tags[j])
								// }
								//二级菜单
								this.tabBars.push(typeArr[i])
							}
							this.nowSelectTypeId = this.tabBars[0].tagCategoryId;
							//获取帖子列表
							this.loadNewsList('refresh');
						}else{
							this.loadMoreStatus = 2;
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
			moreTypeClick(){
				this.$refs.selectMenu.open()
			},
			selectItemClick(index,value){
				this.$refs.selectMenu.close()
				this.changeTab(index,value)
			},
			//前端查询帖子列表分页
			getPostList(type){
				let param={}
				let opts={}
				if(this.tabCurrentIndex == 0){
					param={
						"limit": this.limit,
						"page": this.page,
						"postType": 1,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
						"postTagId": '', //（该字段不传的时候默认查询全部数据）
					}
					opts={ url:'/portal/v1/post/page/list/all', method:'POST' }
				}else if(this.tabCurrentIndex == 1){
					param={
						"limit": this.limit,
						"page": this.page,
						"postType": 1,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
					}
					opts={ url:'/portal/v1/post/get_post_by_hot', method:'POST' }
				}else{
					param={
						"limit": this.limit,
						"page": this.page,
						"postType": 1,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
						"postTagCategory": this.nowSelectTypeId,//二级菜单
						// "postTagId": this.nowSelectTypeId, //三级菜单
					}
					opts={ url:'/portal/v1/post/page/list/all', method:'POST' }
				}
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
								// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
								for(let k=0;k<arr.length;k++){
									arr[k].postUpvoteCount = this.calculation.digitalConversion(arr[k].postUpvoteCount)
									arr[k].postCommentCount = this.calculation.digitalConversion(arr[k].postCommentCount)
									arr[k].postPageViews = this.calculation.digitalConversion(arr[k].postPageViews)
								}
								for(let i=0;i<arr.length;i++){
									// 处理 关注状态
									if(arr[i].postUserId == uni.getStorageSync('userInfo').userId){
										arr[i].isShowCareBtn = false
									}else{
										if(arr[i].ifollowed){
											arr[i].isShowCareBtn = false
										}else{
											arr[i].isShowCareBtn = true
										}
									}
									
									arr[i].postContent = arr[i].postContent.replace(/\s/g,"");
									//处理时间
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
							}
						}else{
							consuni.showToast({
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
				this.getPostList(type)
			},
			
			//tab切换
			async changeTab(e,value){
				// console.log(value)
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
			// width: 150upx;
			/* width: 33.3%; */
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
				// border-bottom: 2upx solid #f76d45;
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
		margin: 0 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #FFFFFF;
		padding-bottom: 20upx;
	}
	.uni-share-title {
		line-height: 60upx;
		font-size: 16px;
		padding: 15rpx 0;
		text-align: center;
	}
</style>


