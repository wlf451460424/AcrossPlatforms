<template>
	<view class="footer">
		<!-- <view class="footer-left">
			<view class="uni-icon uni-icon-mic" @tap="startRecognize"> </view>
		</view> -->
		<view class="footer-center">
			<input class="input-text" type="text" maxlength="-1" @confirm="sendMessge" v-model="inputValue" @focus="onfocus" :focus="focus" @blur="blur" :placeholder="placeholder"></input>
		</view>
		<view class="footer-right">
			<view id='msg-type' class="send-comment" @tap="sendMessge">发送</view>
			<!-- <image @tap="sendMessge" style="width: 40upx;height: 40upx;" src="../../static/actionImg/seed.png"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "chat-input",
		data() {
			return {
				inputValue: ''
			}
		},
		props:{
			placeholder: {
				type: String,
				required: true
			},
			focus: {
				type:Boolean,
				required: true
			}
		},
		methods: {
			onfocus:function(){//
				var that = this;
				this.$emit('onfocus')
			},
			blur: function() {//失焦触发通知父组件
				var that = this;
				this.$emit('blur')
			},
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.inputValue += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			sendMessge: function () {
				if (!this.inputValue) {
					uni.showModal({
						content:"还没有输入内容哦!",
						showCancel:false
					})
					return;
				}
				var that = this;
				//点击发送按钮时，通知父组件用户输入的内容
				this.$emit('send-message', {
					type: 'text',
					content: that.inputValue
				});
				that.inputValue = '';//清空上次输入的内容
			}
		}
	}
</script>

<style>
	.footer {
		display: flex;
		flex-direction: row;
		min-height: 100upx;
		width: 100%;
		height: 100upx;
		/* border: solid 1px #f76d45; */
		overflow: hidden;
		/* padding: 5upx; */
		background-color: #FFFFFF;
	}
	.footer-left {

		width: 80upx;
		height: 80upx;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer-right {
		width: 100upx;
		height: 100upx;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		color: #1482D1;
		padding:0 0 10upx 0;
	}
	.footer-center {
		flex: 1;
		padding:0 10upx 10upx 20upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.footer-center .input-text {
		flex: 1;
		background: #f9f9f9;
		/* border: solid 1upx #ddd; */
		/* padding: 10upx !important; */
		font-family: verdana !important;
		overflow: hidden;
		border-radius:30upx;
		font-size: 28upx !important;
		padding: 0 20upx;
		line-height: 60upx;
		height: 60upx;
		width: 100%;
	}
	.footer-right .send-comment{
		background-color: #f76d45;
		/* border: 1px solid #b7b7b7; */
		text-align: center;
		line-height: 60upx;
		color: #FFFFFF;
		width: 90upx;
		height: 60upx;
		border-radius: 8upx;
		font-size: 24upx;
		/* height: 60upx; */
		justify-content: center;
	}
</style>
