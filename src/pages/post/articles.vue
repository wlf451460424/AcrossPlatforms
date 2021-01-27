<template>
	<view class="content">
		<view style="z-index: 2;flex-direction: column;width: 100%;margin-top: 2upx;height: 480upx; ">
			<view style="flex-direction: row; width: 100%;background-color: #FFFFFF;padding: 10upx 0;">
				<view v-for="(item,index) in tabBars" :key="index" @click="click_tabBars(item,index)"
					style="flex-direction: column;width: 25%;display: inline-block;">
					<view style="width:100%; height: 80upx;display:flex;justify-content:center;align-items:center;">
						<image :src="decodeURIComponent(item.tagCategoryAvatar)" style="width:70upx; height:70upx;"></image>
					</view>
					<view style="width:100%; height: 60upx;justify-content: center;">
						<text style="line-height: 50upx;">{{item.tagCategoryName}}</text>
					</view>
				</view>
			</view>
			<view style="flex-direction: column;margin-top: 8upx;">
				<view v-if="typeBars.length" style="width: 100%;line-height: 70upx;height: 70upx;padding-left: 20upx;font-size: 28upx;font-weight: 700;align-items: center;background-color: #FFFFFF;">
					热门标签
				</view>
				<scroll-view scroll-x="true" style="background-color: #FFFFFF;width: 100%;white-space: nowrap;padding:0 20upx;margin-bottom: 8upx;">
					<view v-for="(item,index) in typeBars" :key="index" @click="click_typeBars(item)"
						style="flex-direction: column;width: 27%;display: inline-block;padding:10upx 0 10upx 0;display: inline-block;margin-right: 12upx;">
						<view style="width:100%;display:flex;justify-content:center;border-radius: 8upx;">
							<image style="width: 100%;height: 120upx;border-radius: 8upx;" mode="scaleToFill" :src="decodeURIComponent(item.tagAvatar)">
								<view style="position: absolute;width:27%;height: 120upx;background: rgba(0,0,0,0.3);justify-content: center;border-radius: 8upx;">
									<text style="line-height: 120upx;color: #fff;opacity: 1 !important;font-weight: bold;">
										{{item.tagName}}
									</text>
								</view>
							</image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="list.length" style="width: 100%;line-height:80upx;padding-left: 20upx;font-size: 28upx;font-weight: 700;background-color: #FFFFFF;">
				精选文章
			</view>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="400" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 文章 -->
							<articleItem v-for="(item,index) in list" :key="index" :receive-obj="{obj:item}"></articleItem>
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
	let windowWidth = 0, scrollTimer = false, tabBar;
	import articleItem from 'pages/component/article-item.vue';
	export default{
		components: {
			articleItem,
		},
		data() {
			return{
				avatarUrl_default:"../../../static/header_default.png",
				hot_default:'../../../static/bg_01.png',
				tabBars: [
					// {title: "宠物百科", id: 0},
					// {title: "养宠心得", id: 1},
					// {title: "周边测评", id: 2},
					// {title: "疾病科普", id: 3},
				],
				typeBars: [
					// {tagAvatar:"",tagName: "疾病", tagId: "0"},
				],
				
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
		
		onLoad() {
			let param={"tagCategoryType":0};
			let str = '/portal/v1/tag/list/0';
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.tabBars =[];
						var typeArr = res.data.data;
						if(typeArr.length){
							for(var i=0;i<typeArr.length;i++){
								this.tabBars.push(typeArr[i])
							}
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
			
			//获取热门tag接口
			this.getTagList()
			//获取 精选 帖子接口
			this.loadNewsList('refresh');
		},
		methods: {
			click_tabBars(item,index){
				uni.navigateTo({
					url:'/pages/discover/article/article-tag-list?index=' + index + '&title=' + item.tagCategoryName + '&id=' + item.tagCategoryId,
					// url:this.navigatorUrl.tagCategoryDetailsPages + '?index=' + index + '&title=' + item.tagCategoryName + '&id=' + item.tagCategoryId
				})
			},
			click_typeBars(item){
				uni.navigateTo({
					url:this.navigatorUrl.tagDetailsPages + '?id=' + item.tagId
				})
			},
			//前台 获取热门标签列表
			getTagList(type){
				let param={"tagCategoryType":0};
				let opts={ url:'/portal/v1/tag/hot/list/0', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							this.typeBars = res.data.data
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
			//前台 精选 帖子列表分页
			getPostList(type){
				let param={}
				let opts={ url:'/portal/v1/post/chosen/page/list', method:'POST' }
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
									// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
									for(let k=0;k<arr.length;k++){
										arr[k].postUpvoteCount = this.calculation.digitalConversion(arr[k].postUpvoteCount)
										arr[k].postCommentCount = this.calculation.digitalConversion(arr[k].postCommentCount)
										arr[k].postPageViews = this.calculation.digitalConversion(arr[k].postPageViews)
									}
									
									if(this.list.length<res.data.data.total){
										arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
										this.list.push(arr[i])
									}
								}
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
			
			//tab切换
			async changeTab(e){
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
				
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(()=>{
					this.tabCurrentIndex = index; 
					
					//下拉刷新  切换完成加载数据
					this.onPulldownReresh()
				}, 300)
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
	page,
	view {
	    display: flex;
	}
	page {
	    display: flex;
		height: 100%;
	    // background-color: #f9f9f9;
	}
	template {
	    display: flex;
	    flex: 1;
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
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
