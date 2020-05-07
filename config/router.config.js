export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './User/Login',
      }, 
      {
        component: '404',
      },
    ],
  }, // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/general',
      },
      {
        path: '/general',
        name: '首页',
        icon: 'dashboard',
        component: './General/General',
      },
      {
        path: '/authoritycontrol',
        icon: 'dashboard',
        name: '权限管理',
        routes: [
          {
            path: '/authoritycontrol/authoritycontrol',
            icon: 'dashboard',
            name: '角色管理',
            component: './AuthorityControl/AuthorityControl',
          },
          {
            path: '/authoritycontrol/usercontrol',
            icon: 'dashboard',
            name: '用户管理',
            component: './AuthorityControl/UserControl',
          },
          {
            path: '/authoritycontrol/userDetail',
            icon: 'dashboard',
            name: '用户详情',
            component: './AuthorityControl/UserDetail',
          },
          {
            path: '/authoritycontrol/menucontrol',
            icon: 'dashboard',
            name: '菜单管理',
            component: './AuthorityControl/MenuControl',
          },
        ],
      }, 
      {
        path: '/article',
        name: '文章管理',
        icon: 'dashboard',
        authority: ['root'],
        routes: [
          {
            path: '/article/articlelist',
            name: '文章列表',
            icon: 'dashboard',
            component: './Article/ArticleList',
          },
          {
            path: '/article/articleEditor',
            name: '文章',
            icon: 'dashboard',
            hideInMenu: true,
            component: './Article/ArticleEditor', // hideInMenu: true,
          },
          {
            name: '文章详情',
            path: '/article/detail',
            hideInMenu: true,
            icon: 'dashboard',
            component: './Article/Detail',
          },
        ],
      },
      // 一级菜单
      {
        // 菜单路径
        path: '/demo',
        // 菜单名
        name: '示例页面',
        // 左侧菜单栏中的图标
        icon: 'dashboard',
        // 二级菜单
        routes: [
          {
            name: '列表页',
            // url
            path: '/demo/list',
            icon: 'dashboard',
            // 组件在文件中的路径
            component: './Demo/List',
          },
          {
            name: '新增页',
            path: '/demo/add',
            icon: 'dashboard',
            hideInMenu: true,
            component: './Demo/Add',
          },
          {
            name: '修改页',
            path: '/demo/update',
            icon: 'dashboard',
            hideInMenu: true,
            component: './Demo/Update',
          },
          {
            name: '基础详情页',
            path: '/demo/detail',
            icon: 'dashboard',
            component: './Demo/Detail',
          },
          {
            name: '成功页',
            path: '/demo/success',
            icon: 'dashboard',
            component: './Result/Success',
          },
          {
            name: '失败页',
            path: '/demo/error',
            icon: 'dashboard',
            component: './Result/Error',
          }
        ],
      },
      // 新路由写这里

      {
        path: '/EditPassword',
        icon: 'user',
        hideInMenu: true,
        component: './Account/Settings/EditPassword',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            component: './Exception/TriggerException',
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
