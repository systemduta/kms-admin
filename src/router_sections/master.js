export default [
  // Divisin
  {
    path: "/division",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "division",
        component: () => import("@/views/web_pages/division/Index.vue"),
        meta: {
          auth: true,
          parent: "division",
        },
      },
      {
        path: "create",
        name: "division-create",
        component: () => import("@/views/web_pages/division/Create.vue"),
        meta: {
          auth: true,
          parent: "division",
        },
      },
      {
        path: ":id",
        name: "division-edit",
        component: () => import("@/views/web_pages/division/Create.vue"),
        meta: {
          auth: true,
          parent: "division",
        },
      },
    ],
  },

  // Employee
  {
    path: "/employee",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "employee",
        component: () => import("@/views/web_pages/employee/Index.vue"),
        meta: {
          auth: true,
          parent: "employee",
        },
      },
      {
        path: "create",
        name: "employee-create",
        component: () => import("@/views/web_pages/employee/Create.vue"),
        meta: {
          auth: true,
          parent: "employee",
        },
      },
      {
        path: ":id",
        name: "employee-edit",
        component: () => import("@/views/web_pages/employee/Create.vue"),
        meta: {
          auth: true,
          parent: "employee",
        },
      },
    ],
  },

  // Course
  {
    path: "/course",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "course",
        component: () => import("@/views/web_pages/course/Index.vue"),
        meta: {
          auth: true,
          parent: "course",
        },
      },
      {
        path: ":id",
        name: "course-read",
        component: () => import("@/views/web_pages/course/Read.vue"),
        meta: {
          auth: true,
          parent: "course",
        },
      },
      {
        path: "course-detail/:id",
        name: "course-detail",
        component: () => import("@/views/web_pages/course/Show.vue"),
        meta: {
          auth: true,
          parent: "course",
        },
      },
      {
        // path: 'create/:organizationId',
        path: "create",
        name: "course-create",
        component: () => import("@/views/web_pages/course/Create.vue"),
        meta: {
          auth: true,
          parent: "course",
        },
      },
      {
        path: ":id",
        name: "course-edit",
        component: () => import("@/views/web_pages/course/Create.vue"),
        meta: {
          auth: true,
          parent: "course",
        },
      },
      {
        path: "update-question/:id",
        name: "question-edit",
        component: () => import("@/views/web_pages/course/Update.vue"),
        meta: {
          auth: true,
          parent: "update",
        },
      },
      {
        path: "update-answer/:id",
        name: "updater",
        component: () => import("@/views/web_pages/course/Answer.vue"),
        meta: {
          auth: true,
          parent: "answer",
        },
      },
    ],
  },

  // Book
  {
    path: "/book",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "book",
        component: () => import("@/views/web_pages/book/Index.vue"),
        meta: {
          auth: true,
          parent: "book",
        },
      },
      {
        path: "create",
        name: "book-create",
        component: () => import("@/views/web_pages/book/Create.vue"),
        meta: {
          auth: true,
          parent: "book",
        },
      },
      {
        path: ":id",
        name: "book-edit",
        component: () => import("@/views/web_pages/book/Create.vue"),
        meta: {
          auth: true,
          parent: "book",
        },
      },
    ],
  },

  // Lampiran
  {
    path: "/lampiran",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "lampiran",
        component: () => import("@/views/web_pages/lampiran/Index.vue"),
        meta: {
          auth: true,
          parent: "lampiran",
        },
      },
      {
        path: "create",
        name: "lampiran-create",
        component: () => import("@/views/web_pages/lampiran/Create.vue"),
        meta: {
          auth: true,
          parent: "lampiran",
        },
      },
      {
        path: ":id",
        name: "lampiran-edit",
        component: () => import("@/views/web_pages/lampiran/Create.vue"),
        meta: {
          auth: true,
          parent: "lampiran",
        },
      },
    ],
  },

  // SOP
  {
    path: "/sop",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "sop",
        component: () => import("@/views/web_pages/sop/Index.vue"),
        meta: {
          auth: true,
          parent: "sop",
        },
      },
      {
        path: "create",
        name: "sop-create",
        component: () => import("@/views/web_pages/sop/Create.vue"),
        meta: {
          auth: true,
          parent: "sop",
        },
      },
      {
        path: ":id",
        name: "sop-edit",
        component: () => import("@/views/web_pages/sop/Create.vue"),
        meta: {
          auth: true,
          parent: "sop",
        },
      },
      {
        path: ":id",
        name: "sop-red",
        component: () => import("@/views/web_pages/sop/Read.vue"),
        meta: {
          auth: true,
          parent: "sop",
        },
      },
      {
        path: "sop-detail/:id",
        name: "sop-detail",
        component: () => import("@/views/web_pages/sop/Show.vue"),
        meta: {
          auth: true,
          parent: "sop",
        },
      },
    ],
  },
  // crossfunction
  {
    path: "/crossfunction",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "crossfunction",
        component: () => import("@/views/web_pages/crossfunction/Index.vue"),
        meta: {
          auth: true,
          parent: "crossfunction",
        },
      },
      {
        path: "create",
        name: "crossfunction-create",
        component: () => import("@/views/web_pages/crossfunction/Create.vue"),
        meta: {
          auth: true,
          parent: "crossfunction",
        },
      },
      {
        path: ":id",
        name: "crossfunction-edit",
        component: () => import("@/views/web_pages/crossfunction/Create.vue"),
        meta: {
          auth: true,
          parent: "crossfunction",
        },
      },
    ],
  },

  // Leaderboard
  {
    path: "/leaderboard",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "leaderboard",
        component: () => import("@/views/web_pages/leaderboard/Index.vue"),
        meta: {
          auth: true,
          parent: "leaderboard",
        },
      },
      {
        path: ":id",
        name: "leaderboard-read",
        component: () => import("@/views/web_pages/leaderboard/Read.vue"),
        meta: {
          auth: true,
          parent: "leaderboard",
        },
      },
      {
        path: "exam_result",
        name: "leaderboard-exam-result",
        component: () => import("@/views/web_pages/leaderboard/ExamResult.vue"),
        meta: {
          auth: true,
          parent: "leaderboard",
        },
      },
    ],
  },

  // Event
  {
    path: "/event",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "event",
        component: () => import("@/views/web_pages/event/Index.vue"),
        meta: {
          auth: true,
          parent: "event",
        },
      },
      {
        path: "create",
        name: "event-create",
        component: () => import("@/views/web_pages/event/Create.vue"),
        meta: {
          auth: true,
          parent: "event",
        },
      },
      {
        path: "edit/:id",
        name: "event-edit",
        component: () => import("@/views/web_pages/event/Create.vue"),
        meta: {
          auth: true,
          parent: "event",
        },
      },
    ],
  },

  // VHS
  {
    path: "/mini_vhs",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "mini_vhs",
        component: () => import("@/views/web_pages/mini_vhs/Index.vue"),
        meta: {
          auth: true,
          parent: "mini_vhs",
        },
      },
      {
        path: "create",
        name: "mini_vhs_create",
        component: () => import("@/views/web_pages/mini_vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "mini_vhs",
        },
      },
      {
        path: "edit/:id",
        name: "mini_vhs_edit",
        component: () => import("@/views/web_pages/mini_vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "mini_vhs",
        },
      },
      {
        path: ":id",
        name: "mini_vhs_detail",
        component: () => import("@/views/web_pages/mini_vhs/Show.vue"),
        meta: {
          auth: true,
          parent: "mini_vhs",
        },
      },
    ],
  },

  // VHS
  {
    path: "/vhs",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "vhs",
        component: () => import("@/views/web_pages/vhs/Index.vue"),
        meta: {
          auth: true,
          parent: "vhs",
        },
      },
      {
        path: "create",
        name: "vhs-create",
        component: () => import("@/views/web_pages/vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs",
        },
      },
      {
        path: ":id",
        name: "vhs-edit",
        component: () => import("@/views/web_pages/vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs",
        },
      },
    ],
  },

  //vhs
  {
    path: "/jadwal",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "jadwal",
        component: () => import("@/views/web_pages/jadwal/Index.vue"),
        meta: {
          auth: true,
          parent: "jadwal",
        },
      },
      {
        path: "create",
        name: "jadwal-create",
        component: () => import("@/views/web_pages/jadwal/Create.vue"),
        meta: {
          auth: true,
          parent: "jadwal",
        },
      },
      {
        path: ":id",
        name: "jadwal-edit",
        component: () => import("@/views/web_pages/jadwal/Create.vue"),
        meta: {
          auth: true,
          parent: "jadwal",
        },
      },
    ],
  },

  {
    path: "/zoom-vhs",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "zoom-vhs",
        component: () => import("@/views/web_pages/zoom-vhs/Index.vue"),
        meta: {
          auth: true,
          parent: "zoom-vhs",
        },
      },
      {
        path: "create",
        name: "zoom-vhs-create",
        component: () => import("@/views/web_pages/zoom-vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "zoom-vhs",
        },
      },
      {
        path: ":id",
        name: "zoom-vhs-edit",
        component: () => import("@/views/web_pages/zoom-vhs/Create.vue"),
        meta: {
          auth: true,
          parent: "zoom-vhs",
        },
      },
    ],
  },

  {
    path: "/vhs-pages/materi",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "vhs-pages/materi",
        component: () => import("@/views/web_pages/vhs-pages/materi/Index.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/materi",
        },
      },
      {
        path: "create",
        name: "vhs-pages/materi/create",
        component: () =>
          import("@/views/web_pages/vhs-pages/materi/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/materi",
        },
      },
      {
        path: ":id",
        name: "vhs-pages/materi/edit",
        component: () =>
          import("@/views/web_pages/vhs-pages/materi/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/materi",
        },
      },
    ],
  },

  {
    path: "/vhs-pages/questionvhs",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "vhs-pages/questionvhs",
        component: () =>
          import("@/views/web_pages/vhs-pages/questionvhs/Index.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/questionvhs",
        },
      },
      {
        path: "create",
        name: "vhs-pages/questionvhs/create",
        component: () =>
          import("@/views/web_pages/vhs-pages/questionvhs/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/questionvhs",
        },
      },
      {
        path: ":id",
        name: "vhs-pages/questionvhs/edit",
        component: () =>
          import("@/views/web_pages/vhs-pages/questionvhs/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/questionvhs",
        },
      },
      {
        path: "/answer/:id",
        name: "vhs-pages/questionvhs/answer",
        component: () =>
          import("@/views/web_pages/vhs-pages/questionvhs/Answer.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/questionvhs",
        },
      },
      {
        path: "/scoreuser/:id",
        name: "vhs-pages/questionvhs/score",
        component: () =>
          import("@/views/web_pages/vhs-pages/questionvhs/Score.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/questionvhs",
        },
      },
    ],
  },

  {
    path: "/vhs-pages/score",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "vhs-pages/score",
        component: () => import("@/views/web_pages/vhs-pages/score/Index.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/score",
        },
      },
      {
        path: "",
        name: "vhs-pages/score/all",
        component: () =>
          import("@/views/web_pages/vhs-pages/score/AllScore.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/score",
        },
      },
      {
        path: ":id",
        name: "vhs-pages/scorecompany",
        component: () =>
          import("@/views/web_pages/vhs-pages/score/Company.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/score",
        },
      },
      // {
      //   path: "create",
      //   name: "vhs-pages/materi/create",
      //   component: () =>
      //     import("@/views/web_pages/vhs-pages/materi/Create.vue"),
      //   meta: {
      //     auth: true,
      //     parent: "vhs-pages/materi",
      //   },
      // },
      // {
      //   path: ":id",
      //   name: "vhs-pages/materi/edit",
      //   component: () =>
      //     import("@/views/web_pages/vhs-pages/materi/Create.vue"),
      //   meta: {
      //     auth: true,
      //     parent: "vhs-pages/materi",
      //   },
      // },
    ],
  },

  // Splash Screen
  {
    path: "/splash_screen",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "splash_screen",
        component: () => import("@/views/web_pages/splash_screen/Index.vue"),
        meta: {
          auth: true,
          parent: "splash_screen",
        },
      },
    ],
  },

  //sertifikat vhs
  {
    path: "/vhs-pages/sertifikat",
    component: { template: "<router-view/>" },
    children: [
      {
        path: "",
        name: "vhs-pages/sertifikat",
        component: () =>
          import("@/views/web_pages/vhs-pages/sertifikat/Index.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/sertifikat",
        },
      },
      {
        path: "create",
        name: "vhs-pages/sertifikat/create",
        component: () =>
          import("@/views/web_pages/vhs-pages/sertifikat/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/sertifikat",
        },
      },
      {
        path: ":id",
        name: "vhs-pages/sertifikat/edit",
        component: () =>
          import("@/views/web_pages/vhs-pages/sertifikat/Create.vue"),
        meta: {
          auth: true,
          parent: "vhs-pages/sertifikat",
        },
      },
    ],
  },
];
