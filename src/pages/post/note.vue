<template>
	<view class="content">
		<view v-if="query_data.postAuditStatus!= 0 && query_data.isDeleted == 0  && query_data.postStatus != 2">
			<view style="flex-direction: column;width: 100%; margin-bottom: 100upx;">
				<swiper v-if="query_data.postContentType === 0" @click="gotoImageShow(query_data.postImage)" class="swiper-style" :circular="true" indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				  <swiper-item v-for="(item,index) in postImage" :key="index">
					<image :src="decodeURIComponent(item)" mode="aspectFill"></image>
				  </swiper-item>
				</swiper>
				
				<view v-if="query_data.postContentType === 1 && query_data.postAuditStatus === 1" style="position: relative;padding:0 24upx;height: 396upx;background: #FFFFFF;">
					<!-- #ifdef H5 -->
					<div  class="prism-player" id="J_prismPlayer"></div>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view style="display: flex;width: 100%;height: 100%;justify-content: center;">
						<video :src="sourceUrl" autoplay="true" loop="true" direction="90" object-fit="contain" play-btn-position="center"></video>
					</view>
					<!-- #endif	 -->
				</view>
				<view v-if="query_data.postAuditStatus === 2" style="position: relative;margin-top: 12upx;height: 390upx;">
					<view style="border-radius: 10upx;z-index: 2;position: absolute;background: rgba(0,0,0,1);width: 100%;height: 100%;align-items:center;justify-content: center;flex-direction: column;">
						<image style="width: 50upx;height: 50upx;" src="@/static/weigui.png"></image>
						<text style="color: #FFFFFF;">审核未通过，请重新上传</text>
					</view>
				</view>
				
				<view style="flex-direction: column; padding:24upx 24upx 0 24upx;background-color: #FFFFFF;">
					<text style="font-size: 36upx;font-weight: 700;display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">
						{{query_data.postTitle}}
					</text>
					<view style="flex-direction: row;width: 100%;padding: 12upx 0;">
						<view style="width:80%;">
							<image @click="click_user(query_data.postUserId)" :src="decodeURIComponent(query_data.postUserAvatar)" mode="aspectFill"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
							<view style="flex-direction: column; margin-left: 20upx;width: 80%;">
								<view style="width: 100%;align-items: center;">
									<text style="max-width: 50%;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
										{{query_data.postUserNickname}}
									</text>
									<image v-if="query_data.subjectInformationName" style="width: 30upx;height: 30upx;margin-left:20upx;margin-right: 6upx;" src="../../static/badge.png"></image>
									<text v-if="query_data.subjectInformationName" style="color: #b7b7b7;font-size: 20upx;">{{query_data.subjectInformationName}}</text>
									<text style="font-size: 20upx;height: 30upx;line-height:30upx;margin-left: 20upx;padding:0 10upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
										{{query_data.growthValue}}
									</text>
								</view>
								<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 20upx;overflow: hidden;">
									<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
										<text style="margin-right: 20upx;">{{postFriendlyDate}}</text>
										<text v-if="query_data.postSource">来自{{query_data.postSource}}</text>
									</text>
								</view>
							</view>
						</view>
						<view style="width: 20%;justify-content: flex-end;">
							<view v-if="query_data.isShowCareBtn && !query_data.isMyself" @click="ClickCareBtn(query_data)" style="width: 80%;justify-content: center;align-items: center;">
								<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
									<text style="line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
								</view>
							</view>
							<view v-if="!query_data.isShowCareBtn && !query_data.isMyself" @click="ClickCareBtn(query_data)" style="width: 80%;justify-content: center;align-items: center;">
								<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
									<text style="line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
								</view>
							</view>
							<!-- <image @click="shareClick" src="@/static/actionImg/more.png" style="width: 38upx; height: 12upx;"></image> -->
						</view>
					</view>
					
					<view style="flex-direction: column;">
						<!-- #ifdef H5 -->
						<view :class="{active:allContent}" style="width: 100%;max-height: 350px;overflow: hidden;flex-direction: column;">
							<!-- <rich-text class="richText" :nodes="query_data.postContent" ></rich-text> -->
							<text>{{query_data.postContent}}</text>
						</view>
						<text :class="{active:allContent}" @click="showAllText" style="width: 100%;line-height: 60upx;text-align:center;color: #f76d45;">
							点击阅读全文
						</text>
						<view :class="{active:!allContent}" class="contentStyle" ref="getheight" style="flex-direction: column;">
							<!-- <rich-text class="richText" :nodes="query_data.postContent"></rich-text> -->
							<text>{{query_data.postContent}}</text>
						</view>
						<!-- #endif -->
						
						<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
						<view style="flex-direction: column;">
							<!-- <rich-text class="richText" :nodes="query_data.postContent"></rich-text> -->
							<text>{{query_data.postContent}}</text>
						</view>
						<!-- #endif -->
					</view>
					
					<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;color: #888888;margin-top:12upx;"  >
						<view v-if="query_data.topicTitle" @click="gotoTopicListPage(query_data.postTopicId)" style="margin-top: 12upx;padding:12upx;display: inline-flex;align-items: center;border-radius: 30upx;background-color: #f9f9f9;align-items: center;margin-right: 20upx;">
							<image style="width: 24upx;height: 24upx;margin-right: 12upx;" src="@/static/actionImg/topic_ico.png"></image>
							<text style="color: #f76d45;font-size: 24upx;line-height: 24upx;">{{query_data.topicTitle}}</text>		
						</view>
						<view v-for="(item,index) in postLabel" v-model="postLabel" :key="index" @click="gotoTagListPage(item,query_data.postType)" style="line-height: 36upx;padding: 0 16upx 3upx;display: inline-block;margin-right: 20upx;border: 1px solid #f76d45;align-items: center;border-radius: 30upx;">
							<text style="color: #f76d45;font-size: 24upx;">{{item.tagName}}</text>		
						</view>
					</scroll-view>
					<view style="flex-direction: row;width: 100%;color: #b7b7b7;align-items: center;margin:12upx 0;"  >
						<view style="flex-direction: row;width: 80%;align-items: center;">
							<image v-if="query_data.postPoi" src="@/static/actionImg/Location_ico.png" style="width: 24upx;height:28upx;margin-right: 10upx;"></image>
							<text style="width: 90%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;overflow: hidden;font-size: 24upx;">
								{{query_data.postPoi}}
							</text>		
						</view>
						<view style="flex-direction: row;width:20%;justify-content: flex-end;align-items: center;font-size: 24upx;color: #5c5f66;">
							<image src="@/static/actionImg/see.png" style="width: 28upx; height: 28upx;margin: 0 10upx;"></image>
							<text >{{query_data.postPageViews}}</text>	
						</view>
					</view>
					
					<!-- 手风琴效果 -->
					<view v-if="query_data.featurePostVos.length ==1" @click="gotoFeatureDetailsPages(query_data.featurePostVos[0].featurePostFeatureId)" style="flex-direction: row;width: 100%;height: 70upx;align-items: center;background-color: #f1f1f1;padding: 0 12upx;border-radius: 6upx;"  >
						<view style="width: 90%;">
							<text style="margin-right: 20upx;font-weight: bold;">{{query_data.featurePostVos[0].featureName}}</text>
							收录了该内容  
						</view>
						<view style="width: 10%;justify-content: flex-end;">
							<image src="@/static/mine-ico/next.png" style="width: 16upx; height: 26upx;margin-left: 20upx;"></image>
						</view>
					</view>
					<uni-collapse accordion="true" v-if="query_data.featurePostVos.length > 1">
					    <uni-collapse-item :title="query_data.featurePostVos[0].featureName" title1=" 等收录了该内容"  style="">
					        <view v-for="(item,index) in query_data.featurePostVos" :key="index" @click="gotoFeatureDetailsPages(item.featurePostFeatureId)"
								style="height: 70upx;align-items: center;border-bottom: 2upx solid #F9F9F9;padding: 0 20upx;">
								<view style="width: 90%;">
									{{item.featureName}}
								</view>
								<view style="width: 10%;justify-content: flex-end;">
									<image src="@/static/mine-ico/next.png" style="width: 16upx; height: 26upx;margin-left: 20upx;"></image>
								</view>
					        </view>
					    </uni-collapse-item>
					</uni-collapse>
					<view style="width: 100%;height: 20upx;"></view>
				</view>
				
				<view style="flex-direction: row;width: 100%; height: 100upx; line-height: 100upx;margin-top: 2upx;background-color: #FFFFFF;padding: 0 24upx;
					align-items: center;">
					<view style="min-width: 5%;max-width: 20%;flex-direction: column;justify-content: center;margin-right: 40upx;font-size: 24upx;color: #b7b7b7;" @click="clcik_thumbsup">
						<image :src="query_data.iupvoted?zan_ico_over:zan_ico" style="width: 30upx; height: 30upx; margin-top: 10upx;"></image>
						<text> {{upvoteTotal}}</text>	
					</view>
					<scroll-view scroll-x="true" style="min-width: 75%;max-width: 90%;white-space: nowrap;flex-direction: row;height: 60upx;line-height: 70upx;align-items: center; color: #888888;"  >
						<view v-for="(item,index) in upvoteList" :key="index" @click="click_user(item.upvoteUserId)"  style="white-space: nowrap;margin-right: 10upx;display: inline-block;height: 60upx;">
							<image :src="decodeURIComponent(item.upvoteUserAvatar)" mode="aspectFill" style="width: 60upx;height: 60upx;border-radius: 35upx;display: inline-block;"></image>
						</view>
						<image v-if="upvoteList.length" @click="thumbsup_list"  src="@/static/actionImg/more_bg.png" style="width: 60upx; height: 60upx;display: inline-block;"></image>
					</scroll-view>
					<view style="width: 5%;justify-content: flex-end;">
						<image  @click="thumbsup_list" src="@/static/mine-ico/next.png" style="width: 16upx; height: 26upx;margin-left: 20upx;"></image>
					</view>
				</view>
				
				<view style="flex-direction: row;width: 100%; height: 80upx; line-height: 100upx;margin-top: 8upx;
					align-items: center;padding:0 24upx; background-color: #FFFFFF;"  >
					<view style="width: 50%;">
						<text style="color: #333333;font-weight: bold;">评论 </text>（
						<text>{{commentTotal}}</text>）
					</view>
					<!-- <view style="width: 50%;justify-content: flex-end;">
						<text @click="gotoPinlun_page">查看全部</text>
					</view> -->
				</view>
				<view v-if="commentList.length" style="flex-direction: column;width: 100%;">
					<view v-for="(item,index) in commentList" :key="index" style="flex-direction: column;width: 100%;padding:12upx 24upx;background-color: #FFFFFF;margin-bottom: 2upx; ">
						<view style="flex-direction: row;width: 100%;height: 80upx;">
							<view style="width: 80%;height:100%;">
								<image  @click="click_user(item.commentUserId)" :src="decodeURIComponent(item.commentUserAvatar)" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
								<view style="flex-direction: column; margin-left: 20upx;width: 80%;">
									<view style="width: 100%;align-items: center;">
										<text style="max-width: 75%;margin-right:12upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
											{{item.commentUserNickname}}
										</text>
										<text v-if="item.commentUserIdISme" style="color: #b7b7b7;margin-right:12upx;">(作者)</text>
										<text style="font-size: 24upx;height: 30upx;line-height: 30upx;padding:0 4upx;background-color: #ffbf59;border-radius: 6upx;color: #FFFFFF;">
											{{item.growthValue}}
										</text>
									</view>
									<text style="line-height: 40upx;color: #b7b7b7;font-size: 24upx;">{{item.commentFriendlyDate}}</text>
								</view>
							</view>
							<view style="width:20%;height: 100%;justify-content: flex-end;align-items: center;">
								 <view @click="clcik_thumbsup_pinlun(item)" style="align-items: baseline;margin-right: 40upx;">
									 <image :src="item.iupvoted?zan_ico_over:zan_ico" style="width: 30upx; height: 30upx;margin-right: 10upx;"></image>
									 <text> {{item.commentUpvoteCount}}</text>
								 </view>
								 <view @click="more(item)" style="height: 100%;align-items: center;">
								 	<image src="@/static/actionImg/more.png" style="width: 44upx; height: 10upx;"></image>
								 </view>
							</view>
						</view>
						<text @click="gotoHuifu_page(item)" v-if="item.commentContent && !isFold" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;padding-top:12upx;" >
							{{item.commentContent}}
						</text>
						<text @click="gotoHuifu_page(item)" v-if="item.commentContent && isFold" style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;padding-top:12upx;" >
							{{item.commentContent}}
						</text>
						<view v-if="item.commentContent.length>72" @click="isFoldFunction" style="color: #f76d45;" >
							{{isFold?'收起':'全文'}}
						</view>
						<view @click="gotoHuifu_page(item)" v-if="item.replyCount>0?true:false" style="width: 100%;height: 50upx;">
							<text style="padding: 0 12upx;background-color: #f1f1f1;border-radius: 10upx;">{{item.replyCount}}条回复</text>		
						</view>
					</view>
				</view>
				<view v-if="commentTotal>5" @click="gotoPinlun_page" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;background-color: #FFFFFF;margin-top: 2upx;">
					<!-- #ifdef H5  -->
					<text style="color: #f76d45;">打开APP查看更多评论</text>	
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
					<text style="color: #f76d45;">查看更多评论</text>	
					<!-- #endif -->
				</view>
				<view v-if="commentTotal==0" style="width: 100%;height:80upx;align-items:center;justify-content: center;color: #f76d45;background-color: #FFFFFF;margin-top: 2upx;">
					<!-- <text>更多评论...</text>	 -->	
					<text style="color: #b7b7b7;">快去发布你的评论吧</text>	
				</view>
			</view>
			
			<view class="foot" >
				<chat-input style="width:100%;" @send-message="send_comment" @blur="blur" @onfocus="onfocus" :focus="focus" :placeholder="input_placeholder"></chat-input>
			</view>
			<view class="foot_mask" v-if="!query_data.postStatus" @click="commentMask">
			</view>
			
			<view class="foot" :class="{chat_style_1:false}">
				<chat-input style="width:100%;" @send-message="send_comment" @blur="blur" @onfocus="onfocus" :focus="focus" :placeholder="input_placeholder"></chat-input>
			</view>
			<view class="foot_mask" :class="{chat_style_1:false}" v-if="!query_data.postStatus && !commentORupvote" @click="commentMask">
			</view>
			
			<view class="foot_right" :class="{chat_style_2:false}">
				<view @click="clcik_thumbsup" style="width:100%; height: 100upx;justify-content:center;align-items:center;">
					<image :src="query_data.iupvoted?zan_ico_over:zan_ico"  style="width: 40upx; height: 40upx;"></image>
				</view>
				<view @click="clcik_favorite" style="width:100%; height: 100upx;justify-content:center;align-items:center;">
					<image :src="query_data.ifavorited?collect_ico_over:collect_ico" style="width: 40upx; height: 40upx;"></image>
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
			
			<!-- 底部分享弹窗 -->
			<uni-popup ref="showshare" type="bottom" @change="change" style="z-index: 999;">
				<view class="uni-share">
					<text class="uni-share-title">分享到</text>
					<view style="display: flex;flex-direction: column;padding: 20upx 20upx;">
						<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;padding: 20upx;border-bottom: 1px solid #eeeeee;"  >
							<view v-for="(item,index) in this.shareAppp" :key="index" @click="shareItemClick(item.index)"
									style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image :src="item.icon" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >{{ item.text }}</text>	
								</view>
							</view>
						</scroll-view>
						<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;padding:20upx;"  >
							<view @click="postLink" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="@/static/shar_img/link.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >链接</text>	
								</view>
							</view>
							<view v-if="!query_data.isMyself" @click="postReport" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="@/static/shar_img/Report.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >举报</text>	
								</view>
							</view>
							<view v-if="query_data.isMyself" @click="postDel" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;">
									<image src="@/static/shar_img/del.png" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text >删除</text>	
								</view>
							</view>
							<view @click="clcik_favorite" style="display: inline-block;width: 25%;height: 160upx;justify-content: center;">
								<view style="width: 100%;justify-content: center;height: 100upx;align-items: center;">
									<image :src="query_data.ifavorited?favoriteImage_over:favoriteImage" style="width: 100upx;height: 100upx;" />
								</view>
								<view style="width: 100%;justify-content: center;">
									<text>{{query_data.ifavorited?'已收藏':'收藏'}}</text>	
								</view>
							</view>
						</scroll-view>
					</view>
					<button type="primary" style="width: 100%;height: 90upx;line-height: 90upx;font-size: 16px;background-color: #FFFFFF; color: #333333;" @click="cancel('share')">取消</button>
				</view>
			</uni-popup>
		
			<uniPopup ref="app_uniPopup" :mask-click="false" type="center">
				<view class="uni-tip">
					<text class="uni-tip-content" >是否打开甜宠APP阅读全文？</text>
					<view class="uni-tip-group-button">
						<text class="uni-tip-button" style="color: #f76d45;" @click="app_cancel()">取消</text>
						<text class="uni-tip-button" style="color: #f76d45;" @click="app_confirm()">确定</text>
					</view>
				</view>
			</uniPopup>
			
			<uniPopup ref="share_uniPopup" :mask-click="false" type="center">
				<view class="uni-tip">
					<text class="uni-tip-content" >链接已复制</text>
					<text class="uni-tip-content" style="color: #AAAAAA;" >快去粘贴给你好友吧</text>
					<text class="uni-tip-button" style="color: #f76d45;margin-top: 20upx;padding-top: 20upx;border-top: 1px solid #e7e7e7;" @click="share_confirm()">我知道了</text>
				</view>
			</uniPopup>
		</view>
		
		<view v-if="query_data.postAuditStatus == 0 && query_data.isDeleted == 0 && query_data.postStatus != 2" style="margin-top: 30%;width: 100%;height: 100%;flex-direction: column;align-items: center;justify-content: center;">
			<image style="width: 90upx;height: 90upx;margin-bottom: 40upx;" src="@/static/actionImg/banned.png"></image>
			<text style="font-size:28upx;color: #b7b7b7;">
				正在审核中，请稍后查看
			</text>
		</view>
		
		<view v-if="query_data.isDeleted == 1 && query_data.postStatus != 2" style="margin-top: 30%;width: 100%;height: 100%;flex-direction: column;align-items: center;justify-content: center;">
			<image style="width:320upx;height: 240upx;margin-bottom: 20upx;" src="@/static/actionImg/404.png"></image>
			<text style="font-size:28upx;color: #b7b7b7;">
				这篇文章已删除
			</text>
		</view>
		<view v-if="query_data.postStatus == 2" style="margin-top: 30%;width: 100%;height: 100%;flex-direction: column;align-items: center;justify-content: center;">
			<image style="width: 90upx;height: 90upx;margin-bottom: 40upx;" src="@/static/actionImg/banned.png"></image>
			<text style="font-size:28upx;color: #b7b7b7;">
				当前文章因违反  
				<text @click="agree" style="font-size:28upx;color: #f76d45;">《甜宠社区规范》</text>
				相关规定，
			</text>
			<text style="font-size:28upx;color: #b7b7b7;">现已无法查看</text>
		</view>
		
		<!-- #ifdef H5 -->
			<cover-view v-if="query_data.isDeleted == 0  && query_data.postStatus != 2" class="controls-title" @click="gotoPinlun_page"
				style="position:fixed;z-index:999;bottom:120upx;left: 40%;right: 40%;font-size: 24upx;width:20%;height:55upx;border-radius:80upx;line-height: 55upx;text-align: center;background-color: #ffbf59;color: #FFFFFF;box-shadow: #ffbf59 2upx 2upx 20upx;justify-content: center;align-items: center;">
				APP内打开
			</cover-view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import chatInput from '@/components/im-chat/chatinput.vue'; //input框
	import h5Copy  from '@/components/h5-copy/junyi-h5-copy.js';
	 import uniCollapse from '@/components/uni-collapse-group/uni-collapse/uni-collapse.vue';
	 import uniCollapseItem from '@/components/uni-collapse-group/uni-collapse-item/uni-collapse-item.vue';
	export default {
		components: {
			chatInput,
			uniCollapse,
			uniCollapseItem,
		},
		data() {
			return {
				isFold:false,
				favoriteImage:"../../static/shar_img/favorite.png",
				favoriteImage_over:"../../static/shar_img/favorite_over.png",
				avatarUrl_default:"../../static/header_default.png",
				recive_data: Object,
				query_data:Object,
				postImage:[],//帖子图片
				topicTitle:'',
				postLabel:[],//帖子标签
				
				zan_ico: "../../static/actionImg/thumbsup.png",
				zan_ico_over: "../../static/actionImg/thumbsup_over.png",
				collect_ico: "../../static/actionImg/collect.png",
				collect_ico_over: "../../static/actionImg/collect_over.png",
				
				input_placeholder: '发布评论...', //占位内容
				focus: false, //是否自动聚焦输入框
				
				upvoteTotal:0,//点赞总数
				upvoteList:[],//点赞列表
				
				commentTotal:0,//评论总数
				commentList:[],//评论列表
				showInputChatBoolen:false,
				
				del_show:false,
				jubao_show:false,
				more_commentInfo:'',//点击更多对应的评论数据
				
				shareAppp: [
					// {text: '生成海报',index:0, icon: '../static/shar_img/poster.png'},
					{text: '朋友圈',  index:1, icon: '../../static/shar_img/wechatMoments.png'},
					{text: '微信好友',index:2, icon: '../../static/shar_img/weChat.png'},
					{text: 'QQ好友',  index:3, icon: '../../static/shar_img/qq.png'},
					{text: 'QQ空间',  index:4, icon: '../../static/shar_img/qqZone.png'},
					{text: '微博',    index:5, icon: '../../static/shar_img/sina.png'},
				],
				//推荐
				recommendList:[],
				
				//多久之前
				postFriendlyDate:'',
				
				allContent:true,
				
				isCompleted:true,
				
				sourceUrl:''
			}
		},
		// #ifdef  MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
		onShareAppMessage(res) {
		    return {
		      title: this.query_data.postTitle,
		      // path: this.recive_data.postWebUrl
		    }
		},
		onShareTimeline() {
			return {
				title: this.query_data.postTitle,
				// query: 'name=xxx&age=xxx',
				imageUrl: this.query_data.postImageShow,
			}
		},
		// #endif
		onLoad(e) {
			this.recive_data.postId = e.id;
			this.recive_data.postType = 1;
			
			if(e.type == 0){
				//设置标题
				uni.setNavigationBarTitle({
					title: '文章详情'
				});
			}
			if(e.type == 1){
				//设置标题
				uni.setNavigationBarTitle({
					title: '笔记详情'
				});
			}
			
			// //根据ID查找帖子表数据
			this.getPostInfoById();
		},
		onShow() {
			//根据帖子id查询评论列表
			this.getCommentList()
			uni.pageScrollTo({
				duration:0,
				scrollTop:0
			})
		},
		onNavigationBarButtonTap() {
			if(this.query_data.isDeleted == 0  && this.query_data.postStatus != 2){
				this.$refs.showshare.open()
			}else if(this.query_data.isDeleted == 1  && this.query_data.postStatus != 2){
				uni.showToast({
				    title: "这篇文章已删除,无法分享！",
					icon: 'none',
				    duration: 2000
				});
			}else if(this.query_data.postStatus == 2){
				uni.showToast({
				    title: "当前文章因违反规定,无法分享！",
					icon: 'none',
				    duration: 2000
				});
			}
		},
		methods: {
			gotoFeatureDetailsPages(value){
				uni.navigateTo({
					url:this.navigatorUrl.featureDetailsPages + "?id=" + value
				})
			},
			isFoldFunction(){
				this.isFold = !this.isFold
			},
			
			//根据ID查找帖子表数据
			getPostInfoById(){
				let param={"postId":this.recive_data.postId,"postType":this.recive_data.postType} ;
				let str = '/portal/v1/post/get';
				let opts={ url:str, method:'POST' }
				let temp = this
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.query_data = res.data.data;
							if(res.data.data.postContentType === 1){
								// #ifdef H5
									let param={"videoId":temp.query_data.postVid} ;
									let str = '/portal/v2/vod/get/auth/' + temp.query_data.postVid;
									let opts={ url:str, method:'POST' }
									this.http.httpTokenRequest(opts,param).then(
										res => {
											if(res.data.code == 200){
												var player = new Aliplayer({
													id: 'J_prismPlayer',
													width: '100%',
													autoplay: true,
													rePlay: true,
													//播放方式二：点播用户推荐
													vid : temp.query_data.postVid,
													playauth : res.data.data.playAuth,
													cover: temp.query_data.postImage,
													skinLayout:[
														{name: "bigPlayButton", align: "blabs", x: 30, y: 80},
														{
														  name: "H5Loading", align: "cc"
														},
														{name: "errorDisplay", align: "tlabs", x: 0, y: 0},
														{name: "infoDisplay"},
														{name:"tooltip", align:"blabs",x: 0, y: 56},
														{name: "thumbnail"},
														{
														  name: "controlBar", align: "blabs", x: 0, y: 0,
														  children: [
															{name: "progress", align: "blabs", x: 0, y: 44},
															{name: "playButton", align: "tl", x: 15, y: 12},
															{name: "timeDisplay", align: "tl", x: 10, y: 7},
															{name: "fullScreenButton", align: "tr", x: 10, y: 12}
														  ]
														}
													]
												});
											}
										}
									)
								// #endif
								// #ifndef H5
									param={"videoId":temp.query_data.postVid} ;
									str = '/portal/v2/vod/get/' + temp.query_data.postVid;
									opts={ url:str, method:'POST' }
									this.http.httpTokenRequest(opts,param).then(
										res => {
											if(res.data.code == 200){
												this.sourceUrl = res.data.data.playInfoList[0].playURL
											}
										}
									)
								// #endif
							}
							//查询点赞列表
							this.getUpvoteList()
							//根据postTagId查询标签详情
							this.getPostLabelById();
							//根据帖子id查询评论列表
							this.getCommentList()
							
							this.query_data.growthValue = this.calculation.groupArr(this.query_data.growthValue).split(" ")[0]
							this.postImage = res.data.data.postImage.split(",");
							if(res.data.data.createTime == res.data.data.updateTime){
								this.postFriendlyDate = "发布于" + friendlyDate(new Date(res.data.data.createTime.replace(/\-/g,'/')).getTime(),res.data.data.createTime)
							}else{
								this.postFriendlyDate = "编辑于" + friendlyDate(new Date(res.data.data.updateTime.replace(/\-/g,'/')).getTime(),res.data.data.updateTime)
							}
							// 处理赞 评论 浏览数量
							this.commentTotal = this.calculation.digitalConversion(this.query_data.postCommentCount)
							this.upvoteTotal = this.calculation.digitalConversion(this.query_data.postUpvoteCount)
							this.query_data.postPageViews = this.calculation.digitalConversion(this.query_data.postPageViews)
							
							// 处理 关注状态
							if(this.query_data.postUserId == uni.getStorageSync('userInfo').userId){
								this.query_data.isMyself = true
								this.query_data.isShowCareBtn = false
							}else{
								if(this.query_data.ifollowed){
									this.query_data.isShowCareBtn = false
								}else{
									this.query_data.isShowCareBtn = true
								}
							}
							// console.log(this.query_data.postContent.length)
							if(this.query_data.postContent.length > 400){
								this.allContent = false;
							}else{
								this.allContent = true;
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
			
			//查询点赞列表
			getUpvoteList(){
				let param={
					"upvoteTargetId": this.query_data.postId,  //点赞帖子id
					"upvoteTargetType": this.query_data.postType,  //点赞帖子类别  "0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复",
					// "upvoteUserId": this.query_data.postUserId, //点赞用户id
					// "upvoteUserNickname": this.query_data.postUserNickname,  //点赞用户昵称
				} ;
				let opts={ url:'/portal/v1/upvote/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.upvoteList = res.data.data.records
							this.upvoteList = this.upvoteList.splice(0,8)
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
			//查询 标签name
			getPostLabelById(){
				let param={"tagCategoryType":this.query_data.postType} ;
				let str = '/portal/v1/tag/list/' + this.query_data.postType;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							var arr = this.query_data.postTagId.split(",");
							// var arr = ["1245548995124662274","1245548734910042113"]; //测试数据
							var typeArr = res.data.data;
							for(var i=0;i<typeArr.length;i++){
								var tags = typeArr[i].tags
								for(var j=0;j<tags.length;j++){
									for(var k=0;k<arr.length;k++){
										if(arr[k] == tags[j].tagId){
											this.postLabel.push(tags[j])
										}
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
			//根据帖子id查询评论列表
			getCommentList(){
				let param={ "limit": 5, "page": 1, "commentPostId":this.recive_data.postId} ;
				let opts={ url:'/portal/v1/comment/page/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.commentList = res.data.data.records;
							for(var i=0;i<this.commentList.length;i++){
								this.commentList[i].growthValue = this.calculation.groupArr(this.commentList[i].growthValue).split(" ")[0]
								this.commentList[i].commentFriendlyDate = friendlyDate(new Date(this.commentList[i].createTime.replace(/\-/g,'/')).getTime(),this.commentList[i].createTime)
								if(this.commentList[i].commentUserId == this.query_data.postUserId){
									this.commentList[i].commentUserIdISme = true
								}else{
									this.commentList[i].commentUserIdISme = false
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
			gotoTopicListPage(postTopicId){
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + postTopicId
				})
			},
			gotoTagListPage(item,type){
				uni.navigateTo({
					url:this.navigatorUrl.tagDetailsPages + '?id=' + item.tagId
				})
			},
			blur: function() {
				this.focus = false;
				// this.showInputChatBoolen = !this.showInputChatBoolen;
			},
			onfocus:function(){
				this.focus = true;
			},
			//发布评论
			send_comment: function(message) {
				if(!this.isCompleted){
					return;
				}
				this.isCompleted = !this.isCompleted
				
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
				
				let param={
					"commentPostType": this.recive_data.postType,//0: 文章 1：笔记 2：动态 3：问答 4：新闻
					"commentPostId": this.recive_data.postId,  //帖子id
					"commentContent":message.content, //评论内容
					"commentUserId": uni.getStorageSync('userInfo').userId, //评论用户id
				} ;
				let opts={ url:'/portal/v1/comment/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//根据ID查找帖子表数据  刷新加载页面
							// this.getPostInfoById()
							
							var obj = {};
							obj.commentContent = message.content;
							obj.commentId = res.data.data;
							obj.commentUserId = uni.getStorageSync('userInfo').userId;
							obj.commentUserNickname = uni.getStorageSync('userInfo').userNickname;
							obj.commentUserAvatar = uni.getStorageSync('userInfo').userAvatar;
							obj.growthValue = this.calculation.groupArr(uni.getStorageSync('userInfo').growthValue).split(" ")[0]
							obj.iupvoted = 0;
							obj.commentUpvoteCount = 0;
							obj.replyCount = 0;
							var date = new Date();
							obj.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
							obj.commentFriendlyDate = friendlyDate(new Date(obj.createTime.replace(/\-/g,'/')).getTime(),obj.createTime)
							if(this.query_data.postUserId == uni.getStorageSync('userInfo').userId){
								obj.commentUserIdISme = true
							}else{
								obj.commentUserIdISme = false
							}
							this.commentList.unshift(obj)
							this.commentList = this.commentList.splice(0,5)
							this.commentTotal = Number(this.commentTotal) + 1
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
			},
			//更多操作
			more(item){
				this.del_show = false;
				this.jubao_show = false;
				if(item.commentUserId === uni.getStorageSync('userInfo').userId){
					this.del_show = true;
				}else{
					this.jubao_show = true;
				}
				this.$refs.showMore.open();
				// //存贮评论数据用于举报删除
				this.more_commentInfo = item;
			},
			//举报
			jubao(){
				uni.navigateTo({
					url:'/pages/discover/report/index?id='+this.more_commentInfo.commentId + '&type=5' 
				})
				this.$refs.showMore.close()
			},
			//删除
			del(){
				this.$refs.showMore.close()
				let param={"commentId":this.more_commentInfo.commentId} ;
				let opts={ url:'/portal/v1/comment/remove', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							//根据ID查找帖子表数据  刷新加载页面
							this.getPostInfoById()
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
			//评论
			clcik_thumbsup_pinlun(item){
				let param={
					"upvoteTargetId":item.commentId,//点赞对象Id
					"upvoteTargetType": 5,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							for(var i=0;i<this.commentList.length;i++){
								if(item.commentId == this.commentList[i].commentId){
									this.commentList[i].iupvoted = !this.commentList[i].iupvoted
									if(this.commentList[i].iupvoted){
										this.commentList[i].commentUpvoteCount ++
									}else{
										this.commentList[i].commentUpvoteCount --
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
			clcik_thumbsup() {
				let param={
					"upvoteTargetId":this.recive_data.postId,//点赞对象Id
					"upvoteTargetType": this.recive_data.postType,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/upvote/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.query_data.iupvoted = !this.query_data.iupvoted;
							if(this.query_data.iupvoted){
								this.query_data.postUpvoteCount ++ ;
							}else{
								this.query_data.postUpvoteCount -- ;
							}
							this.upvoteTotal = this.calculation.digitalConversion(this.query_data.postUpvoteCount)
							
							//查询点赞列表
							this.getUpvoteList()
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
							
			thumbsup_list() {
				uni.navigateTo({
					url:'/pages/discover/post-details/post-thumbsup-list?id='+this.query_data.postId+'&type='+this.query_data.postType
					// url:"discover/post-details/post-thumbsup-list?data=" + encodeURIComponent(JSON.stringify(this.query_data))
				})
			},
			//收藏帖子
			clcik_favorite(){
				this.$refs.showshare.close()
				let param={
					"favoritePostId":this.recive_data.postId,//点赞对象Id
					"favoritePostType": this.recive_data.postType,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
				} ;
				let opts={ url:'/portal/v1/favorite/add', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							if(this.query_data.ifavorited == 0){
								this.query_data.ifavorited =1
								uni.showToast({
									icon: "none",
									title: "收藏成功"
								})
							}else{
								this.query_data.ifavorited =0
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
			
			shareClick(){
				this.$refs.showshare.open()
			},
			cancel(type) {
				this.$refs.showshare.close()
			},
			change(e) {
				// console.log('是否打开:' + e.show)
			},
			postLink(){
				this.$refs.showshare.close()
				let content = String(this.query_data.postWebUrl); // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title:'不支持',
					})
				} else {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			},
			postReport(){
				this.$refs.showshare.close()
				
				let token = uni.getStorageSync('token');
				if(token){
					uni.navigateTo({
						url:'/pages/discover/report/index?id='+ this.recive_data.postId + '&type=' + this.recive_data.postType
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
			postDel(){
				this.$refs.showshare.close()
				
				let token = uni.getStorageSync('token');
				if(token){
					let param={
						"postId":this.recive_data.postId,//对象Id
						"postType": this.recive_data.postType,//点赞对象类型 0: 文章 1: 笔记 2: 动态 3: 问答 4: 新闻 5: 评论 6: 回复"
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
			gotoImageShow(imageString){
				console.log()
				uni.navigateTo({
					// url:"/pages/discover/post-details/post-image?imgArr=" + encodeURIComponent(imageString) 
					url:"/pages/discover/post-details/post-image?imgArr=" + imageString
				})
			},
			more_postView(){
				uni.navigateTo({
					url:'/pages/discover/post-details/post-recommend-more?postType=' + this.query_data.postType + '&postTagId' + this.query_data.postTagId
				})
			},
			shareItemClick(value){
				this.$refs.showshare.close()
				switch(value){
					case 0: 
						// uni.showToast({
						// 	icon: "none",
						// 	title: "生成海报"
						// })
						
						uni.navigateTo({
							url:'/pages/discover/post-details/post-generate?id=' + this.query_data.postId + '&type=' + this.query_data.postType + '&postWebUrl=' + encodeURIComponent(this.query_data.postWebUrl)
						})
						break;
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						this.$refs.share_uniPopup.open()
						let content = String(this.query_data.postWebUrl); // 复制内容，必须字符串，数字需要转换为字符串
						const result = h5Copy(content)
						break;
				}
			},
			share_confirm(){
				this.$refs.share_uniPopup.close()
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				let param={
					"followTargetId": item.postUserId, //关注目标ID
					"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.query_data.isShowCareBtn = !this.query_data.isShowCareBtn
							this.$forceUpdate() 
						}else if(res.data.code == 2012 ){
							uni.showToast({
								icon:'none',
							    title: res.data.msg,
							    duration: 1000
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/mine/login/account-login'
								})
							}, 1000)
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
			click_user(userId){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  userId
				})
			},
			commentMask(){
				uni.showToast({
				    title: "帖子锁定，不可发布评论",
					icon: 'none',
				    duration: 1000
				});
			},
			agree(){
				uni.navigateTo({
					url:'/pages/mine/agree/index?type=17'
				})
			},
			
			gotoHuifu_page(item){
				// #ifdef H5
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("postDetails",{postId:this.recive_data.postId,postType:this.recive_data.postType})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.navigateTo({
					url:"/pages/discover/post-details/post-reply-list?data=" + encodeURIComponent(JSON.stringify(item))
				})
				// #endif
			},
			
			showAllText(){
				// // this.allContent = !this.allContent
				this.$refs.app_uniPopup.open()
			},
			gotoPinlun_page(){
				// #ifdef H5
				// this.calculation.wakeUp_app('toPostMoreComment?articlePostId='+ this.recive_data.postId + '&articlePostType='+ this.recive_data.postType)
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("postDetails",{postId:this.recive_data.postId,postType:this.recive_data.postType})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.navigateTo({
					url:"/pages/discover/post-details/post-comment-list?id=" + this.recive_data.postId+"&type=" + this.recive_data.postType
				})
				// #endif
			},
			app_cancel(){
				this.$refs.app_uniPopup.close()
				this.allContent = !this.allContent
			},
			app_confirm(){
				this.$refs.app_uniPopup.close()
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("postDetails",{postId:this.recive_data.postId,postType:this.recive_data.postType})
				//以前的唤醒方式
				// this.calculation.wakeUp_app('toPostDetail?articlePostId='+ this.recive_data.postId + '&articlePostType='+ this.recive_data.postType)
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
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
		margin-top: 2upx;
	}
	.red_text{
		color: #ff0000;
	}
	.normal_text{
		color: #5c5f66;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
	.foot {
		background-color: #FFFFFF;
		position: fixed;
		width: 80%;
		height: 100upx;
		min-height: 100upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
	.foot_mask {
		background-color: #333333;
		opacity:0.5;
		position: fixed;
		width: 100%;
		height: 100upx;
		min-height: 100upx;
		left: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
	.foot_right {
		background-color: #FFFFFF;
		position: fixed;
		width: 20%;
		height: 100upx;
		min-height: 100upx;
		right: 0upx;
		bottom: -10upx;
		overflow: hidden;
	}
	
	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #FFFFFF;
		padding-bottom: 20upx;
	}
	.uni-share-title {
		line-height: 60upx;
		font-size: 16px;
		padding: 15rpx 0;
		text-align: center;
	}
	.swiper-style {
		width: 750upx;
		height: 833upx;
		background-color: #FFF;
		display: block;
		flex-direction: column;
	}
	.swiper-style swiper-item {
		display: flex;
		align-items: center;
	}
	.swiper-style swiper-item image {
		width: 750upx !important;
		height: 833upx !important;
	}
	.active{
		display: none;
	}
</style>
