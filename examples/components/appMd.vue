<template>
	<div class="app-markdown">
		<div class="markdown-body" v-show="showRightBar">
			<component :is="mdContent" />
		</div>
		<div class="markdown-btn" :class="{ none: !showRightBar }" @click="showRightBar = !showRightBar">
			<i class="el-icon-arrow-right" v-if="showRightBar"></i>
			<i class="el-icon-arrow-left" v-else></i>
		</div>
	</div>
</template>
<script>
	import comps from '../../src/components'

	export default {
		name: 'appMd',
		props: {
			routeNow: {
				//手动设置说明地址
				type: String,
				default: null
			},
			color: {
				default: '#2d8cf0'
			}
		},
		data() {
			return {
				showRightBar: true
			}
		},
		computed: {
			routeName() {
				return String(this.$route?.meta?.mdName)
			},
			mdContent() {
				return (this.routeNow && comps[this.routeNow]) || comps[this.routeName]
			}
		}
	}
</script>
<style lang="scss">
	@import '~github-markdown-css';
	@import '~highlight.js/styles/github.css';
</style>
<style lang="scss" scoped>
	.app-markdown {
		height: 100%;
		position: relative;
		.markdown-body {
			width: 600px;
			padding: 10px;
			height: 100%;
			position: relative;
			border-left: 1px solid #dcdfe6;
			overflow-y: auto;
			font-size: 14px;
		}
		.markdown-btn {
			position: absolute;
			z-index: 1000;
			top: 50%;
			opacity: 0.8;
			cursor: pointer;
			background: #2c3e50;
			border-radius: 0 10px 10px 0;
			i {
				font-size: 24px;
				color: #ffffff;
			}
			&.none {
				left: -24px;
				border-radius: 10px 0 0 10px;
			}
		}
	}
</style>
