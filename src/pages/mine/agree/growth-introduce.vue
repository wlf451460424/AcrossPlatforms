<template>
	<view class="content">
		
		<view style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<b>什么是经验值？</b></br>
			<view style="color: #777777;">
				经验值是根据用户在甜宠APP完成任务度及日常行为，综合算出的分值，不同分值对应不同的等级，分值每天更新。</br>
			</view>
		</view>
		
		<view style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<b>分值规则</b></br>
			<view style="color: #777777;">
				1.浏览、文章、动态、笔记、问答 等行为，加1分</br>
				2.完善个人资料、添加宠物、添加宠物计划、评论、点赞、收藏、关注用户 等行为，加2分</br>
				3.发布动态、文章、笔记、问答，分享 等行为，加5分</br>
				<!-- 4.发布服务、使用服务、及时评价订单 等行为，加10分</br> -->
			</view>
		</view>
		
		<view class="genaral-area" style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<view style="line-height: 70upx;">
				<b>分值对应等级</b></br>
			</view>
			<view class="flex-box tc thead">
				<view class="item-2">分值</view>
				<view class="item-2">等级</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">分值 <= 200</view> -->
				<view class="item-2">0 ~ 200</view>
				<view class="item-2">LV1 甜宠小白</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">200 < 分值 <= 1000</view> -->
				<view class="item-2">200 ~ 1000</view>
				<view class="item-2">LV2 甜宠新人</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">1000 < 分值 <= 5000</view> -->
				<view class="item-2">1000 ~ 5000</view>
				<view class="item-2">LV3 甜宠达人</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">5000 < 分值 <= 20000</view> -->
				<view class="item-2">5000 ~ 20000</view>
				<view class="item-2">LV4 甜宠高手</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">20000 < 分值 <= 40000</view> -->
				<view class="item-2">20000 ~ 40000</view>
				<view class="item-2">LV5 甜宠明星</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">40000 < 分值 <= 100000</view> -->
				<view class="item-2">40000 ~ 100000</view>
				<view class="item-2">LV6 甜宠大神</view>
			</view>
			<view class="flex-box table tc">
				<!-- <view class="item-2">100000 < 分值</view> -->
				<view class="item-2">100000+</view>
				<view class="item-2">LV7 甜宠专家</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	$color:#b7b7b7;
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #f9f9f9;
	}
	
	.flex-box {
		display: flex;
		flex-wrap: wrap;
	}
	
	
	.flex-box>.item-2 {
		flex: 0 0 49%;
	}
	
	.flex-box>.item-3 {
		flex: 0 0 33%;
	}
	
	//普通表格
	.genaral-area {
		.item-2 {
			font-size: 26upx;
			// border: 1upx solid $color;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
			background-color: #f9f9f9;
			margin-right: 1px;
	
			&:first-child {
				border-left-width: 1upx;
			}
	
			&:last-child {
				border-right-width: 1upx;
			}
		}
	
		.thead {
			.item-2 {
				font-weight: bold;
				box-sizing: border-box;
				color: #FFFFFF;
				background-color: #f76d45;
				margin-right: 1px;
			}
		}
	
		.table {
			&:last-child {
				// border-bottom: 1upx solid $color;
			}
	
			.item-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				color: #777777;
				margin-bottom: 1px;
			}
		}
	}
	
</style>
