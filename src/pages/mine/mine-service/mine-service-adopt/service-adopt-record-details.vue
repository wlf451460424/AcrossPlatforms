<template>
	<view class="content">
		<view style="display: flex;flex-direction: row;width: 100%;background: #faefe2;margin-bottom: 2upx;padding: 0 30upx;">
			<view style="height:60upx;align-items: center;justify-content: center;">
				<image src="@/static/mine-ico/tip.png" style="width: 30upx;height: 30upx;"></image>
			</view>
			<!-- 文字滚动 -->
			<uni-notice-bar  style="width: 100%;" scrollable="true" single="true" text="涉及汇款、转账等资金交易时，请务必慎重，注意核实对方身份，电话确认，谨防诈骗"></uni-notice-bar>
		</view>	
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:10upx 30upx;">
			<view style="width: 100%;height: 50upx;align-items: center;">
				<view style="width: 40%;">
					<text style="font-weight: bold;">申请人信息</text>
				</view>
			</view>
			<view style="width: 100%;margin-top: 12upx;">
				<view style="width: 25%;">
					<image :src="decodeURIComponent(reciveData.userAvatar)" mode="aspectFill" style="width: 90upx;height: 90upx;border-radius: 45upx;"></image>
				</view>
				<view style="width: 65%;line-height: 60upx;align-items: center;">
					<text style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{reciveData.userNickname}}
					</text>
				</view>
				<view style="width: 10%;align-items: center;">
					<image v-if="reciveData.adoptOrderContact" @click="telphone(reciveData.adoptOrderContact)" style="width: 50upx;height: 50upx;" src="@/static/service/tel.png"></image>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.userAuthenticationRealname?reciveData.userAuthenticationRealname:'--'}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>男</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp龄：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>20岁</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">婚&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp姻：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{MarriageStatus[reciveData.adoptOrderMarriageStatus]}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">住&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp房：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{Housing[reciveData.adoptOrderHousing]}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">社会身份：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{SocialIdentity[reciveData.adoptOrderSocialIdentity]}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">月薪收入：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{MonthlyIncome[reciveData.adoptOrderMonthlyIncome]}}</text>
				</view>
			</view>
			
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:10upx 30upx;margin-top: 10upx;">
			<view @click="gotoQuestionnairePage" style="width: 100%;height: 50upx;align-items: center;">
				<view style="width: 80%;">
					<text style="font-weight: bold;">查看问卷</text>
				</view>
				<view style="width: 20%;justify-content: flex-end;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>	
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:10upx 30upx;margin-top: 10upx;">
			<view style="width: 100%;height: 50upx;align-items: center;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">领养理由</text>
				</view>
			</view>
			<view style="width: 100%;align-items: center;margin-top:12upx;padding: 12upx 0;border-top: 1px solid #F9F9F9;">
				<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #b7b7b7;font-size: 24upx;" >
					{{reciveData.adoptOrderReason?reciveData.adoptOrderReason:'无'}}
				</text>
			</view>
		</view>	
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 10upx;">
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">订单信息</text>
				</view>
			</view>
			<view style="width: 100%;margin-top: 12upx;">
				<view style="width: 25%;height: 50upx;align-items: center;">
					<text style="color: #999;">寄养宠物：</text>
				</view>
				<view style="width: 75%;flex-direction: column;">
					<view style="width: 100%;height:50upx;line-height: 50upx;align-items: center;">
						<text style="width: 40%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{reciveData.breedName}}
						</text>
						<text style="margin: 0 30upx;width: 20%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{greden[reciveData.fosterPetGender]}}
						</text>
						<text style="width: 20%;">
							{{reciveData.fosterPetBirthday}}
						</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">价&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp格：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.fosterAuditPaid == 1?'有偿':'无偿'}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text style="color:#ffbf59;" :class="{greenStyle:reciveData.adoptOrderStatus >= 3}">{{statusArr[reciveData.adoptOrderStatus]}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">订单编号：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.adoptOrderNo}}</text>
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
		<view v-if="reciveData.adoptOrderStatus == 4" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;margin-bottom: 10upx;">
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
		<view v-if="isShow && !cancelResonShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<checkbox-group @change="checkboxChange" style="width: auto">
					<label style="display: flex;height: 70upx;align-items: center;">
						<checkbox :checked="checkboxIsshow" style="transform:scale(0.8)" />我同意
					</label>
				</checkbox-group>	
				<text @click="agreePage" style="color: #f76d45;">《宠物领养协议》</text>
			</view>
			<view style="width: 100%;height: 100upx;align-items: center;justify-content: flex-end;">
				<view @click="cancelOrder" style="width: 200upx;height:70upx;background-color: #ffbf59;color: #FFFFFF;border-radius: 10upx;align-items: center;justify-content: center;">
					<text>取消订单</text>
				</view>
				<view style="width: 10%;"></view>
				<view @click="confirmOrder" style="width: 200upx;height:70upx;background-color: #f76d45;border-radius: 10upx;align-items: center;justify-content: center;">
					<text style="color: #FFFFFF;">{{confirm_text}}</text>
				</view>
			</view>
		</view>
		
		<!-- 取消理由 -->
		<view v-if="cancelResonShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;margin-bottom: 10upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">取消理由</text>
				</view>
				<view style="width: 30%;align-items: center;justify-content: flex-end;">
					<text @click="reson_cancel" style="margin-right: 30upx;">取消</text>
					<text @click="reson_cancelOrderID" style="color: #f76d45;">保存</text>
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
				avatarUrl_default:"../../../../static/header_default.png",
				greden:["弟弟","妹妹","未知"],
				MarriageStatus:[ "单身","恋爱中","已婚没有小孩","有小孩"],
				Housing:["独居","合租","与家人同住","其他"],
				SocialIdentity:["在职人员","大学生","自由职业者","家庭主妇","退休人员","其他"],
				MonthlyIncome:["5000以下","5000-10000","10000以上"],
				
				statusArr:["待确认","待领养","","已领养","已关闭" ],
				send_value:'',
				confirm_text:'确认订单',
				isShow:false,//协议/取消/确认  控制显示
				cancelResonShow:false,//取消理由弹窗
				replyShow:false,//回复显示控制
				replyViewShow:false,//回复弹窗控制
				replyBtn_show:false,//去回复按钮控制
				checkboxIsshow:false,
				replyData:{},
				commentData:{},
				reciveData:{
					"adoptOrderCertificate": "",//上传凭证
					"adoptOrderFosterId": 0,//	宠物送养ID
					"adoptOrderHousing": 2,//住房 0: 独居/1: 合租/2: 与家人同住/3: 其他
					"adoptOrderId": 0,//订单ID
					"adoptOrderMarriageStatus": 1,//婚姻状况 0: 单身/1: 恋爱中/2: 已婚没有小孩/3: 有小孩
					"adoptOrderMonthlyIncome": 0,//月收入 0: 5000以下/1: 5000-10000/2: 10000以上
					"adoptOrderSocialIdentity": 2,//社会身份 0: 在职人员/1: 大学生/2: 自由职业者/3:家庭主妇/4: 退休人员/5：其他
					"adoptOrderStatus": 0,//订单状态
					"adoptOrderUserId":"1232658182002708482",//领养用户ID
					"adoptOrderNo": "151515153131**",//领养订单编号
					"adoptOrderReason": "夜晚寂寞，需要小狗子温暖",
					"createTime": "2020-05-26 20:05:20",
					"updateTime": "2020-05-29 22:15:40",
					"adoptOrderCancelReason": "临时有事，不出差了，狗儿子我自己带……",
					"fosterPetAge": 1,
					"breedName": "金毛灰猫火猫",
					"fosterPetGender": 0,
					"userNickname":"wangdaye1",
					"userAvatar":"http://img.tukexw.com/img/940bc77b2c56e115.jpg",
					"userAuthenticationIdResult": 0, //身份认证结果
					"userAuthenticationRealname": "王大爷",//下单用户姓名
					"fosterAuditPaid":0,  //	0：无偿:1：有偿
					
				},
				OrderId:'',
				reson_text:'',
				reply_text:'',
				
				resonArr:[
					{id:'1',text:'长时间联系不到买家，交易不成功',status:false},
					{id:'2',text:'买家购买意向不明确，取消订单',status:false},
					{id:'3',text:'买家不想购买了',status:false},
					{id:'4',text:'同城交易，已经见面完成交易',status:false},
					{id:'5',text:'无法提供服务，交易取消',status:false},
					{id:'6',text:'其他原因',status:false}
				],
			}
		},
		async onLoad(e) {
			this.OrderId = e.id
			//获取 订单详情
			this.getOrderIdDetails()
		},
		methods: {
			checkboxChange: function (e) {
				this.checkboxIsshow = !this.checkboxIsshow
			},
			//获取 订单详情
			getOrderIdDetails(type){
				let param={
					"adoptOrderId":this.OrderId
				}
				let str = '/portal/v1/adopt_order/sell/get/' + this.OrderId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.reciveData = res.data.data
							this.reciveData.fosterPetBirthday = this.getBirthday(res.data.data.fosterPetBirthday)
							
							// this.reciveData.adoptOrderStatus = 1 //测试用
							
							//已取消(无按钮)
							if(this.reciveData.adoptOrderStatus == 4 | this.reciveData.adoptOrderStatus == 3){
								this.isShow = false
							}else{
								this.isShow = true
							}
							
							if(this.reciveData.adoptOrderStatus == 0){
								this.send_value = 1
								this.confirm_text = "确认订单"
							}else if(this.reciveData.adoptOrderStatus == 1){
								this.send_value = 3
								this.confirm_text = "已领养"
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
					return ''
				}
				
			},
			
			cancelOrder(){
				this.cancelResonShow = !this.cancelResonShow
			},
			confirmOrder(){
				if(!this.checkboxIsshow){
					uni.showToast({
						icon: "none",
						title: "请同意协议"
					})
					return;
				}
				//修改订单状态
				let param={ 
					"adoptOrderId": this.OrderId,
					"adoptOrderStatus": this.send_value
				}
				let opts={ url:'/portal/v1/adopt_order/update/status', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//订单详情
							this.getOrderIdDetails()
							
							// if(this.reciveData.adoptOrderStatus == 1){
							// 	this.reciveData.adoptOrderStatus = 3
							// 	this.confirm_text = "待完成"
							// }else{
							// 	this.reciveData.adoptOrderStatus += 1
							// 	this.confirm_text = this.statusArr[this.reciveData.adoptOrderStatus]
							// }
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
			agreePage(){
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=9'
				})
			},
			gotoQuestionnairePage(){
				uni.navigateTo({
					url:'service-adopt-questionnaire?id=' + this.reciveData.adoptOrderUserId
				})
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
