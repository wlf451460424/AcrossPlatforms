<template>
	<view class="center">
		<view style="flex-direction: column;width: 100%; height: 400upx;background-color: #f76d45;padding: 20upx;color: #FFFFFF;border-radius: 10upx;">
			<view style="height: 60upx;line-height: 60upx;align-items: center;">
				<text>当前经验值</text>
				<image @click="introducePage" src="@/static/mine-ico/wen.png" style="width: 28upx;height:28upx;margin-left:10upx;"></image>
			</view>
			<view style="height: 60upx;line-height: 60upx;justify-content: flex-end;">
				<text style="font-size: 18px;">{{growthValue}}</text>
			</view>
			<view style="height: 60upx;line-height: 60upx;margin-bottom: 40upx;">
				<text @click="growthValueList(growth)" style="font-size: 22px;font-weight: bold;">{{growth}}</text>
			</view>
			<view class="example-body" style="width: 100%;">
				<uni-steps :options="list1" active-color="#f7e617" :active="active-1" style="width: 100%;"/>
			</view>
		</view>
		<text style="width: 100%;height:80upx;font-weight: 700;text-align: center;padding-top: 20upx;">
			距离升级还需
		</text>
		<view style="flex-direction: column;width: 100%; height:180upx;background-color: #FFFFFF;">
			<view style="width: 100%;height: 160upx;margin-top: 10upx;">
				<view style="width: 33%;height: 100%;flex-direction: column;align-items: center;">
					<text style="line-height: 80upx;color: #AAAAAA;">{{list1[active-1].name}}</text>
					<text style="line-height: 80upx;color: #333333;font-weight: 700;font-size: 20px;">{{growth}}</text>
				</view>
				<view style="width: 33%;height: 100%;flex-direction: column;align-items: center;">
					<view style="height: 50upx;"></view>
					<text style="padding-right: 60upx;color: #333333;font-weight: 700;">+ {{list1[active].title - growth}}</text>
					<image style="width:160upx;height: 35upx;" src="@/static/mine-ico/growthIco.png"></image>
				</view>
				<view style="width: 33%;height: 100%;flex-direction: column;align-items: center;">
					<text style="line-height: 80upx;color: #AAAAAA;">{{list1[active].name}}</text>
					<text style="line-height: 80upx;color: #333333;font-weight: 700;font-size: 20px;">{{list1[active].title}}</text>
				</view>
			</view>
		</view>
		<text style="width: 100%;height:80upx;font-weight: 700;text-align: center;padding-top: 20upx;">
			如何提升经验值
		</text>
		<view style="flex-direction: column;width: 100%;background-color: #FFFFFF;padding: 10upx;">
			<text style="width: 100%;line-height:60upx;font-weight: 700;padding-left: 10upx;">
				完善资料
			</text>
			<view style="flex-direction: column;width: 100%;margin-top: 4upx;">
				<view @click="addPet" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/add_pet.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >添加宠物</text>
						<text style="color: #AAAAAA;">+2分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
		</view>	
		<view style="flex-direction: column;width: 100%;margin-top: 8upx;">
			<text style="width: 100%;line-height:60upx;font-weight: 700;background-color: #FFFFFF;padding-left: 20upx;">
				更多互动
			</text>
			<view style="flex-direction: column;width: 100%;">
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/article.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布文章</text>
						<text style="color: #AAAAAA;">+5分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;margin-top: 2upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/tween.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布动态</text>
						<text style="color: #AAAAAA;">+5分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;margin-top: 2upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/note.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布笔记</text>
						<text style="color: #AAAAAA;">+5分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;margin-top: 2upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/qa.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布问答</text>
						<text style="color: #AAAAAA;">+5分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
		</view>
		<view v-if="false" style="flex-direction: column;width: 100%;margin-top:8upx;">
			<text style="width: 100%;line-height:60upx;font-weight: 700;padding-left: 20upx;background-color: #FFFFFF;">
				使用服务
			</text>
			<view style="flex-direction: column;width: 100%;">
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/foster.png" style="width:60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布寄养</text>
						<text style="color: #AAAAAA;">+10分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;margin-top: 2upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/adopt.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布领养</text>
						<text style="color: #AAAAAA;">+10分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
				<view @click="goDownload" style="flex-direction: row;width: 100%;height: 120upx;line-height: 60upx;background-color: #FFFFFF;padding: 0 20upx;margin-top: 2upx;">
					<view style="width: 15%;height: 100%;align-items: center;">
						<image src="@/static/mine-ico/growth/pair.png" style="width: 60upx;height:60upx;"></image>
					</view>
					<view style="flex-direction: column;width: 70%;height: 100%;justify-content: center;">
						<text >发布配对</text>
						<text style="color: #AAAAAA;">+10分</text>
					</view>
					<view style="width: 15%;height: 100%;align-items: center;justify-content: flex-end;" >
						<image style="width: 16upx;height: 26upx;" src="@/static/mine-ico/next.png">
					</view>
				</view>
			</view>
			
		</view>	
	</view>	
</template>

<script>
	import uniSteps from '@/components/steps/uni-steps/uni-steps.vue'
	import uniSection from '@/components/steps/uni-section/uni-section.vue'
	export default {
		components: {
			uniSection,
			uniSteps
		},
		data() {
			return {
				growth:0,
				growthValue:'',
				active: 0,
				list1: [{
						title: '0',
						desc: 'LV1',
						index:1,
						name:'养宠小白'
					}, {
						title: '200',
						desc: 'LV2',
						index:2,
						name:'养宠新手'
					}, {
						title: '1000',
						desc: 'LV3',
						index:3,
						name:'宠物熟手'
					}, {
						title: '5000',
						desc: 'LV4',
						index:4,
						name:'养宠高手'
					}, {
						title: '20000',
						desc: 'LV5',
						index:5,
						name:'养宠达人'
					}, {
						title: '40000',
						desc: 'LV6',
						index:6,
						name:'养宠专家'
					}, {
						title: '100000',
						desc: 'LV7',
						index:7,
						name:'养宠大神'
					},
				],
			}
		},
		async onLoad(e) {
			// console.log(e.growth)
			this.growth = e.growth
			this.growthValue = this.calculation.groupArr(e.growth)
			// console.log(this.growthValue)
			this.active = Number(this.growthValue.substr(2,1))
		},
		methods:{
			introducePage(){
				uni.navigateTo({
					// url:'introduce'
					url:'/pages/mine/agree/index?type=16'
				})
			},
			growthValueList(value){
				uni.navigateTo({
					url:'/pages/mine/growth/growth-value-list?value=' + value
				})
			},
			addPet(){
				uni.navigateTo({
					url:'/pages/mine/pet/pet-add'
				})
			},
			goDownload(){
				// #ifdef H5 
				// this.calculation.wakeUp_app('toMain/main')
				//友盟的唤醒方式
				this.calculation.um_wakeUp_app("mianDetails",{})
				//  #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU 
				uni.showToast({
				    title: '请前往APP端进行发布',
					icon: 'none',
				    duration: 2000
				});
				//  #endif
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
	.center {
		width: 100%;
		flex-direction: column;
		color: #5c5f66;
		background-color: #f9f9f9;
		padding: 15upx;
	}
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		// font-size: 14rpx;
		// background-color: #ffffff;
	}
</style>
