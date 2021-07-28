import NavWrapper from '@/components/nav-vertical'

export default [
  // 后台路由
  // 左侧菜单隐藏路由需要在 meta 中配置 hideOnMenu 属性
  {
    path: '/',
    name: 'NavWrapper',
    component: NavWrapper,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      // 首页部分
      {
        path: 'home',
        name: '首页',
        meta: {
          title: '首页',
          right: 'right'
        },
        component: () => import('@/views/backstage/home/index.vue')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: 'Demo 页面',
          right: 'right'
        },
        component: () => import('@/components/relay.vue'),
        children: [
          {
            path: 'page3',
            name: '第一层',
            meta: {
              title: '第一层',
              right: 'right',
              // 面包屑
              bc: ['首页']
            },
            component: () => import('@/views/backstage/demo/ex.vue')
          },
          {
            path: 'page4',
            name: '第二层',
            meta: {
              title: '第二层',
              // 面包屑
              bc: ['首页', '第一层']
            },
            component: () => import('@/views/backstage/demo/ex2.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideOnMenu: true
    },
    component: () => import('@/views/login/index.vue')
  }
]
