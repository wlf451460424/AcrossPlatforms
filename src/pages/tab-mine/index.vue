<template>
	<view class="center">
		<view style="width: 100%;height: 300upx;flex-direction: column;">
			<view  style="width: 100%;height: 140upx;justify-content: center;padding:0 20upx;align-items: center;margin: 20upx 0;background-color: #F9F9F9;">
				<view style="width: 20%;">
					<image @click="lookBigPic" :src="avatarUrl?decodeURIComponent(avatarUrl):avatarUrl_default" mode="aspectFill" style="width: 130upx;height: 130upx;border-radius: 120upx;border: 2px solid #FFFFFF;"></image>
				</view>
				<view style="width: 80%;flex-direction: column;padding-left: 12upx;">
					<view style="width: 100%;height: 60upx;align-items: center;">
						<view style="width: 90%;align-items: center;">
							<text class="user-nickname" style="font-weight: bold;" @click="nameClick">{{nickName?nickName:'请登录'}}</text>
							<view v-if="subjectInformationName && nickName" style="height: 40upx;padding:4upx 8upx;border-radius: 4upx;align-items: center;margin-left:12upx;">
								<image  style="width: 28upx;height: 28upx;margin-right: 6upx;" src="@/static/badge.png"></image>
								<text  style="font-size: 20upx;color: #b7b7b7;">{{subjectInformationName}}</text>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
						<view style="width: 10%;justify-content: flex-end;">
							<image @click="settingClick" src="@/static/set_ico.png" style="width: 40upx;height: 40upx;"></image>
						</view>
						<!-- #endif -->
					</view>
					<view v-if="growthValue" style="width: 100%;height: 60upx;align-items: center;">
						<view style="width: 60%;">
							<view @click="growClick" style="align-items:center;font-size: 20upx;padding: 0 14upx;border-radius:40upx;background-color:#ffbf59;color: #FFFFFF;">
								{{growthValue}}
								<image  src="@/static/mine-ico/next_white.png" style="margin-left:10upx;width: 12upx; height: 20upx;"></image>
							</view>
						</view>
						<view style="width: 40%;justify-content: flex-end;align-items: center;">
							<text style="font-size: 24upx;color: #b7b7b7;" @click="gotoPersonalPage">
								个人主页
							</text>
							<image  src="@/static/mine-ico/next.png" style="margin-left: 20upx;width: 16upx; height: 26upx;"></image>
						</view>
					</view>
				</view>
			</view>
			<view style="flex-direction: row;height: 140upx;background-color: #FFFFFF;margin: 0 12upx;border-radius: 16upx;align-items: center;">
				<view  @click="click_tabBars(3)" style="flex-direction: column;width: 25%; height: 100upx;display: inline-block;">
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">{{thumbsupNum}}</text>
					</view>
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">点赞</text>
					</view>
				</view>
				<view  @click="click_tabBars(4)" style="flex-direction: column;width: 25%; height: 100upx;display: inline-block;">
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">{{commentNum}}</text>
					</view>
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">评论</text>
					</view>
				</view>
				<view  @click="click_tabBars(0)" style="flex-direction: column;width: 25%; height: 100upx;display: inline-block;">
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">{{favoriteNum}}</text>
					</view>
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">收藏</text>
					</view>
				</view>
				<view  @click="click_tabBars(5)" style="flex-direction: column;width: 25%; height: 100upx;display: inline-block;">
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">{{careNum}}</text>
					</view>
					<view style="width:100%; height: 50upx;justify-content: center;">
						<text style="line-height: 50upx;font-weight: bold;">关注</text>
					</view>
				</view>
			</view>
		</view>
		<view style="flex-direction: column;margin-bottom: 20upx;">
			<view v-if="false" style="width: 100%;flex-direction: column;background-color: #FFFFFF;margin-top: 4px;border-radius:6px;padding-bottom:12upx;">
				<text style="font-weight: bold;line-height: 80upx;padding:0 20upx;">我的预约</text>
				<view style="flex-direction: column;width: 100%;padding:0 20upx;background-color: #FFFFFF;">
					<scroll-view scroll-x="true" style="width: 100%;height:140upx;white-space: nowrap;">
						<view v-for="(item,index) in appointmentBars" :key="index" @click="gotoAppointmentList(item)"
							style="width: 33%; height: 140upx;display: inline-block;">
								<view style="width:100%; height: 90upx;display:flex;justify-content:center;align-items:center;">
									<image :src="item.ico" style="width: 110upx; height: 70upx;"></image>
									<view style="max-width: 30%;height: 100%;" >
										<uni-badge v-if="index==0 && userFosterageOrder" class="uni-badge-left-margin" :text="userFosterageOrder" type="error" size="small" />
										<uni-badge v-if="index==1 && userAdoptOrder" class="uni-badge-left-margin" :text="userAdoptOrder" type="error" size="small" />
										<uni-badge v-if="index==2 && userPairOrder" class="uni-badge-left-margin" :text="userPairOrder" type="error" size="small" />
									</view>
								</view>
								<view style="width:100%; height: 40upx;justify-content: center;">
									<text style="width: 60upx;line-height: 40upx;">{{item.name}}</text>
									<view v-if="index==0 && userFosterageOrder" style="width: 15%;"></view>
									<view v-if="index==1 && userAdoptOrder" style="width: 15%;"></view>
									<view v-if="index==2 && userPairOrder" style="width:15%;"></view>
								</view>
								
						</view>
					</scroll-view>
				</view>
			</view>
			
			<view style="height: 250upx;flex-direction: column;background-color: #FFFFFF;margin:12upx;border-radius: 16upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width: 50%;">
						<text style="font-weight: bold;padding:0 20upx;">我的爱宠</text>
					</view>
					<view v-if="petlist.length" style="width: 50%;justify-content: flex-end;align-items: center;padding:0 20upx;">
						<text @click="goto_petlist" style="font-size: 24upx;color: #b7b7b7;">全部</text>
						<image  src="@/static/mine-ico/next.png" style="margin-left: 20upx;width: 16upx; height: 26upx;"></image>
					</view>
				</view>
				<view style="width: 100%;height:160upx;flex-direction: column;background-color: #FFFFFF;margin-bottom: 4upx;padding:0 20upx;">
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
							<view v-if="item.petGender>1" style="display: flex;width: 100%;height: 100%;align-items: center;padding: 20upx;background: #f9f9f9;border-radius: 6upx;">
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
						<view style="flex-direction: row;width: 40%;height: 140upx;line-height: 90upx;background: #f9f9f9;border-radius: 6upx;margin:6upx 0;display: inline-block;vertical-align: middle;">
							<view style="display: flex;width: 100%;height: 100%;align-items: center;justify-content: center;"  @click="addPet">
								<image src="../../static/mine-ico/add.png" style="width: 50upx; height: 50upx;border-radius: 50upx;margin: 20upx 10upx;"></image>
								<text style="line-height:90upx;font-weight: bold;">添加宠物</text>	
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<view v-if="false" style="flex-direction: column;margin:20upx;border-radius: 16upx;">
				<text style="font-weight: bold;line-height: 80upx;padding:0 20upx;background-color: #FFFFFF;">我的服务</text>
				<view v-if="authenticationData.userAuthenticationIdResult==2" style="flex-direction: column;width: 100%;">
					<view v-for="(item,index) in serviceBars" :key="index" @click="gotoServiceList(item)"
							style="flex-direction: row;height: 100upx;background-color: #FFFFFF;line-height: 80upx;padding:0 20upx;border-bottom: 1px solid #f9f9f9;">
						<view style="width: 50%;height: 100%;align-items: center;">
							<image :src="item.ico" style="width: 50upx;height: 50upx;"></image>
							<text style="padding-left: 20upx;">{{item.name}}</text>
						</view>
						<view style="width: 35%;height: 100%;align-items: center;justify-content: flex-end;">
							<text style="font-size: 12px;color: #888888;"></text>
						</view>
						<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
							<view style="width: 50%;"  v-if="index==0 && merchantFosterageOrder">
								<uni-badge class="uni-badge-left-margin" :text="merchantFosterageOrder" type="error" size="small" />
							</view>
							<view style="width: 50%;" v-if="index==1 && merchantAdoptOrder">
								<uni-badge class="uni-badge-left-margin" :text="merchantAdoptOrder" type="error" size="small" />
							</view>
							<view style="width: 50%;" v-if="index==2 && merchantPairOrder">
								<uni-badge class="uni-badge-left-margin" :text="merchantPairOrder" type="error" size="small" />
							</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</view>
				</view>
				<view v-else style="flex-direction: column;width: 100%;height: 100%;padding:0 20upx;margin-bottom: 40upx;align-items: center;">
					<text style="line-height: 100upx;">
						填写认证信息，即可开通商家服务
					</text>
					<text @click="gotoCertification" style="padding: 0 20upx;display: inline-flex;border: 1px solid #AAAAAA;background-color: #FFFFFF;">
						成为商家
					</text>
				</view>
			</view>
			
			<!-- #ifndef MP-QQ || MP-BAIDU-->
			<swiper class="swiper-style" indicator-dots="true" :autoplay="true" :circular="true" :interval="2000" :duration="500" style="margin:0 12upx;border-radius: 16upx;">
				<swiper-item v-for="(item,index) in swipeArr" :key="index"  style="justify-content: center;border-radius: 20upx;">
					<image @click="bannerClick(item.bannerCopywritingUrl,item.bannerDescription)" :src="decodeURIComponent(item.bannerUrl)" v-bind:style="{width: imageWidth + 'px'}" mode="scaleToFill" style="border-radius: 16upx;"></image>
				</swiper-item>
			</swiper>
			<!-- #endif -->
		</view>
		
		<!-- #ifdef H5 -->
			<cover-view class="controls-title" @click="downLoadApp"
				style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
				APP内打开
			</cover-view>
		<!-- #endif -->
	</view>
