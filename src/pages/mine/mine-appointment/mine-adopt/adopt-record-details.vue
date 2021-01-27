<template>
	<view class="content">
		<view style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #faefe2;margin-bottom: 2upx;padding: 0 30upx;">
			<view style="height:60upx;align-items: center;justify-content: center;">
				<image src="@/static/mine-ico/tip.png" style="width: 30upx;height: 30upx;"></image>
			</view>
			<!-- 文字滚动 -->
			<uni-notice-bar  style="width: 100%;" scrollable="true" single="true" text="涉及汇款、转账等资金交易时，请务必慎重，注意核实对方身份，电话确认，谨防诈骗"></uni-notice-bar>
		</view>	
		<view @click="placeDetails(reciveData)" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding: 30upx 30upx 0;">
			<view style="width: 100%;">
				<view style="width: 25%;">
					<image :src="decodeURIComponent(reciveData.fosterPetImage)" mode="aspectFill" style="width: 130upx;height: 130upx;"></image>
				</view>
				<view style="width: 75%;flex-direction: column;line-height: 65upx;">
					<view style="width: 100%;height: 65upx;align-items: center;">
						<text style="font-size: 32upx;margin-right: 40upx;"> {{reciveData.fosterTitle}} </text>
						<text style="font-size: 24upx;color: #b7b7b7;"> {{reciveData.fosterAuditPaid==1?'有偿':'无偿'}} </text>
					</view>
					<view style="width: 100%;height: 65upx;align-items: flex-end;">
						<text style="margin-right: 40upx;"> {{reciveData.breedName}} </text>
						<text style="margin-right: 40upx;">{{greden[reciveData.fosterPetGender]}}</text>
						<text>{{reciveData.fosterPetBirthday}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">健康状态：</text>
				</view>
				<text style="width: 35%;text-align: left;">{{dewormingStatus_1[reciveData.fosterPetInternalDewormingStatus]}}</text>
				<text style="width: 40%;text-align: left;">{{dewormingStatus_1[reciveData.fosterPetExternalDewormingStatus]}}</text>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
				</view>
				<text style="width: 35%;text-align: left;">{{immunityStatus[reciveData.fosterPetImmunityStatus]}}</text>
				<text style="width: 40%;text-align: left;">{{sterilizationStatus[reciveData.fosterPetSterilizationStatus]}}</text>
			</view>
			
			<view style="width: 100%;height: 50upx;align-items: center;margin: 12upx 0;">
				<view style="width: 25%;">
					<text style="color: #999;">订单状态：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text style="color:#ffbf59;" :class="{greenStyle:reciveData.adoptOrderStatus >= 3}">{{statusArr[reciveData.adoptOrderStatus]}}</text>
				</view>
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
					<image v-if="reciveData.fosterContact" @click="telphone(reciveData.fosterContact)" mode="aspectFill" src="@/static/service/tel.png" style="width: 50upx;height: 50upx;"></image>
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
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 8upx;">
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
					<text>{{reciveData.adoptOrderId}}</text>
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
					<text>{{reciveData.adoptOrderStatus>3?reciveData.updateTime:'--'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单取消  显示理由 -->
		<view v-if="reciveData.adoptOrderStatus == 4" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 8upx;margin-bottom: 8upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">取消理由</text>
				</view>
			</view>
			<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #888888;" >
				{{reciveData.adoptOrderCancelReason}}
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
				dewormingStatus_1:["未内驱虫","已内驱虫"],
				dewormingStatus_2:["未外驱虫","已外驱虫"],
				sterilizationStatus:["未绝育","已绝育","绝育未知"],
				immunityStatus:["未免疫","已免疫","免疫未知"],
				
				statusArr:["待确认","待领养","","已领养","已关闭" ],
				isShow:false,//协议/取消/确认  控制显示
				cancelResonShow:false,//取消理由弹窗
				
				reciveData:{},
				OrderId:'',
				reson_text:'',
				
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
		methods: {
			//获取 订单详情
			getOrderIdDetails(type){
				let param={
					"adoptOrderId":this.OrderId
				}
				let str = '/portal/v1/adopt_order/buy/get/' + this.OrderId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.reciveData = res.data.data
							this.reciveData.fosterPetBirthday = this.getBirthday(res.data.data.fosterPetBirthday)
							this.reciveData.fosterPetImage = this.reciveData.fosterPetImage.split(",")[0]
							
							// this.reciveData.adoptOrderStatus = 4 //测试用
							
							//3已领养 4已取消 (- 底部无按钮)  
							if(this.reciveData.adoptOrderStatus == 3 ||
								this.reciveData.adoptOrderStatus == 4
							){
								this.isShow = false
							}else{
								this.isShow = true
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
					"adoptOrderCancelReason": this.reson_text,
					"adoptOrderId": this.OrderId
				}
				let opts={ url:'/portal/v1/adopt_order/cancel', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.reciveData.adoptOrderCancelReason = this.reson_text
							this.reciveData.adoptOrderStatus = 4
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
			chat(){
				uni.showToast({
				    title: "前往App",
					icon: 'none',
				    duration: 1000
				})
			},
			placeDetails(item){
				uni.navigateTo({
					url:this.navigatorUrl.adoptDetailsPages + '?id=' + item.adoptOrderFosterId
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
