export default [
  {
    path: '/employee',
    component: { template: '<router-view/>' },
    children: [
      {
        path: '',
        name: 'employee',
        component: () => import('@/views/web_pages/employee/Index.vue'),
        meta: {
          auth: true,
          parent: 'employee'
        }
      },
      {
        path: 'create',
        name: 'employee-create',
        component: () => import('@/views/web_pages/employee/Create.vue'),
        meta: {
          auth: true,
          parent: 'employee'
        }
      },
      {
        path: ':id',
        name: 'employee-edit',
        component: () => import('@/views/web_pages/employee/Create.vue'),
        meta: {
          auth: true,
          parent: 'employee'
        }
      }
    ]
  },
  {
    path: '/course',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'course',
        component: () => import('@/views/web_pages/course/Index.vue'),
        meta: {
          auth: true,
          parent: 'course'
        }
      },
      {
        path: ':id',
        name: 'course-read',
        component: () => import('@/views/web_pages/course/Read.vue'),
        meta: {
          auth: true,
          parent: 'course'
        }
      },
      {
        path: 'course-detail/:id',
        name: 'course-detail',
        component: () => import('@/views/web_pages/course/Show.vue'),
        meta: {
          auth: true,
          parent: 'course'
        }
      },
      {
        // path: 'create/:organizationId',
        path: 'create',
        name: 'course-create',
        component: () => import('@/views/web_pages/course/Create.vue'),
        meta: {
          auth: true,
          parent: 'course'
        }
      },
      {
        path: ':id',
        name: 'course-edit',
        component: () => import('@/views/web_pages/course/Create.vue'),
        meta: {
          auth: true,
          parent: 'course'
        }
      }
    ]
  },
  {
    path: '/leaderboard',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'leaderboard',
        component: () => import('@/views/web_pages/leaderboard/Index.vue'),
        meta: {
          auth: true,
          parent: 'leaderboard'
        }
      },
      {
        path: ':id',
        name: 'leaderboard-read',
        component: () => import('@/views/web_pages/leaderboard/Read.vue'),
        meta: {
          auth: true,
          parent: 'leaderboard'
        }
      },
      {
        path: 'exam_result',
        name: 'leaderboard-exam-result',
        component: () => import('@/views/web_pages/leaderboard/ExamResult.vue'),
        meta: {
          auth: true,
          parent: 'leaderboard'
        }
      }
    ]
  },
  {
    path: '/event',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'event',
        component: () => import('@/views/web_pages/event/Index.vue'),
        meta: {
          auth: true,
          parent: 'event'
        }
      },
      {
        path: 'create',
        name: 'event-create',
        component: () => import('@/views/web_pages/event/Create.vue'),
        meta: {
          auth: true,
          parent: 'event'
        }
      },
      {
        path: 'edit/:id',
        name: 'event-edit',
        component: () => import('@/views/web_pages/event/Create.vue'),
        meta: {
          auth: true,
          parent: 'event'
        }
      }
    ]
  },
  {
    path: '/mini_vhs',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'mini_vhs',
        component: () => import('@/views/web_pages/mini_vhs/Index.vue'),
        meta: {
          auth: true,
          parent: 'mini_vhs'
        }
      },
      {
        path: 'create',
        name: 'mini_vhs_create',
        component: () => import('@/views/web_pages/mini_vhs/Create.vue'),
        meta: {
          auth: true,
          parent: 'mini_vhs'
        }
      },
      {
        path: 'edit/:id',
        name: 'mini_vhs_edit',
        component: () => import('@/views/web_pages/mini_vhs/Create.vue'),
        meta: {
          auth: true,
          parent: 'mini_vhs'
        }
      },
      {
        path: ':id',
        name: 'mini_vhs_detail',
        component: () => import('@/views/web_pages/mini_vhs/Show.vue'),
        meta: {
          auth: true,
          parent: 'mini_vhs'
        }
      }
      // {
      //   path: 'create',
      //   name: 'vhs-create',
      //   component: () => import('@/views/web_pages/vhs/Create.vue'),
      //   meta: {
      //     auth: true,
      //     parent: 'vhs'
      //   }
      // },
      // {
      //   path: 'edit/:id',
      //   name: 'vhs-edit',
      //   component: () => import('@/views/web_pages/vhs/Create.vue'),
      //   meta: {
      //     auth: true,
      //     parent: 'vhs'
      //   }
      // }
    ]
  },
  {
    path: '/vhs',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'vhs',
        component: () => import('@/views/web_pages/vhs/Index.vue'),
        meta: {
          auth: true,
          parent: 'vhs'
        }
      },
      {
        path: 'create',
        name: 'vhs-create',
        component: () => import('@/views/web_pages/vhs/Create.vue'),
        meta: {
          auth: true,
          parent: 'vhs'
        }
      },
      {
        path: ':id',
        name: 'vhs-edit',
        component: () => import('@/views/web_pages/vhs/Create.vue'),
        meta: {
          auth: true,
          parent: 'vhs'
        }
      }
    ]
  },
  {
    path: '/splash_screen',
    component: {template: '<router-view/>'},
    children: [
      {
        path: '',
        name: 'splash_screen',
        component: () => import('@/views/web_pages/splash_screen/Index.vue'),
        meta: {
          auth: true,
          parent: 'splash_screen'
        }
      }
    ]
  }
]
