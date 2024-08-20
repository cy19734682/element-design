<template>
	<div class="app-header">
		<div class="left">
			<span class="text">Element-Design</span>
		</div>
		<div class="right">
			<div class="line-item">
				<el-tooltip :content="$t('button.localServer') + ' / ' + $t('button.nodeServer')">
					<el-switch
						v-model="serverUrl"
						class="ml-2"
						inline-prompt
						active-value="/mock"
						inactive-value=""
						active-text="Local"
						inactive-text="Node"
					/>
				</el-tooltip>
			</div>
			<div class="line-item">
				<el-tooltip content="中文 / English">
					<div class="lang-box" @click="changeLang">
						<span class="lang-item" :class="{ act: language === 'zh-cn', acn: language !== 'zh-cn' }">中</span>
						<span class="lang-item" :class="{ act: language === 'en', acn: language !== 'en' }">En</span>
					</div>
				</el-tooltip>
			</div>
			<div class="line-item">
				<el-tooltip content="Github">
					<a :href="homepage" target="_blank">
						<em-icons style="font-size: 20px" icon-class="github" />
					</a>
				</el-tooltip>
			</div>
			<div class="line-item">
				<div v-if="token">
					<el-dropdown>
						<el-avatar :size="32">
							<span style="font-size: 12px">{{ nickname }}</span>
						</el-avatar>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="logout">{{ $t('login.logOut') }}</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<el-avatar v-else :size="32" @click="login">
					<span style="font-size: 12px">{{ $t('login.logIn') }}</span>
				</el-avatar>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import PackageJson from '../../package.json'

	export default {
		name: 'appHeader',
		data() {
			return {
				homepage: PackageJson.homepage
			}
		},
		computed: {
			...mapGetters(['nickname', 'token']),
			serverUrl: {
				get() {
					return this.$store.getters.serverUrl
				},
				set(v) {
					this.$store.dispatch('app/setServerUrl', v)
				}
			},
			language: {
				get() {
					return this.$store.getters.language
				},
				set(v) {
					this.$i18n.locale = v
					this.$store.dispatch('app/setLanguage', v)
				}
			}
		},
		methods: {
			login() {
				this.$router.push({
					path: '/login'
				})
			},
			logout() {
				this.$store.dispatch('user/logout')
			},
			changeLang() {
				this.language = this.language === 'zh-cn' ? 'en' : 'zh-cn'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.app-header {
		padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #dcdfe6;
		.left {
			color: #409eff;
			font-size: 20px;
			font-weight: bold;
		}
		.right {
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.line-item {
				position: relative;
				cursor: pointer;
				margin-left: 40px;

				.lang-box {
					position: relative;
					width: 1.2em;
					height: 1.2em;
					.lang-item {
						position: absolute;
						font-size: 1.2em;
						line-height: 1;
						border: 1px solid rgba(0, 0, 0, 0.88);
						color: rgba(0, 0, 0, 0.88);
						&.act {
							inset-inline-start: -5%;
							top: 0;
							z-index: 1;
							background-color: rgba(0, 0, 0, 0.88);
							color: #ffffff;
							transform: scale(0.7);
							transform-origin: 0 0;
						}
						&.acn {
							inset-inline-end: -5%;
							bottom: 0;
							z-index: 0;
							transform: scale(0.5);
							transform-origin: 100% 100%;
						}
					}
				}
			}
		}
	}
</style>
