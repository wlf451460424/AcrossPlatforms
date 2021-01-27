<template>
	<view style="width: 100%;flex-direction: column;">
		<FosteragePlatformAgree  v-show="type==3"></FosteragePlatformAgree>
		<FosteragePersonalAgree  v-show="type==4"></FosteragePersonalAgree>
		<AdoptPlatformAgree  v-if="type==8"></AdoptPlatformAgree>
		<AdoptPersonalAgree  v-if="type==9"></AdoptPersonalAgree>
		<PairPlatformAgree  v-if="type==13"></PairPlatformAgree>
		<PairPersonalAgree  v-if="type==14"></PairPersonalAgree>
		<PlatformAgree  v-show="type==15"></PlatformAgree>
		<GrowthIntroduce v-show="type==16"></GrowthIntroduce>
		<Specification  v-show="type==17"></Specification>
		<PrivacyAgreement  v-show="type==18"></PrivacyAgreement>
		<Help v-show="type==19"></Help>
		<PetIntroduce v-show="type==20"></PetIntroduce>
		
		<Active v-show="type=='h5'"></Active>
		
	</view>
</template>

<script>
	import FosteragePersonalAgree from './fosterage-personal.vue';
	import AdoptPersonalAgree from './adopt-personal.vue';
	import PairPersonalAgree from './pair-personal.vue';
	import FosteragePlatformAgree from './fosterage-platform.vue';
	import AdoptPlatformAgree from './adopt-platform.vue';
	import PairPlatformAgree from './pair-platform.vue';
	import PlatformAgree from './platform.vue';
	import GrowthIntroduce from './growth-introduce.vue';
	import Specification from './specification.vue';
	import PrivacyAgreement from './privacy-agreement.vue';
	import Help from './help.vue';
	import PetIntroduce from './pet-introduce.vue';
	
	import Active from './active/guide.vue'
	
	export default{
		components:{
			FosteragePersonalAgree,
			FosteragePlatformAgree,
			AdoptPersonalAgree,
			AdoptPlatformAgree,
			PairPersonalAgree,
			PairPlatformAgree,
			PlatformAgree,
			GrowthIntroduce,
			Specification,
			PrivacyAgreement,
			Help,
			PetIntroduce,
			
			Active,
		},
		data(){
			return{
				type:'',
			}
		},
		async onLoad(e) {
			this.type = e.type
			if(e.type == 3 || e.type == 8 || e.type == 13){//甜宠服务协议
				uni.setNavigationBarTitle({
				    title: '甜宠服务协议'
				});
			}
			if(e.type == 4){//寄养协议
				uni.setNavigationBarTitle({
				    title: '甜宠寄养协议'
				});
			}
			if(e.type == 9){//领养协议
				uni.setNavigationBarTitle({
				    title: '甜宠领养协议'
				});
			}
			if(e.type == 14){//甜宠配对协议
				uni.setNavigationBarTitle({
				    title: '甜宠配对协议'
				});
			}
			if(e.type == 15){//用户协议
				uni.setNavigationBarTitle({
				    title: '甜宠用户协议'
				});
			}
			if(e.type == 16){//经验值说明
				uni.setNavigationBarTitle({
				    title: '经验值说明'
				});
			}
			if(e.type == 17){//社区规范
				uni.setNavigationBarTitle({
				    title: '甜宠社区规范'
				});
			}
			if(e.type == 18){//隐私协议
				uni.setNavigationBarTitle({
				    title: '甜宠隐私协议'
				});
			}
			if(e.type == 19){//帮助中心
				uni.setNavigationBarTitle({
				    title: '帮助中心'
				});
			}
			if(e.type == 20){// 星宠  规则说明
				uni.setNavigationBarTitle({
				    title: '规则说明'
				});
			}
			
			if(e.type == 'h5'){
				uni.setNavigationBarTitle({
				    title: '新手指导'
				});
			}
		},
		methods: {
			
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
	.active{
		
	}
</style>
