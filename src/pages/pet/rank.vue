<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<!-- #ifdef H5 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;background-color: #FFFFFF;">
			<view
				v-for="(item,index) in tabBarsList" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab' + index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
		<view style="z-index: 2;display: flex;flex-direction: row;width: 100%;height: 80upx;">
			<view style="width: 80upx;height: 80upx;background-color: #FFFFFF;">
			</view>
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="height: 80upx;overflow: hidden;background-color: #FFFFFF;padding: 0 10% !important;">
				<view
					v-for="(item,index) in tabBarsList" :key="index"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab' + index"
					@click="changeTab(index)"
				>{{item.name}}</view>
			</scroll-view>
			<view @click="shuoming" style="width: 80upx;height: 80upx;align-items: center;justify-content: center;background-color: #FFFFFF;">
				<image src="@/static/pet_rank_wen.png" style="width: 40upx;height: 40upx;"></image>
			</view>
		</view>
		<!-- #endif -->
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							
							<view v-if="list.length" style="z-index: 2;display: flex;flex-direction: row;width: 100%;height:380upx;background-color: #FFFFFF;padding-bottom: 10upx;">
								<view style="width: 33.3%;height: 100%;padding: 50upx 6upx 0 12upx;">
									<view style="flex-direction: column;width:100%;height: 100%;align-items: center;padding: 12upx;border: 2upx solid #f1f1f1;border-top-right-radius: 20upx;border-top-left-radius: 20upx;">
										<image @click="click_user(list_item1)" mode="aspectFill" :src="decodeURIComponent(list_item1.petAvatar?list_item1.petAvatar:avatarUrl_default)" style="width: 120upx;height: 120upx;border-radius: 120upx;border: 4upx solid #FFFFFF;margin:0 0 10upx 0;"></image>
										<view style="display:flex;width: 100%;padding: 0 10upx;align-items: center;justify-content: center;">
											<p style="font-size: 24upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
												{{list_item1.petNickname}}
											</p>                                     
										</view>
										<view style="font-size: 24upx;height: 50upx;line-height:50upx;align-items: center;">
											<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
											{{list_item1.petCount}}
										</view>
										<image src="../../static/NO2.png" style="width:50upx;height: 60upx;margin-top:10upx;"></image>
									</view>
								</view>
								<view style="width: 33.3%;height: 100%;padding: 20upx 6upx 0 6upx;">
									<view style="flex-direction: column;width:100%;height: 100%;align-items: center;padding: 12upx;border: 2upx solid #f1f1f1;border-top-right-radius: 20upx;border-top-left-radius: 20upx;">
										<image @click="click_user(list_item0)" mode="aspectFill" :src="decodeURIComponent(list_item0.petAvatar?list_item0.petAvatar:avatarUrl_default)" style="width: 120upx;height: 120upx;border-radius: 150upx;border: 4upx solid #FFFFFF;margin:0 0 10upx 0;"></image>
										<view style="display:flex;width: 100%;padding: 0 10upx;align-items: center;justify-content: center;">
											<p style="font-size: 24upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
												{{list_item0.petNickname}}
											</p>                                     
										</view>
										<view style="font-size: 24upx;height: 50upx;line-height:50upx;align-items: center;">
											<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
											{{list_item0.petCount}}
										</view>
										<image src="../../static/NO1.png" style="width:70upx;height: 80upx;margin-top:10upx;"></image>
									</view>
								</view>
								<view style="width: 33.3%;height: 100%;padding: 50upx 12upx 0 6upx;">
									<view style="flex-direction: column;width:100%;height: 100%;align-items: center;padding: 12upx;border: 2upx solid #f1f1f1;border-top-right-radius: 20upx;border-top-left-radius: 20upx;">
										<image @click="click_user(list_item2)" mode="aspectFill" :src="decodeURIComponent(list_item2.petAvatar?list_item2.petAvatar:avatarUrl_default)" style="width: 120upx;height: 120upx;border-radius: 120upx;border: 4upx solid #FFFFFF;margin:0 0 10upx 0;"></image>
										<view style="display:flex;width: 100%;padding: 0 10upx;align-items: center;justify-content: center;">
											<p style="font-size: 24upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
												{{list_item2.petNickname}}
											</p>                                     
										</view>
										<view style="font-size: 24upx;height: 50upx;line-height:50upx;align-items: center;">
											<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
											{{list_item2.petCount}}
										</view>
										<image src="../../static/NO3.png" style="width:50upx;height: 60upx;margin-top:10upx;"></image>
									</view>
								</view>
							</view>
							<!-- 达人 -->
							<view  v-for="(item,index) in list" v-if="index>2" v-model="list" :key="index" @click="click_user(item)"  style="flex-direction:row;width: 100%;background-color: #FFFFFF;padding:12upx 12upx 12upx 0;align-items: center;margin-bottom:2upx;" >
								<view style="width: 10%;height: 100%;align-items: center;justify-content: center;font-size: 32upx;font-weight: bold;">
									{{index+4}}
								</view>
								<view style="width: 80%;flex-direction: column;">
									<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
										<image :src="decodeURIComponent(item.petAvatar)" mode="aspectFill" style="width: 120upx;height: 120upx;border-radius: 75upx;"></image>
										<view style="flex-direction: column; margin-left: 20upx;width:75%;height: 100%;">
											<view style="width: 100%;align-items: center;line-height: 40upx;">
												<text style="width: 100%;max-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.petNickname}}
												</text>
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 40upx;align-items: center;">
												<view style="flex-direction: row;width: 100%;line-height: 40upx;font-size: 24upx;color: #AAAAAA;">
													<view style="width: 100%;align-items: center;">
														<image style="width: 28upx;height: 28upx;margin-right: 10upx;" src="../../static/hot.png"></image>
														{{item.petCount}}
													</view>
												</view>
											</view>
											<view style="flex-direction: row;width: 100%;line-height: 40upx;align-items: center;">
												<view style="flex-direction: row;width: 100%;line-height: 40upx;font-size: 24upx;color: #AAAAAA;">
													<text v-if="item.petBreedName" style="margin-right: 20upx;">{{item.petBreedName}}</text>
													<text v-if="item.petGender<2" style="margin-right: 20upx;">{{petGender_array[item.petGender]}}</text>
													<text v-if="item.petAge" style="margin-right: 20upx;">{{item.petAge}}</text>
												</view>
											</view>
										</view>
									</view>
									
								</view>
								<view style="width: 10%;height: 100%;align-items: center;justify-content: center;font-size: 32upx;font-weight: bold;">
									<view style="width:16upx;height:16upx;border-top:2upx solid #b7b7b7; border-right:2upx solid #b7b7b7;transform: rotate(45deg);"></view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	
		<!-- <view @click="gotoTotalList" style="z-index: 3;position: absolute;bottom: 0;width: 100%;height: 50upx;background-color: #FFFFFF;color: #f76d45;justify-content: center;align-items: center;">
			查看总榜
			<view style="width:16upx;height:16upx;border-top:2upx solid #f76d45; border-right:2upx solid #f76d45;transform: rotate(45deg);"></view>
		</view> -->
	</view>
