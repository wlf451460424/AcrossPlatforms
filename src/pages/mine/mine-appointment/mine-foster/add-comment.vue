<template>
	<view class="content">
		<view style="width: 100%;flex-direction: column;">
			<view style="width: 100%;padding-bottom:20upx;padding:20upx;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<image :src="decodeURIComponent(reciveData.fosteragePlaceImage)" mode="aspectFill" style="width: 130upx;height: 130upx;"></image>
				</view>
				<view style="width: 75%;flex-direction: column;line-height: 60upx;">
					<view style="width: 100%;align-items: center;">
						<text style="font-size: 14px;font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
							{{reciveData.fosteragePlaceName}}
						</text>
						<text style="color: #b7b7b7;margin-left: 20upx;font-size: 20upx;">{{reciveData.fosteragePlaceScore}}分</text>
					</view>
					<view style="width: 100%;padding: 12upx 0;color: #b7b7b7;">
						<text>{{reciveData.fosteragePlaceArea}}m²</text>
						<text style="margin: 0 12upx;"> | </text>
						<text >{{reciveData.fosteragePlaceRoom}}</text>
						<text style="margin: 0 12upx;"> | </text>
						<text >{{reciveData.fosteragePlaceFloor}}楼</text>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 80upx;align-items: center;padding:0 20upx;background-color: #FFFFFF;margin-top: 4upx;">
				<image src="@/static/actionImg/Location_ico.png" style="width: 30upx;height: 36upx;margin-right: 20upx;"></image>
				<view style="width: 75%;">
					<text>{{reciveData.fosteragePlaceAddress}}</text>
				</view>
			</view>
			
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;margin-top: 8upx;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">寄养日期：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #999;">
					<text>{{reciveData.fosterageOrderStartDate}}</text>
					<text style="margin: 0 10upx;">至</text> 
					<text>{{reciveData.fosterageOrderEndDate}}</text>
					<text style="margin: 0 10upx;">|</text>
					共<text style="font-weight: bold;">{{reciveData.totalDays}}</text>天
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">寄养宠物：</text>
				</view>
				<view style="width: 75%;flex-direction: column;color: #999;">
					<view v-for="(item,index) in reciveData.petList" :key="index" >
						<text style="margin-right: 30upx;">{{item.petNickname}}</text>
						<text>{{item.petAge}}岁</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">寄养数量：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #999;">
					<text>{{reciveData.petList.length}}</text>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #999;">
					<text>{{reciveData.fosterageOrderRemark}}</text>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #ffbf59;">
					<text style="font-weight: bold;">{{statusArr[reciveData.fosterageOrderStatus]}}</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;flex-direction: column;background-color: #FFFFFF;padding:12upx 20upx;margin-top: 8upx;">
			<view style="width: 100%;height: 70upx;align-items: center;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">评&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：</text>
				</view>
				<view style="width: 70%;align-items: center;">
					<view class="example-body">
						<uni-rate  :value="0"  @change="onChange"/>
					</view>
				</view>
			</view>
			<textarea @input="uniPopupInput_onKeyInput" placeholder="多个角度评价,可以帮助更多的人" :value="reson_text" style="width: 100%;height:350upx;font-size:24upx;color: #b7b7b7;line-height: 50upx;background-color: #F9F9F9;padding: 12upx;"/>
		</view>
		
		<view style="width: 100%;align-items: center;justify-content: flex-end;padding:12upx 20upx;">
			<checkbox-group @change="checkboxChange" style="width:200upx;">
				<label>
					<checkbox :checked="checkboxIsshow" style="transform:scale(0.8)"/>匿名评价
				</label>
			</checkbox-group>	
		</view>
		
	</view>
</template>

<script>
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
	import uniSection from '@/components/rate/uni-section/uni-section.vue'
	export default {
		components: {
			uniRate,
			uniSection
		},
		data() {
			return {
				statusArr:["已预约","已确认","","已送达","已完成","已评价"],
				reciveData:{},
				OrderId:'',
				reson_text:'',
				rate:'',
				evaluationType:'',////	服务类型 0:寄养 1:配对
				checkboxIsshow:false,
			}
		},
		onNavigationBarButtonTap() {
			if(this.rate == ""){
				uni.showToast({
					icon: "none",
					title: "请打分"
				})
				return;
			}
			// if(this.reson_text == ""){
			// 	uni.showToast({
			// 		icon: "none",
			// 		title: "请输入内容"
			// 	})
			// 	return;
			// }
			//添加寄养评价表数据
			let param={ 
				"evaluationContent": this.reson_text,
				"evaluationImage": "",
				"evaluationOrderId": this.OrderId,
				"evaluationPlaceId": this.reciveData.fosterageOrderPlaceId,
				"evaluationScore": this.rate,
				"evaluationUserId": this.reciveData.fosterageOrderUserId,
				"evaluationType": this.evaluationType,//	服务类型 0:寄养 1:配对
				"evaluationAnonymous":this.checkboxIsshow==true?1:0,
			}
			let opts={ url:'/portal/v1/evaluation/add', method:'POST' }
			//发送请求
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
		},
		async onLoad(e) {
			this.OrderId = e.id
			this.evaluationType = e.type
			//获取 订单详情
			this.getOrderIdDetails()
		},
		methods: {
			checkboxChange: function (e) {
				this.checkboxIsshow = !this.checkboxIsshow
			},
			onChange(value) {
				// console.log('rate发生改变:' + JSON.stringify(value.value))
				this.rate = Number(value.value)
				// console.log(this.rate)
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
							this.reciveData.fosteragePlaceImage = this.reciveData.fosteragePlaceImage.split(",")[0]
							this.reciveData.fosterageOrderStartDate = this.reciveData.fosterageOrderStartDate.split(" ")[0]
							this.reciveData.fosterageOrderEndDate = this.reciveData.fosterageOrderEndDate.split(" ")[0]
							this.reciveData.totalDays =  this.dateSpace(this.reciveData.fosterageOrderStartDate,this.reciveData.fosterageOrderEndDate)
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
			uniPopupInput_onKeyInput: function(event) {
				this.reson_text = event.target.value
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
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}
	
	.uni-checkbox-input:hover {
	    /* border-color: #007aff; */
	}
	
</style>
