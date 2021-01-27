<template>
	<view style="flex-direction: column; width: 100%;margin-bottom: 8upx;">
		<!-- <view v-for="(item,index) in list" :key="index" style="flex-direction: column;"> -->
			<!-- 文章/笔记/动态/问答 -->
			<!-- <tweentItem v-if="item.feedFlowObjectType < 4 && item.feedFlowType==13" :receive-obj="{obj:item,isShowType:true}"></tweentItem> -->
			<view v-if="item.feedFlowObjectType < 4 && item.feedFlowType==13" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="width:88%;flex-direction: column;">
						<view style="width: 100%;">
							<view style="margin-left: 20upx;width:80%;align-items: center;line-height: 40upx;">
								<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
									{{item.userNickname}}
								</text>
								<view v-if="item.postPublisher!=1">
									<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
									<text v-if="item.postTagId.split(',').indexOf('1278492374447689730') == -1" style="margin-left: 20upx;">
										{{typeText[item.feedFlowObjectType]}}
									</text>
									<text v-if="item.postTagId.split(',').indexOf('1278492374447689730') > -1" style="margin-left: 8upx;">
										闲置
									</text>
								</view>
								<view v-else>
									<text style="margin-left: 20upx;">来自</text>
									<text style="margin-left: 8upx;">系统</text>
								</view>
								
							</view>
							<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
						</view>
						<view v-if="item.feedFlowSource" style="width: 100%;align-items: center;margin-left: 20upx;color: #b7b7b7;font-size: 24upx;line-height: 40upx;">
							<text>来自 {{item.feedFlowSource}}</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-x="true" style="white-space: nowrap;flex-direction: row;width: 100%;"  >
					<view v-if="item.postTopicTitle" @click="gotoTopicListPage(item.postTopicId)" style="margin-top: 12upx;padding:12upx;display: inline-flex;align-items: center;border-radius: 10upx;background-color: #f9f9f9;align-items: center;">
						<image style="width: 24upx;height: 24upx;margin-right: 12upx;" src="@/static/actionImg/topic_ico.png"></image>
						<text style="color: #f76d45;font-size: 24upx;line-height: 24upx;">{{item.postTopicTitle}}</text>		
					</view>
				</scroll-view>
				
				<view v-if="!isFold && item.postPublisher!=1" style="flex-direction: column;margin:12upx 0 0;"  @click="goActionItem_Details(item)" >
					<view style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;" >
						{{item.postTitle?item.postTitle:item.postContent}}
					</view>
				</view>	
				<view v-if="isFold && item.postPublisher!=1" style="flex-direction: column;margin: 12upx 0 0;"  @click="goActionItem_Details(item)" >
					<view style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
						{{item.postTitle?item.postTitle:item.postContent}}
					</view>
				</view>	
				<view v-if="item.postTitle.length>72 && item.postTitle && item.postPublisher!=1" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view v-if="item.postContent.length>72 && !item.postTitle && item.postPublisher!=1" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view v-if="item.postContentType === 0" @click="goActionItem_Details(item)" style="flex-direction: column;">
					<view v-if="item.postImage && item.postPublisher!=1" style="flex-direction: row;width: 100%;flex-wrap: wrap;">
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
						
						<!-- <image v-if="item.postImage.split(',')[0]" :src="decodeURIComponent(item.postImage.split(',')[0])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[1]" :src="decodeURIComponent(item.postImage.split(',')[1])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[2]" :src="decodeURIComponent(item.postImage.split(',')[2])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[3]" :src="decodeURIComponent(item.postImage.split(',')[3])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[4]" :src="decodeURIComponent(item.postImage.split(',')[4])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[5]" :src="decodeURIComponent(item.postImage.split(',')[5])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[6]" :src="decodeURIComponent(item.postImage.split(',')[6])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[7]" :src="decodeURIComponent(item.postImage.split(',')[7])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.postImage.split(',')[8]" :src="decodeURIComponent(item.postImage.split(',')[8])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image> -->
					</view>
					<view v-if="item.postImage && item.postPublisher==1" style="flex-direction: row;width: 100%;justify-content: center;padding: 10upx 0;">
						<image v-if="item.postImage.split(',')[0]" :src="decodeURIComponent(item.postImage.split(',')[0])" mode="aspectFill"  style="width:100%; height: 240upx; padding: 5upx;"></image>
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
						<image src="@/static/actionImg/thumbsup.png" style="width: 24upx; height:24upx; margin:0 5% 0 25%"></image>
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
			<!-- 领养 15-->
			<view v-if="item.feedFlowObjectType == 15 && item.feedFlowType==13" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view  @click="goDopt_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goPair_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view  @click="goDopt_Details(item)" style="flex-direction: column;padding:12upx 0;">
					<view v-if="item.fosterPetImage" style="flex-direction: row;width: 100%;flex-wrap: wrap;">
						<image v-if="item.fosterPetImage.split(',')[0]" :src="decodeURIComponent(item.fosterPetImage.split(',')[0])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.fosterPetImage.split(',')[1]" :src="decodeURIComponent(item.fosterPetImage.split(',')[1])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.fosterPetImage.split(',')[2]" :src="decodeURIComponent(item.fosterPetImage.split(',')[2])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					</view>
				</view>
				<view  @click="goDopt_Details(item)" style="width: 100%;height: 50upx; align-items: center;color: #FFFFFF;">
					<view style="background-color: #f76d45;border-radius: 4upx;padding:0 20upx;font-size: 24upx;">
						<text>{{item.petBreedName}}</text>
						<text style="margin: 0 10upx;"> </text>
						<text v-if="item.petGender<2">{{greden[item.petGender]}}</text>
						<text style="margin: 0 10upx;"> </text>
						<text>{{item.petAge}}</text>
					</view>
				</view>
			</view>
			<!-- 寄养 16-->
			<view v-if="item.feedFlowObjectType == 16 && item.feedFlowType==13" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goFoster_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goPair_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view @click="goFoster_Details(item)" style="flex-direction: column;padding:12upx 0;">
					<view v-if="item.fosteragePlaceImage" style="flex-direction: row;width: 100%;flex-wrap: wrap;">
						<image v-if="item.fosteragePlaceImage.split(',')[0]" :src="decodeURIComponent(item.fosteragePlaceImage.split(',')[0])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.fosteragePlaceImage.split(',')[1]" :src="decodeURIComponent(item.fosteragePlaceImage.split(',')[1])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.fosteragePlaceImage.split(',')[2]" :src="decodeURIComponent(item.fosteragePlaceImage.split(',')[2])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					</view>
				</view>
				<view @click="goFoster_Details(item)" style="width: 100%;height: 50upx; align-items: center;color: #FFFFFF;">
					<view style="background-color: #f76d45;border-radius: 4upx;padding:0 20upx;font-size: 24upx;">
						<text>{{item.fosteragePlacePoi}}</text>
						<!-- <text style="margin: 0 10upx;">|</text>
						<text>雁塔区</text> -->
					</view>
				</view>
			</view>
			<!-- 配对 17-->
			<view v-if="item.feedFlowObjectType == 17 && item.feedFlowType==13" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius:4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goPair_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goPair_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view @click="goPair_Details(item)" style="flex-direction: column;padding: 12upx 0;">
					<view v-if="item.pairPetImage" style="flex-direction: row;width: 100%;flex-wrap: wrap;">
						<image v-if="item.pairPetImage.split(',')[0]" :src="decodeURIComponent(item.pairPetImage.split(',')[0])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.pairPetImage.split(',')[1]" :src="decodeURIComponent(item.pairPetImage.split(',')[1])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
						<image v-if="item.pairPetImage.split(',')[2]" :src="decodeURIComponent(item.pairPetImage.split(',')[2])" mode="aspectFill"  style="width: 33%; height: 200upx; padding: 5upx;"></image>
					</view>
				</view>
				<view @click="goPair_Details(item)" style="width: 100%;height: 50upx; align-items: center;color: #FFFFFF;">
					<view style="background-color: #f76d45;border-radius: 4upx;padding:0 20upx;font-size: 24upx;">
						<text>{{item.petBreedName}}</text>
						<text style="margin: 0 10upx;"> </text>
						<text v-if="item.petGender<2">{{greden[item.petGender]}}</text>
						<text style="margin: 0 10upx;"> </text>
						<text>{{item.petAge}}</text>
					</view>
				</view>
			</view>
			<!-- 收藏  11 -->
			<view v-if="item.feedFlowObjectType<4 && item.feedFlowType==11" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view  @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text  @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view  @click="goActionItem_Details(item)" style="flex-direction: column;margin:12upx 0 0;background-color: #f9f9f9;padding:5upx;color: #b7b7b7;">
					<text v-if="item.postTitle" style="font-size: 24upx;max-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
						{{item.postTitle}}
					</text>
					<rich-text class="richText" v-if="item.postTitle==''"  :nodes="item.postContent" style="font-size: 24upx;max-height: 80upx;line-height: 40upx;overflow: hidden;"></rich-text>
				</view>
			</view>
			<!-- 关注 小组  9 -->
			<view v-if="item.feedFlowObjectType == 9 && item.feedFlowType==14" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="width: 100%;height: 140upx; border-radius: 2px;align-items: center;margin: 20upx 0 10upx;background-color: #f9f9f9;">
					<view style="width:75%;padding-left: 20upx;" @click="goGroup_Details(item)">
						<image :src="decodeURIComponent(item.groupAvatar.split(',')[0])"  style="width: 100upx;height: 100upx;border-radius: 50upx;"></image>
						<view style="flex-direction: column; margin-left: 20upx;width: 70%;">
							<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;font-weight: 700;" >
								{{item.groupName}}
							</text>
							<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;color: #b7b7b7;" >
								{{item.groupIntroduction}}
							</text>
						</view>
					</view>
					<view v-if="item.isFollowed==0" @click="ClickCareBtn(item,9)" style="width: 25%;align-items: flex-end;justify-content: flex-end;">
						<view style="width: 100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;background: #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffffff;">加入</text>
						</view>
					</view>
					<view v-if="item.isFollowed==1" @click="ClickCareBtn(item,9)" style="width: 25%;align-items: center;justify-content: flex-end;">
						<view style="width: 100upx;height:50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;border: 2upx solid #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已加入</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 关注 标签  20 -->
			<view v-if="item.feedFlowObjectType == 20 && item.feedFlowType==14" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="width: 100%;height: 140upx; border-radius: 4upx;align-items: center;margin: 20upx 0 10upx;background-color: #f9f9f9;">
					<view style="width:75%;padding-left: 20upx;" @click="goTopic_Details(item)">
						<view style="flex-direction: column; margin-left: 20upx;width: 70%;">
							<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;font-weight: 700;" >
								{{item.tagName}}
							</text>
							<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;color: #b7b7b7;" >
								{{item.partNumber}}人已参与
							</text>
						</view>
					</view>
					<view v-if="item.isFollowed==0"  @click="ClickCareBtn(item,20)" style="width: 25%;align-items: flex-end;justify-content: flex-end;">
						<view style="width:100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;background: #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffffff;">订阅</text>
						</view>
					</view>
					<view v-if="item.isFollowed==1" @click="ClickCareBtn(item,20)" style="width: 25%;align-items: center;justify-content: flex-end;">
						<view style="width: 100upx;height:50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;border: 1px solid #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已订阅</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 关注 话题  8 -->
			<view v-if="item.feedFlowObjectType == 8 && item.feedFlowType==14" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="width: 100%;height: 140upx; border-radius: 4upx;align-items: center;margin: 20upx 0 10upx;background-color: #f9f9f9;">
					<view style="width:75%;padding-left: 20upx;" @click="goTopic_Details(item)">
						<view style="flex-direction: column; margin-left: 20upx;width: 70%;">
							<text style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;font-weight: 700;" >
								{{item.topicTitle}}
							</text>
							<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;color: #b7b7b7;" >
								{{item.partNumber}}人已参与
							</text>
						</view>
					</view>
					<view v-if="item.isFollowed==0"  @click="ClickCareBtn(item,8)" style="width: 25%;align-items: flex-end;justify-content: flex-end;">
						<view style="width:100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;background: #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffffff;">关注</text>
						</view>
					</view>
					<view v-if="item.isFollowed==1" @click="ClickCareBtn(item,8)" style="width: 25%;align-items: center;justify-content: flex-end;">
						<view style="width: 100upx;height:50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;border: 1px solid #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 关注 用户  7 -->
			<view v-if="item.feedFlowObjectType == 7 && item.feedFlowType==14" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4upx;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="width: 100%;height: 140upx; border-radius: 4px;align-items: center;margin: 20upx 0 10upx;background-color: #f9f9f9;">
					<view style="width:75%;padding-left: 20upx;" >
						<image :src="decodeURIComponent(item.feedFlowObjectUserAvatar.split(',')[0])"  style="width: 100upx;height: 100upx;border-radius: 50upx;"></image>
						<view style="flex-direction: column; margin-left: 20upx;width:70%;">
							<text style="width:65%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;font-weight: 700;" >
								{{item.feedFlowObjectUserNickname}}
							</text>
							<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;color: #b7b7b7;" >
								简介：{{item.userProfile}}
							</text>
						</view>
					</view>
					<view v-if="item.isFollowed==0 && !isMyself" @click="ClickCareBtn(item,7)" style="width:25%;align-items: flex-end;justify-content: flex-end;">
						<view style="width: 100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;background: #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffffff;">关注</text>
						</view>
					</view>
					<view v-if="item.isFollowed==1 && !isMyself" @click="ClickCareBtn(item,7)" style="width: 25%;align-items: center;justify-content: flex-end;">
						<view style="width: 100upx;height: 50upx;margin: 0 20upx; border-radius: 30upx;justify-content: center;border: 1px solid #ffbf59;">
							<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 点赞  10 -->
			<view v-if="item.feedFlowObjectType<4 && item.feedFlowType==10" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view @click="goActionItem_Details(item)" style="flex-direction: column;margin:12upx 0 0;background-color: #f9f9f9;padding:5upx;color: #b7b7b7;">
					<text v-if="item.postTitle" style="font-size: 24upx;max-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
						{{item.postTitle}}
					</text>
					<rich-text class="richText" v-if="item.postTitle==''"  :nodes="item.postContent" style="font-size: 24upx;max-height: 80upx;line-height: 40upx;overflow: hidden;"></rich-text>
				</view>
			</view>
			<!-- 评论 帖子  5 -->  
			<view v-if="item.feedFlowObjectType<4 && item.feedFlowType==5" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view v-if="!isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.commentContent" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;" >
						{{item.commentContent}}
					</text>
				</view>
				<view v-if="isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.commentContent" style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
						{{item.commentContent}}
					</text>
				</view>
				<view v-if="item.commentContent.length>72" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view @click="goActionItem_Details(item)" style="flex-direction: column;margin:12upx 0 0;padding:5upx;background-color: #f9f9f9;color: #b7b7b7;">
					<text v-if="item.postTitle" style="font-size: 24upx;max-height: 50upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
						{{item.postTitle}}
					</text>
					<rich-text class="richText" v-if="item.postTitle==''"  :nodes="item.postContent" style="font-size: 24upx;max-height: 80upx;line-height: 40upx;overflow: hidden;"></rich-text>
				</view>
			</view>
			
			<!-- 评论 领养 5 -->  <!-- 帖子和领养的走同一个 -->  
			<view v-if="item.feedFlowObjectType == 15 && item.feedFlowType==5" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<!-- <view @click="goActionItem_Details(item)" style="flex-direction: column;margin: 12upx 0 0;">
					<text v-if="item.commentContent" style="display: -webkit-box; -webkit-box-orient: vertical;  overflow: hidden;" >
						{{item.commentContent}}
					</text>
				</view> -->
				<view v-if="!isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 12upx 0 0;">
					<text v-if="item.commentContent" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;" >
						{{item.commentContent}}
					</text>
				</view>
				<view v-if="isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 12upx 0 0;">
					<text v-if="item.commentContent" style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
						{{item.commentContent}}
					</text>
				</view>
				<view v-if="item.commentContent.length>72" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.fosterPetImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.fosterTitle}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text v-if="item.petBreedName" style="margin-right: 30upx;">{{item.petBreedName}}</text>
							<text v-if="item.petGender<2" style="margin-right: 30upx;">{{greden[item.petGender]}}</text>
							<text style="margin-right: 30upx;">{{item.petBirthday}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评价 配对 18 --> 
			<view v-if="item.feedFlowObjectType == 17 && item.feedFlowType==18" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="width:88%;flex-direction: column;">
						<view style="width: 100%;">
							<view style="margin-left: 20upx;width:80%;align-items: center;line-height: 40upx;">
								<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
									{{item.userNickname}}
								</text>
								<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
								<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
									{{typeText[item.feedFlowObjectType]}}
								</text>
							</view>
							<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
						</view>
						<view style="width: 100%;align-items: center;margin-left: 20upx;color: #b7b7b7;font-size: 24upx;line-height: 40upx;">
							评分：
							<view class="example-body">
								<uni-rate :size="14" :value="item.evaluationScore" disabled="false" />
							</view>
						</view>
					</view>
				</view>
				<!-- <view @click="goActionItem_Details(item)" style="flex-direction: column;margin: 12upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;  overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view> -->
				<view v-if="!isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view>
				<view v-if="isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view>
				<view v-if="item.evaluationContent.length>72" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.pairPetImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.pairTitle}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text v-if="item.petBreedName" style="margin-right: 30upx;">{{item.petBreedName}}</text>
							<text v-if="item.petGender<2" style="margin-right: 30upx;">{{greden[item.petGender]}}</text>
							<text style="margin-right: 30upx;">{{item.petBirthday}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评价 寄养 18 -->
			<view v-if="item.feedFlowObjectType == 16 && item.feedFlowType==18" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="width:88%;flex-direction: column;">
						<view style="width: 100%;">
							<view style="margin-left: 20upx;width:80%;align-items: center;line-height: 40upx;">
								<text :class="{themeColor:main_isMyself}" style="max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
									{{item.userNickname}}
								</text>
								<text style="margin-left: 20upx;">{{typeText[item.feedFlowType]}}了 </text>
								<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
									{{typeText[item.feedFlowObjectType]}}
								</text>
							</view>
							<text style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
						</view>
						<view style="width: 100%;align-items: center;margin-left: 20upx;color: #b7b7b7;font-size: 24upx;line-height: 40upx;">
							评分：
							<view class="example-body">
								<uni-rate :value="item.evaluationScore" disabled="false" />
							</view>
						</view>
					</view>
				</view>
				<!-- <view @click="goActionItem_Details(item)" style="flex-direction: column;margin: 12upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;  overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view> -->
				<view v-if="!isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view>
				<view v-if="isFold" @click="goActionItem_Details(item)" style="flex-direction: column;margin: 20upx 0 0;">
					<text v-if="item.evaluationContent" style="display: -webkit-box; -webkit-box-orient: vertical;overflow: hidden;" >
						{{item.evaluationContent}}
					</text>
				</view>
				<view v-if="item.evaluationContent.length>72" style="flex-direction: column;">
					<view @click="isFoldFunction" style="color: #f76d45;" >
						{{isFold?'收起':'全文'}}
					</view>
				</view>	
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.fosteragePlaceImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.fosteragePlaceName}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text style="margin-right: 30upx;">{{item.score?item.score+'分':'暂无评分'}}</text>
							<text>{{item.fosteragePlacePoi}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 使用了 领养 19 --> 
			<view v-if="item.feedFlowObjectType == 15 && item.feedFlowType==19" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="margin-right: 20upx;max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							使用了
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.fosterPetImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.fosterTitle}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text v-if="item.petBreedName" style="margin-right: 30upx;">{{item.petBreedName}}</text>
							<text v-if="item.petGender<2" style="margin-right: 30upx;">{{greden[item.petGender]}}</text>
							<text style="margin-right: 30upx;">{{item.petBirthday}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 使用了 配对 19 -->
			<view v-if="item.feedFlowObjectType == 17 && item.feedFlowType==19" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="margin-right: 20upx;max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							使用了
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.pairPetImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.pairTitle}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text v-if="item.petBreedName" style="margin-right: 30upx;">{{item.petBreedName}}</text>
							<text v-if="item.petGender<2" style="margin-right: 30upx;">{{greden[item.petGender]}}</text>
							<text style="margin-right: 30upx;">{{item.petBirthday}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 使用了 寄养 19 -->
			<view v-if="item.feedFlowObjectType == 16 && item.feedFlowType==19" style="flex-direction: column; padding:12upx;margin-bottom:20upx 0;background-color: #FFFFFF;border-radius: 4ux;">
				<view style="width: 100%;height: 80upx;align-items: center;">
					<view style="width:12%;">
						<image @click="gotoPersonalPage(item)" mode="aspectFill" :src="decodeURIComponent(item.userAvatar)"  style="width: 80upx;height: 80upx;border-radius: 50upx;"></image>
					</view>	
					<view @click="goActionItem_Details(item)" style="margin-left: 20upx;width:68%;align-items: center;">
							<text :class="{themeColor:main_isMyself}" style="margin-right: 20upx;max-width: 50%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #121212;">
								{{item.userNickname}}
							</text>
							使用了
							<text style="height: 40upx;line-height: 40upx;margin-left: 8upx;">
								{{typeText[item.feedFlowObjectType]}}
							</text>
					</view>
					<text @click="goActionItem_Details(item)" style="color: #b7b7b7;width:45%;text-align: end;font-size: 24upx;">{{item.timerAgo}}</text>
				</view>
				<view style="margin:12upx 0 0;padding:12upx;background-color: #f9f9f9;">
					<view style="width: 20%;">
						<image :src="decodeURIComponent(item.fosteragePlaceImage)" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="width: 80%;flex-direction: column;">
						<view style="width: 100%;align-items: center;">
							<text style="font-weight: bold;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
								{{item.fosteragePlaceName}}
							</text>
						</view>
						<view style="width: 100%;align-items: center;color: #b7b7b7;font-size: 24upx;">
							<text style="margin-right: 30upx;">{{item.score?item.score+'分':'暂无评分'}}</text>
							<text style="margin-right: 30upx;">{{item.fosteragePlacePoi}}</text>
						</view>
					</view>
				</view>
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
	// import tweentItem from 'pages/component/tweent-item.vue';
	import qs from 'qs'
	export default{
		components: {
			uniRate,
			// tweentItem
		},
		data(){
			return{
				// 5: 评论   6: 回复    10 :赞     11：收藏  12：分享    13： 发布   14：关注  18：评价（对应服务）  19：订单（服务订单状态改变）
				
				// 0: 文章   1: 笔记   2: 动态   3: 问答   4: 新闻
				// 5: 评论   6: 回复  7:用户  8：话题   9: 小组
				// 15. 领养  16. 寄养   17. 配对
				isFold:false,
				typeText:["文章","笔记","动态","问答","新闻","评论","回复","用户","话题","小组","赞",
						"收藏","分享","发布","关注","领养","寄养","配对","评价","订单","标签"],
				greden:["弟弟","妹妹","未知"],
				thumbsup_ico_over:'../../static/actionImg/thumbsup_over.png',
				thumbsup_ico:'../../static/actionImg/thumbsup.png',
				list:[],
				item:Object,
				isMyself:false,//目标对象
				main_isMyself:false,//主题对象
				
				videoObj: {},
				times:"",
				videoWidth:'',
				videoHeight:'160',
				
				postImageArr:[],
				postImageGifArr:[],
			}
		},
		props: {
			receiveObj: Object
		},
		mounted() {
			// this.list = this.receiveObj.list;
			this.item = this.receiveObj.item
			this.item.petAge = this.getBirthday(this.receiveObj.item.petBirthday)
			this.item.timerAgo = friendlyDate(new Date(this.receiveObj.item.updateTime.replace(/\-/g,'/')).getTime(),this.item.createTime)
			this.item.petGender = this.receiveObj.item.petGender
			
			//处理动图gif
			this.postImageArr = this.receiveObj.item.postImage.toString().split(',')
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
			
			// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
			this.item.postUpvoteCount = this.calculation.digitalConversion(this.item.postUpvoteCount)
			this.item.postCommentCount = this.calculation.digitalConversion(this.item.postCommentCount)
			this.item.postPageViews = this.calculation.digitalConversion(this.item.postPageViews)
			
			//处理服务 宠物生日
			this.item.petBirthday = this.getBirthday(this.receiveObj.item.petBirthday)
			
			//只用在关注的时候，看是不是自己
			if(this.item.feedFlowObjectId == uni.getStorageSync('userInfo').userId){
				this.isMyself = true
			}
			//主体对象是不是自己
			if(this.item.feedFlowUserId == uni.getStorageSync('userInfo').userId){
				this.main_isMyself = true
			}
			
			if(this.item.userProfile == ''){
				this.item.userProfile = '此用户很懒，什么都没有留下'
			}
			
			if(this.item.postContentType === 1){
				let obj = qs.parse(this.item.postImage.split('?')[1])
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
			//同城详情跳转
			goActionItem_Details(item) {
				if(item.feedFlowObjectType == 0 ){//文章
					uni.navigateTo({
						url:this.navigatorUrl.articleDetailsPages + '?id=' + item.feedFlowObjectId
					})
				}
				if(item.feedFlowObjectType == 1){//笔记
					uni.navigateTo({
						url:this.navigatorUrl.noteDetailsPages + '?id=' + item.feedFlowObjectId
					})
				}
				if(item.feedFlowObjectType == 2){//动态
					uni.navigateTo({
						url:this.navigatorUrl.tweetDetailsPages + '?id=' + item.feedFlowObjectId
					})
				}
				if(item.feedFlowObjectType == 3){//问答
					uni.navigateTo({
						url:this.navigatorUrl.qaDetailsPages + '?id=' + item.feedFlowObjectId
					})
				}
			},
			goDopt_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.adoptDetailsPages + '?id=' + item.feedFlowObjectId
				})
			},
			goFoster_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.fosterageDetailsPages + '?id=' + item.feedFlowObjectId
				})
			},
			goPair_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.pairDetailsPages + '?id=' + item.feedFlowObjectId
				})
			},
			goGroup_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.groupDetailsPages + '?id=' + item.feedFlowObjectId
				})
			},
			goTopic_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.topicDetailsPages + '?id=' + item.feedFlowObjectId
				})
			},
			goPersonal_Details(item) {
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.feedFlowObjectId
				})
			},
			
			ClickCareBtn(item,value){
				//添加/修改关注状态
				let param={
					"followTargetId": item.feedFlowObjectId, //关注目标ID
					"followTargetType": value, //关注目标类型 7-用户 8-话题 9-小组 
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							if(this.item.isFollowed){
								this.item.isFollowed = 0
							}else{
								this.item.isFollowed =1
							}
							this.$forceUpdate() 
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
			gotoPersonalPage(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id='  +  item.feedFlowUserId
				})
			},
			getBirthday(dateString1){
				if(dateString1){
					var  startDate = Date.parse(dateString1);
					var myDate = new Date();
					var  endDate = Date.parse(myDate);
					var days=(endDate - startDate)/(1*24*60*60*1000);
					var y = days/365
					var str = ''
					if(y<1){
					   str = '1岁' 
					}else{
					    str = parseInt(y) + '岁' 
					}
					return  str;
				}else{
					return ''
				}
			},
			isFoldFunction(){
				this.isFold = !this.isFold
			},
		}
	}
</script>

<style lang='scss' scoped>
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #f9f9f9;
	}
	template {
	    display: flex;
	    flex: 1;
	}
	view {
	    display: flex;
	}
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
	.themeColor{
		color: #f76d45 !important;
	}
</style>
