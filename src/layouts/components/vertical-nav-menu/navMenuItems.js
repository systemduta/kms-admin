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

const company = JSON.parse(localStorage.getItem("userInfo"));
const company_id = parseInt(company.data.company_id);

const menu = [
  // dashboard
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
  // administration
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
      {
        url: { name: "company" },
        name: "Company",
        slug: "company",
      },
      // {
      //   url: { name: "division" },
      //   name: "Division",
      //   slug: "division",
      // },
    ],
  },
  // SOP
  {
    url: null,
    name: "SOP",
    icon: "CreditCardIcon",
    i18n: "SOP",
    submenu: [
      {
        url: { name: "sop" },
        name: "SOP",
        icon: "CreditCardIcon",
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
  // knowledge
  {
    url: null,
    name: "Leaderboard",
    icon: "StarIcon",
    i18n: "Leaderboard",
    submenu: [
        {
          url: { name: "leaderboard" },
          name: "Leaderboard",
          slug: "PackageIcon",
          i18n: "Leaderboard",
          submenu: null,
        }
    ],
  },
  // KMS
  {
    url: null,
    name: "KMS",
    icon: "PackageIcon",
    i18n: "KMS",
    submenu: [
      organization_id != 20
        ? {
            url: { name: "course" },
            name: "Course",
            slug: "course",
          }
        : null,

      organization_id == 20 || organization_id == 23
        ? {
            url: { name: "event" },
            name: "Event",
            slug: "event",
          }
        : null,
    ],
  },
  // Book
  organization_id == 20 || organization_id == 23
    ? {
        url: null,
        name: "Book",
        icon: "BookIcon",
        i18n: "Book",
        submenu: [
          {
            url: { name: "book" },
            name: "Book",
            slug: "book",
          },
        ],
      }
    : null,
  // VHS
  organization_id == 20 || organization_id == 23
    ? {
        url: null,
        name: "VHS",
        icon: "CpuIcon",
        i18n: "VHS",
        submenu: [
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
            name: "Question vhs",
            slug: "questionvhs",
          },
          {
            url: { name: "vhs-pages/score" },
            name: "Score vhs",
            slug: "scorevhs",
          },
          {
            url: null,
            name: "Jadwal",
            i18n: "Jadwal",
            submenu: [
              {
                  url: { name: "jadwal" },
                  name: "Jadwal VHS",
                  slug: "jadwal v",
                },
                {
                    url: { name: "jadwal-user" },
                    name: "Jadwal User",
                    slug: "jadwal-user",
                  },
            ],
          },
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
          // {
          //   url: { name: "jadwal" },
          //   name: "Jadwal",
          //   slug: "jadwal",
          // },
          // {
          //   url: { name: "daftar_user" },
          //   name: "Daftar User",
          //   slug: "daftar_user",
          // },

          // //TODO tambahan
          
          
          // {
          //   url: { name: "vhs-pages/questionvhs/answer" },
          //   name: "Question answer vhs",
          //   slug: "questionanswervhs",
          // },
          // {
          //   url: { name: "##" },
          //   name: "Leaderboard",
          //   slug: "leaderboard",
          // },
          // {
          //   url: { name: "##" },
          //   name: "Profile",
          //   slug: "profile",
          // },
        ],
      }
    : null,
];

export default menu;
