<template>
	<view class="content">
		<view class="banner" style="flex-direction: column;">
		    <image class="banner-img" :src="introduceData.groupLogo"  mode="heightFix"></image>
			<image class="banner-img1" style="width: 80upx;height: 80upx;border-radius: 50upx;"  :src="decodeURIComponent(introduceData.groupAvatar)"></image>
			<view class="banner-title">
				<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
					{{introduceData.groupName}}
				</text>
			</view>
			<view class="banner-title1">
				<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
					{{introduceData.groupIntroduction}}
				</text>	
			</view>	
			<view class="banner-title2">
				<view style="justify-content: flex-end;width: 100%;color: #FFFFFF;font-size: 24upx;">
					<text @click="goMemberList(introduceData.groupId)" style="height: 50upx;line-height: 50upx;padding: 0 10upx;border-radius:8upx;border: 2upx solid #FFFFFF;margin-right: 40upx;">
						{{introduceData.followCount}}  人加入
					</text>
					<text v-if="introduceData.currentUserFollowStatus != 1" @click="ClickCareBtn(introduceData)"  style="width: 100upx;height: 50upx;line-height: 50upx;text-align: center;padding: 0 10upx;border-radius: 40upx;background-color: #ffbf59;color: #FFFFFF;">
						加入
					</text>
					<text v-if="introduceData.currentUserFollowStatus == 1" @click="ClickCareBtn(introduceData)" style="width: 100upx;height: 50upx;line-height: 50upx;text-align: center;padding: 0 10upx;border-radius: 40upx;border: 2upx solid #ffbf59;color: #ffbf59;">
						已加入
					</text>
				</view>
			</view>
		</view>
		
		<view style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #FFFFFF;padding: 0 20upx;margin-bottom: 8upx;align-items: center;">
			<view style="width: 70%;height:100%;">
				<view style="width: 40upx;height:100%;align-items: center;">
					<image src="@/static/service/notice_ico.png" style="width: 34upx;height: 34upx;margin-right: 10upx;"></image>
				</view>
				<!-- 上下滚动 -->
				<view class="uni-swiper-msg" style="padding:0;">
				   	<swiper class="swiper" vertical="true" autoplay="false" duration="300" interval="3000">
				    	<swiper-item v-for="(item,index) in noticlist" :key="index">
				     		<view @click="noticToDetails(item.id)" style="line-height: 60upx;">{{item.content}}</view>
				    	</swiper-item>
				   	</swiper>
				</view>
			</view>
			<view style="width: 30%;height:100%;justify-content: flex-end;align-items: center;">
				<view @click="click_screening(0)" :class="{active:!selected}" style="width: 80upx;height: 40upx;font-size: 24upx;background-color: #e8e8e8;border-radius: 50upx;justify-content: center;align-items: center;margin-right: 10upx;">
					<text>最新</text>
				</view>
				<view @click="click_screening(1)" :class="{active:selected}" style="width: 80upx;height: 40upx;font-size: 24upx;background-color: #e8e8e8;border-radius: 50upx;justify-content: center;align-items: center;">
					<text>最热</text>
				</view>
			</view>
		</view>	
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="400" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;padding: 0 5px;">
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
	let windowWidth = 0, scrollTimer = false, tabBar;
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
				isShowCareBtn:false,
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				
				introduceData: {
					groupId:'',
					groupLogo:"",
					currentUserFollowStatus:0,
					groupName:'',
					groupIntroduction:'',
					followCount: 0,
					updateTime:'',
				},
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
				
				selected:false,
				noticlist:[
					{id:"01",content:"王大爷的狗走丢了"},
					{id:"02",content:"李老头昨晚打麻将，一夜未归"},
					{id:"03",content:"赵寡妇，昨晚半夜悄悄出门了"},
				],
			}
		},
		async onLoad(e) {
			let param={"groupId": e.groupId}
			let str = '/portal/v1/group/get/' + e.groupId
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					// debugger
					if(res.data.code == 200 ){
						this.introduceData = res.data.data
						//获取话题列表
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
		methods: {
			//前端查询帖子列表分页
			getPostList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					// "postPetId": 1229330385325957000,//宠物相关的帖子
					// "postTagId": 1229330385325957000,//根据标签查询帖子
					// "postTopicId": this.TopicId,//根据话题查询帖子
					"postGroupId":this.introduceData.groupId,
					"sortType":this.selected?1:0
				}
				let opts={ url:'/portal/v1/post/get/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						this.selected = !this.selected
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
									//处理时间
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
							}
							//文章提取图片
							for(let i=0;i<this.list.length;i++){
								if(this.list[i].postType == 0){
									var str =this.list[i].postContent;
									//匹配图片（g表示匹配所有结果i表示区分大小写）
									var imgReg = /<img.*?(?:>|\/>)/gi;
									//匹配src属性
									var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
									var imgArr = str.match(imgReg);
									if(imgArr){
										this.list[i].postImage = '';
										for(let j=0;j<imgArr.length;j++){
											if(j<3){
												this.list[i].postImage += imgArr[j].match(srcReg)[1] + ','
											}
										}
										this.list[i].postImage = this.list[i].postImage.substr(0, this.list[i].postImage.length - 1);  
										this.list[i].isShowContent = false;
									}else{
										this.list[i].isShowContent = true;
									}
								}else{
									this.list[i].isShowContent = true;
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
							if(item.currentUserFollowStatus == 1){
								item.currentUserFollowStatus = 0
							}else{
								item.currentUserFollowStatus = 1
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
			ClickCare(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.postUserId, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.postUserId == this.list[i].postUserId){
									this.list[i].isShowCareBtn = false
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
			goMemberList(value) {
				uni.navigateTo({
					url:'group-member?groupId=' + value
				})
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
			click_screening(value){
				this.onPulldownReresh()
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
	}
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		.panel-item{
			background: #fff;
			/* padding: 30px 0; */
			border-bottom: 2px solid #000;
		}
	}
	
	.banner {
	    height:310upx;
	    overflow: hidden;
	    position: relative;
	    background-color: #ccc;
	}
	.banner-img {
	    width: 100%;
		height:310upx;
	}
	.groupAvatar {
	    position: absolute;
	    bottom: 80upx;
		left: 20upx;
		
		width: 110upx;
		height: 110upx;
		border-radius: 70upx;
	}
	.banner-img1 {
	    position: absolute;
		bottom: 140upx;
		left: 20upx;
	}
	
	.banner-title {
	    max-height: 84upx;
	    overflow: hidden;
	    position: absolute;
	    padding: 0 20upx;
	    bottom: 190upx;
	    width: 100%;
	    font-size: 28upx;
	    font-weight: 400;
	    /* line-height: 42upx; */
	    color: white;
	    z-index: 11;
		font-weight: bold;
		align-items: center;
		margin-left: 100upx;
	}
	.banner-title1 {
	    overflow: hidden;
	    position: absolute;
	    padding: 0 20upx;
	    top:120upx;
	    width: 80%;
	    font-weight: 400;
	    line-height: 34upx;
	    color: white;
	    z-index: 11;
		color: #FFFFFF;
		margin-left: 100upx;
	}
	.banner-title2 {
	    /* max-height: 84upx; */
	    overflow: hidden;
	    position: absolute;
	    padding: 0 20upx;
	    bottom: 20upx;
	    width: 100%;
	    line-height: 42upx;
	    color: white;
	    /* z-index: 11; */
		color: #b7b7b7;
		align-items: center;
	}
	.banner-title3{
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		padding: 0 20upx;
		bottom: 80upx;
		right: 120upx;
		width: 100%;
		font-weight: 400;
		/* line-height: 42upx; */
		color: white;
		z-index: 11;
		color: #b7b7b7;
		align-items: center;
	}
	
	.active{
		background-color: #FFFFFF !important;
		border: 2upx solid #b7b7b7;
	}
</style>
