let server_url = 'https://'; // 全局请求域名
let run_path = '/index.php/api'; // api 运行目录

module.exports = {
	// 全局请求 host
	$global_host: process.env.NODE_ENV === 'development' ? `${server_url}${run_path}` : run_path,
	// 全局请求 header，用于小程序 session 设置等
	$global_headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'Content-Type': 'application/json;charset=UTF-8',
	}
}
