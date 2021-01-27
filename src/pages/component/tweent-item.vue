<template>
	<view class="content">
		<view v-if="item" style="flex-direction: column; padding:12upx 20upx;margin-bottom:8upx;background-color: #FFFFFF;">
			<view style="flex-direction: row;">
				<view style="width:100%;">
					<image  @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.postUserAvatar)"  style="width: 76upx;height: 76upx;border-radius: 50upx;"></image>
					<view @click="goActionItem_Details(item)" style="flex-direction: column; margin-left: 20upx;width: 80%;">
						<view style="width: 100%;align-items: center;line-height: 40upx;">
							<text v-if="item.postUserNickname" style="max-width: 80%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.postUserNickname}}
							</text>
							<image v-if="item.subjectInformationName" style="width: 30upx;height: 30upx;margin-left:20upx;margin-right: 6upx;" src="../../static/badge.png"></image>
							<text v-if="item.subjectInformationName" style="color: #b7b7b7;font-size: 20upx;">{{item.subjectInformationName}}</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text v-if="postTagIdArr.indexOf('1278492374447689730') == -1 && isShowType" style="margin-right:12upx;height: 28upx;line-height: 24upx;font-size: 20upx;padding:0 8upx;border-radius: 6upx;color: #b7b7b7;border: 2upx solid #b7b7b7;">
								{{typeText[item.postType]}}
							</text>
							<text v-if="postTagIdArr.indexOf('1278492374447689730') > -1 && isShowType" style="margin-right:12upx;height: 28upx;line-height: 24upx;font-size: 20upx;padding:0 8upx;border-radius: 6upx;color: #b7b7b7;border: 2upx solid #b7b7b7;">
								闲置
							</text>
							<text>{{item.timerAgo}}</text>
							<text v-if="item.postSource" style="margin-left: 20upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								来自{{item.postSource}}
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;"  >
				<view v-if="item.topicTitle" @click="gotoTopicListPage(item.postTopicId)" style="margin-top: 12upx;padding:12upx;display: inline-flex;align-items: center;border-radius: 10upx;background-color: #f9f9f9;align-items: center;">
					<image style="width: 24upx;height: 24upx;margin-right: 12upx;" src="@/static/actionImg/topic_ico.png"></image>
					<text style="color: #f76d45;font-size: 24upx;line-height: 24upx;">{{item.topicTitle}}</text>		
				</view>
			</scroll-view>
			
			<view v-if="(item.postTitle||item.postContent) && !isFold && item.postPublisher!=1" style="flex-direction: column;"  @click="goActionItem_Details(item)" >
				<view style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;" >
					{{item.postTitle?item.postTitle:item.postContent}}
				</view>
			</view>	
			<view v-if="(item.postTitle||item.postContent) && isFold  && item.postPublisher!=1" style="flex-direction: column;"  @click="goActionItem_Details(item)" >
				<view style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
					{{item.postTitle?item.postTitle:item.postContent}}
				</view>
			</view>	
			<view v-if="postTitleNumber>72 && item.postTitle  && item.postPublisher!=1" style="flex-direction: column;">
				<view @click="isFoldFunction" style="color: #f76d45;" >
					{{isFold?'收起':'全文'}}
				</view>
			</view>	
			<view v-if="postContentNumber>72 && !item.postTitle  && item.postPublisher!=1" style="flex-direction: column;">
				<view @click="isFoldFunction" style="color: #f76d45;" >
					{{isFold?'收起':'全文'}}
				</view>
			</view>	
			<view v-if="item.postContentType === 0" @click="goActionItem_Details(item)" style="flex-direction: column;">
				<view v-if="postImageArr && item.postPublisher!=1" style="flex-direction: row;width: 100%;flex-wrap: wrap;">
					<view v-if="postImageArr[0]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[0]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[0] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[1]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[1]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[1] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[2]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[2]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[2] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[3]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[3]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[3] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[4]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[4]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[4] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[5]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[5]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[5] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[6]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[6]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[6] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[7]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[7]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[7] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					<view v-if="postImageArr[8]" style="position: relative;width: 33%; height: 200upx; padding: 5upx;">
						<image :src="decodeURIComponent(postImageArr[8]) + '?x-oss-process=image/interlace,1/format,jpg'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
						<view v-if="postImageGifArr[8] === '1'" style="position: absolute;background: rgba(0,0,0,0);width: 100%;height:100%;padding: 0 16upx 16upx 0; align-items:flex-end;justify-content: flex-end;">
							<image style="width: 40upx;height: 24upx;" src="@/static/GIF.png"></image>
						</view>
					</view>
					
					<!-- <image v-if="postImageArr[0]" :src="decodeURIComponent(postImageArr[0]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[1]" :src="decodeURIComponent(postImageArr[1]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[2]" :src="decodeURIComponent(postImageArr[2]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[3]" :src="decodeURIComponent(postImageArr[3]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[4]" :src="decodeURIComponent(postImageArr[4]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[5]" :src="decodeURIComponent(postImageArr[5]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[6]" :src="decodeURIComponent(postImageArr[6]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[7]" :src="decodeURIComponent(postImageArr[7]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					<image v-if="postImageArr[8]" :src="decodeURIComponent(postImageArr[8]) + '?x-oss-process=image/format,jpg'" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image> -->
				</view>
				<view v-if="postImageArr && item.postPublisher==1" style="flex-direction: row;width: 100%;justify-content: center;padding: 10upx 0;">
					<image v-if="postImageArr[0]" :src="decodeURIComponent(postImageArr[0])" mode="aspectFill"  style="width:100%; height: 240upx; padding: 5upx;"></image>
				</view>
				<view v-if="item.postTitle && item.postPublisher==1" style="width: 100%;justify-content: center;padding-bottom: 10upx;font-size:32upx;color: #f77a06;">
					{{item.postTitle}}
				</view>
			</view>
			
			<view v-if="item.postContentType === 1" @click="goActionItem_Details(item)" style="position: relative;margin: 12upx 0;" v-bind:style="{width: videoWidth + 'px',height: videoHeight + 'px'}">
				<image style="width: 100%;height: 100%;" :src="item.postImage.split(',')[0]"></image>
				<view style="border-radius: 10upx;z-index: 2;position: absolute;background: rgba(0,0,0,0.4);width: 100%;height: 100%;align-items:center;justify-content: center;font-size: 40px;">
					<image style="width: 50upx;height: 50upx;" src="@/static/play.png"></image>
				</view>
				<view style="font-size: 12px;z-index: 3;position: absolute;color: #FFFFFF;width: 100%;height: 100%;align-items: flex-end;justify-content: flex-end;">
					<text style="width: 50%;margin: 6upx 20upx;">{{item.postPageViews}}次播放</text>
					<text style="width: 50%;margin: 6upx 20upx;text-align: end;">{{times}}</text>
				</view>
			</view>
			
			<view @click="goActionItem_Details(item)" style="flex-direction: row; width: 100%; margin-top: 12upx;">
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image v-if="!item.iupvoted" src="@/static/actionImg/thumbsup.png" style="width: 24upx; height:24upx; margin:0 5% 0 25%"></image>
					<image v-if="item.iupvoted" src="@/static/actionImg/thumbsup_over.png" style="width: 24upx; height:24upx; margin:0 5% 0 25%"></image>
					<text>{{item.postUpvoteCount}}</text>	
				</view>
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image src="@/static/actionImg/pinglun.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
					<text >{{item.postCommentCount}}</text>	
				</view>
				<view style="flex-direction: row;width: 33%; height: 30upx;line-height: 24upx; align-items: center;font-size: 24upx;">
					<image src="@/static/actionImg/see.png" style="width: 24upx; height: 24upx; margin:0 5% 0 25%"></image>
					<text >{{item.postPageViews}}</text>	
				</view>
			</view>
		</view>
		<!-- 底部更多操作弹窗 -->
		<uni-popup ref="showMore" type="bottom" style="z-index: 999;">
			<view style="flex-direction: column;width: 100%;color: #FFFFFF;padding: 60upx 0;background-color: #f9f9f9;">
				<view v-if="jubao_show" @click="jubao" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #444444;justify-content: center;align-items: center;">
					<text>举&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</text>
				</view>
				<view v-if="del_show" @click="del" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;">
					<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import qs from 'qs'
	export default{
		data(){
			return {
				typeText:["文章","笔记","动态","问答"],
				avatarUrl_default:"../../static/header_default.png",
				isFold:false,
				times:"",
				videoWidth:'',
				videoHeight:'160',
				postImageArr:[],
				postImageGifArr:[],
				postTagIdArr:[],
				postTitleNumber:'',
				postContentNumber:'',
				item:{},
				isShowType:false,
				del_show:false,
				jubao_show:false,
				more_Info:'',//点击更多 数据
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			if(this.receiveObj.obj.postContentType === 1){
				let obj = qs.parse(this.receiveObj.obj.postImage.split('?')[1])
				if(obj){
					let windowWidth = uni.getSystemInfoSync().windowWidth
					if(obj.h > obj.w){
						this.videoWidth = windowWidth * 0.45
						this.videoHeight = windowWidth * 0.6
					}
				}
				if(obj.duration){
					this.times = this.getTime(obj.duration)
				}
			}
			this.item = this.receiveObj.obj
			this.isShowType = this.receiveObj.isShowType
			this.postImageArr = this.receiveObj.obj.postImage.toString().split(',')
			this.postTagIdArr = this.receiveObj.obj.postTagId.toString().split(',')
			this.postTitleNumber = this.receiveObj.obj.postTitle.toString().length
			this.postContentNumber = this.receiveObj.obj.postContent.toString().length
			
			//收藏特殊处理
			if(this.receiveObj.obj.postType == 0 && this.receiveObj.obj.postImage==''){
				var str = this.receiveObj.obj.postContent.toString()
				//匹配图片（g表示匹配所有结果i表示区分大小写）
				var imgReg = /<img.*?(?:>|\/>)/gi;
				//匹配src属性
				var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
				var arr = str.match(imgReg);
				if(!arr){
					return;
				}
				for( var i=0;i<arr.length;i++){
					this.postImageArr[i] = arr[i].match(srcReg)[1]
				}
			}
			
			for( var j=0;j<this.postImageArr.length;j++){
				if(this.postImageArr[j]){
					this.postImageArr[j] = decodeURIComponent(this.postImageArr[j]).split("?")[0]
					if(this.postImageArr[j].indexOf(".gif") != -1){
						this.postImageGifArr.push("1")
					}else{
						this.postImageGifArr.push("0")
					}
				}
			}
			// console.log(this.postImageArr)
			// console.log(this.postImageGifArr)
		},
		computed: {
		},
		methods: {
			getTime(duration) {
				var min = parseInt(duration / 60);
				var sec = parseInt(duration % 60);
				return this.getType(min) + ":" + this.getType(sec);
			},
			getType(time) {
				return time<10 ? "0" + time : time.toString();
			},
			gotoTopicListPage(postTopicId){
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.postUserId
				})
			},
			//同城详情跳转
			goActionItem_Details(item) {
				if(item.postAuditStatus != 1){
					uni.showToast({
					    title: '正在审核中，请稍后点击查看',
						icon: 'none',
					    duration: 2000
					});
					return;
				}
				if(item.postType == 0 ){//文章
					uni.navigateTo({
						url:this.navigatorUrl.articleDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 1){//笔记
					uni.navigateTo({
						url:this.navigatorUrl.noteDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 2){//动态
					uni.navigateTo({
						url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.postId
					})
				}
				if(item.postType == 3){//问答
					uni.navigateTo({
						url:this.navigatorUrl.qaDetailsPages + '?id=' + item.postId
					})
					// if(item.postTagId.split(',').indexOf('1278492374447689730') > -1){
					// 	uni.navigateTo({
					// 		url:'/pages/post-qa?id='+item.postId+'&type='+item.postType + '&idle=' + 1
					// 	})
					// }else{
					// 	uni.navigateTo({
					// 		url:'/pages/post-qa?id='+item.postId+'&type='+item.postType + '&idle=' + 0
					// 	})
					// }
				}
			},
			
			isFoldFunction(){
				this.isFold = !this.isFold
			},
			moreClick(item){
				this.del_show = false;
				this.jubao_show = false;
				if(item.postUserId === uni.getStorageSync('userInfo').userId){
					this.del_show = true;
				}else{
					this.jubao_show = true;
				}
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.more_Info = item;
			},
			//举报
			jubao(){
				this.$refs.showMore.close()
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+ this.more_Info.postId + '&type=' + this.more_Info.postType
					})
				}else{
					uni.showToast({
						icon:'none',
						title: "请重新登录",
						duration: 1000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/login/account-login'
						})
					}, 500)
				}
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let token = uni.getStorageSync('token');
				if(token){
					let param={
						"postId":this.more_Info.postId,//对象Id
						"postType": this.more_Info.postType,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
					} ;
					let opts={ url:'/portal/v1/post/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								uni.navigateBack()
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
							}
						}
					)
				}else{
					uni.showToast({
						icon:'none',
						title: "请重新登录",
						duration: 1000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/login/account-login'
						})
					}, 500)
				}
			},
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
	    background-color: #FFFFFF;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
	}
	.card-num-view {
		background-color: #262929;
	    line-height: 1;
	    display: inline-block;
		padding: 3px 6px;
	    color: #FFFFFF;
	    /* font-size: 12px; */
	    text-align: center;
		justify-content: center;
	    align-items: center;
		border-radius: 15px;
		position: absolute;
		/* top: 20upx;
		right: 20upx; */
	}
	.card-list2-num-view {
		transform: scale(0.8);
	    transform-origin: right;
	}
	.noneStyle{
		display: none;
	}
</style>