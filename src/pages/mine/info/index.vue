<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<image :src="decodeURIComponent(avatarUrl)" style="width: 60upx;height: 60upx; border-radius: 60upx;margin-right: auto;"></image>
				</view>
			</view>
		</view>
		<view style="flex-direction: column;width: 100%;margin-top: 8upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>用&nbsp;户&nbsp;名：</text>
				</view>
				<view style="width: 60%;height: 100%;align-items: center;" @click="inputClick('userName')">
					<input style="width: 100%;font-size: 24upx;color: #888888;" disabled="disabled" :value="userName_text" maxlength="15" placeholder="填写用户名" />
				</view>
			</view>
		</view>
		<view style="flex-direction: column;width: 100%;margin-top: 8upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" @click="inputClick('nickName')">
					<input style="width: 100%;font-size: 24upx;color: #888888;" disabled="disabled" :value="nickName_text" maxlength="8" placeholder="填写用户昵称" />
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" >
					<picker @change="sexPickevrChange" :value="index_sex" :range="array_sex" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;align-items: center;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 24upx;color: #888888;padding: 0;">{{array_sex[index_sex]}}</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</picker>
				</view>
				<!-- <view style="width: 60%;height: 100%;align-items: center;font-size: 12px;color: #888888;">
					<radio-group name="radio-group">
						<label><radio class="from-radio" color="#f76d45" checked="true"></radio>男</label>
						<label><radio class="from-radio" color="#f76d45"></radio>女</label>
					</radio-group>
				</view> -->
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" >
					<picker @change="agePickevrChange" :value="index_age" :range="array_age" style="width: 100%;">
						<view style="width: 100%;justify-content: flex-end;align-items: center;">
							<view class="uni-input" style="width: 100%;line-height: 56upx;font-size: 24upx;color: #888888;padding: 0;">{{array_age[index_age]}}</view>
							<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
						</view>
					</picker>
				</view>
				<!-- <view style="width: 20%;justify-content: flex-end;">
					<image style="width: 60upx;height: 60upx;" src="@/static/mine-ico/next.png" @click="birthday_uniCalendar">
				</view> -->
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;">
					<pickerAddress @change="pickerAddressChange" style="width: 100%;font-size: 24upx;color: #888888;">{{city_input}}</pickerAddress>
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>
		<view style="flex-direction: column;padding: 20upx;background-color: #FFFFFF;margin-top: 8upx;">
			<view style="flex-direction: row;width: 100%;align-items: center;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text >个人简介</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;justify-content: flex-end;">
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			
			<textarea @click="inputClick('profile')" placeholder="填写个人简介更容易获得关注哦" :value="profile_text" disabled="disabled" style="width: 100%;height: 80upx;font-size:24upx;color: #888888;line-height: 50upx;"/>
		</view>
		
		<view style="flex-direction: column;width: 100%;margin-top: 8upx;">
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 25%;height: 100%;align-items: center;">
					<text>喜欢的宠物：</text>
				</view>
				<view style="width: 75%;height: 100%;align-items: center;" @click="lovelyPets">
					<input style="width: 100%;font-size: 24upx;color: #888888;" disabled="disabled" :value="pets_text" maxlength="18" placeholder="填写喜欢的宠物" />
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>养宠时间：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" @click="feedPet_uniCalendar">
					<input style="width: 100%;font-size: 24upx;color: #888888;" disabled="disabled" :value="feed_text" placeholder="选择养宠时间" />
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
			<view style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 2upx;">
				<view style="width: 20%;height: 100%;align-items: center;">
					<text>住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</text>
				</view>
				<view style="width: 80%;height: 100%;align-items: center;" @click="inputClick('address')">
					<input style="width: 100%;font-size: 24upx;color: #888888;" disabled="disabled" :value="address_text" maxlength="18" placeholder="填写详细地址" />
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>
		
		<view v-if="authenticationData.userAuthenticationIdResult == 2" style="flex-direction: row;width: 100%;height: 80upx;line-height: 80upx;background-color: #FFFFFF;padding: 20upx;margin-top: 8upx;margin-bottom: 20upx;">
			<view style="width: 30%;height: 100%;align-items: center;">
				<text>身份证认证：</text>
			</view>
			<view style="width: 80%;height: 100%;align-items: center;justify-content: flex-end;">
				<text style="font-weight: bold;text-align: right;">
					{{authenticationArr[authenticationData.userAuthenticationIdResult+1]}}
				</text>
			</view>
		</view>
		
		
		<uni-popup ref="show_userName" :mask-click="false" type="center" style="width: 100%;">
			<view class="uni-tip" style="width: 100%;">
				<text class="uni-tip-title" style="text-align: left;margin-bottom: 0;font-size: 28upx;">修改用户名</text>
				<text class="uni-tip-content" style="text-align: left;margin-bottom: 20upx;font-size: 24upx;color: #b7b7b7;">用户名是账号的唯一凭证，只能修改一次</text>
				<input @input="uniPopupInput_onKeyInput" id="userName_input" :value="userName_input" maxlength="15" placeholder="填写用户名" style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 28upx;border-bottom: 2upx solid #f76d45;" />
				<view style="flex-direction: row;width: 100%;margin-top: 25upx;font-size: 24upx;color: #b7b7b7;">
					<text style="width: 90%;">6~15个字符，仅可使用英文(必填)，数字，下划线</text>
					<!-- <text style="width: 10%;margin-left: 20upx;color: #000000;">{{userName_input_lenght}} <text>/15</text></text> -->
				</view>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('userName')">取消</text>
					<text style="color: #f76d45;" @click="confirm('userName')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="show_nickName" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;font-size: 28upx;">修改昵称</text>
				<input @input="uniPopupInput_onKeyInput" id="nickName_input" :value="nickName_input" maxlength="8" placeholder="填写昵称"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 28upx;border-bottom: 2upx solid #f76d45;" />
				<view style="flex-direction: row;width: 100%;margin-top: 25upx;font-size: 24upx;color: #b7b7b7;">
					<text style="width: 90%;">2-8个字符，支持中英文、数字</text>
					<!-- <text style="width: 10%;margin-left: 20upx;color: #000000;">{{nickName_input_lenght}} <text>/15</text></text> -->
				</view>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('nickName')">取消</text>
					<text style="color: #f76d45;" @click="confirm('nickName')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="show_address" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;font-size: 28upx;">填写详细地址</text>
				<input @input="uniPopupInput_onKeyInput" id="address_input" :value="address_input" maxlength="100" placeholder="填写详细地址"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 24upx;border-bottom: 1px solid #f76d45;" />
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('address')">取消</text>
					<text style="color: #f76d45;" @click="confirm('address')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="show_profile" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title" style="text-align: left;font-size: 28upx;">个人简介</text>
				<!-- <input @input="uniPopupInput_onKeyInput" id="profile_input" :value="profile_input" maxlength="100" placeholder="写下您想说的话……"  style="width: 100%;height: 70upx;line-height: 70upx;padding:15upx 0;font-size: 12px;border-bottom: 1px solid #f76d45;" /> -->
				<textarea @input="uniPopupInput_onKeyInput" id="profile_input" :value="profile_input" placeholder="请写下想说的话……" style="width: 100%;height: 240upx;font-size:24upx;color: #888888;line-height: 50upx;border: 2upx solid #b7b7b7;padding: 10upx 20upx;"/>
				<view class="uni-tip-group-button" style="justify-content: flex-end;">
					<text style="color: #b7b7b7;padding-right:100upx;" @click="cancel('profile')">取消</text>
					<text style="color: #f76d45;" @click="confirm('profile')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-calendar ref="feedPet_calendar" :insert="false" @confirm="feedPet_confirm" ></uni-calendar>
	</view>
