<template>
	<view class="center">
		<view class="banner" style="margin-bottom: 4upx;">
		    <image class="banner-img" src="@/static/personalback.png" mode="scaleToFill"></image>
			<view style="position: absolute;width:100%;height: 420upx;background: rgba(0,0,0,0.3);"></view>
		    <view class="banner-title">
				<text style="width:100%;height: 60upx;line-height: 60upx;font-size: 28upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
					简介：{{personalInfo.userProfile?personalInfo.userProfile:'此用户很懒，什么都没有留下'}}
				</text>
				<view style="width: 100%;justify-content: flex-end;height: 50upx;align-items: center;">
					<view @click="goDetailsInfo" style="height: 40upx;line-height: 40upx;padding: 0 8upx;border-radius: 6upx;align-items: center;">
						<text style="font-size: 24upx;">详细信息</text>
						<view style="width:16upx;height:16upx;border-top:2upx solid #FFFFFF; border-right:2upx solid #FFFFFF;transform: rotate(45deg);margin-left: 20upx;"></view>
					</view>
				</view>
			</view>
			<view class="banner-title1">
				<view style="width:25%;">
					<image @click="lookBigPic" class="user-img" :src="personalInfo.userAvatar?decodeURIComponent(personalInfo.userAvatar):avatarUrl_default" ></image>
				</view>
				<view style="width:75%;margin-left: 20upx;flex-direction: column;color: #f1f1f1;"> 
					<view style="flex-direction: row;width: 100%;align-items: center;line-height: 50upx;">
						<view style="width: 70%;align-items: center;">
							<text style="font-size: 32upx;">{{personalInfo.userNickname}}</text>
							<image :src="grendenArr[personalInfo.userGender]" style="width: 44upx;height: 44upx;margin:0 20upx;"></image>
						</view>
						<view style="width: 30%;justify-content: flex-end;">
							<view v-if="!personalInfo.ifollowed && !edit_Show" @click="ClickCareBtn(personalInfo)">
								<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
									<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
								</view>
							</view>
							<view v-if="personalInfo.ifollowed && !edit_Show" @click="ClickCareBtn(personalInfo)">
								<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
									<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
								</view>
							</view>
						</view>
					</view>
					<view style="flex-direction: row;width: 100%;align-items: center;line-height: 60upx;color: #e6e6e6;">
						<text style="font-size: 24upx;">甜宠号：{{personalInfo.userName}}</text>
						<image src="@/static/mine-ico/copy.png" style="width: 30upx;height:30upx;margin-left:12upx;" @click="copyUserName"></image>
					</view>
					<view style="flex-direction: row;width: 100%;align-items: center;height: 60upx;">
						<view v-if="personalInfo.subjectInformationName" style="height: 40upx;padding:0 8upx;border-radius: 4upx;background-color:rgba(255,255,255,0.15); align-items: center;margin-right:12upx;">
							<image style="width: 30upx;height: 30upx;margin-right: 6upx;" src="@/static/badge_white.png"></image>
							<text style="color: #FFFFFF;font-size: 20upx;">{{personalInfo.subjectInformationName}}</text>
						</view>
						<text style="height: 40upx;line-height: 40upx;font-size: 24upx;margin-right: 12upx;padding:0 8upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.15);">
							{{personalInfo.growthValue}}
						</text>
						<text v-if="personalInfo.userCity" style="font-size: 24upx;line-height: 40upx;height: 40upx;padding:0 8upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.15);">
							{{personalInfo.userCity?personalInfo.userCity:'未知'}}
						</text>
						<view v-if="edit_Show" style="align-items: center;margin-left: 20upx;">
							<image src="@/static/mine-ico/bianji.png" style="width: 30upx;height:30upx;margin-left:auto;" @click="goPersonInfo"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 140upx;background-color: #FFFFFF;margin-bottom: 8upx;padding:0 20upx;">
			<view @click="gotoView('0')" style="width: 25%;height: 100%;flex-direction: column;justify-content: center;align-items: center;">
				<text style="font-weight: bold;">{{personalInfo.followCount}}</text>
				<text style="font-weight: bold;">关注</text>
			</view>
			<view @click="gotoView('1')" style="width: 25%;height: 100%;flex-direction: column;justify-content: center;align-items: center;">
				<text style="font-weight: bold;">{{personalInfo.fansCount}}</text>
				<text style="font-weight: bold;">粉丝</text>
			</view>
			<view @click="gotoView('2')" style="width: 25%;height: 100%;flex-direction: column;justify-content: center;align-items: center;">
				<text style="font-weight: bold;">{{personalInfo.commentCount}}</text>
				<text style="font-weight: bold;">获评</text>
			</view>
			<view @click="gotoView('3')" style="width: 25%;height: 100%;flex-direction: column;justify-content: center;align-items: center;">
				<text style="font-weight: bold;">{{personalInfo.approvalCount}}</text>
				<text style="font-weight: bold;">获赞</text>
			</view>
		</view>
		
		<view v-if="petlist.length" style="width: 100%;flex-direction: column;background-color: #FFFFFF;margin-bottom: 8upx;padding:0 20upx;">
			<text style="font-size: 28upx;font-weight: bold;line-height: 80upx;">{{appellation}}宠物</text>
			<view style="width: 100%;height:160upx;flex-direction: column;background-color: #FFFFFF;margin-bottom: 4upx;padding:0 10upx;">
				<scroll-view scroll-x="true" style="width: 100%;height:160upx;white-space: nowrap;">
					<view v-for="(item,index) in petlist" v-model="petlist" :key="index" @click="gotoPet_Archives(item)" 
						style="flex-direction: row;width: 320upx;height:140upx;display: inline-block;vertical-align: middle;margin-right:20upx;border-radius: 6upx;">
						<view v-if="item.petGender=== 0" style="display: flex;width: 100%;height: 100%;align-items: center;padding: 20upx; background-color:#EDF6FF;border-radius: 6upx;">
							<image :src="item.petAvatar?decodeURIComponent(item.petAvatar):pet_avatarUrl_default" mode="aspectFill" style="width: 100upx; height: 100upx;border-radius: 6upx;"></image>
							<view style="flex-direction: column;width:180upx;padding-left:10upx;">
								<text style="width:170upx;line-height:50upx;font-size: 28upx;font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
									{{item.petNickname}}
								</text>	
								<text style="width:170upx;line-height:50upx;font-size: 20upx;color: #BBBBBB;">
									{{item.breedName}}
								</text>	
								<!-- <text style="width:170upx;line-height:35upx;font-size: 20upx;color: #BBBBBB;">
									<text style="margin-right: 12upx;">{{item.petAge}}</text>
									{{item.petWeight}}KG
								</text>	 -->
							</view>
						</view>
						<view v-if="item.petGender=== 1" style="display: flex;width: 100%;height: 100%;align-items: center;padding: 20upx; background-color:#FFEEF6;border-radius: 6upx;">
							<image :src="item.petAvatar?decodeURIComponent(item.petAvatar):pet_avatarUrl_default" mode="aspectFill" style="width: 100upx; height: 100upx;border-radius: 6upx;"></image>
							<view style="flex-direction: column;width:180upx;padding-left:10upx;">
								<text style="width:170upx;line-height:50upx;font-size: 28upx;font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
									{{item.petNickname}}
								</text>	
								<text style="width:170upx;line-height:50upx;font-size: 20upx;color: #BBBBBB;">
									{{item.breedName}}
								</text>	
								<!-- <text style="width:170upx;line-height:35upx;font-size: 20upx;color: #BBBBBB;">
									<text style="margin-right: 12upx;">{{item.petAge}}</text>
									{{item.petWeight}}KG
								</text>	 -->
							</view>
						</view>
						<view v-if="item.petGender>1" style="display: flex;width: 100%;height: 100%;align-items: center;padding: 20upx; background-color:#F9F9F9;border-radius: 6upx;">
							<image :src="item.petAvatar?decodeURIComponent(item.petAvatar):pet_avatarUrl_default" mode="aspectFill" style="width: 100upx; height: 100upx;border-radius: 6upx;"></image>
							<view style="flex-direction: column;width:180upx;padding-left:10upx;">
								<text style="width:170upx;line-height:50upx;font-size: 28upx;font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
									{{item.petNickname}}
								</text>	
								<text style="width:170upx;line-height:50upx;font-size: 20upx;color: #BBBBBB;">
									{{item.breedName}}
								</text>	
								<!-- <text style="width:170upx;line-height:35upx;font-size: 20upx;color: #BBBBBB;">
									<text style="margin-right: 12upx;">{{item.petAge}}</text>
									{{item.petWeight}}KG
								</text>	 -->
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view v-if="false" style="flex-direction: column;width: 100%;margin-bottom: 8upx;background-color: #FFFFFF;padding:0 20upx;">
			<text style="font-size: 28upx;font-weight: bold;line-height: 80upx;">{{appellation}}服务</text>
			<scroll-view scroll-x="true" style="width: 100%;height:140upx;white-space: nowrap;">
				<view v-for="(item,index) in serviceBars" :key="index" @click="gotoServicePlaceList(item)"
					style="flex-direction: column;width: 33%; height: 120upx;display: inline-block;">
					<view style="width:100%; height: 80upx;display:flex;justify-content:center;align-items:center;">
						<image :src="item.ico" style="width: 60upx; height: 60upx;"></image>
					</view>
					<view style="width:100%; height: 40upx;justify-content: center;">
						<text style="line-height: 40upx;font-weight: bold;">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
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
		<mix-pulldown-refresh ref="mixPulldownRefresh" :top="120" class="panel-content" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab" >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 动态 -->
							<tweentItem v-for="(item,index) in list_0" :key="index" :receive-obj="{obj:item,isShowType:false}"></tweentItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;">
							<!-- 问答 -->
							<tweentItem v-for="(item,index) in list_1" :key="index" :receive-obj="{obj:item,isShowType:false}"></tweentItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;flex-flow: wrap;">
							<!-- 笔记 -->
							<noteItem v-for="(item,index) in list_2" :key="index" :receive-obj="{obj:item}" style="width: 48%;display: inline-block;margin: 10upx 0 0 10upx;"></noteItem>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;" >
							<!-- 文章 -->
							<articleItem v-for="(item,index) in list_3" :key="index" :receive-obj="{obj:item}"></articleItem>
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
	 
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import h5Copy  from '@/components/h5-copy/junyi-h5-copy.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	import tweentItem from 'pages/component/tweent-item.vue';
	import noteItem from 'pages/component/note-item.vue';
	import articleItem from 'pages/component/article-item.vue';
	export default {
		components:{
			tweentItem,
			noteItem,
			articleItem
		},
		data() {
			return {
				isFold:false,
				avatarUrl_default:"../../static/header_default.png",
				pet_avatarUrl_default:"../../static/pet_header_default.png",
				base_default:'',
				
				// greden_0:'../../static/mine-ico/greden_0.png',
				// greden_1:'../../static/mine-ico/greden_1.png',
				grendenArr:["../../static/mine-ico/greden_0.png","../../static/mine-ico/greden_1.png",""],
				
				personalInfo:Object,
				petlist:[],
				isActive: true,
				isShow: true,
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: false,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				tabBars:[
					{name: '动态', id: '2'},
					{name: '问答',id: '3'},
					{name: '笔记',id: '1'},
					{name: '文章',id: '0'},
					// {name: '更多',id: '4'}
				],
				moreList:[
					{name: '收藏',id: '0'},
					{name: '评论',id: '1'},
					{name: '点赞',id: '2'},
					{name: '服务',id: '3'},
					{name: '小组',id: '4'},
					{name: '话题',id: '5'}
				],
				type: '',
				
				serviceBars:[
					{"name":"寄养","ico":"../../static/service/foster-mine.png","type":0},
					{"name":"送养","ico":"../../static/service/adopt-mine.png","type":1},
					{"name":"配对","ico":"../../static/service/pair-mine.png","type":2},
					// {"name":"问诊","ico":"../../static/service/rescue-mine.png","type":3},
					// {"name":"美容","ico":"../../static/service/belost-mine.png","type":4},
				],
				
				careCount:0,
				fansCount:0,
				thumbsCount:0,
				commentCount:0,
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				page_2:1,
				page_3:1,
				list_0:[],
				list_1:[],
				list_2:[],
				list_3:[],
				
				currentUserId:'',
				edit_Show:false,
				
				selectType:2,
				
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
				
				appellation:''
			}
		},
		onShow() {
			// let token = uni.getStorageSync('token');
			// if(token){
			// 	//获取当前登录用户信息
			// 	this.getUserInfo();
			// 	//获取 宠物列表
			// 	this.getPetList();
			// 	//获取当前用户关注数量
			// 	this.getCareCount()
			// 	//获取帖子列表
			// 	this.onPulldownReresh()
			// }else{
			// 	uni.showToast({
			// 		icon:'none',
			// 	    title: "认证失败,请重新登录!",
			// 	    duration: 1000
			// 	});
			// 	setTimeout(()=>{
			// 		uni.navigateTo({
			// 			url:'login/account-login'
			// 		})
			// 	}, 500)
			// }
			
			if(this.currentUserId){
				this.getUserInfo()
			}
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
		async onLoad(e) {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.currentUserId = e.id
			this.getUserInfo()
			
			if(uni.getStorageSync('userInfo').userId ==this.currentUserId){
				this.edit_Show = true
			}
		},
		// mounted() {
		// 	window.addEventListener("scroll",this.getScroll); 
		// },
		// destroyed () {
		// 	window.removeEventListener('scroll', this.getScroll)
		// },
		methods: {
			// //监听滚动
			// getScroll(){
			// 	// console.log(document.documentElement.scrollTop)
			// 	this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			// 	if (!!document.documentElement.scrollTop &&document.documentElement.scrollTop > 430){            
			// 		this.enableScroll = true
			// 	}else{
			// 		this.enableScroll = false
			// 	}
			// },
			//获取 用户信息
			getUserInfo(){
				//根据用户id获取用户信息
				let param={"userId":this.currentUserId}
				let str = '/portal/v1/get/' + this.currentUserId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.personalInfo = res.data.data
							this.personalInfo.growthValue = this.calculation.groupArr(this.personalInfo.growthValue).split(" ")[0]
							
							if(this.personalInfo.userId == uni.getStorageSync('userInfo').userId){
								this.appellation = '我的'
							}else{
								if(this.personalInfo.userGender == 1){
									this.appellation = '她的'
								}else{
									this.appellation = '他的'
								}
							}
							//获取 宠物列表
							this.getPetList()
							//获取帖子列表
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
			
			//获取 宠物列表
			getPetList(){
				let param={"petUserId":this.currentUserId} 
				let opts={ url:'/portal/v1/pet/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petlist = res.data.data.records;
							for(var i=0;i<this.petlist.length;i++){
								this.petlist[i].petAge = this.getDaysBetween(this.petlist[i].petBirthday)
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
			copyUserName(){
				let content = String(this.personalInfo.userName); // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					// uni.showToast({
					// 	title:'不支持复制',
					// })
				} else {
					uni.showToast({
						title:'甜宠号已复制',
						icon:'none'
					})
				}
			},
			goPersonInfo() {
				// #ifdef MP-QQ
				let userInfo = uni.getStorageSync('userInfo')
				if(userInfo && userInfo.userPhoneNumber == ''){
					//免密登录 0； 找回密码 1； 绑定手机 2；
					uni.setStorageSync('typeLogin', 2);
					uni.navigateTo({
						url:'/pages/mine/login/login'
					})
				}
				// #endif
				// #ifndef MP-QQ
				uni.navigateTo({
					url:"/pages/mine/info/index"
				})
				// #endif
			},
			goDetailsInfo(){
				uni.navigateTo({
					url:"/pages/mine/info/info-details?id=" + this.currentUserId
				})
			},
			gotoView(type){
				switch(type){
					case '0' :
						uni.navigateTo({
							url:"/pages/mine/follow-list?id=" + this.currentUserId
						})
						break;
					case '1' :
						uni.navigateTo({
							url:"/pages/mine/fans-list?id=" + this.currentUserId
						})
						break;
					case '2' :
						if(this.currentUserId == uni.getStorageSync('userInfo').userId){
							uni.navigateTo({
								url:"/pages/mine/msg/msg-comment?id=" + this.currentUserId
							})
						}
						break;
					case '3' :
						if(this.currentUserId == uni.getStorageSync('userInfo').userId){
							uni.navigateTo({
								url:"/pages/mine/msg/msg-thumbsup?id=" + this.currentUserId
							})
						}
						break;
				}
			},
			addPet(){
				uni.navigateTo({
					url:"/pages/mine/pet/pet-add"
				})
			},
			
			change(e) {
				// console.log('是否打开:' + e.show)
			},
			
			
			//前端查询帖子列表分页
			getPostList(type){
				if(this.tabCurrentIndex==0)this.selectType=2
				if(this.tabCurrentIndex==1)this.selectType=3
				if(this.tabCurrentIndex==2)this.selectType=1
				if(this.tabCurrentIndex==3)this.selectType=0
				let param={
					"limit": this.limit,
					"page": this.page_0,
					"postType": this.selectType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻
					"postUserId": this.currentUserId,
				}
				let opts={ url:'/portal/v1/post/page/list/user', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								if(this.tabCurrentIndex==0)this.page_0 --
								if(this.tabCurrentIndex==1)this.page_1 --
								if(this.tabCurrentIndex==2)this.page_2 --
								if(this.tabCurrentIndex==3)this.page_3 --
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
									//处理时间
									arr[i].timerAgo = friendlyDate(new Date(arr[i].createTime.replace(/\-/g,'/')).getTime(),arr[i].createTime)
									
									if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[i])
									if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[i])
									if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[i])
									if(this.tabCurrentIndex==3 && this.list_3.length<res.data.data.total)this.list_3.push(arr[i])
								}
							}
							
							if(this.tabCurrentIndex == 3){
								for(let i=0;i<this.list_3.length;i++){
									var str = this.list_3[i].postContent
									//匹配图片（g表示匹配所有结果i表示区分大小写）
									var imgReg = /<img.*?(?:>|\/>)/gi;
									//匹配src属性
									var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
									var arr = str.match(imgReg);
									if(arr){
										this.list_3[i].postImageShow = arr[0].match(srcReg)[1];
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
				this.list_0 = [];
				this.list_1 = [];
				this.list_2 = [];
				this.list_3 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				this.page_2 = 1;
				this.page_3 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
				if(this.tabCurrentIndex==2)this.page_2 ++
				if(this.tabCurrentIndex==3)this.page_3 ++
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
			async changeTab(e,type){
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
			
			
			more_itemClick(index,name){
				// uni.showToast({
				// 	icon: "none",
				// 	title: "跳转：" + name
				// })
				// //	跳转相应页面
				// uni.navigateTo({
				// 	url:""
				// })
				
				switch (index) {
					case 0:
						uni.navigateTo({
							url:'/pages/mine/more/favorite-list'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'/pages/mine/more/comment-list'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'/pages/mine/more/thumbsup-list'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'/pages/mine/more/service-list'
						})
						break;
					case 4:
						uni.navigateTo({
							url:'/pages/mine/more/group-list'
						})
						break;
					case 5:
						uni.navigateTo({
							url:'/pages/mine/more/topic-list'
						})
						break;
				}
			},
			gotoPet_Archives(item){
				uni.navigateTo({
					// url:"../mine/pet/index?petData=" + encodeURIComponent(JSON.stringify(item))
					url:'/pages/mine/pet/index?id=' + item.petId + '&name=' + item.petNickname
				})
			},
			gotoServicePlaceList(item){
				switch (item.type) {
					case 0:
						uni.navigateTo({
							url:"/pages/mine/mine-service/mine-service-foster/service-foster?id=" + this.currentUserId
						})
						break;
					case 1:
						uni.navigateTo({
							url:"/pages/mine/mine-service/mine-service-adopt/service-adopt?id=" + this.currentUserId
						})
						break;
					case 2:
						uni.navigateTo({
							url:"/pages/mine/mine-service/mine-service-pair/service-pair?id=" + this.currentUserId
						})
						break;
					case 3:
						uni.showToast({
							title: '敬请期待：' + item.name,
							icon: 'none',
							duration: 1000
						});
						break;
					case 4:
						uni.showToast({
							title: '敬请期待：' + item.name,
							icon: 'none',
							duration: 1000
						});
						break;
				}
			},
			gotoTopicListPage(postTopicId){
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
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
			lookBigPic(){
				uni.navigateTo({
					url:"/pages/discover/post-details/header-image?imgArr=" + this.personalInfo.userAvatar
				})
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.userId, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.personalInfo.ifollowed = !this.personalInfo.ifollowed
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
							consuni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});			
						}
					}
				)
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
			downLoadApp(){
				// this.calculation.wakeUp_app('toMain/main')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("mianDetails",{})
			},
		},
	}
</script>

<style lang="scss" scoped>
	page,
	view {
	    display: flex;
	}
	page {
	    display: flex;
	    // min-height: 100%;
	    background-color: #FFFFFF;
	}
	
	template {
	    display: flex;
	    flex: 1;
	}
	/* 个人中心 */
	.center {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		
		// display: none;
		display: block;
	}
	.header_div {
		width: 100%;
		// height: 380upx;
		/* padding: 20upx 20upx 0 20upx; */
		box-sizing: border-box;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
	}
	.header_left{
		width: 100%;
		/* border-bottom: 1px solid #b7b7b7; */
		padding: 20upx;
	}
	.user{
		flex-direction: column;
		text-align: left;
		/* width: 100%; */
	}
	.user-nickname2 {
		margin-left: 40upx;
		font-size: 24upx !important;
		padding: 20upx 14upx;
		// background-color: #f76d45;
		border-radius: 6upx;
	}
	.user-accountname {
		height: 60upx;
		line-height: 60upx;
		color: #AAAAAA;
	}
	.header_right{
		width: 100%;
		flex-direction: column;
		padding: 0 20upx;
	}
	
	.item_text{
		width: 50%;
		line-height: 40upx;
		text-align: center;
	}
	.active{
		color: #f76d45;
	}
	.active_none{
		display: none;
	}
	.content_title_item{
		margin-top: 4upx;
		width: 100%;
		height: 40px;
		padding: 20upx;
		box-sizing: border-box;
		/* background-color: #f76d45; */
		flex-direction: row;
		align-items: center;
	}
	
	
	.button {
		flex: 1;
		margin: 20upx 0;
	}
	
	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}
	
	.uni-share-title {
		line-height: 60upx;
		font-size: 32upx;
		padding: 15upx 0;
		text-align: center;
	}
	
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 30upx;
	}
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		width: 200rpx;
	}
	
	.uni-share-content-image {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	
	.content-image {
		width: 60rpx;
		height: 60rpx;
	}
	
	.uni-share-content-text {
		font-size: 26rpx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}
	
	.uni-share-btn {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 14px;
		border-top-color: #f5f5f5;
		border-top-width: 1px;
		border-top-style: solid;
		text-align: center;
		color: #666;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		width: 100%;
		height: 80upx;
		white-space: nowrap;
		background-color: #FFFFFF;
		text-align: center;
	}
	.nav-item{
		display: inline-block;
		/* width: 150upx; */
		width:25%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		position: relative;
		font-weight: bold;
		// font-weight: 700;
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
		/* border-bottom: 4upx solid #f76d45; */
		color: #f76d45;
		&:after{
			width: 50%;
		}
	}
	.swiper-box{
		height: 100%;
		background-color: #f9f9f9;
	}
	
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 60upx 0;
			border-bottom: 4upx solid #000;
		}
	}
	.user-img{
		width: 160upx;
		height: 160upx;
		border-radius: 140upx;
	}
	.banner {
	    height: 420upx;
	    overflow: hidden;
	    position: relative;
	    background-color: #ccc;
	}
	.banner-img {
	    width: 100%;
		height: 420upx;
		// filter: blur(10px);
	}
	.banner-title {
		width: 100%;
		flex-direction: column;
	    overflow: hidden;
	    position: absolute;
	    bottom: 20upx;
	    color: white;
	    z-index: 11;
		padding: 0 30upx;
	}
	.banner-title1 {
		width: 100%;
	    max-height: 200upx;
	    overflow: hidden;
	    position: absolute;
	    bottom:150upx;
		align-items: center;
		padding:0 30upx;
	}
	
</style>