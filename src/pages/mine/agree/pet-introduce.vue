<template>
	<view class="content">
		
		<view style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<b>什么是星宠？</b></br>
			<view style="color: #777777;">
				星宠展示的是明星宠物，根据用户添加宠物的受欢迎程度，计算出分值，做出排名</br>
			</view>
		</view>
		
		<view style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<b>计算规则</b></br>
			发布动态、问答、笔记、文章时，选择同步至相应的宠物档案，当贴子获赞，宠物受欢迎度分值增加
		</view>
		
		<view style="margin-bottom: 8upx;background-color: #FFFFFF;padding: 8px 8px;">
			<b>统计规则</b></br>
			日榜：统计当前日获赞数量，每1小时更新一次</br>
			周榜：统计过去7日获赞数量，每1小时更新一次</br>
			月榜：统计过去30日获赞数量，每1小时更新一次</br>
			总榜：统计总的获赞数量，每1小时更新一次</br>
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
		justify-content: center;
	}
	
	
	.flex-box>.item-2 {
		flex: 0 0 49.5%;
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
