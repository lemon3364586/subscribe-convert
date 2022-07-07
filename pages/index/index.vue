<template>
	<view class="page-content">
		<u-alert-tips
			title="隐私提示"
			:description="description"
			:show="showTips"
			@close="showTips = false"
			:close-able="true"
			type="warning"
		></u-alert-tips>
		<view class="form-view">
			<u-form
				:model="form"
				ref="uForm"
				:error-type="['message']"
				label-position="left"
				label-width="160"
				label-align="left"
			>
				<u-form-item label="模式设置" :required="true">
					<u-radio-group v-model="mode">
						<u-radio :name="1">普通模式</u-radio>
						<u-radio :name="2">进阶模式</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="订阅链接" prop="waitUrl" :required="true">
					<u-input
						v-model="form.waitUrl"
						type="textarea"
						:custom-style="{ height: '150rpx' }"
						:auto-height="false"
						maxlength="9999"
						placeholder="支持订阅或ss/ssr/vmess链接，多个链接每行一个或用 | 分隔"
					/>
				</u-form-item>
				<u-form-item label="客户端" prop="targetApp" :required="true">
					<u-input
						v-model="appText"
						type="select"
						:select-open="showAppList"
						@click="showAppList = true"
						placeholder="点击选择目标客户端"
					/>
					<u-select
						v-model="showAppList"
						mode="single-column"
						:list="appList"
						@confirm="confirm($event, 1)"
					></u-select>
				</u-form-item>
				<u-form-item v-show="mode === 2" label="后端地址">
					<u-input v-model="backServer" placeholder="默认本站后端,不放心请自行搭建" />
				</u-form-item>
				<u-form-item v-show="mode === 2">
					<text style="font-size: 24rpx;color: red;line-height: 30rpx;">
						填入格式：http://127.0.0.1:25500，如想自行搭建前/后端可前往博客(blog.v2jun.com)查看相关教程
					</text>
				</u-form-item>
				<u-form-item v-show="mode === 2" label="远程配置">
					<u-input
						v-model="remoteText"
						type="select"
						:select-open="showRemoteList"
						@click="showRemoteList = true"
						placeholder="点击选择目标客户端"
					/>
					<u-select
						v-model="showRemoteList"
						mode="single-column"
						:list="remoteList"
						@confirm="confirm($event, 2)"
					></u-select>
				</u-form-item>
				<u-form-item v-show="mode === 2" label="Include">
					<u-input v-model="form.include" placeholder="节点名包含的关键字，支持正则" />
				</u-form-item>
				<u-form-item v-show="mode === 2" label="Exclude">
					<u-input v-model="form.exclude" placeholder="节点名不包含的关键字，支持正则" />
				</u-form-item>
				<u-form-item v-show="mode === 2" label="FileName">
					<u-input v-model="form.filename" placeholder="返回的订阅文件名" />
				</u-form-item>
			</u-form>
			<view v-show="mode === 2" style="margin-top: 30rpx;">
				<view style="font-size: 40rpx;font-weight: bold;">额外功能:</view>
				<u-checkbox v-model="form.emoji">Emoji</u-checkbox>
				<u-checkbox v-model="form.scv">跳过证书验证</u-checkbox>
				<u-checkbox v-model="form.udp">启用 UDP</u-checkbox>
				<u-checkbox v-model="form.appendType">节点类型</u-checkbox>
				<u-checkbox v-model="form.sort">排序节点</u-checkbox>
				<u-checkbox v-model="form.fdn">过滤非法节点</u-checkbox>
				<u-checkbox v-model="form.nodeList">输出为 Node List</u-checkbox>
				<u-checkbox v-model="form.surgeDoh">Surge.DoH</u-checkbox>
				<u-checkbox v-model="form.clashDoh">Clash.DoH</u-checkbox>
				<u-checkbox v-model="form.insert">网易云</u-checkbox>
				<view style="font-size: 24rpx;color:#999">注：以上额外功能不保证可用性</view>
			</view>
			<view v-show="!$empty(result_subscribe)" style="margin-top: 50rpx;">
				<u-field
					v-model="result_subscribe"
					label="订阅地址:"
					label-width="130"
					label-align="left"
					disabled
					:border-top="true"
					:border-bottom="true"
					placeholder="请输入订阅并点击转换"
				>
					<button
						@click="copy(result_subscribe)"
						style="height: 60rpx;line-height: 55rpx;padding: 5rpx 20rpx;font-size: 26rpx;"
						slot="right"
					>
						<u-icon name="file-text"></u-icon>
						<text>复制</text>
					</button>
				</u-field>
			</view>
			<button @click="make_url" type="primary" class="submit-button">生成订阅链接</button>
		</view>
	</view>
</template>

