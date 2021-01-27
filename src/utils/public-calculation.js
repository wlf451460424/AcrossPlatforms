//// 处理赞 评论 浏览数量    postUpvoteCount postCommentCount  postPageViews
const digitalConversion = (data) => {
	let value = data
	if(value < 10000){
		value = value
	}
	if( 10000 <= value && value < 100000){
		value = value/10000
		value = parseInt(value*10)/10 + '万'
	}
	if( 100000 <= value){
		// value = value/100000
		// value = parseInt(value) + '万+';
		
		value = '10万+'
	}
    return value
};
// 成长值
const groupArr = (data) => {
	let value = data
	if(value <= 200){
		value = 'LV1' + ' 养宠小白'
	}
	if(200 < value && value <= 1000){
		value = 'LV2' + ' 养宠新手'
	}
	if(1000 < value && value <= 5000){
		value = 'LV3' + ' 宠物熟手'
	}
	if(5000 < value && value <= 20000){
		value = 'LV4' + ' 养宠高手'
	}
	if(20000 < value && value <= 40000){
		value = 'LV5' + ' 养宠达人'
	}
	if(40000 < value && value <= 100000){
		value = 'LV6' + ' 养宠专家'
	}
	if(100000 < value){
		value = 'LV7' + ' 养宠大神'
	}
    return value
};
const wakeUp_app = (data) => {
	var u = navigator.userAgent;
	if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
		let openUrl = process.env.VUE_APP_WAKEUP_URL + data
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){  
			// window.location.href='downLoadForPhone';  
			uni.showToast({
			    title: "请在浏览器中打开",
				icon: 'none',
			    duration: 1000
			});
		}else{
			window.location.href = openUrl;
			setTimeout(function(){
				let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden ||window.document.webkitHidden 
				if(typeof hidden =="undefined" || hidden ==false){
					// uni.navigateTo({
					// 	url:'/pages/app'
					// })
					//跳转官网下载页面
					window.location.href = process.env.VUE_APP_ANDROID_URL;
				}
			}, 2500);
		}  
	}else if(u.indexOf('iPhone') > -1){
		let openUrl_ios = process.env.VUE_APP_WAKEUP_URL_IOS + data
		window.location.href = openUrl_ios;
	}
};
const um_wakeUp_app = (type,data) => {
	//帖子详情
	if(type == "postDetails"){
		//友盟的唤醒方式
		ULink.start({
			id: process.env.VUE_APP_UM_WAEKUP_POST,
			data: data
		}).ready(function(ctx) {
			ctx.wakeup();
		});
	}
	//服务详情
	if(type == "serviceDetails"){
		//友盟的唤醒方式
		ULink.start({
			id: process.env.VUE_APP_UM_WAEKUP_SERVICE,
			data: data
		}).ready(function(ctx) {
			ctx.wakeup();
		});
	}
	//首页
	if(type == "mianDetails"){
		//友盟的唤醒方式
		ULink.start({
			id: process.env.VUE_APP_UM_WAEKUP_MINE,
			data: data
		}).ready(function(ctx) {
			ctx.wakeup();
		});
	}
}

//底部发现菜单点击统计
const umeng_event_tab_discover = 'tab_discover_duplicate_removal'; 
//底部消息菜单点击统计
const umeng_event_tab_message = 'tab_message_duplicate_removal'; 
//底部我的菜单点击统计
const umeng_event_tab_mine = 'tab_mine_duplicate_removal'; 
//专题详情页点击统计
const umeng_event_feature_detail_total = 'feature_detail_total'; 
//自定义菜单点击统计
const umeng_event_menu_total = 'menu_total'; 
//健康计划点击统计
const umeng_event_plan_total = 'plan_total'; 

export default {
	digitalConversion,		
	groupArr,
	wakeUp_app,
	um_wakeUp_app,
	umeng_event_tab_discover,
	umeng_event_tab_message,
	umeng_event_tab_mine,
	umeng_event_feature_detail_total,
	umeng_event_menu_total,
	umeng_event_plan_total,
}