<template>
	<view class="content">
		<!-- <view style="display: none;">
			<el-amap vid="amap" :plugin="plugin" >
			</el-amap>
		</view> -->
		<swiper class="swiper-style" indicator-dots="true" :autoplay="true" :circular="true" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in swipeArr" :key="index" style="justify-content: center;background-color: #000000;">
				<image @click="bannerClick(item.bannerCopywritingUrl,item.bannerDescription)" :src="decodeURIComponent(item.bannerUrl)" v-bind:style="{width: imageWidth + 'px'}"  mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		
		<view v-if="noticlist.length" style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #FFFFFF;padding: 0 20upx;margin-bottom: 2upx;">
			<view style="width: 160upx;height:60upx;align-items: center;padding-right: 10upx;">
				<image src="@/static/service/notice_ico.png" style="width: 34upx;height: 34upx;margin-right: 10upx;"></image>
				领养:
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
		
		<view style="flex-direction: column;width: 100%;height:140upx;background-color: #FFFFFF;margin-bottom: 2upx;">
			<view style="flex-direction: row; width: 100%;height: 140upx;justify-content: center;">
				<view v-for="(item,index) in cardBars" :key="index" @click="click_cardBars(item)"
					style="flex-direction: column;width: 30%; height: 140upx;
					border: 2upx solid #FFFFFF;background-color: rgba(255,255,255,0.2);margin:0 3%;justify-content: center;
					">
					
					<view style="width:100%; height: 80upx;display:flex;justify-content:center;align-items:flex-end;">
						<image :src="item.ico" style="width: 60upx; height: 60upx;"></image>
					</view>
					<view style="width:100%; height: 60upx;justify-content: center;">
						<text style="line-height: 60upx;">{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;">
			<view v-for="(item,index) in tabBars" :key="index" 
				class="nav-item" 
				:class="{current: index === tabCurrentIndex}" 
				:id="'tab'+index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</scroll-view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" :top="-20" class="panel-content" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll">
						<view style="flex-direction: column; width: 100%;">
							<!-- 寄养 -->
							<view v-for="(item,index) in list_0" :key="index" @click="gotoFosterageDetails(item)" style="flex-direction:row;width: 100%;border-radius:4upx;margin-bottom:8upx;background-color: #FFFFFF;padding: 12upx 20upx;" >
								<view style="width: 30%;height: 100%;align-items:center;">
									<image :src="decodeURIComponent(item.fosteragePlaceImage)" mode="aspectFill" style="height:160upx;border-radius: 4upx;"></image>
								</view>
								<view style="width: 70%;height: 100%;flex-direction: column;padding: 0 12upx; ">
									<view style="width: 100%;">
										<view style="width:90%;">
											<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.fosteragePlaceName}}
											</text>
										</view>
									</view>
									<view style="width: 100%;height: 50upx;align-items: center;color: #FFFFFF;line-height: 24upx;font-size: 24upx;">
										<text style="padding:5upx 10upx;margin-right: 20upx;background-color: #F76D45;border-radius: 6upx;">{{item.fosteragePlaceArea}}m²</text>
										<text style="padding:5upx 10upx;margin-right: 20upx;background-color: #F76D45;border-radius: 6upx;">{{item.fosteragePlaceFloor}}楼</text>
									</view>
									<view style="width: 100%;height: 50upx;align-items: flex-end;font-size: 20upx;color: #b7b7b7;align-items: center;">
										<text style="margin-right: 30upx;">{{item.score}}</text>
										<text >{{item.evaluationNum}}评价</text>
										<text style="margin:0 10upx;">|</text>
										<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.fosteragePlacePoi}}
										</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll">
						<view style="flex-direction: column; width: 100%;">
							<!-- 配对 -->
							<view v-for="(item,index) in list_1" :key="index" @click="gotoPairDetails(item)" style="flex-direction:row;width: 100%; border-radius: 4upx;margin-bottom:8upx;background-color: #FFFFFF;padding: 12upx 20upx;" >
								<view style="width: 30%;align-items:center;">
									<image :src="decodeURIComponent(item.pairPetImage)" mode="aspectFill" style="height:160upx;border-radius: 4upx;"></image>
								</view>
								<view style="width: 70%;height: 100%;flex-direction: column; padding: 0 12upx">
									<view style="width: 100%;height: 50upx;">
										<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.pairTitle}}
										</text>
									</view>
									<view style="width: 100%;height: 50upx;align-items: center;line-height: 24upx;font-size: 24upx;color: #b7b7b7;">
										<text style="margin-right: 20upx;">{{greden[item.pairPetGender]}}</text>
										<text style="margin-right: 20upx;">{{item.pairPetBirthday}}</text>
										<text style="padding:5upx 10upx;margin-right: 20upx;background-color: #F76D45;border-radius: 6upx;color: #FFFFFF;">{{item.pairPaid==1?'有偿':'无偿'}}</text>
									</view>
									<view style="width: 100%;height: 50upx;align-items: flex-end;font-size: 20upx;color: #b7b7b7;align-items: center;">
										<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											{{item.pairPoi}}
										</text>
										<text style="margin:0 10upx;">|</text>
										<text>{{item.distance}}</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- #ifdef H5 -->
			<cover-view class="controls-title" @click="downLoadApp"
				style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
				APP内打开
			</cover-view>
		<!-- #endif -->
		
	</view>
