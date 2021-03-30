
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',meta:{requireLogin:true}, component: () => import('pages/TaskBoard.vue') },
      { path: 'login',meta:{requireLogin:false}, component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
