<script>
	export default {
		onLaunch: function () {
			// console.log('App Launch')
			
			// setTimeout(() => {
				// uni.setTabBarBadge({
				// 	index: 1,
				// 	text: '8'
				// });
				// uni.showTabBarRedDot({
				// 	index: 2
				// });
			// }, 1000);
		},
		onShow: function () {
			// console.log('App Show')
		},
		onHide: function () {
			// console.log('App Hide')
		},
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './utils/uni.css';
	@import './components/gaoyia-parse/parse.css';
	/* @import './uni.scss'; */
	
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	uni-checkbox .uni-checkbox-input { 
		/* width: 36upx;
		height: 36upx; */
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before{
		color: #f76d45;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before{
		color: #f76d45;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input:hover {
		border-color: #f76d45;
	}
	
	uni-modal .uni-modal__btn_primary{
		color: #F76D45 !important;
	}
	
	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 260px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		font-size: 14px;
		color: #666;
		text-align: center;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
		font-weight: bold;
	}
	
	.uni-page-head-search-placeholder:before{
		/* font-size: 24upx !important; */
		color: #b7b7b7;
	}
	.uni-page-head-search{
		/* font-size: 24upx !important; */
		border: 1px solid #FFFFFF;
		background-color: #F6F6F6 !important;
	}
	.uni-page-head-ft{
		margin-right: 10upx !important;
		/* display: flex !important;
		align-items: flex-end !important; */
	}
	uni-page-head .uni-btn-icon{
		overflow: visible !important;
		display: flex;
	}
	.uni-tabbar__icon{
		/* width: 18px !important; */
		/* height: 18px !important; */
		
		
		/* #ifdef H5 */
		/* width: 36upx !important; */
		/* height: 36upx !important; */
		/* #endif */
		
		/* #ifdef MP-WEIXIN || MP-TOUTIAO */
		/* width: 30upx !important; */
		/* height: 30upx !important; */
		/* #endif */
	}
	.uni-tabbar__label{
		/* line-height: 58upx !important; */
	}
	
	.input-placeholder{
		color: #B7B7B7 !important;
	}
	
	uni-swiper .uni-swiper-dot{
		background:rgba(225,225,225,.3);
		width:12upx !important;
		height: 12upx !important;
	}
	uni-swiper .uni-swiper-dot-active{
		background-color: #F76D45 !important;
	}
	
	/* #ifdef MP-WEIXIN || MP-TOUTIAO */
	.uni-popup__wrapper-box{
		display: flex !important;
		width: 100%;
		justify-content: center;
	}
	/* #endif */
	
	.prism-player{
		height: 100% !important;
		/* border-radius: 10upx; */
	}
	
	.prism-player .prism-big-play-btn{
		left: 40% !important;
		bottom: 40% !important;
	}
	/* .prism-player .prism-liveshift-progress .prism-progress-played, .prism-player .prism-progress .prism-progress-played{
		background-color: #ffbf59 !important;
	} */
	.prism-player .prism-progress-played{
		background-color: #f76d45 !important;
	}
	/* #ifdef H5 */
	uni-video{
		width: 100% !important;
		height: 100% !important;
	}
	/*  #endif  */
	/* #ifndef H5 */
	video{
		width: 100% !important;
		height: 100% !important;
	}
	/*  #endif  */
</style>
