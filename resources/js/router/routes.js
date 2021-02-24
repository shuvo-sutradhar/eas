function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },

  /*********************
   ***Settings Route***
  /*********************/
  { 
    path: '/users', 
    name: 'users', 
    component: page('settings/user/index.vue'),
    meta: { permissions:['users'] }
  },
  { 
    path: '/user/create', 
    name: 'user.create', 
    component: page('settings/user/create.vue'),
    meta: { permissions:['user_create'] }
  },

  /*********************
   ***Settings Route***
  /*********************/
  { 
    path: '/settings', 
    name: 'settings', 
    component: page('settings/index.vue'),
    meta: { permissions:['setting'] }
  },
  { 
    path: '/settings/general', 
    name: 'settings.general', 
    component: page('settings/company/Settings.vue'),
    // meta: { permissions:['company_settings'] }
  },
  { 
    path: '/settings/team', 
    name: 'settings.team', 
    component: page('settings/team/Index.vue') ,
    meta: { permissions:['settings_team'] }
  },
  { path: '/settings/team/create', name: 'team.create', component: page('settings/team/Create.vue') },
  { path: '/settings/team/edit/:slug', name: 'team.edit', component: page('settings/team/Edit.vue') },
  { 
    path: '/settings/roles', 
    name: 'settings.roles', 
    component: page('settings/roles/Roles.vue'),
    meta: { permissions:['role_view'] }
  },
  { 
    path: '/settings/role/create', 
    name: 'role.create', 
    component: page('settings/roles/RoleCreate.vue'),
    meta: { permissions:['role_create'] }
  },
  { 
    path: '/settings/role/edit/:slug', 
    name: 'role.edit', 
    component: page('settings/roles/RoleEdit.vue'),
    meta: { permissions:['role_edit'] }
  },

  { path: '*', component: page('errors/404.vue') }
]
