;
export default {
	primary(message, content = '') {
		console.log(
			`%c🍋 ${message}`, `
			color:#fff;
			font-size:12px;
			line-height:12px;
			padding:4px 10px;
			border-radius:500px;
			background-color:#409EFF;
			text-shadow:1px 1px 3px #999;
		`, content);
	},
	success(message, content = '') {
		console.log(
			`%c🍋 ${message}`, `
			color:#fff;
			font-size:12px;
			line-height:12px;
			padding:4px 10px;
			border-radius:500px;
			background-color:#67C23A;
			text-shadow:1px 1px 3px #999;
		`, content);
	},
	warning(message, content = '') {
		console.log(
			`%c🍋 ${message}`, `
			color:#fff;
			font-size:12px;
			line-height:12px;
			padding:4px 10px;
			border-radius:500px;
			background-color:#E6A23C;
			text-shadow:1px 1px 3px #999;
		`, content);
	},
	danger(message, content = '') {
		console.log(
			`%c🍋 ${message}`, `
			color:#fff;
			font-size:12px;
			line-height:12px;
			padding:4px 10px;
			border-radius:500px;
			background-color:#F56C6C;
			text-shadow:1px 1px 3px #999;
		`, content);
	},
	info(message, content = '') {
		console.log(
			`%c🍋 ${message}`, `
			color:#fff;
			font-size:12px;
			line-height:12px;
			padding:4px 10px;
			border-radius:500px;
			background-color:#909399;
			text-shadow:1px 1px 3px #999;
		`, content);
	}
}