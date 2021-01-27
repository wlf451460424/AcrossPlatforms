// #ifdef MP-WEIXIN
import uma from 'umtrack-wx';
uma.init({
    appKey: '5fd1caa519bda368eb4d8fa4',//由友盟分配的APP_KEY
    useOpenid: true,// 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
    autoGetOpenid: true,// 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
	// debug: true,//是否打开调试模式
	uploadUserInfo: true, // 上传用户信息，上传后可以查看有头像的用户分享信息，同时在查看用户画像时，公域画像的准确性会提升。
	enableVerify:true,
});
// #endif
// #ifdef MP-BAIDU
import uma from 'umtrack-swan';
uma.init({
    appKey: '5fd1cb10bed37e4506c86958',//由友盟分配的APP_KEY
    useOpenid: true, // 是否需要通过友盟后台获取openid或匿名openid，如若需要，请到友盟后台设置appId及secret
    autoGetOpenid: true,// 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
	// debug: true,//是否打开调试模式
	uploadUserInfo: true, // 自动上传用户信息，设为false取消上传，默认为false
	enableVerify:true,
});
// #endif
// #ifdef MP-TOUTIAO
import uma from 'umtrack-tt';
uma.init({
    appKey: '5fd1cafdbed37e4506c86923', //由友盟分配的APP_KEY
    autoGetOpenid: true, // 是否需要通过友盟后台获取openid或匿名openid，如若需要，请到友盟后台设置appId及secret
    // debug: true, //是否打开调试模式
    uploadUserInfo: false, // 自动上传用户信息，设为false取消上传，默认为false
	enableVerify:true,
  })
// #endif
// #ifdef MP-QQ
import uma from 'umtrack-qq';
uma.init({
    appKey: '5fd1cad119bda368eb4d9115', //由友盟分配的APP_KEY
	useOpenid: true, // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。使用Openid来统计QQ小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
	autoGetOpenid: true, // 使用openid进行统计时，是否授权友盟自动获取Openid，如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
	// debug: true, //是否打开调试模式
	uploadUserInfo: true, // 自动上传用户信息，设为false取消上传，默认为false
	enableVerify:true,
  })
// #endif
// #ifdef MP
//此处用来挂载入uma到组件实例上，方便组件内使用this.$uma
uma.install = function (Vue) {
    Vue.prototype.$uma = uma;
}
Vue.use(uma);
// #endif

import Vue from 'vue' 
import App from './App'
import http from './utils/http.js'
import navigatorUrl from './utils/uni-url.js'
import calculation from './utils/public-calculation.js'
import uniPopup from './components/uni-popup/uni-popup.vue'
import uniCalendar from './components/uni-calendar/uni-calendar'
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';

// #ifdef H5
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '7862d76ef167eea180d784adde7d5942',
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.CitySearch'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// #endif

Vue.prototype.http = http
Vue.prototype.navigatorUrl = navigatorUrl
Vue.prototype.calculation = calculation
Vue.component('uniPopup',uniPopup)
Vue.component('uniCalendar',uniCalendar)
Vue.component('mixPulldownRefresh',mixPulldownRefresh)
Vue.component('mixLoadMore',mixLoadMore)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
