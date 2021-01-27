<template>
	<view class="content">
		<view style="display: flex;flex-direction: row;width: 100%;height: 60upx;background: #faefe2;margin-bottom: 2upx;padding: 0 30upx;">
			<view style="height:60upx;align-items: center;justify-content: center;">
				<image src="@/static/mine-ico/tip.png" style="width: 30upx;height: 30upx;"></image>
			</view>
			<!-- 文字滚动 -->
			<uni-notice-bar style="width: 100%;" scrollable="true" single="true" text="涉及汇款、转账等资金交易时，请务必慎重，注意核实对方身份，电话确认，谨防诈骗"></uni-notice-bar>
		</view>	
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding: 20upx 30upx;">
			<view style="width: 100%;">
				<view style="width: 15%;">
					<text style="font-weight: bold;">备注：</text>
				</view>
				<view style="width: 85%;align-items: center;">
					<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #b7b7b7;" >
						{{reciveData.fosterageOrderRemark?reciveData.fosterageOrderRemark:'无'}}
					</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:20upx 30upx;margin-top: 4upx;">
			<view style="width: 100%;height: 50upx;align-items: center;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">申请人信息：</text>
				</view>
			</view>
			<view style="width: 100%;margin: 12upx 0;">
				<view style="width: 20%;justify-content: center;">
					<image :src="decodeURIComponent(reciveData.userAvatar)" mode="aspectFill" style="width: 90upx;height: 90upx;border-radius: 45upx;"></image>
				</view>
				<view style="width: 70%;line-height: 60upx;align-items: center;">
					<text style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{reciveData.userNickname}}
					</text>
				</view>
				<view style="width: 10%;justify-content: flex-end;align-items: center;">
					<image v-if="reciveData.fosterageOrderContact" @click="telphone(reciveData.fosterageOrderContact)"  src="@/static/service/tel.png" style="width: 50upx;height: 50upx;"></image>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 4upx;">
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
					<text>{{reciveData.fosterageOrderNo}}</text>
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
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">完成时间：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.fosterageOrderStatus >4?reciveData.updateTime:'--'}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin: 12upx 0;">
				<view style="width: 25%;">
					<text style="color: #999;">订单状态：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text style="color:#ffbf59;" :class="{greenStyle:reciveData.fosterageOrderStatus >= 5}">{{statusArr[reciveData.fosterageOrderStatus]}}</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 4upx;">
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">养宠日期：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.fosterageOrderStartDate}}</text>
					<text style="margin: 0 10upx;">至</text> 
					<text>{{reciveData.fosterageOrderEndDate}}</text>
					<text style="margin: 0 20upx;">|</text>
					共<text style="font-weight: bold;">{{reciveData.totalDays}}</text>天
				</view>
			</view>
			<view style="width: 100%;margin-top: 12upx;">
				<view style="width: 25%;height: 50upx;align-items: center;">
					<text style="color: #999;">寄养宠物：</text>
				</view>
				<view style="width: 75%;flex-direction: column;">
					<view v-for="(item,index) in reciveData.petList" :key="index" style="width: 100%;height:50upx;line-height: 50upx;align-items: center;">
						<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{item.petNickname}}
						</text>
						<text style="margin: 0 20upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{item.breedName}}
						</text>
						<text style="">
							{{item.petBirthday}}
						</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin-top: 12upx;">
				<view style="width: 25%;">
					<text style="color: #999;">宠物数量：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text>{{reciveData.petList.length}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 50upx;align-items: center;margin: 12upx 0;">
				<view style="width: 25%;">
					<text style="color: #999;">入住家庭：</text>
				</view>
				<view style="width: 75%;align-items: center;">
					<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{reciveData.fosteragePlaceName}}
					</text>
				</view>
			</view>
		</view>
		
		<!-- 订单取消  显示理由 -->
		<view v-if="reciveData.fosterageOrderStatus == 6" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;margin-bottom: 10upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">取消理由</text>
				</view>
			</view>
			<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;color: #888888;" >
				{{reciveData.fosterageOrderCancelReason}}
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
				<text @click="agreePage" style="color: #f76d45;">《宠物寄养协议》</text>
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
		
		<!-- 评价 -->
		<view v-if="reciveData.fosterageOrderStatus == 5" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;">
			<view style="width: 100%;height: 60upx;align-items: center;">
				<text style="font-weight: bold;">评价</text>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;margin: 12upx 0;">
				<view style="width: 60%;height:100%;">
					<image :src="decodeURIComponent(commentData.userAvatar)" mode="aspectFill"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
					<view style="flex-direction: column; margin-left: 10upx;">
						<text style="line-height: 40upx;" >{{commentData.userNickname}}</text>
						<text style="line-height: 40upx;color: #b7b7b7;">{{commentData.commentFriendlyDate}}</text>
					</view>
				</view>
				<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;">
					 <view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
						<view class="example-body">
							<uni-rate :value="commentData.evaluationScore" disabled="false" />
						</view>
					 </view>
				</view>
			</view>
			<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;">
				{{commentData.evaluationContent}}
			</text>
		</view>
		
		<!-- 已经回复 显示回复 -->
		<view v-if="replyShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding: 12upx 30upx 20upx 80upx;margin-top: 2upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;margin: 12upx 0;">
				<image :src="decodeURIComponent(replyData.userAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
				<view style="flex-direction: column; margin-left: 10upx;">
					<text style="line-height: 40upx;" >{{replyData.userNickname}}</text>
					<text style="line-height: 40upx;color: #b7b7b7;">{{replyData.replyFriendlyDate}}</text>
				</view>
			</view>
			<text @click="gotoHuifu_page(item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0;">
				{{replyData.evaluationReplyContent}}
			</text>
		</view>
		
		
		<!-- 去回复 -->
		<view v-if="replyBtn_show" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:0 30upx;margin-top: 10upx;">
			<view style="width: 100%;height: 100upx;align-items: center;justify-content: flex-end;">
				<view @click="goReplyView" style="width: 200upx;height:70upx;background-color: #ffbf59;border-radius: 10upx;align-items: center;justify-content: center;color: #FFFFFF;">
					<text>去回复</text>
				</view>
			</view>
		</view>
		
		<!-- 回复弹窗 -->
		<view v-if="!replyBtn_show && replyViewShow" style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 30upx;margin-top: 10upx;margin-bottom: 10upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 70%;">
					<text style="font-weight: bold;">回复</text>
				</view>
				<view style="width: 30%;align-items: center;justify-content: flex-end;">
					<text @click="reply_cancel" style="margin-right: 30upx;">取消</text>
					<text @click="reply_cancelOrderID" style="color: #f76d45;">保存</text>
				</view>
			</view>
			<textarea  @input="replyInput_onKeyInput" placeholder="请输入理由" :value="reply_text" style="width: 100%;height: 140upx;font-size:12px;color: #888888;line-height: 50upx;"/>
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
				statusArr:["待确认","待送达","","待完成","待评价","已评价","已关闭"],
				send_value:'',
				confirm_text:'确认订单',
				isShow:false,//协议/取消/确认  控制显示
				cancelResonShow:false,//取消理由弹窗
				replyShow:false,//回复显示控制
				replyViewShow:false,//回复弹窗控制
				replyBtn_show:false,//去回复按钮控制
				checkboxIsshow:false,
				replyData:{
					"createTime" :'2020-06-26 00:00:00',		//	创建日期	
					"fosterageEvaluationReplyContent" :'谢谢您对我们的肯定与满意，您的好评是我们做好服务的动力，欢迎再次惠顾！爱你呦^^^',		//	评价回复内容
					"fosterageEvaluationReplyEvaluationId" :'',	//	用户评价ID	
					"fosterageEvaluationReplyId" :'',			//	
					"fosterageEvaluationReplyOrderId" :'',		//	寄养订单ID	
					"fosterageEvaluationReplyUserId" :'',		//	评价回复用户ID	
					"isDeleted" :'0',		//	是否删除 0：未删除，1:已删除
					"updateTime" :'2020-06-30 00:00:00',		//	修改日期
				},
				commentData:{
					"fosterageEvaluationId" :'',	
					"fosterageEvaluationImage" :'',		//寄养评价图片	
					"fosterageEvaluationOrderId":'',	//寄养订单ID	
					"fosterageEvaluationPlaceId":'',	//寄养场所ID	
					"fosterageEvaluationUserId":'',		//评价的用户ID	
					"isDeleted":'',						//是否删除 0：未删除，1:已删除	
					
					"fosterageEvaluationScore":1,		//寄养评分	
					"fosterageEvaluationContent":'店家很负责，很细心，狗儿子被照顾的很好，嘻嘻嘻',	//寄养评价内容	
					"replyCount":0,	//				寄养评价回复数量	
					"fosterageEvaluationReplyId":'',	//寄养评价回复ID	
					
					"createTime":'2020-05-30 00:00:00',	//创建日期	
					"updateTime":'2020-05-31 00:00:0',	//修改日期	
					"userAvatar":'../../../../static/header_default.png',	//用户头像	
					"userNickname":'靓仔 ^*^',  //用户昵称	
				},
				reciveData:{
					"createTime": "2020-05-26 20:05:20",
					"fosterageOrderCancelReason": "临时有事，不出差了，狗儿子我自己带……",
					"fosterageOrderStartDate": "2020-05-26",
					"fosterageOrderEndDate": "2020-05-30",
					"fosterageOrderId": 0,
					"fosterageOrderNo": "8197389129387123891",  //寄养订单编号
					"fosterageOrderPetId": "",   //寄养宠物ID
					"fosterageOrderPlaceId": 0,   //寄养场所ID
					"fosterageOrderRemark": "狗儿子额能吃能喝能睡，能拆家，店家注意观察哦",   //寄养订单备注
					"fosterageOrderStatus": 0,    //订单状态
					"fosterageOrderUserId": 0,    //预约寄养用户ID
					"fosteragePlaceName": "狗不理我喔喔",     //寄养场所名称
					"fosteragePlaceImage":"../../../../static/header_default.png",
					"fosteragePlaceScore":4.6,
					"isDeleted": 0,
					"totalDays": 4,
					"fosteragePlaceAddress":'西安市雁塔区高新路1号',
					"userNickname":"wangdaye",
					"userAvatar":"http://img.tukexw.com/img/940bc77b2c56e115.jpg",
					"petList": [       //	订单关联的宠物相关信息
						{ 
							"petAge": 1,
							"breedName": "金毛",
							"petNickname": "二狗子"
						},
						{ 
							"petAge": 3,
							"breedName": "柴犬",
							"petNickname": "大黄"
						}
					],
					"updateTime": ""
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
			agreePageCallBack(){
				this.checkboxIsshow = true
			},
			//获取 订单详情
			getOrderIdDetails(type){
				let param={
					"fosterageOrderId":this.OrderId
				}
				let str = '/portal/v1/fosterage_order/get/' + this.OrderId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.reciveData = res.data.data
							
							// this.reciveData.fosterageOrderStatus = 3 //测试用
							
							//待评价(- 底部无按钮- 用户做出评价后 显示评价)
							//已评价(- 显示用户的评价- 显示 回复评价 按钮 点击，底部弹框输入)
							//已取消(无按钮)
							if(this.reciveData.fosterageOrderStatus == 4 ||
								this.reciveData.fosterageOrderStatus == 5||
								this.reciveData.fosterageOrderStatus == 6 ){
								this.isShow = false
							}else{
								this.isShow = true
							}
							
							if(this.reciveData.fosterageOrderStatus == 0){
								this.send_value = 1
								this.confirm_text = "确认订单"
							}else if(this.reciveData.fosterageOrderStatus == 1){
								this.send_value = 3
								this.confirm_text = "已送达"
							}else if(this.reciveData.fosterageOrderStatus == 3){
								this.send_value = 4
								this.confirm_text = "已完成"
							}
							// else{
							// 	this.send_value = this.reciveData.fosterageOrderStatus + 1
							// 	this.confirm_text = this.statusArr[this.send_value]
							// }
							
							this.reciveData.fosterageOrderStartDate = this.reciveData.fosterageOrderStartDate.split(" ")[0]
							this.reciveData.fosterageOrderEndDate = this.reciveData.fosterageOrderEndDate.split(" ")[0]
							this.reciveData.totalDays =  this.dateSpace(this.reciveData.fosterageOrderStartDate,this.reciveData.fosterageOrderEndDate)
							
							for(var i=0;i<this.reciveData.petList.length;i++){
								this.reciveData.petList[i].petBirthday =  this.getBirthday(this.reciveData.petList[i].petBirthday)
							}
							
							if(this.reciveData.fosterageOrderStatus == 5){
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
			confirmOrder(){
				if(!this.checkboxIsshow){
					uni.showToast({
						icon: "none",
						title: "请同意寄养协议"
					})
					return;
				}
				//修改订单状态
				let param={ 
					"fosterageOrderId": this.OrderId,
					"fosterageOrderStatus": this.send_value
				}
				let opts={ url:'/portal/v1/fosterage_order/update/status', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//订单详情
							this.getOrderIdDetails()
							
							// if(this.reciveData.fosterageOrderStatus == 1){
							// 	this.reciveData.fosterageOrderStatus = 3
							// 	this.confirm_text = "待完成"
							// }else{
							// 	this.reciveData.fosterageOrderStatus += 1
							// 	this.confirm_text = this.statusArr[this.reciveData.fosterageOrderStatus]
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
					"fosterageOrderCancelReason": this.reson_text,
					"fosterageOrderId": this.OrderId
				}
				let opts={ url:'/portal/v1/fosterage_order/cancel', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// console.log(res.data);
						if(res.data.code == 200){
							this.reciveData.fosterageOrderCancelReason = this.reson_text
							this.reciveData.fosterageOrderStatus = 6
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
			//根据订单ID获取评价详情
			seachOrderID_Comment(){
				let param={ 
					"evaluationOrderId": this.OrderId,
					"evaluationType":0,
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
								this.replyViewShow = true
								this.replyBtn_show = !this.replyBtn_show
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
							this.replyData = res.data.data
							this.replyData.replyFriendlyDate = friendlyDate(new Date(this.replyData.createTime.replace(/\-/g,'/')).getTime(),this.replyData.createTime)
							this.replyShow = true
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
			
			goReplyView(){
				this.replyBtn_show = !this.replyBtn_show
			},
			replyInput_onKeyInput: function(event) {
				this.reply_text = event.target.value
			},
			reply_cancel(){
				this.reply_text =''
				this.replyBtn_show = !this.replyBtn_show
			},
			reply_cancelOrderID(){
				if(this.reply_text == ""){
					uni.showToast({
						icon: "none",
						title: "请输回复内容"
					})
					return;
				}
				
				//添加回复
				let param={ 
					"evaluationReplyContent": this.reply_text,
					"evaluationReplyEvaluationId": this.commentData.evaluationId,
					"evaluationReplyOrderId": this.OrderId,
					"evaluationReplyUserId": this.reciveData.fosterageOrderUserId,
				}
				let opts={ url:'/portal/v1/evaluation_reply/add', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.replyViewShow = false
							//订单详情
							this.getOrderIdDetails()
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
				// console.log("123")
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=4'
				})
				// window.location.href = this.agreement_url
				// window.location.href = "http://www.baidu.com/"
			},
			chat(){
				uni.showToast({
				    title: "前往App",
					icon: 'none',
				    duration: 1000
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