</template>

<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:15,
				page:1,
				list:[],
				list_item1:{
					"userAvatar":'',
					"userNickname":'',
					"growthValue":'',
					"approvalCount":''
					
				},
				list_item0:{
					"userAvatar":'',
					"userNickname":'',
					"growthValue":'',
					"approvalCount":''
					
				},
				list_item2:{
					"userAvatar":'',
					"userNickname":'',
					"growthValue":'',
					"approvalCount":''
					
				},
				
				tabBarsList:[
					{id:"0",name:"日榜"},
					{id:"1",name:"周榜"},
					{id:"2",name:"月榜"},
					{id:"3",name:"总榜"},
				],
				petGender_array: ['弟弟','妹妹','未知'],
			}
		},
		onNavigationBarButtonTap(val) {
			uni.navigateTo({
				url:'/pages/mine/agree/index?type=20'
			})
		},
		async onLoad() {
			//获取帖子列表
			this.onPulldownReresh('refresh');
		},
		methods: {
			shuoming(){
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=20'
				})
			},
			//前端查询达人列表
			getPostList(type){
				let searchType_value;   //0:日榜 1：周榜 2：月榜  ""：总榜
				if(this.tabCurrentIndex == 3){
					searchType_value = ""
				}else{
					searchType_value = this.tabCurrentIndex
				}
				let param={
					"limit":this.limit,
					"page": this.page,
					"searchType": searchType_value,  	//0:日榜 1：周榜 2：月榜  ""：总榜
				}
				let opts={ url:'/portal/v1/archives/get_pet_upvote', method:'POST' }
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
									arr[i].petAge = this.getDaysBetween(arr[i].petBirthday)
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
							}
							this.list_item1 = this.list[1]
							this.list_item0 = this.list[0]
							this.list_item2 = this.list[2]
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
				
				this.loadMoreStatus = '';
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
			
			click_user(item){
				uni.navigateTo({
					url:'/pages/mine/pet/index?id=' +  item.petId
				})
			},
			//tab切换
			async changeTab(e){
				this.loadMoreStatus = 1
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
			gotoTotalList(){
				uni.navigateTo({
					url:"pet-list"
				})
			},
			getDaysBetween(dateString1){
			   var  startDate = Date.parse(dateString1);
			   var myDate = new Date();
			   var  endDate = Date.parse(myDate);
			   var days=(endDate - startDate)/(1*24*60*60*1000);
			   var y = days/365
			   
				var str = ''
				if(!y){
					str = ''
				}else{
					if(y<1){
						str = '1岁' 
					}else{
						str = parseInt(y) + '岁' 
					}
				}
			   return  str;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
	    display: flex;
	    min-height: 100%;
		// height: 100%;
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
		// box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		padding: 0 20%;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 25%;
			text-align: center;
			line-height: 78upx;
			height: 78upx;
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #f76d45;
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
				width: 70%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		// margin: 10upx 0 100upx;
		
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
	
	.active{
		color: #f76d45 !important;
	}
</style>
