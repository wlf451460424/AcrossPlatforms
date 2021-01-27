<template>
	<view class="content">
		<text style="color: #b7b7b7;line-height: 60upx;margin-left: 20upx;font-size:24upx;">点击删除，最多5个</text>
		<view style="width: 100%;flex-direction: column;padding:0 12upx;">
			<view v-for="(item,index) in list" :key="index"
				style="width: 100%;padding: 20upx 20upx;align-items: center;background-color: #FFFFFF;border-radius: 8upx;margin-bottom: 12upx;">
				<view style="width: 17%;height: 100upx;align-items: center;">
					<image :src="decodeURIComponent(item.breedAvatar)" style="width: 90upx;height: 90upx;border-radius: 90upx;"></image>
				</view>
				<view style="width: 70%;flex-direction: column;">
					<text style="width: 100%;align-items: center;">
						{{item.breedName}}
					</text>
					<text style="width: 100%;font-size: 24upx;color: #b7b7b7;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
						{{item.breedDesc}}
					</text>
				</view>
				<view style="width: 13%;height: 100upx;justify-content: flex-end;align-items: center;">
					<image @click="delClick(item.breedId)" src="@/static/del.png" style="width:20upx;height: 20upx;"></image>
				</view>
			</view>
			<view style="width: 100%;padding: 40upx 20upx;">
				<view class="group-add" @click="addClick">
					<text>添&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加</text>
				</view>
			</view>
		</view>
		
		<uni-popup ref="show_uniPopup" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title">提示信息</text>
				<text class="uni-tip-content">是否保存修改内容</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="uniPopup_cancel()">不保存</text>
					<text class="uni-tip-button" @click="uniPopup_confirm()">保存</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				pet_avatarUrl_default:"../../../static/pet_header_default.png",
				list:[
					// {breedName:'拉布拉多',breedId:'001'},
					// {breedName:'金毛1',breedId:'002'},
					// {breedName:'金毛2',breedId:'003'},
					// {breedName:'金毛3',breedId:'004'},
					// {breedName:'金毛4',breedId:'005'},
				],
				tabCurrentIndex:-1
			}
		},
		async onLoad(e) {
			//获取当前用户喜欢的宠物品种列表
			let param={}
			let opts={ url:'/portal/v1/breed/get_favorite_breed_list', method:'POST' }
			// 发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.list = res.data.data;
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
		onShow(e) {
			if(uni.getStorageSync('lovelyPetsData')){
				let select_Info = uni.getStorageSync('lovelyPetsData').split("_");
				let obj = {};
				obj.breedId = select_Info[0];
				obj.breedName = select_Info[1];
				obj.breedAvatar = select_Info[2];
				let isHave = false;
				for(var i=0;i<this.list.length;i++){
					if(obj.breedId == this.list[i].breedId){
						isHave = true;
					}
				}
				if(!isHave){
					this.list.push(obj);	
				}
			}
		},
		methods: {
			onTapClick(index){
				if(this.tabCurrentIndex != index){
					this.tabCurrentIndex = index
				}else{
					this.tabCurrentIndex = -1
				}
				
			},
			delClick(breedId){
				let newArr=[];
				for(var i=0;i<this.list.length;i++){
					if(breedId != this.list[i].breedId){
						newArr.push(this.list[i]);
					}
				}
				this.list = newArr;
			},
			addClick(){
				if(this.list.length == 5){
					uni.showToast({
						icon: "none",
						title: "最多添加5个",
						duration: 1000
					});
					return;
				}
				uni.removeStorageSync('lovelyPetsData')
				uni.navigateTo({
					url:'user-favorite-pet-select'
				})
			},
			//弹出层  取消按钮统一处理
			uniPopup_cancel() {
				this.$refs.show_uniPopup.close()
				uni.navigateTo({
					url:'index'
				})
				uni.removeStorageSync('lovelyPetsData');
			},
			//弹出层  确认按钮统一处理
			uniPopup_confirm() {
				this.$refs.show_uniPopup.close()
				uni.navigateTo({
					url:'index?lovelyPetsData=' + JSON.stringify(this.list)
				})
				uni.removeStorageSync('lovelyPetsData');
			}
		},
		onBackPress() {
			uni.removeStorageSync('lovelyPetsData')
			// this.$refs.show_uniPopup.open()
		},
		onNavigationBarButtonTap(e) {
			let add_petIdArr=''
			for(var i=0;i<this.list.length;i++){
				add_petIdArr += this.list[i].breedId + ","
			}
			add_petIdArr = add_petIdArr.substr(0,add_petIdArr.length-1)
			//修改喜爱的宠物
			let param={ userFavoritePet: add_petIdArr}
			let str ='/portal/v1/update/favorite/pet'
			let opts={ url:str, method:'POST' }
			//发送请求
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						uni.navigateTo({
							url:'index'
						})
						uni.removeStorageSync('lovelyPetsData')
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
