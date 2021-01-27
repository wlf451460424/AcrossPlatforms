<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
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
		
	</view>
</template>

<script>
	 
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import tweentItem from 'pages/component/tweent-item.vue';
	export default {
		components: {
			tweentItem
		},
		data() {
			return {
				isFold:false,
				typeText:["文章","笔记","动态","问答"],
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
			}
		},
		async onLoad() {
			//获取列表
			this.onPulldownReresh();
		},
		methods: {
			moreTypeClick(){
				this.$refs.selectMenu.open()
			},
			selectItemClick(index){
				this.$refs.selectMenu.close()
			},
			//前端查询收藏的帖子列表
			getFavoriteList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
				}
				let opts={ url:'/portal/v1/favorite/post/pages', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
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
				this.getFavoriteList(type)
			},
			
			careClick(){
				this.isShow = !this.isShow;
				if(this.isShow){
					this.careText = "取消关注"
					uni.showToast({
						icon: "none",
						title: "关注成功!"
					})
				}else{
					this.careText = "关  注"
				}
			},
			gotoTopicListPage(postTopicId){
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.postUserId
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
						url:'/pages/discover/discover/report/index?id='+ this.more_Info.postId + '&type=' + this.more_Info.postType
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
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
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