<script>
import importAppList from '@/data/appList.json';
import importRemoteList from '@/data/remoteConfig.json';
export default {
	data() {
		return {
			// 隐私提示
			showTips: true,
			// 隐私提示内容
			description: `
				各种订阅链接生成纯前端实现，无隐私问题。默认提供后端链接服务，隐私担忧者请自行搭建后端服务
			`,
			// 模式
			mode: 1,
			// 默认后端地址
			defaultSercer: 'http://127.0.0.1:8000',
			// 用户后端地址
			backServer: undefined,
			form: {
				waitUrl: undefined,
				targetApp: undefined,
				remote: undefined,
				include: undefined,
				exclude: undefined,
				_filename: undefined,

				emoji: true,
				nodeList: false,
				extraset: false,
				sort: false,
				udp: false,
				tfo: false,
				scv: false,
				fdn: false,
				appendType: false,
				insert: false, // 是否插入默认订阅的节点，对应配置项 insert_url
				clashDoh: false,
				surgeDoh: false
			},
			// 客户端选择弹窗状态
			showAppList: false,
			// 客户端列表
			appList: importAppList,
			// 远端配置选择弹窗状态
			showRemoteList: false,
			// 远端配置列表
			remoteList: importRemoteList,
			// 转换结果
			result_subscribe: undefined
		};
	},
	computed: {
		appText: {
			get() {
				let tempApp = importAppList.find((item) => {
					return item.value === this.form.targetApp;
				});
				return tempApp ? tempApp.label : '';
			},
			set(newValue) {
				// console.log('======>', 'newValue: ', newValue);
			}
		},
		remoteText: {
			get() {
				let tempRemote = importRemoteList.find((item) => {
					return item.value === this.form.remote;
				});
				return tempRemote ? tempRemote.label : '';
			},
			set(newValue) {
				// console.log('======>', 'newValue: ', newValue);
			}
		}
	},
	methods: {
		// 复制
		copy(data) {
			uni.setClipboardData({
				data,
				success: () => {
					this.$uniApi.toast('已复制到剪切板', 'success');
				}
			});
		},
		// 本地转换url
		make_url() {
			if (this.$empty(this.form.waitUrl)) {
				this.$uniApi.toast('请输入订阅链接', 'error');
				return false;
			} else if (this.$empty(this.form.targetApp)) {
				this.$uniApi.toast('请选择客户端', 'error');
				return false;
			}

			// 后端地址
			let _server_url = this.backServer ?? this.defaultSercer;
			// 订阅地址
			let _wait_url = encodeURIComponent(this.form?.waitUrl?.replace(/(\n|\r|\n\r)/g, '|'));
			// 拼接结果 url
			let is_make_url = `${_server_url}/sub?target=${this.form.targetApp}&url=${_wait_url}&insert=${
				this.form.insert
			}`;
			// 进阶模式
			if (this.mode === 2) {
				let tempObj1 = {
					config: this.form.remote,
					include: this.form.include,
					exclude: this.form.exclude,
					filename: this.form.filename,
					appendType: this.form.appendType
				};
				for (let key in tempObj1) {
					if (!this.$empty(tempObj1[key])) is_make_url += `&${key}=${encodeURIComponent(tempObj1[key])}`;
				}

				let tempObj2 = {
					emoji: this.form.emoji,
					list: this.form.nodeList,
					tfo: this.form.tfo,
					scv: this.form.scv,
					fdn: this.form.fdn,
					sort: this.form.sort
				};
				for (let key in tempObj2) {
					is_make_url += `&${key}=${tempObj2[key]}`;
				}
				// 启用 udp
				if (this.form.udp) is_make_url += '&udp=true';
				// surge.doh解析
				if (this.form.surgeDoh) is_make_url += '&surge.doh=true';
				// clash.doh解析
				if (this.form.clashDoh) is_make_url += '&clash.doh=true';
				// 使用 Clash 新字段
				if (this.form.targetApp === 'clash') is_make_url += '&new_name=true';
			}
			this.result_subscribe = is_make_url;
			this.copy(is_make_url);

			// console.log('======>', 'is_make_url: ', is_make_url);
		},
		// 弹窗选择器事件
		confirm(e, index) {
			let value = e[0].value;
			index === 1 ? (this.form.targetApp = value) : (this.form.remote = value);
		}
	}
};
</script>

<style lang="scss">
.page-content {
	background-color: rgba(#71d5a1, 0.6);
	min-height: 100vh;
	padding: 20rpx;
}
.form-view {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 25rpx 25rpx 50rpx;
	.submit-button {
		max-width: 500px;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		border: none;
		font-size: 34rpx;
		font-weight: bold;
		letter-spacing: 8rpx;
		margin-top: 50rpx;
	}
}
.copyright {
	margin-top: 50rpx;
	font-size: 24rpx;
	color: #999;
	text-align: center;
}
</style>