</template>

<script>
	 
	import uniBadge from '@/components/uni-badge/uni-badge/uni-badge.vue';
	import uniSection from '@/components/uni-badge/uni-section/uni-section.vue'
	export default {
		components: {
			uniBadge,
			uniSection
		},
		data() {
			return {
				login_status:true,
				subjectInformationName:'',
				nickName:"",
				accountName:"",
				avatarUrl:"../../static/header_default.png",
				avatarUrl_default:"../../static/header_default.png",
				pet_avatarUrl_default:"../../static/pet_header_default.png",
				petlist:[],
				
				favoriteNum:0,
				groupNum:0,
				thumbsupNum:0,
				commentNum:0,
				topicNum:0,
				careNum:0,
				
				appointmentBars:[
					{"name":"寄养","ico":"../../static/mine-ico/index/foster-mine.png","type":0},
					{"name":"领养","ico":"../../static/mine-ico/index/adopt-mine.png","type":1},
					{"name":"配对","ico":"../../static/mine-ico/index/pair-mine.png","type":2},
					// {"name":"问诊","ico":"../../static/mine-ico/index/belost-mine.png","type":3},
					// {"name":"美容","ico":"../../static/mine-ico/index/rescue-mine.png","type":4},
				],
				serviceBars:[
					{"name":"寄养","ico":"../../static/service/foster-mine.png","type":0},
					{"name":"送养","ico":"../../static/service/adopt-mine.png","type":1},
					{"name":"配对","ico":"../../static/service/pair-mine.png","type":2},
					// {"name":"问诊","ico":"../../static/service/belost-mine.png","type":3},
					// {"name":"美容","ico":"../../static/service/rescue-mine.png","type":4},
				],
				growthValue:'',
				growth:0,
				
				authenticationData:Object,
				
				merchantAdoptOrder:0,
				merchantFosterageOrder:0,
				merchantPairOrder:0,
				userAdoptOrder:0,
				userFosterageOrder:0,
				userPairOrder:0,
				
				swipeArr:[],
				imageWidth: uni.getSystemInfoSync().windowWidth * 2,//图片宽度  
			}
		},
		onShow() {
			//获取banner信息
			this.getBanner()
			let token = uni.getStorageSync('token');
			if(token){
				//获取当前登录用户信息
				this.getUserInfo();
			}else{
				this.petlist = []
				this.nickName = ""
				this.avatarUrl = ""
				this.growthValue = ""
				
				this.merchantAdoptOrder = 0
				this.merchantFosterageOrder = 0
				this.merchantPairOrder = 0
				this.userAdoptOrder = 0
				this.userFosterageOrder = 0
				this.userPairOrder = 0
				
				this.careNum = 0
				this.favoriteNum = 0
				this.groupNum = 0
				this.thumbsupNum = 0
				this.commentNum = 0
				this.topicNum = 0
				this.authenticationData.userAuthenticationIdResult = 0
			}
			this.trackEvent()
		},
		methods: {
			trackEvent(){
				// #ifdef MP-WEIXIN
				wx.uma.trackEvent(this.calculation.umeng_event_tab_mine);
				// #endif
				// #ifdef MP-QQ
				qq.uma.trackEvent(this.calculation.umeng_event_tab_mine);
				// #endif
				// #ifdef MP-TOUTIAO
				tt.uma.trackEvent(this.calculation.umeng_event_tab_mine);
				// #endif
				// #ifdef MP-BAIDU
				swan.uma.trackEvent(this.calculation.umeng_event_tab_mine);
				// #endif
			},
			settingClick(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:"/pages/mine/setting/index"
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			
			//获取banner信息
			getBanner(){
				let	param={"bannerPosition": 3} //0：首页/1：服务页 2：广告位  3：个人中心
				let	opts={ url:'/portal/v1/banner/position/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.swipeArr = res.data.data
						}
					}
				)
			},
			
			//获取 登录用户信息
			getUserInfo(){
				let param={}
				let opts={ url:'/portal/v1/current', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							// #ifdef MP-QQ
							//本地缓存 个人信息
							uni.setStorageSync('userInfo', res.data.data);
							//刷新 用户显示信息
							this.subjectInformationName = res.data.data.subjectInformationName;
							this.nickName = res.data.data.userNickname;
							this.accountName = res.data.data.account;
							this.avatarUrl = res.data.data.userAvatar;
							
							//根据用户id获取用户信息
							let param={"userId":uni.getStorageSync('userInfo').userId}
							let str = '/portal/v1/get/' + uni.getStorageSync('userInfo').userId
							let opts={ url:str, method:'POST' }
							this.http.httpTokenRequest(opts,param).then(
								res => {
									if(res.data.code == 200){
										this.growth =  res.data.data.growthValue
										this.growthValue = res.data.data.growthValue
										this.growthValue = this.calculation.groupArr(this.growthValue)
									}
								}
							)
							//获取 宠物列表
							this.getPetList()
							//获取  认证信息
							this.getAuthentication()
							//获取用户处理中的订单数
							this.getProgressOrder()
							//获取数量
							this.getNum()
							// #endif
							// #ifdef H5 || MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
							if(res.data.data.userPhoneNumber == ""){
								uni.setStorageSync('userInfo','');
								uni.setStorageSync('token','');
								uni.setStorageSync('refresh_token','');
								return;
							}else{
								//本地缓存 个人信息
								uni.setStorageSync('userInfo', res.data.data);
								//刷新 用户显示信息
								this.subjectInformationName = res.data.data.subjectInformationName;
								this.nickName = res.data.data.userNickname;
								this.accountName = res.data.data.account;
								this.avatarUrl = res.data.data.userAvatar;
								
								//根据用户id获取用户信息
								let param={"userId":uni.getStorageSync('userInfo').userId}
								let str = '/portal/v1/get/' + uni.getStorageSync('userInfo').userId
								let opts={ url:str, method:'POST' }
								this.http.httpTokenRequest(opts,param).then(
									res => {
										if(res.data.code == 200){
											this.growth =  res.data.data.growthValue
											this.growthValue = res.data.data.growthValue
											this.growthValue = this.calculation.groupArr(this.growthValue)
										}
									}
								)
								//获取 宠物列表
								this.getPetList()
								//获取  认证信息
								this.getAuthentication()
								//获取用户处理中的订单数
								this.getProgressOrder()
								//获取数量
								this.getNum()
							}
							// #endif
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
				let param={} 
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
			//获取  认证信息
			getAuthentication(){
				//查询当前用户认证信息
				let param={}
				let opts={ url:'/portal/v1/user_authentication/get/authentication', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.authenticationData = res.data.data
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});		
						}
					}
				);
			},
			//获取用户处理中的订单数
			getProgressOrder(){
				let param={} 
				let opts={ url:'/portal/v1/fosterage_order/user/progress/order', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.merchantAdoptOrder = res.data.data.merchantAdoptOrder
							this.merchantFosterageOrder = res.data.data.merchantFosterageOrder
							this.merchantPairOrder = res.data.data.merchantPairOrder
							this.userAdoptOrder = res.data.data.userAdoptOrder
							this.userFosterageOrder = res.data.data.userFosterageOrder
							this.userPairOrder = res.data.data.userPairOrder
						}
					}
				)
			},
			gotoPersonalPage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:this.navigatorUrl.personalPages + '?id=' +  uni.getStorageSync('userInfo').userId
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			growClick(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'/pages/mine/growth/index?growth=' + this.growth
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			addPet(){
				let token = uni.getStorageSync('token');
				if(token){
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
						url:"/pages/mine/pet/pet-add"
					})
					// #endif
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			goto_petlist(){
				uni.navigateTo({
					url:'/pages/mine/pet/pet-list'
				})
			},
			gotoPet_Archives(item){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:"/pages/mine/plan/index?nowPetID=" + item.petId
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			click_tabBars(type){
				let token = uni.getStorageSync('token');
				if(!token){
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
					return;
				}
				switch (type) {
					case 3:
						uni.navigateTo({
							url:'/pages/mine/more/thumbsup-list'
						})
						break;
					case 4:
						uni.navigateTo({
							url:'/pages/mine/more/comment-list'
						})
						break;
					case 0:
						uni.navigateTo({
							url:'/pages/mine/more/favorite-list'
						})
						break;
					case 5:
						uni.navigateTo({
							url:'/pages/mine/more/care-list'
						})
						break;
				}
			},
			gotoAppointmentList(item){
				let token = uni.getStorageSync('token');
				if(!token){
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
					return;
				}
				switch (item.type) {
					case 0:
						uni.navigateTo({
							url:'/pages/mine/mine-appointment/mine-foster/index'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'/pages/mine/mine-appointment/mine-adopt/index'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'/pages/mine/mine-appointment/mine-pair/index'
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
			gotoServiceList(item){
				let token = uni.getStorageSync('token');
				if(!token){
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
					return;
				}
				let param={}
				let opts={}
				switch (item.type) {
					case 0:
						param={"fosteragePlaceUserId":uni.getStorageSync('userInfo').userId,"limit": 10,"page": 1}
						opts={ url:'/portal/v1/fosterage_place/page/list/map', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									if(res.data.data.total>0){
										//进入
										uni.navigateTo({
											url:'/pages/mine/mine-service/mine-service-foster/index'
										})
									}else{
										//跳转申请页面
										uni.navigateTo({
											url:'/pages/mine/applay-service?id=0'
										})
									}
								}
							}
						)
						break;
					case 1:
						param={"fosterUserId":uni.getStorageSync('userInfo').userId,"limit": 10,"page": 1}
						opts={ url:'/portal/v1/foster/page/list/map', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									if(res.data.data.total>0){
										//进入
										uni.navigateTo({
											url:'/pages/mine/mine-service/mine-service-adopt/index'
										})
									}else{
										//跳转申请页面
										uni.navigateTo({
											url:'/pages/mine/applay-service?id=1'
										})
									}
								}
							}
						)
						break;
					case 2:
						param={"pairUserId":uni.getStorageSync('userInfo').userId,"limit": 10,"page": 1}
						opts={ url:'/portal/v1/pair/page/list/map', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									if(res.data.data.total>0){
										//进入
										uni.navigateTo({
											url:'/pages/mine/mine-service/mine-service-pair/index'
										})
									}else{
										//跳转申请页面
										uni.navigateTo({
											url:'/pages/mine/applay-service?id=2'
										})
									}
								}
							}
						)
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
			nameClick(){
				if(this.nickName){
					return;
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			lookBigPic(){
				if(this.avatarUrl){
					uni.navigateTo({
						url:"/pages/discover/post-details/header-image?imgArr=" + this.avatarUrl
					})
				}
			},
			gotoCertification(){
				this.downLoadApp();
			},
			getNum(){
				let param={}
				let opts={}
				//获取收藏total
				param={ "limit":1, "page":0,}
				opts={ url:'/portal/v1/favorite/post/pages', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.favoriteNum = this.calculation.digitalConversion(res.data.data.total)
						}
					}
				)
				//获取点赞total
				param={ "limit":1, "page":0,}
				opts={ url:'/portal/v1/upvote/target/pages', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.thumbsupNum = this.calculation.digitalConversion(res.data.data.total)
						}
					}
				)
				//获取评论total
				let commentTotal=0;
				let replyTotal=0;
				param={"limit": 1,"page": 0,"commentUserId": uni.getStorageSync('userInfo').userId}
				opts={ url:'/portal/v1/comment/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							commentTotal = res.data.data.total
							
							//获取回复total
							param={"limit": 1,"page": 0,"replyUserId": uni.getStorageSync('userInfo').userId}
							opts={ url:'/portal/v1/reply/page/list', method:'POST' }
							this.http.httpTokenRequest(opts,param).then(
								res => {
									if(res.data.code == 200 ){
										replyTotal = res.data.data.total
										this.commentNum = Number(commentTotal) + Number(replyTotal)
										this.commentNum = this.calculation.digitalConversion(this.commentNum)
									}
								}
							)
						}
					}
				)
				//获取小组total
				param={
					"limit": 1,"page": 0,
					"followTargetType": 9, //关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					"followUserId": uni.getStorageSync('userInfo').userId,
				}
				opts={ url:'/portal/v1/follow/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.groupNum = this.calculation.digitalConversion(res.data.data.total)
						}
					}
				)
				//获取话题total
				param={
					//关注目标类型 //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					"limit": 1,"page": 0,
					"followTargetType": 8, 
					"followUserId": uni.getStorageSync('userInfo').userId,
				}
				opts={ url:'/portal/v1/follow/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.topicNum = this.calculation.digitalConversion(res.data.data.total)
						}
					}
				)
				
				//获取关注总数
				param={}
				opts={ url:'/portal/v1/follow/total', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.careNum = this.calculation.digitalConversion(res.data.data)
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
		
			bannerClick(str,title){
				// #ifdef MP-QQ
				//qq不打开链接
				return;
				// #endif
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
		},
		onNavigationBarButtonTap(e) {
			let token = uni.getStorageSync('token');
			if(token){
				uni.navigateTo({
					url:"/pages/mine/setting/index"
				})
			}else{
				uni.navigateTo({
					url:'/pages/mine/login/account-login'
				})
			}
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
		background-color: #f9f9f9;
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
		/* font-size: 14px; */
		background-color: #f9f9f9;
		height: -webkit-fill-available;
	}
	.user{
		flex-direction: column;
		text-align: left;
		/* width: 100%; */
	}
	.user-nickname {
		height: 60upx;
		line-height: 60upx;
		max-width: 85%;
		font-size: 28upx;
		// font-weight: bold;
	}
	.header_right{
		width: 100%;
		flex-direction: column;
		padding: 0 20upx;
	}
	
	.swiper-style {
		height:260upx;
		display: block;
	}
	.swiper-style swiper-item {
		display: flex;
		align-items: center;
	}
	.swiper-style swiper-item image {
		height:260upx;
	}
	.uni-swiper .uni-swiper-wrapper{
		border-radius: 16upx;
	}
	
</style>