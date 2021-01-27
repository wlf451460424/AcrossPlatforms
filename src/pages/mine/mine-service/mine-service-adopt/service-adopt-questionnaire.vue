<template>
	<view class="content">
		<view v-for="(item,index) in list" :key="index"
			style="width: 100%;flex-direction: column;padding: 20upx;background-color: #FFFFFF;margin-bottom: 10upx;border-radius: 4upx;">
			<view style="width: 100%;">
				<view style="width: 50upx;height: 50upx;line-height: 50upx;justify-content: center;background-color: #f76d45;margin: 4upx 20upx 0 0;">
					<text style="color: #FFFFFF;font-weight: bold;">{{index+1}}</text>
				</view>
				<view style="width: 100%;line-height: 60upx;">
					<text style="font-size: 12px;font-weight: bold;">
						{{item.questionnaireTitleContent}}
						<text v-if="item.questionnaireTitleType==1" style="margin-left: 20upx;color: #FF0000;">(多选)</text>
					</text>
				</view>
			</view>
			<view v-for="(opt,index_opt) in item.options" :key="index_opt"
				style="width: 100%;margin-top: 20upx;">
				<view style="width: 130upx;height: 50upx;line-height: 50upx;justify-content: flex-end;margin-right: 10upx;">
					<checkbox color="#FF0000" :checked="opt.checkboxIsshow" :disabled="true" style="transform:scale(0.8)"/>
				</view>
				<view style="width: 100%;line-height: 60upx;">
					<text>{{opt.questionnaireOptionsContent}}</text>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				questionnaireAnswerUserId:'',
				questionnaireAnswer:["1270884446908309506","1270884026932649985"],
				list:[],
			}
		},
		onLoad(e) {
			this.questionnaireAnswerUserId = e.id
			//获取问卷详情
			this.getQuestionnaireAnswer()
		},
		methods:{
			//根据用户ID获取问卷详情
			getQuestionnaireAnswer(){
				let param={ 
					"questionnaireAnswerUserId": this.questionnaireAnswerUserId,
				}
				let opts={ url:'/portal/v1/questionnaire_answer/get/userId', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.questionnaireAnswer = res.data.data.questionnaireAnswer.split(",")
							//获取问卷列表
							this.getQuestionnaireDetails()
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});
						}
					}
				)
			},
			//获取问卷列表
			getQuestionnaireDetails(){
				let param={ 
					"limit": 999,
					"page": 1
				}
				let opts={ url:'/portal/v1/questionnaire_title/list/questionnaire', method:'POST' }
				//发送请求
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							this.list = res.data.data.records
							for(var i=0;i<this.list.length;i++){
								let itemArr = this.list[i].options
								for(var j=0;j<itemArr.length;j++){
									if(this.questionnaireAnswer.indexOf(itemArr[j].questionnaireOptionsId) > -1){//则包含该元素}
										itemArr[j].checkboxIsshow = true;
									}else{
										itemArr[j].checkboxIsshow = false;
									}
								}
								this.list[i].options = []
								this.list[i].options = itemArr
							}
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
		padding: 12upx;
	}
</style>
