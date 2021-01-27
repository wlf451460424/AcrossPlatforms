<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU  -->
		<view style="width: 100%;background-color: #FFFFFF;">
			<view style="width: 100%;height: 50upx;background-color: #F9F9F9;padding: 0 20upx;align-items: center;">
				<image src="@/static/search.png" style="width: 44upx;height: 40upx;margin-right: 20upx;"></image>
				<input  @input="inputChange" v-model="search_text" placeholder="搜索  动态/问答/笔记/文章/小组/用户" style="width: 100%;height: 50upx;font-size: 14px;color: #888888;" />
			</view>
		</view>
		<view v-if="!pageShow  && historyData.length" style="width: 100%;flex-direction: column;padding: 0 30upx;background-color: #FFFFFF;">
			<view style="width: 100%;">
				<text style="width: 50%;line-height: 80upx;font-weight: bold;">历史搜索</text>
				<view style="width: 100%;justify-content: flex-end;align-items: center;">
					<image @click="del_history" src="@/static/shift.png" style="width: 34upx;height: 34upx;"></image>
				</view>
			</view>
			<view style="flex-direction: row; width: 100%;flex-wrap: wrap;padding: 10upx 20upx;">	
				<view v-for="(item,index) in historyData" v-model="historyData" :key="index" @click="historyItem(item)" style="max-width: 100%;height:40upx;line-height: 36upx;padding: 0 20upx;display: inline-block;margin:0 30upx 30upx 0;background-color: #EEEEEE;align-items: center;border-radius: 30upx;">
					<!-- <text style="font-size: 24upx;">{{item}}</text>	 -->
					<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{item}}
					</text>
				</view>
			</view>
		</view>
		<view v-if="!pageShow  && hot_words.length" style="width: 100%;flex-direction: column;padding: 0 30upx;background-color: #FFFFFF;">
			<view style="width: 100%;">
				<text style="width: 50%;line-height: 80upx;font-weight: bold;">热门搜索</text>
			</view>
			<view style="flex-direction: row; width: 100%;flex-wrap: wrap;padding: 10upx 20upx;">	
				<view v-for="(item,index) in hot_words" v-model="hot_words" :key="index" @click="historyItem(item)" style="max-width: 100%;height:40upx;line-height: 36upx;padding: 0 20upx;display: inline-block;margin:0 30upx 30upx 0;background-color: #EEEEEE;align-items: center;border-radius: 30upx;">
					<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{item}}
					</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view v-if="!pageShow && historyData.length" style="width: 100%;flex-direction: column;padding: 0 30upx;background-color: #FFFFFF;">
			<view style="width: 100%;">
				<text style="width: 50%;line-height: 80upx;font-weight: bold;">历史搜索</text>
				<view style="width: 100%;justify-content: flex-end;align-items: center;">
					<image @click="del_history" src="@/static/shift.png" style="width: 34upx;height: 34upx;"></image>
				</view>
			</view>
			<view style="flex-direction: row; width: 100%;flex-wrap: wrap;padding: 10upx 20upx;">	
				<view v-for="(item,index) in this.historyData" :key="index" @click="historyItem(item)" style="max-width: 100%;height:40upx;line-height: 36upx;padding: 0 20upx;display: inline-block;margin:0 30upx 30upx 0;background-color: #EEEEEE;align-items: center;border-radius: 30upx;">
					<!-- <text style="font-size: 24upx;">{{item}}</text>	 -->
					<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{item}}
					</text>
				</view>
			</view>
		</view>
		<view v-if="!pageShow && hot_words.length" style="width: 100%;flex-direction: column;padding: 0 30upx;background-color: #FFFFFF;">
			<view style="width: 100%;">
				<text style="width: 50%;line-height: 80upx;font-weight: bold;">热门搜索</text>
				<view style="width: 100%;justify-content: flex-end;align-items: center;">
					<image v-if="isShow" @click="show_hide" src="../../../static/history_show.png" style="width: 40upx;height: 40upx;"></image>
					<image v-if="!isShow" @click="show_hide" src="../../../static/history_hide.png" style="width: 40upx;height: 40upx;"></image>
				</view>
			</view>
			<view v-if="isShow" style="flex-direction: row; width: 100%;flex-wrap: wrap;padding: 10upx 20upx;">	
				<view v-for="(item,index) in this.hot_words" :key="index" @click="historyItem(item)" style="max-width: 100%;height:40upx;line-height: 36upx;padding: 0 20upx;display: inline-block;margin:0 30upx 30upx 0;background-color: #EEEEEE;align-items: center;border-radius: 30upx;">
					<!-- <text style="font-size: 24upx;">{{item}}</text>	 -->
					<text style="font-size: 24upx;width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
						{{item}}
					</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 顶部选项卡 -->
		<scroll-view v-if="pageShow"  id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="overflow: hidden;margin-bottom: 2upx;">
			<view 
				v-for="(item,index) in tabBars" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab'+index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh v-if="pageShow" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9">
							<!-- 文章 -->
							<view v-for="(item,index) in list_0" :key="index" @click="goActionItem_Details(item)" style="flex-direction:column;width: 100%; background-color: #ffffff;margin-bottom: 8upx;padding: 16upx 20upx;" >
								<view style="width: 100%;flex-direction: column;">
									<rich-text class="richText" :nodes="item.postTitle" style="line-height: 50upx;max-height: 50upx;overflow: hidden;font-size: 28upx;"></rich-text>
									<rich-text class="richText" :nodes="item.postContent" style="line-height: 40upx;max-height: 80upx;overflow: hidden;color: #b7b7b7;font-size: 24upx;"></rich-text>
								</view>
								<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 100upx;">
									<view style="max-width: 300upx;height: 100%;align-items: center;margin-right: 40upx;">
										<image :src="decodeURIComponent(item.postUserAvatar)"  style="width: 70upx;height: 70upx;border-radius: 35upx;margin-right: 20upx;"></image>
										<text style="max-width:230upx;overflow: hidden;line-height: 80upx;max-height: 80upx;" >
											{{item.postUserNickname}}
										</text>
									</view>
									<view style="height: 100%;align-items: center;">
										<text style="color: #b7b7b7;font-size: 24upx;">{{item.timerAgo}}</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9;">
							<!-- 笔记 -->
							<view v-for="(item,index) in list_1" :key="index" @click="goActionItem_Details(item)" style="flex-direction:column;width: 100%; border-radius: 10upx; background-color: #ffffff;margin-bottom:8upx;padding: 16upx 20upx;" >
								<view style="width: 100%;flex-direction: column;">
									<rich-text class="richText" :nodes="item.postTitle" style="line-height: 50upx;max-height: 50upx;overflow: hidden;font-size: 28upx;"></rich-text>
									<rich-text class="richText" :nodes="item.postContent" style="line-height: 40upx;max-height: 80upx;overflow: hidden;color: #b7b7b7;font-size: 24upx;"></rich-text>
								</view>
								<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 100upx;">
									<view style="max-width: 300upx;height: 100%;align-items: center;margin-right: 40upx;">
										<image :src="decodeURIComponent(item.postUserAvatar)"  style="width: 70upx;height: 70upx;border-radius: 35upx;margin-right: 20upx;"></image>
										<text style="max-width:230upx;overflow: hidden;line-height: 80upx;max-height: 80upx;" >
											{{item.postUserNickname}}
										</text>
									</view>
									<view style="height: 100%;align-items: center;">
										<text style="color: #b7b7b7;font-size: 24upx;">{{item.timerAgo}}</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9">
							<!-- 动态 -->
							<view v-for="(item,index) in list_2" :key="index" @click="goActionItem_Details(item)" style="flex-direction:column;width: 100%; border-radius: 10upx; background-color: #ffffff;margin-bottom:8upx;padding: 16upx 20upx;" >
								<view style="width: 100%;flex-direction: column;">
									<rich-text class="richText" :nodes="item.postTitle" style="line-height: 50upx;max-height: 50upx;overflow: hidden;font-size: 28upx;"></rich-text>
									<rich-text class="richText" :nodes="item.postContent" style="line-height: 40upx;max-height: 80upx;overflow: hidden;color: #b7b7b7;font-size: 24upx;"></rich-text>
								</view>
								<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 100upx;">
									<view style="max-width: 300upx;height: 100%;align-items: center;margin-right: 40upx;">
										<image :src="decodeURIComponent(item.postUserAvatar)"  style="width: 70upx;height: 70upx;border-radius: 35upx;margin-right: 20upx;"></image>
										<text style="max-width:230upx;overflow: hidden;line-height: 80upx;max-height: 80upx;" >
											{{item.postUserNickname}}
										</text>
									</view>
									<view style="height: 100%;align-items: center;">
										<text style="color: #b7b7b7;font-size: 24upx;">{{item.timerAgo}}</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%; background: #f9f9f9">
							<!-- 问答 -->
							<view v-for="(item,index) in list_3" :key="index" @click="goActionItem_Details(item)" style="flex-direction:column;width: 100%; border-radius: 10upx; background-color: #FFFFFF;margin-bottom:8upx;padding: 16upx 20upx;" >
								<view style="width: 100%;flex-direction: column;">
									<rich-text class="richText" :nodes="item.postTitle" style="line-height: 50upx;max-height: 50upx;overflow: hidden;font-size: 28upx;"></rich-text>
									<rich-text class="richText" :nodes="item.postContent" style="line-height: 40upx;max-height: 80upx;overflow: hidden;color: #b7b7b7;font-size: 24upx;"></rich-text>
								</view>
								<view style="flex-direction: row;width: 100%;height: 90upx;line-height: 100upx;">
									<view style="max-width: 300upx;height: 100%;align-items: center;margin-right: 40upx;">
										<image :src="decodeURIComponent(item.postUserAvatar)"  style="width: 70upx;height: 70upx;border-radius: 35upx;"></image>
										<text style="max-width:230upx;overflow: hidden;line-height: 70upx;max-height: 80upx;margin-left: 20upx;" >
											{{item.postUserNickname}}
										</text>
									</view>
									<view style="height: 100%;align-items: center;">
										<text style="color: #b7b7b7;font-size: 24upx;">{{item.timerAgo}}</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9">
							<!-- 小组 -->
							<view  v-for="(item,index) in list_4" :key="index" style="flex-direction:row;width: 100%;border-radius: 4upx; background-color: #ffffff;margin-bottom:8upx;padding: 16upx 20upx;">
								<view style="width:100%;align-items: center;" @click="click_group(item)">
									<image :src="decodeURIComponent(item.groupAvatar)"  @click="click_cardBars(item)" style="width: 100upx;height: 100upx;border-radius: 60upx;"></image>
									<view style="flex-direction: column; margin-left: 12upx;width: 80%;">
										<view style="width: 100%;">
											<text style="width: 70%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
												{{item.groupName}}
											</text>
										</view>
										<text style="font-size: 24upx;color: #AAAAAA;margin-top: 12upx;width: 100%;line-height:40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
											简介 : {{item.groupIntroduction}}
										</text>
									</view>
								</view>
								<view  v-if="!item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;background: #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">加入</text>
									</view>
								</view>
								<view  v-if="item.currentUserFollowStatus" @click="ClickCareBtn(item)" style="width: 30%;align-items: flex-end;justify-content: flex-end;">
									<view style="width: 100upx;height: 50upx;border-radius: 30upx; text-align: center;border: 1px solid #ffbf59;">
										<text style="width: 100%;height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已加入</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;background: #f9f9f9">
							<!-- 达人 -->
							<view  v-for="(item,index) in list_5" :key="index" style="flex-direction:column;width: 100%; border-radius: 4upx; background-color: #ffffff;margin-bottom:8upx;padding: 16upx 20upx;" >
								<view style="flex-direction: row;width:100%;align-items: center;justify-content: center;">
									<image @click="click_user(item)" :src="decodeURIComponent(item.userAvatar)"  style="width: 120upx;height: 120upx;border-radius: 75upx;"></image>
									<view style="flex-direction: column; margin-left: 20upx;width:80%;height: 100%;">
										<view style="width: 100%;align-items: center;line-height: 40upx;">
											<text style="max-width: 85%;max-height: 60upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.userNickname}}
											</text>
											<!-- <text style="font-size: 24upx;height: 30upx;line-height:30upx;margin-left: 20upx;padding:0 4upx;background-color: #ffbf59;border-radius: 4upx;color: #FFFFFF;">
												{{item.growthValue}}
											</text> -->
										</view>
										<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;">
											<text style="width: 70%;max-height: 60upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;color: #AAAAAA;font-size: 24upx;" >
												用户名：{{item.userName}}
											</text>
											<view v-if="item.isShowCareBtn && !item.isMyself" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
												<view style="width: 100upx;height:50upx;background-color: #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
													<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #FFFFFF;">关注</text>
												</view>
											</view>
											<view v-if="!item.isShowCareBtn && !item.isMyself" @click="ClickCareBtn(item)" style="width: 30%;justify-content: flex-end;align-items: center;">
												<view style="width: 100upx;height:50upx;border: 1px solid #ffbf59;border-radius: 30upx;align-items: center;justify-content: center;">
													<text style="height: 50upx;line-height: 50upx;font-size: 24upx;color: #ffbf59;">已关注</text>
												</view>
											</view>
										</view>
										<view style="flex-direction: row;width: 100%;line-height: 40upx;font-size: 24upx;color: #AAAAAA;">
											<text style="width: 60%;">粉丝：{{item.fansCount}}</text>
										</view>
									</view>
								</view>
								<view style="flex-direction: row;width: 100%;line-height: 50upx;align-items: center;color: #AAAAAA;font-size: 24upx;">
									<text style="width: 100%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
										简介：{{item.userProfile?item.userProfile:'此用户很懒，什么都没有留下'}}
									</text>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	</view>	
