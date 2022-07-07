;
// 判断传入值是否为空
import empty from './function/empty.js';
// 定时器，配合async await变相实现类似php的sleep效果
import sleep from './function/sleep.js';
// 自定义 console 输出
import lemonConsole from './function/lemonConsole.js';

export default {
	install( Vue, options ) {
		Vue.prototype.$empty = empty;
		Vue.prototype.$sleep = sleep;
		Vue.prototype.$lemonConsole = lemonConsole;
	}
}
