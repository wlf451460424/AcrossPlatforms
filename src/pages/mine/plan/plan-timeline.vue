<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view style="width: 100%;height: 140upx;align-items: center;">
				<view style="width: 12%;">
				</view>
				<view style="width: 15%;height: 100%;justify-content: center;align-items: center;flex-direction: column;">
					<image style="width: 120upx;height: 120upx;border-radius: 120upx;" mode="aspectFill"
						:src="decodeURIComponent(petAvatar)"></image>
				</view>
				<view style="width: 73%;height: 140upx;align-items: center;">
					<text style="font-size: 16px;font-weight: bold;padding-left: 40upx;">{{petName}}</text>	
				</view>
			</view>
			<view v-show="!isHaveRecord" style="height: 160upx;align-items: center;padding-left: 10%;">
				<view style="width:100%;line-height:80upx;align-items: center;font-size: 16px;">暂无记录</view>
			</view>
			<view v-for="(item,index) in list" :key="index">
				<!-- 最近计划 -->
				<view style="width: 100%;height: 160upx;align-items: center;" v-if="item.remindPlanStatus==0">
					<view style="width: 12%;height: 100%;align-items: center;justify-content: flex-end;">
						<text style="font-weight: 700;">{{item.remindPlanTime.split("-")[1]}}.{{item.remindPlanTime.split("-")[2]}}</text>
					</view>	
					<view style="width: 15%;height: 100%;align-items: center;flex-direction: column;">
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
						<view style="width: 50upx;height: 50upx;border-radius:50upx;">
							<image style="width: 50upx;height: 50upx;" src="@/static/mine-ico/plan/ongoing.png"></image>
						</view>
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
					</view>
					<view style="width: 73%;height: 120upx;flex-direction: column;border-radius: 6upx;background-color: #63d295;padding: 20upx;justify-content: center;">
						<view style="flex-direction: row;">
							<text style="width: 70%;">
								<!-- {{item.remindPlanTime}} -->
							</text>
							<text v-show="item.remindPlanPhoto===''?false:true  && remindTypeTypeId==5" @click="SeePhoto(item.remindPlanPhoto)" style="width: 30%;color: #AAAAAA;text-align: end;">查看图集</text>
						</view>
						<view v-show="item.difference>0?true:false" style="flex-direction: row;color: #FFFFFF;">
							<view style="width: 80%;">
								<text>距离下次</text><text>{{titleName}}</text>还有
								<text>{{item.difference}}</text>天
							</view>
							<view style="width: 20%;">
								<text>进行中</text>
							</view>
						</view>
						<view v-show="item.difference===0?true:false" style="flex-direction: row;color: #FFFFFF;">
							<view style="width: 80%;">
								<text v-show="remindTypeTypeId==6?false:true">今天要<text>{{titleName}}</text>了</text>
								<text v-show="remindTypeTypeId==6?true:false">今天要打<text>{{titleName}}</text>了</text>
							</view>
							<view style="width: 20%;">
								<text>进行中</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 待确认的计划 -->
				<view @click="gotoPage" style="width: 100%;height: 160upx;align-items: center;" v-if="item.remindPlanStatus==1">
					<view style="width: 12%;height: 100%;align-items: center;justify-content: flex-end;">
						<text style="font-weight: 700;">{{item.remindPlanTime.split("-")[1]}}.{{item.remindPlanTime.split("-")[2]}}</text>
					</view>	
					<view style="width: 15%;height: 100%;align-items: center;flex-direction: column;">
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
						<view style="width: 50upx;height: 50upx;border-radius:50upx;">
							<image style="width: 50upx;height: 50upx;" src="@/static/mine-ico/plan/unconfirmed.png"></image>
						</view>
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
					</view>
					<view style="width: 73%;height: 120upx;flex-direction: column;border-radius: 6upx;background-color: #4c92ea;padding: 20upx;color: #FFFFFF;justify-content: center;">
						<view style="flex-direction: row;">
							<text style="width: 70%;">
								<!-- {{item.remindPlanTime}} -->
							</text>
							<text v-show="item.remindPlanPhoto===''?false:true && remindTypeTypeId==5" @click="SeePhoto(item.remindPlanPhoto)" style="width: 30%;color: #AAAAAA;text-align: end;">查看图集</text>
						</view>
						<view style="flex-direction: row;">
							<view style="width: 80%;">
								<text>{{titleName}}</text>
							</view>
							<view style="width: 20%;">
								<text>待确认</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 未完成的计划 -->
				<view style="width: 100%;height: 160upx;align-items: center;" v-if="item.remindPlanStatus==2">
					<view style="width: 12%;height: 100%;align-items: center;justify-content: flex-end;">
						<text style="font-weight: 700;">{{item.remindPlanTime.split("-")[1]}}.{{item.remindPlanTime.split("-")[2]}}</text>
					</view>	
					<view style="width: 15%;height: 100%;align-items: center;flex-direction: column;">
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
						<view style="width: 50upx;height: 50upx;border-radius:50upx;">
							<image style="width: 50upx;height: 50upx;" src="@/static/mine-ico/plan/unfinish.png"></image>
						</view>
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
					</view>
					<view style="width: 73%;height: 120upx;flex-direction: column;border-radius: 6upx;background-color: #cdd2d8;padding: 20upx;color: #FFFFFF;justify-content: center;">
						<view style="flex-direction: row;">
							<text style="width: 70%;">
								<!-- {{item.remindPlanTime}} -->
							</text>
							<text v-show="item.remindPlanPhoto===''?false:true  && remindTypeTypeId==5" @click="SeePhoto(item.remindPlanPhoto)" style="width: 30%;color: #AAAAAA;text-align: end;">查看图集</text>
						</view>
						<view style="flex-direction: row;">
							<view style="width: 80%;">
								<text>{{titleName}}</text>
							</view>
							<view style="width: 20%;">
								<text>未完成</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 已完成的计划 -->
				<view style="width: 100%;height: 160upx;align-items: center;" v-if="item.remindPlanStatus==3">
					<view style="width: 12%;height: 100%;align-items: center;justify-content: flex-end;">
						<text style="font-weight: 700;">{{item.remindPlanTime.split("-")[1]}}.{{item.remindPlanTime.split("-")[2]}}</text>
					</view>	
					<view style="width: 15%;height: 100%;align-items: center;flex-direction: column;">
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
						<view style="width: 50upx;height: 50upx;border-radius:50upx;">
							<image style="width: 50upx;height: 50upx;" src="@/static/mine-ico/plan/finish.png"></image>
						</view>
						<view style="width: 20upx;height: 66upx;background-color: #DFE4E8;"></view>
					</view>
					<view style="width: 73%;height: 120upx;flex-direction: column;border-radius: 6upx;background-color: #F9F9F9;padding: 20upx;color: #121212;justify-content: center;">
						<view style="flex-direction: row;">
							<text style="width: 70%;">
								<!-- {{item.remindPlanTime}} -->
							</text>
							<text v-show="item.remindPlanPhoto===''?false:true  && remindTypeTypeId==5" @click="SeePhoto(item.remindPlanPhoto)" style="width: 30%;color: #AAAAAA;text-align: end;">查看图集</text>
						</view>
						<view style="flex-direction: row;">
							<view style="width: 80%;">
								<text>{{titleName}}</text>
							</view>
							<view style="width: 20%;">
								<text>已完成</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				petAvatar:'',
				petAvatar_default:"../../../static/pet_header_default.png",
				petName:'',
				list:[],
				titleName:'',
				listNow:[],
				listUnconfirmed:[],
				listUnfinish:[],
				listFinish:[],
				isHaveRecord:false,
				remindTypeTypeId:''
			}
		},
		async onLoad(e) {
			// 根据宠物ID查询宠物信息
			this.getPetDetails(e.ids.split("_")[0])
			
			// console.log(e.ids)
			this.titleName = e.ids.split("_")[2]
			uni.setNavigationBarTitle({
				title: this.titleName+ "记录"
			})
			this.remindTypeTypeId = e.ids.split("_")[3]
			//获取计划记录列表  参数：宠物id  类型id
			let param={remindPlanPetId:e.ids.split("_")[0],remindPlanTypeId:e.ids.split("_")[1]}
			let opts={ url:'/portal/v1/remind_plan/page/list', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						// console.log(res.data);
						this.list = res.data.data.records
						let arr = res.data.data.records
						for(var i=0;i<arr.length;i++){
							//0：进行中/1：待确认/2: 未完成/3：已完成
							if(arr[i].remindPlanStatus === 0 && arr[i].difference >= 0){
								this.listNow.push(arr[i])
							}
							if(arr[i].remindPlanStatus === 1){
								this.listUnconfirmed.push(arr[i])
							}
							if(arr[i].remindPlanStatus === 2){
								this.listUnfinish.push(arr[i])
							}
							if(arr[i].remindPlanStatus === 3){
								this.listFinish.push(arr[i])
							}
						}
						if(arr.length>0){
							this.isHaveRecord = true
						}else{
							this.isHaveRecord = false
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
		methods: {
			// 根据宠物ID查询宠物信息
			getPetDetails(id){
				let param={"petId":id} ;
				let str = '/portal/v1/pet/get/' + id;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petAvatar = res.data.data.petAvatar;
							this.petName = res.data.data.petNickname;
						}
					}
				)
			},
			SeePhoto(PhotoString){
				uni.navigateTo({
					url:"/pages/component/plan-pic-details?imgArr=" + PhotoString
				})
			},
			gotoPage(){
				uni.setStorageSync("into-pet-plan-type","1")
				uni.navigateTo({
					url:"/pages/mine/msg/msg-pet-plan?type=1"
				})
			}
		}
	}
</script>

<style lang='scss' scoped> 
page,
view {
	display: flex;
}

page {
	display: flex;
	min-height: 100%;
	background-color: #FFFFFF;
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
	padding: 20upx 40upx 20upx 20upx;
	border-top: 1px solid #F9F9F9;
}
.timeStyle{
	color: #b7b7b7;
}
.criclyStyle{
	width:20px;
	height:20px;
	border:2px solid #000;
	border-radius:50%;
	box-shadow:0px 0px 10px red;
}
</style>
