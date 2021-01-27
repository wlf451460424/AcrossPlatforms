<template>
	<view class="content">
		<view style="display: none;">
			<el-amap vid="amap" :plugin="plugin" >
			</el-amap>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
		<view @click="searchBtn" style="width: 100%;background-color: #FFFFFF;padding: 10upx 20upx;">
			<view style="width: 100%;height: 50upx;background-color: #F9F9F9;padding: 0 20upx;align-items: center;border-radius: 40upx;">
				<image src="@/static/search.png" style="width: 44upx;height: 40upx;margin-right: 20upx;"></image>
				<input disabled="disabled"  placeholder="搜索  动态/问答/笔记/文章/小组/用户" style="width: 100%;height: 50upx;font-size: 12px;color: #888888;" />
			</view>
		</view>
		<!-- #endif -->
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
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll" style="margin-top: 2upx;">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view v-if="carelist.length" style="width: 100%;height: 60upx;background-color: #FFFFFF;padding: 0 20upx;">
							<view style="width: 50%;align-items: center;">你可能感兴趣的人</view>
							<view @click="changeGroup" style="width: 50%;justify-content: flex-end;align-items: center;color: #f76d45;">
								换一批
							</view>
						</view>
						<scroll-view v-if="carelist.length" scroll-x="true" style="width: 100%;height: 340upx;white-space: nowrap;padding:12upx 12upx;">
							<!-- <careCardItem v-for="(item,index) in carelist" v-model="carelist" :key="item.userId"  @fun_del="del_user" @func_care="care" @func_personal="personalPage"
								 :receive-obj="{list:item,index:index}"></careCardItem> -->
								 
							<view v-for="(item,index) in carelist" v-model="carelist" :key="item.userId" 
								style="flex-direction: column;width: 240upx;height: 310upx;border-radius: 10px;display: inline-block;margin-right:5px;background-color: #FFFFFF;">
								<view style="position: absolute; text-align: right; width: 240upx; height: 60upx;">
									<image src="@/static/del.png" mode="aspectFill" style="width: 20upx; height: 20upx;margin: 16upx;" @click="del_user(item.userId)"></image>
								</view>
								<view style="width: 100%;height: 140upx;align-items:center;justify-content: center;">
									<image :src="decodeURIComponent(item.userAvatar)" style="width: 110upx; height: 110upx;border-radius: 60upx;" @click="personalPage(item.userId)"></image>
								</view>
								<view style="display:flex;width: 100%;padding: 0 12upx;align-items: center;justify-content: center;">
									<p style="font-size: 24upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
										{{item.userNickname}}
									</p>                                     
								</view>
								<view v-if="!item.careStatus" style="height: 50upx;justify-content: center;background: #ffbf59;margin:10upx 70upx;border-radius:30upx;" @click="care(item.userId)">
									<text style="text-align: center;width: 80upx;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
								</view>
								<view v-if="item.careStatus" style="height: 50upx;justify-content: center;border:2upx solid #ffbf59;margin:10upx 70upx;border-radius:30upx;" @click="care(item.userId)">
									<text style="text-align: center;width: 80upx;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
								</view>
								<view style="width: 100%;justify-content: center;color: #b7b7b7;margin-bottom: 12upx;font-size: 20upx;">
									<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
										{{item.isFollow==1?'在关注你哦':'可能感兴趣的人 '}}
									</text>
								</view>
							</view>	 
						</scroll-view>
						<view style="width: 100%;flex-direction: column;padding: 0 12upx;">
							<indexItem :receive-obj="{item:item}" v-for="(item,index) in list_0" :key="index" ></indexItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<swiper class="swiper-style" indicator-dots="true" :autoplay="true" :circular="true" :interval="2000" :duration="500">
								<swiper-item v-for="(item,index) in swipeArr" :key="index"  style="justify-content: center;background-color: #000000;">
									<image @click="bannerClick(item.bannerCopywritingUrl,item.bannerDescription)" :src="decodeURIComponent(item.bannerUrl)" v-bind:style="{width: imageWidth + 'px'}" mode="scaleToFill"></image>
								</swiper-item>
							</swiper>
							<view v-if="noticelist.length" style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #FFFFFF;padding: 0 10upx;margin: 2upx 0;">
								<view style="width: 160upx;height: 60upx;align-items: center;padding-right: 10upx;">
									<image src="@/static/service/notice_ico.png" style="width: 34upx;height: 34upx;margin-right: 10upx;"></image>
									公告:
								</view>
								<!-- 上下滚动 -->
								<view class="uni-swiper-msg" style="padding: 0;">
								   	<swiper class="swiper" vertical="true" autoplay="false" duration="300" interval="3000">
								    	<swiper-item v-for="(item,index) in noticelist" :key="index">
								     		<view @click="noticToDetails(item.announcementId)" style="line-height: 60upx;">{{item.announcementTitle}}</view>
								    	</swiper-item>
								   	</swiper>
								</view>
							</view>
							
							<view v-if="advertisementArr.length" style="width: 100%;background-color: #FFFFFF;padding: 10upx;margin-bottom: 2upx;">
								<view  style="width: 50%;margin-right: 10upx;align-items: center;">
									<image @click="bannerClick(advertisementArr[0].bannerCopywritingUrl,advertisementArr[0].bannerDescription)" :src="decodeURIComponent(advertisementArr[0].bannerUrl)" style="width: 100%;height: 330upx;border-radius: 8upx;" mode="scaleToFill"></image>
								</view>
								<view style="width: 50%;align-items: center;flex-direction: column;">
									<image @click="bannerClick(advertisementArr[1].bannerCopywritingUrl,advertisementArr[1].bannerDescription)" :src="decodeURIComponent(advertisementArr[1].bannerUrl)" style="width: 100%;height: 160upx;border-radius: 8upx;margin-bottom: 10upx;" mode="scaleToFill"></image>
									<image @click="bannerClick(advertisementArr[2].bannerCopywritingUrl,advertisementArr[2].bannerDescription)" :src="decodeURIComponent(advertisementArr[2].bannerUrl)" style="width: 100%;height: 160upx;border-radius: 8upx;" mode="scaleToFill"></image>
								</view>
							</view>
							<view style="flex-direction: column; width: 100%;">
								<tweentItem v-for="(item,index) in list_1" :key="index" :receive-obj="{obj:item,isShowType:true}"></tweentItem>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 同城 -->
							<tweentItem v-for="(item,index) in list_2" :key="index" :receive-obj="{obj:item,isShowType:true}"></tweentItem>
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
		
		<!-- #ifdef H5 -->
		<cover-view class="controls-title" @click="downLoadApp"
			style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
			APP内打开
		</cover-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import amap from '@/utils/amap-wx.js'; 
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, windowHeight = 0, scrollTimer = false, tabBar;
	import indexItem from  'pages/component/index-swiper0-item.vue'
	import tweentItem from 'pages/component/tweent-item.vue';
	export default {
		components: {
			indexItem,
			tweentItem
		},
		data() {
			let self = this
			return {
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									// 查询成功，result即为当前所在城市信息
									// console.log(result)
									uni.setStorageSync('Latitude', result.position.lat);
									uni.setStorageSync('Longitude', result.position.lng);
									uni.setStorageSync('cityCode', result.addressComponent.citycode);
									
									if(result.addressComponent.adcode.substr(0,2) == "81"){
										self.tabBars[2].name = '香港'
									}
									else if(result.addressComponent.adcode.substr(0,2) == "82"){
										self.tabBars[2].name = '澳门'
									}
									else if(result.addressComponent.adcode.substr(0,2) == "71"){
										self.tabBars[2].name = '台湾'
									}else{
										if(result.addressComponent.city == ''){
											let str = result.addressComponent.province
											self.tabBars[2].name = str.replace("市",""); 
										}else{
											self.tabBars[2].name = result.addressComponent.city.replace("市",""); 
											if(self.tabBars[2].name.length>2){
												self.tabBars[2].name = '同城'
											}
										}
									}
								}else {
									// console.log(result)
									uni.setStorageSync('Latitude', '34.263161');
									uni.setStorageSync('Longitude', '108.948024');
									uni.setStorageSync('cityCode', '029');
									self.tabBars[2].name = '西安'
								}
							});
						}
					}
				}],
				
				amapPlugin:null,  
				key:'3c5902c08ece804c0447d46ebe2e1326', 
				
				isFold:false,
				avatarUrl_default:"../../static/header_default.png",
				tabBars:[
					{name: '关注',id: '0'},
					{name: '推荐',id: '1'},
					{name: '西安',id: '2'},
				],
				typeText:["文章","笔记","动态","问答"],
				carelist: [],
				
				swipeArr:[],
				advertisementArr:[],
				
				tabCurrentIndex:1, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page_0:1,
				page_1:1,
				page_2:1,
				list_0:[],
				list_1:[],
				list_2:[],
				
				imageWidth: uni.getSystemInfoSync().windowWidth * 2,//图片宽度  
				 
				noticelist:[],
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
			}
		},
		beforeCreate() {
			uni.setStorageSync('Latitude', '34.263161');
			uni.setStorageSync('Longitude', '108.948024');
			uni.setStorageSync('cityCode', '029');
			
			// uni.chooseLocation({
			//     success: function (res) {
			// 		console.log(res);
			//         console.log('位置名称：' + res.name);
			//         console.log('详细地址：' + res.address);
			//         console.log('纬度：' + res.latitude);
			//         console.log('经度：' + res.longitude);
			//     }
			// });
			
			// // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function (res) {
			// 		console.log(res);
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// })
			// // #endif
		},
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU
		onShareAppMessage(res) {
		    return {
		      title: '甜宠',
		    }
		},
		onShareTimeline() {
			return {
				title: '甜宠',
			}
		},
		// #endif
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			windowHeight = uni.getSystemInfoSync().windowHeight;
			
			this.amapPlugin = new amap.AMapWX({  
				key: this.key  
			});
			
			this.getRegeo()
			
			//获取banner信息
			this.getBanner()
			//获取运营广告信息
			this.getAdvertisement()
			//获取帖子列表
			this.onPulldownReresh();
			//获取notice
			this.getNoticeList()
		},
		onShow() {
			// //获取banner信息
			// this.getBanner()
			// //获取运营广告信息
			// this.getAdvertisement()
			// //获取帖子列表
			// this.onPulldownReresh();
			// //获取notice
			// this.getNoticeList()
		},
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url:'/pages/discover/search/index'
			})
		},
		onNavigationBarButtonTap(val) {
			uni.navigateTo({
				url:'/pages/mine/msg/index',
			})
			
			// let token = uni.getStorageSync('token');
			// if(token){
			// 	uni.navigateTo({
			// 		url:'/pages/mine/msg/index'
			// 	})
			// }else{
			// 	setTimeout(()=>{
			// 		uni.navigateTo({
			// 			url:'/pages/mine/login/account-login'
			// 		})
			// 	}, 100)
			// }
		},
		methods: {
			getRegeo() {  
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				this.amapPlugin.getRegeo({
					success: (data) => {  
						// console.log(data)  
						uni.setStorageSync('Latitude', data[0].latitude);
						uni.setStorageSync('Longitude', data[0].longitude);
						uni.setStorageSync('cityCode', data[0].regeocodeData.addressComponent.citycode);
						// self.tabBars[2].name = data[0].regeocodeData.addressComponent.city
					},
					fail: (data) => {  
						uni.setStorageSync('Latitude', '34.263161');
						uni.setStorageSync('Longitude', '108.948024');
						uni.setStorageSync('cityCode', '029');
					}
				}); 
				// #endif
			},
			searchBtn(){
				uni.navigateTo({
					url:'/pages/discover/search/index'
				})
			},
			judgeLogin(){
				let token = uni.getStorageSync('token');
				if(token){
					//下拉刷新  切换完成加载数据
					this.onPulldownReresh()
				}else{
					// this.carelist = [];
					// this.list_0 = [];
					// uni.showToast({
					// 	icon:'none',
					//     title: "请登录",
					//     duration: 1000
					// });
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/login/account-login'
						})
					}, 500)
				}
			},
			//获取banner信息
			getBanner(){
				let	param={"bannerPosition": 0} //0：首页/1：服务页
				let	opts={ "url":'/portal/v1/banner/position/list', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.swipeArr = res.data.data
						}
					}
				)
			},
			//获取运营广告信息
			getAdvertisement(){
				let	param={"bannerPosition": 2} //0：首页/1：服务页/2:运营广告位
				let	opts={ "url":'/portal/v1/banner/position/list', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.advertisementArr = res.data.data
						}
					}
				)
			},
			//获取 感兴趣的人列表
			getInterestList(){
				let	param={}
				let	opts={ "url":'/portal/v1/feed_flow/interest/list', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<res.data.data.length;i++){
								res.data.data[i].careStatus = false;
							}
							this.carelist = res.data.data
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
			//前端查询帖列表分页  
			getList(type){
				let value = "0"
				let param={}
				let opts={}
				switch(this.tabCurrentIndex){
					case 0: 
						//获取 感兴趣的人列表
						this.getInterestList()
						//获取用户动态信息流列表
						param={
							"limit": this.limit,
							"page": this.page_0,
						}
						opts={ "url":'/portal/v1/feed_flow/page/list', "method":'POST' }
						break;
					case 1:
						param={
							"limit": this.limit,
							"page": this.page_1,
							"postType":'',
						}
						opts={ "url":'/portal/v1/post/get_post_by_hot', "method":'POST' }
						break;
					case 2:
						param={
							"limit": this.limit,
							"page": this.page_2,
							"cityCode": uni.getStorageSync('cityCode')
						}
						opts={ "url":'/portal/v1/post/page/list/city', "method":'POST' }
						break;
				}
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								if(this.tabCurrentIndex==0)this.page_0 --
								if(this.tabCurrentIndex==1)this.page_1 --
								if(this.tabCurrentIndex==2)this.page_2 --
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
									if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
									if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
									if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
								}
							}
							if(this.tabCurrentIndex == 2){
								for(let i=0;i<this.list_2.length;i++){
									// 处理 关注状态
									if(this.list_2[i].postUserId == uni.getStorageSync('userInfo').userId){
										this.list_2[i].isShowCareBtn = false
									}else{
										if(this.list_2[i].ifollowed){
											this.list_2[i].isShowCareBtn = false
										}else{
											this.list_2[i].isShowCareBtn = true
										}
									}
									this.list_2[i].postContent = this.list_2[i].postContent.replace(/\s/g,"");
									//处理时间
									this.list_2[i].timerAgo = friendlyDate(new Date(this.list_2[i].createTime.replace(/\-/g,'/')).getTime(),this.list_2[i].createTime)
								
									if(this.list_2[i].postType == 0){
										var str = this.list_2[i].postContent
										//匹配图片（g表示匹配所有结果i表示区分大小写）
										var imgReg = /<img.*?(?:>|\/>)/gi;
										//匹配src属性
										var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
										var imgArr = str.match(imgReg);
										if(imgArr){
											this.list_2[i].postImage = '';
											for(let j=0;j<imgArr.length;j++){
												if(j<3){
													this.list_2[i].postImage += imgArr[j].match(srcReg)[1] + ','
												}
											}
											this.list_2[i].postImage = this.list_2[i].postImage.substr(0, this.list_2[i].postImage.length - 1);  
										}
									}
								}
							}
							if(this.tabCurrentIndex == 1){
								for(let i=0;i<this.list_1.length;i++){
									this.list_1[i].postContent = this.list_1[i].postContent.replace(/\s/g,"");
									//处理时间
									this.list_1[i].timerAgo = friendlyDate(new Date(this.list_1[i].createTime.replace(/\-/g,'/')).getTime(),this.list_1[i].createTime)
									
									if(this.list_1[i].postType == 0){
										var str = this.list_1[i].postContent
										//匹配图片（g表示匹配所有结果i表示区分大小写）
										var imgReg = /<img.*?(?:>|\/>)/gi;
										//匹配src属性
										var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
										var imgArr = str.match(imgReg);
										if(imgArr){
											this.list_1[i].postImage = '';
											for(let j=0;j<imgArr.length;j++){
												if(j<3){
													this.list_1[i].postImage += imgArr[j].match(srcReg)[1] + ','
												}
											}
											this.list_1[i].postImage = this.list_1[i].postImage.substr(0, this.list_1[i].postImage.length - 1);  
										}
									}
								}
								
							}
							if(this.tabCurrentIndex == 0){
								for(let i=0;i<this.list_0.length;i++){
									if(this.list_0[i].feedFlowObjectType == 0){
										var str = this.list_0[i].postContent
										//匹配图片（g表示匹配所有结果i表示区分大小写）
										var imgReg = /<img.*?(?:>|\/>)/gi;
										//匹配src属性
										var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
										var imgArr = str.match(imgReg);
										if(imgArr){
											this.list_0[i].postImage = '';
											for(let j=0;j<imgArr.length;j++){
												if(j<3){
													this.list_0[i].postImage += imgArr[j].match(srcReg)[1] + ','
												}
											}
											this.list_0[i].postImage = this.list_0[i].postImage.substr(0, this.list_0[i].postImage.length - 1);  
										}
									}
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
				this.carelist = [];
				this.list_0 = [];
				this.list_1 = [];
				this.list_2 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				this.page_2 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
				if(this.tabCurrentIndex==2)this.page_2 ++
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
				this.getList(type)
			},
			
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			//tab切换
			async changeTab(e){
				let token = uni.getStorageSync('token');
				if(e == 0 && !token){
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
					return;
				}
				
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
					
					if(this.tabCurrentIndex == 1){
						this.getNoticeList()
					}
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
			//获取notice
			getNoticeList(){
				let param={
					"limit": 10,
					"page": 1, 
				};
				let opts={ "url":'/portal/v1/announcement/page/list', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							let arr = res.data.data.records
							for(let i=0;i<arr.length;i++){
								if(arr[i].announcementPublic){
									this.noticelist.push(arr[i])
								}
							}
						}
					}
				)
			},
			noticToDetails(id){
				uni.navigateTo({
					url:this.navigatorUrl.notificationDetailsPages + "?id=" + id
				})
			},
			care(value){
				//添加/修改关注状态
				let param={
					"followTargetId": value, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ "url":'/portal/v1/follow/update', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							let newArr=[];
							for(var i=0;i<this.carelist.length;i++){
								if(this.carelist[i].userId == value){
									this.carelist[i].careStatus  = !this.carelist[i].careStatus
								}
								newArr.push(this.carelist[i])	
							}
							this.carelist = newArr
						}else if(res.data.code == 2012 ){
							uni.showToast({
								icon:'none',
							    title: res.data.msg,
							    duration: 1000
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/mine/login/account-login'
								})
							}, 1000)
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
			del_user(value){
				let newArr=[];
				for(var i=0;i<this.carelist.length;i++){
					if(this.carelist[i].userId != value){
						newArr.push(this.carelist[i])
					}
				}
				this.carelist = newArr
			},
			personalPage(value){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  value
				})
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.postUserId, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ "url":'/portal/v1/follow/update', "method":'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list_2.length;i++){
								if(item.postUserId == this.list_2[i].postUserId){
									this.list_2[i].isShowCareBtn = false
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
			//换一批
			changeGroup(){
				// let arr = this.carelist;
				// for(let i = 0,len = arr.length; i < len; i++){
				// 	let currentRandom = parseInt(Math.random() * (len - 1));
				// 	let current = arr[i];
				// 	arr[i] = arr[currentRandom];
				// 	arr[currentRandom] = current;
				// }
				// this.carelist =[]
				// this.carelist = arr
				
				//获取 感兴趣的人列表
				this.getInterestList()
			},
			closeNotice(){
				this.noticelist = []
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
					let opts={ "url":'/portal/v1/post/remove', "method":'POST' }
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
			bannerClick(str,title){
				// //标签
				// uni.navigateTo({
				// 	url:'/pages/tag/categories',
				// })
				// return;
				
				// //榜单
				// uni.navigateTo({
				// 	url:'/pages/rank'
				// })
				// return;
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
					
					this.trackEvent(str,title)
				}
			},
			trackEvent(str,title){
				// #ifdef MP-WEIXIN
				wx.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':str,'sweetPetsName':title,'triggerCounter':1});
				// #endif
				// #ifdef MP-QQ
				qq.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':str,'sweetPetsName':title,'triggerCounter':1});
				// #endif
				// #ifdef MP-TOUTIAO
				tt.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':str,'sweetPetsName':title,'triggerCounter':1});
				// #endif
				// #ifdef MP-BAIDU
				swan.uma.trackEvent(this.calculation.umeng_event_menu_total,{'sweetPetsId':str,'sweetPetsName':title,'triggerCounter':1});
				// #endif
			}
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
		background-color: #f9f9f9;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 80upx;
		white-space: nowrap;
		background-color: #FFFFFF;
		text-align: center;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 25%;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			font-size:28upx;
			/* font-weight: bold; */
			position: relative;
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
			font-size:32upx;
			font-weight: bold;
			color: #f76d45;
			&:after{
				width: 40%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
		/* margin-top: 4upx; */
	}
	
	.panel-scroll-box{
		height: 100%;
		/* margin: 0 0 110upx; */
		/* padding-bottom: 110upx; */
		/* .panel-item{
			background: #fff;
			padding: 60upx 0;
		} */
	}
	.swiper-style {
		height:300upx;
		display: block;
	}
	.swiper-style swiper-item {
		display: flex;
		align-items: center;
	}
	.swiper-style swiper-item image {
		height:300upx;
	}
	
</style>
