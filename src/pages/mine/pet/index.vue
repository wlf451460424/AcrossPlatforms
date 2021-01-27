<template>
	<view class="content">
		<view style="z-index: 3;width: 100%;flex-direction: column;">
			<view class="banner" style="margin-bottom: 4upx;">
			    <image class="banner-img" :src="petAvatar?decodeURIComponent(petAvatar):petAvatar_default"  mode="aspectFill"></image>
			    <view class="banner-title">
					<view style="flex-direction: column;width: 100%; height: 120upx;justify-content: center;align-items: center;">
						<text style="font-size: 32upx;font-weight: bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{petNickname}}</text>
						<view>
							<text v-if="petBreedName"  style="height: 40upx;line-height: 40upx;font-size: 24upx;margin-right: 12upx;padding:0 12upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.2);">
								{{petBreedName}}
							</text>
							<text v-if="petGender<2" style="height: 40upx;line-height: 40upx;font-size: 24upx;margin-right: 12upx;padding:0 12upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.2);">
								{{petGender_array[petGender]}}
							</text>
							<text v-if="petBirthday" style="height: 40upx;line-height: 40upx;font-size: 24upx;margin-right: 12upx;padding:0 12upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.2);">
								{{petAge}}
							</text>
							<!-- <text v-if="petData.petWeight>0" style="height: 40upx;line-height: 40upx;font-size: 24upx;margin-right: 12upx;padding:0 12upx;border-radius: 4upx;color: #FFFFFF;background-color:rgba(255,255,255,0.2);">
								{{petData.petWeight}}kg
							</text> -->
						</view>
					</view>
				</view>
				<view class="banner-title1">
					<image @click="lookBigPic" :src="petAvatar?decodeURIComponent(petAvatar):petAvatar_default" mode="aspectFill"
						style="width: 140upx;height: 140upx; border-radius: 140upx;"></image>
				</view>
			</view>
			
			<view v-if="planList.length>0?true:false" style="z-index: 2;width: 100%;height: 200upx;flex-direction: column;padding:0 20upx;background-color: #FFFFFF;">
				<text style="font-size: 28upx;font-weight: bold;line-height: 70upx;">宠物健康</text>
				<scroll-view scroll-x="true" style="width: 100%;height:130upx;white-space: nowrap;">
					<view v-for="(item,index) in planList" v-model="planList" :key="index" style="flex-direction: column;width: 35%;height:120upx;display: inline-block;vertical-align: middle;margin-right:30upx;border-radius: 6upx;background-color: #f9f9f9;">
						<view style="width: 100%;height:60upx;align-items: center;justify-content: center;">
							<image :src="planArr[item.remindTypeTypeId]" style="width: 50upx;height: 50upx;" mode="aspectFill"></image>
							<text style="line-height:60upx;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;margin-left: 20upx;">
								{{item.remindTypeName}}
							</text>	
						</view>
						<view style="width: 100%;height:60upx;align-items: center;justify-content: center;">
							<text style="line-height:60upx;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
								{{item.lastTime?item.lastTime.split(" ")[0]:''}}
							</text>	
						</view>
					</view>
				</scroll-view>
			</view>
		</view>	
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh style="z-index: 1;" class="panel-content" :top="100" ref="mixPulldownRefresh"  @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper id="swiper" class="swiper-box" :duration="300">
				<swiper-item>
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" >
						<view style="flex-direction: column; width: 100%;padding:0 20upx;background-color: #FFFFFF;">
							<view  v-for="(itemlist,index) in list" :key="index" @click="goActionItem_Details(itemlist)" style="flex-direction: row;width: 100%;margin: 20upx 0;">
								<!-- 时间轴 -->
								<view style="flex-direction: column;width: 20%;">
									<view style="flex-direction: row;width: 100%;align-items: baseline;">
										<text style="font-weight: 700;font-size: 40upx;">{{itemlist.Day}}</text>
										<text style="font-weight: 700;font-size: 20upx;">{{itemlist.Month}}</text>
									</view>
									<!-- <text style="font-weight: 700;">{{itemlist.MonthDay}}</text> -->
									<text style="color: #888888;font-size: 20upx;max-height:80upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" >
										{{itemlist.postPoi}}
									</text>
								</view>
								<!-- 内容 -->
								<view v-if="itemlist.postContentType === 0" style="width: 80%;">
									<!-- 4 图片 -->
									<view style="flex-direction: row;width: 35%;padding: 4upx;height: 170upx;" v-bind:class="{ hideStyle: !(itemlist.imgArr.length == 4) }">
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
											<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
										</view>
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[2])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
											<image :src="decodeURIComponent(itemlist.imgArr[3])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
										</view>
									</view>
									<!-- 3 图片 -->
									<view style="flex-direction: row;width: 35%;padding: 4upx;height: 170upx;" v-bind:class="{ hideStyle: !(itemlist.imgArr.length == 3) }">
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%;padding: 2upx;"></image>
										</view>
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
											<image :src="decodeURIComponent(itemlist.imgArr[2])" mode="aspectFill"  style="width: 100%; height: 50%;padding: 2upx;"></image>
										</view>
									</view>
									<!-- 2 图片 -->
									<view style="flex-direction: row;width: 35%;padding: 4upx;height: 170upx;" v-bind:class="{ hideStyle: !(itemlist.imgArr.length == 2) }">
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%;padding: 2upx;"></image>
										</view>
										<view style="flex-direction: column;width: 50%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 100%;padding: 2upx;"></image>
										</view>
									</view>
									<!-- 1 图片 -->
									<view style="flex-direction: row;width: 35%;padding: 4upx;height: 170upx;" v-bind:class="{ hideStyle: !(itemlist.imgArr.length == 1) }">
										<view style="flex-direction: column;width: 100%;height: 100%;">
											<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%;padding: 2upx;"></image>
										</view>
									</view>
									<!-- 文字 -->
									<view style="width: 65%;padding-left: 10upx;" v-bind:class="{ width_control: (itemlist.imgArr.length == 0) }">
										<view v-if="itemlist.postTitle" style="font-size: 24upx;padding-top: 4upx;max-height: 174upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
											{{itemlist.postTitle}}
										</view>
										<view v-if="!itemlist.postTitle" style="font-size: 24upx;padding-top: 4upx;max-height: 174upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
											{{itemlist.postContent}}
										</view>
										<!-- <u-parse  :content="itemlist.postContent"></u-parse> -->
									</view>
								</view>
								<view v-if="itemlist.postContentType === 1" style="width: 80%;">
									<!-- 视频封面 -->
									<view style="flex-direction: row;width: 35%;padding: 4upx;height: 170upx;" v-bind:class="{ hideStyle: !(itemlist.imgArr.length == 1) }">
										<view style="position: relative;width: 100%;height: 100%;align-items: center;">
											<image style="width: 100%;height: 100%;border-radius: 4upx;" :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill" ></image>
											<view style="border-radius: 10upx;z-index: 2;position: absolute;background: rgba(0,0,0,0.4);width: 100%;height: 100%;align-items:center;justify-content: center;font-size: 40px;">
												<image style="width: 50upx;height: 50upx;" src="@/static/play.png"></image>
											</view>
											<view style="font-size: 12px;z-index: 3;position: absolute;color: #FFFFFF;width: 100%;height: 100%;align-items: flex-end;justify-content: flex-end;">
												<text style="margin:0 12upx;text-align: end;">{{itemlist.times}}</text>
											</view>
										</view>
									</view>
									<!-- 文字 -->
									<view style="width: 65%;padding-left: 10upx;" v-bind:class="{ width_control: (itemlist.imgArr.length == 0) }">
										<view v-if="itemlist.postTitle" style="font-size: 24upx;padding-top: 4upx;max-height: 174upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
											{{itemlist.postTitle}}
										</view>
										<view v-if="!itemlist.postTitle" style="font-size: 24upx;padding-top: 4upx;max-height: 174upx;line-height: 40upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
											{{itemlist.postContent}}
										</view>
										<!-- <u-parse  :content="itemlist.postContent"></u-parse> -->
									</view>
								</view>
							</view>
						</view>
						<mix-load-more :status="loadMoreStatus"></mix-load-more>
					 </scroll-view>	
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		
		<view v-if="false" style="flex-direction: column; width: 100%;height: 100%;padding: 0 40upx;">
			<!-- <pet-archives-time-item v-for="(item,index) in petTimelist" :key="index" :receive-obj="{list:item}"></pet-archives-time-item> -->
			<view  v-for="(itemlist,index) in petTimelist" :key="index" style="flex-direction: row;width: 100%;height: 200upx;margin: 20upx 0;">
				<!-- 时间轴 -->
				<view style="flex-direction: column;width: 20%;">
					<text>{{itemlist.date}}</text>
					<text>{{itemlist.address}}</text>
				</view>
				<!-- 内容 -->
				<view style="width: 80%;">
					<!-- 4 图片 -->
					<view style="flex-direction: row;width: 35%;padding: 4upx;" :class="{ hideStyle: !(itemlist.img_num == 4) }">
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx;padding: 4upx;"></image>
							<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx; padding: 4upx;"></image>
						</view>
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[2])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx;padding: 4upx;"></image>
							<image :src="decodeURIComponent(itemlist.imgArr[3])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx; padding: 4upx;"></image>
						</view>
					</view>
					<!-- 3 图片 -->
					<view style="flex-direction: row;width: 35%;padding: 4upx;" :class="{ hideStyle: !(itemlist.img_num == 3) }">
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%; border-radius: 20upx;padding: 4upx;"></image>
						</view>
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx;padding: 4upx;"></image>
							<image :src="decodeURIComponent(itemlist.imgArr[2])" mode="aspectFill"  style="width: 100%; height: 50%; border-radius: 20upx; padding: 4upx;"></image>
						</view>
					</view>
					<!-- 2 图片 -->
					<view style="flex-direction: row;width: 35%;padding: 4upx;" :class="{ hideStyle: !(itemlist.img_num == 2) }">
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%; border-radius: 20upx;padding: 4upx;"></image>
						</view>
						<view style="flex-direction: column;width: 50%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[1])" mode="aspectFill"  style="width: 100%; height: 100%; border-radius: 20upx;padding: 4upx;"></image>
						</view>
					</view>
					<!-- 1 图片 -->
					<view style="flex-direction: row;width: 35%;padding: 4upx;" :class="{ hideStyle: !(itemlist.img_num == 1) }">
						<view style="flex-direction: column;width: 100%;height: 100%;">
							<image :src="decodeURIComponent(itemlist.imgArr[0])" mode="aspectFill"  style="width: 100%; height: 100%; border-radius: 20upx;padding: 4upx;"></image>
						</view>
					</view>
					<!-- 文字 -->
					<view style="width: 65%;padding-left: 10upx;align-items: center;" :class="{ width_control: (itemlist.img_num == 0) }">
						<text style="max-height: 190upx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden;" >
							{{itemlist.content}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import qs from 'qs'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				petAvatar:'',
				petAvatar_default:"../../../static/pet_header_default.png",
				
				planArr:[
					"../../../static/mine-ico/plan/xizao.png",
					"../../../static/mine-ico/plan/zhijia.png",
					"../../../static/mine-ico/plan/quchong_n.png",
					"../../../static/mine-ico/plan/timao.png",
					"../../../static/mine-ico/plan/meirong.png",
					"../../../static/mine-ico/plan/tijian.png",
					"../../../static/mine-ico/plan/yimiao.png",
					"../../../static/mine-ico/plan/quchong_w.png",
					"../../../static/mine-ico/plan/kuangquan.png"
				],
				
				petData: Object,
				petTimelist: [],
				petId:'',
				petNickname: '昵称',
				petBreedName:'',
				petBreedId:'',
				petGender: '0',
				petGender_array: ['弟弟','妹妹','未知'],
				petAge: '',
				petBirthday: '',
				
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: false,
				loadMoreStatus: 2, //加载更多 0加载前，1加载中，2没有更多了
				
				limit:10,
				page:1,
				list:[],
				
				planList:[],
				
				times:"",
			}
		},
		onLoad(e) {
			// this.petData = JSON.parse(decodeURIComponent(e.petData));
			this.petId = e.id;
			this.petData.petId = e.id;
			this.petData.petNickname = e.name;
			
			this.petId = this.petData.petId;
			uni.setNavigationBarTitle({
				// title:this.petData.petNickname + '的记录',
				title:'宠物档案'
			})
			
			//查询宠物动态
			this.getPetPostList()
			//获取该宠物最新已执行的各类型提醒计划记录
			this.getPetPlan()
		},
		onShow() {
			// 根据宠物ID查询宠物信息
			let param={"petId":this.petData.petId} ;
			let str = '/portal/v1/pet/get/' + this.petData.petId;
			let opts={ url:str, method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.petAvatar = res.data.data.petAvatar;
						this.petNickname = res.data.data.petNickname;
						this.petBreedId = res.data.data.breedId;
						this.petBreedName = res.data.data.breedName;
						this.petGender = res.data.data.petGender;
						// this.petAge = this.getAge(res.data.data.petBirthday.split(" ")[0]);
						this.petAge = this.getDaysBetween(res.data.data.petBirthday)
						this.petBirthday = res.data.data.petBirthday.split(" ")[0];
						this.petData = res.data.data;
						this.petId = res.data.data.petId;
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
		mounted() {
			window.addEventListener("scroll",this.getScroll); 
		},
		destroyed () {
			window.removeEventListener('scroll', this.getScroll)
		},
		methods: {
			//监听滚动
			getScroll(){
				// console.log(document.documentElement.scrollTop)
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (!!document.documentElement.scrollTop &&document.documentElement.scrollTop > 165){            
					this.enableScroll = true
				}else{
					this.enableScroll = false
				}
			},
			//获取该宠物最新已执行的各类型提醒计划记录
			getPetPlan(){
				let param={petId:this.petId}
				let opts={ url:'/portal/v1/remind_type/get/last/plan', method:'POST' }
				// 发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.planList = res.data.data;
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
			getTime(duration) {
				var min = parseInt(duration / 60);
				var sec = parseInt(duration % 60);
				return this.getType(min) + ":" + this.getType(sec);
			},
			getType(time) {
				return time<10 ? "0" + time : time.toString();
			},
			//前端查询帖子列表分页
			getPetPostList(type){
				let param={
					"limit": this.limit,
					"page": this.page,
					"archivesPetId": this.petId,//宠物相关的帖子
				}
				let opts={ url:'/portal/v1/post/get_list_pet_id', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							if(res.data.data.records.length ==0){//没有数据
								this.page --
								// //上滑加载 处理状态
								this.loadMoreStatus = 2;
							}else{
								if(this.list.length<res.data.data.total){
									this.list = this.list.concat(res.data.data.records)
									for(var i=0;i<this.list.length;i++){
										
										// 处理时间
										this.list[i].Month = Number(this.list[i].createTime.split(" ")[0].split("-")[1]) +'月'
										this.list[i].Day = this.list[i].createTime.split(" ")[0].split("-")[2]
										
										if(this.list[i].postType == 0){
											var str = this.list[i].postContent
											//匹配图片（g表示匹配所有结果i表示区分大小写）
											var imgReg = /<img.*?(?:>|\/>)/gi;
											//匹配src属性
											var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
											var arr = str.match(imgReg);
											if(arr){
												this.list[i].postImage = arr[0].match(srcReg)[1];
											}
										}
										this.list[i].imgArr =[];
										if(this.list[i].postImage)this.list[i].imgArr = this.list[i].postImage.split(",")
										let newArr = this.list[i].imgArr.slice(0,4)
										this.list[i].imgArr = []
										this.list[i].imgArr = newArr
										
										if(this.list[i].postContentType === 1){
											let obj = qs.parse(this.list[i].postImage.split('?')[1])
											if(obj.duration){
												this.list[i].times = this.getTime(obj.duration)
											}
										}
									}
								}
								// let arr = res.data.data.records
								// for(let i=0;i<arr.length;i++){
								// 	if(this.list.length<res.data.data.total)this.list.push(arr[i])
								// }
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
				this.getPetPostList(type)
			},
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this.enableScroll = enable;
				}
			},
			
			edit_PetArchives(){
				uni.navigateTo({
					url:"pet-info-edit?petData=" + encodeURIComponent(JSON.stringify(this.petData))
				})
			},
			//判断用户的年龄
			getAge(Birthday){
				let Age;
				let birthdays = new Date(Birthday.replace(/-/g, "/"));
				let d = new Date();
				let age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1: 0);
				Age = age;
				return Age;
			},
			getDaysBetween(dateString1){
			   var  startDate = Date.parse(dateString1);
			   var myDate = new Date();
			   var  endDate = Date.parse(myDate);
			   var days=(endDate - startDate)/(1*24*60*60*1000);
			   var y = days/365
			   
			   var str = ''
			   if(!y){
				   str = ''
			   }else{
					if(y<1){
						str = '1岁' 
					}else{
						str = parseInt(y) + '岁' 
					}
			   }
			   return  str;
			},
			petPlanPage() {
				uni.navigateTo({
					url:"../plan/index?nowPetID=" + this.petId
				})
			},
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
				}
			},
			lookBigPic(){
				uni.navigateTo({
					url:"/pages/discover/post-details/header-image?imgArr=" + this.petAvatar
				})
			}
			
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
		height: 100%;
		background-color: #f9f9f9;
	}
	template {
		display: flex;
		flex: 1;
	}
	.content {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		
		display: block;
	}
	
	
	.hideStyle{
		display: none;
	}
	.width_control{
		width: 100% !important;
	}

	.swiper-box{
		height: 100%;
	}
	.panel-scroll-box{
		height: 100%;
		// margin: 10upx 0 0 0;
		// background-color: #f9f9f9;
		// padding-bottom: 50px;
	}
	
	.banner {
	    height: 360upx;
	    overflow: hidden;
	    position: relative;
	    background-color: #ccc;
	}
	.banner-img {
	    width: 100%;
		height: 360upx;
		filter: blur(30px);
	}
	.banner-title {
		width: 100%;
		flex-direction: column;
	    overflow: hidden;
	    position: absolute;
	    bottom: 10upx;
	    color: white;
	    z-index: 11;
		padding: 0 40upx;
	}
	.banner-title1 {
		width: 100%;
	    overflow: hidden;
	    position: absolute;
	    bottom:120upx;
		align-items: center;
		justify-content: center;
	}
	
</style>
