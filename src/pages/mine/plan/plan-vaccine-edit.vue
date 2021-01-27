<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 25%;height: 100%;align-items: center;">
					<text>第&nbsp;一&nbsp;针：</text>
				</view>
				<view style="width: 50%;height: 100%;align-items: center;" @click="open_uniCalendar(1)">
					<input style="width: 100%;font-size: 12px;" disabled="disabled"  :value="Time_1" placeholder="选择接种时间" />
				</view>
				<view style="width:25%;height: 100%;align-items: center;justify-content: flex-end;" >
					<picker @change="PickevrChange_1" :value="remindPlanInAdvance_1" :range="array_plan">
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 12px;color: #5c5f66;padding: 0;">{{array_plan[remindPlanInAdvance_1]}}</view>
						</view>
					</picker>
				</view>
				<view style="width: 20upx;"></view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 25%;height: 100%;align-items: center;">
					<text>第&nbsp;二&nbsp;针：</text>
				</view>
				<view style="width: 50%;height: 100%;align-items: center;" @click="open_uniCalendar(2)">
					<input style="width: 100%;font-size: 12px;" disabled="disabled" :value="Time_2" placeholder="与上针间隔21天" />
				</view>
				<view style="width:25%;height: 100%;align-items: center;justify-content: flex-end;" >
					<picker @change="PickevrChange_2" :value="remindPlanInAdvance_2" :range="array_plan" >
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 12px;color: #5c5f66;padding: 0;">{{array_plan[remindPlanInAdvance_2]}}</view>
						</view>
					</picker>
				</view>
				<view style="width: 20upx;"></view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 90upx;margin-top: 2upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 25%;height: 100%;align-items: center;">
					<text>第&nbsp;三&nbsp;针：</text>
				</view>
				<view style="width: 50%;height: 100%;align-items: center;" @click="open_uniCalendar(3)">
					<input style="width: 100%;font-size: 12px;" disabled="disabled" :value="Time_3" placeholder="与上针间隔21天" />
				</view>
				<view style="width:25%;height: 100%;align-items: center;justify-content: flex-end;" >
					<picker @change="PickevrChange_3" :value="remindPlanInAdvance_3" :range="array_plan" >
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 12px;color: #5c5f66;padding: 0;">{{array_plan[remindPlanInAdvance_3]}}</view>
						</view>
					</picker>
				</view>
				<view style="width: 20upx;"></view>
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
		
		<uni-calendar ref="calendar_1" :insert="false" :startDate="rangeStartTime_1" :endDate="rangeEndTime_1" :showMonth="true" @confirm="time_confirm_1" ></uni-calendar>
		<uni-calendar ref="calendar_2" :insert="false" :startDate="rangeStartTime_2" :endDate="rangeEndTime_2" :showMonth="true" @confirm="time_confirm_2" ></uni-calendar>
		<uni-calendar ref="calendar_3" :insert="false" :startDate="rangeStartTime_3" :endDate="rangeEndTime_3" :showMonth="true" @confirm="time_confirm_3" ></uni-calendar>
		
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
				//时间
				Time_1:'',
				Time_2:'',
				Time_3:'',
				//提醒
				remindPlanInAdvance_1:0,
				remindPlanInAdvance_2:0,
				remindPlanInAdvance_3:0,
				array_plan: ["不提醒","提前一天","提前两天","提前三天"],
				
				//类型的注意事项
				remindTypeRemark:'',
				//注意事项是否显示
				remarkISshow:false,
				
				//后台配置默认间隔周期
				kindPeriodDefault:'',
				
				//计划id
				remindPlanId_1:'',
				remindPlanId_2:'',
				remindPlanId_3:'',
				//添加或者修改  0:add   1:modify
				add_OR_modify:0,
				
				//是否可选择时间
				isSelect_1:false,
				isSelect_2:false,
				isSelect_3:false,
				//时间选择范围  开始时间
				rangeStartTime_1:'',
				rangeStartTime_2:'',
				rangeStartTime_3:'',
				rangeEndTime_1:'',
				rangeEndTime_2:'',
				rangeEndTime_3:'',
			}
		},
		async onLoad(e) {
			if(e.planData){
				this.planData = JSON.parse(decodeURIComponent(e.planData));
				// console.log(this.planData)
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
							this.kindPeriodDefault = res.data.data.kindPeriod.kindPeriodDefault
							if(res.data.data.remindPlans.length){//修改
								this.add_OR_modify = 1;
								this.isSelect_1 = true;
								this.isSelect_2 = true;
								this.isSelect_3 = true;
								//保存计划id
								this.remindPlanId_1 = res.data.data.remindPlans[0].remindPlanId
								this.remindPlanId_2 = res.data.data.remindPlans[1].remindPlanId
								this.remindPlanId_3 = res.data.data.remindPlans[2].remindPlanId
								// 时间
								this.Time_1 = res.data.data.remindPlans[0].remindPlanTime
								this.Time_2 = res.data.data.remindPlans[1].remindPlanTime
								this.Time_3 = res.data.data.remindPlans[2].remindPlanTime
								// 提醒
								this.remindPlanInAdvance_1 = res.data.data.remindPlans[0].remindPlanInAdvance
								this.remindPlanInAdvance_2 = res.data.data.remindPlans[1].remindPlanInAdvance
								this.remindPlanInAdvance_3 = res.data.data.remindPlans[2].remindPlanInAdvance
							}else{//添加
								this.add_OR_modify = 0;
								this.isSelect_1 = true;
								this.isSelect_2 = false;
								this.isSelect_3 = false;
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
						this.kindPeriodDefault = res.data.data.kindPeriod.kindPeriodDefault
						if(res.data.data.remindPlans.length){//修改
							this.add_OR_modify = 1;
							this.isSelect_1 = true;
							this.isSelect_2 = true;
							this.isSelect_3 = true;
							//保存计划id
							this.remindPlanId_1 = res.data.data.remindPlans[0].remindPlanId
							this.remindPlanId_2 = res.data.data.remindPlans[1].remindPlanId
							this.remindPlanId_3 = res.data.data.remindPlans[2].remindPlanId
							// 时间
							this.Time_1 = res.data.data.remindPlans[0].remindPlanTime
							this.Time_2 = res.data.data.remindPlans[1].remindPlanTime
							this.Time_3 = res.data.data.remindPlans[2].remindPlanTime
							// 提醒
							this.remindPlanInAdvance_1 = res.data.data.remindPlans[0].remindPlanInAdvance
							this.remindPlanInAdvance_2 = res.data.data.remindPlans[1].remindPlanInAdvance
							this.remindPlanInAdvance_3 = res.data.data.remindPlans[2].remindPlanInAdvance
						}else{//添加
							this.add_OR_modify = 0;
							this.isSelect_1 = true;
							this.isSelect_2 = false;
							this.isSelect_3 = false;
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
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			open_uniCalendar(index){
				switch (index) {
					case 1:
						if(!this.isSelect_1) return;
						break
					case 2:
						if(!this.isSelect_2)
						{
							uni.showToast({
								icon: "none",
								title: "请先填写上一针次时间"
							})
							return;
						}
						break
					case 3:
						if(!this.isSelect_3)
						{
							uni.showToast({
								icon: "none",
								title: "请先填写上一针次时间"
							})
							return;
						}
						break
				}
				this.$refs["calendar_" + index].open();
			},
			time_confirm_1(e) {
				this.Time_1 = e.fulldate;
				this.isSelect_2 = true;
				this.isSelect_3 = true;
				// 根据第一针 初始化第二三针的时间
				this.Time_2 = this.newDate(this.Time_1,this.kindPeriodDefault)
				this.Time_3 = this.newDate(this.Time_2,this.kindPeriodDefault)
				this.rangeStartTime_2 = this.Time_1;
				this.rangeEndTime_2 = this.newDate(this.Time_1,364)
				this.rangeStartTime_3 = this.Time_2;
				this.rangeEndTime_3 = this.newDate(this.Time_1,365)
			},
			time_confirm_2(e) {
				if(e.fulldate <= this.Time_1){
					uni.showToast({
						icon: "none",
						title: "时间不可早于上一针时间"
					})
					return;
				}
				this.Time_2 = e.fulldate;
				this.Time_3 = this.newDate(this.Time_2,this.kindPeriodDefault)
				this.rangeStartTime_3 = this.Time_2;
				this.rangeEndTime_3 = this.newDate(this.Time_1,365)
			},
			time_confirm_3(e) {
				if(e.fulldate <= this.Time_2){
					uni.showToast({
						icon: "none",
						title: "时间不可早于上一针时间"
					})
					return;
				}
				this.Time_3 = e.fulldate;
			},
			PickevrChange_1: function(e) {
				this.remindPlanInAdvance_1 = e.target.value
			},
			PickevrChange_2: function(e) {
				this.remindPlanInAdvance_2 = e.target.value
			},
			PickevrChange_3: function(e) {
				this.remindPlanInAdvance_3 = e.target.value
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
						// debugger
						let str = this.remindPlanId_1 +','+ this.remindPlanId_2 +','+ this.remindPlanId_3
						let param={ids:str}
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
				if(!this.Time_1){
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				//1.此处调用保存接口
				//2.保存当前计划  返回记录页
				if(this.add_OR_modify){//修改
					//修改计划
					// let param;
					let obj_1={
						remindPlanInAdvance: this.remindPlanInAdvance_1,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_1,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
						remindPlanId:this.remindPlanId_1,//计划id
					}
					let obj_2={
						remindPlanInAdvance: this.remindPlanInAdvance_2,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_2,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
						remindPlanId:this.remindPlanId_2,//计划id
					}
					let obj_3={
						remindPlanInAdvance: this.remindPlanInAdvance_3,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_3,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
						remindPlanId:this.remindPlanId_3,//计划id
					}
					
					let list=[obj_1,obj_2,obj_3];
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
						}
					);
				}else{//添加
					//添加计划
					let obj_1={
						remindPlanInAdvance: this.remindPlanInAdvance_1,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_1,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
					}
					let obj_2={
						remindPlanInAdvance: this.remindPlanInAdvance_2,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_2,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
					}
					let obj_3={
						remindPlanInAdvance: this.remindPlanInAdvance_3,//提醒计划提前几天提醒（0: 不提醒/1: 1天/2：两天/3: 三天）
						remindPlanMedicine: "",//药品名称
						remindPlanPeriod: 365,//计划周期 疫苗默认365天
						remindPlanPetId: this.planData.petId,//宠物ID
						remindPlanPhoto: "",//附带图片
						remindPlanTime: this.Time_3,//计划时间
						remindPlanTypeId: this.planData.remindTypeId,//计划类型ID
						remindPlanIsDeleted: 0,//是否已删除计划（0：未删除 1：已删除）
						remindPlanStatus: 0,//计划状态 0：进行中/1：待确认/2: 未完成/3：已完成
					}
					let list=[obj_1,obj_2,obj_3];
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
						}
					)
				}
			},
			getDate(type,num) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 10;
				}
				if(num){
					day = day + num;
				}
				
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			newDate(str,num) {
				var startDate = new Date(Date.parse(str .replace(/-/g, '/')));    //将开始时间由字符串格式转换为日期格式
				//  开始计算结束日期                   
				var value = startDate.getTime();       //将开始时间转为毫秒            
				value += num * (24 * 3600 * 1000);         //将天数转换成毫秒后与开始时间相加得到结束时间的毫秒数         
				var endDate = new Date(value);    //将得到的毫秒数转换为日期
				
				let year = endDate.getFullYear();
				let month = endDate.getMonth() + 1;
				let day = endDate.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			gotoHistoryRecords() {
				let obj = this.planData.petId + "_" + this.planData.remindTypeId + "_" + this.planData.remindTypeName + "_" + this.planData.remindTypeTypeId
				uni.navigateTo({
					url:"plan-timeline?ids=" + obj
				})
			}
		}
	}
</script>

<style>
page,
view {
	display: flex;
}
page {
	display: flex;
	min-height: 100%;
	background-color: #f9f9f9;
}
template {
	display: flex;
	flex: 1;
}
.content {
	flex-direction: column;
	color: #5c5f66;
	font-size: 14px;
	width: 100%;
}
</style>
