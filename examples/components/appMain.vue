<template>
	<div class="app-main-container">
		<app-header />
		<main class="app-main">
			<app-side-menu />
			<div class="app-container">
				<transition name="fade-transform" mode="out-in">
					<keep-alive>
						<router-view :key="key" />
					</keep-alive>
				</transition>
			</div>
			<app-md />
		</main>
	</div>
</template>

<script>
	import appHeader from '../components/appHeader'
	import appSideMenu from '../components/appSideMenu.vue'
	import appMd from '../components/appMd.vue'

	export default {
		name: 'appMain',
		components: {
			appHeader,
			appSideMenu,
			appMd
		},
		computed: {
			key() {
				return this.$route.path
			}
		}
	}
</script>
<style lang="scss" scoped>
	.app-main-container {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 100%;
		height: 100%;
		.app-main {
			flex: 1;
			width: 100%;
			height: 100%;
			position: relative;
			overflow: hidden;
			display: flex;
			.app-container {
				flex: 1;
				min-width: 0;
				padding: 10px;
			}
		}
	}
</style>
