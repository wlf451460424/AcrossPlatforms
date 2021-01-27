<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view class="kind-style"
				v-for="(item,index) in kind_Array" :key="index" 
				:id="item.kindId"
				:class="{current: index === kind_Index}"
				@click="changeKind(index,item.kindId)"
			>{{item.kindName}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<select-lovely
				@cityClick="cityClick"
				:formatName="formatName"
				:hotCity="hotCity"
				:obtainCitys="obtainCitys"
				:isSearch="false"
				ref="citys"
			></select-lovely>
		</scroll-view>
	</view>
</template>

<script>
	import citySelect from '@/components/city-select/city-select.vue'
	import selectLovely from '@/components/city-select/select-lovely.vue'
	export default {
		components: {
			selectLovely
		},
		data() {
			return {
				kind_Index: 0, //当前选项卡索引
				kind_Array:[
					// {kindId:"01",kindName:"猫"},
					// {kindId:"02",kindName:"狗"},
					// {kindId:"03",kindName:"猪"},
					// {kindId:"04",kindName:"牛"},
					// {kindId:"05",kindName:"羊"},
					// {kindId:"06",kindName:"马"},
					// {kindId:"07",kindName:"老鼠"}
				],
				breed_Index:0,
				breed_Array:[
					// {id:"001",title:"金毛"},
					// {id:"001",title:"柴犬"},
					// {id:"001",title:"萨摩"},
					// {id:"001",title:"牧羊犬"},
					// {id:"001",title:"羊羊"},
					// {id:"001",title:"兔兔"},
					// {id:"001",title:"狐狸"},
					// {id:"001",title:"蝙蝠"},
					// {id:"001",title:"野猫"},
					// {id:"001",title:"拉布拉多"},
				],
				select_Info:'',
				
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'breedName',
				//热门城市
				hotCity: [
					// {id:"001",breedName: '拉布拉多',url:'../../static/actionImg/05.jpg'},
					// {id:"002",breedName: '金毛',url:'../../static/actionImg/06.jpg'},
					// {id:"003",breedName: '拉布拉多',url:'../../static/actionImg/04.jpg'},
					// {id:"004",breedName: '金毛',url:'../../static/actionImg/03.jpg'},
					// {id:"005",breedName: '拉布拉多',url:'../../static/actionImg/02.jpg'},
					// {id:"006",breedName: '金毛',url:'../../static/actionImg/01.jpg'}
				],
				//显示的城市数据
				obtainCitys: [
					// {breedId:"001",breedName:"金毛",url:'../../static/actionImg/01.jpg'},
					// {breedId:"002",breedName:"柴犬",url:'../../static/actionImg/02.jpg'},
					// {breedId:"003",breedName:"萨摩",url:'../../static/actionImg/03.jpg'},
					// {breedId:"004",breedName:"牧羊犬",url:'../../static/actionImg/04.jpg'},
					// {breedId:"005",breedName:"羊羊",url:'../../static/actionImg/05.jpg'},
					// {breedId:"006",breedName:"兔兔",url:'../../static/actionImg/06.jpg'},
					// {breedId:"007",breedName:"狐狸",url:'../../static/actionImg/07.jpg'},
					// {breedId:"008",breedName:"蝙蝠",url:'../../static/actionImg/08.jpg'},
					// {breedId:"009",breedName:"野猫",url:'../../static/actionImg/09.jpg'},
					// {breedId:"010",breedName:"拉布拉多",url:'../../static/actionImg/01.jpg'},
				],
			};
		},
		async onLoad() {
			//前端用户获取种类列表
			let param={} ;
			let opts={ url:'/portal/v1/kind/get', method:'POST' }
			this.http.httpTokenRequest(opts,param).then(
				res => {
					if(res.data.code == 200){
						this.kind_Array = res.data.data.records
						// 前端用户获取品种列表
						let param={} ;
						let str = '/portal/v1/breed/get/' + this.kind_Array[0].kindId;
						let opts={ url:str, method:'POST' }
						this.http.httpTokenRequest(opts,param).then(
							res => {
								if(res.data.code == 200){
									this.obtainCitys = res.data.data.records;
								}else{uni.showToast({
							    title: res.data.msg,
								icon: 'none',
							    duration: 1000
							});}
							}
						)
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
		methods: {
			changeKind(index,kind_id){
				this.kind_Index = index;
				// 前端用户获取品种列表
				let param={} ;
				let str = '/portal/v1/breed/get/' + kind_id;
				let opts={ url:str, method:'POST' }
				this.http.httpTokenRequest(opts,param).then(
					res => {
						if(res.data.code == 200){
							// let breedArray = res.data.data.records;
							// let newsArray=[];
							// for(var i=0;i<breedArray.length;i++){
							// 	let obj = Object;
							// 	obj.id = breedArray[0].breedId;
							// 	obj.title = breedArray[0].breedName;
							// 	newsArray.push(obj);
							// }
							this.obtainCitys = res.data.data.records;
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
			cityClick(item) {
				this.select_Info = item.breedId + '_' + item.breedName + '_' + item.breedAvatar;
				uni.setStorageSync('lovelyPetsData', this.select_Info);
				uni.navigateBack({
					url:"user-favorite-pet",
				})
			}
		},
		onNavigationBarButtonTap(e) {
			uni.showToast({
				icon: "none",
				title: '请选择宠物',
				duration: 1000
			});
		}
	}
</script>

<style lang='scss' scoped> 
page,
.content {
	width: 100%;
	height: 100%;
	background-color: #f9f9f9;
}

.content {
	display: flex;
}
.left-aside {
	flex-shrink: 0;
	width: 20%;
	height: 100%;
}

.right-aside{
	width: 80%;
	flex: 1;
	overflow: hidden;
	background-color: #f9f9f9;
}
.kind-style{
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	/* font-weight: 700; */
	text-align: center;
	color: #333333;
	/* border-bottom: 1px solid #b7b7b7; */
	margin-bottom: 2upx;
	/* background-color: #FFFFFF; */
}
.current{
	background-color: #FFFFFF;
	/* color: #e27718; */
} 
.breed_current{
	color: #e27718;
} 
.breed-style{
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	font-weight: 700;
	margin-bottom: 10upx;
	color: #333333;
	display: flex;
	align-items: center;
	/* justify-content: center; */
	background-color: #fff;
	padding-left: 60upx;
	margin-bottom: 3upx;
}
</style>