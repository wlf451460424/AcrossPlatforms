import { sign } from './sign.js' 

const httpRequestLogin = (opts, data) => {
	// "SIGN_TYPE":"SHA256",
	// "APP_ID":"1582629420579",
	// "TIMESTAMP":"",
	// "SIGN":"",
	// "NONCE":""
	let param = sign(opts, "1582629420579", "USsBxtwY1P30tbU0WX1NvhkWIso9nqdj", "SHA256")
	data = Object.assign(param.data, data)
    let httpDefaultOpts = {
        url: process.env.VUE_APP_API+opts.url,
        data: JSON.stringify(data),
        method: opts.method,
        header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			"X-front-end":1
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8',
			"X-front-end":1
		},
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};
let isLocked = 1;
//带Token请求  
const httpTokenRequest = (opts, data) => {
	let userInfo = uni.getStorageSync('userInfo')
	// #ifndef MP-QQ
	if(userInfo && userInfo.userPhoneNumber == '' && opts.url != '/portal/v1/bind/phone'){
		uni.setStorageSync('userInfo','');
		uni.setStorageSync('token','');
		uni.setStorageSync('refresh_token','');
	}
	// #endif  
	
	let param = sign(opts, "1582629420579", "USsBxtwY1P30tbU0WX1NvhkWIso9nqdj", "SHA256")
	data = Object.assign(param.data, data)
    //此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: process.env.VUE_APP_API+opts.url,
        data: JSON.stringify(data),
        method: opts.method,
        header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			"X-front-end":1
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8',
			"X-front-end":1
		},
        dataType: 'json',
    }
	let token = uni.getStorageSync('token');
	if(token){
		httpDefaultOpts.header.Authorization = 'Bearer ' + token;
	}
	
	async function refresh_token_and_requst(httpDefaultOpts) {
		let result;
		if (uni.getStorageSync('refresh_token')){
			let response = await uni.request({
				url: process.env.VUE_APP_API+'/user/v1/refresh/token',
				data: { 'refresh_token': uni.getStorageSync('refresh_token')},
				method: 'POST',
				header: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/json; charset=UTF-8',
					"X-front-end":1
				},
				dataType: 'json',
			})
			result = response;
			if (response && response[1].statusCode == 200) {
				uni.setStorageSync('token', response[1].data.data.access_token);
				uni.setStorageSync('refresh_token', response[1].data.data.refresh_token);
				httpDefaultOpts.header.Authorization = 'Bearer ' + uni.getStorageSync('token');
				
				result = await uni.request(httpDefaultOpts);
			}else {
				uni.removeStorageSync('token');
				uni.showToast({
					title: '服务器繁忙，请重新登录',
					icon: 'none',
					duration: 1000
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/mine/login/account-login'
					})
				}, 1000)
			}
		}else {
			uni.removeStorageSync('token');
			// uni.showToast({
			// 	title: '会话超时，请重新登录',
			// 	icon: 'none',
			// 	duration: 1000
			// });
			// setTimeout(()=>{
			// 	uni.navigateTo({
			// 		url:'/pages/mine/login/account-login'
			// 	})
			// }, 1000)
			
			uni.navigateTo({
				url:'/pages/mine/login/account-login'
			})
		}
		isLocked = 1;
		return new Promise(function(resolve, reject) {
			resolve(result)
		});
	}
	
    let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(res => {
			if(res[1] && res[1].statusCode == 401 && isLocked == 1){//未登录
				isLocked = 0;
				refresh_token_and_requst(httpDefaultOpts).then(response => {
					if(response) {
						resolve(response[1])
					}else {
						reject(401)
					}
				});
			}else if(res[1] && res[1].statusCode == 200){
				resolve(res[1])
			}else {
				reject('401')
			}
		});
    })
	
    return promise
};


 
export default {
	httpRequestLogin,
	httpTokenRequest,
}