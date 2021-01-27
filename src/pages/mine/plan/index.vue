<template>
	<view class="content">
		<view style="padding:0 20upx;background-color: #FFFFFF;" >
			<view style="width: 20%;height: 180upx;align-items: center;text-align: center;">
				<image @click="lookBigPic" :src="petData.petAvatar?decodeURIComponent(petData.petAvatar):petAvatar_default" mode="aspectFill" style="width: 120upx;height: 120upx; border-radius: 120upx;"></image>
			</view>
			<view style="flex-direction: column;color: #B7B7B7;width: 80%; height: 180upx;justify-content: center;">
				<view style="width: 100%;height: 70upx; align-items: center;">
					<text style="font-size: 32upx;color: #000000;max-width: calc(100% - 100upx);line-height:70upx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
						{{petData.petNickname}}
					</text>
					<view style="width: 70upx;justify-content: flex-end;">
						<image src="@/static/mine-ico/bianji.png" style="width:30upx;height:30upx;margin-left: 12upx;" @click="edit_PetArchives"></image>
					</view>
				</view>
				<view style="width: 100%;height: 70upx;align-items: center;">
					<view style="width: 60%;font-size: 24upx;">
						<text>{{petData.breedName}}</text>
						<text v-if="petData.petGender<2" style="margin-left: 12upx;">
							{{petGender_array[petData.petGender]}}
						</text>
						<text v-if="petData.petBirthday" style="margin-left: 12upx;">
							{{petData.petAge}}
						</text>
					</view>
					<view @click="look_PetArchives" style="width:40%;justify-content: flex-end;align-items: center;">
						<text style="padding-right: 12upx;font-size: 24upx;">查看宠物详情</text>
						<image style="margin-right: 12upx;width: 16upx;height: 26upx;"  src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="list_period.length>0" style="width: 100%;flex-direction: column;">
			<view style="flex-direction: row;padding: 0 20upx;width: 100%;height: 90upx;background-color: #FFFFFF;margin-top: 8upx;">
				<text class="list-text" style="line-height: 90upx;font-size: 32upx;">周期记录</text>
			</view>
			<view style="flex-direction: row;padding: 0 20upx;width: 100%;height: 80upx;align-items: center;background-color: #FFFFFF;margin-top: 2upx;"
				@click="gotopage(item.remindTypeTypeId,item)" v-for="(item,index) in list_period" :key="index">
				<image  style="top: 0;width: 50upx;height: 50upx;margin-right: 20upx;"  :src="planArr[index]">
				<text class="list-text" >{{item.remindTypeName}}</text>
				<text  class="list-text_right" style="color: #f76d45;padding-right: 20upx;font-size: 24upx;">{{item.lastTime}}</text>
				<image  style="top: 0;width: 16upx;height: 26upx;"  src="@/static/mine-ico/next.png">
			</view>
		</view>	
		<view v-if="list_Health.length>0" style="width: 100%;flex-direction: column;">
			<view style="flex-direction: row;padding: 0 20upx;width: 100%;height: 90upx;background-color: #FFFFFF;margin-top: 8upx;">
				<text class="list-text" style="line-height: 90upx;font-size: 32upx;">健康记录</text>
			</view>
			<view style="flex-direction: row;padding: 0 20upx;width: 100%;height: 90upx;align-items: center;background-color: #FFFFFF;margin-top: 2upx;"
				@click="gotopage(item.remindTypeTypeId,item)" v-for="(item,index) in list_Health" :key="index">
				<image  style="top: 0;width: 50upx;height: 50upx;margin-right: 20upx;"  :src="planArr[index+6]">
				<text class="list-text">{{item.remindTypeName}}</text>
				<text  class="list-text_right" style="color: #f76d45;padding-right: 20upx;font-size: 24upx;">{{item.lastTime}}</text>
				<image class="navigat-arrow" style="top: 0;width:16upx;height: 26upx;" src="@/static/mine-ico/next.png">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				petGender_array: ['弟弟','妹妹','未知'],
				petAvatar_default:"../../../static/pet_header_default.png",
				petId:'',
				list_period:[
					// {remindTypeId:'001',remindTypeName:'洗澡',		createTime:'2020-01-01',data:'A1'},
					// {remindTypeId:'002',remindTypeName:'指甲',		createTime:'2020-01-01',data:'A2'},
					// {remindTypeId:'003',remindTypeName:'驱虫(外)',	createTime:'2020-01-01',data:'A3'},
					// {remindTypeId:'004',remindTypeName:'驱虫(内)',	createTime:'2020-01-01',data:'A4'},
					// {remindTypeId:'005',remindTypeName:'剃毛',		createTime:'2020-01-01',data:'A5'},
					// {remindTypeId:'006',remindTypeName:'美容',		createTime:'2020-01-01',data:'A6'},
				],
				list_Health:[
					// {remindTypeId:'001',remindTypeName:'体检',		createTime:'2020-01-01',data:'A1'},
					// {remindTypeId:'002',remindTypeName:'疫苗',		createTime:'2020-01-01',data:'A2'},
				],
				
				planArr:[
					"../../../static/mine-ico/plan/xizao.png",
					"../../../static/mine-ico/plan/zhijia.png",
					"../../../static/mine-ico/plan/quchong_n.png",
					"../../../static/mine-ico/plan/quchong_w.png",
					"../../../static/mine-ico/plan/timao.png",
					"../../../static/mine-ico/plan/meirong.png",
					"../../../static/mine-ico/plan/yimiao.png",
					"../../../static/mine-ico/plan/kuangquan.png",
					"../../../static/mine-ico/plan/tijian.png",
				],
				
				petData:{
					"breedAvatar": "",
					"breedId": "",
					"breedKindId": "",
					"breedName": "",
					"createTime": "",
					"isDeleted": 0,
					"petAdoptionNumber": "",
					"petAge": 0,
					"petAvatar": "",
					"petBirthday": "",
					"petBreedId": "0",
					"petGender": 1,
					"petHomeTime": "",
					"petId": "",
					"petNickname": "",
					"petProfileImage": "",
					"petRemark": "",
					"petSterilizationStatus": 0,
					"petUserId": "",
					"petWeight": '',
					"updateTime": "",
					"userAvatar": "",
					"userNickname": "",
				},
			};
		},
		async onLoad(e) {
			if(e.nowPetID){
				this.petId = e.nowPetID
				// 根据宠物ID查询宠物信息
				this.getPetDetails()
				//获取提醒类型列表
				this.getPetPlan()
			}
		},
		onShow() {
			// 根据宠物ID查询宠物信息
			this.getPetDetails()
			//获取提醒类型列表
			this.getPetPlan()
		},
		methods: {
			// 根据宠物ID查询宠物信息
			getPetDetails(){
				let param={"petId":this.petId} ;
				let str = '/portal/v1/pet/get/' + this.petId;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petData = res.data.data;
							this.petData.petAge = this.getDaysBetween(res.data.data.petBirthday)
							uni.setNavigationBarTitle({
								title:this.petData.petNickname + '的计划'
							})
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
			//获取提醒类型列表
			getPetPlan(){
				let param={petId:this.petId}
				let opts={ url:'/portal/v1/remind_type/list_pet_id', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							// console.log(res.data);
							this.list_period =[]
							this.list_Health =[]
							let arr = res.data.data;
							for(var i=0;i<arr.length;i++){
								if(arr[i].remindTypeCategory === 0){
									arr[i].lastTime = arr[i].lastTime.split(" ")[0]
									arr[i].lastTime = this.getDate(arr[i].lastTime);
									this.list_period.push(arr[i])
								}else{
									arr[i].lastTime = arr[i].lastTime.split(" ")[0]
									arr[i].lastTime = this.getDate(arr[i].lastTime);
									this.list_Health.push(arr[i])
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
				);
			},
			edit_PetArchives(){
				uni.navigateTo({
					url:"../pet/pet-info-edit?petData=" + encodeURIComponent(JSON.stringify(this.petData))
				})
			},
			look_PetArchives(){
				uni.navigateTo({
					url:'../pet/index?id=' + this.petData.petId + '&name=' + this.petData.petNickname
				})
			},
			lookBigPic(){
				console.log("123")
				// debugger
				// if(this.petData.petAvatar){
					uni.navigateTo({
						url:"/pages/discover/post-details/header-image?imgArr=" + this.petData.petAvatar
					})
				// }
			},
			trackEvent(item){
				if(item){
					// #ifdef MP-WEIXIN
					wx.uma.trackEvent(this.calculation.umeng_event_plan_total,{'sweetPetsId':item.remindTypeId,'sweetPetsName':item.remindTypeName,'triggerCounter':1});
					// #endif
					// #ifdef MP-QQ
					qq.uma.trackEvent(this.calculation.umeng_event_plan_total,{'sweetPetsId':item.remindTypeId,'sweetPetsName':item.remindTypeName,'triggerCounter':1});
					// #endif
					// #ifdef MP-TOUTIAO
					tt.uma.trackEvent(this.calculation.umeng_event_plan_total,{'sweetPetsId':item.remindTypeId,'sweetPetsName':item.remindTypeName,'triggerCounter':1});
					// #endif
					// #ifdef MP-BAIDU
					swan.uma.trackEvent(this.calculation.umeng_event_plan_total,{'sweetPetsId':item.remindTypeId,'sweetPetsName':item.remindTypeName,'triggerCounter':1});
					// #endif
				}
			},
			gotopage(index,item){
				item.petId = this.petId;
				switch (index) {  //0：洗澡:1：指甲/2：驱虫(外)/3：剃毛/4：美容/5：体检/6：疫苗/7:驱虫(内)/8:狂犬
					case 0:
					case 1:
					case 3:
					case 4:
					case 5:
					case 8:
						this.trackEvent(item)
						//洗澡，指甲，剃毛，美容，体检，狂犬
						uni.navigateTo({
							url:"plan-edit?planData=" + escape(JSON.stringify(item))
						})
						break
					case 2:
					case 7:
						this.trackEvent(item)
						//驱虫(外)，驱虫(内)
						uni.navigateTo({
							url:"plan-parasite-edit?planData=" + encodeURIComponent(JSON.stringify(item))
						})
						break
					case 6:
						this.trackEvent(item)
						//疫苗
						uni.navigateTo({
							url:"plan-vaccine-edit?planData=" + encodeURIComponent(JSON.stringify(item))
						})
						break
				}
			},
			getDate(dateString1){
				if(dateString1){
					var  startDate = Date.parse(dateString1);
					var myDate = new Date();
					myDate = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)+'-'+myDate.getDate()
					var  endDate = Date.parse(myDate);
					var days=(startDate - endDate)
					days = Math.abs(days);
					days = days / (24 * 3600 * 1000);
					var str = '';
					if(2<=days){
						days = parseInt(days)
						str = days + '天后'
					}
					else{  // days<2
						if(1<=days){
							str = '明天'
						}else{ //days<1
							if(days=>0){
								str = '今天'
							}else{
								str = ''
							}
						}
					}
					return str
				}else{
					return ''
				}
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
		}
	}
</script>

<style lang="scss" scoped>
page,
view {
	display: flex;
}
page {
	min-height: 100%;
	background-color: #f9f9f9;
}
template {
	display: flex;
	flex: 1;
}
.content {
	flex-direction: column;
	width: 100%;
	color: #5c5f66;
	font-size: 14px;
	margin-top: 2upx;
}
</style>
