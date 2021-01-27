<template>
	<view class="content">
		<view style="flex-direction: column;width: 100%;align-items: center;">
			<text style="line-height: 100upx;font-size: 18px;font-weight: 700;">{{data.announcementTitle}}</text>
		</view>
		<view style="width: 100%;padding: 20upx;margin-top: 20upx;flex-direction: column;">
			<u-parse :content="data.announcementContent"></u-parse>
			<text style="line-height: 100upx;text-align: right;padding: 20upx;">{{data.createTime}}</text>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{ uParse },
		data() {
			return {
				id:'',
				data:Object,
			}
		},
		async onLoad(e) {
			this.id = e.id
			//前端查询详情
			this.getDetail()
		},
		methods:{
			//前端查询详情
			getDetail(){
				let param={
					"announcementId": this.id,
				};
				let str = '/portal/v1/announcement/get/' + this.id
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						// debugger
						if(res.data.code == 200 ){
							this.data = res.data.data
							this.data.createTime = this.data.createTime.split(" ")[0]
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
			}
		}
	}
		
</script>

<style lang='scss' scoped>
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
		background-color: #FFFFFF;
		margin-top: 2upx;
	}
</style>
