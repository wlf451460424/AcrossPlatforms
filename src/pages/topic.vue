<template>
	<view class="content">
		<view class="banner" style="z-index:2;flex-direction: column;">
		    <image class="banner-img" :src="decodeURIComponent(introduceData.topicLogo)"  mode="scaleToFill"></image>
			<view style="position: absolute;width:100%;height: 260upx;background: rgba(0,0,0,0.3);"></view>
			<image class="banner-img1" style="width: 80upx;height: 80upx;border-radius: 50upx;" mode="aspectFill" :src="decodeURIComponent(introduceData.topicAvatar)"></image>
			<view class="banner-title">
				<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
					# {{introduceData.topicTitle}} #
				</text>
			</view>
			<view class="banner-title1">
				<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
					{{introduceData.topicIntroduction}}
				</text>	
			</view>	
			<view class="banner-title2">
				<view style="width: 80%;color: #FFFFFF;font-size: 28upx;font-weight: bold;">
					<text style="height: 50upx;line-height: 50upx;">
						{{total}}篇内容
					</text>
					 <view style="padding:0 10upx;"> · </view>
					<text style="height: 50upx;line-height: 50upx;">
						{{introduceData.followCount}}人关注
					</text>
				</view>
				<view style="width: 20%;justify-content: flex-end;color: #FFFFFF;font-size: 24upx;">
					<text v-if="introduceData.ifollowed==0" @click="ClickCareBtn(introduceData)"  style="width: 120upx;height: 50upx;line-height: 50upx;text-align: center;padding: 0 10upx;border-radius: 40upx;background-color: #ffbf59;color: #FFFFFF;">
						关注
					</text>
					<text v-if="introduceData.ifollowed==1" @click="ClickCareBtn(introduceData)" style="width: 120upx;height: 50upx;line-height: 50upx;text-align: center;padding: 0 10upx;border-radius: 40upx;border: 2upx solid #ffbf59;color: #ffbf59;">
						已关注
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="introduceData.topicAnnouncementTitle" style="z-index:2;width: 100%;height: 60upx;background: #FFFFFF;padding: 0 20upx;margin-bottom: 2upx;align-items: center;">
			<view style="width: 40upx;height:100%;align-items: center;">
				<image src="@/static/service/notice_ico.png" style="width: 34upx;height: 34upx;margin-right: 10upx;"></image>
			</view>
			<!-- 上下滚动 -->
			<view class="uni-swiper-msg" style="padding:0;">
				<swiper class="swiper" vertical="true" autoplay="false" duration="300" interval="3000">
					<swiper-item>
						<view @click="noticToDetails(introduceData.topicAnnouncementLink)" style="line-height: 60upx;">{{introduceData.topicAnnouncementTitle}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 顶部选项卡 -->
		<view style="z-index: 2;display: flex;flex-direction: row;width: 100%;height: 80upx;">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;background-color: #FFFFFF;padding-right: 10upx;">
				<view 
					v-for="(item,index) in tabBars" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index,item.classificationTagId)"
				>{{item.classificationTagName}}</view>
			</scroll-view>
			<view @click="moreTypeClick" style="width: 90upx;height: 80upx;align-items: center;justify-content: center;background-color: #FFFFFF;margin-left: 2upx;">
				<image src="@/static/mine-ico/pullDown.png" style="width: 30upx;height: 18upx;"></image>
			</view>
		</view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="320" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  @change="changeTab">
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
		
		<view v-if="menuView && introduceData.topicAnnouncementTitle"  style="z-index: 6;position: fixed;margin-top: 404upx;width: 100%;height:100%;background-color:rgba(255,255,255,0);flex-direction: column;">
			<scroll-view scroll-y="true" style="max-height: 400upx;">
				<view ref="aside" style="flex-direction: row; width: 100%;flex-wrap: wrap;background-color: #FFFFFF;padding:20upx 0 40upx 0;">
					<view @click="selectItemClick(index,item.classificationTagId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagId"
						style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx 20upx 10upx 0;">
							<text>{{item.classificationTagName}}</text>
					</view>
				</view>
			</scroll-view>
			<view @click="close" style="width: 100%;height: 100%;background-color:rgba(0,0,0,0.4);"></view>
		</view>
		<view v-if="menuView && !introduceData.topicAnnouncementTitle"  style="z-index: 6;position: fixed;margin-top: 344upx;width: 100%;height:100%;background-color:rgba(255,255,255,0);flex-direction: column;">
			<scroll-view scroll-y="true" style="max-height: 400upx;">
				<view ref="aside" style="flex-direction: row; width: 100%;flex-wrap: wrap;background-color: #FFFFFF;">
					<view @click="selectItemClick(index,item.classificationTagId)" v-for="(item,index) in tabBars" :key="index" :id="item.tagId"
						style="height:70upx;line-height: 70upx;display: inline-block;padding:0 20upx;margin:10upx 20upx 10upx 0;">
							<text>{{item.classificationTagName}}</text>
					</view>
				</view>
			</scroll-view>
			<view @click="close" style="width: 100%;height: 100%;background-color:rgba(0,0,0,0.4);"></view>
		</view>
		
		<!-- 底部更多操作弹窗 -->
		<uni-popup ref="showJion" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;background-color: #FFFFFF;">
				<view @click="look(introduceData)" style="width: 100%;height: 90upx;justify-content: center;align-items: center;">
					<text>查看成员</text>
				</view>
				<view @click="quit(introduceData)" style="width: 100%;height: 90upx;justify-content: center;align-items: center;">
					<text style="color: #FF0000;">取消关注</text>
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
			tweentItem,
		},
		data() {
			return {
				isFold:false,
				typeText:["文章","笔记","动态","问答"],
				TopicId:'',
				avatarUrl_default:"../../../static/header_default.png",
				
				tabBars: [
					{
						classificationTagNameId: "",
						classificationTagName: "全部"
					},
					{
						classificationTagNameId: "",
						classificationTagName: "推荐"
					},
				],//导航
				
				tabCurrentIndex: 1, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				nowSelectTypeId:'',
				
				introduceData: {
					"followCount": 0,
					"partNumber": 0,
					"topicAvatar": "",
					"topicIntroduction": "",
					"topicLogo": "",
					"topicTitle": "",
					"topicTypeName": "",
				},
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
				
				sortValue:0,
				total:'',
				menuView:false,
			}
		},
		
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU
		onShareAppMessage(res) {
		    return {
		      title: this.introduceData.topicTitle,
		      // path: this.introduceData.webUrl,
		    }
		},
		onShareTimeline() {
			return {
				title: this.introduceData.topicTitle,
				imageUrl: this.introduceData.topicLogo,
			}
		},
		// #endif
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			
			this.TopicId = e.id;
			//根据topicId查询话题详情
			this.getTopicnNameById()
			//获取标签
			this.getLabel()
			//获取话题列表
			this.onPulldownReresh()
		},
		methods: {
			//根据topicId查询话题详情
			getTopicnNameById(){
				let param={"topicId":this.TopicId} ;
				let str = '/portal/v1/topic/get/' + this.TopicId;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.introduceData = res.data.data;
							this.introduceData.followCount = this.calculation.digitalConversion(this.introduceData.followCount)
							//设置标题
							uni.setNavigationBarTitle({
							    title: this.introduceData.topicTitle
							});
							this.introduceData.timerAgo= friendlyDate(new Date(this.introduceData.createTime.replace(/\-/g,'/')).getTime(),this.introduceData.createTime)
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
			//获取标签
			getLabel(){
				let param={"classificationTagType":1};//分类标签所属类型 0：小组/1: 话题
				let str = '/portal/v1/classification_tag/list';
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							var typeArr = res.data.data;
							if(typeArr.length){
								for(var i=0;i<typeArr.length;i++){
									this.tabBars.push(typeArr[i])
								}
								this.nowSelectTypeId = this.tabBars[0].classificationTagId;
							}else{
								this.loadMoreStatus = 2;
							}
						}
					}
				)
			},
			//前台单独条件查询帖子列表分页
			getPostList(type){
				let param={}
				let opts={}
				if(this.tabCurrentIndex == 0){
					param={
						"limit": this.limit,
						"page": this.page,
						// "postPetId": 1229330385325957000,//宠物相关的帖子
						// "postTagId": 1229330385325957000,//根据标签查询帖子
						"postTopicId": this.TopicId,//根据话题查询帖子
						"sortType":0,//全部
					}
					opts={ url:'/portal/v1/post/get/page/list', method:'POST' }
				}else if(this.tabCurrentIndex == 1){
					param={
						"limit": this.limit,
						"page": this.page,
						// "postPetId": 1229330385325957000,//宠物相关的帖子
						// "postTagId": 1229330385325957000,//根据标签查询帖子
						"postTopicId": this.TopicId,//根据话题查询帖子
						"sortType":1,//热门
					}
					opts={ url:'/portal/v1/post/get/page/list', method:'POST' }
				}else{
					param={
						"limit": this.limit,
						"page": this.page,
						// "postPetId": 1229330385325957000,//宠物相关的帖子
						// "postTagId": 1229330385325957000,//根据标签查询帖子
						"postTopicId": this.TopicId,//根据话题查询帖子
						"sortType":'',
						"classificationTagId":this.nowSelectTypeId,
					}
					opts={ url:'/portal/v1/post/get/page/list', method:'POST' }
				}
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(this.tabCurrentIndex == 0 || this.tabCurrentIndex == 1){
								this.total = this.calculation.digitalConversion(res.data.data.total)
							}
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
								//处理时间
								for(let i=0;i<arr.length;i++){
									if(this.list.length<res.data.data.total){
										arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
										if(this.list.length<res.data.data.total)this.list.push(arr[i])
									}
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
			//tab切换
			async changeTab(e,value){
				this.menuView = false
				
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
			ClickCareBtn(item){
				this.menuView = false
				if(item.ifollowed){
					this.$refs.showJion.open();
					return;
				}else{
					//添加/修改关注状态
					let param={
						"followTargetId": item.topicId, //关注目标ID
						"followTargetType": 8, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								this.getTopicnNameById()
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
			},
			//查看成员
			look(item){
				this.$refs.showJion.close()
				uni.navigateTo({
					url:'/pages/group/group-member?id=' + item.topicId +'&type=8'
				})
			},
			//退出小组
			quit(item){
				this.$refs.showJion.close()
				
				//添加/修改关注状态
				let param={
					"followTargetId": item.topicId, //关注目标ID
					"followTargetType": 8, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.getTopicnNameById()
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
			
			noticToDetails(str){
				this.menuView = false
				if(str){
					if(str.indexOf("http") == -1){
						uni.navigateTo({
							url:'/pages' + str
						})
					}else{
						window.location.href = str
					}
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
			// width: 150upx;
			/* width: 33.3%; */
			padding: 0 20upx;
			margin-right: 20upx;
			text-align: center;
			line-height: 80upx;
			color: #303133;
			position: relative;
			/* font-weight: bold; */
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
		margin: 4upx 0 110upx;
		.panel-item{
			background: #fff;
			/* padding: 30px 0; */
			border-bottom: 2px solid #000;
		}
	}
	
	.banner {
	    height:260upx;
	    position: relative;
	    background-color: #ccc;
	}
	.banner-img {
	    width: 100%;
		height:260upx;
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
		bottom: 120upx;
		left: 20upx;
	}
	
	.banner-title {
	    overflow: hidden;
	    position: absolute;
	    padding: 0 20upx;
	    bottom: 160upx;
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
	    top:110upx;
	    width: 80%;
	    font-weight: 400;
	    line-height: 34upx;
	    color: white;
	    z-index: 11;
		color: #FFFFFF;
		margin-left: 100upx;
	}
	.banner-title2 {
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
	
	.active1{
		background-color: #f76d45 !important;
		color: #FFFFFF !important;
	}
	.active2{
		background-color: #f76d45 !important;
		color: #FFFFFF !important;
	}
	.isHav{
		top: 230px !important;
	}
</style>
