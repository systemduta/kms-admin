/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'

import master from './maesa/master'
import employee from './maesa/employee'
import division from "./maesa/division";
import course from './maesa/course'
import question from './maesa/question'
import leaderboard from './maesa/leaderboard'
import event from './maesa/event'
import vhs from './maesa/vhs'
import splash_screen from './maesa/splash_screen'
import book from './maesa/book'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    eCommerce: moduleECommerce,

    /* vuex for maesa group */
    master,
    employee,
    division,
    course,
    question,
    leaderboard,
    event,
    vhs,
    splash_screen,
    book,
  },
  strict: process.env.NODE_ENV !== 'production'
})
