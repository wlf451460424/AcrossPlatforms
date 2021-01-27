<template>
	<view class="content">
		<view v-if="reciveData.isDeleted == 0" style="flex-direction: column;width: 100%; ">
			<swiper @click="gotoImageShow(reciveData.fosterPetImage)" class="swiper-style" indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			  <swiper-item v-for="(item,index) in reciveData.fosterPetImage" :key="index">
			    <image :src="decodeURIComponent(item)" mode="aspectFill"></image>
			  </swiper-item>
			</swiper>
			<view style="width: 100%;flex-direction: column;padding: 0 20upx;background-color: #FFFFFF;">
				<text style="font-size: 40upx;font-weight: 700;line-height: 100upx;">{{reciveData.fosterTitle}}</text>
				<view style="width: 100%;align-items: center;">
					<view style="width: 50%;">
						<text style="width: 50%;font-weight: bold;color: #555;">{{reciveData.fosterAuditPaid ==1?'有偿':'无偿'}}</text>
					</view>	
					<view style="width: 50%;justify-content: flex-end;">
						<!-- <image @click="chat" src="@/static/service/chat.png" style="width: 50upx;height: 50upx;margin-right: 40upx;"></image> -->
						<!-- <image @click="telphone" src="@/static/service/tel.png" style="width: 50upx;height: 50upx;"></image> -->
					</view>
				</view>
			</view>
			
			<view style="width: 100%;padding:12upx 20upx;background-color: #FFFFFF;">
				<view style="width: 25%;flex-direction: column;justify-content: center;align-items: center;">
					<image src="@/static/service/petsupplies.png" style="width: 60upx;height: 60upx;"></image>
					<text style="color: #555;line-height: 80upx;">{{reciveData.breedName}}</text>
				</view>
				<view style="width: 25%;flex-direction: column;align-items: center;">
					<image src="@/static/service/gender.png" style="width: 60upx;height: 60upx;"></image>
					<view style="height: 80upx;align-items: center;">
						<text>{{greden[reciveData.fosterPetGender]}}</text>
					</view>
				</view>
				<view style="width: 25%;flex-direction: column;align-items: center;">
					<image src="@/static/service/brithday.png" style="width: 60upx;height: 60upx;"></image>
					<text style="color: #555;line-height: 80upx">{{reciveData.fosterPetBirthday}}</text>
				</view>
				<view style="width: 25%;flex-direction: column;align-items: center;">
					<image src="@/static/service/foster.png" style="width: 60upx;height: 60upx;"></image>
					<text style="color: #555;line-height: 80upx">{{PetOrigin[reciveData.fosterPetOrigin]}}</text>
				</view>
			</view>
			
			<view style="width: 100%;flex-direction: column;padding:0 20upx;color: #888888;background-color: #FFFFFF;margin-top: 2upx;">
				<text style="line-height: 80upx;font-weight: bold;color: #555;" >宠物健康</text>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterPetInternalDewormingStatus]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{dewormingStatus_1[reciveData.fosterPetInternalDewormingStatus]}}</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterPetExternalDewormingStatus]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{dewormingStatus_2[reciveData.fosterPetExternalDewormingStatus]}}</text>
					</view>
				</view>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterPetSterilizationStatus]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{sterilizationStatus[reciveData.fosterPetSterilizationStatus]}}</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterPetImmunityStatus]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{immunityStatus[reciveData.fosterPetImmunityStatus]}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;flex-direction: column;padding:0 20upx;color: #888888;background-color: #FFFFFF;margin-top: 2upx;">
				<text style="line-height: 80upx;font-weight: bold;color: #555;" >领养要求</text>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterConditionWindow]" style="width: 30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>防护窗</text>
					</view>
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[reciveData.fosterConditionBalcony]" style="width:30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{ConditionBalcony[reciveData.fosterConditionBalcony]}}</text>
					</view>
				</view>
				<view style="width: 100%; padding: 10upx 20upx;">
					<view style="width:50%;align-items: center;">
						<image :src="optionIco[1]" style="width:30upx;height: 30upx;margin-right: 10upx;"></image>
						<text>{{conditionEnvironment[reciveData.fosterConditionEnvironment]}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;align-items: center;color: #888888;background-color: #FFFFFF;padding:12upx 20upx;margin-top: 4upx;font-size: 24upx;">
				<image src="@/static/actionImg/Location_ico.png" style="width: 30upx;height: 36upx;margin-right: 10upx;"></image>
				<text style="width:95%;line-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">{{reciveData.fosterAdoptAddress}}</text>
			</view>
			
			<view style="width: 100%;flex-direction: column;padding: 0 20upx 20upx 20upx;background-color: #FFFFFF;margin-top: 8upx;">
				<text style="line-height: 70upx;font-weight: bold;">领养说明</text>
				<rich-text class="richText" :nodes="reciveData.fosterDescription" style="color: #888888;"></rich-text>
			</view>
			
			<view style="flex-direction: row;width: 100%; height: 80upx; line-height: 100upx;margin-top:8upx;
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
							<image :src="decodeURIComponent(item.commentUserAvatar)"  style="width: 76upx;height: 76upx;border-radius: 40upx;"></image>
							<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
								<text style="line-height: 40upx;height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
									{{item.commentUserNickname}}
									<text v-if="item.commentUserIdISme" style="color: #B7B7B7;margin-left:20upx;">(发布者)</text>
								</text>
								<text style="line-height: 40upx;color: #b7b7b7;font-size: 20upx;">{{item.commentFriendlyDate}}</text>
							</view>
						</view>
						<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
							<view @click="clcik_thumbsup_pinlun(item)" style="align-items: baseline;margin-right: 40upx;">
								<image :src="item.iupvoted?zan_ico_over:zan_ico" style="width: 24upx; height: 24upx;margin-right: 10upx;"></image>
								<text style="font-size: 24upx;"> {{item.commentUpvoteCount}}</text>
							</view>
							<view @click="more(item)" style="height: 100%;align-items: center;">
								<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
							</view>
						</view>
					</view>
					<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding-top: 12upx;">
						{{item.commentContent}}
					</text>
					<view v-if="item.replyCount>0?true:false" style="width: 100%;padding-top: 6upx;">
						<text style="padding: 0 12upx;background-color: #f1f1f1;border-radius: 10upx;font-size: 24upx;">{{item.replyCount}}条回复</text>		
					</view>
				</view>
				<view v-if="commentTotal >5" @click="gotoPinlun_page" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;">
					<text style="color: #f76d45;">打开APP查看更多评论</text>	
				</view>
				<view v-if="commentTotal==0" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;">
					<text style="color: #b7b7b7;">快去发布你的评论吧</text>	
				</view>
			</view>
			
			<view style="width: 100%;flex-direction: column;padding: 0 20upx 20upx 20upx;background-color: #FFFFFF;margin-top: 8upx;margin-bottom: 90upx;">
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
					<text >{{reciveData.userPetTime}}</text>
				</view>
				
				<!-- <view style="width: 100%;flex-direction: column;"> -->
					<!-- <text style="font-weight: bold;">领养须知：</text> -->
					<!-- <rich-text class="richText" :nodes="reciveData.fosteragePlaceInstruction" style="color: #888888;"></rich-text> -->
					<!-- <view style="width: 100%;height: 100%;justify-content: center;">
						<image :src="decodeURIComponent(noticeImage)" mode="widthFix"></image>
					</view>
				</view> -->
				
				<view style="width: 100%;justify-content: center;">
					<image :src="decodeURIComponent(noticeImage)" mode="widthFix" style="width: 100%;"></image>
				</view>
				
				<view v-if="gotoBtnShow" style="width: 100%;justify-content: center;color: #FFFFFF;padding:20upx;background-color: #FFFFFF;">
					<view @click="gotoAppointment" style="width: 100%;height: 70upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
						<text>去申请</text>
					</view>
				</view>
			</view>
			
			<view class="foot">
				<chat-input @send-message="send_comment" @blur="blur" @onfocus="onfocus" :focus="focus" :placeholder="input_placeholder"></chat-input>
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
						</scroll-view>
					</view>
					<!-- <button type="primary" style="width: 100%;height: 90upx;line-height: 90upx;font-size: 16px;background-color: #FFFFFF; color: #333333;" @click="cancel('share')">取消</button> -->
				</view>
			</uni-popup>
			<!-- 底部弹窗 -->
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
	import chatInput from '@/components/im-chat/chatinput.vue'; //input框
	import h5Copy  from '@/components/h5-copy/junyi-h5-copy.js';
	export default{
		components: {
			chatInput
		},
		data() {
			let self = this
			return{
				optionIco:["../../static/service/not-option.png",
					"../../static/service/has-option.png",
					"../../static/service/unknown-option.png",
				],
				greden:["弟弟","妹妹","未知"],
				PetOrigin:["家养","流浪","其他"],
				
				dewormingStatus_1:["未内驱虫","已内驱虫","内驱虫未知"],
				dewormingStatus_2:["未外驱虫","已外驱虫","外驱虫未知"],
				sterilizationStatus:["未绝育","已绝育","绝育未知"],
				immunityStatus:["未免疫","已免疫","免疫未知"],
				conditionEnvironment:["笼养","室内圈养","室内外自由散养"],
				ConditionBalcony:["无阳台","开放阳台","封闭阳台"],
				
				shareAppp: [
					// {text: '生成海报',index:0, icon: '../static/shar_img/poster.png'},
					{text: '朋友圈',  index:1, icon: '../../static/shar_img/wechatMoments.png'},
					{text: '微信好友',index:2, icon: '../../static/shar_img/weChat.png'},
					{text: 'QQ好友',  index:3, icon: '../../static/shar_img/qq.png'},
					{text: 'QQ空间',  index:4, icon: '../../static/shar_img/qqZone.png'},
					{text: '微博',    index:5, icon: '../../static/shar_img/sina.png'},
				],
				
				noticeImage:'',//寄养须知
				avatarUrl_default:"../../static/header_default.png",
				reciveData:Object,
				distance:0,//距离
				ContactPhoneNumber:'',//电话
				
				zan_ico: "../../static/actionImg/thumbsup.png",
				zan_ico_over: "../../static/actionImg/thumbsup_over.png",
				
				input_placeholder: '写评论...', //占位内容
				focus: false, //是否自动聚焦输入框
				
				commentTotal:0,//评论总数
				commentList:[],//评论列表
				
				del_show:false,
				jubao_show:false,
				more_commentInfo:'',//点击更多对应的评论数据
				
				fosterId:'',
				gotoBtnShow:true,
				
				id:'',//详情id
				
				isCompleted:true,
			}
		},
		
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
		onShareAppMessage(res) {
		    return {
		      title: this.reciveData.fosterTitle,
		      // path: this.reciveData.webUrl
		    }
		},
		onShareTimeline() {
			return {
				title: this.reciveData.fosterTitle,
				// query: 'name=xxx&age=xxx',
				imageUrl: this.reciveData.fosterPetImage[0]
			}
		},
		// #endif
		onNavigationBarButtonTap() {
			this.$refs.showOperation.open()
		},
		async onLoad(e) {
			// this.distance = e.p
			this.fosterId = e.id
			this.id = e.id
			//获取详情
			this.getDetails(this.fosterId)
			//获取 寄养须知
			this.getFosterNotice()
		},
		onShow() {
			//获取详情
			this.getDetails(this.fosterId)
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
								if(arr[i].copywritingConfigurationType == 6){//领养须知
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
				let param={ "fosterId":value }
				let str = '/portal/v1/foster/get/' + value
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 || res.data.data){
							this.reciveData = res.data.data
							this.reciveData.fosterPetImage = res.data.data.fosterPetImage.split(",")
							this.reciveData.userPetTime = this.getDaysBetween(res.data.data.userPetTime)
							this.reciveData.fosterPetBirthday = this.getBirthday(res.data.data.fosterPetBirthday)
							this.ContactPhoneNumber = res.data.data.fosterContact
							this.getCommentList(this.reciveData.fosterId)
							if(this.reciveData.fosterUserId == uni.getStorageSync('userInfo').userId){
								this.gotoBtnShow = false
							}
							if(this.reciveData.fosterAdoptStatus == 1){
								this.gotoBtnShow = false
							}
							if(this.reciveData.fosterAuditResult != 2){
								this.gotoBtnShow = false
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
			
			//获取评价列表
			getCommentList(value){
				let param={ "limit": 5, "page": 1, "commentPostId":value} ;
				let opts={ url:'/portal/v1/comment/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.commentTotal = res.data.data.total;//评论总数
							this.commentList = res.data.data.records;
							for(var i=0;i<this.commentList.length;i++){
								this.commentList[i].commentFriendlyDate = friendlyDate(new Date(this.commentList[i].createTime.replace(/\-/g,'/')).getTime(),this.commentList[i].createTime)
								if(this.commentList[i].commentUserId == this.reciveData.fosterUserId){
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
				uni.navigateTo({   //10: 送养详情
					url:'/pages/discover/report/index?id='+ this.reciveData.fosterId + '&type=10' 
				})
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
				this.del_show = false;
				this.jubao_show = false;
				if(item.commentUserId === uni.getStorageSync('userInfo').userId){
					this.del_show = true;
				}else{
					this.jubao_show = true;
				}
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.more_commentInfo = item;
			},
			//举报
			jubao(){
				uni.navigateTo({   //5: 评论 6:  回复
					url:'/pages/discover/report/index?id='+this.more_commentInfo.commentId + '&type=5' 
				})
				this.$refs.showMore.close()
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let param={"commentId":this.more_commentInfo.commentId} ;
				let opts={ url:'/portal/v1/comment/remove', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//根据ID查找帖子表数据  刷新加载页面
							this.getPostInfoById()
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
			//点赞  评论
			clcik_thumbsup_pinlun(item){
				let param={
					"upvoteTargetId":item.commentId,//点赞对象Id
					"upvoteTargetType": 5,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							for(var i=0;i<this.commentList.length;i++){
								if(item.commentId == this.commentList[i].commentId){
									this.commentList[i].iupvoted = !this.commentList[i].iupvoted
									if(this.commentList[i].iupvoted){
										this.commentList[i].commentUpvoteCount ++
									}else{
										this.commentList[i].commentUpvoteCount --
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
					}
				)
			},
			
			blur: function() {
				this.focus = false;
			},
			onfocus:function(){
				this.focus = true;
			},
			//发布评论
			send_comment: function(message) {
				if(!this.isCompleted){
					return;
				}
				this.isCompleted = !this.isCompleted
				
				// #ifdef MP-QQ
				let userInfo = uni.getStorageSync('userInfo')
				if(uni.getStorageSync('token') && userInfo && userInfo.userPhoneNumber == ''){
					//免密登录 0； 找回密码 1； 绑定手机 2；
					uni.setStorageSync('typeLogin', 2);
					uni.navigateTo({
						url:'/pages/mine/login/login'
					})
					return
				}
				// #endif
				
				let param={
					"commentPostType": 15,//0: 文章 1：笔记 2：动态 3：问答 4：新闻  15：领养
					"commentPostId": this.reciveData.fosterId,  //帖子id
					"commentContent":message.content, //评论内容
					"commentUserId": uni.getStorageSync('userInfo').userId, //评论用户id
				} ;
				let opts={ url:'/portal/v1/comment/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							var obj = {};
							obj.commentContent = message.content;
							obj.commentId = res.data.data;
							obj.commentUserId = uni.getStorageSync('userInfo').userId;
							obj.commentUserNickname = uni.getStorageSync('userInfo').userNickname;
							obj.commentUserAvatar = uni.getStorageSync('userInfo').userAvatar;
							obj.iupvoted = 0;
							obj.commentUpvoteCount = 0;
							obj.replyCount = 0;
							var date = new Date();
							obj.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
							obj.commentFriendlyDate = friendlyDate(new Date(obj.createTime.replace(/\-/g,'/')).getTime(),obj.createTime)
							if(this.reciveData.fosterUserId == uni.getStorageSync('userInfo').userId){
								obj.commentUserIdISme = true
							}else{
								obj.commentUserIdISme = false
							}
							this.commentList.unshift(obj)
							this.commentList = this.commentList.splice(0,5)
							this.commentTotal = Number(this.commentTotal) + 1
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
						this.isCompleted = !this.isCompleted
					}
				)
			},
			gotoImageShow(imageString){
				uni.navigateTo({
					url:"/pages/discover/post-details/post-image?imgArr=" + imageString
				})
			},
			shareItemClick(value){
				this.$refs.showOperation.close()
				switch(value){
					// case 0: 
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
			//跳转评论页面
			gotoPinlun_page(){
				// #ifdef H5
				//以前的唤醒方式
				// this.calculation.wakeUp_app('toServeMoreComment?serveSchemeId='+ this.id + '&serveSchemeType=2')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("serviceDetails",{serveSchemeId:this.id,serveSchemeType:2})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.navigateTo({
					url:"../discover/post-details/post-comment-list?id=" + this.id + "&type=15"
				})
				// #endif
			},
			gotoAppointment(){
				// #ifdef H5
				//以前的唤醒方式
				// this.calculation.wakeUp_app('toServePromise?serveSchemeId='+ this.id + '&serveSchemeType=2')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("serviceDetails",{serveSchemeId:this.id,serveSchemeType:2})
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
	}
	
	.from-radio{
		transform: scale(0.7);
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
	
	.foot {
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
</style>
