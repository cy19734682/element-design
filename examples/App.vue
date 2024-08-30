<template>
	<router-view />
</template>

<script>
	import { mapGetters } from 'vuex'
	import { switchTheme } from './utils/themeChange'
	export default {
		name: 'App',
		computed: {
			// 映射 Vuex 中的状态到当前组件的计算属性
			...mapGetters(['isDark', 'theme'])
		},
		watch: {
			// 监听 Vuex 中的状态变化
			isDark: {
				handler: function (v) {
          if (v) {
						document.documentElement.classList.remove('dark')
					} else {
						document.documentElement.classList.add('dark')
					}
				},
				immediate: true
			},
			theme: {
				handler: async function (v) {
					await switchTheme(v)
				},
				immediate: true
			}
		}
	}
</script>
