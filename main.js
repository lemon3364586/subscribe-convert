import App from 'App';
import Vue from 'vue';

// 挂载自定义函数
import lemonTool from './js/lemonTool/index.js';
Vue.use(lemonTool);

// uniapp function
import $uniApi from "./js/uniApi.js";
Vue.prototype.$uniApi = $uniApi;

/* uview-ui */
import uView from "./uview-ui";
Vue.use( uView );

// 是否生成生产提示
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue( {
	...App,
} );

// uview http 拦截器，此为需要加入的内容，自行修改引入路径
import httpInterceptor from './service/http.interceptor.js';
// 这里需要写在最后，是为了等 Vue 创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use( httpInterceptor, app );

app.$mount();
