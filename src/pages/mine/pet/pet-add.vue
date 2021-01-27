<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<input @click="inputClick('petNickname')" disabled="disabled" id="petNickname" style="width: 100%;font-size: 24upx;color: #888888;" :value="petNickname" maxlength="18" placeholder="请填写宠物昵称" />
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<view style="width: 100%;justify-content: flex-end;align-items: center;" @click="knidBreedClick">
						<input :value="petBreedName" disabled="disabled" placeholder="请选择宠物品种" style="width: 100%;font-size: 24upx;color: #888888;"/>
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<picker @change="sexPickevrChange" :value="index_sex" :range="array_sex" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;">
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
					<input style="font-size: 24upx;color: #888888;" disabled="disabled" :value="petBirthday" maxlength="18" placeholder="请选择宠物生日" />
				</view>
				<view style="width: 20%;justify-content: flex-end;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png" @click="birthday_uniCalendar">
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;">
					<input @click="inputClick('petWeight')" id="petWeight" style="width: 100%;font-size: 24upx;color: #888888;" :value="petWeight" maxlength="18" placeholder="kg" />
				</view>
				<view style="width: 20%;justify-content: flex-end;color: #888888;">
					<text>kg</text>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>绝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;font-size: 24upx;color: #888888;">
					<!-- <radio-group name="radio-group" @change="radio_Change">
						<label><radio class="from-radio" color="#f76d45" checked="true" value="0"></radio>否</label>
						<label><radio class="from-radio" color="#f76d45" value="1"></radio>是</label>
					</radio-group> -->
					<picker @change="jueyuPickevrChange" :value="index_jueyu" :range="array_jueyu" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;">
							<view class="uni-input" style="width: 100%;font-size: 24upx;color: #888888;padding: 0;">{{array_jueyu[index_jueyu]}}</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</picker>
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>到家时间：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;" @click="gohome_uniCalendar">
					<input style="font-size: 24upx;color: #888888;" disabled="disabled" :value="petHomeTime" maxlength="18" placeholder="请选择到家时间" />
				</view>
				<view style="width: 20%;justify-content: flex-end;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png" @click="gohome_uniCalendar">
				</view>
			</view>
		</view>
		<view class="center-list" style="margin-top: 2upx;">	
			<view style="flex-direction: row;width: 100%;height:80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>携养编号：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<input @click="inputClick('petAdoptionNumber')" type="number" id="petAdoptionNumber" style="width: 100%;font-size: 24upx;color: #888888;" :value="petAdoptionNumber" maxlength="18" placeholder="请填写宠物携养编号" />
				</view>
			</view>
		</view>
		<view style="flex-direction: column;margin-top: 10upx;padding: 20upx;background-color: #FFFFFF;margin-top: 8upx;">
			<view style="width: 100%;height: 100%;align-items: center;">
				<text>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
			</view>
			<view style="width: 100%;height: 100%;align-items: center;">
				<textarea @click="inputClick('petRemark')" id="petRemark" placeholder="请写下想说的话……" :value="petRemark" style="width: 100%;height: 80upx;font-size:24upx;color: #888888;line-height: 50upx;"/>
			</view>
		</view>
		<view style="width: 100%;justify-content: center;color: #FFFFFF;padding:40upx;">
			<view @click="save_pet" style="width: 100%;height: 90upx;border-radius: 10upx;background-color: #f76d45;justify-content: center;align-items: center;">
				<text>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</text>
			</view>
		</view>
		
		<uni-popup ref="show_petNickname" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;">修改宠物昵称</text>
				<input @input="uniPopupInput_onKeyInput" id="petNickname_text" :value="petNickname_text" maxlength="10" placeholder="填写昵称"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 14px;border-bottom: 1px solid #f76d45;" />
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
				
				index_sex:0,
				array_sex:['弟弟','妹妹','未知'],
				
				index_jueyu:0,
				array_jueyu: ['未绝育','已绝育','未知'],
				
				petBreedName:'',
				breedId:'',
				
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
				petSterilizationStatus:0,
				isCompleted:true,
			};
		},
		async onLoad() {
			this.breedId = ''
			this.petBreedName = ''
			this.petNickname = ''
			this.petNickname_text = ''
			this.petWeight = ''
			this.petWeight_text = ''
			this.petAdoptionNumber = ''
			this.petAdoptionNumber_text = ''
			this.petRemark = ''
			this.petRemark_text = ''
			this.petBirthday = ''
			this.petHomeTime = ''
			this.petSterilizationStatus = 0
			
			//前端用户获取种类列表
			let param={} ;
			let opts={ url:'/portal/v1/kind/get', method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						// console.log(res.data.data.records)
					}else{uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});}
				}
			)
		},
		onShow() {
			if(uni.getStorageSync('breedInfo')){
				let select_Info = uni.getStorageSync('breedInfo').split("_");
				this.breedId = select_Info[0];
				this.petBreedName = select_Info[1];
			}
			if(uni.getStorageSync('add_pet_remark')){
				this.petRemark = uni.getStorageSync('add_pet_remark');
			}
		},
		onBackPress() {
			uni.removeStorageSync('breedInfo');
			uni.removeStorageSync('add_pet_remark');
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
						break
					case 'petAdoptionNumber':
						this.$refs['show_' + type].open()
						this.petAdoptionNumber_text = this.petAdoptionNumber
						break
					case 'petRemark':
						uni.navigateTo({
							url:"pet-info-remark-add"
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
						this.petNickname = this.petNickname_text;
						break
					case 'petWeight':
						this.petWeight = this.petWeight_text;
						break
					case 'petAdoptionNumber':
						this.petAdoptionNumber = this.petAdoptionNumber_text;
						break
				}
			},
			//弹出层  取消按钮统一处理
			cancel(type) {
				this.$refs['show_' + type].close()
			},
			
			//性别
			sexPickevrChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index_sex = e.target.value
			},
			//绝育
			jueyuPickevrChange: function(e) {
				this.index_jueyu = e.target.value
				this.petSterilizationStatus = e.target.value
			},
			//到家时间
			gohome_uniCalendar(){
				this.$refs.gohome_calendar.open();
			},
			gohome_confirm(e) {
				// console.log(e);
				this.petHomeTime = e.fulldate;
			},
			birthday_uniCalendar(){
				this.$refs.birthday_calendar.open();
			},
			birthday_confirm(e) {
				// console.log(e);
				this.petBirthday = e.fulldate;
			},
			knidBreedClick(){
				uni.navigateTo({
					url:"pet-breed-select"
				})
			},
			radio_Change(e){
				this.petSterilizationStatus = e.target.value
				// console.log(this.petSterilizationStatus)
			},
			save_pet(){
				if(this.petNickname == ""){
					uni.showToast({
					    title: '昵称不能为空',
						icon: 'none',
					    duration: 1000
					});	
					return;
				}
				if(this.breedId == ""){
					uni.showToast({
					    title: '品种不能为空',
						icon: 'none',
					    duration: 1000
					});	
					return;
				}
				if(!this.isCompleted){
					return;
				}
				this.isCompleted = !this.isCompleted
				
				// 添加宠物
				let param={
					"breedId": this.breedId,
					"petGender": this.index_sex,
					"petBirthday": this.petBirthday,
					"petHomeTime": this.petHomeTime,
					// "petAvatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583485080710&di=3ec8c4d8bcd5ef7270698f0b74bf3c8d&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170803%2Fc712531b7f51459e9a5f90c08a02b451_th.jpg",
					
					"petNickname": this.petNickname,
					"petWeight": this.petWeight,
					"petAdoptionNumber": this.petAdoptionNumber,
					"petRemark": this.petRemark,
					"petSterilizationStatus": this.petSterilizationStatus, //绝育
				} 
				// console.log(param)
				let opts={ url:'/portal/v1/pet/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							uni.switchTab({
								url:"/pages/tab-mine/index"
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
