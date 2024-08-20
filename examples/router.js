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
			title: 'uploadC'
		},
		children: [
			{
				path: 'emUploadExcel',
				component: () => import('./views/example/emUploadExcelEx.vue'),
				name: 'EmUploadExcel',
				meta: {
					title: 'excelUpload',
					mdName: 'EmUploadExcel'
				}
			},
			{
				path: 'emUpload',
				component: () => import('./views/example/emUploadEx.vue'),
				name: 'EmUpload',
				meta: {
					title: 'fileUpload',
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
			title: 'formC'
		},
		children: [
			{
				path: 'emForm',
				component: () => import('./views/example/emFormEx.vue'),
				name: 'EmForm',
				meta: {
					title: 'synForm',
					mdName: 'EmForm'
				}
			},
			{
				path: 'emStaticForm',
				component: () => import('./views/example/emStaticFormEx.vue'),
				name: 'EmStaticForm',
				meta: {
					title: 'staticForm',
					mdName: 'EmStaticForm'
				}
			},
			{
				path: 'emSearchForm',
				component: () => import('./views/example/emSearchFormEx.vue'),
				name: 'EmSearchForm',
				meta: {
					title: 'searchForm',
					mdName: 'EmSearchForm'
				}
			},
			{
				path: 'emFormGroup',
				component: () => import('./views/example/emFormGroupEx.vue'),
				name: 'EmFormGroup',
				meta: {
					title: 'groupForm',
					mdName: 'EmFormGroup'
				}
			},
			{
				path: 'emFormModal',
				component: () => import('./views/example/emFormModalEx.vue'),
				name: 'EmFormModal',
				meta: {
					title: 'modalForm',
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
			title: 'tableC'
		},
		children: [
			{
				path: 'emTablePage',
				component: () => import('./views/example/emTablePageEx.vue'),
				name: 'EmTablePage',
				meta: {
					title: 'tablePage',
					mdName: 'EmTablePage'
				}
			},
			{
				path: 'emRowPage',
				component: () => import('./views/example/emRowPageEx.vue'),
				name: 'emRowPage',
				meta: {
					title: 'tableRow',
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
			title: 'otherC'
		},
		children: [
			{
				path: 'emCascaderArea',
				component: () => import('./views/example/emCascaderAreaEx.vue'),
				name: 'EmCascaderArea',
				meta: {
					title: 'area',
					mdName: 'EmCascaderArea'
				}
			},
			{
				path: 'emCascader',
				component: () => import('./views/example/emCascaderEx.vue'),
				name: 'EmCascader',
				meta: {
					title: 'cascader',
					mdName: 'EmCascader'
				}
			},
			{
				path: 'emMap',
				component: () => import('./views/example/emMapEx.vue'),
				name: 'EmMap',
				meta: {
					title: 'mapC',
					mdName: 'EmBaiduMap'
				}
			},
			{
				path: 'emCharts',
				component: () => import('./views/example/emChartsEx.vue'),
				name: 'EmCharts',
				meta: {
					title: 'chart',
					mdName: 'EmCharts'
				}
			},
			{
				path: 'emIcon',
				component: () => import('./views/example/emIconEx.vue'),
				name: 'EmIcon',
				meta: {
					title: 'icon',
					mdName: 'EmIcons'
				}
			},
			{
				path: 'emIconSelect',
				component: () => import('./views/example/emIconSelectEx.vue'),
				name: 'EmIconSelect',
				meta: {
					title: 'iconSelect',
					mdName: 'EmIconSelect'
				}
			},
			{
				path: 'emTableSelect',
				component: () => import('./views/example/emTableSelectEx.vue'),
				name: 'EmTableSelect',
				meta: {
					title: 'tableSelect',
					mdName: 'EmTableSelect'
				}
			},
			{
				path: 'emSelectInput',
				component: () => import('./views/example/emSelectInputEx.vue'),
				name: 'EmSelectInput',
				meta: {
					title: 'selectInput',
					mdName: 'EmSelectInput'
				}
			},
			{
				path: 'emColorGroup',
				component: () => import('./views/example/emColorGroupEx.vue'),
				name: 'EmColorGroup',
				meta: {
					title: 'colorGroup',
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