</template>
<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			
		},
		data() {
			let self = this
			return {
				// plugin: [{
				// 	pName: 'Geolocation',
				// 	events: {
				// 		init(o) {
				// 			// o 是高德地图定位插件实例
				// 			o.getCurrentPosition((status, result) => {
				// 				if (result.addressComponent && result.position) {
				// 					// 查询成功，result即为当前所在城市信息
				// 					// console.log(result)
				// 					uni.setStorageSync('Latitude', result.position.lat);
				// 					uni.setStorageSync('Longitude', result.position.lng);
				// 					uni.setStorageSync('cityCode', result.addressComponent.citycode);
				// 				}else {
				// 					// console.log(result)
				// 					uni.setStorageSync('Latitude', '34.263161');
				// 					uni.setStorageSync('Longitude', '108.948024');
				// 					uni.setStorageSync('cityCode', '029');
				// 				}
				// 			});
				// 		}
				// 	}
				// }],
				
				swipeArr:[],
				greden:["弟弟","妹妹","未知"],
				dewormingStatus_1:["未内驱虫","已内驱虫"],
				dewormingStatus_2:["未外驱虫","已外驱虫"],
				sterilizationStatus:["未绝育","已绝育","绝育未知"],
				
				cardBars: [
					{title: "寄养", id: '0', gotoUrl:"/pages/service/foster/index", ico:"../../static/service/foster-mine.png" },
					{title: "领养", id: '1', gotoUrl:"/pages/service/adopt/index", ico:"../../static/service/adopt-mine.png"  },
					{title: "配对", id: '2', gotoUrl:"/pages/service/pair/index", ico:"../../static/service/pair-mine.png"  },
					// {title: "走失", id: '3', gotoUrl:"dongtai_view", ico:"../../static/service/belost-mine.png"  },
					// {title: "救助", id: '4', gotoUrl:"xinwen_view", ico:"../../static/service/rescue-mine.png"  },
				],
				tabBars: [
					{name: "推荐家庭", id: '0'},
					{name: "爱宠配对", id: '1'}
				],
				noticlist:[],
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: false,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				list_0:[],
				list_1:[],
				
				imageWidth: uni.getSystemInfoSync().windowWidth*2,//图片宽度   
			}
		},
		beforeCreate() {
			uni.setStorageSync('Latitude', '34.263161');
			uni.setStorageSync('Longitude', '108.948024');
			uni.setStorageSync('cityCode', '029');
		},
		onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.getBanner()
			// 获取未领养宠物列表  随机6条数据
			this.getAdoptList()
			this.onPulldownReresh();
		},
		methods: {
			//获取banner信息
			getBanner(){
				let	param={"bannerPosition": 1} //0：首页/1：服务页
				let	opts={ url:'/portal/v1/banner/position/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.swipeArr = res.data.data
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
			// 获取未领养宠物列表  随机6条数据
			getAdoptList(type){
				let	param={
					cityCode: uni.getStorageSync('cityCode'),
					latitude: uni.getStorageSync('Latitude'),
					longitude: uni.getStorageSync('Longitude'),
				}
				let	opts={ url:'/portal/v1/foster/get/not/adopt', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							let arr = res.data.data
							for(let i=0;i<arr.length;i++){
								var item = Object();
								//未知的时候不显示
								//品种
								var breedName = arr[i].breedName;
								//性别
								if(arr[i].fosterPetGender < 2){    
									var sex = this.greden[arr[i].fosterPetGender]
								}else{
									var sex = ''
								}
								//外驱虫
								if(arr[i].fosterPetExternalDewormingStatus <= 1){    
									var quchong_w = this.dewormingStatus_2[arr[i].fosterPetExternalDewormingStatus]
								}else{
									var quchong_w = ''
								}
								//内驱虫
								if(arr[i].fosterPetInternalDewormingStatus <= 1){    
									var quchong_n = this.dewormingStatus_1[arr[i].fosterPetInternalDewormingStatus]
								}else{
									var quchong_n = ''
								}
								//绝育
								if(arr[i].fosterPetSterilizationStatus <= 1){    
									var jueyu = this.sterilizationStatus[arr[i].fosterPetSterilizationStatus]
								}else{
									var jueyu = ''
								}
								
								item.content = breedName + " " + sex + " " + quchong_w + " " + quchong_n + " " + jueyu
								item.id = arr[i].fosterId;
								this.noticlist.push(item);
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
			noticToDetails(id){
				uni.navigateTo({
					url:this.navigatorUrl.adoptDetailsPages + '?id=' + id
				})
			},
			// 推荐 列表分页 
			getPostList(type){
				let param={}
				let opts={}
				switch(this.tabCurrentIndex){
					case 0:
						param={
							cityCode: uni.getStorageSync('cityCode'),
							latitude: uni.getStorageSync('Latitude'),
							longitude: uni.getStorageSync('Longitude'),
							
						}
						//获取推荐寄养场所列表
						opts={ url:'/portal/v1/fosterage_place/get/recommend', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								// debugger
								if(res.data.code == 200 ){
									if(res.data.data.length ==0){//没有数据
										if(this.tabCurrentIndex==0)this.page_0 --
										if(this.tabCurrentIndex==1)this.page_1 --
										// //上滑加载 处理状态
										this.loadMoreStatus = 2;
									}else{
										let arr = res.data.data
										for(let i=0;i<arr.length;i++){
											arr[i].fosteragePlaceImage = arr[i].fosteragePlaceImage.split(",")[0]
											if(arr[i].fosteragePlaceArea > 999){
												arr[i].fosteragePlaceArea = '999+ '
											}
											if(arr[i].score > 0){
												arr[i].score = arr[i].score + '分'
											}else{
												arr[i].score = "暂无评分"
											}
											arr[i].fosteragePlacePoi = arr[i].fosteragePlacePoi.split("|")[1]
											this.list_0.push(arr[i])
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
						break;
					case 1:
						param={
							cityCode: uni.getStorageSync('cityCode'),
							latitude: uni.getStorageSync('Latitude'),
							longitude: uni.getStorageSync('Longitude'),
						}
						//获取推荐配对列表
						opts={ url:'/portal/v1/pair/get/recommend', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								// debugger
								if(res.data.code == 200 ){
									if(res.data.data.length ==0){//没有数据
										if(this.tabCurrentIndex==0)this.page_0 --
										if(this.tabCurrentIndex==1)this.page_1 --
										// //上滑加载 处理状态
										this.loadMoreStatus = 2;
									}else{
										let arr = res.data.data
										for(let i=0;i<arr.length;i++){
											arr[i].pairPetBirthday = this.getBirthday(arr[i].pairPetBirthday)
											arr[i].pairPetImage = arr[i].pairPetImage.split(",")[0]
											arr[i].pairPoi = arr[i].pairPoi.split("|")[1]
											this.list_1.push(arr[i])
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
						break;
				}
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
				// uni.pageScrollTo({
				// 	duration:0,
				// 	scrollTop:0
				// })
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
			
			click_cardBars(item){
				var index = Number(item.id);
				uni.navigateTo({
					url:item.gotoUrl
				})
			},
			gotoFosterageDetails(item) {
				uni.navigateTo({
					url:this.navigatorUrl.fosterageDetailsPages + '?id=' + item.fosteragePlaceId
				})
			},
			gotoPairDetails(item) {
				uni.navigateTo({
					url:this.navigatorUrl.pairDetailsPages + '?id=' + item.pairId
				})
			},
			getBirthday(dateString1){
				if(dateString1){
					var  startDate = Date.parse(dateString1);
					var myDate = new Date();
					var  endDate = Date.parse(myDate);
					var days=(endDate - startDate)/(1*24*60*60*1000);
					var y = days/365
					var str = ''
					if(y<1){
					   str = '1岁' 
					}else{
					    str = parseInt(y) + '岁' 
					}
					return  str;
				}else{
					return '-'
				}
			},
			bannerClick(str,title){
				if(str){
					if(str.indexOf("http") == -1){
						if( str != "/recommendation"){
							uni.navigateTo({
								url:'/pages' + str
							})
						}else{
							this.downLoadApp()
						}
					}else{
						// #ifdef H5
						window.location.href = str
						// #endif
						
						// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
						uni.setStorageSync("webTitle",title)
						uni.setStorageSync("webUrl",str.replace("index","index-app"))
						uni.navigateTo({
							url:"/pages/web-page"
						})
						// #endif
					}
				}
			},
			downLoadApp(){
				// #ifdef H5
				// this.calculation.wakeUp_app('toMain/main')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("mianDetails",{})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.showToast({
				    title: '请下载APP使用',
					icon: 'none',
				    duration: 2000
				});
				//  #endif
			},
		}
	}
</script>

<style lang='scss' scoped>
	page,
	view {
		display: flex;
	}
	page {
		display: flex;
		height: 100%;
		background-color: #f9f9f9;
	}
	template {
		display: flex;
		flex: 1;
	}
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		display: block;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height:80upx;
		white-space: nowrap;
		background-color: #fff;
		text-align: center;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 45%;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			position: relative;
			/* font-weight: 700; */
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #f76d45;
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
				width: 50%;
			}
		}
	}
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 110upx;
		padding-bottom: 110upx;
	}
	
	.swiper-style {
		height: 300upx;
		display: block;
	}
	.swiper-style swiper-item {
		display: flex;
		align-items: center;
	}
	.swiper-style swiper-item image {
		height: 300upx;
	}
</style>