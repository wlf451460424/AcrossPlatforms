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
					@click="changeTab(index,item.tagId)"
				>{{item.tagName}}</view>
			</scroll-view>
			<view @click="moreTypeClick" style="width: 90upx;height: 80upx;align-items: center;justify-content: center;background-color: #FFFFFF;margin-left: 2upx;">
				<image src="@/static/mine-ico/pullDown.png" style="width: 30upx;height: 18upx;"></image>
			</view>
		</view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" >
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 动态 -->
							<tweentItem v-for="(item,index) in list" :key="index" :receive-obj="{obj:item,isShowType:true}"></tweentItem>
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
		
		
		<!-- 弹窗 -->
		<uni-popup ref="selectMenu" type="top" style="z-index: 3;">
			<scroll-view scroll-y="true" style="max-height: 600upx;">
				<view style="display: flex;flex-direction: column;padding: 20upx 20upx;background-color: #FFFFFF;">
					<view style="flex-direction: row; width: 100%;height: 100%; flex-wrap: wrap;">
						<view @click="selectItemClick(index,item.tagId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagId"
							style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx;">
								<text>{{item.tagName}}</text>
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
	// import articleItem from 'pages/component/article-item.vue';
	import tweentItem from 'pages/component/tweent-item.vue';
	export default {
		components: {
			// articleItem,
			tweentItem,
		},
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				tabBars: [
					{
						tagId: "",
						tagName: "全部"
					},
					{
						tagId: "",
						tagName: "推荐"
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
				nowSelectTypeId:'',
				
				tagCategoryId:'',
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
			}
		},
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;

			this.tagCategoryId = e.id
			this.onPulldownReresh()
			
			let param={}
			let opts={}
			//查询详情
			param={"tagGroupId":this.tagCategoryId}
			let str = "/portal/v1/tag_group/get/" + this.tagCategoryId
			opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200 ){
						//设置标题
			 			uni.setNavigationBarTitle({
			 			    title: res.data.data.tagGroupName
			 			});
					}
				}
			)
			
			//查询标签菜单
			param={"tagGroupId": this.tagCategoryId,}
			str = "/portal/v1/tag/get/tag_id/list/" + this.tagCategoryId
			opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200 ){
						var typeArr = res.data.data.records;
						if(typeArr.length){
							for(var j=0;j<typeArr.length;j++){
								this.tabBars.push(typeArr[j])
							}
							this.nowSelectTypeId = this.tabBars[0].tagId;
							//获取帖子列表
							this.loadNewsList('refresh');
						}else{
							this.loadMoreStatus = 2;
						}
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
						"sortType": 0,  // 0:全部 1推荐
						"tagGroupId": this.tagCategoryId, 
						"tagGroupRelateTagId":''
					}
					opts={ url:'/portal/v1/tag_group/page/tag_id/post/list', method:'POST' }
				}else if(this.tabCurrentIndex == 1){
					param={
						"limit": this.limit,
						"page": this.page,
						"sortType": 1,  // 0:全部 1推荐
						"tagGroupId": this.tagCategoryId, 
						"tagGroupRelateTagId":''
					}
					opts={ url:'/portal/v1/tag_group/page/tag_id/post/list', method:'POST' }
				}else{
					param={
						"limit": this.limit,
						"page": this.page,
						"sortType": 0,  // 0:全部 1推荐
						"tagGroupId": this.tagCategoryId, 
						"tagGroupRelateTagId":this.nowSelectTypeId
					}
					opts={ url:'/portal/v1/tag_group/page/tag_id/post/list', method:'POST' }
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
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
								for(let j=0;j<this.list;j++){
									if(this.list[j].postUserId == uni.getStorageSync('userInfo').userId){
										this.list[j].isShowCareBtn = false
									}else{
										this.list[j].isShowCareBtn = true
									}
								}
								
								// //文章提取图片
								// for(let i=0;i<this.list.length;i++){
								// 	if(this.list[i].postType == 0){
								// 		var str =this.list[i].postContent;
								// 		//匹配图片（g表示匹配所有结果i表示区分大小写）
								// 		var imgReg = /<img.*?(?:>|\/>)/gi;
								// 		//匹配src属性
								// 		var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
								// 		var imgArr = str.match(imgReg);
								// 		if(imgArr){
								// 			this.list[i].postImage = '';
								// 			for(let j=0;j<imgArr.length;j++){
								// 				if(j<3){
								// 					this.list[i].postImage += imgArr[j].match(srcReg)[1] + ','
								// 				}
								// 			}
								// 			this.list[i].postImage = this.list[i].postImage.substr(0, this.list[i].postImage.length - 1);  
								// 			this.list[i].isShowContent = false;
								// 		}else{
								// 			this.list[i].isShowContent = true;
								// 		}
								// 	}else{
								// 		this.list[i].isShowContent = true;
								// 	}
								// }
								
							}
							for(let i=0;i<this.list.length;i++){
								var str = this.list[i].postContent
								//匹配图片（g表示匹配所有结果i表示区分大小写）
								var imgReg = /<img.*?(?:>|\/>)/gi;
								//匹配src属性
								var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
								var arr = str.match(imgReg);
								if(arr){
									this.list[i].postImageShow = arr[0].match(srcReg)[1];
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
				this.getPostList(type)
			},
			
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			//tab切换
			async changeTab(e,value){
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
						url:'/pages/discover/report/index?id='+ this.more_Info.postId + '&type=' + this.more_Info.postType
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
		margin: 2upx 0 100upx;
		
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
