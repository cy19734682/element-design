<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>自定义图标</div>
			</template>
			<div class="card-body">
				<div style="display: inline-flex; gap: 0 8px">
					<em-icons icon-class="edit" />
					<em-icons icon-class="excel" />
					<em-icons icon-class="international" />
					<em-icons icon-class="download" />
				</div>
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emIconEx'

	export default {
		name: 'EmIconEx',
		components: {
			sourceCodeView
		},
		data() {
			return {
				code1
			}
		}
	}
</script>
