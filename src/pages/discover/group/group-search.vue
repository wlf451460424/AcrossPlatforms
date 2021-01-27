<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9">
							<!-- 小组 -->
							<view  v-for="(item,index) in list" :key="index" style="flex-direction:row;width: 100%;border-radius: 4upx; background-color: #FFFFFF;margin-bottom:8upx;align-items: center;padding: 12upx;">
								<view style="width:100%;align-items: center;">
									<image :src="decodeURIComponent(item.groupAvatar)"  @click="click_cardBars(item)" style="width: 100upx;height: 100upx;border-radius: 60upx;"></image>
									<view style="flex-direction: column; margin-left: 12upx;width: 80%;">
										<view style="width: 100%;">
											<text  @click="click_cardBars(item)" style="width: 70%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.groupName}}
											</text>
										</view>
										<text  @click="click_cardBars(item)" style="font-size: 24upx;color: #AAAAAA;margin-top: 12upx;width: 100%;line-height:40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											简介 : {{item.groupIntroduction}}
										</text>
									</view>
								</view>
								<view  v-if="!item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;background: #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">加入</text>
									</view>
								</view>
								<view  v-if="item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
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
		
	</view>
</template>

<script>
	import _ from 'lodash';
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				avatarUrl_default:"../../static/header_default.png",
				
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 2, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				
				search_text:''
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.debouncedGetAnswer = _.debounce(this.onPulldownReresh, 1000)
		},
		onNavigationBarSearchInputChanged (val) {
			// console.log(val)
			this.search_text = val.text
			this.debouncedGetAnswer()
		},
		methods: {
			//前端查询帖子列表分页   热门推荐
			getPostList(type){
				let postType = this.tabCurrentIndex-1
				if(postType < 0) postType = ""
				let param={
					"limit": this.limit,
					"page": this.page,
					"groupName": this.search_text,
				}
				let opts={ url:'/portal/v1/group/name/list', method:'POST' }
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
								// sousuo 处理高亮加粗
								for(let m=0;m<arr.length;m++){
									var subStr = new RegExp('<em>','ig');//创建正则表达式对象,不区分大小写,全局查找
									var replaceStr = '<span style="color:#f76d45;font-weight: bold;">';
									var result_1 = arr[m].groupName.replace(subStr,replaceStr);//把'is'替换为空字符串
									var subStr = new RegExp('</em>','ig');//创建正则表达式对象,不区分大小写,全局查找
									var replaceStr = '</span>';
									var result_2 = result_1.replace(subStr,replaceStr);//把'is'替换为空字符串
									arr[m].groupName = result_2
								}
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
				this.getPostList(type)
			},
			
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			click_cardBars(item){
				uni.navigateTo({
					url:'group-details?groupId='+item.groupId+'&groupLogo='+item.groupLogo+'&currentUserFollowStatus='+item.currentUserFollowStatus+'&groupName='+item.groupName+'&groupIntroduction='+item.groupIntroduction+'&followCount='+item.followCount+'&updateTime='+item.updateTime
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
							consuni.showToast({
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
	}
	
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		margin: 10upx 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
