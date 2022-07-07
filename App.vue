<script>
export default {
	onLaunch: function() {
		this.$lemonConsole.primary(
			'本项目由 lemonNoJuice 开源于 github：https://github.com/lemonNoJuice/subscribe-convert'
		);
		this.$lemonConsole.info('博客：https://blog.v2jun.com');
	},
	onShow: function() {},
	onHide: function() {},
	methods: {}
};
</script>

<style lang="scss">
/* 使用 uview-ui css*/
@import 'uview-ui/index.scss';

/* 页面公共css */
page {
	background-color: #f8f8f8;
}
image,
img {
	display: block;
}
</style>
