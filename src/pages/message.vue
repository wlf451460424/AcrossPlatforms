<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-top="scrollTop" scroll-y="true"
						style="flex-direction: column; width: 100%;padding:0 10upx  30upx;">
						<view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding: 0 20upx;margin-top: 20upx;">
							<view style="width: 100%;height: 50upx;align-items: center;justify-content: center;font-size: 24upx;color: #AAAAAA;">
								<!-- {{item.updateTime}} -->
								{{item.timerAgo}}
							</view>
							<view style="width: 100%;height: 100%;">
								<view style="width: 15%;">
									<image :src="decodeURIComponent(senderAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
								</view>
								<view style="width: 80%;flex-direction: column;background-color: #FFFFFF;padding: 20upx;border-top-right-radius:20upx;border-bottom-left-radius:20upx;border-bottom-right-radius:20upx;" >
									<!-- <text style="font-size: 24upx;color: #333;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
										{{item.messagePushContent}}
									</text> -->
									<!-- <rich-text class="richText" :nodes="item.messagePushContent"></rich-text> -->
									<!-- <u-parse :content="item.messagePushContent"></u-parse> -->
									<jyf-parser :html="item.messagePushContent" :tag-style="tagStyle"></jyf-parser>
								</view>
							</view>
						</view>
						<view id='gundong' style='height:1px;width:100%'></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0,windowHeight = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			jyfParser,
		},
		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了  3''
				
				list:[],
				list_save:[],
				limit:5,
				page:1,
				id:"",
				senderAvatar:"../../../static/header_default.png",
				senderName:'',
				
				scrollTop:0,
				tagStyle:{
					a: 'text-decoration:none;color:#f76d45'
				}
			}
		},
		mounted(){
			uni.createSelectorQuery().select("#gundong").boundingClientRect((res)=>{
				this.oldbottom = res.bottom  // 记录 滚动 元素的 bottom 值
			}).exec();
		},
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			windowHeight - uni.getSystemInfoSync().windowHeight
			this.id = e.id
			this.getUserInfo()
		},
		methods: {
			//获取 用户信息
			getUserInfo(){
				//根据用户id获取用户信息
				let param={"userId":this.id}
				let str = '/portal/v1/get/' + this.id
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.senderAvatar = res.data.data.userAvatar
							this.senderName = res.data.data.userNickname
							uni.setNavigationBarTitle({
							    title: this.senderName
							});
							//获取帖子列表
							// this.loadNewsList('refresh')
							this.loadMoreStatus = 1;
							this.loadNewsList('add');
						}
					}
				)
			},
			//前端查询消息列表
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page, 
					"messagePushSenderId":this.id
				} ;
				let opts={ url:'/portal/v1/message_push/page/senderid/list', method:'POST' }
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
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									
									
									arr[i].messagePushContent = '<span>亲爱的'+ uni.getStorageSync('userInfo').userNickname +'，你好：<br></span>' + arr[i].messagePushContent 
									if(this.list.length<res.data.data.total)this.list.splice(0,0,arr[i]);
								}
								if(type == 'add'){
									uni.createSelectorQuery().select("#gundong").boundingClientRect((res)=>{
										// console.log(res)
										var newbottom = res.bottom
										if(Number(newbottom) > Number(this.oldbottom)){
												this.scrollTop = newbottom
											}
										 this.oldbottom = newbottom
									}).exec();
								}
								if(type == 'refresh'){
									this.scrollTop = 0
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
						if(type == 'refresh'){
							this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							this.refreshing = false;
							// #endif
							this.loadMoreStatus = 2;
						}
						//上滑加载 处理状态
						if(type == 'add'){
							this.loadMoreStatus = 2;
						}
					}
				)
			},
			//下拉刷新
			onPulldownReresh(){
				// this.list = [];
				// this.page = 1;
				
				// this.loadMoreStatus = 1;
				// this.loadNewsList('refresh');
				
				this.page ++
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				// this.page ++
				
				// this.loadMoreStatus = 1;
				// this.loadNewsList('add');
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
				this.getList(type)
			},
		}
	}
</script>

<style lang='scss' scoped>
	page {
	    display: flex;
	    /* min-height: 100%; */
		height: 100%;
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
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
