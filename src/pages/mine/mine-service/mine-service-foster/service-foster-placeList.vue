<template>
	<view class="content">
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 0;" ref="mixPulldownRefresh" class="panel-content" :top="0" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box" :duration="300"  >
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;flex-flow: wrap;padding:6upx 0 12upx 6upx;">
							<view v-for="(item,key) in list" :key="key"@touchstart.prevent="longpress(item)" @touchend.prevent="tap(item)"
									style="position: relative;flex-direction: column;width: 48%; height: 530upx;margin:6upx;display:block;background: #FFFFFF;border-radius: 4upx;">
								<view style="flex-direction: column;">
									<image :src="item.fosteragePlaceImage?decodeURIComponent(item.fosteragePlaceImage):base_default" mode="aspectFill" style="width: 100%; height: 410upx; border-radius: 4upx; "></image>
									<view style="flex-direction: column;padding-top: 6upx;">
										<view style="width: 100%;padding:0 12upx;">
											<text style="width:60%;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.fosteragePlaceName}}
											</text>
											<text style="width: 40%;text-align: right;font-size: 24upx;color: #ffbf59;">{{item.score}}</text>
										</view>
										<view style="width: 100%;color: #AAAAAA;padding: 6upx 12upx;">
											<text style="max-width: calc(100% - 70upx);display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">
												{{item.fosteragePlacePoi}}
											</text> 
											<text v-if="item.distance"> | </text>
											<text>{{item.distance}}</text>
										</view>
									</view>
								</view>
								<view v-if="item.fosteragePlaceAuditResult == 0" style="position: relative;top:-530upx;left:0;width: 100%;height: 530upx;background: #FFFFFF;opacity: 0.6;border-radius: 4upx;align-items: center;justify-content: center;padding-bottom: 130upx;">
									<view style="width: 140upx;height: 140upx;border-radius: 100upx; background-color: #000000;align-items: center;justify-content: center;">
										<text style="color: #FFFFFF;font-size: 28upx;">待审核</text>
									</view>
								</view>
								<view v-if="item.fosteragePlaceAuditResult == 1" style="position: relative;top:-530upx;left:0;width: 100%;height: 530upx;background: #FFFFFF;opacity: 0.6;border-radius: 4upx;align-items: center;justify-content: center;padding-bottom: 130upx;">
									<view style="width: 140upx;height: 140upx;border-radius: 100upx; background-color: #000000;align-items: center;justify-content: center;">
										<text style="color: #FFFFFF;font-size: 28upx;">审核失败</text>
									</view>
								</view>
								<view v-if="item.fosteragePlaceAuditResult == 2 && item.fosteragePlaceStatus == 1" style="position: relative;top:-530upx;left:0;width: 100%;height: 530upx;background: #FFFFFF;opacity: 0.6;border-radius: 4upx;align-items: center;justify-content: center;padding-bottom: 130upx;">
									<view style="width: 140upx;height: 140upx;border-radius: 100upx; background-color: #000000;align-items: center;justify-content: center;">
										<text style="color: #FFFFFF;font-size: 28upx;">暂停营业</text>
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					</scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showOperation" type="bottom" style="z-index: 999;">
			<view class="uni-share" style="flex-direction: column;background-color: #FFFFFF;padding: 40upx;20upx">
				<view @click="opening" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;color: #FFFFFF;">
					<text style="line-height: 80upx;">{{fosteragePlaceStatus==0?'暂停营业':'营&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业'}}</text>	
				</view>
				<view @click="placeDel" style="width: 100%;height: 90upx;margin-top: 30upx;background-color: #f76d45;justify-content: center;align-items: center;color: #FFFFFF;">
					<text>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</text>
				</view>
			</view>
		</uni-popup>
		
		<uniPopup ref="remind_uniPopup" :mask-click="false" type="center">
			<view class="uni-tip">
				<text class="uni-tip-content" >{{remind_uniPopup_message}}</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" style="color: #f76d45;" @click="remind_cancel">取消</text>
					<text class="uni-tip-button" style="color: #f76d45;" @click="remind_confirm">确认</text>
				</view>
			</view>
		</uniPopup>
		
	</view>
</template>

