<template>
	<view class="content">
		<view style="z-index: 2;flex-direction: column;width: 100%;padding: 12upx 20upx;background-color: #FFFFFF;margin: 2upx 0;">
			<view style="flex-direction: row;width: 100%;height: 80upx;">
				<view style="width: 60%;height:100%;">
					<image :src="decodeURIComponent(recive_data.userAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
					<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
						<view style="width: 100%;align-items: center;">
							<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{recive_data.userNickname}}
							</text>
							<text v-if="recive_data.commentUserIdISme" style="color: #b7b7b7;margin-right:12upx;">(发布者)</text>
						</view>
						<text style="line-height: 40upx;color: #b7b7b7;">{{recive_data.commentFriendlyDate}}</text>
					</view>
				</view>
				<view style="width:40%;height: 100%;justify-content: flex-end;align-items: center;padding-right: 20upx;">
					<view style="width: 60%;align-items: center;justify-content: flex-end;margin-right: 30upx;">
						<view class="example-body">
							<uni-rate :value="recive_data.evaluationScore" disabled="false" />
						</view>
					</view>
					<view @click="more(recive_data,0)" style="height: 100%;align-items: center;">
						<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
					</view>
				</view>
			</view>
			<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding-top: 12upx;">
				{{recive_data.evaluationContent}}
			</text>
		</view>
		<view v-if="this.recive_data.replyCount==0" style="width: 100%;line-height: 80upx;justify-content: center;color: #AAAAAA;">
			没有更多数据了
		</view>
		<!-- 回复详情 -->
		<view v-if="this.recive_data.replyCount>0" style="flex-direction: column; width: 100%;background: #FFFFFF">
			<view style="flex-direction: column;width: 100%;padding: 12upx 20upx 12upx 100upx;">
				<view style="flex-direction: row;width: 100%;">
					<view style="width: 70%;height:100%;">
						<image :src="decodeURIComponent(replyData.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
						<view style="flex-direction: column; margin-left: 20upx;width: 75%;">
							<view style="width: 100%;align-items: center;">
								<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
									{{replyData.userNickname}}
								</text>
								<text style="color: #B7B7B7;margin-left:12upx;">(发布者)</text>
							</view>
							<text style="line-height: 40upx;color: #b7b7b7;">{{replyData.replyFriendlyDate}}</text>
						</view>
					</view>
					<view style="width:30%;height: 100%;justify-content: flex-end;align-items: center;padding-right:20upx;">
						<image @click="more(replyData,1)" src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
					</view>
				</view>
				<text style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding-top: 12upx;">
					{{replyData.evaluationReplyContent}}
				</text>
			</view>
		</view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
					<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
	import uniSection from '@/components/rate/uni-section/uni-section.vue'
	export default {
		components: {
			uniRate,
			uniSection
		},
		data() {
			return {
				recive_data:Object,
				replyData:Object,
				avatarUrl_default:"/static/header_default.png",
				
				jubao_Info:Object,//举报参数
				commentId:'',
				serviceType:''
			}
		},
		onLoad(e) {
			this.commentId = e.id;
			this.serviceType = e.type;
			
			//根据评论id查询详情
			let param={"evaluationId":this.commentId} ;
			let str = '/portal/v1/evaluation/get/' + this.commentId;
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.recive_data = res.data.data;
						this.recive_data.evaluationScore = this.recive_data.evaluationScore
						this.recive_data.commentFriendlyDate = friendlyDate(new Date(res.data.data.createTime.replace(/\-/g,'/')).getTime(),res.data.data.createTime)
						if(this.recive_data.replyCount > 0){
							////获取回复详情
							this.getReplyDetails()
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
		methods: {
			//更多操作
			more(item,type){
				this.$refs.showMore.open();
				if(this.serviceType == 0){ // 0：寄养   1：领养
					 //7: 寄养场所 8：寄养场所评价 9：寄养场所回复
					if(type == 0){//评价
						// //存贮评论数据用于举报删除
						this.jubao_Info.id = this.recive_data.evaluationId
						this.jubao_Info.type = 8  
					}else{//回复
						// //存贮评论数据用于举报删除
						this.jubao_Info.id = item.evaluationReplyId 
						this.jubao_Info.type = 9  
					}
				}else{
					//11. 配对详情 12. 配对详情评价 13. 配对详情回复
					if(type == 0){//评价
						// //存贮评论数据用于举报删除
						this.jubao_Info.id = this.recive_data.evaluationId
						this.jubao_Info.type = 12   
					}else{//回复
						// //存贮评论数据用于举报删除
						this.jubao_Info.id = item.evaluationReplyId 
						this.jubao_Info.type = 13 
					}
				}
				
			},
			//举报
			jubao(){
				this.$refs.showMore.close()
				uni.navigateTo({   //7: 寄养场所 8：寄养场所评价 9：寄养场所回复
					url:'/pages/discover/report/index?id='+this.jubao_Info.id + '&type='  + this.jubao_Info.type
				})
			},
			
			//获取回复详情
			getReplyDetails(){
				let param={
					"limit": this.limit,
					"page": this.page,
					"evaluationReplyId": this.recive_data.evaluationReplyId,
				}
				let str = '/portal/v1/evaluation_reply/get/' + this.recive_data.evaluationReplyId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							this.replyData = res.data.data
							this.replyData.replyFriendlyDate = friendlyDate(new Date(this.replyData.updateTime.replace(/\-/g,'/')).getTime(),this.replyData.updateTime)
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

<style lang='scss' scoped>
	view{
		display: flex;
	}
	page, .content{
		color: #5c5f66;
		background-color: #f9f9f9;
		height: 100%;
		width: 100%;
		overflow: hidden;
		flex-direction: column;
	}
	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		margin: 2upx 0 100upx;
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0;
		overflow: hidden;
	}
</style>