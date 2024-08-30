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
				<el-tooltip content="暗黑模式 / 亮白模式">
					<el-button
						size="mini"
						plain
						circle
						:icon="isDark ? 'el-icon-moon' : 'el-icon-sunny'"
						@click="switchMode($event)"
					/>
				</el-tooltip>
			</div>
			<div class="line-item">
				<el-dropdown
					placement="bottom"
					trigger="click"
					@command="
						(e) => {
							theme = e
						}
					"
				>
					<el-tooltip content="主题切换">
						<el-button size="mini" plain circle>
							<em-icons icon-class="color" />
						</el-button>
					</el-tooltip>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								v-for="(item, index) in themes"
								:command="item.val"
								:key="'themes' + index"
								style="display: flex; align-items: center"
								:disabled="item.val === theme"
							>
								<span style="margin-right: 10px">
									{{ item.label }}
								</span>
								<span
									class="theme-c"
									v-for="(i, _i) in item.val.split(',')"
									:key="i + _i"
									style="display: inline-block; width: 20px; height: 20px; margin: 0 2px; border-radius: 50%"
									:style="{ backgroundColor: i }"
								></span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div class="line-item">
				<el-dropdown
					placement="bottom"
					trigger="click"
					@command="
						(e) => {
							language = e
						}
					"
				>
					<el-tooltip content="中英文切换">
						<el-button size="mini" plain circle>
							<em-icons icon-class="international" />
						</el-button>
					</el-tooltip>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								v-for="(item, index) in languages"
								:command="item.val"
								:key="'lang' + index"
								:disabled="item.val === language"
							>
								{{ item.label }}
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div class="line-item">
				<el-tooltip content="Github">
					<a :href="homepage" target="_blank">
						<el-button size="mini" plain circle>
							<em-icons icon-class="github" />
						</el-button>
					</a>
				</el-tooltip>
			</div>
			<div class="line-item">
				<div v-if="token">
					<el-dropdown @command="logout">
						<el-avatar :size="28">
							<span style="font-size: 12px">{{ nickname }}</span>
						</el-avatar>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>{{ $t('login.logOut') }}</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<div v-else @click="login">
					<el-avatar :size="28">
						<span style="font-size: 12px">{{ $t('login.logIn') }}</span>
					</el-avatar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import { mapGetters } from 'vuex'
	import PackageJson from '../../package.json'
	import { themes } from '../utils/constant'
	import { switchDark } from '../utils/themeChange'

	export default {
		name: 'appHeader',
		data() {
			return {
				homepage: PackageJson.homepage,
				languages: [
					{ label: '中文', val: 'zh-cn' },
					{ label: 'English', val: 'en' }
				],
				themes
			}
		},
		computed: {
			...mapGetters(['nickname', 'token']),
			serverUrl: {
				get() {
					return this.$store.getters.serverUrl
				},
				set(v) {
					this.changeSetting('serverUrl', v)
				}
			},
			language: {
				get() {
					return this.$store.getters.language
				},
				set(v) {
					this.$i18n.locale = v
					Cookies.set('language', v)
					this.changeSetting('language', v)
				}
			},
			isDark: {
				get() {
					return this.$store.getters.isDark
				},
				set(v) {
					this.changeSetting('isDark', v)
				}
			},
			theme: {
				get() {
					return this.$store.getters.theme
				},
				set(v) {
					this.changeSetting('theme', v)
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
			changeSetting(k, v) {
				this.$store.dispatch('app/changeSetting', { key: k, value: v })
			},
      switchMode(e) {
				switchDark(e, this, 'isDark')
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
		border-bottom: 1px solid var(--el-border-color-light);
		.left {
			color: var(--el-color-primary);
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
				}
			}
		}
	}
</style>
