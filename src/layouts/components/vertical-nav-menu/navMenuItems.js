/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const user_info = JSON.parse(localStorage.getItem("userInfo"));
const organization_id = parseInt(user_info.data.organization_id);
// console.log(user_info);
const company = JSON.parse(localStorage.getItem("userInfo"));
const company_id = parseInt(company.data.company_id);

const menu = [
  {
    url: null,
    name: "Dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [
      {
        url: "/dashboard/analytics",
        name: "Analytics",
        slug: "dashboard-analytics",
        i18n: "Home",
      },
    ],
  },
  {
    url: null,
    name: "User",
    icon: "UsersIcon",
    i18n: "Administration",
    submenu: [
      {
        url: { name: "employee" },
        name: "Employee",
        slug: "employee",
      },
      organization_id == 20 ||
      organization_id == 23 ||
      organization_id == 177 ||
      organization_id == 420
        ? {
            url: { name: "company" },
            name: "Company",
            slug: "company",
          }
        : {
            url: { name: "division" },
            name: "Division",
            slug: "division",
          },
      // organization_id == 20 ||
      // organization_id == 23 ||
      // organization_id == 177 ||
      // organization_id == 420
      //   ? {
      //       url: { name: "set-admin" },
      //       name: "Set Admin",
      //       slug: "setadmin",
      //     }
      //   : null,
    ],
  },
  {
    url: null,
    name: "SOP",
    icon: "CreditCardIcon",
    i18n: "SOP",
    submenu: [
      {
        url: { name: "sop" },
        name: "SOP",
        slug: "sop",
      },
      {
        url: { name: "crossfunction" },
        name: "Crossfunction",
        slug: "crossfunction",
      },
      {
        url: { name: "lampiran" },
        name: "Lampiran",
        slug: "lampiran",
      },
    ],
  },

  {
    url: null,
    name: "Leaderboard",
    icon: "FlagIcon",
    i18n: "Leaderboard",
    submenu: [
      {
        url: { name: "leaderboard" },
        name: "Leaderboard",
        slug: "PackageIcon",
        i18n: "Leaderboard",
        submenu: null,
      },
    ],
  },

  organization_id == 20 ||
  organization_id == 23 ||
  organization_id == 177 ||
  organization_id == 420
    ? {
        url: null,
        name: "KMS",
        icon: "PackageIcon",
        i18n: "KMS",
        submenu: [
          {
            url: { name: "course" },
            name: "Hardskill",
            slug: "hardskill",
          },
          {
            url: { name: "softskill" },
            name: "Softskill",
            slug: "softskill",
          },
          // {
          //   url: { name: "hardskill" },
          //   name: "Hardskill",
          //   slug: "hardskill",
          // },
          // {
          //   url: { name: "ourcompany" },
          //   name: "Our Company",
          //   slug: "ourcompany",
          // },

          // organization_id == 20 ||
          // organization_id == 23 ||
          // organization_id == 177 ||
          // organization_id == 420
          //   ? {
          //       url: { name: "event" },
          //       name: "Event",
          //       slug: "event",
          //     }
          //   : null,
        ],
      }
    : {
        url: null,
        name: "KMS",
        icon: "PackageIcon",
        i18n: "KMS",
        submenu: [
          {
            url: { name: "course" },
            name: "Course ",
            slug: "course",
          },
        ],
      },

  // Book
  // organization_id == 20 ||
  // organization_id == 23 ||
  // organization_id == 177 ||
  // organization_id == 420
  //   ? {
  //       url: null,
  //       name: "Book",
  //       icon: "BookIcon",
  //       i18n: "Book",
  //       submenu: [
  //         {
  //           url: { name: "book" },
  //           name: "Book",
  //           slug: "book",
  //         },
  //       ],
  //     }
  //   : null,
  //endBook

  organization_id == 20 ||
  organization_id == 23 ||
  organization_id == 177 ||
  organization_id == 420
    ? {
        url: null,
        name: "1VHS",
        icon: "CpuIcon",
        i18n: "1VHS",
        submenu: [
          // {
          //   url: { name: "mini_vhs" },
          //   name: "Mini VHS",
          //   slug: "mini_vhs",
          // },
          // {
          //   url: { name: "vhs" },
          //   name: "VHS",
          //   slug: "vhs",
          // },
          {
            url: { name: "uservhs" },
            name: "Riwayat User",
            slug: "user",
          },
          {
            url: { name: "vhs-pages/materi" },
            name: "Materi",
            slug: "materi",
          },
          {
            url: { name: "zoom-vhs" },
            name: "Zoom",
            slug: "zoom",
          },
          {
            url: { name: "vhs-pages/questionvhs" },
            name: "Question 1VHS",
            slug: "questionvhs",
          },
          {
            url: { name: "vhs-pages/score" },
            name: "Answer 1VHS",
            slug: "answer1vhs",
          },
          {
            url: { name: "vhs-pages/sertifikat" },
            name: "Sertifikat",
            slug: "sertifikat",
          },
          {
            url: null,
            name: "Jadwal",
            slug: "jadwal",
            submenu: [
              {
                url: { name: "jadwal" },
                name: "Jadwal 1VHS",
                slug: "jadwal_vhs",
              },
              {
                url: { name: "jadwaluservhs" },
                name: "Jadwal User",
                slug: "jadwal_user",
              },
            ],
          },
          {
            url: null,
            name: "1VHS",
            icon: "CpuIcon",
            i18n: "1VHS",
            submenu: [
              {
                url: { name: "jadwalap" },
                name: "Jadwal VHS",
                slug: "jadwal_vhs",
              },
            ],
          },
        ],
      }
    : {
        url: null,
        name: "VHS",
        icon: "CpuIcon",
        i18n: "1VHS",
        submenu: [
          {
            url: { name: "jadwalap" },
            name: "Jadwal VHS",
            slug: "jadwal_vhs",
          },
        ],
      },

  //message
  // {
  //   url: null,
  //   name: "Message",
  //   icon: "MailIcon",
  //   i18n: "Message",
  //   submenu: [
  //     {
  //       url: { name: "message" },
  //       name: "Message",
  //       slug: "message",
  //     },
  //   ],
  // },

  /***************** PAS-project *****************/

  {
    url: null,
    name: "VHS",
    icon: "AwardIcon",
    i18n: "PAS",
    submenu: [
      {
        url: { name: "dimensipas" },
        name: "Konfigurasi PAS",
        slug: "dimensi_pas",
      },
      {
        url: { name: "penilaianpas" },
        name: "Penilaian PAS",
        slug: "penilaian_pas",
      },
      {
        url: { name: "nilaipas" },
        name: "Lihat PAS",
        slug: "lihat_pas",
      },
    ],
  },

  /***************** PAS-project *****************/
];

export default menu;
