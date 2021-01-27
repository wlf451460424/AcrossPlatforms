<template>
	<view class="content">
		<view style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #faefe2;margin-bottom: 2upx;padding: 0 30upx;">
			<view style="height:60upx;align-items: center;justify-content: center;">
				<image src="@/static/mine-ico/tip.png" style="width: 30upx;height: 30upx;"></image>
			</view>
			<!-- 文字滚动 -->
			<uni-notice-bar  style="width: 100%;" scrollable="true" single="true" text="涉及汇款、转账等资金交易时，请务必慎重，注意核实对方身份，电话确认，谨防诈骗"></uni-notice-bar>
		</view>	
		<view @click="placeDetails(reciveData)" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding: 30upx 30upx 10upx;">
			<view style="width: 100%;">
				<view style="width: 20%;margin-right: 20upx;">
					<image :src="decodeURIComponent(reciveData.pairPetImage)" mode="aspectFill" style="width: 130upx;height: 130upx;"></image>
				</view>
				<view style="width: 80%;flex-direction: column;">
					<view style="width: 100%;">
						<text style="width: 100%;line-height: 65upx;font-size: 32upx;">
							{{reciveData.pairTitle}}
						</text>
					</view>
					<view style="width: 100%;height: 50upx;font-size: 20upx;line-height: 20upx;;align-items: flex-end;color: #999;">
						<text style="margin-right: 30upx;">{{reciveData.publishPetNickname}}</text>
						<text style="margin-right: 30upx;">{{reciveData.publishBreedName}}</text>
						<text style="margin-right: 30upx;">{{greden[reciveData.pairPetGender]}}</text>
						<text style="margin-right: 30upx;">{{reciveData.pairPetBirthday}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 60upx;align-items: center;margin-top: 12upx;color: #888888;">
				<image src="@/static/actionImg/Location_ico.png" style="width: 28upx;height: 28upx;margin-right: 10upx;"></image>
				<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
					{{reciveData.pairAddress}}
				</text>
			</view>
		</view>	
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 100upx;align-items: center;margin: 12upx 0;">
				<view style="width: 80%;align-items: center;">
					<image :src="decodeURIComponent(reciveData.userAvatar)" mode="aspectFill" style="width: 90upx;height: 90upx;border-radius: 45upx;"></image>
					<view style="width: 80%;align-items: center;margin-left: 20upx;">
						<text style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{reciveData.userNickname}}
						</text>
					</view>
				</view>
				<view style="width: 20%;justify-content: flex-end;">
					<!-- <image @click="chat" src="@/static/service/chat.png" style="width: 50upx;height: 50upx;margin-right: 40upx;"></image> -->
					<image v-if="reciveData.pairContact" @click="telphone(reciveData.pairContact)" src="@/static/service/tel.png" style="width: 50upx;height: 50upx;"></image>
				</view>
			</view>
			<view style="width: 100%;height: 40upx;margin-bottom: 12upx;">
				<view v-if="reciveData.mobileAuthenticationResult" style="width: 120upx;height: 36upx;line-height:36upx;font-size: 24upx;background-color: #F4C225;justify-content: center;margin-right: 20upx;color: #FFFFFF;border-radius: 30upx;">
					<text>手机认证</text>
				</view>
				<view v-if="reciveData.userAuthenticationIdResult" style="width: 120upx;height: 36upx;line-height:36upx;font-size: 24upx;background-color: #F4C225;justify-content: center;margin-right: 20upx;color: #FFFFFF;border-radius: 30upx;">
					<text>身份认证</text>
				</view>
			</view>
		</view>
		
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:10upx 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">预约日期：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.pairOrderTime}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;padding-top: 10upx;">
					<text style="color: #999;">预约宠物：</text>
				</view>
				<view style="width: 75%;flex-direction: column;">
					<view style="height:50upx;line-height: 50upx;align-items: center;margin-top: 12upx;">
						<text style="margin-right: 30upx;">{{reciveData.applyPetNickname}}</text>
						<text style="margin-right: 30upx;">{{reciveData.applyBreedName}}</text>
						<text style="margin-right: 30upx;">{{greden[reciveData.applyPetGender]}}</text>
						<text>{{reciveData.applyPetBirthday}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">订单状态：</text>
				</view>
				<view style="width: 75%;align-items: center;color:#ffbf59;" :class="{greenStyle:reciveData.pairOrderStatus >= 3}">
					<text>{{statusArr[reciveData.pairOrderStatus]}}</text>
				</view>
			</view>
			<view style="width: 100%;margin: 12upx 0;">
				<view style="width: 25%;">
					<text style="color: #999;">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #b7b7b7;" >
						{{reciveData.pairOrderRemark?reciveData.pairOrderRemark:'无'}}
					</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:10upx 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">订单信息</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">订单编号：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.pairOrderNo}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">创建时间：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.createTime}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin: 12upx 0;">
				<view style="width: 25%;">
					<text style="color: #999;">完成时间：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.pairOrderStatus >3?reciveData.updateTime:'--'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单取消  显示理由 -->
		<view v-if="reciveData.pairOrderStatus == 5" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;margin-bottom: 8upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">取消理由</text>
				</view>
			</view>
			<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #888888;" >
				{{reciveData.pairOrderCancelReason}}
			</text>
		</view>
		
		<!-- 取消  确认 -->
		<view v-if="isShow && !cancelResonShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 100upx;align-items: center;justify-content: flex-end;">
				<view @click="cancelOrder" style="width: 200upx;height:70upx;background-color: #ffbf59;color: #FFFFFF;border-radius: 10upx;align-items: center;justify-content: center;">
					<text>取消订单</text>
				</view>
			</view>
		</view>
		
		<!-- 取消理由 -->
		<view v-if="cancelResonShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;margin-bottom: 8upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">取消理由</text>
				</view>
				<view style="width: 30%;align-items: center;justify-content: flex-end;">
					<text @click="reson_cancel" style="margin-right: 30upx;">取消</text>
					<text @click="reson_cancelOrderID" style="color: #f76d45;">确定</text>
				</view>
			</view>
			<view style="width: 100%;flex-direction: column;">
				<view v-for="(item,index) in resonArr" :key="index"
					@click="resonClick(item.id)"
					style="width: 100%;height: 80upx;line-height: 80upx;align-items: center;border-bottom: 1px solid #e2e2e2;">
					<view style="width: 10%;justify-content: center;">
						<text style="font-weight: bold;">{{item.id}}.</text>
					</view>	
					<view style="width: 80%;">
						<text>{{item.text}}</text>
					</view>
					<view v-if="item.status" style="width: 10%;justify-content: flex-end;">
						<image src="@/static/mine-ico/recon_ico.png" style="width: 50upx;height: 50upx;"></image>
					</view>
				</view>
			</view>
			<!-- <textarea  @input="uniPopupInput_onKeyInput" placeholder="请输入理由" :value="reson_text" style="width: 100%;height: 140upx;font-size:12px;color: #888888;line-height: 50upx;"/> -->
		</view>
		
		<!-- 去评价 Status == 3  -->
		<view v-if="commentBtn_isShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 100upx;align-items: center;justify-content: flex-end;">
				<view @click="goCommentPage" style="width: 200upx;height:70upx;border: 1px solid #888888;border-radius: 50upx;align-items: center;justify-content: center;">
					<text>去评价</text>
				</view>
			</view>
		</view>
		
		<!-- 评价 Status == 4  -->
		<view v-if="reciveData.pairOrderStatus == 4" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;">
			<view style="width: 100%;height: 60upx;align-items: center;">
				<text style="font-weight: bold;">评价</text>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;margin: 20upx 0;">
				<view style="width: 60%;height:100%;">
					<image :src="decodeURIComponent(commentData.userAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
					<view style="flex-direction: column; margin-left: 10upx;">
						<text style="line-height: 40upx;" >{{commentData.userNickname}}</text>
						<text style="line-height: 40upx;color: #b7b7b7;">{{commentData.commentFriendlyDate}}</text>
					</view>
				</view>
				<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
					 <view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
						<view class="example-body">
							<uni-rate :size="16" :value="commentData.evaluationScore" disabled="false" />
						</view>
					 </view>
				</view>
			</view>
			<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;border-bottom: 1px solid #b7b7b7;">
				{{commentData.evaluationContent}}
			</text>
		</view>
		
		<!-- 已经回复 显示回复 -->
		<view v-if="replyShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding: 0 30upx 20upx 80upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;margin: 20upx 0;">
				<image :src="decodeURIComponent(replyData.userAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
				<view style="flex-direction: column; margin-left: 10upx;">
					<text style="line-height: 40upx;" >{{replyData.userNickname}}</text>
					<text style="line-height: 40upx;color: #b7b7b7;">{{replyData.replyFriendlyDate}}</text>
				</view>
			</view>
			<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;border-bottom: 1px solid #b7b7b7;">
				{{replyData.evaluationReplyContent}}
			</text>
		</view>
		
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/notice/uni-notice-bar/uni-notice-bar.vue'
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
	import uniSection from '@/components/rate/uni-section/uni-section.vue'
	export default {
		components: {
			uniRate,
			uniSection,
			uniNoticeBar
		},
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				greden:["弟弟","妹妹","未知"],
				statusArr:["待确认","待完成","","待评价","已评价","已关闭"],
				isShow:false,//协议/取消/确认  控制显示
				cancelResonShow:false,//取消理由弹窗
				commentBtn_isShow:false,//评价按钮显示
				replyBtn_isShow:false,//回复按钮显示
				replyShow:false,//回复显示控制
				replyData:{},
				commentData:{},
				reciveData:{},
				OrderId:'',
				reson_text:'',
				reply_text:'',
				
				resonArr:[
					{id:'1',text:'信息填写错误',status:false},
					{id:'2',text:'重复下单/误下单',status:false},
					{id:'3',text:'卖家不能按时提供服务',status:false},
					{id:'4',text:'其他原因',status:false}
				],
			}
		},
		async onLoad(e) {
			this.OrderId = e.id
			//获取 订单详情
			this.getOrderIdDetails()
		},
		onShow() {
			//获取 订单详情
			this.getOrderIdDetails()
		},
		methods: {
			//获取 订单详情
			getOrderIdDetails(){
				let param={
					"pairOrderId":this.OrderId
				}
				let str = '/portal/v1/pair_order/apply/get/' + this.OrderId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.reciveData = res.data.data
							this.reciveData.pairPetImage = this.reciveData.pairPetImage.split(",")[0]
							this.reciveData.pairOrderTime = this.reciveData.pairOrderTime.split(" ")[0]
							this.reciveData.pairPetBirthday = this.getBirthday(this.reciveData.pairPetBirthday)
							this.reciveData.applyPetBirthday = this.getBirthday(this.reciveData.applyPetBirthday)
							
							// this.reciveData.pairOrderStatus = 4 //测试用
							
							//待完成(- 底部无按钮)
							if(this.reciveData.pairOrderStatus == 3 ||
								this.reciveData.pairOrderStatus == 4||
								this.reciveData.pairOrderStatus == 5
							){
								this.isShow = false
							}else{
								this.isShow = true
							}
							//待评价(- 底部显示评价按钮)
							if(this.reciveData.pairOrderStatus == 3 ){
								this.commentBtn_isShow = true
							}
							//已评价
							if(this.reciveData.pairOrderStatus == 4){
								//根据订单ID获取评价详情
								this.seachOrderID_Comment()
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
			cancelOrder(){
				this.cancelResonShow = !this.cancelResonShow
			},
			
			// uniPopupInput_onKeyInput: function(event) {
			// 	this.reson_text = event.target.value
			// },
			reson_cancel(){
				this.reson_text =''
				this.cancelResonShow = !this.cancelResonShow
				
				for(var i=0;i<this.resonArr.length;i++){
					this.resonArr[i].status = false
				}
			},
			resonClick(id){
				for(var i=0;i<this.resonArr.length;i++){
					if(id == this.resonArr[i].id){
						this.resonArr[i].status = true
						this.reson_text = this.resonArr[i].text
					}else{
						this.resonArr[i].status = false
					}
				}
			},
			reson_cancelOrderID(){
				if(this.reson_text == ""){
					uni.showToast({
						icon: "none",
						title: "请选择取消原因"
					})
					return;
				}
				//取消订单
				let param={ 
					"pairOrderCancelReason": this.reson_text,
					"pairOrderId": this.OrderId
				}
				let opts={ url:'/portal/v1/pair_order/cancel', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.reciveData.pairOrderCancelReason = this.reson_text
							this.reciveData.pairOrderStatus = 5
							this.cancelResonShow = false
							this.isShow = false
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
			// 去评论  status==3
			goCommentPage(){
				uni.navigateTo({  //	服务类型 0:寄养 1:配对
					url:'add-comment?id=' +this.reciveData.pairOrderId  + '&type=1'
				})
			},
			
			//根据订单ID获取评价详情    status==4
			seachOrderID_Comment(){
				let param={ 
					"evaluationOrderId": this.OrderId,
					"evaluationType": 1
				}
				let str = '/portal/v1/evaluation/get/orderId'
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.commentData = res.data.data
							this.commentData.commentFriendlyDate = friendlyDate(new Date(this.commentData.createTime.replace(/\-/g,'/')).getTime(),this.commentData.createTime)
							if(this.commentData.replyCount == 1){//有回复
								//根据回复ID获取回复详情
								this.seachOrderID_Reply()
							}else{
								this.replyBtn_isShow = true
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
			//根据回复ID获取回复详情
			seachOrderID_Reply(){
				let param={ "evaluationReplyId": this.commentData.evaluationReplyId}
				let str = '/portal/v1/evaluation_reply/get/' + this.commentData.evaluationReplyId
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.replyShow = true
							this.replyData = res.data.data
							this.replyData.replyFriendlyDate = friendlyDate(new Date(this.replyData.createTime.replace(/\-/g,'/')).getTime(),this.replyData.createTime)
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
			telphone(number){
				uni.makePhoneCall({
					phoneNumber:number,
					success() {
						console.log("success")
					},
					fail() {
						console.log("fail")
					}
				})
			},
			dateSpace(sDate1, sDate2) {
				//sDate1和sDate2是2006-12-18格式 得出两日期之间的天数
				var dateSpan, tempDate, iDays;
				sDate1 = Date.parse(sDate1);
				sDate2 = Date.parse(sDate2);
				dateSpan = sDate2 - sDate1;
				dateSpan = Math.abs(dateSpan);
				iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				return iDays;
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
					return ''
				}
			},
			placeDetails(item){
				uni.navigateTo({
					url:this.navigatorUrl.pairDetailsPages + '?id=' + item.pairOrderTableId
				})
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
		/* font-size: 14px; */
		background-color: #f9f9f9;
		margin-top: 2upx;
	}
	.greenStyle{
		color: #b7b7b7 !important;
	}
</style>
