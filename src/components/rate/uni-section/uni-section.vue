<template>
	<view class="uni-section">
		<view v-if="type" class="uni-section__head">
			<view :class="type" class="uni-section__head-tag" />
		</view>
		<view class="uni-section__content">
			<text :class="{'distraction':!subTitle}" class="uni-section__content-title">{{ title }}</text>
			<text v-if="subTitle" class="uni-section__content-sub">{{ subTitle }}</text>
		</view>
		<slot />
	</view>
</template>

<script>
	export default {
		name: 'UniTitle',
		props: {
			type: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			subTitle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		watch: {
			title(newVal) {
				if (uni.report && newVal !== '') {
					uni.report('title', newVal)
				}
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-section {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		margin-top: 20upx;
		flex-direction: row;
		align-items: center;
		padding: 0 20upx;
		height: 100upx;
		background-color: $uni-bg-color-grey;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 2upx;
		font-weight: normal;
	}

	.uni-section__head {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 20upx;
	}

	.line {
		height: 30upx;
		background-color: $uni-text-color-disable;
		border-radius: 10upx;
		width:6upx;
	}

	.circle {
		width: 16upx;
		height: 16upx;
		border-top-right-radius: 100upx;
		border-top-left-radius: 100upx;
		border-bottom-left-radius: 100upx;
		border-bottom-right-radius: 100upx;
		background-color: $uni-text-color-disable;
	}

	.uni-section__content {
		flex: 1;
		color: $uni-text-color;
	}

	.uni-section__content-title {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.distraction {
		flex-direction: row;
		align-items: center;
	}

	.uni-section__content-sub {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
</style>
