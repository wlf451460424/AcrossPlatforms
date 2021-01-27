function friendlyDate(timestamp,str) {
	var formats = {
		'year': '%n%年前',
		'month': '%n%月前',
		'day': '%n%天前',
		'hour': '%n%小时前',
		'minute': '%n%分钟前',
		'second': '%n%秒前',
	};
	str = str.replace(" ","-")
	str = str.replace(":","-")
	str = str.replace(":","-")
	
	//str = "2020-10-29-18-22-35"
	let arr = str.split("-")
	var now = Date.now();
	
	
	var isYesterday;
	var today = new Date();
	// var yesterday = new Date(now - 1000 * 60 * 60 * 24);
	var yesterday = new Date(new Date(new Date().toLocaleDateString()).getTime()-1)
	if (yesterday.getFullYear() === Number(arr[0]) && (yesterday.getMonth()+1) === Number(arr[1]) && yesterday.getDate() === Number(arr[2])) {
		isYesterday = true;
		// console.log('是昨天');
	} else {
		isYesterday = false;
		// console.log('不是昨天');
	}
	var d = new Date();
	
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	// var days = Math.floor(hours / 24);
	if(arr[0] != d.getFullYear()){
		var days = yesterday.getDate() - Number(arr[2]) + 1 + 30
	}else{
		var days = yesterday.getDate() - Number(arr[2]) + 1
	}
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);
	
	if(days >= 366){
		return arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4]
	}else if(days > 7 && days < 366){
		if(arr[0] != d.getFullYear()){//去年之前
			return arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4]
		}else{//当年
			return arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4]
		}
	}else if(days >=2 && days <= 7){
		return days + '天前'
	}else if(days == 1){
		if(isYesterday){//昨天
			return '昨天' + arr[3] + ':' + arr[4]
		}
	}else if(days == 0 && hours>0 ){
		return hours + '小时前'	
	}else if(days == 0 && hours==0 ){
		if(minutes>0 ){
			return minutes + '分钟前'
		}else{
			if(seconds>=30 ){
				return '半分钟前'
			}else{
				return '刚刚'
			}
		}
	}
}

export {
	friendlyDate
}

