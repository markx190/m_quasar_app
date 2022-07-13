const routes = [
  {
    path: '/portal',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/sign_in', component: () => import('pages/SignInPage.vue') },
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
      { path: '/student_list', component: () => import('components/MainList.vue') }
      // { path: '/', component: () => import('pages/IndexPage.vue') },
      // { path: '/register', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('pages/FrontPage.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
