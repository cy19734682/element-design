<template>
	<div class="source-container">
		<div v-show="show" class="source-box">
			<highlight-code lang="vue">{{ code }}</highlight-code>
		</div>
		<div class="example-control" :class="{ show }" @click="show = !show">
			<span v-show="!show">
				<i class="el-icon-arrow-down"></i>
				{{ $t('button.viewSourceCode') }}
			</span>
			<span v-show="show">
				<i class="el-icon-arrow-up"></i>
				{{ $t('button.hideSourceCode') }}
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'sourceCodeView',
		props: {
			code: {
				default: ''
			}
		},
		data() {
			return {
				show: false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.source-container {
		.source-box {
			padding: 15px;
		}

		.example-control {
			height: 44px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			color: #909399;
			background-color: #ffffff;
			box-sizing: border-box;
			position: sticky;
			left: 0;
			right: 0;
			/*上层元素有个有padding会影响*/
			bottom: -30px;
			z-index: 10;
			&.show {
				border-top: 1px solid #e4e7ed;
			}
			&:hover {
				color: #409eff;
			}
			span {
				font-size: 14px;
				i {
					margin-right: 10px;
				}
			}
		}
	}
</style>
