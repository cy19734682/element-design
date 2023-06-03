import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 默认路由
 * 这个地方设置是基本上是不需要权限就能访问的路由
 * 所有角色都可以访问
 */
const constantRoutes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    component: () => import('./views/index'),
    name: 'index',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/uploadExcelEx',
    component: () => import('./views/example/uploadExcelEx'),
    name: 'uploadExcelEx',
    meta: {
      title: 'excel上传解析'
    }
  },
  {
    path: '/emFormEx',
    component: () => import('./views/example/emFormEx'),
    name: 'emFormEx',
    meta: {
      title: 'emForm表单'
    }
  },
  {
    path: '/emSearchFormEx',
    component: () => import('./views/example/emSearchFormEx'),
    name: 'emSearchFormEx',
    meta: {
      title: 'SearchForm表单'
    }
  },
  {
    path: '/emFormGroupEx',
    component: () => import('./views/example/emFormGroupEx'),
    name: 'emFormGroupEx',
    meta: {
      title: 'formGroup表单'
    }
  },
  {
    path: '/emFormModalEx',
    component: () => import('./views/example/emFormModalEx'),
    name: 'emFormModalEx',
    meta: {
      title: 'formModal表单'
    }
  },
  {
    path: '/emTablePageEx',
    component: () => import('./views/example/emTablePageEx'),
    name: 'emTablePageEx',
    meta: {
      title: 'emTablePageEx列表'
    }
  },
  {
    path: '/emUploadEx',
    component: () => import('./views/example/emUploadEx'),
    name: 'emUploadEx',
    meta: {
      title: 'emUploadEx文件上传'
    }
  },
  {
    path: '/emCascaderAreaEx',
    component: () => import('./views/example/emCascaderAreaEx'),
    name: 'emCascaderAreaEx',
    meta: {
      title: 'emCascaderAreaEx省市区选择'
    }
  },
  {
    path: '/emCascaderEx',
    component: () => import('./views/example/emCascaderEx'),
    name: 'emCascaderEx',
    meta: {
      title: 'emCascaderEx自定义级联'
    }
  },
  {
    path: '/emMapEx',
    component: () => import('./views/example/emMapEx'),
    name: 'emMapEx',
    meta: {
      title: 'emMapEx地图组件'
    }
  },
]
/**
 * 创建路由
 * @returns {VueRouter}
 */
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

