<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view style="width: 100%;flex-direction: column;padding: 0 12upx;">
				<view v-for="(item,index) in list" :key="index"  @click="gotoPet_Archives(item)"
					style="width: 100%;padding: 12upx 20upx;align-items: center;background-color: #FFFFFF;margin-top: 8upx;">
					<view style="width: 20%;height: 130upx;align-items: center;">
						<image :src="decodeURIComponent(item.petAvatar)" mode="aspectFill" style="width: 110upx;height: 110upx;border-radius: 90upx;"></image>
					</view>
					<view style="width: 70%;flex-direction: column;line-height: 60upx;">
						<text style="width: 100%;align-items: center;font-weight: bold;">
							{{item.petNickname}}
						</text>
						<text style="width: 100%;font-size: 24upx;color: #b7b7b7;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
							{{item.breedName}}
						</text>
					</view>
					<view style="width: 10%;height: 100%;align-items: center;justify-content: flex-end;">
						<image src="@/static/mine-ico/next.png" mode="aspectFill" style="width: 16upx;height: 26upx;"></image>
					</view>
				</view>
				<view style="width: 100%;padding: 40upx 20upx;">
					<view class="group-add" @click="addClick">
						<text>添加宠物</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				pet_avatarUrl_default:"../../../static/pet_header_default.png",
				list:[],
			}
		},
		async onLoad(e) {
			//获取 宠物列表
			let param={}
			let opts={ url:'/portal/v1/pet/page/list', method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.list = res.data.data.records;
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
		methods: {
			addClick(){
				uni.navigateTo({
					url:"pet-add"
				})
			},
			gotoPet_Archives(item){
				uni.navigateTo({
					url:"../plan/index?nowPetID=" + item.petId
				})
			},
		},
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
	background-color: #f9f9f9;
}
.group{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	width: 100%;
}
.group-item{
	margin: 5%;
	width: 40%;
	height: 210upx;
	border-radius: 12upx;
	/* background-color: #f76d45; */
	border: 2upx solid #f9f9f9;
	/* align-items: center; */
	/* justify-content: center; */
	flex-direction: column;
}

.group-add{
	margin: 20upx;
	width: 100%;
	height: 80upx;
	border-radius: 12upx;
	/* border: 1px solid #b7b7b7; */
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: #f76d45;
	color: #FFFFFF;
}
</style>
