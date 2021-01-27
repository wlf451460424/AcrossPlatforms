<template>
	<view class="content">
		<view v-if="reciveData.isDeleted == 0" style="flex-direction: column;width: 100%; ">
			<swiper @click="gotoImageShow(reciveData.fosteragePlaceImage)" class="swiper-style" indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			  <swiper-item v-for="(item,index) in reciveData.fosteragePlaceImage" :key="index">
			    <image :src="decodeURIComponent(item)" mode="aspectFill"></image>
			  </swiper-item>
			</swiper>
			<view style="width: 100%;flex-direction: column;padding: 0 20upx;background-color: #FFFFFF;">
				<text style="font-size: 40upx;font-weight: 700;line-height: 100upx;">{{reciveData.fosteragePlaceName}}</text>
				<view style="width: 100%;height: 60upx;">
					<text style="width: 50%;">{{reciveData.score}}</text>
					<view style="width: 50%;justify-content: flex-end;">
						<!-- <image @click="chat" src="@/static/service/chat.png" style="width: 50upx;height: 50upx;margin-right: 40upx;"></image> -->
						<!-- <image @click="telphone" src="@/static/service/tel.png" style="width: 50upx;height: 50upx;"></image> -->
					</view>
				</view>
				<view style="width: 100%;align-items: center;color: #888888;background-color: #FFFFFF;">
					<image src="@/static/actionImg/Location_ico.png" style="width: 30upx;height: 36upx;margin-right: 10upx;"></image>
					<text style="width:95%;line-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">{{reciveData.fosteragePlaceAddress}}</text>
				</view>
			</view>
			<view style="width: 100%;padding: 0 40upx;font-size: 36upx;font-weight: bold;padding: 12upx 30upx;background-color: #FFFFFF;">
				<text style="width: 35%;text-align: center;">{{reciveData.fosteragePlaceArea}}m²</text>
				<text style="color: #b7b7b7;">|</text>
				<text style="width: 35%;text-align: center;">{{reciveData.fosteragePlaceRoom}}</text>
				<text style="color: #b7b7b7;">|</text>
				<text style="width: 30%;text-align: center;">{{reciveData.fosteragePlaceFloor}}楼</text>
			</view>
			<view style="width: 100%;flex-direction: column;padding:0 20upx;color: #888888;background-color: #FFFFFF;margin-top: 10uupx;">
				<text style="line-height: 70upx;font-weight: bold;color: #555;" >基础设施</text>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceWindow]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{reciveData.fosteragePlaceWindow==0?'无防护窗':'有防护窗'}}</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceBalcony]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{PlaceBalcony[reciveData.fosteragePlaceBalcony]}}</text>
					</view>
				</view>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceAirConditioning]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>空调</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceHeating]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>暖气</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;flex-direction: column;padding:0 20upx;;color: #888888;background-color: #FFFFFF;">
				<text style="line-height: 70upx;font-weight: bold;color: #555;">宠物设施</text>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceTableware]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>独立食具</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceDrinking]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>独立饮用水</text>
					</view>
				</view>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceToilet]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>独立厕所</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceNest]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>独立窝</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;flex-direction: column;padding:0 20upx;;color: #888888;background-color: #FFFFFF;">
				<text style="line-height: 70upx;font-weight: bold;color: #555;">其它服务</text>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceCutNails]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>剪指甲</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceBathe]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>洗澡</text>
					</view>
				</view>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceFeedingMedicine]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>喂药</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosteragePlaceWalkDog]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>陪遛</text>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;flex-direction: column;padding: 0 20upx 20upx 20upx;background-color: #FFFFFF;margin-top: 8upx;">
				<text style="line-height: 70upx;font-weight: bold;">寄养说明</text>
				<rich-text class="richText" :nodes="reciveData.fosteragePlaceInstruction" style="color: #888888;"></rich-text>
			</view>
			
			<view style="flex-direction: row;width: 100%; height: 80upx; line-height: 100upx;margin-top: 8upx;
				align-items: center;padding:0 20upx; background-color: #FFFFFF;"  >
				<view style="width: 50%;">
					<text style="color: #333333;font-weight: bold;">评论 </text>（
					<text>{{commentTotal}}</text>）	
				</view>
			</view>
			<view style="flex-direction: column;width: 100%;">
				<view v-for="(item,index) in commentList" :key="index" style="flex-direction: column;width: 100%;padding: 12upx 20upx;background-color: #FFFFFF;margin-bottom: 2upx;">
					<view style="flex-direction: row;width: 100%;height: 80upx;">
						<view style="width: 60%;height:100%;">
							<image :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
							<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
								<text style="line-height: 40upx;height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
									{{item.userNickname}}
									<text v-if="item.commentUserIdISme" style="color: #B7B7B7;margin-left:20upx;">(发布者)</text>
								</text>
								<text style="line-height: 40upx;color: #b7b7b7;font-size: 20upx;">{{item.commentFriendlyDate}}</text>
							</view>
						</view>
						<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
							 <view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
							 	<view class="example-body">
							 		<uni-rate :value="item.evaluationScore" disabled="false" />
							 	</view>
							 </view>
							 <view @click="more(item)" style="height: 100%;align-items: center;">
							 	<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
							 </view>
						</view>
					</view>
					<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding-top: 12upx;">
						{{item.evaluationContent}}
					</text>
					<view @click="gotoHuifu_page(item)" v-if="item.replyCount>0?true:false" style="width: 100%;padding-top: 6upx;">
						<text style="padding: 0 12upx;background-color: #f1f1f1;border-radius: 4upx;font-size: 24upx;">{{item.replyCount}}条回复</text>		
					</view>
				</view>
				<view v-if="commentTotal>5"  @click="gotoPinlun_page" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;">
					<text style="color: #f76d45;">打开APP查看更多评论</text>	
				</view>
				<view v-if="commentTotal==0" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;">
					<text style="color: #b7b7b7;">快去发布你的评论吧</text>	
				</view>
			</view>
			
			<view style="width: 100%;flex-direction: column;padding: 0 20upx 20upx 20upx;background-color: #FFFFFF;margin-top: 8upx;">
				<view style="width: 100%;height: 100upx;align-items: center;margin: 12upx 0;">
					<image :src="decodeURIComponent(reciveData.userAvatar)"  style="width: 90upx;height: 90upx;border-radius: 45upx;"></image>
					<view style="width: 80%;align-items: center;margin-left: 20upx;">
						<text style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{reciveData.userNickname}}
						</text>
						<text style="height: 30upx;line-height: 30upx;font-size: 24upx;margin-left: 12upx;padding:0 4upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
							{{reciveData.growthValue}}
						</text>
					</view>
				</view>
				<view style="width: 100%;">
					<view v-if="reciveData.mobileAuthenticationResult" style="width: 120upx;height: 36upx;line-height:36upx;font-size: 24upx;background-color: #f76d45;justify-content: center;margin-right: 20upx;color: #FFFFFF;border-radius: 30upx;">
						<text>手机认证</text>
					</view>
					<view v-if="reciveData.userAuthenticationIdResult" style="width: 120upx;height: 36upx;line-height:36upx;font-size: 24upx;background-color: #f76d45;justify-content: center;margin-right: 20upx;color: #FFFFFF;border-radius: 30upx;">
						<text>身份认证</text>
					</view>
				</view>
				<view style="width: 100%;margin: 12upx 0;">
					<text style="font-weight: bold;">养宠经验：</text>
					<text >{{reciveData.userExperienceYears}}</text>
				</view>
				
				<!-- <view style="width: 100%;flex-direction: column;">
					<view style="width: 100%;height: 100%;justify-content: center;">
						<image :src="decodeURIComponent(noticeImage)" mode="aspectFit"></image>
					</view>
				</view> -->
				<view style="width: 100%;justify-content: center;">
					<image :src="decodeURIComponent(noticeImage)" mode="widthFix" style="width: 100%;"></image>
				</view>
			</view>
			
			<view v-if="gotoBtnShow  && reciveData.fosteragePlaceStatus==0 && reciveData.fosteragePlaceAuditResult==2" style="width: 100%;justify-content: center;color: #FFFFFF;padding:20upx;background-color: #FFFFFF;">
				<view @click="gotoAppointment" :class="{styleNone:reciveData.fosteragePlaceStatus}" style="width: 100%;height: 70upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>{{reciveData.fosteragePlaceStatus==0?'去预约':'暂停营业'}}</text>
				</view>
			</view>
			
			<!-- 底部分享弹窗 -->
			<uni-popup ref="showOperation" type="bottom" style="z-index: 999;">
				<view class="uni-share">
					<text class="uni-share-title">分享到</text>
					<view style="display: flex;flex-direction: column;padding: 20upx 20upx;">
						<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;padding: 20upx 0;border-bottom: 1px solid #f9f9f9;"  >
							<view v-for="(item,index) in this.shareAppp" :key="index" @click="shareItemClick(item.index)"
									style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image :src="item.icon" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >{{ item.text }}</text>	
								</view>
							</view>
						</scroll-view>
						<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;padding:20upx;"  >
							<view @click="placeLink" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="@/static/shar_img/link.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >链接</text>	
								</view>
							</view>
							<view @click="placeReport" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="@/static/shar_img/Report.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >举报</text>	
								</view>
							</view>
							<!-- <view v-if="delBtn_isShow" @click="placeDel" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="../static/shar_img/del.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >删除</text>	
								</view>
							</view>
							<view v-if="delBtn_isShow" @click="opening" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="../static/shar_img/del.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text>{{reciveData.fosteragePlaceStatus==0?'开业':'暂停营业'}}</text>	
								</view>
							</view> -->
						</scroll-view>
					</view>
					<!-- <button type="primary" style="width: 100%;height: 90upx;line-height: 90upx;font-size: 16px;background-color: #FFFFFF; color: #333333;" @click="cancel('share')">取消</button> -->
				</view>
			</uni-popup>
			<!-- 底部弹窗 -->
			<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
				<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
					<view @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
						<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
					</view>
				</view>
			</uni-popup>
			
			<uniPopup ref="share_uniPopup" :mask-click="false" type="center">
				<view class="uni-tip">
					<text class="uni-tip-content" >链接已复制</text>
					<text class="uni-tip-content" style="color: #AAAAAA;" >快去粘贴给你好友吧</text>
					<text class="uni-tip-button" style="color: #f76d45;margin-top: 20upx;padding-top: 20upx;border-top: 1px solid #e7e7e7;" @click="share_confirm()">我知道了</text>
				</view>
			</uniPopup>
		</view>	
		
		<view v-if="reciveData.isDeleted == 1" style="width: 100%;height: 100%;flex-direction: column;background-color: #FFFFFF;align-items: center;padding-top: 200upx;">
			<image style="width:140upx;height: 180upx;margin-bottom: 20upx;" src="@/static/actionImg/404.png"></image>
			<text style="font-size:28upx;color: #b7b7b7;">
				店铺已关闭，换一个看看吧
			</text>
		</view>
		
		<!-- #ifdef H5 -->
			<cover-view class="controls-title" @click="gotoPinlun_page"
				style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
				APP内打开
			</cover-view>
		<!-- #endif -->
		
	</view>	
