import Vue from 'vue'
import Router from 'vue-router'
import appMain from './components/appMain'

Vue.use(Router)

/**
 * 默认路由
 * 这个地方设置是基本上是不需要权限就能访问的路由
 * 所有角色都可以访问
 */
const constantRoutes = [
	{
		path: '/',
		redirect: '/upload/emUploadExcel'
	},
	{
		path: '/login',
		component: () => import('./views/login'),
		name: 'login',
		meta: {
			title: '登录'
		}
	},
	{
		path: '/upload',
		component: appMain,
		name: 'upload',
		meta: {
			title: '上传组件'
		},
		children: [
			{
				path: 'emUploadExcel',
				component: () => import('./views/example/emUploadExcelEx.vue'),
				name: 'EmUploadExcel',
				meta: {
					title: 'excel上传解析',
					mdName: 'EmUploadExcel'
				}
			},
			{
				path: 'emUpload',
				component: () => import('./views/example/emUploadEx.vue'),
				name: 'EmUpload',
				meta: {
					title: '文件上传',
					mdName: 'EmUpload'
				}
			}
		]
	},
	{
		path: '/form',
		component: appMain,
		name: 'form',
		meta: {
			title: '表单组件'
		},
		children: [
			{
				path: 'emForm',
				component: () => import('./views/example/emFormEx.vue'),
				name: 'EmForm',
				meta: {
					title: '综合表单',
					mdName: 'EmForm'
				}
			},
			{
				path: 'emStaticForm',
				component: () => import('./views/example/emStaticFormEx.vue'),
				name: 'EmStaticForm',
				meta: {
					title: '静态表单',
					mdName: 'EmStaticForm'
				}
			},
			{
				path: 'emSearchForm',
				component: () => import('./views/example/emSearchFormEx.vue'),
				name: 'EmSearchForm',
				meta: {
					title: '搜索表单',
					mdName: 'EmSearchForm'
				}
			},
			{
				path: 'emFormGroup',
				component: () => import('./views/example/emFormGroupEx.vue'),
				name: 'EmFormGroup',
				meta: {
					title: '分组表单',
					mdName: 'EmFormGroup'
				}
			},
			{
				path: 'emFormModal',
				component: () => import('./views/example/emFormModalEx.vue'),
				name: 'EmFormModal',
				meta: {
					title: '弹窗表单',
					mdName: 'EmFormModal'
				}
			}
		]
	},
	{
		path: '/table',
		component: appMain,
		name: 'table',
		meta: {
			title: '分页表格组件'
		},
		children: [
			{
				path: 'emTablePage',
				component: () => import('./views/example/emTablePageEx.vue'),
				name: 'EmTablePage',
				meta: {
					title: '表格分页',
					mdName: 'EmTablePage'
				}
			},
			{
				path: 'emRowPage',
				component: () => import('./views/example/emRowPageEx.vue'),
				name: 'emRowPage',
				meta: {
					title: '栅栏分页',
					mdName: 'EmTablePage'
				}
			}
		]
	},
	{
		path: '/home',
		component: appMain,
		name: 'home',
		meta: {
			title: '其它组件'
		},
		children: [
			{
				path: 'emCascaderArea',
				component: () => import('./views/example/emCascaderAreaEx.vue'),
				name: 'EmCascaderArea',
				meta: {
					title: '省市区选择',
					mdName: 'EmCascaderArea'
				}
			},
			{
				path: 'emCascader',
				component: () => import('./views/example/emCascaderEx.vue'),
				name: 'EmCascader',
				meta: {
					title: '自定义级联',
					mdName: 'EmCascader'
				}
			},
			{
				path: 'emMap',
				component: () => import('./views/example/emMapEx.vue'),
				name: 'EmMap',
				meta: {
					title: '地图组件',
					mdName: 'EmBaiduMap'
				}
			},
			{
				path: 'emCharts',
				component: () => import('./views/example/emChartsEx.vue'),
				name: 'EmCharts',
				meta: {
					title: '图表',
					mdName: 'EmCharts'
				}
			},
			{
				path: 'emIcon',
				component: () => import('./views/example/emIconEx.vue'),
				name: 'EmIcon',
				meta: {
					title: '图标',
					mdName: 'EmIcons'
				}
			},
			{
				path: 'emIconSelect',
				component: () => import('./views/example/emIconSelectEx.vue'),
				name: 'EmIconSelect',
				meta: {
					title: '图标选择',
					mdName: 'EmIconSelect'
				}
			},
			{
				path: 'emTableSelect',
				component: () => import('./views/example/emTableSelectEx.vue'),
				name: 'EmTableSelect',
				meta: {
					title: '表格选择',
					mdName: 'EmTableSelect'
				}
			},
			{
				path: 'emSelectInput',
				component: () => import('./views/example/emSelectInputEx.vue'),
				name: 'EmSelectInput',
				meta: {
					title: '下拉选择输入',
					mdName: 'EmSelectInput'
				}
			},
			{
				path: 'emColorGroup',
				component: () => import('./views/example/emColorGroupEx.vue'),
				name: 'EmColorGroup',
				meta: {
					title: '颜色组',
					mdName: 'EmColorGroup'
				}
			}
		]
	}
]
/**
 * 创建路由
 */
export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})
