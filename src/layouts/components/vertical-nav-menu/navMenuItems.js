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

const user_info = JSON.parse(localStorage.getItem('userInfo'))
const organization_id = parseInt(user_info.data.organization_id)

const company = JSON.parse(localStorage.getItem('userInfo'))
const company_id = parseInt(company.data.company_id)

const menu = [
  {
    url: null,
    name: 'Dashboard',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Home'
      }
    ]
  },
  {
    url: null,
    name: 'User',
    icon: 'UsersIcon',
    i18n: 'Administration',
    submenu: [
      {
        url: {name: 'division'},
        name: 'Division',
        slug: 'division'
      },
      {
        url: {name: 'employee'},
        name: 'Employee',
        slug: 'employee'
      },
    ]
  },
  // (company_id == 13 || company_id == 1) ?
  {
    url: null,
    name: 'SOP',
    icon: 'CreditCardIcon',
    i18n: 'SOP',
    submenu: [
      {
        url: {name: 'sop'},
        name: 'SOP',
        slug: 'sop'
      },
      {
        url: {name: 'crossfunction'},
        name: 'Crossfunction',
        slug: 'crossfunction'
      },
      {
        url: {name: 'lampiran'},
        name: 'Lampiran',
        slug: 'lampiran'
      }
    ]
  },
  // (company_id == 13 || company_id == 1) ?
  //   {
  //     url: null,
  //     name: 'Crossfunction',
  //     icon: 'ActivityIcon',
  //     i18n: 'Crossfunction',
  //     submenu: [
  //       {
  //         url: {name: 'crossfunction'},
  //         name: 'Crossfunction',
  //         slug: 'crossfunction'
  //       },
  //       {
  //         url: {name: 'lamcross'},
  //         name: 'Lampiran',
  //         slug: 'lamcross'
  //       },
  //     ]
  //   }: null,
  {
    url: null,
    name: 'Knowledge',
    icon: 'PackageIcon',
    i18n: 'Knowledge',
    submenu: [
      organization_id != 20 ?
        {
          url: {name: 'course'},
          name: 'Course',
          slug: 'course'
        } : null,
      {
        url: {name: 'leaderboard'},
        name: 'Leaderboard',
        slug: 'leaderboard'
      },
      (organization_id == 20 || organization_id == 23) ?
        {
          url: {name: 'event'},
          name: 'Event',
          slug: 'event'
        } : null
    ]
  },
  (organization_id == 20 || organization_id == 23) ?
    {
      url: null,
      name: 'Book',
      icon: 'BookIcon',
      i18n: 'Book',
      submenu: [
        {
          url: {name: 'book'},
          name: 'Book',
          slug: 'book'
        }
      ]
    }: null,
    (organization_id == 20 || organization_id == 23) ?
    {
      url: null,
      name: 'VHS',
      icon: 'CpuIcon',
      i18n: 'VHS',
      submenu: [
        {
          url: {name: 'mini_vhs'},
          name: 'Mini VHS',
          slug: 'mini_vhs'
        },
        {
          url: {name: 'vhs'},
          name: 'VHS',
          slug: 'vhs'
        }
      ]
    }: null,
  // {
  //   url: {name: 'splash_screen'},
  //   name: 'splash_screen',
  //   icon: 'ImageIcon',
  //   i18n: 'Splash Screen',
  //   submenu: []
  // }
]

export default menu
