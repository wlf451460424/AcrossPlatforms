<template>
	<view class="content">
		<view style="width: 100%;background-color: #FFFFFF;justify-content: center;">
			<view @click="favoriteMessage" style="width:33.3%;height: 150upx;align-items: center;justify-content: center;">
				<view style="width: 100%;height:100%;flex-direction: column;align-items: center;justify-content: center;">
					<view style="width:100%; height:80upx;display:flex;justify-content:center;align-items:center;">
						<image src="@/static/mine-ico/msg/favorite_ico.png" style="width: 50upx;height: 50upx;"></image>
						<view style="width: 30%;height: 100%;" >
							<uni-badge v-if="noReadFavoriteCount" class="uni-badge-left-margin" :text="noReadFavoriteCount" type="error" size="small" />
						</view>
					</view>
					<view style="width:100%; height: 50upx;display:flex;justify-content:center;align-items:center;">
						<text style="line-height: 50upx;">收藏</text>
						<view style="width: 30%;">
						</view>
					</view>
				</view>
			</view>
			<view @click="thumbsupMessage" style="width:33.3%;height: 150upx;align-items: center;justify-content: center;">
				<view style="width: 100%;height:100%;flex-direction: column;align-items: center;justify-content: center;">
					<view style="width:100%; height:80upx;display:flex;justify-content:center;align-items:center;">
						<image src="@/static/mine-ico/msg/thumbsup_ico.png" style="width: 50upx;height: 50upx;"></image>
						<view style="width: 30%;height: 100%;" >
							<uni-badge v-if="noReadThumbsupCount" class="uni-badge-left-margin" :text="noReadThumbsupCount" type="error" size="small" />
						</view>
					</view>
					<view style="width:100%; height: 50upx;display:flex;justify-content:center;align-items:center;">
						<text style="line-height: 50upx;">收到的赞</text>
						<view style="width: 30%;">
						</view>
					</view>
				</view>
			</view>
			<view @click="commentMessage" style="width:35%;height: 150upx;align-items: center;justify-content: center;">
				<view style="width: 100%;height:100%;flex-direction: column;align-items: center;justify-content: center;">
					<view style="width:100%; height:80upx;display:flex;justify-content:center;align-items:center;">
						<image src="@/static/mine-ico/msg/comment_ico.png" style="width: 50upx;height: 50upx;"></image>
						<view style="width: 30%;height: 100%;" >
							<uni-badge v-if="noReadCommentCount" class="uni-badge-left-margin" :text="noReadCommentCount" type="error" size="small" />
						</view>
					</view>
					<view style="width:100%; height: 50upx;display:flex;justify-content:center;align-items:center;">
						<text style="line-height: 50upx;">收到的评论</text>
						<view style="width: 30%;">
						</view>
					</view>
				</view>
			</view>
		</view>	
		
		<view style="flex-direction: column;width: 100%;margin-top: 8upx;">
			<view @click="petMessage" style="flex-direction: row;width: 100%;height: 100upx;line-height: 100upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 40%;height: 100%;align-items: center;">
					<image src="@/static/mine-ico/msg/plan_ico.png" style="width: 45upx;height: 45upx;"></image>
					<text style="margin-left: 30upx;">宠物计划</text>
				</view>
				<view style="width: 35%;height: 100%;align-items: center;justify-content: flex-end;">
					<text style="font-size: 12px;color: #888888;"></text>
				</view>
				<view style="width: 25%;height: 100%;align-items: center;justify-content: flex-end;" >
					<uni-badge v-if="petPlanCount" class="uni-badge-left-margin" :text="petPlanCount" type="error" size="small" />
					<image style="width: 16upx;height: 26upx;margin-left: 20upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>
		<view style="flex-direction: column;width: 100%;margin-top: 2upx;">
			<view @click="noticeMessage" style="flex-direction: row;width: 100%;height: 100upx;line-height: 100upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 40%;height: 100%;align-items: center;">
					<image src="@/static/mine-ico/msg/notice_ico.png" style="width: 45upx;height: 45upx;"></image>
					<text style="margin-left: 30upx;">系统公告</text>
				</view>
				<view style="width: 45%;height: 100%;align-items: center;justify-content: flex-end;">
					<text style="font-size: 12px;color: #888888;"></text>
				</view>
				<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>
		<view style="flex-direction: column;width: 100%;margin-top: 2upx;">
			<view @click="officialMessage" style="flex-direction: row;width: 100%;height: 100upx;line-height: 100upx;background-color: #FFFFFF;padding: 20upx;">
				<view style="width: 40%;height: 100%;align-items: center;">
					<image src="@/static/mine-ico/msg/officia.png" style="width: 45upx;height: 45upx;"></image>
					<text style="margin-left: 30upx;">官方消息</text>
				</view>
				<view style="width: 45%;height: 100%;align-items: center;justify-content: flex-end;">
					<text style="font-size: 12px;color: #888888;"></text>
				</view>
				<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
					<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge/uni-badge.vue';
	import uniSection from '@/components/uni-badge/uni-section/uni-section.vue'
	export default{
		components: {
			uniBadge,
			uniSection
		},
		data() {
			return {
				petPlanCount:'',
				noReadCommentCount:'',
				noReadFavoriteCount:'',
				noReadThumbsupCount:''
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			if(token){
				//获取   当前用户未处理的计划通知数
				this.getNoreadPlanMessage()
				//当前用户获取未读消息数量
				this.getNoreadMessage()
			}
		},
		methods: {
			//当前用户未处理的计划通知数
			getNoreadPlanMessage(){
				let param={}
				let opts={ url:'/portal/v1/notification/get_pending_count', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.petPlanCount = res.data.data
							if(this.petPlanCount>99)this.petPlanCount="99+"
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
			//当前用户获取未读消息数量
			getNoreadMessage(){
				let param={}
				let opts={ url:'/portal/v1/message/get/noread/count', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.noReadCommentCount = Number(res.data.data.messageCommentCount) + Number(res.data.data.messageReplyCount);//未读评论消息数量
							this.noReadFavoriteCount = res.data.data.messageFavoriteCount;//未读收藏消息数量
							this.noReadThumbsupCount = res.data.data.messageUpvoteCount;//未读点赞消息数量
							
							if(this.noReadCommentCount>99)this.noReadCommentCount="99+"
							if(this.noReadFavoriteCount>99)this.noReadFavoriteCount="99+"
							if(this.noReadThumbsupCount>99)this.noReadThumbsupCount="99+"
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
			thumbsupMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-thumbsup'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			favoriteMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-favorite'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			commentMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-comment'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			petMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-pet-plan?type=0'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			noticeMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-notification'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
			},
			officialMessage(){
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'msg-officia'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}
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
