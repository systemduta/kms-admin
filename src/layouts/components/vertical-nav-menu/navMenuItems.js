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
let user_info = JSON.parse(localStorage.getItem('userInfo'));
let organization_id = user_info.data.organization_id

let menu = [
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
    icon: 'UserIcon',
    i18n: 'Member',
    submenu: [
      {
        url: {name: 'employee'},
        name: 'Employee',
        slug: 'employee'
      }
    ]
  },
  {
    url: null,
    name: 'Knowledge',
    icon: 'PackageIcon',
    i18n: 'Knowledge',
    submenu: [
      organization_id === 11 ?
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
      {
        url: {name: 'event'},
        name: 'Event',
        slug: 'event'
      }
    ]
  },
  organization_id === 20 ?
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
    } : null,
  {
    url: {name: 'splash_screen'},
    name: 'splash_screen',
    icon: 'ImageIcon',
    i18n: 'Splash Screen',
    submenu: []
  }
]

export default menu