</template>

<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue';
	import uniSection from '@/components/rate/uni-section/uni-section.vue';
	import h5Copy  from '@/components/h5-copy/junyi-h5-copy.js';
	export default{
		components: {
			uniRate,
			uniSection
		},
		data() {
			let self = this
			return{
				optionIco:["../../static/service/not-option.png",
					"../../static/service/has-option.png",
					"../../static/service/unknown-option.png",
				],
				PlaceBalcony:["无阳台","开放阳台","封闭阳台"],
				shareAppp: [
					// {text: '生成海报',index:0, icon: '../static/shar_img/poster.png'},
					{text: '朋友圈',  index:1, icon: '../../static/shar_img/wechatMoments.png'},
					{text: '微信好友',index:2, icon: '../../static/shar_img/weChat.png'},
					{text: 'QQ好友',  index:3, icon: '../../static/shar_img/qq.png'},
					{text: 'QQ空间',  index:4, icon: '../../static/shar_img/qqZone.png'},
					{text: '微博',    index:5, icon: '../../static/shar_img/sina.png'},
				],
				gotoBtnShow:true,
				noticeImage:'',//寄养须知
				avatarUrl_default:"../../static/header_default.png",
				reciveData:Object,
				// distance:0,//距离
				ContactPhoneNumber:'',//电话
				jubao_Info:Object,//举报参数
				delBtn_isShow:false,//删除按钮是否显示
				commentList:[],//评论列表
				commentTotal:'',
				id:''//详情id
			}
		},
		
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
		onShareAppMessage(res) {
		    return {
		      title: this.reciveData.fosteragePlaceName,
		      // path: this.reciveData.webUrl
		    }
		},
		onShareTimeline() {
			return {
				title: this.reciveData.fosteragePlaceName,
				// query: 'name=xxx&age=xxx',
				imageUrl: this.reciveData.fosteragePlaceImage[0]
			}
		},
		// #endif
		onNavigationBarButtonTap() {
			this.$refs.showOperation.open()
		},
		async onLoad(e) {
			// this.distance = e.p
			this.id = e.id
			//获取详情
			this.getDetails(e.id)
			//获取评价列表
			this.getCommentList(e.id)
			//获取 寄养须知
			this.getFosterNotice()
		},
		methods: {
			//获取寄养须知
			getFosterNotice(){
				let param={}
				let opts={ url:'/portal/v1/copywriting_configuration/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							let arr = res.data.data
							for(var i=0;i<arr.length;i++){
								if(arr[i].copywritingConfigurationType == 1){//寄养须知
									 this.noticeImage = arr[i].copywritingConfigurationUrl
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
			//获取详情
			getDetails(value){
				let param={ "fosteragePlaceId":value }
				let str = '/portal/v1/fosterage_place/get/' + value
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 || res.data.data){
							this.reciveData = res.data.data
							this.reciveData.fosteragePlaceImage = res.data.data.fosteragePlaceImage.split(",")
							
							if(this.reciveData.fosteragePlaceUserId == uni.getStorageSync('userInfo').userId){
								this.delBtn_isShow = true
							}else{
								this.delBtn_isShow = false
							}
							this.ContactPhoneNumber = res.data.data.fosteragePlaceContact
							this.reciveData.userExperienceYears = this.getDaysBetween(res.data.data.userPetTime)
							if(this.reciveData.fosteragePlaceArea > 999){
								this.reciveData.fosteragePlaceArea = '999+ '
							}
							if(this.reciveData.fosteragePlaceFloor > 99){
								this.reciveData.fosteragePlaceFloor = '99+ '
							}
							if(this.reciveData.fosteragePlaceUserId == uni.getStorageSync('userInfo').userId){
								this.gotoBtnShow = false
							}
							if(this.reciveData.score > 0){
								this.reciveData.score = this.reciveData.score + '分'
							}else{
								this.reciveData.score = "暂无评分"
							}
							this.reciveData.growthValue = this.calculation.groupArr(this.reciveData.growthValue).split(" ")[0]
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
			
			getDaysBetween(dateString1){
			   var  startDate = Date.parse(dateString1);
			   var myDate = new Date();
			   var  endDate = Date.parse(myDate);
			   var days=(endDate - startDate)/(1*24*60*60*1000);
			    var y = days/365
			   var str = ''
			   if(y<1){
				   str = '1年以内' 
			   }else{
				    str = parseInt(y) + '年以上' 
			   }
			   return  str;
			},
			
			
			//获取评价列表
			getCommentList(value){
				let param={ 
					"limit": 5,
					"page": 1,
					"evaluationPlaceId":value ,
					"evaluationType": 0,  //服务类型 0:寄养 1:配对
				}
				let opts={ url:'/portal/v1/evaluation/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 || res.data.data){
							this.commentTotal = res.data.data.total
							this.commentList = res.data.data.records;
							for(var i=0;i<this.commentList.length;i++){
								this.commentList[i].evaluationScore = this.commentList[i].evaluationScore
								this.commentList[i].commentFriendlyDate = friendlyDate(new Date(this.commentList[i].createTime.replace(/\-/g,'/')).getTime(),this.commentList[i].createTime)
								if(this.commentList[i].evaluationUserId == this.reciveData.fosteragePlaceUserId){
									this.commentList[i].commentUserIdISme = true
								}else{
									this.commentList[i].commentUserIdISme = false
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
			cancel() {
				this.$refs.showOperation.close()
			},
			placeLink(){
				this.$refs.showOperation.close()
				let content = String(this.reciveData.webUrl); // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title:'不支持',
					})
				} else {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			},
			placeReport(){
				this.$refs.showOperation.close()
				uni.navigateTo({   //7: 寄养场所 8：寄养场所评价 9：寄养场所回复
					url:'/pages/discover/report/index?id='+ this.reciveData.fosteragePlaceId + '&type=7' 
				})
			},
			placeDel(){
				this.$refs.showOperation.close()
				let param={
					"fosteragePlaceId":this.reciveData.fosteragePlaceId,
				} ;
				let opts={ url:'/portal/v1/fosterage_place/remove', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.navigateBack()
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							})
						}
					}
				)
			},
			opening(){
				this.$refs.showOperation.close()
				let value = 0
				if(this.reciveData.fosteragePlaceStatus==0){
					value=1
				}
				if(this.reciveData.fosteragePlaceStatus==1){
					value=0
				}
				let param={
					"fosteragePlaceId":this.reciveData.fosteragePlaceId,
					"fosteragePlaceStatus": value
				} ;
				let opts={ url:'/portal/v1/fosterage_place/update/status', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.reciveData.fosteragePlaceStatus = value
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							})
						}
					}
				)
			},
			telphone(){
				uni.makePhoneCall({
					phoneNumber:this.ContactPhoneNumber,
					success() {
						console.log("success")
					},
					fail() {
						console.log("fail")
					}
				})
			},
			chat(){
				uni.showToast({
				    title: "前往App",
					icon: 'none',
				    duration: 1000
				})
			},
			//更多操作
			more(item){
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.jubao_Info = item;
			},
			//举报
			jubao(){
				uni.navigateTo({   //7: 寄养场所 8：寄养场所评价 9：寄养场所回复
					url:'/pages/discover/report/index?id='+this.jubao_Info.evaluationId + '&type=8' 
				})
				this.$refs.showMore.close()
			},
			gotoImageShow(imageString){
				uni.navigateTo({
					url:"/pages/discover/post-details/post-image?imgArr=" + imageString
				})
			},
			shareItemClick(value){
				this.$refs.showOperation.close()
				switch(value){
					case 1:
					case 2:
					case 3:
					case 4:
						this.$refs.share_uniPopup.open()
						let content = String(this.reciveData.webUrl); // 复制内容，必须字符串，数字需要转换为字符串
						const result = h5Copy(content)
						break;
				}
			},
			share_confirm(){
				this.$refs.share_uniPopup.close()
			},
			//跳转回复页面
			gotoHuifu_page(item){
				// uni.navigateTo({
				// 	url:'service/foster/foster-place-reply-list?id=' + item.evaluationId   + '&type=0'
				// })
			},
			//跳转评论页面
			gotoPinlun_page(){
				// #ifdef H5
				//以前的唤醒方式
				// this.calculation.wakeUp_app('toServeMoreComment?serveSchemeId='+ this.id + '&serveSchemeType=0')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("serviceDetails",{serveSchemeId:this.id,serveSchemeType:0})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.navigateTo({
					url:'/pages/service/foster/foster-place-comment-list?id=' + this.id   + '&type=0'
				})
				// #endif
			},
			gotoAppointment(){
				// #ifdef H5
				//以前的唤醒方式
				// this.calculation.wakeUp_app('toServePromise?serveSchemeId='+ this.id + '&serveSchemeType=0')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("serviceDetails",{serveSchemeId:this.id,serveSchemeType:0})
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
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
	
	// .from-radio{
	// 	transform: scale(0.7);
	// }
	
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
	.styleNone{
		background-color: #666666  !important;
	}
	
	.swiper-style {
		width: 750upx;
		height: 833upx;
		background-color: #FFF;
		display: block;
		flex-direction: column;
	}
	.swiper-style swiper-item {
		display: flex;
		align-items: center;
	}
	.swiper-style swiper-item image {
		width: 750upx;
		height: 833upx;
	}
</style>
