<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			autocomplete="on"
			label-position="left"
		>
			<el-form-item prop="username">
				<el-input
					ref="username"
					v-model="loginForm.username"
					:placeholder="$t('login.username')"
					name="username"
					type="text"
					tabindex="1"
					autocomplete="on"
				/>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					ref="password"
					v-model="loginForm.password"
					type="password"
					:placeholder="$t('login.password')"
					name="password"
					tabindex="2"
					autocomplete="on"
					@keyup.enter.native="handleLogin"
				/>
			</el-form-item>
			<el-button
				:loading="loading"
				type="primary"
				style="width: 100%; margin-bottom: 30px"
				@click.native.prevent="handleLogin"
			>
				{{ $t('login.logIn') }}
			</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('The password can not be less than 6 digits'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					username: 'admin',
					password: '123456',
					validateCode: undefined,
					uuid: undefined
				},
				loginRules: {
					username: [
						{
							required: true,
							trigger: 'blur'
						}
					],
					password: [
						{
							required: true,
							trigger: 'blur',
							validator: validatePassword
						}
					]
				},
				loading: false,
				otherQuery: {},
				captchaUrl: undefined
			}
		},
		watch: {
			$route: {
				handler: function (route) {
					const query = route.query
					if (query) {
						this.redirect = query.redirect
						this.otherQuery = this.getOtherQuery(query)
					}
				},
				immediate: true
			}
		},
		created() {
			if (this.loginForm.username === '') {
				this.$refs.username.focus()
			} else if (this.loginForm.password === '') {
				this.$refs.password.focus()
			}
			// 获取 messageBox DOM 后移除
			const el_message_box = document.querySelector('.el-message-box__wrapper')
			const v_modal = document.querySelector('.v-modal')
			if (el_message_box && v_modal) {
				el_message_box.parentNode.removeChild(el_message_box)
				v_modal.parentNode.removeChild(v_modal)
			}
		},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						this.loading = true
						this.$store
							.dispatch('user/login', this.loginForm)
							.then(
								() => {
									this.$router.replace({
										path: this.redirect || '/',
										query: this.otherQuery
									})
									this.loading = false
								},
								(reject) => {
									console.warn(reject)
									this.loading = false
								}
							)
							.catch((e) => {
								console.warn(e)
								this.loading = false
							})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			getOtherQuery(query) {
				return Object.keys(query).reduce((acc, cur) => {
					if (cur !== 'redirect') {
						acc[cur] = query[cur]
					}
					return acc
				}, {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bg: #2d3a4b;
	$dark_gray: #889aa4;
	$light_gray: #eee;
	.login-container {
		min-height: 100%;
		width: 100%;
		background-color: $bg;
		overflow: hidden;

		.login-form {
			position: relative;
			width: 520px;
			max-width: 100%;
			padding: 160px 35px 0;
			margin: 0 auto;
			overflow: hidden;
		}

		.title-container {
			position: relative;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0 auto 40px auto;
				text-align: center;
				font-weight: bold;
			}

			.set-language {
				color: #fff;
				position: absolute;
				top: 3px;
				font-size: 18px;
				right: 0;
				cursor: pointer;
			}
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}

		.thirdparty-button {
			position: absolute;
			right: 0;
			bottom: 6px;
		}

		.validate-code {
			position: absolute;
			right: 0;
			top: 0;
			height: 48px;
			cursor: pointer;
			vertical-align: middle;
		}

		@media only screen and (max-width: 470px) {
			.thirdparty-button {
				display: none;
			}
		}
	}
</style>
