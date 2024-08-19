<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>颜色组</div>
			</template>
			<div class="card-body">
        <em-color-group v-model="colors" is-add-del />
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="cloneVal" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
  import { code1 } from '../../codeJson/emColorGroupEx'

	export default {
		name: 'EmColorGroupEx',
		components: { sourceCodeView },
    computed: {
      cloneVal(){
        return _.cloneDeep(this.colors)
      }
    },
		data() {
			return {
        code1,
				colors: ['#ccc']
			}
		}
	}
</script>