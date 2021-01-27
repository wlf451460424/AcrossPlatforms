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
			
			Active
		},
		data(){
			return{
				type:'',
			}
		},
		async onLoad(e) {
			this.type = e.type
		},
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
