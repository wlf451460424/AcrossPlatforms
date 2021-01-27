<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;">
			<view 
				v-for="(item,index) in tabBars" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab'+index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list_0" :key="index" style="flex-direction: column;width: 100%;margin-bottom:8upx;">
								<view style="width: 100%;height: 70upx;line-height: 70upx; justify-content: center;align-items: center;background: #FFFFFF;">
									<text>{{item.updateTime}}</text>
								</view>
								<view style="flex-direction: column;width: 100%;border-radius: 12upx;">
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;margin: 2upx 0;">
										<text >宠物计划提醒</text>
									</view>
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">宠物昵称：</text>
										<text>{{item.petNickName}}</text>
									</view>
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">计划时间：</text>
										<text>{{item.remindPlanTime}}</text>
									</view>
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">计划任务：</text>
										<text>{{item.remindTypeName}}</text>
									</view>
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
										<!-- <text>距离下次<text>{{item.remindTypeName}}</text>还有{{item.difference}}天</text> -->
										距离下次<text>{{item.remindTypeName}}</text>
										还有<text style="font-weight: 800;padding: 0 10upx;color: #f76d45;">{{item.difference}}</text>天
									</view>
									<view style="width: 100%;height: 80upx;line-height: 80upx;margin-top: 2upx;">
										<view @click="comfire(item)" style="width: 50%;height: 80upx;line-height: 80upx;justify-content: center;align-items: center;background: #FFFFFF;margin-right: 2upx;">
											<text>知道了</text>
										</view>
										<view @click="delay(item)" style="width: 50%;height: 80upx;line-height: 80upx;justify-content: center;align-items: center;background: #FFFFFF;color: #f76d45;">
											<text>计划延迟一天</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<view v-for="(item,index) in list_1" :key="index" style="flex-direction: column;width: 100%;margin-bottom:8upx;">
								<view style="width: 100%;height: 70upx;line-height: 70upx; justify-content: center;align-items: center;background: #FFFFFF;">
									<text>{{item.updateTime}}</text>
								</view>
								<view style="flex-direction: column;width: 100%;border-radius: 12upx;">
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;margin: 2upx 0;">
										<text >宠物计划确认</text>
									</view>
									<view style="width: 100%;height: 70upx;line-height: 70upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">宠物昵称：</text>
										<text>{{item.petNickName}}</text>
									</view>
									<view style="width: 100%;height: 60upx;line-height: 60upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">计划时间：</text>
										<text>{{item.remindPlanTime}}</text>
									</view>
									<view style="width: 100%;height: 60upx;line-height: 60upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">计划任务：</text>
										<text>{{item.remindTypeName}}</text>
									</view>
									<view style="width: 100%;height: 60upx;line-height: 60upx;padding: 0 40upx;background: #FFFFFF;">
										<text style="color: #888888;padding-right: 20upx;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
										<text>任务是否完成</text>
									</view>
									<view style="width: 100%;height: 80upx;line-height: 80upx;margin-top: 2upx;">
										<view @click="unexecuted(item)" style="width: 50%;height: 80upx;line-height: 80upx;justify-content: center;align-items: center;background: #FFFFFF;margin-right: 2upx;">
											<text>未完成</text>
										</view>
										<view @click="executed(item)" style="width: 50%;height: 80upx;line-height: 80upx;justify-content: center;align-items: center;background: #FFFFFF;color: #f76d45;">
											<text>已完成</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				
				tabBars: [
					{name: "计划提醒", id: '0'},
					{name: "计划确认", id: '1'},
				],
				
				tabCurrentIndex:0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				list_0:[],
				list_1:[],
			}
		},
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			
			if(e.type==1){
				this.tabCurrentIndex = 1
			}
			//获取帖子列表
			this.onPulldownReresh();
		},
		methods: {
			//确认
			comfire(item){
				let param={
					"delayDay": 0,
					"isDelay": false,
					"notificationRecordId": item.notificationRecordId,
					"remindPlanId": item.notificationRecordPlanId,
				}
				let opts={ url:'/portal/v1/remind_plan/delay', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							//获取帖子列表
							this.onPulldownReresh();
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
			//延期
			delay(item){
				let param={
					"delayDay": 1,
					"isDelay": true,
					"notificationRecordId": item.notificationRecordId,
					"remindPlanId": item.notificationRecordPlanId,
				}
				let opts={ url:'/portal/v1/remind_plan/delay', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							//获取帖子列表
							this.onPulldownReresh();
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
			//未完成
			unexecuted(item){
				let param={
					"notificationRecordId": item.notificationRecordId,
					"remindPlanId": item.notificationRecordPlanId,
					"remindPlanStatus": 2,  //    0：进行中/1：待确认/2: 未完成/3：已完成
				}
				let opts={ url:'/portal/v1/remind_plan/update_remind_plan_status', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							//获取帖子列表
							this.onPulldownReresh();
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
			//完成
			executed(item){
				let param={
					"notificationRecordId": item.notificationRecordId,
					"remindPlanId": item.notificationRecordPlanId,
					"remindPlanStatus": 3,  //    0：进行中/1：待确认/2: 未完成/3：已完成
				}
				let opts={ url:'/portal/v1/remind_plan/update_remind_plan_status', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							//获取帖子列表
							this.onPulldownReresh();
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
			//前端查询帖子列表分页
			getPostList(type){
				let param={}
				if(this.tabCurrentIndex==0){
					//获取 未处理的通知列表
					param={notificationRecordType:0,limit:10}
				}
				if(this.tabCurrentIndex==1){
					//获取 未处理的通知列表
					param={notificationRecordType:1,limit:10}
				}
				let opts={ url:'/portal/v1/notification/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								if(this.tabCurrentIndex==0)this.page_0 --
								if(this.tabCurrentIndex==1)this.page_1 --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									arr[i].remindPlanTime = arr[i].remindPlanTime.split(" ")[0]
									if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
									if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
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
				this.list_0 = [];
				this.list_1 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
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
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		/* box-shadow: 0 2upx 4upx rgba(0,0,0,.06); */
		background-color: #fff;
		text-align: center;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 40%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			/* font-size: 36upx; */
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				/* border-bottom: 1upx solid #f76d45; */
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
				width: 60%;
			}
		}
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
