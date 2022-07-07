// vue.config.js

// #ifdef H5
/* 自定义路径别名 */
const path = require( 'path' );
const resolve = ( dir ) => path.join( __dirname, dir );
/* 跨域域名处理 */
const { $global_host } = require( "./service/global.config.js" ); //引入自定义全局 host

/*
配置 h5 的 js 以时间戳作为版本号，以求解决 h5 的缓存问题
由于这种方式的打包，会导致编译生成微信小程序（只验证了微信小程序）无法正常使用，所以必须加判断分开
*/
let filePath = 'static/js/';
let timeStamp = new Date().getTime();
module.exports = {
	// ... webpack 相关配置
	filenameHashing: false, // 文件名是否加上 hash 值
	configureWebpack: {
		resolve: {
			// 配置路径别名，路径别名只可在 H5 中使用
			alias: {
				'~components': resolve( 'components' ),
				'~js': resolve( 'js' ),
				'~pages': resolve( 'pages' ),
				'~sdk': resolve( 'sdk' ),
				'~static': resolve( 'static' ),
				'~service': resolve( 'service' ),
			}
		},
		output: {
			// 输出重构  打包编译后的 文件目录/文件名称 【模块名称.时间戳】
			filename: `${filePath}[name].${timeStamp}.js`,
			chunkFilename: `${filePath}[name].${timeStamp}.js`
		},
	},
	devServer: {
		// 以上的 ip 和端口是我们本机的,下面为需要跨域的
		proxy: {
			'/proxyApi': {
				target: $global_host, // 后台接口
				ws: true, // network 传输协议
				changOrigin: true, // 是否允许跨域
				pathRewrite: {
					'^/proxyApi': '' // 请求的时候使用这个 api 就可以
				}
			}
		}
	}
}
// #endif
