<template>
	<view class="content">
		<view style="z-index: 2;flex-direction: column;width: 100%;padding: 12upx 20upx;background-color: #FFFFFF;margin-top: 2upx;">
			<view style="flex-direction: row;width: 100%;">
				<view style="width: 80%;height:100%;">
					<image  @click="click_user(recive_data.commentUserId)" :src="decodeURIComponent(recive_data.commentUserAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
					<view style="flex-direction: column; margin-left: 20upx;width: 80%;">
						<view style="width: 100%;align-items: center;">
							<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{recive_data.commentUserNickname}}
							</text>
							<text v-if="recive_data.commentUserIdISme" style="color: #b7b7b7;margin-right:12upx;">(作者)</text>
							<text style="font-size: 24upx;height: 30upx;line-height: 30upx;padding:0 4upx;background-color: #ffbf59;border-radius: 6upx;color: #FFFFFF;">
								{{recive_data.growthValue}}
							</text>
						</view>
						<text style="line-height: 40upx;color: #b7b7b7;font-size: 24upx;">{{recive_data.commentFriendlyDate}}</text>
					</view>
				</view>
				<view style="width:20%;height: 100%;justify-content: flex-end;align-items: center;">
					 <view @click="clcik_thumbsup_pinlun(recive_data)" style="align-items: baseline;margin-right: 40upx;">
						 <image :src="recive_data.iupvoted?zan_ico_over:zan_ico" style="width: 30upx; height: 30upx;margin-right: 10upx;"></image>
						 <text> {{recive_data.commentUpvoteCount}}</text>
					 </view>
					 <view @click="more(recive_data)" style="height: 100%;align-items: center;">
						<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
					 </view>
				</view>
			</view>
			<text @click="gotoHuifu_page(recive_data)" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;padding-top:12upx;" >
				{{recive_data.commentContent}}
			</text>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" ref="mixPulldownRefresh" class="panel-content" :top="100" :url="url" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box">
				<swiper-item>
					<scroll-view class="panel-scroll-box" scroll-y="true" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%">
							<view v-for="(item,index) in list" :key="index" style="flex-direction: column;width: 100%;padding: 10upx 20upx 10upx 100upx;background: #FFFFFF;margin-bottom: 2upx; ">
								<view style="flex-direction: row;width: 100%;">
									<view style="width: 80%;height:100%;">
										<image :src="decodeURIComponent(item.replyUserAvatar)"  style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
										<view style="flex-direction: column; margin-left: 10upx;">
											<view style="width: 100%;align-items: center;">
												<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
													{{item.replyUserNickname}}
												</text>
												<text v-if="recive_data.commentUserIdISme" style="color: #b7b7b7;margin-right:12upx;">(作者)</text>
												<text style="font-size: 24upx;height: 30upx;line-height: 30upx;padding:0 4upx;background-color: #ffbf59;border-radius: 6upx;color: #FFFFFF;">
													{{item.growthValue}}
												</text>
											</view>
											<text style="line-height: 40upx;color: #b7b7b7;font-size: 24upx;">{{item.commentFriendlyDate}}</text>
										</view>
									</view>
									<view style="width:20%;height: 100%;justify-content: flex-end;align-items: center;">
										<view @click="clcik_thumbsup_huifu(item)" style="align-items: baseline;margin-right: 40upx;">
											<image :src="item.iupvoted?zan_ico_over:zan_ico" style="width: 30upx; height: 30upx;margin-right: 10upx;"></image>
											<text> {{item.replyUpvoteCount}}</text>
										</view>
										<view @click="more(item,1)" style="height: 100%;align-items: center;">
											<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
										</view>
									</view>
								</view>
								<text @click="show_huifuInput(1,item)" style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;padding: 10upx 0 0 0;">
									<text v-if="item.replyType" style="color: #f76d45;">@{{item.replyTargetUserNickname}}：</text>
									{{item.replyContent}}
								</text>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<view class="foot" style="z-index: 2;">
			<chat-input style="width: 100%;" @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>
		<!-- 底部分享弹窗 -->
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
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import chatInput from '@/components/im-chat/chatinput.vue'; //input框
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		components: {
			chatInput,
		},
		data() {
			return {
				recive_data:Object,
				avatarUrl_default:"/static/header_default.png",
				zan_ico: "/static/actionImg/thumbsup.png",
				zan_ico_over: "/static/actionImg/thumbsup_over.png",
				
				limit:10,
				page:1,
				list:[],
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				url:'/static/loading.gif',
				
				input_placeholder: '发布评论', //占位内容
				focus: true, //是否自动聚焦输入框
				
				nowTargetData:Object,
				
				del_show:false,
				jubao_show:false,
				more_commentInfo:'',//点击更多对应的评论数据
				more_type:'',
				
				//回复类型   0:回复的评论  1:回复的回复
				replyType:''
			}
		},
		onLoad(e) {
			this.recive_data = JSON.parse(decodeURIComponent(e.data));
			//根据评论id查询详情
			let param={"commentId":this.recive_data.commentId} ;
			let str = '/portal/v1/comment/get/' + this.recive_data.commentId;
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.recive_data = res.data.data;
						this.recive_data.growthValue = this.calculation.groupArr(this.recive_data.growthValue).split(" ")[0]
						this.recive_data.commentFriendlyDate = friendlyDate(new Date(this.recive_data.createTime.replace(/\-/g,'/')).getTime(),this.recive_data.createTime)
						if(this.recive_data.commentUserId == this.recive_data.commentPostUserId){
							this.recive_data.commentUserIdISme = true
						}else{
							this.recive_data.commentUserIdISme = false
						}
						
						//默认回复输入框处理   1.点击评论 2.点击回复
						this.nowTargetData = {
							"replyCommentId": this.recive_data.commentId,
							"replyTargetId": "",
							"replyTargetUserId": "",
							"replyType": 0,
							"replyUserId": uni.getStorageSync('userInfo').userId,
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
			//下拉刷新
			this.onPulldownReresh()
		},
		methods: {
			blur: function() {
				this.focus = false;
			},
			show_huifuInput(value,data){
				this.replyType = value
				this.nowTargetData = {};
				if(value == 0){
					this.input_placeholder = '回复：@' + data.commentUserNickname; //占位内容
					
					this.nowTargetData = {
						"replyCommentId": data.commentId,
						"replyTargetId": "",
						"replyTargetUserId": "",
						"replyType": 0,
						"replyUserId": uni.getStorageSync('userInfo').userId,
					}
				}
				if(value == 1){
					this.input_placeholder = '回复：@' + data.replyUserNickname;//占位内容
					
					this.nowTargetData = {
						"replyCommentId": data.replyCommentId,
						"replyTargetId": data.replyId,
						"replyTargetUserId": data.replyUserId,
						"replyType": 1,
						"replyUserId": uni.getStorageSync('userInfo').userId,
						"replyUserNickname":data.replyUserNickname
					}
				}
				this.focus = true;
			},
			//发布回复
			send_comment: function(message) {
				// let param={
				// 	"replyCommentId": 0,//回复的评论id
				// 	"replyContent": "",//回复的内容
				// 	"replyTargetId": 0, //如果是对评论回复传'';如果是对回复的回复传回复的id
				// 	"replyTargetUserId": 0,//回复目标的id
				// 	"replyType": 0,       //0: 文章 1：笔记 2：动态 3：问答 4：新闻
				// 	"replyUserId": uni.getStorageSync('userInfo').userId,
				// } ;
				
				// #ifdef MP-QQ
				let userInfo = uni.getStorageSync('userInfo')
				if(uni.getStorageSync('token') && userInfo && userInfo.userPhoneNumber == ''){
					//免密登录 0； 找回密码 1； 绑定手机 2；
					uni.setStorageSync('typeLogin', 2);
					uni.navigateTo({
						url:'/pages/mine/login/login'
					})
					return
				}
				// #endif
				
				this.nowTargetData.replyContent =  message.content;
				let param = this.nowTargetData;
				let opts={ url:'/portal/v1/reply/add', method:'POST' };
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							// replyCommentId: "1254977514275606529"
							// replyTargetUserId: "1232658182002708482"
							
							//刷新 回复列表
							// this.onPulldownReresh()
							if(this.replyType == 0){//回复评论
								var obj = {};
								obj.iupvoted = 0;
								obj.replyContent = message.content;
								obj.replyId = res.data.data;
								obj.replyTargetUserNickname = "";
								obj.replyType = 0;
								obj.replyUpvoteCount = 0;
								obj.replyCommentId = this.nowTargetData.replyCommentId;
								obj.replyUserId = uni.getStorageSync('userInfo').userId;
								obj.replyUserAvatar = uni.getStorageSync('userInfo').userAvatar;
								obj.replyUserNickname = uni.getStorageSync('userInfo').userNickname;
								obj.growthValue = this.calculation.groupArr(uni.getStorageSync('userInfo').growthValue).split(" ")[0]
								var date = new Date();
								obj.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
								obj.commentFriendlyDate = friendlyDate(new Date(obj.createTime.replace(/\-/g,'/')).getTime(),obj.createTime)
								
								this.list.unshift(obj)
							}
							if(this.replyType == 1){//回复的回复
								var obj = {};
								obj.iupvoted = 0;
								obj.replyContent = message.content;
								obj.replyId = res.data.data;
								// debugger
								obj.replyTargetUserNickname = this.nowTargetData.replyUserNickname;
								obj.replyType = 1;
								obj.replyUpvoteCount = 0;
								obj.replyCommentId = this.nowTargetData.replyCommentId;
								obj.replyTargetUserId = this.nowTargetData.replyTargetUserId;
								obj.replyUserId = uni.getStorageSync('userInfo').userId;
								obj.replyUserAvatar = uni.getStorageSync('userInfo').userAvatar;
								obj.replyUserNickname = uni.getStorageSync('userInfo').userNickname;
								obj.growthValue = this.calculation.groupArr(uni.getStorageSync('userInfo').growthValue).split(" ")[0]
								var date = new Date();
								obj.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
								obj.commentFriendlyDate = friendlyDate(new Date(obj.createTime.replace(/\-/g,'/')).getTime(),obj.createTime)
								this.list.unshift(obj)
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
			
			//更多操作
			more(item,type){
				// //存贮对象数据用于举报删除
				this.more_commentInfo = item;
				this.more_type = type
				
				this.del_show = false;
				this.jubao_show = false;
				if(this.more_type)
				{//回复
					if(item.replyUserId === uni.getStorageSync('userInfo').userId){
						this.del_show = true;
					}else{
						this.jubao_show = true;
					}
				}else{//评论
					if(item.commentUserId === uni.getStorageSync('userInfo').userId){
						this.del_show = true;
					}else{
						this.jubao_show = true;
					}
				}
				this.$refs.showMore.open();
				
			},
			//举报
			jubao(){
				this.$refs.showMore.close()
				if(this.more_type){//回复
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+this.more_commentInfo.replyId  + '&type=6' 
					})
				}else{//评论
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+this.more_commentInfo.commentId  + '&type=5' 
					})
				}
			},
			//删除
			del(){
				this.$refs.showMore.close()
				if(this.more_type){//删除回复  刷新列表
					let param={"replyId":this.more_commentInfo.replyId} ;
					let opts={ url:'/portal/v1/reply/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								//刷新加载页面
								this.onPulldownReresh()
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
							}
						}
					)
				}else{//评论删除  返回上一页
					let param={"commentId":this.more_commentInfo.commentId} ;
					let opts={ url:'/portal/v1/comment/remove', method:'POST' }
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
				}
			},
			//点赞  评论
			clcik_thumbsup_pinlun(item){
				let param={
					"upvoteTargetId":item.commentId,//点赞对象Id
					"upvoteTargetType": 5,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.recive_data.iupvoted = !this.recive_data.iupvoted
							if(this.recive_data.iupvoted){
								this.recive_data.commentUpvoteCount ++
							}else{
								this.recive_data.commentUpvoteCount --
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
			//点赞  回复
			clcik_thumbsup_huifu(item){
				let param={
					"upvoteTargetId":item.replyId,//点赞对象Id
					"upvoteTargetType": 6,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							for(var i=0;i<this.list.length;i++){
								if(item.replyId == this.list[i].replyId){
									this.list[i].iupvoted = !this.list[i].iupvoted
									if(this.list[i].iupvoted){
										this.list[i].replyUpvoteCount ++
									}else{
										this.list[i].replyUpvoteCount --
									}
								}
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
			//下拉刷新
			onPulldownReresh(){
				this.list = [];
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				this.page ++
				this.loadMoreStatus = 1;
				this.loadNewsList('add');
			},
			loadNewsList(type){
				//type add 加载更多 refresh下拉刷新
				if(type === 'add'){
					if(this.loadMoreStatus === 2){
						return;
					}
					this.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if(type === 'refresh'){
					this.refreshing = true;
					// this.loadMoreStatus = 1
				}
				// #endif
				
				//获取回复表分页数据
				this.getReplyList(type)
			},
			//获取回复表分页数据
			getReplyList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"replyCommentId": this.recive_data.commentId,
					// "postUserId": uni.getStorageSync('userInfo').userId,
				}
				let opts={ url:'/portal/v1/reply/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								if(this.list.length<res.data.data.total)this.list = this.list.concat(res.data.data.records)
								for(var i=0;i<this.list.length;i++){
									this.list[i].growthValue = this.calculation.groupArr(this.list[i].growthValue).split(" ")[0]
									this.list[i].commentFriendlyDate = friendlyDate(new Date(this.list[i].createTime.replace(/\-/g,'/')).getTime(),this.list[i].createTime)
									if(this.list[i].replyUserId == this.list[i].replyTargetUserId){
										this.list[i].commentUserIdISme = true
									}else{
										this.list[i].commentUserIdISme = false
									}
								}
							}
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
						
						//刷新动画
						if(type === 'refresh'){
							this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							this.refreshing = false;
							// #endif
							this.loadMoreStatus = 2;
						}
						//上滑加载 处理状态
						if(type === 'add')this.loadMoreStatus = 2;
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
		height: 100upx;
		min-height: 100upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
</style>