<template>
	<view class="center">
		<view style="width: 100%;height: 260upx;background-color: #FFFFFF;border-radius: 6upx;border-bottom: 1px solid #f9f9f9;">
			<!-- <view style="width: 20%;height: 100%;padding: 20upx;">
			</view> -->
			<view style="width: 100%;flex-direction: column;justify-content: flex-end;align-items: center;">
				<image v-if="p_info.userAvatar" :src="p_info.userAvatar?decodeURIComponent(p_info.userAvatar):avatarUrl_default" style="width: 120upx;height: 120upx;border-radius: 70upx;"></image>
				<view style="width: 100%;height: 100upx;justify-content: center;align-items: center;">
					<text style="max-width: 60%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;font-weight: bold;" >{{p_info.userNickname}}</text>
					<image v-if="p_info.userGender" :src="p_info.userGender==0?greden_0:greden_1" style="width: 44upx;height: 44upx;margin:0 20upx;"></image>
				</view>
			</view>
			<!-- <view style="width: 20%;height: 100%;padding: 20upx;">
				<image src="@/static/mine-ico/bianji.png" style="width: 45upx;height: 45upx;margin-left:auto;" @click="goPersonInfo"></image>
			</view> -->
		</view>
		<view style="width: 100%;flex-direction: column;justify-content: flex-end;align-items: center;margin-bottom: 4upx;padding: 0 20upx 20upx;">
			<view v-if="p_info.userAge && p_info.userAge!=0" style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<image src="@/static/mine-ico/personal_ico/age.png" mode="aspectFit" style="width: 30upx;height: 30upx;"></image>
				<text style="padding-left: 30upx;">{{p_info.userAge}}岁</text>
			</view>
			<view v-if="p_info.userCity" style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<image src="@/static/mine-ico/personal_ico/poi.png" mode="aspectFit" style="width: 30upx;height: 30upx;"></image>
				<text style="padding-left: 30upx;">{{p_info.userCity}}</text>
			</view>
			<view v-if="p_info.userExperienceYears" style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<image src="@/static/mine-ico/personal_ico/petAge.png" mode="aspectFit" style="width: 30upx;height: 30upx;"></image>
				<text style="padding-left: 30upx;"><text style="font-weight: bold;">养宠年限：</text> {{p_info.userExperienceYears}}</text>
			</view>
			<view v-if="p_love_pet.length" style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<image src="@/static/mine-ico/personal_ico/lovelyPet.png" mode="aspectFit" style="width: 30upx;height: 30upx;"></image>
				<text style="padding-left: 30upx;font-weight: bold;">喜爱的宠物</text>
			</view>
			<view v-for="(item,index) in p_love_pet" :key="index"   style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding-left: 70upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<image :src="decodeURIComponent(item.breedAvatar)" style="width: 60upx;height: 60upx;border-radius: 30upx;"></image>
				<text style="padding-left: 30upx;">{{item.breedName}}</text>
			</view>
			<!-- <view v-if="p_love_pet.length==0" style="flex-direction: row;width: 100%;height: 100upx;line-height: 80upx;align-items: center;padding-left: 110upx;margin-top: 4upx;background-color: #FFFFFF;border-bottom: 1px solid #f9f9f9;">
				<text>他/她还没有添加宠物哦</text>
			</view> -->
			<view v-if="p_info.userProfile" style="flex-direction: row;width: 100%;height: 80upx;line-height: 60upx;align-items: center;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;">
				<image src="@/static/mine-ico/personal_ico/profile.png" style="width: 30upx;height: 30upx;"></image>
				<text style="padding-left: 30upx;font-weight: bold;">个人简介：</text>
			</view>
			<textarea v-if="p_info.userProfile" placeholder="请写下想说的话……" :value="p_info.userProfile" 
				disabled="disabled" style="width: 100%;height: 240upx;font-size:24upx;color: #5c5f66;line-height: 80upx;padding:0 20upx;margin-top: 4upx;background-color: #FFFFFF;border: 1px solid #f9f9f9;"/>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				avatarUrl_default:"../../../static/header_default.png",
				
				greden_0:'../../../static/mine-ico/greden_0.png',
				greden_1:'../../../static/mine-ico/greden_1.png',
				
				p_info:Object,
				p_love_pet:[]
			}
		},
		async onLoad(e) {
			//根据用户id获取用户信息
			let param={"userId":e.id}
			let str = '/portal/v1/get/' + e.id
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						//用户显示信息
						this.p_info = res.data.data;
						this.p_info.userExperienceYears = this.getDaysBetween(res.data.data.userPetTime)
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
			param={"userId":e.id}
			opts={ url:'/portal/v1/breed/get_favorite_breed_list', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.p_love_pet = res.data.data;
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
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'index'
			})
		},
		methods:{
			goPersonInfo() {
				uni.navigateTo({
					url:"index"
				})
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
						str = '1年以内' 
					}else{
						str = parseInt(y) + '年以上' 
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
	    display: flex;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	/* 个人中心 */
	.center {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #FFFFFF;
	}
</style>
