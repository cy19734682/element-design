<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>图标选择</div>
			</template>
			<div class="card-body">
        <em-icon-select v-model="icon" />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
  import { code1 } from '../../codeJson/emIconSelectEx'

	export default {
		name: 'EmIconSelectEx',
		components: { sourceCodeView },
		data() {
			return {
        code1,
				icon: null
			}
		},
	}
</script>