<script>
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data() {
			return {
				remind_uniPopup_message:'',
				remind_uniPopup_type:'',
				avatarUrl_default:"../../../static/header_default.png",
				
				tabCurrentIndex: 0, //当前选项卡索引
				enableScroll: true,
				loadMoreStatus: 0, //加载更多 0加载前，1加载中，2没有更多了
				
				statusArr:["待确认","待送达","","待完成","待评价","已评价","已关闭"],
				
				fosteragePlaceStatus :0,
				fosteragePlaceId:'',
				Loop:Object,
				
				limit:10,
				page:1,
				list:[],
			}
		},
		async onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			//获取列表
			this.onPulldownReresh()
		},
		onShow() {
			//查询订单列表
			// this.onPulldownReresh()
		},
		methods: {
			//前端列表分页
			getList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"fosteragePlaceUserId": uni.getStorageSync('userInfo').userId,
				}
				let opts={ url:'/portal/v1/fosterage_place/page/list/map', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
								return;
							}else{
								let arr = res.data.data.records
								for(let i=0;i<arr.length;i++){
									//处理图片
									arr[i].fosteragePlaceImage = arr[i].fosteragePlaceImage.split(",")[0]
									
									if(arr[i].score > 0){
										arr[i].score = arr[i].score + '分'
									}else{
										arr[i].score = "暂无评分"
									}
									
									if(this.list.length<res.data.data.total)this.list.push(arr[i])
								}
							}
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
						
						//下拉刷新 关闭刷新动画
						if(type === 'refresh'){
							this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							this.refreshing = false;
							// #endif
							this.loadMoreStatus = 3;
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
				this.list = [];
				this.page = 1;
				
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
				this.getList(type)
			},
			cancel() {
				this.$refs.showOperation.close()
			},
			longpress(item){
				clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
				this.Loop = setTimeout(() => {
					this.Loop = 0;
					//执行长按
					// console.log('你长按我，干锤子')
					this.opreation(item)
				}, 1000);
				return false;
			},
			tap(item) {
				// var that=this;
				clearTimeout(this.Loop);
				if(this.Loop!=0){
					//执行点击
					// console.log('点我了')
					uni.navigateTo({
						url:this.navigatorUrl.fosterageDetailsPages + '?id=' + item.fosteragePlaceId
					})
				}
				return false;
			},
			opreation(item){
				//0：待审核/1: 未通过/2: 已通过
				if(item.fosteragePlaceAuditResult == 0){
					return;
				}
				
				this.$refs.showOperation.open()
				this.fosteragePlaceStatus = item.fosteragePlaceStatus //营业状态
				this.fosteragePlaceId = item.fosteragePlaceId //场所id
			},
			placeDel(){
				this.$refs.showOperation.close()
				
				this.$refs.remind_uniPopup.open()
				this.remind_uniPopup_type = 2
				this.remind_uniPopup_message = '真的要删除吗?'
			},
			opening(){
				this.$refs.showOperation.close()
				
				this.$refs.remind_uniPopup.open()
				this.remind_uniPopup_type = 1
				this.remind_uniPopup_message = '确认要修改营业状态吗?'
			},
			remind_cancel(){
				this.$refs.remind_uniPopup.close()
			},
			remind_confirm(){
				this.$refs.remind_uniPopup.close()
				
				if(this.remind_uniPopup_type == 1){ //改变状态
					let value = 0
					if(this.fosteragePlaceStatus==0){
						value=1
					}
					if(this.fosteragePlaceStatus==1){
						value=0
					}
					let param={
						"fosteragePlaceId":this.fosteragePlaceId,
						"fosteragePlaceStatus": value
					} ;
					let opts={ url:'/portal/v1/fosterage_place/update/status', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								this.fosteragePlaceStatus = value
								//刷新列表
								for(let i=0;i<this.list.length;i++){
									if( this.list[i].fosteragePlaceId == this.fosteragePlaceId){
										this.list[i].fosteragePlaceStatus = this.fosteragePlaceStatus
									}
								}
							}else{
								uni.showToast({
								    title: res.data.msg,
									icon: 'none',
								    duration: 1000
								})
							}
						}
					)
				}
				if(this.remind_uniPopup_type == 2){ //是否删除
					let param={
						"fosteragePlaceId":this.fosteragePlaceId,
					} ;
					let opts={ url:'/portal/v1/fosterage_place/remove', method:'POST' }
					this.http.httpTokenRequest(opts,param).then(
						res => {
							if(res.data.code == 200){
								//查询订单列表
								this.onPulldownReresh()
							}else{
								uni.showToast({
								    title: res.data.msg,
									icon: 'none',
								    duration: 1000
								})
							}
						}
					)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	
	.swiper-box{
		height: 100%;
	}
	
	.panel-scroll-box{
		height: 100%;
		margin: 0 0 100upx;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
