// uview 封装 http 请求初始化

import { $global_host, $global_headers } from './global.config.js'

// 这里的 vm，就是我们在 vue 页面/组件里的 this，所以我们能在这里获取 vuex 的变量，比如存放在里面的 token 变量
const install = ( Vue, vm ) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig( {
		// baseUrl: $global_host, // 全局请求 host 初始化
		baseUrl: process.env.NODE_ENV === 'development' ? '/proxyApi' : $global_host,
		showLoading: true, // 是否显示请求中的 loading
		loadingText: '正在努力请求~', // 请求 loading 中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位 ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据(包括 http 状态码等)
		loadingMask: true, // 展示 loading 的时候，是否给一个透明的蒙层，防止触摸穿透
		header: $global_headers, // 配置请求头信息
	} );

	// 请求拦截，配置 Token 等参数
	Vue.prototype.$u.http.interceptor.request = ( config ) => {
		// 引用 token
		// 方式一，存放在 vuex 的 token，假设使用了 uView 封装的 vuex 方式
		// 见：https://v1.uviewui.com/guide/globalVariable.html
		config.header.token = vm.vuex_token;

		// 方式二，如果没有使用 uView 封装的 vuex 方法，那么需要使用 $store.state 获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果 token 放在了 globalData，通过 getApp().globalData 获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果 token 放在了 Storage 本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了 Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;

		// 可以对某个 url 进行特别处理，此 url 参数为 this.$u.get/post(url) 中的 url 值
		// if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将 config 进行 return
		return config;
		// 如果 return 一个 false 值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = ( response ) => {
		// response 为服务端返回值，可能有 code，result 等字段
		// 这里对 response.result 进行返回，将会在 this.$u.post(url).then(response => {}) 的 then 回调中的 response 得到
		// 如果配置了 originalData 为 true，请留意这里的返回值
		return response;

		// return false;
		// vm.$u.toast(response.msg||'~请求数据错误~');
		// 如果返回 false，则会调用 Promise 的 reject 回调，
		// 并将进入 this.$u.post(url).then().catch(response=>{}) 的 catch 回调中，response 为服务端的返回值
	}
}

export default { install }
