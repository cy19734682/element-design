<template>
	<div class="app-sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" unique-opened router>
			<template v-for="item in routeArr">
				<template v-if="item.children">
					<el-submenu :index="item.path" :key="item.name">
						<template #title>
							<span>{{ item?.meta?.title }}</span>
						</template>
						<template v-for="subItem in item.children">
							<el-submenu v-if="subItem.children" :index="item.path + '/' + subItem.path" :key="subItem.name">
								<template #title>{{ subItem?.meta.title }}</template>
								<el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.name">
									{{ threeItem?.meta?.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="item.path + '/' + subItem.path">
								{{ subItem?.meta?.title }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.path" :key="item.name">
						<template #title>{{ item?.meta?.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
	export default {
		name: 'appSideMenu',
		computed: {
			routeArr() {
				return this.$router.options.routes.filter((e) => {
					if (e.name && e.name !== 'login' && e.name !== 'index') {
						return e
					}
				})
			},
			onRoutes() {
				return this.$route.path
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-sidebar {
		width: 250px;
		.logo {
			display: flex;
			padding: 6px 15px;
			align-items: center;

			.text {
				color: #ffffff;
				font-size: 26px;
				font-weight: bold;
				padding: 12px 0 12px 10px;
				transition: width 2s ease;
			}
		}

		.el-menu {
			height: 100%;
		}
	}
</style>