</template>

<script>
	import pickerAddress from './pickerAddress/pickerAddress.vue'
	export default {
		components:{
			pickerAddress,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				avatarUrl:"",
				avatarUrl_default:"@/static/header_default.png",
				
				date: currentDate,
				index_age:0,
				array_age: ["请选择年龄"],
				index_sex:0,
				array_sex: ["男","女"],
				address_text:"",
				address_input:"",
				feed_text:"",
				userName_text:"",
				userName_input:"",
				userName_input_lenght:0,
				nickName_text:"",
				nickName_input:"",
				nickName_input_lenght:0,
				city_input:"选择城市",
				profile_text:"",
				profile_input:"",
				isModify:0,
				
				pets_text:"",
				lovelyPetsData:[],
				authenticationData:Object,
				authenticationArr:["未认证","待审核","认证失败","认证成功"]
			}
		},
		async onLoad(e) {
			this.get_ageArr();
			//获取 登录用户信息
			let param={}
			let opts={ url:'/portal/v1/current', method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						//刷新 用户显示信息
						this.avatarUrl = res.data.data.userAvatar;
						this.nickName_text = res.data.data.userNickname;
						this.userName_text = res.data.data.userName;
						this.isModify = res.data.data.isModify;
						this.index_sex = res.data.data.userGender;
						this.index_age = res.data.data.userAge;
						this.city_input = res.data.data.userCity?res.data.data.userCity:'选择城市';
						this.feed_text = res.data.data.userPetTime.split(" ")[0];
						this.address_text = res.data.data.userAddress;
						this.profile_text = res.data.data.userProfile;
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});
					}
				}
			)
			
			//获取当前用户喜欢的宠物品种列表
			param={}
			opts={ url:'/portal/v1/breed/get_favorite_breed_list', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						let arr = res.data.data;
						for(var i=0;i<arr.length;i++){
							this.pets_text += arr[i].breedName + ","
						}
						this.pets_text=this.pets_text.substr(0,this.pets_text.length-1)
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});		
					}
				}
			);
			//获取  认证信息
			this.getAuthentication()
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
			//获取  认证信息
			getAuthentication(){
				//查询当前用户认证信息
				let param={}
				let opts={ url:'/portal/v1/user_authentication/get/authentication', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.authenticationData = res.data.data
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
			//输入框统一处理
			inputClick(type){
				// this.address_input = this.address_text //点击输入框 弹框自动获取输入框原始内容
				switch (type) {
					case 'userName':
						// if(!this.isModify){
							this.$refs['show_' + type].open()
							this.userName_input = this.userName_text
							this.userName_input_lenght = this.userName_text.length
						// }else{
						// 	return;
						// }
						break
					case 'nickName':
						this.$refs['show_' + type].open()
						this.nickName_input = this.nickName_text
						this.nickName_input_lenght = this.nickName_text.length
						break
					case 'address':
						uni.navigateTo({
							url:'info-address?p=' + this.address_text
						})
						break
					case 'profile':
						uni.navigateTo({
							url:'info-profile?p=' + this.profile_text
						})
						break
				}
			},
			//弹出层  输入框监听
			uniPopupInput_onKeyInput: function(event) {
				// this.type = event.target.value
				switch (event.target.id.split("_")[0]) {
					case 'address':
						this.address_input = event.target.value
						break
					case 'userName':
						this.userName_input = event.target.value
						this.userName_input_lenght = this.userName_input.length
						break
					case 'nickName':
						this.nickName_input = event.target.value
						this.nickName_input_lenght = this.nickName_input.length
						break
					case 'profile':
						this.profile_input = event.target.value
						break
				}
			}, 
			//弹出层  确认按钮统一处理
			confirm(type) {
				let param={}
				let opts={}
				switch (type) {
					// case 'address':
					// 	//修改用户信息  地址
					// 	param={ userAddress: this.address_input}
					// 	opts={ url:'/portal/v1/update_user', method:'POST' }
					// 	//发送请求
					// 	this.http.httpTokenRequest(opts,param).then(
					// 		res => {
					// 			if(res.data.code == 200){
					// 				this.address_text = this.address_input
					// 			}else{
					// 				uni.showToast({
					// 					title: res.data.msg,
					// 					icon: 'none',
					// 					duration: 1000
					// 				});
					// 			}
					// 		}
					// 	)
					// 	break
					case 'userName':
						//修改用户信息  用户名
						// param={ userName: this.userName_input}
						// opts={ url:'/portal/v1/update_user', method:'POST' }
						
						//中英文下划线
						let aa = this.userName_input
						if(this.userName_input != aa.replace(/[^\w_]/g,'')){
							uni.showToast({
								title: '输入格式不正确',
								icon: 'none',
								duration: 1000
							});
							return;
						}
						//英文必填  验证是否含有英文
						let isHaveLetter = false;
						for (var i in aa) {
							var asc = aa.charCodeAt(i);
							if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
								isHaveLetter = true;
							}
						}
						if(!isHaveLetter){
							uni.showToast({
								title: '输入格式不正确',
								icon: 'none',
								duration: 1000
							});
							return;
						}
							
						param={ userName: this.userName_input}
						let str ='/portal/v1/update/username'
						opts={ url:str, method:'POST' }
						//发送请求
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.userName_text = this.userName_input
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
					case 'nickName':
						//修改用户信息  昵称
						
						let bb = this.nickName_input
						if(this.nickName_input != bb.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')){
							uni.showToast({
								title: '输入格式不正确',
								icon: 'none',
								duration: 1000
							});
							return;
						}
						
						param={ userNickname: this.nickName_input}
						let str1 ='/portal/v1/update/nickname'
						opts={ url:str1, method:'POST' }
						//发送请求
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.nickName_text = this.nickName_input
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
					// case 'profile':
					// 	//修改用户信息  个人简介
					// 	param={ userProfile: this.profile_input}
					// 	opts={ url:'/portal/v1/update_user', method:'POST' }
					// 	//发送请求
					// 	this.http.httpTokenRequest(opts,param).then(
					// 		res => {
					// 			if(res.data.code == 200){
					// 				this.profile_text = this.profile_input
					// 			}else{
					// 				uni.showToast({
					// 					title: res.data.msg,
					// 					icon: 'none',
					// 					duration: 1000
					// 				});
					// 			}
					// 		}
					// 	)
					// 	break
				}
				this.$refs['show_' + type].close()
			},
			//弹出层  取消按钮统一处理
			cancel(type) {
				this.$refs['show_' + type].close()
			},
			
			sexPickevrChange: function(e) {
				//修改用户信息  性别
				let param={ userGender: e.target.value}
				let str = '/portal/v1/update/gender'
				let opts={ url:str, method:'POST' }
				//发送请求
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
			agePickevrChange: function(e) {
				//修改用户信息  年龄
				let param={ userAge: e.target.value}
				let str = '/portal/v1/update/age'
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.index_age = e.target.value
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
			feedPet_uniCalendar(){
				this.$refs.feedPet_calendar.open();
			},
			feedPet_confirm(e) {
				//修改用户信息  养宠时间
				let param={ userPetTime: e.fulldate}
				let str = '/portal/v1/update/pet/time'
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.feed_text = e.fulldate;
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
			
			pickerAddressChange(e){
				let address = e
				//修改用户信息  城市
				let param={ userCity: address}
				let str = '/portal/v1/update/city'
				let opts={ url:str, method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.city_input = address
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
						
			lovelyPets(){
				uni.navigateTo({
					url:'user-favorite-pet'
				})
			},
			
			get_ageArr() {
				for(var i=1; i<100; i++){
				  this.array_age.push(i+" 岁");
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
	width: 100%;
	margin-top: 2upx;
}
.from-radio{
	transform: scale(0.6);
	color:#09BB07
}

</style>
