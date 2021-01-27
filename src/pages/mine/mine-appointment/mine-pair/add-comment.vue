<template>
	<view class="content">
		<view style="width: 100%;flex-direction: column;">
			<view style="width: 100%;padding-bottom:20upx;padding:20upx;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<image :src="decodeURIComponent(reciveData.pairPetImage)" style="width: 160upx;height: 160upx;"></image>
				</view>
				<view style="width: 75%;flex-direction: column;font-weight: bold;">
					<view style="width: 100%;">
						<text style="width: 40%;line-height: 80upx;">
							{{reciveData.publishPetNickname}}
						</text>
					</view>
					<view style="width: 100%;line-height: 80upx;">
						<text style="margin-right: 30upx;">{{reciveData.publishBreedName}}</text>
						<text style="margin-right: 30upx;">{{greden[reciveData.pairPetGender]}}</text>
						<text style="margin-right: 30upx;">{{reciveData.pairPetBirthday}}</text>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 80upx;align-items: center;padding:0 20upx;background-color: #FFFFFF;margin-top: 4upx;">
				<image src="@/static/actionImg/Location_ico.png" style="width: 30upx;height: 36upx;margin-right: 20upx;"></image>
				<view style="width: 75%;">
					<text>{{reciveData.pairAddress}}</text>
				</view>
			</view>
			
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;margin-top: 8upx;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">预约日期：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #999;">
					<text>{{reciveData.pairOrderTime}}</text>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">预约宠物：</text>
				</view>
				<view style="width: 75%;flex-direction: column;color: #999;">
					<view style="height:70upx;line-height: 70upx;">
						<text style="margin-right: 30upx;">{{reciveData.applyPetNickname}}</text>
						<text style="margin-right: 30upx;">{{reciveData.applyBreedName}}</text>
						<text style="margin-right: 30upx;">{{greden[reciveData.applyPetGender]}}</text>
						<text>{{reciveData.applyPetBirthday}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx 0;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注：</text>
				</view>
				<view style="width: 75%;align-items: center;color: #999;">
					<text>{{reciveData.pairOrderRemark}}</text>
				</view>
			</view>
			<view style="width: 100%;align-items: center;padding:12upx 20upx;background-color: #FFFFFF;">
				<view style="width: 25%;">
					<text style="font-weight: bold;">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态：</text>
				</view>
				<view style="width: 75%;align-items: center;color:#FF425D;" :class="{greenStyle:reciveData.pairOrderStatus >= 3}">
					<text style="font-weight: bold;">{{statusArr[reciveData.pairOrderStatus]}}</text>
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
				greden:["弟弟","妹妹","未知"],
				statusArr:["待确认","待完成","","待评价","已评价","已关闭"],
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
			if(this.reson_text == ""){
				uni.showToast({
					icon: "none",
					title: "请输入内容"
				})
				return;
			}
			//添加寄养评价表数据
			let param={ 
				"evaluationContent": this.reson_text,
				"evaluationImage": "",
				"evaluationOrderId": this.OrderId,
				"evaluationPlaceId": this.reciveData.pairOrderTableId,
				"evaluationScore": this.rate,
				"evaluationUserId": this.reciveData.pairOrderUserId,
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
</style>
