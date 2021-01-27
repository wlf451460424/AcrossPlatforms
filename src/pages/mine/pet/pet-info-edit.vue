<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;">
					<image :src="decodeURIComponent(avatarUrl)" mode="aspectFill" style="width: 60upx;height: 60upx; border-radius: 60upx;margin-right: auto;"></image>
				</view>
			</view>
		</view>
		<view style="flex-direction: column;width: 100%;margin-top: 2upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<input @click="inputClick('petNickname')" id="petNickname" disabled="disabled" style="width: 100%;font-size: 24upx;color: #888888;" :value="petNickname" maxlength="18" placeholder="填写宠物昵称" />
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;align-items: center;">
					<view style="width: 100%;justify-content: flex-end;align-items: center;" @click="knidBreedClick">
						<input :value="petBreedName" disabled="disabled" placeholder="请选择宠物品种" style="width: 100%;font-size: 24upx;color: #888888;"/>
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height:80upx;line-height:80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<picker @change="sexPickevrChange" :value="index_sex" :range="array_sex" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;align-items: center;">
							<view class="uni-input" style="width: 100%;font-size: 24upx;color: #888888;padding: 0;">{{array_sex[index_sex]}}</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</picker>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;" @click="birthday_uniCalendar">
					<input style="font-size: 24upx;color: #888888;" :value="petBirthday" disabled="disabled" maxlength="18" placeholder="请选择宠物生日" />
				</view>
				<view style="width: 20%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png" @click="birthday_uniCalendar">
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height:80upx;line-height:80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;">
					<input @click="inputClick('petWeight')" id="petWeight" disabled="disabled" style="width: 100%;font-size: 24upx;color: #888888;" :value="petWeight" maxlength="18" placeholder="kg" />
				</view>
				<view style="width: 20%;justify-content: flex-end;">
					<text>kg</text>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height:80upx;line-height:80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>绝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;font-size: 24upx;color: #888888;">
					<!-- <radio-group name="radio-group" @change="radio_Change">
						<label><radio class="from-radio" color="#f76d45" :checked="petSterilizationStatus?false:true" value="0"></radio>否</label>
						<label><radio class="from-radio" color="#f76d45" :checked="petSterilizationStatus?true:false" value="1"></radio>是</label>
					</radio-group> -->
					<picker @change="jueyuPickevrChange" :value="index_jueyu" :range="array_jueyu" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;align-items: center;">
							<view class="uni-input" style="width: 100%;font-size: 24upx;color: #888888;padding: 0;">{{array_jueyu[index_jueyu]}}</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</picker>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height:80upx;line-height:80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>到家时间：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;" @click="gohome_uniCalendar">
					<input style="font-size: 24upx;color: #888888;" :value="petHomeTime" disabled="disabled" maxlength="18" placeholder="请选择到家时间" />
				</view>
				<view style="width: 20%;justify-content: flex-end;align-items: center;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png" @click="gohome_uniCalendar">
				</view>
			</view>
		</view>
		<view class="center-list" style="margin-top: 2upx;">	
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height:80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>携养编号：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<input @click="inputClick('petAdoptionNumber')" type="number" id="petAdoptionNumber" disabled="disabled" style="width: 100%;font-size: 24upx;color: #888888;" :value="petAdoptionNumber" maxlength="18" placeholder="宠物证件号码" />
				</view>
			</view>
		</view>
		<view style="flex-direction: column;margin-top: 8upx;padding: 20upx;background-color: #FFFFFF;">
			<view style="width: 100%;height: 100%;align-items: center;">
				<text>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
			</view>
			<view style="width: 100%;height: 100%;align-items: center;">
				<textarea @click="inputClick('petRemark')" id="petRemark" placeholder="请写下想说的话……" :value="petRemark" disabled="disabled" style="width: 100%;height: 80upx;font-size:24upx;color: #888888;line-height: 40upx;"/>
			</view>
		</view>
		<view style="width: 100%;justify-content: center;color: #FFFFFF;padding:20upx;">
			<view v-if="false" @click="del_pet" style="width: 100%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
				<text>删除宠物</text>
			</view>
			<!-- <view style="width: 40upx;"></view>
			<view @click="save_pet" style="width: 50%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
				<text>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</text>
			</view> -->
		</view>
		
		
		<uni-popup ref="show_petNickname" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;">修改宠物昵称</text>
				<input  @input="uniPopupInput_onKeyInput" id="petNickname_text" :value="petNickname_text" maxlength="10" placeholder="填写昵称"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 14px;border-bottom: 1px solid #f76d45;" />
				<view style="flex-direction: row;width: 100%;margin-top: 25upx;font-size: 12px;color: #b7b7b7;">
					<text style="width: 90%;">1-10个字符，支持中英文、数字</text>
				</view>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('petNickname')">取消</text>
					<text style="color: #f76d45;" @click="confirm('petNickname')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="show_petWeight" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;">修改体重</text>
				<input @input="uniPopupInput_onKeyInput" type="number" id="petWeight_text" :value="petWeight_text"  placeholder="kg"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 14px;border-bottom: 1px solid #f76d45;" />
				<view style="flex-direction: row;width: 100%;margin-top: 25upx;font-size: 12px;color: #b7b7b7;">
					<text style="width: 90%;">1-10个字符，支持中英文、数字</text>
				</view>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('petWeight')">取消</text>
					<text style="color: #f76d45;" @click="confirm('petWeight')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="show_petAdoptionNumber" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;">修改携养编号</text>
				<input @input="uniPopupInput_onKeyInput" type="number" id="petAdoptionNumber_text" :value="petAdoptionNumber_text"  placeholder="请输入携养编号"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 14px;border-bottom: 1px solid #f76d45;" />
				<view style="flex-direction: row;width: 100%;margin-top: 25upx;font-size: 12px;color: #b7b7b7;">
					<text style="width: 90%;">1-20个字符，只支持数字</text>
				</view>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('petAdoptionNumber')">取消</text>
					<text style="color: #f76d45;" @click="confirm('petAdoptionNumber')">确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 生日 -->
		<uni-calendar ref="birthday_calendar" :insert="false" @confirm="birthday_confirm" ></uni-calendar>
		<!-- 到家时间 -->
		<uni-calendar ref="gohome_calendar" :insert="false" @confirm="gohome_confirm" ></uni-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl:"",
				avatarUrl_default:"@/static/header_default.png",
				
				petBreedName:'',
				petBreedId:'',
				
				index_sex:0,
				array_sex: ['弟弟','妹妹','未知'],
				
				index_jueyu:0,
				array_jueyu: ['未绝育','已绝育','未知'],
				
				petData:Object,
				petNickname:'',
				petNickname_text:'',
				petWeight:'',
				petWeight_text:'',
				petAdoptionNumber:'',
				petAdoptionNumber_text:'',
				petRemark:'',
				petRemark_text:'',
				petBirthday:'',
				petHomeTime: '',
				petId:'',
				petSterilizationStatus:0
			};
		},
		onShow() {
			if(uni.getStorageSync('breedInfo')){
				let select_Info = uni.getStorageSync('breedInfo').split("_");
				this.petBreedId = select_Info[0];
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"breedId": this.petBreedId}
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petBreedName = select_Info[1];
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
		onBackPress() {
			uni.removeStorageSync('breedInfo');
		},
		onLoad(e) {
			this.petData = JSON.parse(decodeURIComponent(e.petData));
			// 根据ID  查询宠物信息
			let param={"petId":this.petData.petId} ;
			let str = '/portal/v1/pet/get/' + this.petData.petId;
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						
						this.petBreedId = res.data.data.breedId;
						this.petBreedName = res.data.data.breedName;
						this.index_sex = res.data.data.petGender;
						this.petBirthday = res.data.data.petBirthday;
						this.petHomeTime = res.data.data.petHomeTime;
						this.avatarUrl = res.data.data.petAvatar;
						this.petId = res.data.data.petId;
						this.petNickname = res.data.data.petNickname;
						this.petWeight = res.data.data.petWeight;
						this.petAdoptionNumber = res.data.data.petAdoptionNumber;
						this.petRemark = res.data.data.petRemark;
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});		
					}
				}
			)
			
			// this.petBreedId = this.petData.breedId;
			// this.petBreedName = this.petData.breedName;
			// this.index_sex = this.petData.petGender;
			// this.petBirthday = this.petData.petBirthday;
			// this.petHomeTime = this.petData.petHomeTime;
			// this.avatarUrl = this.petData.petAvatar;
			// this.petId = this.petData.petId;
			// this.petNickname = this.petData.petNickname;
			// this.petWeight = this.petData.petWeight;
			// this.petAdoptionNumber = this.petData.petAdoptionNumber;
			// this.petRemark = this.petData.petRemark;
		},
		methods: {
			//输入框统一处理
			inputClick(type){
				// this.address_input = this.address_text //点击输入框 弹框自动获取输入框原始内容
				switch (type) {
					case 'petNickname':
						this.$refs['show_' + type].open()
						this.petNickname_text = this.petNickname
						break
					case 'petWeight':
						this.$refs['show_' + type].open()
						this.petWeight_text = this.petWeight
						break
					case 'petAdoptionNumber':
						this.$refs['show_' + type].open()
						this.petAdoptionNumber_text = this.petAdoptionNumber
						break
					case 'petRemark':
						uni.navigateTo({
							url:"pet-info-remark-edit?petData=" + encodeURIComponent(JSON.stringify(this.petData))
						})
						break
				}
			},
			//弹出层  输入框监听
			uniPopupInput_onKeyInput: function(event) {
				// this.type = event.target.value
				switch (event.target.id.split("_")[0]) {
					case 'petNickname':
						this.petNickname_text = event.target.value
						break
					case 'petWeight':
						this.petWeight_text = event.target.value
						break
					case 'petAdoptionNumber':
						this.petAdoptionNumber_text = event.target.value
						break
				}
			}, 
			//弹出层  确认按钮统一处理
			confirm(type) {
				this.$refs['show_' + type].close()
				let param={}
				let opts={}
				switch (type) {
					case 'petNickname':
						// 修改 宠物信息
						param={ "petId":this.petData.petId,"petNickname": this.petNickname_text} 
						opts={ url:'/portal/v1/pet/update', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.petNickname = this.petNickname_text;
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1000
									});	
								}
							}
						)
						break
					case 'petWeight':
						// 修改 宠物信息
						param={ "petId":this.petData.petId,"petWeight": this.petWeight_text} 
						opts={ url:'/portal/v1/pet/update', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.petWeight = this.petWeight_text;
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1000
									});					
								}
							}
						)
						break
					case 'petAdoptionNumber':
						// 修改 宠物信息
						param={ "petId":this.petData.petId,"petAdoptionNumber": this.petAdoptionNumber_text} 
						opts={ url:'/portal/v1/pet/update', method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.petAdoptionNumber = this.petAdoptionNumber_text;
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1000
									});	
								}
							}
						)
						break
				}
			},
			//弹出层  取消按钮统一处理
			cancel(type) {
				this.$refs['show_' + type].close()
			},
			
			//性别
			sexPickevrChange: function(e) {
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"petGender": e.target.value} 
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.index_sex = e.target.value
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
			//绝育
			jueyuPickevrChange: function(e) {
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"petSterilizationStatus": e.target.value} 
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.index_jueyu = e.target.value
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
			//到家时间
			gohome_uniCalendar(){
				this.$refs.gohome_calendar.open();
			},
			gohome_confirm(e) {
				// console.log(e);
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"petHomeTime": e.fulldate} 
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petHomeTime = e.fulldate
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
			
			birthday_uniCalendar(){
				this.$refs.birthday_calendar.open();
			},
			birthday_confirm(e) {
				// console.log(e);
				// this.petBirthday = e.fulldate;
				// 修改 宠物信息
				let param={ "petId":this.petData.petId,"petBirthday": e.fulldate}
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petBirthday = e.fulldate
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
			
			knidBreedClick(){
				uni.navigateTo({
					url:"pet-breed-select"
				})
			},
			// radio_Change(e){
			// 	this.petSterilizationStatus = e.target.value
			// 	console.log(this.petSterilizationStatus)
			// },
			del_pet(){
				// this.petId
				// uni.showModal({
				// 	content:"是否要删除该宠物？",
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			// console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			// console.log('用户点击取消');
				// 		}
				// 	}
				// })
				
				// 删除宠物
				let param={ "RemovePet":this.petId}
				let opts={ url:'/portal/v1/pet/remove', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.navigateTo({
								url:'../index'
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
			
			save(){
				if(!this.petNickname){
					uni.showToast({
						icon: "none",
						title: "请输入昵称"
					})
					return;
				}
				
				// 修改 宠物信息
				let param={
					"breedId": this.petBreedId,
					"petGender": this.index_sex,
					"petBirthday": this.petBirthday,
					"petHomeTime": this.petHomeTime,
					"petAvatar": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1776304832,3958794869&fm=26&gp=0.jpg",
					// "petAvatar": this.avatarUrl,
					"petId":this.petData.petId,
					"petNickname": this.petNickname,
					"petWeight": this.petWeight,
					"petAdoptionNumber": this.petAdoptionNumber,
					"petRemark": this.petRemark,
					"petSterilizationStatus": this.petSterilizationStatus, //绝育
				} 
				let opts={ url:'/portal/v1/pet/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.navigateBack({
								url:"index"
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
		}
	}
</script>

<style lang="scss" scoped>
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
	margin-top: 2upx;
}
.from-radio{
	transform: scale(0.7);
	color:#09BB07
}
list-text-l{
	text-align: left;
	width: 50%;
	padding-top: 40upx;
}
list-text-m{
	text-align: left;
	width: 20%;
}

</style>
