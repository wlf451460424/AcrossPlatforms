<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<image src="./static/application/01.jpg" mode="widthFix"></image>
		<image src="./static/application/02.jpg" mode="widthFix"></image>
		<image src="./static/application/03.jpg" mode="widthFix"></image>
		<image src="./static/application/04.jpg" mode="widthFix"></image>
		<image src="./static/application/05.jpg" mode="widthFix"></image>
		<image src="./static/application/06.jpg" mode="widthFix"></image>
		<image src="./static/application/07.jpg" mode="widthFix"></image>
		<image src="./static/application/08.jpg" mode="widthFix"></image>
		<image src="./static/application/09.jpg" mode="widthFix"></image>
		<image src="./static/application/10.jpg" mode="widthFix"></image>
		<image src="./static/application/11.jpg" mode="widthFix"></image>
		<image src="./static/application/12.jpg" mode="widthFix"></image>
		<image src="./static/application/13.jpg" mode="widthFix"></image>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ || MP-BAIDU -->
		<image src="static/application/01.jpg" mode="widthFix"></image>
		<image src="static/application/02.jpg" mode="widthFix"></image>
		<image src="static/application/03.jpg" mode="widthFix"></image>
		<image src="static/application/04.jpg" mode="widthFix"></image>
		<image src="static/application/05.jpg" mode="widthFix"></image>
		<image src="static/application/06.jpg" mode="widthFix"></image>
		<image src="static/application/07.jpg" mode="widthFix"></image>
		<image src="static/application/08.jpg" mode="widthFix"></image>
		<image src="static/application/09.jpg" mode="widthFix"></image>
		<image src="static/application/10.jpg" mode="widthFix"></image>
		<image src="static/application/11.jpg" mode="widthFix"></image>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ -->
		<image src="static/application/12.jpg" mode="widthFix"></image>
		<image src="/static/application/13.jpg" mode="widthFix"></image>
		<!-- #endif -->
		
	</view>
</template>

<script>
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
		background-color: #ffffff;
		align-items: center;
	}
	image{
		width: 100% !important;
	}
</style>
