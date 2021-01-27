<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>计划时间：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" @click="plan_uniCalendar">
					<input style="width: 100%;font-size: 12px;color: #5c5f66;"  :value="remindPlanTime" placeholder="请选择时间" />
					<image style="width: 16upx;height: 28upx;" src="../../../static/mine-ico/next.png">
				</view>
			</view>
			<view v-show="periodISshow" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>计划周期：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" >
					<picker @change="zhouqiPickevrChange" :value="remindPlanPeriod" :range="array_zhouqi" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 12px;color: #5c5f66;padding: 0;">{{array_zhouqi[remindPlanPeriod]}}天</view>
							<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
						</view>
					</picker>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>提醒计划：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" >
					<picker @change="planPickevrChange" :value="remindPlanInAdvance" :range="array_plan" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 12px;color: #5c5f66;padding: 0;">{{array_plan[remindPlanInAdvance]}}</view>
							<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
						</view>
					</picker>
				</view>
			</view>
			<view @click="gotoHistoryRecords" style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>历史记录：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" >
					<view style="width: 100%;justify-content: flex-end;">
						<image style="width: 16upx;height: 26upx;" src="../../../static/mine-ico/next.png">
					</view>
				</view>
			</view>
			
			
			<view v-show="remarkISshow" style="flex-direction: column;width: 100%;background-color: #FFFFFF;padding: 20upx;margin-top: 8upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:40%;height: 2upx; background-color: #e6e6e6;"></view>
					<view style="width: 20%;justify-content: center;">注意事项</view>
					<view style="width: 40%;height: 2upx; background-color: #e6e6e6;"></view>
				</view>
				<!-- <rich-text :nodes="remindTypeRemark"></rich-text> -->
				<u-parse :content="remindTypeRemark" style="color:#b7b7b7 !important;font-size: 24upx !important;"></u-parse>
			</view>
			
			<view style="width: 100%;justify-content: center;align-items: center;color: #FFFFFF;padding:40upx;">
				<view v-if="add_OR_modify" @click="uniPopup_open('del')" style="min-width: 48%;height: 90upx;border-radius: 10upx;background-color: #ffbf59;justify-content: center;align-items: center;">
					<text>删除当前计划</text>
				</view>
				<view v-if="add_OR_modify" style="width: 4%;"></view>
				<view v-if="add_OR_modify" @click="save" style="width: 48%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</text>
				</view>
				
				<view v-if="!add_OR_modify" @click="save" style="width: 100%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</text>
				</view>
			</view>
		</view>
		
		<uni-calendar ref="time_calendar" :insert="false" :startDate="rangeStartTime" :showMonth="true" @confirm="time_confirm" ></uni-calendar>
		
		<uniPopup ref="del_uniPopup" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-content" >是否删除当前计划</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" style="color: #f76d45;" @click="cancel('del')">取消</text>
					<text class="uni-tip-button" style="color: #f76d45;" @click="confirm('del')">删除</text>
				</view>
			</view>
		</uniPopup>
		<uniPopup ref="save_uniPopup" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-content" >是否保存修改内容</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" style="color: #f76d45;" @click="cancel('save')">取消</text>
					<text class="uni-tip-button" style="color: #f76d45;" @click="confirm('save')">保存</text>
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				//计划数据
				planData:Object,
				//计划时间
				remindPlanTime:'',
				//周期
				remindPlanPeriod:0,
				array_zhouqi: ["30","60","180","365"],
				//提醒
				remindPlanInAdvance:1,
				array_plan: ["不提醒","提前一天","提前两天","提前三天"],
				//类型的注意事项
				remindTypeRemark:'',
				//注意事项是否显示
				remarkISshow:false,
				
				//类型列表id   8：狂犬
				remindTypeTypeId:'',
				periodISshow:true,
				
				//计划id
				remindPlanId:'',
				//注意事项是否显示  0:add   1:modify
				add_OR_modify:0,
				
				//时间选择范围  开始时间
				rangeStartTime:'',
				
				isCompleted:true,
			}
		},
		async onLoad(e) {
			this.rangeStartTime = this.getDate('');
			if(e.planData){
				// console.log(e.planData)
				this.planData = JSON.parse(unescape(e.planData));
				// console.log(this.planData)
				this.remindTypeRemark = this.planData.remindTypeRemark
				if(this.remindTypeRemark != "")this.remarkISshow = true
				uni.setNavigationBarTitle({
					title:this.planData.remindTypeName
				})
				this.remindTypeTypeId = this.planData.remindTypeTypeId
				if(this.remindTypeTypeId === 8)this.periodISshow = false //狂犬8
				//查询计划详情
				//获取当前正在执行的计划  参数：宠物id  类型id
				let param={remindPlanPetId:this.planData.petId,remindPlanTypeId:this.planData.remindTypeId}
				let opts={ url:'/portal/v1/remind_plan/find_remind_plan', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							// console.log(res.data);
							if(res.data.data.remindPlans.length){
								this.add_OR_modify = 1;
								this.remindPlanTime = res.data.data.remindPlans[0].remindPlanTime
								this.remindPlanPeriod = this.array_zhouqi.indexOf(res.data.data.remindPlans[0].remindPlanPeriod.toString())
								this.remindPlanInAdvance = res.data.data.remindPlans[0].remindPlanInAdvance
								//保存计划id
								this.remindPlanId = res.data.data.remindPlans[0].remindPlanId
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
			}
		},
		onShow() {
			this.remindTypeRemark = this.planData.remindTypeRemark
			if(this.remindTypeRemark != "")this.remarkISshow = true
			uni.setNavigationBarTitle({
				title:this.planData.remindTypeName
			})
			//查询计划详情
			//获取当前正在执行的计划  参数：宠物id  类型id
			let param={remindPlanPetId:this.planData.petId,remindPlanTypeId:this.planData.remindTypeId}
			let opts={ url:'/portal/v1/remind_plan/find_remind_plan', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						// console.log(res.data);
						if(res.data.data.remindPlans.length){
							this.add_OR_modify = 1;
							this.remindPlanTime = res.data.data.remindPlans[0].remindPlanTime
							this.remindPlanPeriod = this.array_zhouqi.indexOf(res.data.data.remindPlans[0].remindPlanPeriod.toString())
							this.remindPlanInAdvance = res.data.data.remindPlans[0].remindPlanInAdvance
							//保存计划id
							this.remindPlanId = res.data.data.remindPlans[0].remindPlanId
						}else{
							this.add_OR_modify = 0;
							this.remindPlanTime = ""
							this.remindPlanPeriod = 0
							this.remindPlanInAdvance = 1
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
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			zhouqiPickevrChange: function(e) {
				this.remindPlanPeriod = e.target.value
			},
			planPickevrChange: function(e) {
				this.remindPlanInAdvance = e.target.value
			},
			plan_uniCalendar(){
				this.$refs.time_calendar.open();
			},
			time_confirm(e) {
				this.remindPlanTime = e.fulldate;
			},
			uniPopup_open(type){
				this.$refs[type+'_uniPopup'].open()
			},
			cancel(type){
				this.$refs[type+'_uniPopup'].close()
				switch (type) {
					case 'del':
						//删除取消按钮事件   只关闭提示框
						break
				}
			},
			confirm(type){
				this.$refs[type+'_uniPopup'].close()
				switch (type) {
					case 'del':
						//删除当前计划  返回记录页
						//此处调用删除接口
						//删除计划
						let param={ids:this.remindPlanId}
						let opts={ url:'/portal/v1/remind_plan/remove', method:'POST' }
						// 发送请求
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									// console.log(res.data);
									let obj = this.planData.petId + "_" + this.planData.remindTypeId + "_" + this.planData.remindTypeName + "_" + this.planData.remindTypeTypeId
									uni.navigateTo({
										url:"plan-timeline?ids=" + obj
									})
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1000
									});	
								}
							}
						);
						break
				}
			},
			save(){
				if(!this.isCompleted){
					return;
				}
				if(!this.remindPlanTime){
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				this.isCompleted = !this.isCompleted
				
				//1.此处调用保存接口
				//2.保存当前计划  返回记录页
				if(this.add_OR_modify){//修改
					//修改计划
					// let param;
					let obj={
						remindPlanInAdvance: this.remindPlanInAdvance,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: this.array_zhouqi[this.remindPlanPeriod],//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.remindPlanTime,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
						remindPlanId:this.remindPlanId,//计划id
					}
					let list=[obj];
					let param={
						params:list
					}
					let opts={ url:'/portal/v1/remind_plan/update', method:'POST' }
					// 发送请求
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								// console.log(res.data);
								let obj = this.planData.petId + "_" + this.planData.remindTypeId + "_" + this.planData.remindTypeName + "_" + this.planData.remindTypeTypeId
								// uni.navigateTo({
								// 	url:"plan-timeline?ids=" + obj
								// })
								uni.navigateTo({
									url:"index?nowPetID=" + this.planData.petId,
								})
							}else{
									uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});			
							}
							this.isCompleted = !this.isCompleted
						}
					);
				}else{//添加
					//添加计划
					let obj={
						remindPlanInAdvance: this.remindPlanInAdvance,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: this.array_zhouqi[this.remindPlanPeriod],//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.remindPlanTime,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
					}
					let list=[obj];
					let param={
						params:list
					}
					let opts={ url:'/portal/v1/remind_plan/add', method:'POST' }
					// 发送请求
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								// console.log(res.data);
								let obj = this.planData.petId + "_" + this.planData.remindTypeId + "_" + this.planData.remindTypeName + "_" + this.planData.remindTypeTypeId
								// uni.navigateTo({
								// 	url:"plan-timeline?ids=" + obj
								// })
								uni.navigateTo({
									url:"index?nowPetID=" + this.planData.petId,
								})
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
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 日期选中
			selectDateFun(e) {
				// console.log('选择日期：', e);
				this.remindPlanTime = e;
			},
			gotoHistoryRecords() {
				let obj = this.planData.petId + "_" + this.planData.remindTypeId + "_" + this.planData.remindTypeName + "_" + this.planData.remindTypeTypeId
				uni.navigateTo({
					url:"plan-timeline?ids=" + obj
				})
			}
		},
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
	display: flex;
	flex-direction: column;
	color: #5c5f66;
	font-size: 14px;
	width: 100%;
}
</style>
