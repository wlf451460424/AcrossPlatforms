<template>
	<view>
		<view class="ld">
			<view class="left">
				<scroll-view 
				:scroll-y="true"
				:scroll-with-animation="true" 
				:scroll-into-view="clickToId" 
				:style="{'height':windowHeight}">
					<view v-for="(item, index) in tabBars" :key="index">
						<view 
						:class="['title',{active:index===currentNum}]"
						:id="'to'+index"
						@click="setId(index,item)">
							{{item.tagGroupName}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view 
				:scroll-into-view="clickId" 
				@scroll="scroll"
				:scroll-with-animation="true" 
				:scroll-y="true" 
				:style="{'height':windowHeight}">
					<view v-for="(item,index) in list" :key="index" style="display: flex;flex-direction:row;width: 100%;background-color: #FFFFFF;margin-bottom:2upx;padding:12upx 20upx;" >
						<view @click="go_page(item.tagId)" style="display: flex;align-items:center;margin-right: 20upx;">
							<image :src="item.tagAvatar" style="width:100upx;height: 100upx;border-radius: 100upx;"></image>
						</view>
						<view @click="go_page(item.tagId)" style="display: flex;flex-direction: column; width:100%;height: 100%;">
							<view style="flex-direction: column;width: 100%;">
								<text style="color: #333333;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
									{{item.tagName}}
								</text>
								<text style="color: #888888;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;" >
									{{item.tagDescription}}
								</text>
							</view>
							<view style="flex-direction: row;width: 100%;">
								<text style="width: 60%;color: #F76D45;">{{item.partNumber}}人已参与</text>
							</view>
						</view>
						<view v-if="!item.ifollowed"  style="display: flex;min-width: 20%;align-items:center;justify-content: flex-end;">
							<view @click="ClickCareBtn(item)" style="display: flex;width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;background: #ffbf59;">
								<text style="line-height: 50upx;color: #FFFFFF;font-size: 24upx;">订阅</text>
							</view>
						</view>
						<view v-if="item.ifollowed" style="display: flex;min-width: 20%;align-items:center;justify-content: flex-end;">
							<view @click="ClickCareBtn(item)" style="display: flex;width: 100upx;height: 50upx;border-radius: 30upx;align-items: center;justify-content: center;border: 1px solid #ffbf59;">
								<text style="line-height: 50upx;color: #ffbf59;font-size: 24upx;">已订阅</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars:[],
				list: [],
				
				windowHeight: '0px',
				clickId: '',
				clickToId:'',
				currentNum: 0,
				topList:[],
				isLeftClick:false
			};
		},
		onLoad() {
			let _that = this;
			uni.getSystemInfo({
				success: function(res) {
					_that.windowHeight = res.windowHeight + 'px';
				}
			});
			this.getTopicTypeList();
		},
		methods: {
			//获取标签类别
			getTopicTypeList(){
				let param={}
				let opts={url:'/portal/v1/tag/get/group/list', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.tabBars = res.data.data.records;
							this.gettagList(res.data.data.records[0].tagGroupId)
						}
					}
				)
			},
			go_page(value){
				uni.navigateTo({
					url:this.navigatorUrl.tagDetailsPages + '?id=' + value
				})
			},
			//添加/修改关注状态
			ClickCareBtn(item){
				let param={
					"followTargetId": item.tagId, //关注目标ID
					"followTargetType": 20, //关注目标类型    8：话题 9：小组 20：标签
				} ;
				let opts={ url:'/portal/v1/follow/update', method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							for(var i=0;i<this.list.length;i++){
								if(item.tagId == this.list[i].tagId){
									this.list[i].ifollowed = !this.list[i].ifollowed
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
			},
			setId(index,item) {
				this.clickId = "po" + index;
				this.isLeftClick=true;
				this.currentNum=index;
				this.gettagList(item.tagGroupId)
			},
			scroll(e){
				if(this.isLeftClick){
					this.isLeftClick=false;
					return;
				}
				let scrollTop=e.target.scrollTop;
				for (let i = 0; i < this.topList.length; i++) {
					let h1=this.topList[i];
					let h2=this.topList[i+1];
					if(scrollTop>=h1&&scrollTop<h2){
						this.currentNum=i;
						this.clickToId='to'+i
					}
				}
			},
			//获取标签列表
			gettagList(tagGroupId){
				let param={"tagGroupId": tagGroupId,}
				let str = "/portal/v1/tag/get/tag_id/list/" + tagGroupId
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200 ){
							this.list = res.data.data.records;
						}
					}
				)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ld {
		display: flex;
		background-color: #F9F9F9;
		
		.left {
			width: 25%;
			.title {
				text-align: center;
				height: 124upx;
				line-height: 124upx;
				margin-bottom: 2upx;
			}
			.active{
				background-color: #FFFFFF;
				color: #f76d45;
			}
		}
		.right {
			flex: 1;
			.title {
				color: #DD524D;
				padding: 20upx;
				font-weight: 700;
			}
			.item {
				padding-left: 20upx;
				display: inline-block;
				height: 50upx;
			}
		}
	}
</style>
