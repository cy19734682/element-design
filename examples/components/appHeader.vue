<template>
	<div class="app-header">
		<div class="left">
			<span class="text">Element-Design</span>
		</div>
		<div class="right">
			<setServer class="line-item" />
			<setLange class="line-item" />
			<div class="user-info">
				<div v-if="token">
					{{ nickname }}
					<el-button size="small" @click="logout">注销</el-button>
				</div>
				<el-button v-else size="small" type="primary" @click="login"> {{ $t('login.logIn') }}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import setLange from './setLange'
	import setServer from './setServer.vue'
	export default {
		name: 'appHeader',
		components: {
			setLange,
			setServer
		},
		computed: {
			...mapGetters(['nickname', 'token'])
		},
		methods: {
			login() {
				this.$router.push({
					path: '/login'
				})
			},
			logout() {
				this.$store.dispatch('user/logout')
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			.line-item {
				margin-right: 40px;
				position: relative;
				&::after {
					content: '';
					height: 20px;
					border-left: 1px #999 solid;
					position: absolute;
					top: 0;
					right: -20px;
				}
			}
		}
	}
</style>
