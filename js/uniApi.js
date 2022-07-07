/* 
使用：
import uniApi from "./util/request.js";
Vue.prototype.$uniApi = uniApi // 挂载到全局
*/
;
module.exports = {
	/**
	 * showToast弹窗
	 * @param {String} title 弹窗内容
	 * @param {String} icon 弹出提示状态，默认none
	 * @param {String} duration 弹窗时间，默认1500ms
	 */
	toast(title, icon, duration, mask) {
		uni.showToast({
			title: title,
			icon: icon || 'none',
			duration: duration || 1500,
			mask: mask || false
		})
	},
	/**
	 * showModal弹窗提醒，点击确定返回true，取消返回false
	 * @param {String} title 弹窗标题
	 * @param {String} content 弹窗内容
	 * @param {Boolean} showCancel 是否显示取消按钮，默认false
	 * @param {String} confirmText 确定按钮文字
	 * @param {String} cancelText 取消按钮文字
	 */
	modal(title, content, showCancel, confirmText, cancelText) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: title,
				content: content,
				showCancel: showCancel || false,
				confirmText: confirmText || '确定',
				cancelText: cancelText || '取消',
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定');
						resolve(true);
					} else if (res.cancel) {
						// console.log('用户点击取消');
						resolve(false);
					}
				}
			});
		})
	},
	/**
	 * loading弹窗
	 * @param {String} title loading提示内容
	 */
	loading(title, mask) {
		uni.showLoading({
			title: title || '请稍等…',
			mask: mask || true
		});
	},
	/**
	 * 拨打电话
	 * @param {Object} phone 需要拨打的目标号码
	 */
	call(phone) {
		uni.makePhoneCall({
			phoneNumber: phone
		});
	},
	/**
	 * 获取位置经纬度
	 */
	getLoction() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					// console.log( '当前位置的经度：' + res.longitude );
					// console.log( '当前位置的纬度：' + res.latitude );
					let loction = {
						longitude: res.longitude,
						latitude: res.latitude
					}
					resolve(loction);
				},
				fail: (err) => {
					reject(err);
				}
			});
		})
	},
	/**
	 * 设置缓存
	 * @param {String} key 缓存键名
	 * @param {String} data 缓存数据
	 */
	setStorage(key, data) {
		try {
			return uni.setStorageSync(key, data || null);
		} catch (err) {
			// 设置失败
			console.log('设置失败，err：', err);
		}
	},
	/**
	 * 获取缓存
	 * @param {String} key 缓存键名
	 */
	getStorage(key) {
		try {
			return uni.getStorageSync(key) || null;
		} catch (err) {
			//获取失败
			console.log('获取失败，err：', err);
		}
	},
	/**
	 * 移除指定key缓存
	 * @param {String} key 缓存键名
	 */
	removeStorage(key) {
		try {
			uni.removeStorageSync(key);
		} catch (err) {
			// 移除失败
			console.log('移除失败，err：', err);
		}
	},
	/**
	 * 清除所有缓存
	 */
	clearStorage() {
		try {
			uni.clearStorageSync();
		} catch (err) {
			// 清除失败
			console.log('清除失败，err：', err);
		}
	},
	/**
	 * 跳转到指定小程序
	 * @param {String} appid 目标小程序appid
	 * @param {String} path 跳转路径，默认为首页
	 * @param {Object} extraData 需要传递给目标小程序的数据，目标小程序可在App.vue的 onLaunch 或 onShow 中获取到这份数据
	 */
	gotoMini(appid, path, extraData) {
		uni.navigateToMiniProgram({
			appId: '',
			path: path || 'pages/index/index',
			extraData: extraData || {},
			success(res) {
				// 打开成功
				console.log('已打开目标小程序,res:', res);
			},
			fail(err) {
				// 打开失败
				console.log('打开目标小程序失败,err:', err);
			}
		})
	},
	/**
	 * 打开文件
	 * @param {String} urls 目标文件url
	 */
	openDocument(urls) {
		uni.showLoading({
			title: "下载中",
		})
		uni.downloadFile({
			url: urls,
			success: (downRes) => {
				console.log('downRes: ', downRes)
				uni.hideLoading();
				if (downRes.statusCode === 200) {
					uni.showToast({
						title: '下载成功',
						icon: 'none',
						duration: 500
					})
					let downfilePath = downRes.tempFilePath;
					uni.openDocument({
						filePath: downfilePath,
						showMenu: true,
						success: (openRes) => {
							console.log('打开文档成功,openRes: ', openRes);
						},
						fail: (openErr) => {
							console.log('打开文档失败,openErr: ', openErr);
						},
					});
				} else {
					uni.showToast({
						title: '下载失败',
						icon: 'none',
						duration: 500
					})
				}
			},
		});
	},
	/**
	 * 获取系统信息 
	 */
	getSystemInfo() {
		return new Promise(resolve => {
			try {
				const res = uni.getSystemInfoSync();
				// 获取成功
				resolve(res);
				console.log('获取成功，res:', res)
			} catch (err) {
				// 获取失败
				resolve(err);
				console.log('获取失败，err:', err);
			}
		})
	},
}
