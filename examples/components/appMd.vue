<template>
	<div class="app-markdown" :class="{ show: showRightBar }">
		<div class="markdown-body">
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
<style lang="scss">
	.app-markdown {
		width: 0;
		height: 100%;
		position: relative;
		transition: all 0.2s;

		&.show {
			width: 600px;
		}

		.markdown-body {
			padding: 10px;
			width: 600px;
			height: 100%;
			position: relative;
			border-left: 1px solid var(--el-border-color-light);
      color: var(--el-text-color-primary);
			overflow-y: auto;
			font-size: 14px;
      table{
        tr{
          background-color: transparent;
        }
      }
		}
		.markdown-btn {
			position: absolute;
			z-index: 1000;
			top: 40%;
			left: -12px;
			cursor: pointer;
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
      background-color: var(--el-bg-color-overlay);
      border: 1px solid var(--el-border-color-light);
			box-shadow: 0 4px 10px #0000001a;
			transition: all 0.15s;
			border-radius: 50%;
			&:hover {
				transform: scale(1.1);
			}
			&.none {
				left: -24px;
			}
		}
	}
</style>
