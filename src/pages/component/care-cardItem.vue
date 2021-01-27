<template>
	<view style="flex-direction: column;width: 240upx;height: 310upx;border-radius: 10px;display: inline-block;margin-right:5px;background-color: #FFFFFF;">
		<view style="position: absolute; text-align: right; width: 240upx; height: 60upx;">
			<image src="@/static/del.png" mode="aspectFill" style="width: 20upx; height: 20upx;margin: 16upx;" @click="del(list.userId)"></image>
		</view>
		<view style="width: 100%;height: 140upx;align-items:center;">
			<image :src="decodeURIComponent(list.userAvatar)" style="margin: 20upx 70upx;width: 110upx; height: 110upx;border-radius: 60upx;" @click="personalPage(list.userId)"></image>
		</view>
		<view style="display:flex;width: 100%;padding: 0 12upx;align-items: center;justify-content: center;">
			<p style="font-size: 24upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
				{{list.userNickname}}
			</p>                                     
			<!-- <view style="font-weight: bold;text-align: center;width: 200upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
				{{list.userNickname}}
			</view> -->
		</view>
		<view v-if="!list.careStatus" style="height: 50upx;text-align: center;background: #ffbf59;margin:10upx 70upx;border-radius:30upx;" @click="care(list.userId)">
			<text style="width: 80upx;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
		</view>
		<view v-if="list.careStatus" style="height: 50upx;text-align: center;border:2upx solid #ffbf59;margin:10upx 70upx;border-radius:30upx;" @click="care(list.userId)">
			<text style="width: 80upx;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
		</view>
		<view style="width: 100%;text-align: center;color: #b7b7b7;margin-bottom: 12upx;font-size: 20upx;">
			<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
				{{list.isFollow==1?'在关注你哦':'可能感兴趣的人 '}}
			</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				avatarUrl_default:"../../static/header_default.png",
				index: '',
				list: []
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			this.list = this.receiveObj.list;
			this.index = this.receiveObj.index;
		},
		methods: {
			del(e){
				this.$emit('fun_del',e)
			},
			care(e){
				this.$emit('func_care',e)
			},
			personalPage(e){
				this.$emit('func_personal',e)
			},
		}
	}
</script>

<style lang='scss' scoped> 
</style>