</template>

<script>
	import _ from 'lodash';
	import {friendlyDate} from '@/utils/timeTransfrom.js';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				pageShow:false,
				typeText:["文章","笔记","动态","问答"],
				avatarUrl_default:"../../static/header_default.png",
				pet_avatarUrl_default:"../../static/pet_header_default.png",
				tabBars: [
					{name: '文章',id: '0'},
					{name: '笔记',id: '1'},
					{name: '动态',id: '2'},
					{name: '问答',id: '3'},
					{name: '小组',id: '4'},
					{name: '用户',id: '5'}
				],//导航
				
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				loadMoreStatus: 2, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				page_0:1,
				page_1:1,
				page_2:1,
				page_3:1,
				page_4:1,
				page_5:1,
				list_0:[],
				list_1:[],
				list_2:[],
				list_3:[],
				list_4:[],
				list_5:[],
				
				search_text:'',
				historyData:[],
				isShow:true,
				hot_words:[]
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.debouncedGetAnswer = _.debounce(this.onPulldownReresh, 1000)
			
			//查询历史热搜数据
			this.getHotWords()
			
			if(uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)){
				let arr1 = uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)
				arr1.reverse()
				let arr2 = arr1.slice(0,10)
				this.historyData = []
				this.historyData = arr2
			}
		},
		onNavigationBarSearchInputChanged (val) {
			this.search_text = val.text
			this.debouncedGetAnswer()
		},
		methods: {
			// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
			inputChange(event){
				this.search_text = event.target.value
				this.debouncedGetAnswer()
			},
			// #endif
			
			show_hide(){
				this.isShow = !this.isShow
			},
			del_history(){
				uni.setStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId,'')
				this.historyData = uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)
			},
			historyItem(str){
				this.search_text = str
				this.debouncedGetAnswer()
				
				// #ifdef APP-PLUS
				let webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewSearchInputText(this.search_text);
				// #endif
				// #ifdef H5
				let inputSearch=document.querySelector('.uni-input-input[type=search]');
				var evt = new InputEvent('input', {
					inputType: 'insertText',
					data: this.search_text,
					dataTransfer: null,
					isComposing: false
				});
				if(inputSearch){
					inputSearch.value = this.search_text;
					inputSearch.dispatchEvent(evt);
				}
				// #endif
			},
			//查询历史热搜数据
			getHotWords(){
				let param={}
				let opts={ url:'/portal/v1/post/get_hot_words', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							this.hot_words = res.data.data
						}
					}
				)
			},
			//前端查询帖子列表分页   热门推荐
			getPostList(type){
				let param={}
				let opts={}
				let postType = this.tabCurrentIndex
				
				if(postType == 0){
					param={
						"limit": this.limit,
						"page": this.page_0,
						"keyword": this.search_text,
						"postType": postType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻   全部：为空
					}
					opts={ url:'/portal/v1/post/get_post_by_keyword', method:'POST' }
				}else if(postType == 1){
					param={
						"limit": this.limit,
						"page": this.page_1,
						"keyword": this.search_text,
						"postType": postType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻   全部：为空
					}
					opts={ url:'/portal/v1/post/get_post_by_keyword', method:'POST' }
				}else if(postType == 2){
					param={
						"limit": this.limit,
						"page": this.page_2,
						"keyword": this.search_text,
						"postType": postType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻   全部：为空
					}
					opts={ url:'/portal/v1/post/get_post_by_keyword', method:'POST' }
				}else if(postType == 3){
					param={
						"limit": this.limit,
						"page": this.page_3,
						"keyword": this.search_text,
						"postType": postType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻   全部：为空
					}
					opts={ url:'/portal/v1/post/get_post_by_keyword', method:'POST' }
				}else{
					if(postType == 4){//小组
						param={
							"limit": this.limit,
							"page": this.page_4,
							"groupName": this.search_text,
						}
						opts={ url:'/portal/v1/group/name/list', method:'POST' }
					}
					if(postType == 5){//用户
						param={
							"limit": this.limit,
							"page": this.page_5,
							"userNickname": this.search_text,
						}
						opts={ url:'/portal/v1/page/list/expert', method:'POST' }
					}
				}
				
				// let param={
				// 	"limit": this.limit,
				// 	"page": this.page_0,
				// 	"keyword": this.search_text,
				// 	"postType": postType,  //类型 0: 文章 1：笔记 2：动态 3：问答 4：新闻   全部：为空
				// }
				// let opts={ url:'/portal/v1/post/get_post_by_keyword', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(this.search_text){
								this.pageShow = true
							}else{
								this.pageShow = false
							}
							if(res.data.data.records.length ==0){//没有数据
								if(this.tabCurrentIndex==0)this.page_0 --
								if(this.tabCurrentIndex==1)this.page_1 --
								if(this.tabCurrentIndex==2)this.page_2 --
								if(this.tabCurrentIndex==3)this.page_3 --
								if(this.tabCurrentIndex==4)this.page_4 --
								if(this.tabCurrentIndex==5)this.page_5 --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								let arr = res.data.data.records
								// sousuo 处理高亮加粗
								for(let m=0;m<arr.length;m++){
									if(postType<4){
										var subStr = new RegExp('<em>','ig');//创建正则表达式对象,不区分大小写,全局查找
										var replaceStr = '<span style="color:#f76d45;font-weight: bold;">';
										var result_1 = arr[m].postTitle.replace(subStr,replaceStr);//把'is'替换为空字符串
										var subStr = new RegExp('</em>','ig');//创建正则表达式对象,不区分大小写,全局查找
										var replaceStr = '</span>';
										var result_2 = result_1.replace(subStr,replaceStr);//把'is'替换为空字符串
										arr[m].postTitle = result_2
										var subStr = new RegExp('<em>','ig');//创建正则表达式对象,不区分大小写,全局查找
										var replaceStr = '<span style="color:#f76d45;font-weight: bold;">';
										var result_3 = arr[m].postContent.replace(subStr,replaceStr);//把'is'替换为空字符串
										var subStr = new RegExp('</em>','ig');//创建正则表达式对象,不区分大小写,全局查找
										var replaceStr = '</span>';
										var result_4 = result_3.replace(subStr,replaceStr);//把'is'替换为空字符串
										arr[m].postContent = result_4
										arr[m].timerAgo = friendlyDate(new Date(arr[m].createTime.replace(/\-/g,'/')).getTime(),arr[m].createTime)
									}
									if(this.tabCurrentIndex==5){
										// 处理 关注状态
										if(arr[m].userId == uni.getStorageSync('userInfo').userId){
											arr[m].isMyself = true
											arr[m].isShowCareBtn = false
										}else{
											if(arr[m].ifollowed){
												arr[m].isShowCareBtn = false
											}else{
												arr[m].isShowCareBtn = true
											}
										}
									}
									if(this.tabCurrentIndex==0 && this.list_0.length<res.data.data.total)this.list_0.push(arr[m])
									if(this.tabCurrentIndex==1 && this.list_1.length<res.data.data.total)this.list_1.push(arr[m])
									if(this.tabCurrentIndex==2 && this.list_2.length<res.data.data.total)this.list_2.push(arr[m])
									if(this.tabCurrentIndex==3 && this.list_3.length<res.data.data.total)this.list_3.push(arr[m])
									if(this.tabCurrentIndex==4 && this.list_4.length<res.data.data.total)this.list_4.push(arr[m])
									if(this.tabCurrentIndex==5 && this.list_5.length<res.data.data.total)this.list_5.push(arr[m])
								}
							}
						}
						
						let arr = []
						if(uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)){
							arr = uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)
						}
						if(this.search_text != "" && arr.indexOf(this.search_text) == -1){
							arr.push(this.search_text)
						}
						uni.setStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId,arr)
						let arr1 = uni.getStorageSync("searchHistoryData_"+uni.getStorageSync('userInfo').userId)
						arr1.reverse()
						let arr2 = arr1.slice(0,10)
						this.historyData = []
						this.historyData = arr2
						
						//下拉刷新 关闭刷新动画
						if(type === 'refresh'){
							this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							this.refreshing = false;
							// #endif
							this.loadMoreStatus = 2;
						}
						//上滑加载 处理状态
						if(type === 'add'){
							this.loadMoreStatus = 2;
						}
					}
				)
			},
			//下拉刷新
			onPulldownReresh(){
				// if(this.search_text == ""){
				// 	return;
				// }
				this.list_0 = [];
				this.list_1 = [];
				this.list_2 = [];
				this.list_3 = [];
				this.list_4 = [];
				this.list_5 = [];
				this.page_0 = 1;
				this.page_1 = 1;
				this.page_2 = 1;
				this.page_3 = 1;
				this.page_4 = 1;
				this.page_5 = 1;
				
				this.loadMoreStatus = 1;
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
				if(this.tabCurrentIndex==0)this.page_0 ++
				if(this.tabCurrentIndex==1)this.page_1 ++
				if(this.tabCurrentIndex==2)this.page_2 ++
				if(this.tabCurrentIndex==3)this.page_3 ++
				if(this.tabCurrentIndex==4)this.page_4 ++
				if(this.tabCurrentIndex==5)this.page_5 ++
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
				this.getPostList(type)
			},
			
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			//tab切换
			async changeTab(e){
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(()=>{
					if (width - nowWidth/2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
					}else{
						this.scrollLeft = 0;
					}
					if(typeof e === 'object'){
						this.tabCurrentIndex = index; 
					}
					this.tabCurrentIndex = index; 
					// //第一次切换tab，动画结束后需要加载数据
					// if(this.tabCurrentIndex !== 0 && this.loaded !== true){
					// 	this.loadNewsList('add');
					// 	this.loaded = true;
					// }
					
					//下拉刷新  切换完成加载数据
					this.onPulldownReresh()
					
				}, 300)
			},
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			goActionItem_Details(item) {
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
				}
			},
			ClickCareBtn(item){
				//添加/修改关注状态
				if(this.tabCurrentIndex == 4){//小组
					var param={
						"followTargetId": item.groupId, //关注目标ID
						"followTargetType": 9, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								for(var i=0;i<this.list_4.length;i++){
									if(item.groupId == this.list_4[i].groupId){
										this.list_4[i].currentUserFollowStatus = !this.list_4[i].currentUserFollowStatus
									}
								}
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
								consuni.showToast({
								    title: res.data.msg,
									icon: 'none',
								    duration: 1000
								});			
							}
						}
					)
				}
				if(this.tabCurrentIndex == 5){//用户
					var param={
						"followTargetId": item.userId, //关注目标ID
						"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
					} ;
					let opts={ url:'/portal/v1/follow/update', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200 ){
								for(var i=0;i<this.list_5.length;i++){
									if(item.userId == this.list_5[i].userId){
										this.list_5[i].isShowCareBtn = !this.list_5[i].isShowCareBtn
									}
								}
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
								consuni.showToast({
								    title: res.data.msg,
									icon: 'none',
								    duration: 1000
								});			
							}
						}
					)
				}
				
				// let param={
				// 	"followTargetId": item.userId, //关注目标ID
				// 	"followTargetType": 7, //关注目标类型 0-文章 1-笔记 2-动态 3-问答 4-新闻 5-评论 6-回复 7-用户 8-话题 9-小组 10-赞 11-收藏 12-分享 13-通知  14-关注
				// } ;
				
			},
			click_group(item){
				uni.navigateTo({
					url:this.navigatorUrl.groupDetailsPages + '?id=' + item.groupId
				})
			},
			click_user(item){
				uni.navigateTo({
					url:this.navigatorUrl.personalPages + '?id=' +  item.userId
				})
			}
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
	/* 个人中心 */
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		/* font-size: 14px; */
		background-color: #f9f9f9;
	}
	
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		/* box-shadow: 0 2upx 8upx rgba(0,0,0,.06); */
		background-color: #fff;
		/* text-align: center; */
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			width: 16%;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			/* font-size: 36upx; */
			color: #303133;
			position: relative;
			font-weight: bold;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6upx solid #f76d45;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #f76d45;
			&:after{
				width: 80%;
			}
		}
	}
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		/* margin: 2upx 0 100upx; */
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
