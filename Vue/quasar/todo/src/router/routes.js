const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('pages/PageTodo.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/PageSettings.vue'),
      },
      {
        path: 'settings/help',
        name: 'Help',
        component: () => import('pages/PageHelp.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/PageAuth.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  // noinspection JSCheckFunctionSignatures
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
